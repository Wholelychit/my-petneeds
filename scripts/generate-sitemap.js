const fs = require('fs');
const path = require('path');

const baseUrl = 'https://petneeds.ai';
const rootDir = path.join(__dirname, '../'); // adjust if your script is inside a subfolder
const outputFile = path.join(rootDir, 'sitemap.xml');

// Helper to recursively get all HTML files, including blog folder
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(rootDir);

// Format today’s date
const today = new Date().toISOString().split('T')[0];

// Start XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

htmlFiles.forEach(filePath => {
  // Get relative path from rootDir
  const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const urlPath = relativePath === 'index.html' ? '' : relativePath;

  // Determine priority
  const priority = relativePath === 'index.html' ? '1.0' : '0.8';

  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/${urlPath}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  xml += `  </url>\n\n`;
});

xml += `</urlset>`;

// Write sitemap
fs.writeFileSync(outputFile, xml);

console.log('✅ Sitemap rebuilt successfully with blog pages included!');
