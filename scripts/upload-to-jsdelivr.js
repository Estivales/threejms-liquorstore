import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const GITHUB_USERNAME = 'Estivales'; // Updated to correct GitHub username
const REPO_NAME = 'threejms-liquorstore'; // Replace with your repo name
const BRANCH = 'main'; // Replace with your default branch

// Define multiple static directories
const STATIC_DIRS = [
  path.join(__dirname, '../public/images'),
  path.join(__dirname, '../public/customers'),
  path.join(__dirname, '../public/bottles')
];

// Function to get jsDelivr URL
const getJsDelivrUrl = (filePath, baseDir) => {
  const relativePath = path.relative(baseDir, filePath);
  const dirName = path.basename(baseDir);
  return `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${REPO_NAME}@${BRANCH}/public/${dirName}/${relativePath}`;
};

// Function to process all files in directory
const processDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else {
      const jsDelivrUrl = getJsDelivrUrl(fullPath, dir);
      console.log(`File: ${file}`);
      console.log(`jsDelivr URL: ${jsDelivrUrl}\n`);
    }
  });
};

// Main execution
console.log('Generating jsDelivr URLs for static assets...\n');
STATIC_DIRS.forEach(dir => {
  if (fs.existsSync(dir)) {
    processDirectory(dir);
  }
});

// Create a mapping file
const createMappingFile = () => {
  const mapping = {};
  
  const addToMapping = (dir) => {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        addToMapping(fullPath);
      } else {
        const relativePath = path.relative(dir, fullPath);
        const dirName = path.basename(dir);
        mapping[`${dirName}/${relativePath}`] = getJsDelivrUrl(fullPath, dir);
      }
    });
  };
  
  STATIC_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      addToMapping(dir);
    }
  });
  
  // Write mapping to file
  fs.writeFileSync(
    path.join(__dirname, '../src/utils/jsdelivr-mapping.js'),
    `export const jsDelivrMapping = ${JSON.stringify(mapping, null, 2)};`
  );
  
  console.log('Created jsdelivr-mapping.js with all asset URLs');
};

createMappingFile(); 