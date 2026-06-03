import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const INPUT_DIR = path.resolve('raw-images');
const OUTPUT_DIR = path.resolve('src/assets');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function processDirectory(currentDir, relativePath = '') {
  const entries = await fs.readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    const relPath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath, relPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff'];
      
      if (imageExtensions.includes(ext)) {
        const outputSubdir = path.join(OUTPUT_DIR, relativePath);
        await ensureDir(outputSubdir);

        const filenameWithoutExt = path.parse(entry.name).name;
        const outputPath = path.join(outputSubdir, `${filenameWithoutExt}.webp`);

        console.log(`Processing: ${relPath} -> ${path.join(relativePath, `${filenameWithoutExt}.webp`)}`);

        try {
          const info = await sharp(fullPath)
            .webp({ quality: 80, effort: 6 })
            .toFile(outputPath);

          const originalStat = await fs.stat(fullPath);
          const originalKB = (originalStat.size / 1024).toFixed(1);
          const compressedKB = (info.size / 1024).toFixed(1);
          const savingsPercent = ((1 - info.size / originalStat.size) * 100).toFixed(1);

          console.log(`  Done: ${originalKB} KB -> ${compressedKB} KB (-${savingsPercent}%)`);
        } catch (error) {
          console.error(`  Error processing ${relPath}:`, error.message);
        }
      }
    }
  }
}

async function main() {
  try {
    await ensureDir(INPUT_DIR);
    await ensureDir(OUTPUT_DIR);

    console.log(`Scanning '${INPUT_DIR}' for images...`);
    const entries = await fs.readdir(INPUT_DIR);
    if (entries.length === 0) {
      console.log(`\nNo images found in '${INPUT_DIR}'.`);
      console.log(`Please place your raw images (.jpg, .png, etc.) inside the 'raw-images' folder in your project root and run 'npm run compress' again.\n`);
      return;
    }

    await processDirectory(INPUT_DIR);
    console.log('\nCompression and WebP conversion complete!');
  } catch (err) {
    console.error('Error running compression script:', err);
  }
}

main();
