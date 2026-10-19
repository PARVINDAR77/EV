const sharp = require('sharp');

async function generateHeroes() {
  // 1. DESKTOP & TABLET LANDSCAPE: 2508 x 870
  const padLeft = 700;
  const original = sharp('src/assets/images/Tata Tiago EV at AXION Charger.png');
  const meta = await original.metadata();
  const newWidth = meta.width + padLeft; // 1808 + 700 = 2508
  const height = meta.height; // 870
  
  const leftEdge = await sharp('src/assets/images/Tata Tiago EV at AXION Charger.png')
    .extract({ left: 0, top: 0, width: 400, height: height })
    .toBuffer();
    
  const flippedEdge = await sharp(leftEdge)
    .flop()
    .resize(padLeft + 100, height, { fit: 'fill' })
    .blur(1.5)
    .toBuffer();
    
  const baseBg = await sharp({
    create: {
      width: newWidth,
      height: height,
      channels: 4,
      background: { r: 2, g: 4, b: 3, alpha: 1 }
    }
  }).png().toBuffer();
  
  const maskSvg = Buffer.from(`
    <svg width="${newWidth}" height="${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#020403" stop-opacity="1" />
          <stop offset="35%" stop-color="#020403" stop-opacity="0.95" />
          <stop offset="48%" stop-color="#020403" stop-opacity="0.75" />
          <stop offset="56%" stop-color="#020403" stop-opacity="0.25" />
          <stop offset="64%" stop-color="#020403" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect width="${newWidth}" height="${height}" fill="url(#grad)" />
    </svg>
  `);
  
  await sharp(baseBg)
    .composite([
      { input: flippedEdge, left: 0, top: 0 },
      { input: 'src/assets/images/Tata Tiago EV at AXION Charger.png', left: padLeft, top: 0 },
      { input: maskSvg, left: 0, top: 0 }
    ])
    .webp({ quality: 92 })
    .toFile('src/assets/images/hero_bg_tiago.webp');
    
  console.log('Saved hero_bg_tiago.webp (Desktop/Landscape 2508x870)');

  // 2. MOBILE PORTRAIT: 900 x 1600
  const mobileWidth = 900;
  const mobileHeight = 1600;
  
  const rawCarAndCharger = await sharp('src/assets/images/Tata Tiago EV at AXION Charger.png')
    .extract({ left: 520, top: 0, width: 1288, height: 870 })
    .resize(mobileWidth, null)
    .toBuffer();
    
  const carMeta = await sharp(rawCarAndCharger).metadata();
  const carHeight = carMeta.height; // ~608
  const carTop = mobileHeight - carHeight; // ~992
  
  // Feather top 50px of car image so it dissolves smoothly into the sky
  const featherMask = Buffer.from(`
    <svg width="${mobileWidth}" height="${carHeight}">
      <defs>
        <linearGradient id="feather" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0" />
          <stop offset="10%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="${mobileWidth}" height="${carHeight}" fill="url(#feather)" />
    </svg>
  `);
  
  const carAndCharger = await sharp(rawCarAndCharger)
    .composite([
      { input: featherMask, blend: 'dest-in' }
    ])
    .png()
    .toBuffer();
  
  // Upper sky background
  const bgCity = await sharp('src/assets/images/Tata Tiago EV at AXION Charger.png')
    .extract({ left: 0, top: 0, width: 900, height: 600 })
    .resize(mobileWidth, carTop + 100, { fit: 'cover' })
    .blur(4)
    .toBuffer();
    
  const mobileGrad = Buffer.from(`
    <svg width="${mobileWidth}" height="${mobileHeight}">
      <defs>
        <linearGradient id="mgrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#020403" stop-opacity="1" />
          <stop offset="42%" stop-color="#020403" stop-opacity="0.92" />
          <stop offset="56%" stop-color="#020403" stop-opacity="0.5" />
          <stop offset="64%" stop-color="#020403" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect width="${mobileWidth}" height="${mobileHeight}" fill="url(#mgrad)" />
    </svg>
  `);
  
  const mobileBase = await sharp({
    create: {
      width: mobileWidth,
      height: mobileHeight,
      channels: 4,
      background: { r: 2, g: 4, b: 3, alpha: 1 }
    }
  }).png().toBuffer();
  
  await sharp(mobileBase)
    .composite([
      { input: bgCity, left: 0, top: 0 },
      { input: carAndCharger, left: 0, top: carTop },
      { input: mobileGrad, left: 0, top: 0 }
    ])
    .webp({ quality: 92 })
    .toFile('src/assets/images/hero_bg_tiago_mobile.webp');
    
  console.log('Saved hero_bg_tiago_mobile.webp (Seamless Mobile Portrait 900x1600)');
}

generateHeroes().catch(console.error);
