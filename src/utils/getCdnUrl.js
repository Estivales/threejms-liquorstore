import { jsDelivrMapping } from './jsdelivr-mapping.js';

export const getCdnUrl = (localPath) => {
  // Remove any leading slash, ./, or public/images/ from the path
  const normalizedPath = localPath
    .replace(/^[./]/, '')
    .replace(/^public\/images\//, '')
    .replace(/^images\//, '');
    
  return jsDelivrMapping[normalizedPath] || localPath;
}; 