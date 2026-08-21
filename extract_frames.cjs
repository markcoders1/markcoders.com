const { execSync } = require('child_process');
const path = require('path');

// Get ffmpeg path from ffmpeg-static
let ffmpegPath;
try {
  ffmpegPath = require('ffmpeg-static');
} catch(e) {
  console.log('Installing ffmpeg-static...');
  execSync('npm install ffmpeg-static --no-save', { stdio: 'inherit' });
  ffmpegPath = require('ffmpeg-static');
}

const videoPath = path.join(__dirname, 'src', 'assets', 'bandicam 2026-08-19 01-24-02-960.mp4');

const frames = [
  { time: '00:00:01', name: 'cursor_ref_1.png' },
  { time: '00:00:03', name: 'cursor_ref_2.png' },
  { time: '00:00:05', name: 'cursor_ref_3.png' },
];

frames.forEach(({ time, name }) => {
  const outPath = path.join(__dirname, name);
  const cmd = `"${ffmpegPath}" -i "${videoPath}" -ss ${time} -vframes 1 "${outPath}" -y`;
  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log(`Extracted: ${name}`);
  } catch(err) {
    console.error(`Failed ${name}:`, err.stderr?.toString()?.slice(0, 300));
  }
});

console.log('Done!');
