const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function updateSupportAssets() {
  const rawSvg = fs.readFileSync('src/assets/images/axion_logo.svg', 'utf8');
  // Use official brand green #057A42 for authentic printed look with high contrast
  const logoSvg = rawSvg.replace(/#00FF00/g, '#057A42');

  // ==========================================
  // 1. Process src/assets/images/why_247_support.webp (1712 x 808)
  // ==========================================
  const webpPath = path.resolve('src/assets/images/why_247_support.webp');
  const webpBuf = fs.readFileSync(webpPath);
  
  const boxLeft = 1380;
  const boxTop = 15;
  const boxWidth = 280;
  const boxHeight = 120;

  const boxData = await sharp(webpBuf)
    .extract({ left: boxLeft, top: boxTop, width: boxWidth, height: boxHeight })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cleanedBox = Buffer.from(boxData.data);
  const y1 = 4, y2 = 100;
  for (let y = y1; y <= y2; y++) {
    const t = (y - y1) / (y2 - y1);
    for (let x = 12; x <= 250; x++) {
      const idx = (y * boxWidth + x) * 3;
      let topX = x;
      if (topX >= 195 && topX <= 215) topX = 185;

      const topIdx = (y1 * boxWidth + topX) * 3;
      const botIdx = (y2 * boxWidth + x) * 3;

      cleanedBox[idx] = Math.round(boxData.data[topIdx] * (1 - t) + boxData.data[botIdx] * t);
      cleanedBox[idx+1] = Math.round(boxData.data[topIdx+1] * (1 - t) + boxData.data[botIdx+1] * t);
      cleanedBox[idx+2] = Math.round(boxData.data[topIdx+2] * (1 - t) + boxData.data[botIdx+2] * t);
    }
  }

  const logoPng185 = await sharp(Buffer.from(logoSvg))
    .resize(185)
    .png()
    .toBuffer();

  const logoOnBox = await sharp(cleanedBox, { raw: { width: boxWidth, height: boxHeight, channels: 3 } })
    .composite([{ input: logoPng185, left: 38, top: 26 }])
    .png()
    .toBuffer();

  await sharp(webpBuf)
    .composite([{ input: logoOnBox, left: boxLeft, top: boxTop }])
    .webp({ quality: 95, effort: 6 })
    .toFile(webpPath);

  console.log('Successfully updated src/assets/images/why_247_support.webp');

  // ==========================================
  // 2. Process src/assets/images/2.png (1792 x 878)
  // ==========================================
  const pngPath = path.resolve('src/assets/images/2.png');
  if (fs.existsSync(pngPath)) {
    const pngBuf = fs.readFileSync(pngPath);
    // In 2.png, scale is ~1.047 horizontally, 1.087 vertically
    const pBoxLeft = 1445;
    const pBoxTop = 20;
    const pBoxWidth = 300;
    const pBoxHeight = 130;

    const pBoxData = await sharp(pngBuf)
      .extract({ left: pBoxLeft, top: pBoxTop, width: pBoxWidth, height: pBoxHeight })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pCleanedBox = Buffer.from(pBoxData.data);
    const py1 = 4, py2 = 110;
    for (let y = py1; y <= py2; y++) {
      const t = (y - py1) / (py2 - py1);
      for (let x = 12; x <= 270; x++) {
        const idx = (y * pBoxWidth + x) * 3;
        let topX = x;
        if (topX >= 205 && topX <= 228) topX = 195;

        const topIdx = (py1 * pBoxWidth + topX) * 3;
        const botIdx = (py2 * pBoxWidth + x) * 3;

        pCleanedBox[idx] = Math.round(pBoxData.data[topIdx] * (1 - t) + pBoxData.data[botIdx] * t);
        pCleanedBox[idx+1] = Math.round(pBoxData.data[topIdx+1] * (1 - t) + pBoxData.data[botIdx+1] * t);
        pCleanedBox[idx+2] = Math.round(pBoxData.data[topIdx+2] * (1 - t) + pBoxData.data[botIdx+2] * t);
      }
    }

    const pLogoPng = await sharp(Buffer.from(logoSvg))
      .resize(196)
      .png()
      .toBuffer();

    const pLogoOnBox = await sharp(pCleanedBox, { raw: { width: pBoxWidth, height: pBoxHeight, channels: 3 } })
      .composite([{ input: pLogoPng, left: 42, top: 30 }])
      .png()
      .toBuffer();

    await sharp(pngBuf)
      .composite([{ input: pLogoOnBox, left: pBoxLeft, top: pBoxTop }])
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(pngPath);

    console.log('Successfully updated src/assets/images/2.png');
  }

  // ==========================================
  // 3. Update dist/assets files if dist exists for live preview
  // ==========================================
  if (fs.existsSync('dist/assets')) {
    const distFiles = fs.readdirSync('dist/assets').filter(f => f.startsWith('why_247_support') && f.endsWith('.webp'));
    for (const df of distFiles) {
      const dest = path.join('dist/assets', df);
      fs.copyFileSync(webpPath, dest);
      console.log(`Updated live preview asset: dist/assets/${df}`);
    }
  }

  // Generate confirmation crop
  await sharp(webpPath)
    .extract({ left: boxLeft - 20, top: boxTop, width: boxWidth + 40, height: boxHeight + 40 })
    .toFile('scripts/final_verified_charger_logo.jpg');

  console.log('Saved scripts/final_verified_charger_logo.jpg');
}

updateSupportAssets().catch(console.error);
