import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const GITHUB_USERNAME = 'douglasestivales'; // Replace with your GitHub username
const REPO_NAME = 'threejms-liquorstore'; // Replace with your repo name
const BRANCH = 'main'; // Replace with your default branch
const STATIC_DIR = path.join(__dirname, '../public/images'); // Path to your static assets

// Function to get jsDelivr URL
const getJsDelivrUrl = (filePath) => {
  const relativePath = path.relative(STATIC_DIR, filePath);
  return `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${REPO_NAME}@${BRANCH}/public/images/${relativePath}`;
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
      const jsDelivrUrl = getJsDelivrUrl(fullPath);
      console.log(`File: ${file}`);
      console.log(`jsDelivr URL: ${jsDelivrUrl}\n`);
    }
  });
};

// Main execution
console.log('Generating jsDelivr URLs for static assets...\n');
processDirectory(STATIC_DIR);

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
        const relativePath = path.relative(STATIC_DIR, fullPath);
        mapping[relativePath] = getJsDelivrUrl(fullPath);
      }
    });
  };
  
  addToMapping(STATIC_DIR);
  
  // Write mapping to file
  fs.writeFileSync(
    path.join(__dirname, '../src/utils/jsdelivr-mapping.js'),
    `export const jsDelivrMapping = ${JSON.stringify(mapping, null, 2)};`
  );
  
  console.log('Created jsdelivr-mapping.js with all asset URLs');
};

createMappingFile(); 