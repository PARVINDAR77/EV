const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function apply11kW() {
  const srcPath = path.join(__dirname, '../src/assets/images/solution_residential_nexon.webp');
  const backupPath = path.join(__dirname, '../src/assets/images/solution_residential_nexon.original.webp');

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(srcPath, backupPath);
    console.log('Backed up original to solution_residential_nexon.original.webp');
  }

  // Exact coordinates on 1200x800 image:
  // faceplate left: 810, top: 150
  // rect over 7.4: x: 810 + 62 = 872, y: 150 + 219 = 369, width: 26, height: 15
  // text '11': x: 810 + 67.5 = 877.5, y: 150 + 231 = 381
  const bgFill = '#d8d5cf';
  const textColor = '#1a1918';

  const overlaySvg = `
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect x="872" y="369" width="26" height="15" fill="${bgFill}" rx="1" />
  <text x="877.5" y="381" font-family="Arial, 'Helvetica Neue', sans-serif" font-size="13.5" font-weight="bold" fill="${textColor}">11</text>
</svg>`;

  await sharp(backupPath)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .webp({ quality: 92 })
    .toFile(srcPath);

  console.log('Successfully updated solution_residential_nexon.webp with 11 kW!');
}

apply11kW();
