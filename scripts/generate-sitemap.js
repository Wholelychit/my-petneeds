const fs = require('fs');
const path = require('path');

const baseUrl = 'https://petneeds.ai';
const rootDir = path.join(__dirname, '../');
const outputFile = path.join(rootDir, 'sitemap.xml');

const files = fs.readdirSync(rootDir)
  .filter(file => file.endsWith('.html'));

const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

files.forEach(file => {
  const urlPath = file === 'index.html' ? '' : file;
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/${urlPath}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>${file === 'index.html' ? '1.0' : '0.8'}</priority>\n`;
  xml += `  </url>\n\n`;
});

xml += `</urlset>`;

fs.writeFileSync(outputFile, xml);

console.log('✅ Sitemap rebuilt successfully');
