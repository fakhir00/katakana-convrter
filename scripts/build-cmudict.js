const fs = require('fs');
const path = require('path');

async function main() {
  const mod = await import('cmu-pronouncing-dictionary');
  const dictionary = mod.dictionary || {};
  const compact = {};

  Object.keys(dictionary).forEach(function (key) {
    const baseKey = key.toLowerCase().replace(/\(\d+\)$/, '');
    if (!compact[baseKey]) {
      compact[baseKey] = dictionary[key];
    }
  });

  const output = '(function(global){global.CMUDict=' + JSON.stringify(compact) + ';})(typeof window!==\"undefined\"?window:this);\n';
  const outPath = path.join(__dirname, '..', 'js', 'cmudict-data.js');
  fs.writeFileSync(outPath, output);
  console.log('Wrote ' + outPath + ' with ' + Object.keys(compact).length + ' entries.');
}

main().catch(function (error) {
  console.error(error);
  process.exit(1);
});
