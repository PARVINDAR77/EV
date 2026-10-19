const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function applyCommercialLogo() {
  const targetPath = path.resolve('d:/EV/src/assets/images/solution_commercial_phoenix.webp');
  const backupPath = path.resolve('d:/EV/src/assets/images/solution_commercial_phoenix.original_backup.webp');
  const genPath = 'C:/Users/SEO STZK/.gemini/antigravity-ide/brain/bcc447db-0590-4be1-a438-4886daf0ebce/axion_commercial_mall_1792388291210.jpg';

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(targetPath, backupPath);
    console.log('Created backup of original at:', backupPath);
  }

  const origBuf = fs.readFileSync(backupPath);
  const genBuf = await sharp(genPath).resize(1536, 1024, { fit: 'fill' }).toBuffer();

  const boxLeft = 450;
  const boxTop = 135;
  const boxWidth = 265;
  const boxHeight = 205;

  const genCrop = await sharp(genBuf)
    .extract({ left: boxLeft, top: boxTop, width: boxWidth, height: boxHeight })
    .toBuffer();

  const maskSvg = `<svg width="${boxWidth}" height="${boxHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="f" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3.5" />
      </filter>
    </defs>
    <rect width="${boxWidth}" height="${boxHeight}" fill="black" />
    <rect x="7" y="7" width="${boxWidth - 14}" height="${boxHeight - 14}" rx="6" fill="white" filter="url(#f)" />
  </svg>`;

  const maskChannel = await sharp(Buffer.from(maskSvg)).extractChannel(0).toBuffer();

  const maskedGen = await sharp(genCrop)
    .ensureAlpha()
    .joinChannel(maskChannel)
    .png()
    .toBuffer();

  await sharp(origBuf)
    .composite([{ input: maskedGen, left: boxLeft, top: boxTop }])
    .webp({ quality: 95 })
    .toFile(targetPath);

  console.log('Successfully updated:', targetPath);
}

applyCommercialLogo().catch(console.error);
