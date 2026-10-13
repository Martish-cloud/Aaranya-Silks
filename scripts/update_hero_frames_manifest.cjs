const fs = require('fs');
const lines = [
  '// 160-frame chronological sequence for Aaranya Silks Hero Animation',
  '// Enhanced high-definition WebP delivery assets',
  'export const HERO_FRAMES: string[] = ['
];

for (let i = 1; i <= 160; i++) {
  const padded = String(i).padStart(3, '0');
  lines.push(`  '/hero-frames/frame_${padded}.webp',`);
}

lines.push('];', '');

fs.writeFileSync('src/data/heroFrames.ts', lines.join('\n'));
console.log('Successfully wrote src/data/heroFrames.ts with 160 WebP frames.');
