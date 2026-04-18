const fs = require('fs');

async function run() {
  const marked = await import('marked');
  
  let raw = fs.readFileSync('Katakana Converter copy.txt', 'utf8');
  
  // Fix Katakana "fake" tables: add blank line before, separator row after, and a dummy body row
  raw = raw.replace(/\n(\| [^|\n]+ \| [^|\n]+ \| [^|\n]+ \| [^|\n]+ \| [^|\n]+ \|)\n(?!\s*\|[-\s:|]+\|)/g, '\n\n$1\n|---|---|---|---|---|\n|   |   |   |   |   |\n');
  raw = raw.replace(/\n(\| [^|\n]+ \| [^|\n]+ \| [^|\n]+ \|)\n(?!\s*\|[-\s:|]+\|)/g, '\n\n$1\n|---|---|---|\n|   |   |   |\n');

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
      // Check if it's a "fake" chart table (has spaces in the body rows we added)
      const isChart = token.rows.length === 1 && token.rows[0].every(cell => cell.text.trim() === '');
      if (isChart) {
          const head = token.header.map(cell => `<th>${marked.marked.parseInline(cell.text)}</th>`).join('');
          return `<div class="table-wrap">\n<table>\n<thead>\n<tr>${head}</tr>\n</thead>\n</table>\n</div>\n`;
      }
      
      const head = token.header.map(cell => `<th>${marked.marked.parseInline(cell.text)}</th>`).join('');
      const rows = token.rows.map(row => `<tr>${row.map(cell => `<td>${marked.marked.parseInline(cell.text)}</td>`).join('')}</tr>`).join('\n');
      return `<div class="table-wrap">\n<table>\n<thead>\n<tr>${head}</tr>\n</thead>\n<tbody>\n${rows}\n</tbody>\n</table>\n</div>\n`;
    }
  };
  
  marked.marked.use({ renderer });
  marked.marked.setOptions({ breaks: false, gfm: true });

  let html = marked.marked.parse(raw);
  
  // Fix details and summaries
  html = html.replace(/<details>/g, '<details class="faq-item">');
  html = html.replace(/<summary>(.*?)<\/summary>/g, '<summary class="faq-question">$1</summary>');
  html = html.replace(/<\/summary>([\s\S]*?)(?=<\/details>)/g, '</summary>\n<div class="faq-answer">\n$1\n</div>\n');

  // Split into articles and FAQ
  let parts = html.split('<h2');
  let articles = '';
  let faqSection = '';

  for(let i=1; i<parts.length; i++) {
    let section = '<h2' + parts[i];
    if (section.includes('Common Katakana Conversion Questions')) {
      // Find the end of this section (next h2 or end of string)
      let endIdx = section.indexOf('<h2', 10);
      let faqContent = endIdx !== -1 ? section.substring(0, endIdx) : section;
      
      // Parse FAQ content
      let titleMatch = faqContent.match(/<h2.*?>(.*?)<\/h2>/);
      let title = titleMatch ? titleMatch[1] : 'Common Katakana Conversion Questions';
      let faqBody = faqContent.substring(faqContent.indexOf('</h2>') + 5);
      
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
      
      // If there was something after the FAQ in this part, add it to articles
      if (endIdx !== -1) {
          articles += section.substring(endIdx);
      }
    } else {
      articles += '\n<article class="content-block">\n' + section.trim() + '\n</article>\n';
    }
  }
  
  // Final assembly
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
