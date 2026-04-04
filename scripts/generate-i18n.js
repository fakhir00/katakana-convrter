#!/usr/bin/env node
/**
 * i18n Blog Page Generator
 * Generates 100 localized blog pages (5 pages × 20 languages)
 * Usage: node scripts/generate-i18n.js
 */
const fs = require('fs');
const path = require('path');
const { LANGS, UI } = require('./i18n-languages');
const { ARTICLES } = require('./i18n-articles');

const SITE = 'https://www.katakanaconverter.com';
const BLOG_DIR = path.join(__dirname, '..', 'blog');
const SLUGS = ['basic-katakana-chart','hiragana-vs-katakana','katakana-quiz','common-katakana-words'];

// ─── HREFLANG TAGS ───
// slugPath = '' for listing, 'basic-katakana-chart/' for articles
function hreflangTags(slugPath) {
  let tags = `  <link rel="alternate" hreflang="en" href="${SITE}/blog/${slugPath}">\n`;
  tags += `  <link rel="alternate" hreflang="x-default" href="${SITE}/blog/${slugPath}">\n`;
  LANGS.forEach(l => {
    tags += `  <link rel="alternate" hreflang="${l.locale}" href="${SITE}/blog/${l.code}/${slugPath}">\n`;
  });
  return tags;
}

// ─── LANGUAGE TOGGLE HTML ───
// slugPath = '' for listing, 'basic-katakana-chart/' for articles
function langToggle(currentCode, slugPath) {
  const currentLang = currentCode === 'en' ? { name: 'English', flag: '🇺🇸' } : LANGS.find(l => l.code === currentCode);
  let html = `<div class="lang-toggle-wrap"><div class="lang-toggle" onclick="this.classList.toggle('open')" id="lang-toggle">`;
  html += `<span class="lang-globe">🌐</span><span>${currentLang.flag} ${currentLang.name}</span><span class="lang-arrow">▾</span>`;
  html += `<div class="lang-dropdown">`;
  const enActive = currentCode === 'en' ? ' active' : '';
  html += `<a href="${SITE}/blog/${slugPath}" class="lang-item${enActive}"><span class="lang-flag">🇺🇸</span><span class="lang-name">English</span><span class="lang-code">EN</span></a>`;
  LANGS.forEach(l => {
    const active = l.code === currentCode ? ' active' : '';
    html += `<a href="${SITE}/blog/${l.code}/${slugPath}" class="lang-item${active}"><span class="lang-flag">${l.flag}</span><span class="lang-name">${l.name}</span><span class="lang-code">${l.code.toUpperCase()}</span></a>`;
  });
  html += `</div></div><div class="lang-overlay" onclick="document.getElementById('lang-toggle').classList.remove('open')"></div></div>`;
  return html;
}

