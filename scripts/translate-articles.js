const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const translate = require('google-translate-api-x');
const { LANGS } = require('./i18n-languages');

const BLOG_DIR = path.join(__dirname, '..', 'blog');
const ARTICLES = ['basic-katakana-chart', 'hiragana-vs-katakana', 'katakana-quiz', 'common-katakana-words'];

// Elements we want to translate. We avoid translating script, style, code, pre, .jp-char
const selector = 'p, h2, h3, h4, h5, h6, li:not(.toc-list li), .toc-list li a, th, .stat-label, .callout-content p';

async function translateChunk(htmlChunk, targetLang) {
  try {
    const res = await translate(htmlChunk, { to: targetLang });
    return res.text;
  } catch (err) {
    if (err.name === 'TooManyRequestsError') {
      console.warn(`[Rate Limit] Waiting 5 seconds before retrying...`);
      await new Promise(r => setTimeout(r, 5000));
      return translateChunk(htmlChunk, targetLang);
    }
    console.error(`[Error] Translating chunk:`, err.message);
    return htmlChunk; // Fallback to original
  }
}

async function processArticle(langCode, slug) {
  const enFile = path.join(BLOG_DIR, slug, 'index.html');
  const enHtml = fs.readFileSync(enFile, 'utf8');
  const dom = new JSDOM(enHtml);
  const document = dom.window.document;
  
  const article = document.querySelector('#article-content');
  if (!article) {
    console.warn(`No #article-content found in ${slug}`);
    return;
  }

  // Clone to avoid modifying the English source in memory if we re-used it, though we parse fresh each time
  const elements = Array.from(article.querySelectorAll(selector));
  
  let translatedCount = 0;
  for (const el of elements) {
    // Skip elements that shouldn't be translated
    if (el.closest('.jp-char') || el.classList.contains('jp-char')) continue;
    if (el.textContent.trim().length === 0) continue;
    // Skip if it only contains numbers or symbols
    if (/^[0-9\s,\.\-\+\=\_]+$/.test(el.textContent)) continue;

    console.log(`Translating block ${translatedCount + 1}/${elements.length}...`);
    // We translate the innerHTML to preserve spans, strong tags, etc.
    const originalHtml = el.innerHTML;
    const translatedHtml = await translateChunk(originalHtml, langCode);
    el.innerHTML = translatedHtml;
    translatedCount++;
    
    // Add small delay to prevent rapid rate-limiting
    await new Promise(r => setTimeout(r, 200)); 
  }

  const outDir = path.join(BLOG_DIR, langCode, slug);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  
  const outFile = path.join(outDir, 'body.html');
  fs.writeFileSync(outFile, article.innerHTML);
  console.log(`✅ Translated ${slug} (${langCode}): ${translatedCount} blocks saved to body.html`);
}

async function main() {
  const args = process.argv.slice(2);
  const targetLangCode = args[0]; // e.g., 'es', 'ur'
  
  let targetLangs = LANGS.filter(l => l.code !== 'en');
  if (targetLangCode) {
    targetLangs = targetLangs.filter(l => l.code === targetLangCode);
    if (targetLangs.length === 0) {
      console.error(`Language ${targetLangCode} not found in i18n-languages.js`);
      process.exit(1);
    }
  }
  
  console.log(`Starting translation for ${targetLangs.length} languages... This might take some time due to API limits.`);
  
  for (const lang of targetLangs) {
    console.log(`\n▶️ Processing language: ${lang.name} (${lang.code})`);
    for (const slug of ARTICLES) {
      await processArticle(lang.code, slug);
    }
  }
  console.log('\n✨ All translations completed!');
}

main().catch(console.error);
