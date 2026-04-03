const fs = require('fs');
const path = require('path');

const locales = ['hi', 'es', 'ru', 'fr', 'de', 'it', 'pt', 'bn', 'ja', 'ko', 'ms', 'pl', 'id', 'ar', 'bg', 'tr', 'sv'];
const rootDir = __dirname;
const indexHtmlPath = path.join(rootDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error("index.html not found");
  process.exit(1);
}

const rootHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

locales.forEach(loc => {
  const isRtl = loc === 'ar';
  const dirPath = path.join(rootDir, loc);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  // Replace lang and dir attributes
  let locHtml = rootHtml.replace(/<html lang="en" dir="ltr">/, `<html lang="${loc}" dir="${isRtl ? 'rtl' : 'ltr'}">`);
  
  // Update canonical URL
  locHtml = locHtml.replace(/href="https:\/\/katakana-converter\.com\/"/, `href="https://katakana-converter.com/${loc}/"`);
  
  // Update OG URL
  locHtml = locHtml.replace(/content="https:\/\/katakana-converter\.com\/"/, `content="https://katakana-converter.com/${loc}/"`);
  
  // Update JSON-LD WebSite and WebApplication URLs
  locHtml = locHtml.replace(/"url": "https:\/\/katakana-converter\.com\/"/g, `"url": "https://katakana-converter.com/${loc}/"`);

  // Update relative base paths for css/js so they point up one directory
  // Example: href="css/style.css" -> href="../css/style.css"
  locHtml = locHtml.replace(/href="css\//g, 'href="../css/');
  locHtml = locHtml.replace(/src="js\//g, 'src="../js/');
  
  // Update the init script
  locHtml = locHtml.replace(/SiteLayout\.init\('\/'\);/g, `SiteLayout.init('/${loc}/');`);

  fs.writeFileSync(path.join(dirPath, 'index.html'), locHtml);
  console.log(`Generated locale: ${loc}`);
});

console.log('All locale directories generated successfully.');
