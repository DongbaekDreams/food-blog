import * as fs from 'fs';
import * as path from 'path';

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const DISHES_DIR = path.join(PUBLIC_IMAGES_DIR, 'dishes');
const RESTAURANTS_DIR = path.join(PUBLIC_IMAGES_DIR, 'restaurants');

interface ImageCollection {
  [dirName: string]: string[];
}

interface CombinedImageManifest {
  dishes: ImageCollection;
  restaurants: ImageCollection;
}

function listImagesInDirectory(baseDir: string, imagePathPrefix: string): ImageCollection {
  const collection: ImageCollection = {};
  if (!fs.existsSync(baseDir)) {
    console.warn(`Warning: Directory not found: ${baseDir}`);
    return collection;
  }

  const subDirs = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  subDirs.forEach(subDir => {
    const fullPath = path.join(baseDir, subDir);
    const files = fs.readdirSync(fullPath)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic'].includes(ext);
      })
      .map(file => `${imagePathPrefix}/${subDir}/${file}`);
    
    if (files.length > 0) {
      collection[subDir] = files;
    }
  });
  return collection;
}

function generateImageManifest(): void {
  const manifest: CombinedImageManifest = {
    dishes: listImagesInDirectory(DISHES_DIR, '/images/dishes'),
    restaurants: listImagesInDirectory(RESTAURANTS_DIR, '/images/restaurants')
  };

  const manifestPath = path.join(process.cwd(), 'src', 'data', 'imageManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Combined image manifest generated successfully!');
}

generateImageManifest(); 