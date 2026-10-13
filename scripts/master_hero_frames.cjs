const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

async function main() {
  console.log('=== STARTING AARANYA SILKS HERO FRAME MASTERING ===');

  const publicDir = path.resolve('public/hero-frames');
  const backupDir = path.resolve('public/hero-frames-original-backup');
  const mastersDir = path.resolve('src/assets/hero-4k-masters');

  if (!fs.existsSync(mastersDir)) {
    fs.mkdirSync(mastersDir, { recursive: true });
  }

  // Get list of original 160 frame filenames
  const frameFiles = fs.readdirSync(backupDir).filter(f => f.endsWith('.jpg')).sort();
  console.log(`Found ${frameFiles.length} original frames in backup directory.`);

  // 1. Prepare base buffers
  // For frames 1-88: Clean showroom walkthrough from c399aba
  // For frame 89: Starting frame of models in showroom
  const bufB = execSync('git show c399aba:public/hero-frames/frame_089_source_0154.jpg');

  for (let i = 1; i <= 160; i++) {
    const frameNum = i;
    const padded = String(frameNum).padStart(3, '0');
    const filename = frameFiles[i - 1];
    let sourceBuf;

    if (frameNum <= 78) {
      // Clean walkthrough from c399aba
      sourceBuf = execSync(`git show c399aba:public/hero-frames/${filename}`);
    } else if (frameNum >= 79 && frameNum <= 88) {
      // Seamless aligned transition from walkthrough into models
      const bufA = execSync(`git show c399aba:public/hero-frames/${filename}`);
      const progress = (frameNum - 78) / 11; // 0.09 to 0.91
      const bAlpha = await sharp(bufB).ensureAlpha(progress).toBuffer();
      sourceBuf = await sharp(bufA)
        .composite([{ input: bAlpha, blend: 'over' }])
        .jpeg({ quality: 95 })
        .toBuffer();
    } else {
      // Model approach frames (89 to 160)
      sourceBuf = fs.readFileSync(path.join(backupDir, filename));
    }

    // Apply luxury fashion enhancement:
    // 1. Fine unsharp mask for zari gold embroidery, fabric weave, and facial clarity
    // 2. Subtle vibrance & luminance expansion to let silk luster gleam
    // 3. WebP 90 high-definition delivery
    const enhancedPipeline = sharp(sourceBuf)
      .sharpen({
        sigma: 1.15,
        m1: 1.1,
        m2: 0.5,
        x1: 2,
        y2: 10,
        y3: 20
      })
      .modulate({
        brightness: 1.02,
        saturation: 1.03
      });

    // Save optimized web delivery WebP
    const webpOutPath = path.join(publicDir, `frame_${padded}.webp`);
    await enhancedPipeline
      .clone()
      .webp({ quality: 90, effort: 6, smartSubsample: true })
      .toFile(webpOutPath);

    // Also update existing JPG in public/hero-frames for backward-compatibility fallback
    const jpgOutPath = path.join(publicDir, filename);
    await enhancedPipeline
      .clone()
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(jpgOutPath);

    // Generate 4K (3840x2160) Presentation Master for milestone frames
    if ([1, 40, 85, 120, 160].includes(frameNum)) {
      const master4kPath = path.join(mastersDir, `aaranya_hero_4k_frame_${padded}.webp`);
      await enhancedPipeline
        .clone()
        .resize(3840, 2160, {
          kernel: sharp.kernel.lanczos3,
          fit: 'cover'
        })
        .sharpen({ sigma: 1.0, m1: 0.8, m2: 0.4 })
        .webp({ quality: 95, effort: 6 })
        .toFile(master4kPath);
      console.log(`[4K MASTER GENERATED] Frame ${padded}: ${master4kPath}`);
    }

    if (frameNum % 20 === 0 || frameNum === 160) {
      console.log(`Processed ${frameNum} / 160 frames...`);
    }
  }

  console.log('=== HERO FRAME MASTERING COMPLETED SUCCESSFULLY ===');
}

main().catch(err => {
  console.error('Mastering failed:', err);
  process.exit(1);
});
