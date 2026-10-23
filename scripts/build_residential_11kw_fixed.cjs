const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildFixedResidential11kW() {
  const baseImgPath = path.join(__dirname, '../src/assets/images/solution_residential_nexon.original.webp');
  const targetImgPath = path.join(__dirname, '../src/assets/images/solution_residential_nexon.webp');
  const source9Path = path.join(__dirname, '../src/assets/images/9.png');

  // Load base image (1200 x 800)
  const { data: baseData, info: baseInfo } = await sharp(baseImgPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const patchedData = Buffer.from(baseData);

  // 1. Inpaint stone pillar behind old charger
  // Source stone: y: 35..105, x: 810..1040 (pristine stone wall)
  const srcX1 = 810, srcX2 = 1040, srcW = srcX2 - srcX1;
  const srcY1 = 35, srcY2 = 105, srcH = srcY2 - srcY1;

  let seed = 98765;
  function rnd() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  // Patch bounds:
  // Left: 770 (leaves all foliage at x < 770 untouched)
  // Right: 1065 (leaves wooden frame at x >= 1068 untouched)
  // Top: 114 (below top stone wall)
  // Bottom: 476 (above mortar line at 478 and cable connections)
  const patchLeft = 770;
  const patchRight = 1065;
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

  // Restore any foliage/sky on the left (x < 780)
  for (let y = 110; y <= 480; y++) {
    for (let x = 730; x <= 780; x++) {
      const idx = (y * baseInfo.width + x) * baseInfo.channels;
      const r = baseData[idx], g = baseData[idx+1], b = baseData[idx+2];
      if ((g > r && g > b) || (b > 150 && b > r)) {
        patchedData[idx] = r;
        patchedData[idx+1] = g;
        patchedData[idx+2] = b;
      }
    }
  }

  // Eliminate any lingering rogue green pixels from old charger in patch region
  for (let y = patchTop; y <= patchBottom + 2; y++) {
    for (let x = patchLeft; x <= patchRight; x++) {
      const idx = (y * baseInfo.width + x) * baseInfo.channels;
      const r = patchedData[idx], g = patchedData[idx+1], b = patchedData[idx+2];
      if (g > 75 && g > r * 1.25 && g > b * 1.25) {
        const sx = 820 + (x % 200);
        const sy = 45 + (y % 50);
        const sIdx = (sy * baseInfo.width + sx) * baseInfo.channels;
        patchedData[idx] = baseData[sIdx];
        patchedData[idx+1] = baseData[sIdx+1];
        patchedData[idx+2] = baseData[sIdx+2];
      }
    }
  }

  // 2. Extract authentic 11 kW charger unit from 9.png
  const rawCrop = await sharp(source9Path)
    .extract({ left: 267, top: 20, width: 572, height: 926 })
    .toBuffer();

  const svgMask = `
<svg width="572" height="926" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="smooth" x="-5%" y="-5%" width="110%" height="110%">
      <feGaussianBlur stdDeviation="0.6" />
    </filter>
  </defs>
  <path d="
    M 140,75
    Q 160,70 200,73
    L 295,84
    Q 325,89 355,120
    L 419,215
    Q 423,222 420,230
    L 358,525
    Q 350,548 335,557
    Q 320,560 286,560
    L 280,560
    L 280,578
    Q 280,581 276,581
    L 254,581
    Q 250,581 250,578
    L 250,560
    L 210,560
    L 210,578
    Q 210,581 206,581
    L 182,581
    Q 178,581 178,578
    L 178,560
    L 142,560
    Q 122,560 105,550
    Q 90,538 84,520
    L 22,235
    Q 18,222 20,212
    Q 24,190 52,142
    L 115,86
    Q 128,78 140,75
    Z
  " fill="#ffffff" filter="url(#smooth)" />
</svg>`;

  const maskedFull = await sharp(rawCrop)
    .ensureAlpha()
    .composite([{ input: Buffer.from(svgMask), blend: 'dest-in' }])
    .png()
    .toBuffer();

  const originalCharger = await sharp(maskedFull)
    .extract({ left: 18, top: 68, width: 406, height: 516 })
    .png()
    .toBuffer();

  // 3. Mirror charger horizontally (flop)
  // This changes the 3D perspective to face the Tata Nexon EV on the left,
  // placing the black wall-mounting casing depth on the right side flush to the pillar wall!
  const flippedBody = await sharp(originalCharger)
    .flop()
    .png()
    .toBuffer();

  // 4. Construct un-mirrored authentic faceplate graphics with solid opaque backing
  const faceplateSvg = `
<svg width="406" height="516" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lcdGrad" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#0a325c" />
      <stop offset="45%" stop-color="#144b82" />
      <stop offset="100%" stop-color="#0e345e" />
    </linearGradient>
    <linearGradient id="slotGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6e6c66" />
      <stop offset="35%" stop-color="#95928b" />
      <stop offset="100%" stop-color="#cac6be" />
    </linearGradient>
  </defs>

  <!-- Complete solid faceplate covering 100% of inner area to green rim -->
  <path d="
    M 104,36
    L 290,36
    Q 310,48 324,80
    L 354,120
    Q 358,138 353,160
    L 336,220
    L 319,300
    L 302,380
    L 289,440
    Q 285,465 272,468
    L 102,468
    Q 88,465 84,440
    L 70,380
    L 53,300
    L 35,220
    L 23,160
    Q 20,138 27,115
    L 61,80
    Q 75,48 104,36
    Z
  " fill="#f4f2ec" />

  <!-- Top Gloss Highlight Reflection matching sunlight from top-left -->
  <path d="
    M 104,36
    L 290,36
    Q 310,48 324,80
    L 354,120
    Q 240,95 110,165
    L 61,80
    Q 75,48 104,36
    Z
  " fill="rgba(255, 255, 255, 0.42)" />

  <!-- AXION CHARGE LOGO -->
  <g transform="translate(202, 108)" text-anchor="middle">
    <text x="0" y="0" font-family="'Montserrat', 'Arial Black', sans-serif" font-weight="900" font-size="34" letter-spacing="4" fill="#141414">AXION</text>
    <polygon points="17,-19 22,-9 18,-9 22,1 16,-6 19,-6" fill="#141414" />
    <line x1="-80" y1="17" x2="-56" y2="17" stroke="#141414" stroke-width="2.2" stroke-linecap="round" />
    <text x="0" y="22" font-family="'Montserrat', 'Arial', sans-serif" font-weight="700" font-size="14.5" letter-spacing="5" fill="#141414">CHARGE</text>
    <line x1="56" y1="17" x2="80" y2="17" stroke="#141414" stroke-width="2.2" stroke-linecap="round" />
  </g>

  <!-- Blue LCD Display -->
  <g transform="translate(142, 168)">
    <rect x="-3" y="-3" width="124" height="48" rx="2" fill="#cfccc5" stroke="#bab6ad" stroke-width="1.5" />
    <rect x="0" y="0" width="118" height="42" rx="1.5" fill="url(#lcdGrad)" />
    <polygon points="0,0 80,0 35,42 0,42" fill="rgba(255, 255, 255, 0.14)" />
  </g>

  <!-- ENERGY : EVOLVED line -->
  <g transform="translate(202, 248)" text-anchor="middle">
    <line x1="-106" y1="-3" x2="-70" y2="-3" stroke="#68655e" stroke-width="1.6" stroke-linecap="round" />
    <text x="0" y="0" font-family="'Montserrat', 'Arial', sans-serif" font-weight="600" font-size="8.5" letter-spacing="3" fill="#3a3834">ENERGY : EVOLVED</text>
    <line x1="70" y1="-3" x2="106" y2="-3" stroke="#68655e" stroke-width="1.6" stroke-linecap="round" />
  </g>

  <!-- Vertical Center Slot / Recess -->
  <rect x="197" y="296" width="11" height="98" rx="5.5" fill="url(#slotGrad)" />

  <!-- 11 kW Section (Left of slot, facing towards car) -->
  <g transform="translate(148, 350)">
    <polygon points="-28,-22 -14,-22 -20,-6 -10,-6 -26,18 -20,2 -26,2" fill="#141414" />
    <text x="-4" y="-3" font-family="'Montserrat', 'Arial', sans-serif" font-weight="800" font-size="24" fill="#141414">11</text>
    <text x="-4" y="16" font-family="'Montserrat', 'Arial', sans-serif" font-weight="800" font-size="18" fill="#141414">kW</text>
  </g>

  <!-- EV SMART CONNECT Section (Right of slot) -->
  <g transform="translate(254, 350)">
    <rect x="-34" y="-20" width="30" height="20" rx="10" fill="none" stroke="#222" stroke-width="1.8" />
    <text x="-19" y="-6" font-family="'Montserrat', 'Arial', sans-serif" font-weight="800" font-size="10.5" text-anchor="middle" fill="#222">EV</text>
    <text x="2" y="-12" font-family="'Montserrat', 'Arial', sans-serif" font-weight="800" font-size="10" fill="#222">SMART</text>
    <text x="2" y="-1" font-family="'Montserrat', 'Arial', sans-serif" font-weight="700" font-size="9" fill="#222">CONNECT</text>
    <g transform="translate(-18, 10)">
      <path d="M 5,6 L 8,2 L 20,2 L 23,6 L 27,8 L 27,15 L 24,15 A 3,3 0 0,1 18,15 L 10,15 A 3,3 0 0,1 4,15 L 1,15 L 1,8 Z" fill="#141414" />
      <circle cx="7" cy="15" r="2.2" fill="#e8e5df" />
      <circle cx="21" cy="15" r="2.2" fill="#e8e5df" />
      <path d="M 27,11 L 32,11 L 32,8" stroke="#141414" stroke-width="1.4" fill="none" stroke-linecap="round" />
    </g>
  </g>

  <!-- www.axioncharge.com at bottom -->
  <text x="202" y="448" font-family="'Montserrat', 'Arial', sans-serif" font-weight="500" font-size="8.5" letter-spacing="1" text-anchor="middle" fill="#5a5750">www.axioncharge.com</text>
</svg>`;

  const finishedChargerUnit = await sharp(flippedBody)
    .composite([{ input: Buffer.from(faceplateSvg), top: 0, left: 0 }])
    .png()
    .toBuffer();

  // 5. Scale charger unit to match residential pillar scale
  const targetW = 276;
  const targetH = Math.round(516 * (targetW / 406)); // ~351

  const resizedCharger = await sharp(finishedChargerUnit)
    .resize(targetW, targetH)
    .png()
    .toBuffer();

  // 6. Ambient contact drop shadow cast naturally towards the right onto stone pillar
  const shadowSvg = `
<svg width="${targetW + 30}" height="${targetH + 30}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadowBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4.5" />
    </filter>
  </defs>
  <g transform="translate(10, 10)">
    <path d="
      M 95,5 L 205,14 L 280,104 L 240,316 L 98,340 L 58,316 L 5,104 Z
    " fill="rgba(15, 12, 10, 0.45)" filter="url(#shadowBlur)" />
  </g>
</svg>`;

  const shadowPng = await sharp(Buffer.from(shadowSvg)).png().toBuffer();

  // Placement:
  // Left: 775, Top: 122
  // Aligns gland collars with the cables at y = 478
  const compLeft = 775;
  const compTop = 122;

  const patchedPng = await sharp(patchedData, {
    raw: { width: baseInfo.width, height: baseInfo.height, channels: baseInfo.channels }
  }).png().toBuffer();

  const finalWebp = await sharp(patchedPng)
    .composite([
      { input: shadowPng, left: compLeft - 2, top: compTop + 2 },
      { input: resizedCharger, left: compLeft, top: compTop }
    ])
    .webp({ quality: 94 })
    .toBuffer();

  // Write final image to target
  fs.writeFileSync(targetImgPath, finalWebp);
  console.log('✓ Successfully wrote to:', targetImgPath);

  // Write previews for inspection
  await sharp(finalWebp)
    .extract({ left: 700, top: 40, width: 420, height: 560 })
    .toFile(path.join(__dirname, 'temp_final_facing_car_crop.jpg'));
  console.log('✓ Saved crop preview');

  await sharp(finalWebp)
    .toFile(path.join(__dirname, 'temp_final_facing_car_full.jpg'));
  console.log('✓ Saved full preview');
}

buildFixedResidential11kW().catch(console.error);
