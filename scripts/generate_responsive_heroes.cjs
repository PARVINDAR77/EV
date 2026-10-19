const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function buildAllResponsiveHeroes() {
  const srcImgPath = 'src/assets/images/Tata Tiago EV at AXION Charger.png';
  const outDir = 'src/assets/images';

  console.log('Reading base image:', srcImgPath);
  const origMeta = await sharp(srcImgPath).metadata();
  console.log(`Original: ${origMeta.width}x${origMeta.height}`);

  // Extract Car + Charger segment (x: 520 to 1808, width: 1288, height: 870)
  // Let's add 20px on left (x: 500) so bumper is fully intact with margin
  const carAndChargerRaw = await sharp(srcImgPath)
    .extract({ left: 500, top: 0, width: 1308, height: 870 })
    .toBuffer();

  // Extract City Skyline segment (x: 0 to 550, height: 870)
  const citySkylineRaw = await sharp(srcImgPath)
    .extract({ left: 0, top: 0, width: 550, height: 870 })
    .toBuffer();

  // -------------------------------------------------------------
  // 1. MOBILE PORTRAIT: 900 x 1750 (aspect ~ 1:1.94, perfect for 390x844, 360x800, etc.)
  // -------------------------------------------------------------
  {
    const W = 900;
    const H = 1750;
    
    // We want the car + charger to fit across the 900px width with 15px padding on each side
    // usable width = 870px.
    // Scale factor = 870 / 1308 = 0.665
    // Resulting car+charger size: 870 wide, 870 * 0.665 = 579 high.
    const carScaledW = 870;
    const carScaledH = Math.round(870 * (870 / 1308)); // ~579
    const carScaled = await sharp(carAndChargerRaw)
      .resize(carScaledW, carScaledH, { fit: 'fill' })
      .toBuffer();

    // Position car at bottom with 40px margin from bottom edge so wheels are fully visible
    const carLeft = 15;
    const carTop = H - carScaledH - 40; // 1750 - 579 - 40 = 1131

    // Feather top of car scene into sky
    const featherMaskSvg = Buffer.from(`
      <svg width="${carScaledW}" height="${carScaledH}">
        <defs>
          <linearGradient id="featherTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0" />
            <stop offset="12%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="1" />
          </linearGradient>
        </defs>
        <rect width="${carScaledW}" height="${carScaledH}" fill="url(#featherTop)" />
      </svg>
    `);

    const carFeathered = await sharp(carScaled)
      .composite([{ input: featherMaskSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // Atmospheric sky/city backdrop filling top half
    const skyH = carTop + 120;
    const skyBackdrop = await sharp(citySkylineRaw)
      .resize(W, skyH, { fit: 'cover', position: 'top' })
      .blur(3)
      .toBuffer();

    // Dark gradient covering top for text readability:
    // From 0 to 55% height: solid/dense dark for text
    // From 55% to 65%: smooth fade to clear reveal of car
    const mobileGradSvg = Buffer.from(`
      <svg width="${W}" height="${H}">
        <defs>
          <linearGradient id="mDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#020403" stop-opacity="1" />
            <stop offset="42%" stop-color="#020403" stop-opacity="0.96" />
            <stop offset="55%" stop-color="#020403" stop-opacity="0.82" />
            <stop offset="64%" stop-color="#020403" stop-opacity="0.2" />
            <stop offset="72%" stop-color="#020403" stop-opacity="0" />
            <stop offset="92%" stop-color="#020403" stop-opacity="0" />
            <stop offset="100%" stop-color="#020403" stop-opacity="0.85" />
          </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#mDark)" />
      </svg>
    `);

    const mobileBase = await sharp({
      create: { width: W, height: H, channels: 4, background: { r: 2, g: 4, b: 3, alpha: 1 } }
    }).png().toBuffer();

    await sharp(mobileBase)
      .composite([
        { input: skyBackdrop, left: 0, top: 0 },
        { input: carFeathered, left: carLeft, top: carTop },
        { input: mobileGradSvg, left: 0, top: 0 }
      ])
      .webp({ quality: 92 })
      .toFile(path.join(outDir, 'hero_mobile.webp'));

    console.log('✓ Generated hero_mobile.webp (900x1750)');
  }

  // -------------------------------------------------------------
  // 2. TABLET PORTRAIT: 1200 x 1600 (aspect 3:4, perfect for 768x1024, 820x1180)
  // -------------------------------------------------------------
  {
    const W = 1200;
    const H = 1600;

    // Car + Charger width = 1140 (margin 30px on each side)
    const carScaledW = 1140;
    const carScaledH = Math.round(870 * (1140 / 1308)); // ~758
    const carScaled = await sharp(carAndChargerRaw)
      .resize(carScaledW, carScaledH, { fit: 'fill' })
      .toBuffer();

    const carLeft = 30;
    const carTop = H - carScaledH - 30; // 1600 - 758 - 30 = 812

    const featherMaskSvg = Buffer.from(`
      <svg width="${carScaledW}" height="${carScaledH}">
        <defs>
          <linearGradient id="featherTopTabP" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0" />
            <stop offset="10%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="1" />
          </linearGradient>
        </defs>
        <rect width="${carScaledW}" height="${carScaledH}" fill="url(#featherTopTabP)" />
      </svg>
    `);

    const carFeathered = await sharp(carScaled)
      .composite([{ input: featherMaskSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    const skyH = carTop + 100;
    const skyBackdrop = await sharp(citySkylineRaw)
      .resize(W, skyH, { fit: 'cover', position: 'top' })
      .blur(2.5)
      .toBuffer();

    const tabPortGradSvg = Buffer.from(`
      <svg width="${W}" height="${H}">
        <defs>
          <linearGradient id="tpDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#020403" stop-opacity="1" />
            <stop offset="38%" stop-color="#020403" stop-opacity="0.96" />
            <stop offset="48%" stop-color="#020403" stop-opacity="0.75" />
            <stop offset="55%" stop-color="#020403" stop-opacity="0" />
            <stop offset="94%" stop-color="#020403" stop-opacity="0" />
            <stop offset="100%" stop-color="#020403" stop-opacity="0.85" />
          </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#tpDark)" />
      </svg>
    `);

    const tabPBase = await sharp({
      create: { width: W, height: H, channels: 4, background: { r: 2, g: 4, b: 3, alpha: 1 } }
    }).png().toBuffer();

    await sharp(tabPBase)
      .composite([
        { input: skyBackdrop, left: 0, top: 0 },
        { input: carFeathered, left: carLeft, top: carTop },
        { input: tabPortGradSvg, left: 0, top: 0 }
      ])
      .webp({ quality: 92 })
      .toFile(path.join(outDir, 'hero_tablet_portrait.webp'));

    console.log('✓ Generated hero_tablet_portrait.webp (1200x1600)');
  }

  // -------------------------------------------------------------
  // 3. TABLET LANDSCAPE: 1600 x 1100 (aspect ~ 1.45:1, perfect for 1024x768, 1180x820)
  // -------------------------------------------------------------
  {
    const W = 1600;
    const H = 1100;

    // In tablet landscape:
    // Left side (0 to 650): Dedicated text area over dark city skyline
    // Right side (650 to 1600): Tata Tiago EV + 220 kW Charger in full view!
    // Car + Charger width in original is 1308 x 870.
    // If we scale it to fit within width = 940px:
    // Scale = 940 / 1308 = 0.718
    // Resulting height = 870 * 0.718 = 625px.
    // Ground at bottom: carTop = H - 625 - 40 = 435.
    const carScaledW = 940;
    const carScaledH = Math.round(870 * (940 / 1308)); // ~625
    const carScaled = await sharp(carAndChargerRaw)
      .resize(carScaledW, carScaledH, { fit: 'fill' })
      .toBuffer();

    const carLeft = W - carScaledW - 20; // 1600 - 940 - 20 = 640
    const carTop = H - carScaledH - 40; // 435

    // Feather the left edge of the car scene so it blends smoothly into the left city background
    const leftFeatherSvg = Buffer.from(`
      <svg width="${carScaledW}" height="${carScaledH}">
        <defs>
          <linearGradient id="featherLeftTL" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0" />
            <stop offset="12%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="1" />
          </linearGradient>
        </defs>
        <rect width="${carScaledW}" height="${carScaledH}" fill="url(#featherLeftTL)" />
      </svg>
    `);

    const carFeathered = await sharp(carScaled)
      .composite([{ input: leftFeatherSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // Background skyline filling entire width
    const bgSkyline = await sharp(srcImgPath)
      .resize(W, H, { fit: 'cover', position: 'left top' })
      .blur(3)
      .toBuffer();

    // Gradient: Left 0 to 45% is dark for text; fades to reveal car at 45%-55%; clear from 55% to 100%
    const tabLandGradSvg = Buffer.from(`
      <svg width="${W}" height="${H}">
        <defs>
          <linearGradient id="tlDark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#020403" stop-opacity="1" />
            <stop offset="35%" stop-color="#020403" stop-opacity="0.95" />
            <stop offset="44%" stop-color="#020403" stop-opacity="0.80" />
            <stop offset="50%" stop-color="#020403" stop-opacity="0.30" />
            <stop offset="58%" stop-color="#020403" stop-opacity="0" />
            <stop offset="100%" stop-color="#020403" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="tlBottomDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#020403" stop-opacity="0.6" />
            <stop offset="15%" stop-color="#020403" stop-opacity="0" />
            <stop offset="85%" stop-color="#020403" stop-opacity="0" />
            <stop offset="100%" stop-color="#020403" stop-opacity="0.85" />
          </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#tlDark)" />
        <rect width="${W}" height="${H}" fill="url(#tlBottomDark)" />
      </svg>
    `);

    const tabLBase = await sharp({
      create: { width: W, height: H, channels: 4, background: { r: 2, g: 4, b: 3, alpha: 1 } }
    }).png().toBuffer();

    await sharp(tabLBase)
      .composite([
        { input: bgSkyline, left: 0, top: 0 },
        { input: carFeathered, left: carLeft, top: carTop },
        { input: tabLandGradSvg, left: 0, top: 0 }
      ])
      .webp({ quality: 92 })
      .toFile(path.join(outDir, 'hero_tablet_landscape.webp'));

    console.log('✓ Generated hero_tablet_landscape.webp (1600x1100)');
  }

  // -------------------------------------------------------------
  // 4. DESKTOP WIDESCREEN: 2400 x 1100 (aspect ~ 2.18:1, perfect for 1440x900, 1920x1080)
  // -------------------------------------------------------------
  {
    const W = 2400;
    const H = 1100;

    // Car + Charger width in original is 1308 x 870.
    // Fit into width = 1200:
    const carScaledW = 1200;
    const carScaledH = Math.round(870 * (1200 / 1308)); // ~798
    const carScaled = await sharp(carAndChargerRaw)
      .resize(carScaledW, carScaledH, { fit: 'fill' })
      .toBuffer();

    const carLeft = W - carScaledW - 40; // 2400 - 1200 - 40 = 1160
    const carTop = H - carScaledH - 30; // 272

    const leftFeatherSvg = Buffer.from(`
      <svg width="${carScaledW}" height="${carScaledH}">
        <defs>
          <linearGradient id="featherLeftDesk" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0" />
            <stop offset="10%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="1" />
          </linearGradient>
        </defs>
        <rect width="${carScaledW}" height="${carScaledH}" fill="url(#featherLeftDesk)" />
      </svg>
    `);

    const carFeathered = await sharp(carScaled)
      .composite([{ input: leftFeatherSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    const bgSkyline = await sharp(srcImgPath)
      .resize(W, H, { fit: 'cover', position: 'left top' })
      .blur(3)
      .toBuffer();

    const deskGradSvg = Buffer.from(`
      <svg width="${W}" height="${H}">
        <defs>
          <linearGradient id="deskDark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#020403" stop-opacity="1" />
            <stop offset="38%" stop-color="#020403" stop-opacity="0.95" />
            <stop offset="46%" stop-color="#020403" stop-opacity="0.75" />
            <stop offset="52%" stop-color="#020403" stop-opacity="0.2" />
            <stop offset="60%" stop-color="#020403" stop-opacity="0" />
            <stop offset="100%" stop-color="#020403" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="deskBottomDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#020403" stop-opacity="0.6" />
            <stop offset="12%" stop-color="#020403" stop-opacity="0" />
            <stop offset="88%" stop-color="#020403" stop-opacity="0" />
            <stop offset="100%" stop-color="#020403" stop-opacity="0.85" />
          </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#deskDark)" />
        <rect width="${W}" height="${H}" fill="url(#deskBottomDark)" />
      </svg>
    `);

    const deskBase = await sharp({
      create: { width: W, height: H, channels: 4, background: { r: 2, g: 4, b: 3, alpha: 1 } }
    }).png().toBuffer();

    await sharp(deskBase)
      .composite([
        { input: bgSkyline, left: 0, top: 0 },
        { input: carFeathered, left: carLeft, top: carTop },
        { input: deskGradSvg, left: 0, top: 0 }
      ])
      .webp({ quality: 92 })
      .toFile(path.join(outDir, 'hero_desktop.webp'));

    console.log('✓ Generated hero_desktop.webp (2400x1100)');
  }

  console.log('All responsive hero images generated successfully!');
}

buildAllResponsiveHeroes().catch(err => {
  console.error('Error generating heroes:', err);
  process.exit(1);
});
