const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const jsDir = path.join(__dirname, '../js');
const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js') && !f.endsWith('.min.js'));

async function minifyFiles() {
  for (const file of files) {
    const filePath = path.join(jsDir, file);
    const code = fs.readFileSync(filePath, 'utf-8');
    const minifiedFileName = file.replace('.js', '.min.js');
    const minifiedFilePath = path.join(jsDir, minifiedFileName);
    
    try {
      const result = await minify(code);
      if (result.error) throw result.error;
      fs.writeFileSync(minifiedFilePath, result.code);
      console.log(`Minified ${file} -> ${minifiedFileName}`);
    } catch (err) {
      console.error(`Failed to minify ${file}`, err);
    }
  }
}

minifyFiles();
