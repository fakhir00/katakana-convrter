const fs = require('fs');
const readline = require('readline');

// Katakana regex: \u30A0-\u30FF
const isKatakana = (str) => /^[\u30A0-\u30FFー]+$/.test(str);

const rl = readline.createInterface({
  input: fs.createReadStream('jmdict-eng-common.json'),
  crlfDelay: Infinity
});

const loanwords = {};

rl.on('line', (line) => {
  try {
    const entry = JSON.parse(line.trim().replace(/,$/, ''));
    if (!entry.kana) return;

    // We want entries that have a katakana reading
    const katakanaReadings = entry.kana.filter(k => isKatakana(k.text));
    if (katakanaReadings.length === 0) return;

    const kana = katakanaReadings[0].text;
    
    // Check senses for English glosses
    entry.sense.forEach(s => {
      s.gloss.forEach(g => {
        if (g.lang === 'eng') {
          const eng = g.text.toLowerCase().trim();
          // Avoid long definitions, just short words/phrases
          if (eng.length > 0 && eng.length < 30 && eng.split(' ').length < 4) {
            // If it's a known loanword sense (misc: 'uk' for usually kana, etc.)
            // we prioritize it
            if (!loanwords[eng] || (entry.kana[0].common && !loanwords[eng].common)) {
              loanwords[eng] = { kana, common: entry.kana[0].common };
            }
          }
        }
      });
    });
  } catch (e) {
    // Ignore malformed lines or start/end of array
  }
});

rl.on('close', () => {
  const result = {};
  Object.keys(loanwords).sort().forEach(eng => {
    result[eng] = loanwords[eng].kana;
  });
  
  fs.writeFileSync('js/loanwords-pro.json', JSON.stringify(result, null, 2));
  console.log('Extracted ' + Object.keys(result).length + ' loanwords to js/loanwords-pro.json');
});
