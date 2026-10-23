const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildResidential11kW() {
  const baseImgPath = path.join(__dirname, '../src/assets/images/solution_residential_nexon.original.webp');
  const targetImgPath = path.join(__dirname, '../src/assets/images/solution_residential_nexon.webp');

  // Load base image (1200 x 800)
  const { data: baseData, info: baseInfo } = await sharp(baseImgPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const patchedData = Buffer.from(baseData);

  // 1. Inpaint old charger area on stone pillar
  // Source stone: y: 35..105, x: 810..1040 (pure clean stone wall)
  const srcX1 = 810, srcX2 = 1040, srcW = srcX2 - srcX1;
  const srcY1 = 35, srcY2 = 105, srcH = srcY2 - srcY1;

  let seed = 98765;
  function rnd() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  // Patch bounds:
  // Left: 775 (keeps all foliage at x < 775 intact)
  // Right: 1060 (keeps wooden frame at x >= 1065 intact)
  // Top: 114 (below top stone wall)
  // Bottom: 476 (covers all of the old charger's bottom green rim)
  const patchLeft = 775;
  const patchRight = 1060;
  const patchTop = 114;
  const patchBottom = 476;

  const patchSize = 28;
  for (let y = patchTop; y <= patchBottom; y += 14) {
    for (let x = patchLeft; x <= patchRight; x += 14) {
      const rx = Math.floor(rnd() * (srcW - patchSize)) + srcX1;
      const ry = Math.floor(rnd() * (srcH - patchSize)) + srcY1;

      for (let py = 0; py < patchSize; py++) {
        const dstY = y + py;
        if (dstY > patchBottom || dstY < patchTop) continue;
        const sy = ry + py;

        for (let px = 0; px < patchSize; px++) {
          const dstX = x + px;
          if (dstX > patchRight || dstX < patchLeft) continue;
          const sx = rx + px;

          const dstIdx = (dstY * baseInfo.width + dstX) * baseInfo.channels;
          const srcIdx = (sy * baseInfo.width + sx) * baseInfo.channels;

          // Border feathering at outer margins only
          let edgeDist = Math.min(dstX - patchLeft, patchRight - dstX, dstY - patchTop, patchBottom - dstY);
          let w = Math.min(1.0, edgeDist / 4.0);

          patchedData[dstIdx] = Math.round(patchedData[dstIdx] * (1 - w) + baseData[srcIdx] * w);
          patchedData[dstIdx + 1] = Math.round(patchedData[dstIdx + 1] * (1 - w) + baseData[srcIdx + 1] * w);
          patchedData[dstIdx + 2] = Math.round(patchedData[dstIdx + 2] * (1 - w) + baseData[srcIdx + 2] * w);
        }
      }
    }
  }

  // Check and eliminate any lingering green pixels from the old charger in the patch region
  for (let y = patchTop; y <= patchBottom + 2; y++) {
    for (let x = patchLeft; x <= patchRight; x++) {
      const idx = (y * baseInfo.width + x) * baseInfo.channels;
      const r = patchedData[idx], g = patchedData[idx+1], b = patchedData[idx+2];
      // If any old charger green remains:
      if (g > 75 && g > r * 1.25 && g > b * 1.25) {
        // Sample clean stone pixel from top wall
        const sx = 820 + (x % 200);
        const sy = 45 + (y % 50);
        const sIdx = (sy * baseInfo.width + sx) * baseInfo.channels;
        patchedData[idx] = baseData[sIdx];
        patchedData[idx+1] = baseData[sIdx+1];
        patchedData[idx+2] = baseData[sIdx+2];
      }
    }
  }

  // 2. Extract tight charger unit from temp_perfect_cutout.png
  const tightCharger = await sharp('scripts/temp_perfect_cutout.png')
    .extract({ left: 18, top: 68, width: 406, height: 516 })
    .png()
    .toBuffer();

  // Scale charger to match residential scene
  // Target width = 280
  const targetW = 280;
  const targetH = Math.round(516 * (targetW / 406)); // ~356

  const resizedCharger = await sharp(tightCharger)
    .resize(targetW, targetH)
    .png()
    .toBuffer();

  // Create subtle natural drop shadow
  const shadowSvg = `
<svg width="${targetW + 30}" height="${targetH + 30}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadowBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4.5" />
    </filter>
  </defs>
  <g transform="translate(10, 10)">
    <path d="
      M 95,5
      L 205,14
      L 280,104
      L 240,316
      L 98,340
      L 58,316
      L 5,104
      Z
    " fill="rgba(20, 18, 15, 0.42)" filter="url(#shadowBlur)" />
  </g>
</svg>`;

  const shadowPng = await sharp(Buffer.from(shadowSvg))
    .png()
    .toBuffer();

  // Composite coordinates
  const compLeft = 778;
  const compTop = 122;

  const patchedPng = await sharp(patchedData, {
    raw: { width: baseInfo.width, height: baseInfo.height, channels: baseInfo.channels }
  })
    .png()
    .toBuffer();

  const resultBuffer = await sharp(patchedPng)
    .composite([
      {
        input: shadowPng,
        left: compLeft - 4,
        top: compTop + 2
      },
      {
        input: resizedCharger,
        left: compLeft,
        top: compTop
      }
    ])
    .webp({ quality: 94 })
    .toBuffer();

  // Save to target
  fs.writeFileSync(targetImgPath, resultBuffer);
  console.log('✓ Successfully generated:', targetImgPath);

  // Update preview crop for inspection
  await sharp(resultBuffer)
    .extract({ left: 700, top: 40, width: 420, height: 560 })
    .toFile('scripts/temp_final_preview_crop.jpg');
  console.log('✓ Saved preview crop: scripts/temp_final_preview_crop.jpg');

  // And full preview
  await sharp(resultBuffer)
    .toFile('scripts/temp_final_full_preview.jpg');
  console.log('✓ Saved full preview: scripts/temp_final_full_preview.jpg');
}

buildResidential11kW().catch(console.error);
