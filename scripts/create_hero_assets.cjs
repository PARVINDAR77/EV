const sharp = require('sharp');
const path = require('path');

async function createHeroCarCharger() {
  const src = 'src/assets/images/Tata Tiago EV at AXION Charger.png';
  const outDir = 'src/assets/images';

  console.log('Generating hero_car_charger.webp...');

  // Extract Car + Charger: from x=480 to 1808 (width=1328, height=870)
  const W = 1328;
  const H = 870;

  const carRaw = await sharp(src)
    .extract({ left: 480, top: 0, width: W, height: H })
    .toBuffer();

  // Create a soft alpha mask for the left edge (fades in from 0% to 15% width)
  // and the top edge (fades in from 0% to 10% height)
  // and bottom edge (fades out from 90% to 100% height)
  const maskSvg = Buffer.from(`
    <svg width="${W}" height="${H}">
      <defs>
        <linearGradient id="fadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0" />
          <stop offset="8%" stop-color="#fff" stop-opacity="0.85" />
          <stop offset="14%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="1" />
        </linearGradient>
        <linearGradient id="fadeTopBottom" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.2" />
          <stop offset="6%" stop-color="#fff" stop-opacity="1" />
          <stop offset="92%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0.4" />
        </linearGradient>
        <mask id="blendMask">
          <rect width="${W}" height="${H}" fill="url(#fadeLeft)" />
          <rect width="${W}" height="${H}" fill="url(#fadeTopBottom)" style="mix-blend-mode: multiply;" />
        </mask>
      </defs>
      <rect width="${W}" height="${H}" fill="#fff" mask="url(#blendMask)" />
    </svg>
  `);

  await sharp(carRaw)
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .webp({ quality: 95 })
    .toFile(path.join(outDir, 'hero_car_charger.webp'));

  console.log('✓ hero_car_charger.webp created (1328x870)');

  // Also create a backdrop image for the hero section:
  // Using the original city skyline from x=0 to 1808, blurred and overlaid with dark luxury gradient
  const bgW = 1920;
  const bgH = 1080;
  const bgCity = await sharp(src)
    .extract({ left: 0, top: 0, width: 1000, height: 870 })
    .resize(bgW, bgH, { fit: 'cover' })
    .blur(10)
    .toBuffer();

  const bgGradSvg = Buffer.from(`
    <svg width="${bgW}" height="${bgH}">
      <defs>
        <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#020403" stop-opacity="0.95" />
          <stop offset="45%" stop-color="#020403" stop-opacity="0.88" />
          <stop offset="70%" stop-color="#020403" stop-opacity="0.75" />
          <stop offset="100%" stop-color="#020403" stop-opacity="0.85" />
        </linearGradient>
        <linearGradient id="bgV" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#020403" stop-opacity="0.8" />
          <stop offset="20%" stop-color="#020403" stop-opacity="0" />
          <stop offset="80%" stop-color="#020403" stop-opacity="0" />
          <stop offset="100%" stop-color="#020403" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="${bgW}" height="${bgH}" fill="url(#bgG)" />
      <rect width="${bgW}" height="${bgH}" fill="url(#bgV)" />
    </svg>
  `);

  const bgBase = await sharp({
    create: { width: bgW, height: bgH, channels: 4, background: { r: 2, g: 4, b: 3, alpha: 1 } }
  }).png().toBuffer();

  await sharp(bgBase)
    .composite([
      { input: bgCity, left: 0, top: 0 },
      { input: bgGradSvg, left: 0, top: 0 }
    ])
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'hero_atmosphere_backdrop.webp'));

  console.log('✓ hero_atmosphere_backdrop.webp created (1920x1080)');
}

createHeroCarCharger().catch(console.error);
