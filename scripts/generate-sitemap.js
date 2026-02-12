const fs = require('fs');
const path = require('path');

const baseUrl = 'https://petneeds.ai';
const siteDir = path.join(__dirname, '../'); // root folder with HTML files
const outputFile = path.join(__dirname, '../sitemap.xml');

const htmlFiles = fs.readdirSync(siteDir).filter(f => f.endsWith('.html'));

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

htmlFiles.forEach(file => {
  const loc = `${baseUrl}/${file}`;
  sitemap += `  <url>\n    <loc>${loc}</loc>\n    <priority>0.8</priority>\n    <changefreq>weekly</changefreq>\n  </url>\n`;
});

sitemap += '</urlset>';

fs.writeFileSync(outputFile, sitemap);
console.log(`✅ sitemap.xml generated with ${htmlFiles.length} pages`);