// ─── COMMON HEAD ───
function headBlock(lang, locale, dir, title, desc, canonUrl, slugPath, imgUrl) {
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="author" content="Katakana Converter">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta name="googlebot" content="index, follow">
  <link rel="canonical" href="${canonUrl}">
${hreflangTags(slugPath)}
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect rx='18' width='100' height='100' fill='%236366f1'/><text x='50' y='68' font-size='52' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='bold'>カ</text></svg>" type="image/svg+xml">

  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${canonUrl}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Katakana Converter">
  <meta property="og:locale" content="${locale.replace('-','_')}">
${imgUrl ? `  <meta property="og:image" content="${imgUrl}">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="1024">` : ''}
  <meta property="article:published_time" content="2026-04-03T00:00:00Z">
  <meta property="article:modified_time" content="2026-04-03T00:00:00Z">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
${imgUrl ? `  <meta name="twitter:image" content="${imgUrl}">` : ''}
`;
}

// ─── DEPTH-BASED CSS/JS PATHS ───
function assetPaths(langCode) {
  // /blog/{lang}/ → ../../css/  and /blog/{lang}/{slug}/ → ../../../css/
  return { listCss: '../../css/', artCss: '../../../css/', listJs: '../../js/', artJs: '../../../js/' };
}

// ─── GENERATE LISTING PAGE ───
function generateListing(langCode) {
  const l = LANGS.find(x => x.code === langCode);
  const ui = UI[langCode];
  const a = ARTICLES.listing[langCode];
  const p = assetPaths(langCode);
  const canon = `${SITE}/blog/${langCode}/`;

  let html = headBlock(langCode, l.locale, l.dir, a.title, a.desc, canon, '', null);
  html += `  <link rel="stylesheet" href="${p.listCss}style.css">
  <link rel="stylesheet" href="${p.listCss}blog.css">
  <link rel="stylesheet" href="${p.listCss}blog-i18n.css">
</head>
<body>
  <header class="site-header" role="banner"></header>
  <main id="main-content" role="main">
    <section class="page-hero" aria-labelledby="blog-title">
      <div class="container">
        <div class="hero-badge">${a.badge}</div>
        <h1 id="blog-title">${a.h1}</h1>
        <p>${a.intro}</p>
        ${langToggle(langCode, '')}
      </div>
    </section>
    <section class="blog-listing-section">
      <div class="container">
        <div class="blog-grid">
`;
  // Article cards
  SLUGS.forEach(slug => {
    const card = ARTICLES.cards[slug][langCode];
    const enCard = ARTICLES.cards[slug].en;
    const imgBase = slug === 'basic-katakana-chart' ? 'katakana-chart-hero' :
                    slug === 'hiragana-vs-katakana' ? 'hiragana-vs-katakana-hero' :
                    slug === 'katakana-quiz' ? 'katakana-quiz-hero' : 'common-words-hero';
    html += `          <a href="${slug}/" class="blog-card">
            <img src="../../blog/${slug}/images/${imgBase}.png" alt="${card.h3}" class="blog-card-image" loading="lazy" width="680" height="220">
            <div class="blog-card-body">
              <div class="blog-card-meta"><span class="blog-card-tag">${card.tag}</span><time datetime="2026-04-03">April 3, 2026</time><span>•</span><span>${card.read}</span></div>
              <h3>${card.h3}</h3>
              <p>${card.p}</p>
              <span class="blog-card-link">${ui.readArticle}</span>
            </div>
          </a>
`;
  });

  html += `        </div>
      </div>
    </section>
    <section class="seo-content-section" style="padding-bottom:80px;">
      <div class="container">
        <div class="content-flow" style="text-align:center;">
          <article class="content-block" style="border-bottom:none;">
            <h2>${a.cta}</h2>
            <p style="max-width:560px;margin:0 auto 24px;">${a.ctaDesc}</p>
            <a href="/" class="btn-primary" style="display:inline-flex;text-decoration:none;padding:14px 36px;border:none;border-radius:12px;font-size:0.95rem;font-weight:600;background:linear-gradient(135deg,#6366f1,#818cf8);color:white;box-shadow:0 4px 15px rgba(99,102,241,0.3);">${ui.convertCta}</a>
          </article>
        </div>
      </div>
    </section>
  </main>
  <footer class="site-footer" role="contentinfo"></footer>
  <script src="${p.listJs}layout.js"></script>
  <script>SiteLayout.init('/blog/');</script>
</body>
</html>`;
  return html;
}

// ─── GENERATE ARTICLE WRAPPER ───
// Reads the English article HTML, injects hreflang, toggle, and translates meta/structural content
function generateArticle(langCode, slug) {
  const l = LANGS.find(x => x.code === langCode);
  const ui = UI[langCode];
  const card = ARTICLES.cards[slug][langCode];
  const enCard = ARTICLES.cards[slug].en;
  const p = assetPaths(langCode);
  const canon = `${SITE}/blog/${langCode}/${slug}/`;
  const imgBase = slug === 'basic-katakana-chart' ? 'katakana-chart-hero' :
                  slug === 'hiragana-vs-katakana' ? 'hiragana-vs-katakana-hero' :
                  slug === 'katakana-quiz' ? 'katakana-quiz-hero' : 'common-words-hero';
  const imgUrl = `${SITE}/blog/${slug}/images/${imgBase}.png`;

  // Read English source
  const enFile = path.join(BLOG_DIR, slug, 'index.html');
  let enHtml = fs.readFileSync(enFile, 'utf8');

  // Extract body content (everything between <body> and </body>)
  const bodyMatch = enHtml.match(/<body>([\s\S]*)<\/body>/i);
  if (!bodyMatch) { console.error(`Cannot parse body for ${slug}`); return ''; }
  let body = bodyMatch[1];

  // Fix asset paths for deeper nesting (/blog/{lang}/{slug}/ → 3 levels deep)
  body = body.replace(/src="\.\.\/\.\.\//g, 'src="../../../');
  body = body.replace(/href="\.\.\/\.\.\//g, 'href="../../../');
  body = body.replace(/src="images\//g, `src="../../../blog/${slug}/images/`);
  body = body.replace(/src="\.\.\/([^"]+)\/images\//g, `src="../../../blog/$1/images/`);

  // Fix layout.js path
  body = body.replace(/src="\.\.\/\.\.\/js\/layout\.js"/g, `src="${p.artJs}layout.js"`);
  // Fix CSS links that might be in inline styles - these are fine

  // Inject language toggle after social share row or after article-meta
  const toggleHtml = langToggle(langCode, `${slug}/`);
  if (body.includes('social-share-row')) {
    body = body.replace(/(social-share-row"[^>]*>[\s\S]*?<\/div>)/, `$1\n        ${toggleHtml}`);
  } else if (body.includes('article-meta')) {
    body = body.replace(/(<\/div>\s*<\/div>\s*<div class="container">)/, `${toggleHtml}\n$1`);
  }

  // Translate key UI strings in interactive elements
  body = body.replace(/>Table of Contents</g, `>${ui.toc}<`);
  body = body.replace(/>Score</g, `>${ui.score}<`);
  body = body.replace(/>Next Character →</g, `>${ui.next}<`);
  body = body.replace(/>Start Challenge</g, `>${ui.startChallenge}<`);
  body = body.replace(/>Sources & References</g, `>${ui.sources}<`);
  body = body.replace(/>Frequently Asked Questions</g, `>${ui.faq}<`);
  body = body.replace(/>Read Article →</g, `>${ui.readArticle}<`);
  body = body.replace(/>Convert to Katakana →</g, `>${ui.convertCta}<`);
  body = body.replace(/>Click to reveal meaning</g, `>${ui.clickReveal}<`);
  body = body.replace(/>Next Word →</g, `>${ui.nextWord}<`);
  body = body.replace(/>Katakana Converter Team</g, `>${ui.author}<`);

  // Translate the speed round JS strings
  body = body.replace(/this\.textContent='Playing\.\.\.'/g, `this.textContent='${ui.playing}'`);
  body = body.replace(/this\.textContent='Restart'/g, `this.textContent='${ui.restart}'`);
  // Keep "Done!" in JS
  body = body.replace(/'Done!'/g, `'${ui.done}'`);

  // Build new head
  const titleText = `${card.h3} | Katakana Converter`;
  let html = headBlock(langCode, l.locale, l.dir, titleText, card.p, canon, `${slug}/`, imgUrl);

  // Schema
  html += `  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BlogPosting","headline":"${card.h3.replace(/"/g,'\\"')}","description":"${card.p.replace(/"/g,'\\"')}","url":"${canon}","datePublished":"2026-04-03T00:00:00Z","dateModified":"2026-04-03T00:00:00Z","author":{"@type":"Organization","name":"Katakana Converter","url":"${SITE}/about-us/"},"publisher":{"@type":"Organization","name":"Katakana Converter"},"image":{"@type":"ImageObject","url":"${imgUrl}","width":1024,"height":1024},"mainEntityOfPage":{"@type":"WebPage","@id":"${canon}"},"inLanguage":"${l.locale}"}
  </script>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${SITE}/"},{"@type":"ListItem","position":2,"name":"Blog","item":"${SITE}/blog/"},{"@type":"ListItem","position":3,"name":"${card.h3.replace(/"/g,'\\"')}","item":"${canon}"}]}
  </script>

  <link rel="stylesheet" href="${p.artCss}style.css">
  <link rel="stylesheet" href="${p.artCss}blog.css">
  <link rel="stylesheet" href="${p.artCss}blog-i18n.css">
</head>
<body>
`;

  html += body;
  html += '\n</body>\n</html>';
  return html;
}

// ─── MAIN ───
function main() {
  let created = 0;

  LANGS.forEach(lang => {
    const langDir = path.join(BLOG_DIR, lang.code);

    // Create listing page
    const listDir = langDir;
    fs.mkdirSync(listDir, { recursive: true });
    fs.writeFileSync(path.join(listDir, 'index.html'), generateListing(lang.code), 'utf8');
    created++;

    // Create article pages
    SLUGS.forEach(slug => {
      const artDir = path.join(langDir, slug);
      fs.mkdirSync(artDir, { recursive: true });
      const html = generateArticle(lang.code, slug);
      if (html) {
        fs.writeFileSync(path.join(artDir, 'index.html'), html, 'utf8');
        created++;
      }
    });

    console.log(`✅ ${lang.code} (${lang.name}) — 5 pages`);
  });

  console.log(`\n🎉 Generated ${created} localized pages across ${LANGS.length} languages.`);

  // Update English pages with hreflang tags
  updateEnglishPages();
}

// ─── UPDATE ENGLISH PAGES WITH HREFLANG ───
function updateEnglishPages() {
  console.log('\n📝 Updating English pages with hreflang tags and language toggle...');

  // Blog listing
  const listFile = path.join(BLOG_DIR, 'index.html');
  let listHtml = fs.readFileSync(listFile, 'utf8');
  if (!listHtml.includes('hreflang')) {
    const hrefTags = hreflangTags('');
    listHtml = listHtml.replace('</head>', `${hrefTags}  <link rel="stylesheet" href="../css/blog-i18n.css">\n</head>`);
    // Add toggle after the intro paragraph (single injection only)
    const toggle = langToggle('en', '');
    listHtml = listHtml.replace(/(<p>In-depth guides[^<]*<\/p>)/, `$1\n        ${toggle}`);
    fs.writeFileSync(listFile, listHtml, 'utf8');
    console.log('  ✅ blog/index.html');
  }

  // Article pages
  SLUGS.forEach(slug => {
    const artFile = path.join(BLOG_DIR, slug, 'index.html');
    let artHtml = fs.readFileSync(artFile, 'utf8');
    if (!artHtml.includes('hreflang')) {
      const hrefTags = hreflangTags(`${slug}/`);
      artHtml = artHtml.replace('</head>', `${hrefTags}  <link rel="stylesheet" href="../../css/blog-i18n.css">\n</head>`);
      // Add toggle after social share row
      const toggle = langToggle('en', `${slug}/`);
      artHtml = artHtml.replace(/(class="social-share-row"[^>]*>[\s\S]*?<\/div>\s*<\/div>)/, `$1\n        ${toggle}`);
      fs.writeFileSync(artFile, artHtml, 'utf8');
      console.log(`  ✅ blog/${slug}/index.html`);
    }
  });

  console.log('\n✨ All done!');
}

main();
