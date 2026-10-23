const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildFixedResidential11kW() {
  const baseImgPath = path.join(__dirname, '../src/assets/images/solution_residential_nexon.original.webp');
  const targetImgPath = path.join(__dirname, '../src/assets/images/solution_residential_nexon.webp');
  const source9Path = path.join(__dirname, '../src/assets/images/9.png');

  // 1. Extract 11 kW charger unit from 9.png
  // Top green rim: y = 69
  // Bottom green rim: y = 560
  // Left black casing/green rim: x = 18
  // Right green rim: x = 422
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

  // Extract body only (from y=69 down to y=560, height 491, width 404 from x=18 to 422)
  const bodyOnly = await sharp(maskedFull)
    .extract({ left: 18, top: 69, width: 404, height: 491 })
    .png()
    .toBuffer();

  // 2. Flip horizontally (flop)
  // Faces the charger towards the car on the left,
  // and places the black wall mounting casing depth on the right!
  const flippedBody = await sharp(bodyOnly)
    .flop()
    .png()
    .toBuffer();

  // 3. Crisp un-mirrored vector faceplate graphics (404 x 491)
  const faceplateSvg = `
<svg width="404" height="491" xmlns="http://www.w3.org/2000/svg">
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
    M 104,35
    L 290,35
    Q 310,47 324,79
    L 354,119
    Q 358,137 353,159
    L 336,219
    L 319,299
    L 302,379
    L 289,439
    Q 285,464 272,467
    L 102,467
    Q 88,464 84,439
    L 70,379
    L 53,299
    L 35,219
    L 23,159
    Q 20,137 27,114
    L 61,79
    Q 75,47 104,35
    Z
  " fill="#f4f2ec" />

  <!-- Top Gloss Highlight Reflection -->
  <path d="
    M 104,35
    L 290,35
    Q 310,47 324,79
    L 354,119
    Q 240,94 110,164
    L 61,79
    Q 75,47 104,35
    Z
  " fill="rgba(255, 255, 255, 0.42)" />

  <!-- AXION CHARGE LOGO -->
  <g transform="translate(201, 107)" text-anchor="middle">
    <text x="0" y="0" font-family="'Montserrat', 'Arial Black', sans-serif" font-weight="900" font-size="34" letter-spacing="4" fill="#141414">AXION</text>
    <polygon points="17,-19 22,-9 18,-9 22,1 16,-6 19,-6" fill="#141414" />
    <line x1="-80" y1="17" x2="-56" y2="17" stroke="#141414" stroke-width="2.2" stroke-linecap="round" />
    <text x="0" y="22" font-family="'Montserrat', 'Arial', sans-serif" font-weight="700" font-size="14.5" letter-spacing="5" fill="#141414">CHARGE</text>
    <line x1="56" y1="17" x2="80" y2="17" stroke="#141414" stroke-width="2.2" stroke-linecap="round" />
  </g>

  <!-- Blue LCD Display -->
  <g transform="translate(141, 167)">
    <rect x="-3" y="-3" width="124" height="48" rx="2" fill="#cfccc5" stroke="#bab6ad" stroke-width="1.5" />
    <rect x="0" y="0" width="118" height="42" rx="1.5" fill="url(#lcdGrad)" />
    <polygon points="0,0 80,0 35,42 0,42" fill="rgba(255, 255, 255, 0.14)" />
  </g>

  <!-- ENERGY : EVOLVED line -->
  <g transform="translate(201, 247)" text-anchor="middle">
    <line x1="-106" y1="-3" x2="-70" y2="-3" stroke="#68655e" stroke-width="1.6" stroke-linecap="round" />
    <text x="0" y="0" font-family="'Montserrat', 'Arial', sans-serif" font-weight="600" font-size="8.5" letter-spacing="3" fill="#3a3834">ENERGY : EVOLVED</text>
    <line x1="70" y1="-3" x2="106" y2="-3" stroke="#68655e" stroke-width="1.6" stroke-linecap="round" />
  </g>

  <!-- Vertical Center Slot / Recess -->
  <rect x="196" y="295" width="11" height="98" rx="5.5" fill="url(#slotGrad)" />

  <!-- 11 kW Section -->
  <g transform="translate(147, 349)">
    <polygon points="-28,-22 -14,-22 -20,-6 -10,-6 -26,18 -20,2 -26,2" fill="#141414" />
    <text x="-4" y="-3" font-family="'Montserrat', 'Arial', sans-serif" font-weight="800" font-size="24" fill="#141414">11</text>
    <text x="-4" y="16" font-family="'Montserrat', 'Arial', sans-serif" font-weight="800" font-size="18" fill="#141414">kW</text>
  </g>

  <!-- EV SMART CONNECT Section -->
  <g transform="translate(253, 349)">
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
  <text x="201" y="447" font-family="'Montserrat', 'Arial', sans-serif" font-weight="500" font-size="8.5" letter-spacing="1" text-anchor="middle" fill="#5a5750">www.axioncharge.com</text>
</svg>`;

  const chargerWithFaceplate = await sharp(flippedBody)
    .composite([{ input: Buffer.from(faceplateSvg), top: 0, left: 0 }])
    .png()
    .toBuffer();

  // Exact scale so height matches from y=128 to 474 (height = 346px)
  const targetH = 346;
  const targetW = Math.round(404 * (targetH / 491)); // ~285px

  const resizedCharger = await sharp(chargerWithFaceplate)
    .resize(targetW, targetH)
    .png()
    .toBuffer();

  // Contact shadow on the wall behind charger
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
  // Top: 128
  // Height: 346 -> Bottom sits at 128 + 346 = 474
  // Cable collars start at 474 -> Seamless connection with 0 gap!
  const compLeft = 798;
  const compTop = 128;

  // Background stone patch:
  // - x < 804 is never touched -> ALL tree leaves and pillar edge stay 100% pristine!
  // - y: 118..128 is patched -> old charger's top green rim is completely covered (no top fin)!
  // - y: 468..474 is patched -> old charger's bottom green rim is completely covered (no bottom sliver)!
  const { data: baseData, info: baseInfo } = await sharp(baseImgPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const patchedData = Buffer.from(baseData);

  // Source stone: y: 40..105, x: 820..1040
  const srcX1 = 820, srcX2 = 1040, srcW = srcX2 - srcX1;
  const srcY1 = 40, srcY2 = 105, srcH = srcY2 - srcY1;

  let seed = 445566;
  function rnd() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  const patchLeft = 804;
  const patchRight = 1058;
  const patchTop = 118;
  const patchBottom = 474;

  for (let y = patchTop; y <= patchBottom; y += 14) {
    for (let x = patchLeft; x <= patchRight; x += 14) {
      const rx = Math.floor(rnd() * (srcW - 24)) + srcX1;
      const ry = Math.floor(rnd() * (srcH - 24)) + srcY1;

      for (let py = 0; py < 24; py++) {
        const dstY = y + py;
        if (dstY > patchBottom || dstY < patchTop) continue;
        const sy = ry + py;

        for (let px = 0; px < 24; px++) {
          const dstX = x + px;
          if (dstX > patchRight || dstX < patchLeft) continue;
          const sx = rx + px;

          const dstIdx = (dstY * baseInfo.width + dstX) * baseInfo.channels;
          const srcIdx = (sy * baseInfo.width + sx) * baseInfo.channels;

          let w = 1.0;
          if (dstX > 1052) w = (1058 - dstX) / 6.0;
          if (dstX < 808) w = (dstX - 804) / 4.0;
          if (dstY < 122) w = (dstY - 118) / 4.0;
          if (dstY > 470) w = (474 - dstY) / 4.0;

          patchedData[dstIdx] = Math.round(patchedData[dstIdx] * (1 - w) + baseData[srcIdx] * w);
          patchedData[dstIdx + 1] = Math.round(patchedData[dstIdx + 1] * (1 - w) + baseData[srcIdx + 1] * w);
          patchedData[dstIdx + 2] = Math.round(patchedData[dstIdx + 2] * (1 - w) + baseData[srcIdx + 2] * w);
        }
      }
    }
  }

  // Composite final
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
  console.log('✓ Successfully wrote final image to:', targetImgPath);
}

buildFixedResidential11kW().catch(console.error);
