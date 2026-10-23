const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function fixDCChargerImages() {
  const images = [
    {
      webp: 'src/assets/images/AXION 60 kW EV Wallbox Advertisement.webp',
      png: 'src/assets/images/AXION 60 kW EV Wallbox Advertisement.png',
      name: '60 kW'
    },
    {
      webp: 'src/assets/images/AXION 120 kW EV Charging Station.webp',
      png: 'src/assets/images/AXION 120 kW EV Charging Station.png',
      name: '120 kW'
    },
    {
      webp: 'src/assets/images/Axion 240 kW EV Charger Showcase.webp',
      png: 'src/assets/images/Axion 240 kW EV Charger Showcase.png',
      name: '240 kW'
    }
  ];

  for (const item of images) {
    console.log(`Processing ${item.name}...`);

    // 1. Process 1200x800 WebP
    if (fs.existsSync(item.webp)) {
      const fileBuf = fs.readFileSync(item.webp);
      const { data, info } = await sharp(fileBuf)
        .raw()
        .toBuffer({ resolveWithObject: true });

      const cleaned = Buffer.from(data);

      // Inpaint letter 'A' by copying vertical wood slat from y: 275..297 into y: 298..320
      for (let y = 298; y <= 320; y++) {
        const srcY = 275 + (y - 298);
        for (let x = 553; x <= 578; x++) {
          const srcIdx = (srcY * info.width + x) * info.channels;
          const dstIdx = (y * info.width + x) * info.channels;
          cleaned[dstIdx] = data[srcIdx];
          cleaned[dstIdx+1] = data[srcIdx+1];
          cleaned[dstIdx+2] = data[srcIdx+2];
        }
      }

      // Draw custom vector letter 'D' matching C and WALLBOX exactly
      const dSvg = `
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <path d="
    M 560,302
    L 567,302
    C 572,302 574,304.5 574,309
    C 574,313.5 572,316 567,316
    L 560,316
    Z
    M 562.3,304.3
    L 562.3,313.7
    L 566.5,313.7
    C 569.5,313.7 571.5,312 571.5,309
    C 571.5,306 569.5,304.3 566.5,304.3
    Z
  " fill="#FFFFFF" fill-rule="evenodd" />
</svg>`;

      const fixedWebpBuffer = await sharp(cleaned, {
        raw: { width: info.width, height: info.height, channels: info.channels }
      })
        .composite([{ input: Buffer.from(dSvg), left: 0, top: 0 }])
        .webp({ quality: 92 })
        .toBuffer();

      fs.writeFileSync(item.webp, fixedWebpBuffer);
      console.log(`  ✓ Updated WebP: ${item.webp}`);
    }

    // 2. Process 1536x1024 PNG (scale = 1.28)
    if (fs.existsSync(item.png)) {
      const pngFileBuf = fs.readFileSync(item.png);
      const { data: pngData, info: pngInfo } = await sharp(pngFileBuf)
        .raw()
        .toBuffer({ resolveWithObject: true });

      const cleanedPng = Buffer.from(pngData);

      // Inpaint letter 'A' in 1536x1024:
      // x: 553 * 1.28 = 708 to 578 * 1.28 = 740
      // y: 298 * 1.28 = 381 to 320 * 1.28 = 410
      for (let y = 381; y <= 410; y++) {
        const srcY = 352 + (y - 381);
        for (let x = 708; x <= 740; x++) {
          const srcIdx = (srcY * pngInfo.width + x) * pngInfo.channels;
          const dstIdx = (y * pngInfo.width + x) * pngInfo.channels;
          cleanedPng[dstIdx] = pngData[srcIdx];
          cleanedPng[dstIdx+1] = pngData[srcIdx+1];
          cleanedPng[dstIdx+2] = pngData[srcIdx+2];
        }
      }

      // Draw custom vector letter 'D' scaled 1.28x
      const dSvgPng = `
<svg width="1536" height="1024" xmlns="http://www.w3.org/2000/svg">
  <g transform="scale(1.28)">
    <path d="
      M 560,302
      L 567,302
      C 572,302 574,304.5 574,309
      C 574,313.5 572,316 567,316
      L 560,316
      Z
      M 562.3,304.3
      L 562.3,313.7
      L 566.5,313.7
      C 569.5,313.7 571.5,312 571.5,309
      C 571.5,306 569.5,304.3 566.5,304.3
      Z
    " fill="#FFFFFF" fill-rule="evenodd" />
  </g>
</svg>`;

      const fixedPngBuffer = await sharp(cleanedPng, {
        raw: { width: pngInfo.width, height: pngInfo.height, channels: pngInfo.channels }
      })
        .composite([{ input: Buffer.from(dSvgPng), left: 0, top: 0 }])
        .png()
        .toBuffer();

      fs.writeFileSync(item.png, fixedPngBuffer);
      console.log(`  ✓ Updated PNG: ${item.png}`);
    }
  }

  // Create preview crops of all 3 updated WebP files to verify visually
  for (let i = 0; i < images.length; i++) {
    const item = images[i];
    await sharp(item.webp)
      .extract({ left: 520, top: 280, width: 280, height: 160 })
      .toFile(`scripts/temp_verified_dc_${i}.jpg`);
    console.log(`  ✓ Generated preview: scripts/temp_verified_dc_${i}.jpg`);
  }

  console.log('\nAll DC charger images successfully updated from AC WALLBOX to DC WALLBOX!');
}

fixDCChargerImages().catch(console.error);
