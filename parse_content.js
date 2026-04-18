const fs = require('fs');

async function run() {
  const marked = await import('marked');
  
  let raw = fs.readFileSync('Katakana Converter copy.txt', 'utf8');
  
  // Custom fix for chart tables that lack separators
  const charts = [
      'ア (a) | イ (i) | ウ (u) | エ (e) | オ (o)',
      'カ (ka) | キ (ki) | ク (ku) | ケ (ke) | コ (ko)',
      'サ (sa) | シ (shi) | ス (su) | セ (se) | ソ (so)',
      'タ (ta) | チ (chi) | ツ (tsu) | テ (te) | ト (to)',
      'ナ (na) | ニ (ni) | ヌ (nu) | ネ (ne) | ノ (no)',
      'ハ (ha) | ヒ (hi) | フ (fu) | ヘ (he) | ホ (ho)',
      'マ (ma) | ミ (mi) | ム (mu) | メ (me) | モ (mo)',
      'ヤ (ya) | ユ (yu) | ヨ (yo)',
      'ラ (ra) | リ (ri) | ル (ru) | レ (re) | ロ (ro)',
      'ワ (wa) | ヲ (wo) | ン (n)',
      'ガ (ga) | ギ (gi) | グ (gu) | ゲ (ge) | ゴ (go)',
      'ザ (za) | ジ (ji) | ズ (zu) | ゼ (ze) | ゾ (zo)',
      'ダ (da) | ヂ (ji) | ヅ (zu) | デ (de) | ド (do)',
      'バ (ba) | ビ (bi) | ブ (bu) | ベ (be) | ボ (bo)',
      'パ (pa) | ピ (pi) | プ (pu) | ペ (pe) | ポ (po)'
  ];

  for(const chart of charts) {
      const escaped = chart.replace(/[()]/g, '\\$&');
      const regex = new RegExp('\\| ' + escaped + ' \\|', 'g');
      const cols = chart.split('|').length;
      const sep = '|' + '---|'.repeat(cols);
      // Ensure we add the separator line directly after
      raw = raw.replace(regex, `| ${chart} |\n${sep}`);
  }

  // Ensure ALL table blocks have blank lines before and after
  // A table block is one or more lines starting and ending with |
  raw = raw.replace(/(^|\n)((\|.*\|(?:\n|$))+)/g, (match, before, table) => {
      return before + '\n' + table.trim() + '\n\n';
  });

  // Fix URLs
  raw = raw.replace(/\]\(#english-to-katakana\)/g, '](https://www.katakanaconverter.com/english-name/)');
  raw = raw.replace(/\]\(#kanji-to-katakana\)/g, '](https://www.katakanaconverter.com/kanji-to-katakana/)');
  raw = raw.replace(/\]\(#hiragana-to-katakana\)/g, '](https://www.katakanaconverter.com/hiragana-to-katakana/)');
  raw = raw.replace(/\]\(#romaji-to-katakana\)/g, '](https://www.katakanaconverter.com/romaji-to-katakana/)');
  
  raw = raw.replace(/katakanaconverter\.com\/to-hiragana\//g, 'katakanaconverter.com/katakana-to-hiragana/');
  raw = raw.replace(/katakanaconverter\.com\/hiragana-to\//g, 'katakanaconverter.com/hiragana-to-katakana/');
  raw = raw.replace(/katakanaconverter\.com\/romaji\//g, 'katakanaconverter.com/romaji-to-katakana/');
  raw = raw.replace(/katakanaconverter\.com\/chinese\//g, 'katakanaconverter.com/chinese-to-katakana/');

  const renderer = new marked.Renderer();
  
  renderer.table = function(token) {
    if (token.header) {
      const head = token.header.map(cell => `<th>${marked.marked.parseInline(cell.text)}</th>`).join('');
      const rows = token.rows ? token.rows.map(row => `<tr>${row.map(cell => `<td>${marked.marked.parseInline(cell.text)}</td>`).join('')}</tr>`).join('\n') : '';
      const body = rows ? `<tbody>\n${rows}\n</tbody>\n` : '';
      return `<div class="table-wrap">\n<table>\n<thead>\n<tr>${head}</tr>\n</thead>\n${body}</table>\n</div>\n`;
    }
  };
  
  marked.marked.use({ renderer });
  marked.marked.setOptions({ breaks: false, gfm: true });

  let html = marked.marked.parse(raw);
  
  // Fix details and summaries
  html = html.replace(/<details>/g, '<details class="faq-item">');
  html = html.replace(/<summary>(.*?)<\/summary>/g, '<summary class="faq-question">$1</summary>');
  html = html.replace(/<\/summary>([\s\S]*?)(?=<\/details>)/g, '</summary>\n<div class="faq-answer">\n$1\n</div>\n');

  // Split into sections
  let parts = html.split('<h2');
  let articles = '';
  let faqSection = '';

  for(let i=1; i<parts.length; i++) {
    let section = '<h2' + parts[i];
    if (section.includes('Common Katakana Conversion Questions')) {
      let endIdx = section.indexOf('<h2', 10);
      let faqContent = endIdx !== -1 ? section.substring(0, endIdx) : section;
      
      let titleMatch = faqContent.match(/<h2.*?>(.*?)<\/h2>/);
      let title = titleMatch ? titleMatch[1] : 'Common Katakana Conversion Questions';
      let faqBody = faqContent.substring(faqContent.indexOf('</h2>') + 5);
      
      faqBody = faqBody.replace(/<hr>/g, '').trim();

      let headerText = faqBody.substring(0, faqBody.indexOf('<details'));
      let faqs = faqBody.substring(faqBody.indexOf('<details'));

      faqSection = `
    <section class="faq-section" id="faq" aria-labelledby="faq-title">
      <div class="container">
      <div class="section-header section-header-left">
        <h2 class="section-title" id="faq-title">${title}</h2>
        ${headerText.trim() ? headerText : '<p class="section-subtitle">Short answers about our Katakana conversion tools.</p>'}
      </div>
      <div class="faq-list">
        ${faqs}
      </div>
      </div>
    </section>`;
      
      if (endIdx !== -1) {
          articles += section.substring(endIdx).split('<h2').slice(1).map(s => '\n<article class="content-block">\n<h2' + s.trim() + '\n</article>\n').join('');
      }
    } else {
      articles += '\n<article class="content-block">\n' + section.trim() + '\n</article>\n';
    }
  }
  
  const finalHtml = `
    <section class="seo-content-section" id="about" aria-labelledby="about-title">
      <div class="container">
        <div class="content-flow">
          ${articles}
        </div>
      </div>
    </section>

    ${faqSection}
  `;
  
  fs.writeFileSync('new_content.html', finalHtml);
}

run().catch(console.error);
