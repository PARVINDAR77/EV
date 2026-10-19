const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function applyHighwayLogo() {
  console.log('--- Applying official AXION CHARGE logo to Highway image ---');

  const srcPngPath = path.resolve('src/assets/images/4.png');
  const highwayStopPngPath = path.resolve('src/assets/images/Axion Charge Highway Stop.png');
  const highwayWebpPath = path.resolve('src/assets/images/solution_highway_expressway.webp');
  const highwayStopWebpPath = path.resolve('src/assets/images/Axion Charge Highway Stop.webp');

  // Read 4.png (1672 x 941)
  const rawPngBuf = fs.readFileSync(srcPngPath);
  const { data, info } = await sharp(rawPngBuf).raw().toBuffer({ resolveWithObject: true });
  console.log(`Loaded source image: ${info.width}x${info.height}`);

  const cleaned = Buffer.from(data);
  const boxTop = 190, boxBottom = 312;

  // 1. Inpaint old fake letters on the canopy board
  for (let y = boxTop; y <= boxBottom; y++) {
    // Find left clean pixel (search left from x=345)
    let leftColor = null;
    for (let x = 345; x >= 315; x--) {
      const idx = (y * info.width + x) * info.channels;
      const b = (data[idx] + data[idx+1] + data[idx+2]) / 3;
      if (b > 200) {
        leftColor = [data[idx], data[idx+1], data[idx+2]];
        break;
      }
    }
    if (!leftColor) leftColor = [250, 240, 230];

    // Find right clean pixel (search right from x=525)
    let rightColor = null;
    for (let x = 525; x <= 555; x++) {
      const idx = (y * info.width + x) * info.channels;
      const b = (data[idx] + data[idx+1] + data[idx+2]) / 3;
      if (b > 190) {
        rightColor = [data[idx], data[idx+1], data[idx+2]];
        break;
      }
    }
    if (!rightColor) rightColor = [225, 218, 210];

    // Inpaint any text pixels between x: 342 and 528
    for (let x = 342; x <= 528; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      const brightness = (r + g + b) / 3;
      const isGreenText = (g > 55 && g > r * 1.12 && g > b * 1.12);
      const isDarkText = (brightness < 185);

      if (isGreenText || isDarkText) {
        const t = (x - 342) / (528 - 342);
        cleaned[idx] = Math.round(leftColor[0] * (1 - t) + rightColor[0] * t);
        cleaned[idx+1] = Math.round(leftColor[1] * (1 - t) + rightColor[1] * t);
        cleaned[idx+2] = Math.round(leftColor[2] * (1 - t) + rightColor[2] * t);
      }
    }
  }

  // 2. Prepare official master vector logo SVG with exact angle & size
  const rawSvg = fs.readFileSync('src/assets/images/axion_logo.svg', 'utf8');
  const angle = 6.0; // 6 degree clockwise tilt to match canopy 3D perspective
  const logoWidth = 178;
  const logoHeight = Math.round(logoWidth * (179.3 / 638.1)); // ~50px

  // Brand electric green #057A42
  const greenLogo = rawSvg.replace(/#00FF00/g, '#057A42');

  const wrappedSvg = `
    <svg width="240" height="120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="subtle-shadow" x="-5%" y="-5%" width="115%" height="115%">
          <feDropShadow dx="0.5" dy="1.0" stdDeviation="0.8" flood-color="#000000" flood-opacity="0.25" />
        </filter>
      </defs>
      <g transform="translate(120, 60) rotate(${angle}) translate(-${logoWidth / 2}, -${logoHeight / 2})" filter="url(#subtle-shadow)">
        <svg width="${logoWidth}" height="${logoHeight}" viewBox="100.6 221.2 638.1 179.3">
          ${greenLogo.replace(/<svg[^>]*>|<\/svg>/g, '')}
        </svg>
      </g>
    </svg>
  `;

  const logoPngBuf = await sharp(Buffer.from(wrappedSvg)).png().toBuffer();

  // Overlay onto cleaned board (at left: 344, top: 197 in 4.png)
  const compositedPng = await sharp(cleaned, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .composite([{ input: logoPngBuf, left: 344, top: 197 }])
    .png()
    .toBuffer();

  // 3. Write back to 4.png and Axion Charge Highway Stop.png
  fs.writeFileSync(srcPngPath, compositedPng);
  fs.writeFileSync(highwayStopPngPath, compositedPng);
  console.log(`✓ Updated master PNGs: ${srcPngPath}, ${highwayStopPngPath}`);

  // 4. Generate 1200x675 optimized WebP for solution_highway_expressway.webp
  const webp1200Buf = await sharp(compositedPng)
    .resize(1200, 675, { fit: 'cover', position: 'center' })
    .webp({ quality: 90, effort: 6 })
    .toBuffer();

  fs.writeFileSync(highwayWebpPath, webp1200Buf);
  console.log(`✓ Updated WebP: ${highwayWebpPath} (${(webp1200Buf.length / 1024).toFixed(1)} KB)`);

  fs.writeFileSync(highwayStopWebpPath, webp1200Buf);
  console.log(`✓ Updated WebP: ${highwayStopWebpPath} (${(webp1200Buf.length / 1024).toFixed(1)} KB)`);

  console.log('--- ALL HIGHWAY ASSETS SUCCESSFULLY UPDATED WITH OFFICIAL LOGO ---');
}

applyHighwayLogo().catch(console.error);
