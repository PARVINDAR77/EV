const { execSync } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs');
const path = require('path');

// Video list to optimize
const videosToCompress = [
  // public/videos
  {
    file: 'd:/EV/public/videos/loading.mp4',
    hasAudio: true,
    scale: '1280:-2',
    crf: '29',
    maxrate: '700k'
  },
  {
    file: 'd:/EV/public/videos/commercial.mp4',
    hasAudio: false,
    scale: '1280:-2',
    crf: '29',
    maxrate: '650k'
  },
  {
    file: 'd:/EV/public/videos/residential.mp4',
    hasAudio: false,
    scale: '1280:-2',
    crf: '29',
    maxrate: '650k'
  },
  {
    file: 'd:/EV/public/videos/workplace.mp4',
    hasAudio: false,
    scale: '1280:-2',
    crf: '29',
    maxrate: '650k'
  },
  {
    file: 'd:/EV/public/videos/fleet.mp4',
    hasAudio: false,
    scale: '1280:-2',
    crf: '29',
    maxrate: '650k'
  },
  {
    file: 'd:/EV/public/videos/highway.mp4',
    hasAudio: false,
    scale: '1280:-2',
    crf: '29',
    maxrate: '650k'
  },
  // src/assets/images
  {
    file: 'd:/EV/src/assets/images/EV_charging_commercial_video_prompt_20261015162719.mp4',
    hasAudio: true,
    scale: '1280:-2',
    crf: '29',
    maxrate: '700k'
  },
  {
    file: 'd:/EV/src/assets/images/commercial_video.mp4',
    hasAudio: false,
    scale: '1280:-2',
    crf: '29',
    maxrate: '650k'
  },
  {
    file: 'd:/EV/src/assets/images/EV_charging_at_night_20260929123844_gwr_video_mvp.mp4',
    hasAudio: false,
    scale: '1280:-2',
    crf: '29',
    maxrate: '650k'
  },
  {
    file: 'd:/EV/src/assets/images/EV_charging_at_corporate_office_20260929124509_gwr_video_mvp.mp4',
    hasAudio: false,
    scale: '1280:-2',
    crf: '29',
    maxrate: '650k'
  },
  {
    file: 'd:/EV/src/assets/images/Electric_fleet_vans_charging_depot_20260929131411_gwr_video_mvp.mp4',
    hasAudio: false,
    scale: '1280:-2',
    crf: '29',
    maxrate: '650k'
  },
  {
    file: 'd:/EV/src/assets/images/Blue_SUV_charging_at_station_20260929134507_gwr_video_mvp.mp4',
    hasAudio: false,
    scale: '1280:-2',
    crf: '29',
    maxrate: '650k'
  }
];

// Backup directories
const backupDirs = [
  'd:/EV/public/videos/backup_original',
  'd:/EV/src/assets/images/backup_original_videos'
];

backupDirs.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const results = [];

videosToCompress.forEach(item => {
  const filePath = item.file;
  if (!fs.existsSync(filePath)) return;

  const baseName = path.basename(filePath);
  const dirName = path.dirname(filePath);
  const backupPath = path.join(dirName, dirName.includes('public') ? 'backup_original' : 'backup_original_videos', baseName);

  const origSize = fs.statSync(filePath).size;

  // Make backup if not already exists
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
  }

  const tempOutput = filePath + '.tmp.mp4';

  const args = [
    '-y',
    '-i', filePath,
    '-vf', `scale=${item.scale}`,
    '-c:v', 'libx264',
    '-crf', item.crf,
    '-preset', 'medium',
    '-maxrate', item.maxrate,
    '-bufsize', '1400k',
    '-movflags', '+faststart'
  ];

  if (item.hasAudio) {
    args.push('-c:a', 'aac', '-b:a', '64k', '-ac', '2');
  } else {
    args.push('-an');
  }

  args.push(tempOutput);

  console.log(`Compressing ${baseName}...`);
  try {
    execSync(`"${ffmpeg}" ${args.map(a => `"${a}"`).join(' ')}`, { stdio: 'ignore' });
    const newSize = fs.statSync(tempOutput).size;

    // Replace original with optimized
    fs.unlinkSync(filePath);
    fs.renameSync(tempOutput, filePath);

    const red = (((origSize - newSize) / origSize) * 100).toFixed(1);
    results.push({
      file: baseName,
      location: dirName.includes('public') ? 'public/videos' : 'src/assets/images',
      origKB: (origSize / 1024).toFixed(1) + ' KB (' + (origSize / 1024 / 1024).toFixed(2) + ' MB)',
      newKB: (newSize / 1024).toFixed(1) + ' KB (' + (newSize / 1024 / 1024).toFixed(2) + ' MB)',
      reduction: red + '%'
    });
  } catch (err) {
    console.error(`Failed to compress ${baseName}:`, err.message);
    if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);
  }
});

console.log('\n=== COMPRESSION RESULTS ===');
console.table(results);

// Clean up test file if exists
const testFile = 'd:/EV/public/videos/loading_test.mp4';
if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
