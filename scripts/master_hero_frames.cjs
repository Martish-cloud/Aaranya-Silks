const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  console.log('=== STARTING AARANYA SILKS HERO FRAME MASTERING (QUALITY & CINEMATIC REVEAL) ===');

  const publicDir = path.resolve('public/hero-frames');
  const mastersDir = path.resolve('src/assets/hero-4k-masters');

  if (!fs.existsSync(mastersDir)) {
    fs.mkdirSync(mastersDir, { recursive: true });
  }

  // Get list of original 160 frame filenames
  const frameFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.jpg')).sort();
  console.log(`Found ${frameFiles.length} source frames in hero-frames directory.`);

  if (frameFiles.length !== 160) {
    throw new Error(`Expected 160 frame files, found ${frameFiles.length}`);
  }

  const width = 1920;
  const height = 1080;

  // Key reference buffers for reveal
  // Frame 78: Last clean walkthrough frame before reveal
  const bufWalkthrough78 = fs.readFileSync(path.join(publicDir, frameFiles[77]));
  // Frame 89: First clean models frame
  const bufModels89 = fs.readFileSync(path.join(publicDir, frameFiles[88]));

  for (let i = 1; i <= 160; i++) {
    const frameNum = i;
    const padded = String(frameNum).padStart(3, '0');
    const filename = frameFiles[i - 1];
    let sourceBuf;

    if (frameNum <= 78) {
      // 1. Walkthrough frames (1 to 78): Pristine showroom approach
      sourceBuf = fs.readFileSync(path.join(publicDir, filename));
    } else if (frameNum >= 79 && frameNum <= 88) {
      // 2. Cinematic Book-Page-Turn Transition (79 to 88)
      // Progressively curls the walkthrough page away to reveal models underneath
      const progress = (frameNum - 78) / 11; // ~0.09 to ~0.91
      const splitX = Math.round(width * (1 - progress));
      const curveDepth = Math.round(Math.sin(progress * Math.PI) * 70);

      // SVG mask for outgoing walkthrough page
      const svgMask = Buffer.from(`
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="feather">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <path d="M 0,0 L ${splitX + 35},0 Q ${splitX - curveDepth},${height / 2} ${splitX + 35},${height} L 0,${height} Z" fill="white" filter="url(#feather)" />
        </svg>
      `);

      // Golden curl gleam and authentic drop shadow along the page fold edge
      const edgeOverlay = Buffer.from(`
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="curlGleam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="black" stop-opacity="0.6" />
              <stop offset="50%" stop-color="#C8A96B" stop-opacity="0.75" />
              <stop offset="100%" stop-color="#FAF7F0" stop-opacity="0.4" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="-8" dy="0" stdDeviation="6" flood-color="black" flood-opacity="0.5" />
            </filter>
          </defs>
          <path d="M ${splitX + 25},0 Q ${splitX - curveDepth - 10},${height / 2} ${splitX + 25},${height}" stroke="url(#curlGleam)" stroke-width="7" fill="none" opacity="0.9" filter="url(#shadow)" />
        </svg>
      `);

      // Current walkthrough frame (or anchor 78)
      const currentWalk = fs.readFileSync(path.join(publicDir, filename));
      const maskedWalk = await sharp(currentWalk)
        .ensureAlpha()
        .composite([{ input: svgMask, blend: 'dest-in' }])
        .toBuffer();

      // Composite models underneath with peeling walkthrough on top
      sourceBuf = await sharp(bufModels89)
        .composite([
          { input: maskedWalk, blend: 'over' },
          { input: edgeOverlay, blend: 'over' }
        ])
        .jpeg({ quality: 96 })
        .toBuffer();
    } else {
      // 3. Models in Showroom (89 to 160)
      sourceBuf = fs.readFileSync(path.join(publicDir, filename));
    }

    // Apply high-fidelity luxury enhancement:
    // 1. Fine unsharp mask tailored for eye sharpness, facial contours, silk weave, and real gold zari luster
    // 2. Subtle tone mapping (brightness: 1.02, saturation: 1.03) to prevent highlight blowing and enhance warmth
    // 3. Ultra-high quality WebP 95 output with smart subsampling
    const enhancedPipeline = sharp(sourceBuf)
      .sharpen({
        sigma: 1.15,
        m1: 1.25,
        m2: 0.55,
        x1: 2,
        y2: 12,
        y3: 24
      })
      .modulate({
        brightness: 1.02,
        saturation: 1.03
      });

    // Save mastered high-definition WebP
    const webpOutPath = path.join(publicDir, `frame_${padded}.webp`);
    await enhancedPipeline
      .clone()
      .webp({ quality: 95, effort: 4, smartSubsample: true })
      .toFile(webpOutPath);

    // Also update JPG for reveal frames (79 to 88)
    if (frameNum >= 79 && frameNum <= 88) {
      const jpgOutPath = path.join(publicDir, filename);
      await enhancedPipeline
        .clone()
        .jpeg({ quality: 94 })
        .toFile(jpgOutPath);
    }

    // Generate 4K presentation masters for milestone frames
    if ([1, 40, 85, 120, 160].includes(frameNum)) {
      const master4kPath = path.join(mastersDir, `aaranya_hero_4k_frame_${padded}.webp`);
      await enhancedPipeline
        .clone()
        .resize(3840, 2160, {
          kernel: sharp.kernel.lanczos3,
          fit: 'cover'
        })
        .sharpen({ sigma: 1.0, m1: 0.9, m2: 0.45 })
        .webp({ quality: 95, effort: 4 })
        .toFile(master4kPath);
      console.log(`[4K MASTER GENERATED] Frame ${padded}: ${master4kPath}`);
    }

    if (frameNum % 20 === 0 || frameNum === 160) {
      console.log(`Mastered ${frameNum} / 160 frames...`);
    }
  }

  console.log('=== HERO FRAME MASTERING COMPLETED SUCCESSFULLY ===');
}

main().catch(err => {
  console.error('Mastering failed:', err);
  process.exit(1);
});
