const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeHeroFrames() {
  console.log('=== 1. OPTIMIZING 160 HERO FRAMES (DESKTOP & MOBILE WEBP) ===');
  const srcDir = path.resolve('public/hero-frames');
  const desktopDir = path.resolve('public/hero-frames/desktop');
  const mobileDir = path.resolve('public/hero-frames/mobile');

  if (!fs.existsSync(desktopDir)) fs.mkdirSync(desktopDir, { recursive: true });
  if (!fs.existsSync(mobileDir)) fs.mkdirSync(mobileDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpg') && f.startsWith('Aaranya_Silks_Frame_')).sort();
  console.log(`Found ${files.length} JPG source frames.`);

  const startTime = Date.now();

  // Process in batches of 8 to balance CPU and memory
  const batchSize = 8;
  for (let i = 0; i < files.length; i += batchSize) {
    const chunk = files.slice(i, i + batchSize);
    await Promise.all(chunk.map(async (file, idx) => {
      const frameNum = i + idx + 1;
      const padded = String(frameNum).padStart(3, '0');
      const inPath = path.join(srcDir, file);

      const desktopOut = path.join(desktopDir, `frame_${padded}.webp`);
      const mobileOut = path.join(mobileDir, `frame_${padded}.webp`);

      // Desktop: 1920x1080 WebP (crisp 1080p, quality 85, smartSubsample)
      if (!fs.existsSync(desktopOut)) {
        await sharp(inPath)
          .resize(1920, 1080, { fit: 'cover' })
          .webp({ quality: 85, effort: 4, smartSubsample: true })
          .toFile(desktopOut);
      }

      // Mobile: 960x540 WebP (lightweight, rapid decoding, quality 80)
      if (!fs.existsSync(mobileOut)) {
        await sharp(inPath)
          .resize(960, 540, { fit: 'cover' })
          .webp({ quality: 80, effort: 4, smartSubsample: true })
          .toFile(mobileOut);
      }
    }));

    if ((i + batchSize) % 32 === 0 || i + batchSize >= files.length) {
      console.log(`Processed ${Math.min(i + batchSize, files.length)} / ${files.length} frames...`);
    }
  }

  // Create lightweight poster images
  const posterDesktop = path.join(srcDir, 'poster_desktop.webp');
  const posterMobile = path.join(srcDir, 'poster_mobile.webp');
  const firstFramePath = path.join(srcDir, files[0]);

  await sharp(firstFramePath)
    .resize(1920, 1080, { fit: 'cover' })
    .webp({ quality: 85, effort: 5 })
    .toFile(posterDesktop);

  await sharp(firstFramePath)
    .resize(960, 540, { fit: 'cover' })
    .webp({ quality: 80, effort: 5 })
    .toFile(posterMobile);

  console.log(`Hero frames complete in ${((Date.now() - startTime) / 1000).toFixed(1)}s.`);
}

async function optimizePngAssets() {
  console.log('=== 2. OPTIMIZING LARGE PNG ASSETS (TRANSPARENT PRODUCT CUTOUTS & STUDIO) ===');

  const pngPaths = [
    // Product Detail Transparent
    'src/assets/product_detail_transparent/Mayurakshi Kanjivaram Bridal Silk Saree/Mayurakshi Kanjivaram Bridal Silk Saree (Auspicious Emerald).png',
    'src/assets/product_detail_transparent/Mayurakshi Kanjivaram Bridal Silk Saree/Mayurakshi Kanjivaram Bridal Silk Saree (Crimson Red).png',
    'src/assets/product_detail_transparent/Mayurakshi Kanjivaram Bridal Silk Saree/Mayurakshi Kanjivaram Bridal Silk Saree (Royal Plum).png',
    'src/assets/product_detail_transparent/Padmavati Scarlet Red Katan Bridal Saree/Padmavati Scarlet Red Katan Bridal Saree (Crimson Red).png',
    'src/assets/product_detail_transparent/Padmavati Scarlet Red Katan Bridal Saree/Padmavati Scarlet Red Katan Bridal Saree (Deep Burgundy) (2).png',
    'src/assets/product_detail_transparent/Padmavati Scarlet Red Katan Bridal Saree/Padmavati Scarlet Red Katan Bridal Saree (Deep Burgundy).png',
    'src/assets/product_detail_transparent/Suhani Crimson & Zari Trousseau Heirloom/Suhani Crimson & Zari Trousseau Heirloom (Crimson Red).png',
    'src/assets/product_detail_transparent/Suhani Crimson & Zari Trousseau Heirloom/Suhani Crimson & Zari Trousseau Heirloom (Deep Burgendy) (1).png',
    'src/assets/product_detail_transparent/Suhani Crimson & Zari Trousseau Heirloom/Suhani Crimson & Zari Trousseau Heirloom (Deep Burgendy) (2).png',
    // Studio
    'src/assets/Studio/ros-net-embroidered/Elegant Dusty Rose Saree Portrait.png',
    'src/assets/Studio/ros-net-embroidered/Elegant Ivory Saree Portrait.png',
    'src/assets/Studio/ros-net-embroidered/Embroidered Burgundy Saree Portrait.png',
    'src/assets/Studio/suhani-crimson-zari/Elegant Maroon Saree Portrait (1).png',
    'src/assets/Studio/suhani-crimson-zari/Glamorous Golden Saree Portrait.png',
    'src/assets/Studio/suhani-crimson-zari/Glamorous Maroon Saree Portrait.png',
    'src/assets/Studio/swarna-hansa/Emerald Gold Saree Elegance.png',
    'src/assets/Studio/swarna-hansa/Glamorous Golden Saree Portrait (1).png',
    'src/assets/Studio/swarna-hansa/Glamorous Golden Saree Portrait.png',
    // The Soul of Indian Silk
    'src/assets/The Soul of Indian Silk/Glamorous South Asian Saree Portrait.png',
    'src/assets/The Soul of Indian Silk/Honoring Generational Mastery.png',
    // Trend of the Day
    'src/assets/Need to Update/Trend of the Day/Mayurakshi Kanjivaram Bridal Silk Saree (Auspicious Emerald).png'
  ];

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const relPath of pngPaths) {
    const fullPath = path.resolve(relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${relPath}`);
      continue;
    }

    const stat = fs.statSync(fullPath);
    totalOriginalSize += stat.size;

    const outPath = fullPath.replace(/\.png$/i, '.webp');
    // Ensure alpha transparency is preserved
    await sharp(fullPath)
      .webp({ quality: 86, effort: 5 })
      .toFile(outPath);

    const outStat = fs.statSync(outPath);
    totalOptimizedSize += outStat.size;

    console.log(`[PNG -> WebP] ${path.basename(relPath)}: ${(stat.size / 1024 / 1024).toFixed(2)}MB -> ${(outStat.size / 1024).toFixed(1)}KB (-${Math.round((1 - outStat.size / stat.size) * 100)}%)`);
  }

  console.log(`Total PNG Assets: ${(totalOriginalSize / 1024 / 1024).toFixed(1)}MB -> ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB (-${Math.round((1 - totalOptimizedSize / totalOriginalSize) * 100)}%)`);
}

async function main() {
  await optimizeHeroFrames();
  await optimizePngAssets();
  console.log('=== ALL ASSET OPTIMIZATIONS COMPLETED SUCCESSFULLY ===');
}

main().catch(err => {
  console.error('Asset optimization failed:', err);
  process.exit(1);
});
