const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexHtmlPath = path.join(rootDir, '..', 'index.html');
let rootHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

const cards = [
  { icon: '🔤', title: 'Katakana Name', desc: 'Convert your English name instantly to Japanese Katakana.', link: 'katakana-name-converter/' },
  { icon: '🇺🇸', title: 'English Name Converter', desc: 'Determine Katakana pronunciation for English labels.', link: 'english-name-to-katakana/' },
  { icon: '📐', title: 'Full-Width Katakana', desc: 'Format standard romaji into Full-Width characters.', link: 'full-width-katakana-converter/' },
  { icon: '📝', title: 'Full-Width Name', desc: 'Prepare your romanized name for Japanese web forms.', link: 'full-width-katakana-name-converter/' },
  { icon: '🔄', title: 'Katakana to Hiragana', desc: 'Instantly swap between distinct Kana scripts.', link: 'katakana-to-hiragana.html' },
  { icon: '🔀', title: 'Hiragana to Katakana', desc: 'Turn native hiragana phrases into katakana.', link: 'hiragana-to-katakana/' },
  { icon: '🇯🇵', title: 'Japanese Name to Katakana', desc: 'Format standard Japanese names into Zenkaku structure.', link: 'japanese-name-to-katakana/' },
  { icon: '⌨️', title: 'Romaji to Katakana', desc: 'Type Japanese naturally on an English keyboard.', link: 'romaji-to-katakana/' },
  { icon: '🔠', title: 'Latin to Katakana', desc: 'Map latin letters natively to phonetic Katakana blocks.', link: 'latin-to-katakana/' },
  { icon: '🏯', title: 'Kanji to Katakana', desc: 'Advanced morphological analyzer for Kanji readings.', link: 'kanji-to-katakana/' },
  { icon: '📖', title: 'Kanji to Hiragana', desc: 'Translate Kanji efficiently into beginner Hiragana.', link: 'kanji-to-hiragana/' },
  { icon: '🇨🇳', title: 'Chinese to Katakana', desc: 'Extract correct Onyomi readings for Hanzi characters.', link: 'chinese-to-katakana/' }
];

const cardsHtml = cards.map(c => `
  <a href="${c.link}" class="tool-card">
    <div class="tool-icon">${c.icon}</div>
    <h3>${c.title}</h3>
    <p>${c.desc}</p>
    <div class="tool-link-text">Use Now &rarr;</div>
  </a>
`).join('');

const exploreHtml = `
    <!-- ════════════ EXPLORE TOOLS ════════════ -->
    <section class="explore-tools-section">
      <div class="container">
        <div class="section-header" style="text-align:center; margin-bottom: 20px;">
          <h2 class="section-title">Explore All Converters</h2>
          <p class="section-subtitle" style="margin-bottom:0px;">Each tool is uniquely built for specific translation and localization needs.</p>
        </div>
        <div class="tools-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
`;

// Inject into index.html if not present
if (!rootHtml.includes('EXPLORE TOOLS')) {
  const mainEndIdx = rootHtml.lastIndexOf('</main>');
  rootHtml = rootHtml.substring(0, mainEndIdx) + exploreHtml + '\n  </main>' + rootHtml.substring(mainEndIdx + 7);
  fs.writeFileSync(indexHtmlPath, rootHtml);
  console.log('Appended to index.html');
}

// Modify build-tools.js to also append it during generation
const buildScriptPath = path.join(rootDir, 'build-tools.js');
let buildLogic = fs.readFileSync(buildScriptPath, 'utf-8');

if (!buildLogic.includes('EXPLORE TOOLS')) {
  // We want to add the exploreHtml generation block to build-tools.js and append it before </main>
  const generationLogic = `
  const exploreHtml = \`
    <!-- ════════════ EXPLORE TOOLS ════════════ -->
    <section class="explore-tools-section">
      <div class="container">
        <div class="section-header" style="text-align:center; margin-bottom: 20px;">
          <h2 class="section-title">Explore All Converters</h2>
          <p class="section-subtitle" style="margin-bottom:0px;">Each tool is uniquely built for specific translation and localization needs.</p>
        </div>
        <div class="tools-grid">
          ${cards.map(c => `
          <a href="\${relPath}${c.link}" class="tool-card">
            <div class="tool-icon">${c.icon}</div>
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
            <div class="tool-link-text">Use Now &rarr;</div>
          </a>`).join('')}
        </div>
      </div>
    </section>\`;

  const semanticStartStr = '<section class="how-section" id="how-it-works"';
  const splitPos = locHtml.indexOf(semanticStartStr);
  if (splitPos !== -1) {
    const endPos = locHtml.lastIndexOf('</main>');
    locHtml = locHtml.substring(0, splitPos) + semanticBody + "\n" + exploreHtml + "\n  </main>" + locHtml.substring(endPos + 7);
  } else {
    // If we're regenerating and it already had it wiped out once
    const endPos = locHtml.lastIndexOf('</main>');
    // Wipe out the old explore tools just in case
    const expPos = locHtml.indexOf('<!-- ════════════ EXPLORE TOOLS ════════════ -->');
    if (expPos !== -1) {
       locHtml = locHtml.substring(0, expPos) + exploreHtml + "\\n  </main>" + locHtml.substring(endPos + 7);
    }
  }
`;

  // We need to replace the old slice logic in build-tools.js with the new one.
  const oldSliceLogic = `  const semanticStartStr = '<section class="how-section" id="how-it-works"';
  const splitPos = locHtml.indexOf(semanticStartStr);
  if (splitPos !== -1) {
    const endPos = locHtml.lastIndexOf('</main>');
    locHtml = locHtml.substring(0, splitPos) + semanticBody + "\\n  </main>" + locHtml.substring(endPos + 7);
  }`;
  
  if(buildLogic.includes(oldSliceLogic)) {
      buildLogic = buildLogic.replace(oldSliceLogic, generationLogic);
      fs.writeFileSync(buildScriptPath, buildLogic);
      console.log('Updated build-tools.js with Explore block');
  } else {
    // maybe substring match
    console.log('Could not find old slice logic to replace. Will try manually.');
  }
}
