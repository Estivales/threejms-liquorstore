import { jsDelivrMapping } from './jsdelivr-mapping.js';

export const getCdnUrl = (localPath) => {
  // Remove any leading slash or ./
  const normalizedPath = localPath
    .replace(/^[./]/, '')
    .replace(/^public\//, '');
    
  return jsDelivrMapping[normalizedPath] || localPath;
}; 