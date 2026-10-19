const sharp = require('sharp');
const path = require('path');

async function buildCleanHeroes() {
  const src = 'src/assets/images/Tata Tiago EV at AXION Charger.png';
  const outDir = 'src/assets/images';

  console.log('Generating clean responsive hero images...');

  // =========================================================================
  // 1. MOBILE PORTRAIT: 900 x 1600 (ideal for phones 360-480px, ratio 9:16)
  // =========================================================================
  {
    const W = 900;
    const H = 1600;

    // Car + Charger block: x=480 to 1808 (width=1328, height=870)
    // Scale to fit width W = 900 with 10px breathing room on each side -> 880px
    const carW = 880;
    const carH = Math.round(870 * (carW / 1328)); // ~576
    const carLeft = 10;
    const carTop = H - carH - 20; // 1600 - 576 - 20 = 1004

    // Extract car+charger and resize
    const carRaw = await sharp(src)
      .extract({ left: 480, top: 0, width: 1328, height: 870 })
      .resize(carW, carH)
      .toBuffer();

    // Feather top 70px of car block smoothly
    const featherSvg = Buffer.from(`
      <svg width="${carW}" height="${carH}">
        <defs>
          <linearGradient id="mFeather" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0" />
            <stop offset="14%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="1" />
          </linearGradient>
        </defs>
        <rect width="${carW}" height="${carH}" fill="url(#mFeather)" />
      </svg>
    `);

    const carFeathered = await sharp(carRaw)
      .composite([{ input: featherSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // Upper atmospheric background: sky portion from original (top 200px)
    const skyH = carTop + 80;
    const skyRaw = await sharp(src)
      .extract({ left: 0, top: 0, width: 1808, height: 220 })
      .resize(W, skyH, { fit: 'cover' })
      .blur(6)
      .toBuffer();

    // Dark gradient overlay for text legibility
    const gradSvg = Buffer.from(`
      <svg width="${W}" height="${H}">
        <defs>
          <linearGradient id="mGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#020403" stop-opacity="1" />
            <stop offset="46%" stop-color="#020403" stop-opacity="0.95" />
            <stop offset="56%" stop-color="#020403" stop-opacity="0.75" />
            <stop offset="64%" stop-color="#020403" stop-opacity="0.2" />
            <stop offset="72%" stop-color="#020403" stop-opacity="0" />
            <stop offset="94%" stop-color="#020403" stop-opacity="0" />
            <stop offset="100%" stop-color="#020403" stop-opacity="0.75" />
          </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#mGrad)" />
      </svg>
    `);

    const base = await sharp({
      create: { width: W, height: H, channels: 4, background: { r: 2, g: 4, b: 3, alpha: 1 } }
    }).png().toBuffer();

    await sharp(base)
      .composite([
        { input: skyRaw, left: 0, top: 0 },
        { input: carFeathered, left: carLeft, top: carTop },
        { input: gradSvg, left: 0, top: 0 }
      ])
      .webp({ quality: 92 })
      .toFile(path.join(outDir, 'hero_mobile.webp'));

    console.log('✓ hero_mobile.webp created');
  }

  // =========================================================================
  // 2. TABLET PORTRAIT: 1200 x 1600 (ideal for 768x1024, 820x1180, ratio 3:4)
  // =========================================================================
  {
    const W = 1200;
    const H = 1600;

    const carW = 1160;
    const carH = Math.round(870 * (carW / 1328)); // ~760
    const carLeft = 20;
    const carTop = H - carH - 30; // ~810

    const carRaw = await sharp(src)
      .extract({ left: 480, top: 0, width: 1328, height: 870 })
      .resize(carW, carH)
      .toBuffer();

    const featherSvg = Buffer.from(`
      <svg width="${carW}" height="${carH}">
        <defs>
          <linearGradient id="tpFeather" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0" />
            <stop offset="12%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="1" />
          </linearGradient>
        </defs>
        <rect width="${carW}" height="${carH}" fill="url(#tpFeather)" />
      </svg>
    `);

    const carFeathered = await sharp(carRaw)
      .composite([{ input: featherSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    const skyH = carTop + 90;
    const skyRaw = await sharp(src)
      .extract({ left: 0, top: 0, width: 1808, height: 220 })
      .resize(W, skyH, { fit: 'cover' })
      .blur(6)
      .toBuffer();

    const gradSvg = Buffer.from(`
      <svg width="${W}" height="${H}">
        <defs>
          <linearGradient id="tpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#020403" stop-opacity="1" />
            <stop offset="40%" stop-color="#020403" stop-opacity="0.95" />
            <stop offset="50%" stop-color="#020403" stop-opacity="0.70" />
            <stop offset="58%" stop-color="#020403" stop-opacity="0" />
            <stop offset="93%" stop-color="#020403" stop-opacity="0" />
            <stop offset="100%" stop-color="#020403" stop-opacity="0.75" />
          </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#tpGrad)" />
      </svg>
    `);

    const base = await sharp({
      create: { width: W, height: H, channels: 4, background: { r: 2, g: 4, b: 3, alpha: 1 } }
    }).png().toBuffer();

    await sharp(base)
      .composite([
        { input: skyRaw, left: 0, top: 0 },
        { input: carFeathered, left: carLeft, top: carTop },
        { input: gradSvg, left: 0, top: 0 }
      ])
      .webp({ quality: 92 })
      .toFile(path.join(outDir, 'hero_tablet_portrait.webp'));

    console.log('✓ hero_tablet_portrait.webp created');
  }

  // =========================================================================
  // 3. TABLET LANDSCAPE: 1600 x 1000 (ideal for 1024x768, 1180x820, 1280x800)
  // =========================================================================
  {
    const W = 1600;
    const H = 1000;

    // We want the car + charger on the right: width ~960, height ~630.
    // Positioned at right margin: carLeft = W - carW - 10 = 630.
    // Positioned vertically centered/bottom: carTop = H - carH - 30 = 340.
    const carW = 960;
    const carH = Math.round(870 * (carW / 1328)); // ~629
    const carLeft = W - carW - 10; // 1600 - 960 - 10 = 630
    const carTop = H - carH - 30; // 1000 - 629 - 30 = 341

    const carRaw = await sharp(src)
      .extract({ left: 480, top: 0, width: 1328, height: 870 })
      .resize(carW, carH)
      .toBuffer();

    // Feather top (12%) and left (15%)
    const featherSvg = Buffer.from(`
      <svg width="${carW}" height="${carH}">
        <defs>
          <linearGradient id="tlFeatherL" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0" />
            <stop offset="12%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="tlFeatherT" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0" />
            <stop offset="12%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="1" />
          </linearGradient>
          <mask id="tlMask">
            <rect width="${carW}" height="${carH}" fill="url(#tlFeatherL)" />
            <rect width="${carW}" height="${carH}" fill="url(#tlFeatherT)" style="mix-blend-mode: multiply;" />
          </mask>
        </defs>
        <rect width="${carW}" height="${carH}" fill="#fff" mask="url(#tlMask)" />
      </svg>
    `);

    const carFeathered = await sharp(carRaw)
      .composite([{ input: featherSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // Atmospheric sky background covering full canvas
    const skyRaw = await sharp(src)
      .extract({ left: 0, top: 0, width: 1808, height: 260 })
      .resize(W, H, { fit: 'cover' })
      .blur(8)
      .toBuffer();

    // City skyline on left side (x=0 to 520) blurred
    const cityLeft = await sharp(src)
      .extract({ left: 0, top: 0, width: 520, height: 870 })
      .resize(Math.round(W * 0.55), H, { fit: 'cover' })
      .blur(4)
      .toBuffer();

    // Dark gradient: solid dark on left 0 to 40% for text, smooth fade to car
    const gradSvg = Buffer.from(`
      <svg width="${W}" height="${H}">
        <defs>
          <linearGradient id="tlGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#020403" stop-opacity="1" />
            <stop offset="38%" stop-color="#020403" stop-opacity="0.95" />
            <stop offset="48%" stop-color="#020403" stop-opacity="0.75" />
            <stop offset="55%" stop-color="#020403" stop-opacity="0.15" />
            <stop offset="62%" stop-color="#020403" stop-opacity="0" />
            <stop offset="100%" stop-color="#020403" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="tlVignette" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#020403" stop-opacity="0.6" />
            <stop offset="15%" stop-color="#020403" stop-opacity="0" />
            <stop offset="85%" stop-color="#020403" stop-opacity="0" />
            <stop offset="100%" stop-color="#020403" stop-opacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#tlGrad)" />
        <rect width="${W}" height="${H}" fill="url(#tlVignette)" />
      </svg>
    `);

    const base = await sharp({
      create: { width: W, height: H, channels: 4, background: { r: 2, g: 4, b: 3, alpha: 1 } }
    }).png().toBuffer();

    await sharp(base)
      .composite([
        { input: skyRaw, left: 0, top: 0 },
        { input: cityLeft, left: 0, top: 0 },
        { input: carFeathered, left: carLeft, top: carTop },
        { input: gradSvg, left: 0, top: 0 }
      ])
      .webp({ quality: 92 })
      .toFile(path.join(outDir, 'hero_tablet_landscape.webp'));

    console.log('✓ hero_tablet_landscape.webp created');
  }

  // =========================================================================
  // 4. DESKTOP WIDESCREEN: 2500 x 1100 (for >= 1280px desktops)
  // =========================================================================
  {
    const W = 2500;
    const H = 1100;

    const carW = 1280;
    const carH = Math.round(870 * (carW / 1328)); // ~839
    const carLeft = W - carW - 30; // 2500 - 1280 - 30 = 1190
    const carTop = H - carH - 25; // ~236

    const carRaw = await sharp(src)
      .extract({ left: 480, top: 0, width: 1328, height: 870 })
      .resize(carW, carH)
      .toBuffer();

    const featherSvg = Buffer.from(`
      <svg width="${carW}" height="${carH}">
        <defs>
          <linearGradient id="dFeatherL" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0" />
            <stop offset="12%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="dFeatherT" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0" />
            <stop offset="10%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="1" />
          </linearGradient>
          <mask id="dMask">
            <rect width="${carW}" height="${carH}" fill="url(#dFeatherL)" />
            <rect width="${carW}" height="${carH}" fill="url(#dFeatherT)" style="mix-blend-mode: multiply;" />
          </mask>
        </defs>
        <rect width="${carW}" height="${carH}" fill="#fff" mask="url(#dMask)" />
      </svg>
    `);

    const carFeathered = await sharp(carRaw)
      .composite([{ input: featherSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    const skyRaw = await sharp(src)
      .extract({ left: 0, top: 0, width: 1808, height: 260 })
      .resize(W, H, { fit: 'cover' })
      .blur(8)
      .toBuffer();

    const cityLeft = await sharp(src)
      .extract({ left: 0, top: 0, width: 520, height: 870 })
      .resize(Math.round(W * 0.52), H, { fit: 'cover' })
      .blur(4)
      .toBuffer();

    const gradSvg = Buffer.from(`
      <svg width="${W}" height="${H}">
        <defs>
          <linearGradient id="dGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#020403" stop-opacity="1" />
            <stop offset="36%" stop-color="#020403" stop-opacity="0.95" />
            <stop offset="46%" stop-color="#020403" stop-opacity="0.75" />
            <stop offset="52%" stop-color="#020403" stop-opacity="0.15" />
            <stop offset="58%" stop-color="#020403" stop-opacity="0" />
            <stop offset="100%" stop-color="#020403" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="dVignette" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#020403" stop-opacity="0.6" />
            <stop offset="15%" stop-color="#020403" stop-opacity="0" />
            <stop offset="85%" stop-color="#020403" stop-opacity="0" />
            <stop offset="100%" stop-color="#020403" stop-opacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#dGrad)" />
        <rect width="${W}" height="${H}" fill="url(#dVignette)" />
      </svg>
    `);

    const base = await sharp({
      create: { width: W, height: H, channels: 4, background: { r: 2, g: 4, b: 3, alpha: 1 } }
    }).png().toBuffer();

    await sharp(base)
      .composite([
        { input: skyRaw, left: 0, top: 0 },
        { input: cityLeft, left: 0, top: 0 },
        { input: carFeathered, left: carLeft, top: carTop },
        { input: gradSvg, left: 0, top: 0 }
      ])
      .webp({ quality: 92 })
      .toFile(path.join(outDir, 'hero_desktop.webp'));

    console.log('✓ hero_desktop.webp created');
  }

  console.log('All responsive heroes built cleanly!');
}

buildCleanHeroes().catch(console.error);
