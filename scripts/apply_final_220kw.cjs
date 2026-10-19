const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function applyFinal() {
  const pngPath = path.resolve('src/assets/images/Tata Tiago EV at AXION Charger.png');
  const webpPath = path.resolve('src/assets/images/hero_bg_tiago.webp');
  const pngBackup = path.resolve('src/assets/images/Tata Tiago EV at AXION Charger.backup.png');

  // Full SVG with Inter/Segoe UI heavy bold black font
  // x = 1468, y = 535
  const fullSvg = `
  <svg width="1808" height="870" xmlns="http://www.w3.org/2000/svg">
    <style>
      .num { font-family: 'Segoe UI', 'Inter', 'Arial', sans-serif; font-size: 54px; font-weight: 900; fill: #000000; letter-spacing: -2px; }
      .unit { font-family: 'Segoe UI', 'Inter', 'Arial', sans-serif; font-size: 27px; font-weight: 900; fill: #000000; letter-spacing: -0.2px; }
    </style>
    <g transform="translate(1468, 535) skewY(-0.8)">
      <text x="0" y="42" class="num">220</text>
      <text x="2" y="77" class="unit">kW</text>
    </g>
  </svg>
  `;

  const svgBuffer = Buffer.from(fullSvg);

  // 1. Process PNG from pristine backup
  await sharp(pngBackup)
    .composite([{ input: svgBuffer, top: 0, left: 0 }])
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(pngPath);
  console.log('Updated Tata Tiago EV at AXION Charger.png');

  // 2. Process src/assets/images/hero_bg_tiago.webp
  await sharp(pngBackup)
    .composite([{ input: svgBuffer, top: 0, left: 0 }])
    .webp({ quality: 95, effort: 6 })
    .toFile(webpPath);
  console.log('Updated src/assets/images/hero_bg_tiago.webp');

  // 3. Also update all hero_bg_tiago*.webp in dist/assets so live preview updates immediately
  if (fs.existsSync('dist/assets')) {
    const distFiles = fs.readdirSync('dist/assets').filter(f => f.startsWith('hero_bg_tiago') && f.endsWith('.webp'));
    for (const df of distFiles) {
      const dest = path.join('dist/assets', df);
      fs.copyFileSync(webpPath, dest);
      console.log(`Updated dist/assets/${df}`);
    }
  }

  // 4. Cleanup temporary scratch files
  const tempFiles = [
    'src/assets/images/_temp_base_crop.png',
    'src/assets/images/_temp_opt1_arial_black.png',
    'src/assets/images/_temp_opt2_inter_heavy.png',
    'src/assets/images/_temp_opt3_din_black.png',
    'src/assets/images/_ref_charger_crop.png',
    'src/assets/images/_check_tiago.png'
  ];
  for (const tf of tempFiles) {
    if (fs.existsSync(tf)) fs.unlinkSync(tf);
  }
  console.log('Cleaned up scratch files');
}

applyFinal().catch(console.error);
