const sharp = require('sharp');
const fs = require('fs');

async function setDCFastChargers() {
  const images = [
    {
      name: '60 kW',
      webp: 'src/assets/images/AXION 60 kW EV Wallbox Advertisement.webp',
      png: 'src/assets/images/AXION 60 kW EV Wallbox Advertisement.png'
    },
    {
      name: '120 kW',
      webp: 'src/assets/images/AXION 120 kW EV Charging Station.webp',
      png: 'src/assets/images/AXION 120 kW EV Charging Station.png'
    },
    {
      name: '240 kW',
      webp: 'src/assets/images/Axion 240 kW EV Charger Showcase.webp',
      png: 'src/assets/images/Axion 240 kW EV Charger Showcase.png'
    }
  ];

  // SVG for 1200x800 WebP
  const svgWebp = `
  <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
    <text x="559" y="317" font-family="'Segoe UI', 'Montserrat', Arial, sans-serif" font-size="21.5" font-weight="700" letter-spacing="3.8" fill="#FFFFFF">DC FAST CHARGER</text>
  </svg>`;

  // SVG for 1536x1024 PNG (scale: 1.28)
  const svgPng = `
  <svg width="1536" height="1024" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(1.28)">
      <text x="559" y="317" font-family="'Segoe UI', 'Montserrat', Arial, sans-serif" font-size="21.5" font-weight="700" letter-spacing="3.8" fill="#FFFFFF">DC FAST CHARGER</text>
    </g>
  </svg>`;

  const svgWebpBuf = await sharp(Buffer.from(svgWebp)).png().toBuffer();
  const svgPngBuf = await sharp(Buffer.from(svgPng)).png().toBuffer();

  for (const item of images) {
    console.log(`\nProcessing ${item.name}...`);

    // 1. Process 1200x800 WebP
    if (fs.existsSync(item.webp)) {
      const fileBuf = fs.readFileSync(item.webp);
      const { data, info } = await sharp(fileBuf)
        .raw()
        .toBuffer({ resolveWithObject: true });

      const cleaned = Buffer.from(data);

      // Clean out "DC WALLBOX" by sampling wood slats from y: 260 to 287 into y: 298 to 325
      for (let y = 298; y <= 325; y++) {
        const srcY = 260 + (y - 298);
        for (let x = 550; x <= 820; x++) {
          const srcIdx = (srcY * info.width + x) * info.channels;
          const dstIdx = (y * info.width + x) * info.channels;
          cleaned[dstIdx] = data[srcIdx];
          cleaned[dstIdx+1] = data[srcIdx+1];
          cleaned[dstIdx+2] = data[srcIdx+2];
        }
      }

      const composited = await sharp(cleaned, {
        raw: { width: info.width, height: info.height, channels: info.channels }
      })
        .composite([{ input: svgWebpBuf, left: 0, top: 0 }])
        .webp({ quality: 94 })
        .toBuffer();

      fs.writeFileSync(item.webp, composited);
      console.log(`  ✓ Updated WebP: ${item.webp}`);
    }

    // 2. Process 1536x1024 PNG
    if (fs.existsSync(item.png)) {
      const pngFileBuf = fs.readFileSync(item.png);
      const { data: pngData, info: pngInfo } = await sharp(pngFileBuf)
        .raw()
        .toBuffer({ resolveWithObject: true });

      const cleanedPng = Buffer.from(pngData);

      // Scale 1.28 for inpainting:
      // x: 550 * 1.28 = 704 to 820 * 1.28 = 1050
      // y: 298 * 1.28 = 381 to 325 * 1.28 = 416
      // srcY: 260 * 1.28 = 333
      for (let y = 381; y <= 416; y++) {
        const srcY = 333 + (y - 381);
        for (let x = 704; x <= 1050; x++) {
          const srcIdx = (srcY * pngInfo.width + x) * pngInfo.channels;
          const dstIdx = (y * pngInfo.width + x) * pngInfo.channels;
          cleanedPng[dstIdx] = pngData[srcIdx];
          cleanedPng[dstIdx+1] = pngData[srcIdx+1];
          cleanedPng[dstIdx+2] = pngData[srcIdx+2];
        }
      }

      const compositedPng = await sharp(cleanedPng, {
        raw: { width: pngInfo.width, height: pngInfo.height, channels: pngInfo.channels }
      })
        .composite([{ input: svgPngBuf, left: 0, top: 0 }])
        .png()
        .toBuffer();

      fs.writeFileSync(item.png, compositedPng);
      console.log(`  ✓ Updated PNG: ${item.png}`);
    }
  }

  // Generate preview crops of all 3 images
  for (let i = 0; i < images.length; i++) {
    const item = images[i];
    await sharp(item.webp)
      .extract({ left: 540, top: 280, width: 320, height: 160 })
      .toFile(`scripts/temp_verified_dc_fast_${i}.png`);
    console.log(`  ✓ Generated preview: scripts/temp_verified_dc_fast_${i}.png`);
  }

  console.log('\nAll DC chargers successfully updated to "DC FAST CHARGER"!');
}

setDCFastChargers().catch(console.error);
