const fs = require('fs');

const srcPath = process.argv[2];
const destPath = process.argv[3];

if (!srcPath || !destPath) {
  console.error('Usage: node saveB64.cjs <srcPath> <destPath>');
  process.exit(1);
}

let content = fs.readFileSync(srcPath, 'utf8');

// Find the base64 string inside quotes or between backticks
const match = content.match(/"(\/9j\/[^"]+)"/) || content.match(/(\/9j\/[A-Za-z0-9+/=]+)/);
if (!match) {
  console.error('Could not find base64 JPEG data in source file!');
  process.exit(1);
}

const b64 = match[1].replace(/\s+/g, '');
const buf = Buffer.from(b64, 'base64');
fs.writeFileSync(destPath, buf);
console.log('Successfully saved to', destPath, 'Size:', buf.length, 'bytes');
