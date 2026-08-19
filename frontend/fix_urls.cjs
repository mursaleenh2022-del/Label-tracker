const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.vue')) results.push(file);
    }
  });
  return results;
};

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Inject const API_URL if not present
  if (content.includes('`$API_URL') && !content.includes('const API_URL')) {
    content = content.replace(/<script setup>/, `<script setup>\nconst API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';\n`);
  }
  
  // Fix the strings
  content = content.replace(/'`\$API_URL([^']+)'/g, '`${API_URL}$1`');
  content = content.replace(/``\$API_URL([^`]+)`/g, '`${API_URL}$1`');
  
  fs.writeFileSync(file, content, 'utf8');
});
console.log('Done');
