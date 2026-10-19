const sharp = require('sharp');
const fs = require('fs');

async function buildFixedImage() {
  const { data, info } = await sharp('src/assets/images/AXION DC charger with black cables-1.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cleaned = Buffer.from(data);

  // 1. Inpaint old logo (x: 1100 to 1495, y: 35 to 180)
  for (let y = 35; y <= 180; y++) {
    const sampleY = 200 + ((y * 7) % 40);
    for (let x = 1100; x <= 1495; x++) {
      const srcIdx = (sampleY * info.width + x) * 3;
      const dstIdx = (y * info.width + x) * 3;
      cleaned[dstIdx] = data[srcIdx];
      cleaned[dstIdx+1] = data[srcIdx+1];
      cleaned[dstIdx+2] = data[srcIdx+2];
    }
  }

  // 2. Inpaint old text (x: 775 to 1480, y: 305 to 465)
  for (let y = 305; y <= 465; y++) {
    const sampleY = 240 + ((y * 11) % 40);
    for (let x = 775; x <= 1480; x++) {
      const srcIdx = (sampleY * info.width + x) * 3;
      const dstIdx = (y * info.width + x) * 3;
      cleaned[dstIdx] = data[srcIdx];
      cleaned[dstIdx+1] = data[srcIdx+1];
      cleaned[dstIdx+2] = data[srcIdx+2];
    }
  }

  // Read axion_logo.svg and extract its inner paths
  let logoSvg = fs.readFileSync('src/assets/images/axion_logo.svg', 'utf8');
  logoSvg = logoSvg.replace(/#00FF00/g, '#00FF55');
  const innerPaths = logoSvg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');

  const overlaySvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
    <!-- Top-Right AXION CHARGE Logo shifted safely into black wood wall -->
    <g transform="translate(975, 68)">
      <svg viewBox="100.6 221.2 638.1 179.3" width="310" height="87">
        ${innerPaths}
      </svg>
      <!-- Subtitle ENERGY : EVOLVED -->
      <text x="155" y="103" text-anchor="middle" font-family="'Orbitron', 'Montserrat', 'Inter', Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="4.5" fill="#FFFFFF" fill-opacity="0.95">ENERGY : EVOLVED</text>
    </g>

    <!-- DC FAST CHARGER & AXION DC 30 KW shifted safely with ample margin -->
    <g transform="translate(805, 310)">
      <text x="2" y="28" font-family="'Outfit', 'Montserrat', 'Inter', Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="5" fill="#D1D5DB">DC FAST CHARGER</text>
      <text x="2" y="94" font-family="'Outfit', 'Montserrat', 'Inter', Arial, sans-serif" font-size="58" font-weight="900" letter-spacing="1">
        <tspan fill="#FFFFFF">AXION DC</tspan><tspan dx="20" fill="#00FF55">30 KW</tspan>
      </text>
    </g>
  </svg>
  `;

  const cleanBg = await sharp(cleaned, { raw: { width: info.width, height: info.height, channels: 3 } })
    .png()
    .toBuffer();

  const finalComposite = await sharp(cleanBg)
    .composite([
      { input: Buffer.from(overlaySvg), left: 0, top: 0 }
    ])
    .toBuffer();

  // Save the final WebP to the actual asset file!
  await sharp(finalComposite)
    .resize(1536, 1024)
    .webp({ quality: 92 })
    .toFile('src/assets/images/AXION DC charger with black cables-1.webp');

  console.log('src/assets/images/AXION DC charger with black cables-1.webp updated successfully!');

  // Also simulate website card on standard laptop (450 x 330)
  await sharp('src/assets/images/AXION DC charger with black cables-1.webp')
    .resize(450, 330, { fit: 'cover', position: 'center' })
    .toFile('scripts/sim_card_laptop.jpg');

  console.log('sim_card_laptop.jpg saved!');
}

buildFixedImage().catch(console.error);
