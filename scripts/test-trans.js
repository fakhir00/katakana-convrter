const translate = require('google-translate-api-x');

async function test() {
  const html = '<p><strong>Katakana</strong> (カタカナ / 片仮名) is one of three Japanese writing systems, alongside Hiragana and Kanji.</p>';
  try {
    const res = await translate(html, { to: 'es' });
    console.log(res.text);
  } catch (err) {
    console.error(err);
  }
}
test();
