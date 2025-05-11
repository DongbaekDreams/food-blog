import * as fs from 'fs';
import * as path from 'path';

const DISHES_DIR = path.join(process.cwd(), 'public', 'images', 'dishes');

interface ImageManifest {
  [dishDir: string]: string[];
}

function generateImageManifest(): void {
  const manifest: ImageManifest = {};

  // Read all dish directories
  const dishDirs = fs.readdirSync(DISHES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // For each dish directory, get all image files
  dishDirs.forEach(dishDir => {
    const fullPath = path.join(DISHES_DIR, dishDir);
    const files = fs.readdirSync(fullPath)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic'].includes(ext);
      })
      .map(file => `/images/dishes/${dishDir}/${file}`);
    
    manifest[dishDir] = files;
  });

  // Write the manifest to a JSON file
  const manifestPath = path.join(process.cwd(), 'src', 'data', 'imageManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Image manifest generated successfully!');
}

generateImageManifest(); 