const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function convertAssets() {
  const images = [
    { src: '6.png', dest: 'solution_residential_nexon.webp' },
    { src: '5.png', dest: 'solution_commercial_phoenix.webp' },
    { src: '4.png', dest: 'solution_highway_expressway.webp' },
    { src: '7.png', dest: 'why_engineered_for_india.webp' },
    { src: '3.png', dest: 'why_reliable_deployment.webp' },
    { src: '2.png', dest: 'why_247_support.webp' },
    { src: '1.png', dest: 'product_ac_2wheeler_3_3kw.webp' },
    { src: '8.png', dest: 'product_ac_22kw.webp' },
    { src: '9.png', dest: 'product_ac_11kw.webp' },
    { src: '10.png', dest: 'product_ac_7_4kw_white.webp' },
    { src: '11.png', dest: 'product_ac_7_4kw.webp' }
  ];

  const baseDir = 'src/assets/images';

  for (const item of images) {
    const srcPath = path.join(baseDir, item.src);
    const destPath = path.join(baseDir, item.dest);

    if (fs.existsSync(srcPath)) {
      await sharp(srcPath)
        .webp({ quality: 92 })
        .toFile(destPath);
      const meta = await sharp(destPath).metadata();
      const stats = fs.statSync(destPath);
      console.log(`✓ Converted ${item.src} -> ${item.dest} (${meta.width}x${meta.height}, ${(stats.size / 1024).toFixed(1)} KB)`);
    } else {
      console.warn(`File not found: ${srcPath}`);
    }
  }

  console.log('All images converted to WebP successfully!');
}

convertAssets().catch(console.error);
