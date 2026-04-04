const fs = require('fs');
const vm = require('vm');

const ctx = { window: {}, console };
ctx.global = ctx.window;
ctx.window.wanakana = {
  toKatakana: function (value) {
    var map = {
      akira: 'アキラ',
      yamada: 'ヤマダ',
      konnichiwa: 'コンニチワ',
      suzuki: 'スズキ',
      ichiro: 'イチロウ',
      saori: 'サオリ',
      tanaka: 'タナカ'
    };
    return map[String(value).toLowerCase()] || 'WK(' + value + ')';
  }
};

vm.createContext(ctx);
vm.runInContext(fs.readFileSync('js/engine.js', 'utf8'), ctx);
vm.runInContext(fs.readFileSync('js/cmudict-data.js', 'utf8'), ctx);
vm.runInContext(fs.readFileSync('js/tool-converters.js', 'utf8'), ctx);

const ToolConverters = ctx.window.ToolConverters;

const cases = [
  ['supercalifragilisticexpialidocious', 'スーパーカリフラジリスティックエクスピアリドーシャス'],
  ['antidisestablishmentarianism', 'アンタイディスエスタブリッシュメンタリアニズム'],
  ['honorificabilitudinitatibus', 'オノリフィカビリトゥディニタティブス'],
  ['floccinaucinihilipilification', 'フロクシノーシナイヒリピリフィケーション'],
  ['psychoneuroendocrinological', 'サイコニューロエンドクリノロジカル'],
  ['incomprehensibilities', 'インコンプリヘンシビリティーズ'],
  ['worcestershire', 'ウスターシャー'],
  ['gloucester', 'グロスター'],
  ['saoirse', 'サーシャ'],
  ['niamh', 'ニーヴ'],
  ['caoimhe', 'キーウァ'],
  ['aoife', 'イーファ'],
  ['beauchamp', 'ビーチャム'],
  ['cholmondeley', 'チャムリー'],
  ['featherstonehaugh', 'ファンショー'],
  ['siobhan', 'シボーン'],
  ['nguyen', 'ヌーイェン'],
  ['tchaikovsky', 'チャイコフスキー'],
  ['edinburgh', 'エディンバラ'],
  ['houston', 'ヒューストン'],
  ['adobe', 'アドビ'],
  ['nike', 'ナイキ'],
  ['mitsubishi', 'ミツビシ'],
  ['porsche', 'ポルシェ'],
  ['xiaomi', 'シャオミ'],
  ['xavier', 'ザビエル'],
  ['jean luc picard', 'ジャン・リュック・ピカード'],
  ['machine learning infrastructure', 'マシン・ラーニング・インフラストラクチャー'],
  ['hyperparameter optimization', 'ハイパーパラメータ・オプティマイゼーション'],
  ['asynchronous microservice orchestration', 'エイシンクロナス・マイクロサービス・オーケストレーション'],
  ['akira yamada', 'アキラ・ヤマダ'],
  ['suzuki ichiro', 'スズキ・イチロウ'],
  ['saori tanaka', 'サオリ・タナカ'],
  ['nguyen scheduled machine learning infrastructure updates in shinjuku', 'ヌーイェン・スケジュールド・マシン・ラーニング・インフラストラクチャー・アップデート・イン・シンジュク']
];

let failed = false;

cases.forEach(function (testCase) {
  var input = testCase[0];
  var expected = testCase[1];
  var actual = ToolConverters.convertLatinText(input, { separator: '・' }).katakana;

  if (actual !== expected) {
    failed = true;
    console.error('FAIL', input);
    console.error('  expected:', expected);
    console.error('  actual  :', actual);
  } else {
    console.log('PASS', input, '=>', actual);
  }
});

if (failed) {
  process.exit(1);
}
