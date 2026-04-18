const fs = require('fs');

async function run() {
  const marked = await import('marked');
  
  let raw = fs.readFileSync('Katakana Converter copy.txt', 'utf8');
  
  // Fix Katakana "fake" tables by adding separator rows
  raw = raw.replace(/(\| [^|\n]+ \| [^|\n]+ \| [^|\n]+ \| [^|\n]+ \| [^|\n]+ \|)\n(?!\s*\|[-\s:|]+\|)/g, '$1\n|---|---|---|---|---|\n');
  raw = raw.replace(/(\| [^|\n]+ \| [^|\n]+ \| [^|\n]+ \|)\n(?!\s*\|[-\s:|]+\|)/g, '$1\n|---|---|---|\n');

  // Fix URLs as requested
  raw = raw.replace(/\]\(#english-to-katakana\)/g, '](https://www.katakanaconverter.com/english-name/)');
  raw = raw.replace(/\]\(#kanji-to-katakana\)/g, '](https://www.katakanaconverter.com/kanji-to-katakana/)');
  raw = raw.replace(/\]\(#hiragana-to-katakana\)/g, '](https://www.katakanaconverter.com/hiragana-to-katakana/)');
  raw = raw.replace(/\]\(#romaji-to-katakana\)/g, '](https://www.katakanaconverter.com/romaji-to-katakana/)');
  
  raw = raw.replace(/katakanaconverter\.com\/to-hiragana\//g, 'katakanaconverter.com/katakana-to-hiragana/');
  raw = raw.replace(/katakanaconverter\.com\/hiragana-to\//g, 'katakanaconverter.com/hiragana-to-katakana/');
  raw = raw.replace(/katakanaconverter\.com\/romaji\//g, 'katakanaconverter.com/romaji-to-katakana/');
  raw = raw.replace(/katakanaconverter\.com\/chinese\//g, 'katakanaconverter.com/chinese-to-katakana/');

  const renderer = new marked.Renderer();
  
  // Add table wraps
  renderer.table = function(token) {
    if (token.header) {
      const head = token.header.map(cell => `<th>${marked.marked.parseInline(cell.text)}</th>`).join('');
      const rows = token.rows.map(row => `<tr>${row.map(cell => `<td>${marked.marked.parseInline(cell.text)}</td>`).join('')}</tr>`).join('\n');
      return `<div class="table-wrap">\n<table>\n<thead>\n<tr>${head}</tr>\n</thead>\n<tbody>\n${rows}\n</tbody>\n</table>\n</div>\n`;
    }
  };
  
  marked.marked.use({ renderer });

  // Handle HTML inside markdown
  marked.marked.setOptions({ breaks: false, gfm: true });

  let html = marked.marked.parse(raw);
  
  // Fix details and summaries - more robust
  html = html.replace(/<details>/g, '<details class="faq-item">');
  html = html.replace(/<summary class="faq-question">/g, '<summary class="faq-question">'); // Just in case
  html = html.replace(/<summary>(.*?)<\/summary>/g, '<summary class="faq-question">$1</summary>');
  
  // Re-wrap summary content and start answer div
  html = html.replace(/<\/summary>([\s\S]*?)(?=<\/details>)/g, '</summary>\n<div class="faq-answer">\n$1\n</div>\n');

  // Wrap all h2 sections in <article class="content-block">
  let parts = html.split('<h2');
  let finalHtml = parts[0];
  for(let i=1; i<parts.length; i++) {
    let section = '<h2' + parts[i];
    // If it's the FAQ section, don't wrap in article, we'll handle it below
    if (section.includes('Common Katakana Conversion Questions')) {
      finalHtml += section;
    } else {
      finalHtml += '\n<article class="content-block">\n' + section.trim() + '\n</article>\n';
    }
  }
  
  // Clean up FAQs into a proper section
  finalHtml = finalHtml.replace(/<h2 id="common-katakana-conversion-questions-">(.*?)<\/h2>([\s\S]*?)(?=<article|$)/, (match, title, content) => {
    let header = content.substring(0, content.indexOf('<details'));
    let faqs = content.substring(content.indexOf('<details'));
    
    return `
    <section class="faq-section" id="faq" aria-labelledby="faq-title">
      <div class="container">
      <div class="section-header section-header-left">
        <h2 class="section-title" id="faq-title">${title}</h2>
        ${header.trim() ? header : '<p class="section-subtitle">Short answers about our Katakana conversion tools.</p>'}
      </div>
      <div class="faq-list">
        ${faqs}
      </div>
      </div>
    </section>`;
  });
  
  fs.writeFileSync('new_content.html', `<section class="seo-content-section" id="about" aria-labelledby="about-title"><div class="container"><div class="content-flow">\n${finalHtml}\n</div></div></section>`);
}

run().catch(console.error);
