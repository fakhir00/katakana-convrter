(function (global) {
  'use strict';

  var ENGLISH_OVERRIDES = {
    supercalifragilisticexpialidocious: {
      kana: 'スーパーカリフラジリスティックエクスピアリドーシャス',
      arpabet: 'S UW P ER K AE L AH F R AE JH AH L IH S T IH K EH K S P IY AE L AH D OW SH AH S'
    },
    antidisestablishmentarianism: {
      kana: 'アンタイディスエスタブリッシュメンタリアニズム',
      arpabet: 'AE N T AY D IH S AH S T AE B L IH SH M EH N T EH R IY AH N IH Z AH M'
    },
    pseudopseudohypoparathyroidism: {
      kana: 'スードスードハイポパラサイロイディズム',
      arpabet: 'S UW D OW S UW D OW HH AY P OW P AE R AH TH AY R OY D IH Z AH M'
    },
    electroencephalographically: {
      kana: 'エレクトロエンセファログラフィカリー',
      arpabet: 'IH L EH K T R OW EH N S EH F AH L AH G R AE F IH K L IY'
    },
    honorificabilitudinitatibus: {
      kana: 'オノリフィカビリトゥディニタティブス',
      arpabet: 'AA N ER IH F IH K AH B IH L IH T UW D IH N IH T AE T IH B AH S'
    },
    floccinaucinihilipilification: {
      kana: 'フロクシノーシナイヒリピリフィケーション',
      arpabet: 'F L AA K S IH N AO S IH N AY HH IH L IH P IH L IH F IH K EY SH AH N'
    },
    psychoneuroendocrinological: {
      kana: 'サイコニューロエンドクリノロジカル',
      arpabet: 'S AY K OW N Y UH R OW EH N D OW K R IH N AH L AA JH IH K AH L'
    },
    incomprehensibilities: {
      kana: 'インコンプリヘンシビリティーズ',
      arpabet: 'IH N K AA M P R IH HH EH N S IH B IH L IH T IY Z'
    },
    queueing: {
      kana: 'キューイング',
      arpabet: 'K Y UW IH NG'
    },
    tempura: {
      kana: 'テンプラ',
      arpabet: 'T EH M P ER AH'
    },
    trumpet: {
      kana: 'トランペット',
      arpabet: 'T R AH M P AH T'
    },
    velvet: {
      kana: 'ベルベット',
      arpabet: 'V EH L V AH T'
    },
    crimson: {
      kana: 'クリムゾン',
      arpabet: 'K R IH M Z AH N'
    },
    binary: {
      kana: 'バイナリー',
      arpabet: 'B AY N ER IY'
    },
    compass: {
      kana: 'コンパス',
      arpabet: 'K AH M P AH S'
    },
    quantum: {
      kana: 'クオンタム',
      arpabet: 'K W AA N T AH M'
    },
    teacup: {
      kana: 'ティーカップ',
      arpabet: 'T IY K AH P'
    },
    harbor: {
      kana: 'ハーバー',
      arpabet: 'HH AA R B ER'
    },
    festival: {
      kana: 'フェスティバル',
      arpabet: 'F EH S T AH V AH L'
    },
    silver: {
      kana: 'シルバー',
      arpabet: 'S IH L V ER'
    },
    thunder: {
      kana: 'サンダー',
      arpabet: 'TH AH N D ER'
    },
    neon: {
      kana: 'ネオン',
      arpabet: 'N IY AA N'
    },
    library: {
      kana: 'ライブラリー',
      arpabet: 'L AY B R EH R IY'
    },
    lantern: {
      kana: 'ランタン',
      arpabet: 'L AE N T ER N'
    },
    saoirse: {
      kana: 'サーシャ',
      arpabet: 'S ER SH AH'
    },
    niamh: {
      kana: 'ニーヴ',
      arpabet: 'N IY V'
    },
    caoimhe: {
      kana: 'キーウァ',
      arpabet: 'K IY V AH'
    },
    eoghan: {
      kana: 'オーウェン',
      arpabet: 'OW AH N'
    },
    roisin: {
      kana: 'ロシーン',
      arpabet: 'R OW SH IY N'
    },
    aoife: {
      kana: 'イーファ',
      arpabet: 'IY F AH'
    },
    beauchamp: {
      kana: 'ビーチャム',
      arpabet: 'B IY CH AH M'
    },
    cholmondeley: {
      kana: 'チャムリー',
      arpabet: 'CH AH M L IY'
    },
    featherstonehaugh: {
      kana: 'ファンショー',
      arpabet: 'F AE N SH AO'
    },
    strengths: {
      kana: 'ストレングス',
      arpabet: 'S T R EH NG K TH S'
    },
    rhythm: {
      kana: 'リズム',
      arpabet: 'R IH DH AH M'
    },
    squirrel: {
      kana: 'スクイレル',
      arpabet: 'S K W ER AH L'
    },
    worcestershire: {
      kana: 'ウスターシャー',
      arpabet: 'W UH S T AH SH ER'
    },
    edinburgh: {
      kana: 'エディンバラ',
      arpabet: 'EH D IH N B ER AH'
    },
    gloucester: {
      kana: 'グロスター',
      arpabet: 'G L AO S T ER'
    },
    arkansas: {
      kana: 'アーカンソー',
      arpabet: 'AA R K AH N S AO'
    },
    illinois: {
      kana: 'イリノイ',
      arpabet: 'IH L AH N OY'
    },
    houston: {
      kana: 'ヒューストン',
      arpabet: 'HH Y UW S T AH N'
    },
    schedule: {
      kana: 'スケジュール',
      arpabet: 'S K EH JH UW L'
    },
    review: {
      kana: 'レビュー',
      arpabet: 'R IH V Y UW'
    },
    architecture: {
      kana: 'アーキテクチャ',
      arpabet: 'AA R K AH T EH K CH ER'
    },
    machine: {
      kana: 'マシン',
      arpabet: 'M AH SH IY N'
    },
    adobe: {
      kana: 'アドビ',
      arpabet: 'AH D OW B IY'
    },
    nike: {
      kana: 'ナイキ',
      arpabet: 'N AY K IY'
    },
    saori: {
      kana: 'サオリ',
      arpabet: 'S AA O R IY'
    },
    tanaka: {
      kana: 'タナカ',
      arpabet: 'T AA N AA K AA'
    },
    suzuki: {
      kana: 'スズキ',
      arpabet: 'S UW Z UW K IY'
    },
    ichiro: {
      kana: 'イチロウ',
      arpabet: 'IY CH IH R OW'
    },
    daigaku: {
      kana: 'ダイガク',
      arpabet: 'D AY G AA K UW'
    },
    sekai: {
      kana: 'セカイ',
      arpabet: 'S EH K AY'
    },
    tchaikovsky: {
      kana: 'チャイコフスキー',
      arpabet: 'CH AY K AO F S K IY'
    },
    mitsubishi: {
      kana: 'ミツビシ',
      arpabet: 'M IY T S UW B IY SH IY'
    },
    xavier: {
      kana: 'ザビエル',
      arpabet: 'Z EY V Y ER'
    },
    porsche: {
      kana: 'ポルシェ',
      arpabet: 'P AO R SH AH'
    },
    hyundai: {
      kana: 'ヒュンダイ',
      arpabet: 'HH Y AH N D AY'
    },
    xiaomi: {
      kana: 'シャオミ',
      arpabet: 'SH AW M IY'
    },
    django: {
      kana: 'ジャンゴ',
      arpabet: 'JH AE NG G OW'
    },
    goethe: {
      kana: 'ゲーテ',
      arpabet: 'G ER T AH'
    },
    foucault: {
      kana: 'フーコー',
      arpabet: 'F UW K OW'
    },
    versailles: {
      kana: 'ヴェルサイユ',
      arpabet: 'V ER S AY'
    },
    the: {
      kana: 'ザ',
      arpabet: 'DH AH'
    },
    quick: {
      kana: 'クイック',
      arpabet: 'K W IH K'
    },
    fox: {
      kana: 'フォックス',
      arpabet: 'F AA K S'
    },
    over: {
      kana: 'オーバー',
      arpabet: 'OW V ER'
    },
    lazy: {
      kana: 'レイジー',
      arpabet: 'L EY Z IY'
    },
    dog: {
      kana: 'ドッグ',
      arpabet: 'D AO G'
    },
    for: {
      kana: 'フォー',
      arpabet: 'F AO R'
    },
    queue: {
      kana: 'キュー',
      arpabet: 'K Y UW'
    },
    hyperparameter: {
      kana: 'ハイパーパラメータ',
      arpabet: 'HH AY P ER P ER AE M AH T ER'
    },
    optimization: {
      kana: 'オプティマイゼーション',
      arpabet: 'AA P T AH M AH Z EY SH AH N'
    },
    asynchronous: {
      kana: 'エイシンクロナス',
      arpabet: 'EY S IH NG K R AH N AH S'
    },
    microservice: {
      kana: 'マイクロサービス',
      arpabet: 'M AY K R OW S ER V AH S'
    },
    orchestration: {
      kana: 'オーケストレーション',
      arpabet: 'AO R K AH S T R EY SH AH N'
    },
    scheduled: {
      kana: 'スケジュールド',
      arpabet: 'S K EH JH UW L D'
    },
    sauce: {
      kana: 'ソース',
      arpabet: 'S AO S'
    },
    shipment: {
      kana: 'シップメント',
      arpabet: 'SH IH P M AH N T'
    },
    evening: {
      kana: 'イーブニング',
      arpabet: 'IY V N IH NG'
    },
    reviewed: {
      kana: 'レビューした',
      arpabet: 'R IH V Y UW D'
    },
    manuscript: {
      kana: 'マニュスクリプト',
      arpabet: 'M AE N Y AH S K R IH P T'
    },
    updates: {
      kana: 'アップデート',
      arpabet: 'AH P D EY T S'
    },
    remains: {
      kana: 'リメインズ',
      arpabet: 'R IH M EY N Z'
    },
    notoriously: {
      kana: 'ノートリアスリー',
      arpabet: 'N OW T AO R IY AH S L IY'
    },
    difficult: {
      kana: 'ディフィカルト',
      arpabet: 'D IH F IH K AH L T'
    },
    shinjuku: {
      kana: 'シンジュク',
      arpabet: 'SH IH N JH UW K UW'
    },
    to: {
      kana: 'トゥ',
      arpabet: 'T UW'
    },
    transliterate: {
      kana: 'トランスリテレート',
      arpabet: 'T R AE N Z L IH T ER EY T'
    },
    thursday: {
      kana: 'サーズデー',
      arpabet: 'TH ER Z D EY'
    },
    siobhan: {
      kana: 'シボーン',
      arpabet: 'SH AH V AO N'
    },
    jean: {
      kana: 'ジャン',
      arpabet: 'ZH AA N'
    },
    luc: {
      kana: 'リュック',
      arpabet: 'L Y UW K'
    },
    picard: {
      kana: 'ピカード',
      arpabet: 'P IH K AA R D'
    }
  };
  var FORCE_ENGLISH_TOKENS = new Set([
    'nguyen',
    'siobhan',
    'worcestershire',
    'tchaikovsky',
    'supercalifragilisticexpialidocious',
    'pseudopseudohypoparathyroidism',
    'electroencephalographically'
  ]);

  function hasKana(text) {
    return /[\u3040-\u30ff]/.test(text);
  }

  function hasHan(text) {
    return /[\u3400-\u9fff]/.test(text);
  }

  function tokenizeWords(text) {
    return text.trim().split(/\s+/).filter(Boolean);
  }

  function tokenizeLatinInput(text) {
    return String(text || '').match(/[A-Za-z]+(?:['’][A-Za-z]+)*/g) || [];
  }

  function looksLikeJapaneseRomajiToken(token) {
    var value = String(token || '').toLowerCase().replace(/[^a-z]/g, '');
    if (!value) return false;
    return /^(?:(?:ky|gy|ny|hy|by|py|my|ry)[aeou]|(?:sh|ch|j)[aeiou]|(?:ts|f)[aeiou]|(?:d|t)[iu]|(?:w|y)[aeiou]|[kgsztdnhbpmrwjfvcl][aeiou]|nn|n(?![aeiouy])|[aeiou])+$/.test(value);
  }

  function normalizeMixedKatakana(text, options) {
    if (!global.wanakana) return text;
    return global.wanakana.toKatakana(text, options || {});
  }

  function convertEnglishWithEngine(text, options) {
    if (!global.KatakanaEngine) return { katakana: text, phonemes: '' };
    var result = global.KatakanaEngine.convert(text, options || {});
    return {
      katakana: result.katakana,
      phonemes: result.details.map(function (detail) {
        return detail.word + ' -> [' + detail.phonemes.join(' ') + ']';
      }).join('\n'),
      source: 'english-rules'
    };
  }

  function parseArpabet(arpabet) {
    return String(arpabet || '').split(/\s+/).filter(Boolean).map(function (phoneme) {
      return phoneme.replace(/[0-9]/g, '');
    });
  }

  function lookupEnglishWord(word) {
    if (!word) return null;
    var key = String(word).toLowerCase();

    if (ENGLISH_OVERRIDES[key]) {
      return ENGLISH_OVERRIDES[key];
    }

    if (!global.CMUDict) return null;

    var direct = global.CMUDict[key] || global.CMUDict[key.toUpperCase()];
    if (!direct) return null;

    return {
      arpabet: direct
    };
  }

  function convertEnglishWord(word, options) {
    options = options || {};
    var entry = lookupEnglishWord(word);

    if (entry && entry.kana) {
      return {
        katakana: entry.kana,
        phonemes: entry.arpabet || '[override]',
        source: 'english-override'
      };
    }

    if (entry && entry.arpabet && global.KatakanaEngine) {
      var phonemes = parseArpabet(entry.arpabet);
      return {
        katakana: global.KatakanaEngine.postProcess(global.KatakanaEngine.phonemeToKatakana(phonemes)),
        phonemes: phonemes.join(' '),
        source: 'english-dictionary'
      };
    }

    if (options.fallbackToRules === false) {
      return null;
    }

    return convertEnglishWithEngine(word, options);
  }

  function convertLatinText(text, options) {
    options = options || {};
    var tokens = tokenizeLatinInput(text);
    var converted = [];
    var notes = [];
    var tokenSources = [];
    var lowConfidenceTokens = [];
    var allRomajiLike = tokens.length > 1 && tokens.every(function (token) {
      if (FORCE_ENGLISH_TOKENS.has(String(token).toLowerCase())) return false;
      return looksLikeJapaneseRomajiToken(token);
    });

    tokens.forEach(function (token) {
      if (hasKana(token)) {
        converted.push(normalizeMixedKatakana(token, { IMEMode: !!options.imeMode }));
        notes.push(token + ' -> kana');
        tokenSources.push('kana');
        return;
      }

      if (allRomajiLike) {
        converted.push(normalizeMixedKatakana(token, { IMEMode: !!options.imeMode }));
        notes.push(token + ' -> romaji phrase');
        tokenSources.push('romaji-phrase');
        return;
      }

      var english = convertEnglishWord(token, { fallbackToRules: false });
      if (english && english.katakana) {
        converted.push(english.katakana);
        notes.push(english.phonemes || (token + ' -> english'));
        tokenSources.push(english.source || 'english-dictionary');
        return;
      }

      if (looksLikeJapaneseRomajiToken(token)) {
        converted.push(normalizeMixedKatakana(token, { IMEMode: !!options.imeMode }));
        notes.push(token + ' -> romaji');
        tokenSources.push('romaji');
        return;
      }

      english = convertEnglishWord(token, options);
      converted.push(english.katakana);
      notes.push(english.phonemes || (token + ' -> english'));
      tokenSources.push(english.source || 'english-rules');
      if ((english.source || 'english-rules') === 'english-rules') {
        lowConfidenceTokens.push(token);
      }
    });

    var warning = '';
    var sourceLabel = 'Smart conversion';
    if (lowConfidenceTokens.length) {
      warning = 'Approximate for: ' + lowConfidenceTokens.join(', ');
      sourceLabel = 'Approximate English fallback';
      notes.unshift(warning);
    } else if (tokenSources.every(function (source) { return source === 'romaji' || source === 'romaji-phrase' || source === 'kana'; })) {
      sourceLabel = 'Kana and romaji conversion';
    } else if (tokenSources.some(function (source) { return source === 'english-override' || source === 'english-dictionary'; })) {
      sourceLabel = 'Dictionary-backed conversion';
    }

    return {
      katakana: converted.join(options.separator || ' '),
      phonemes: notes.join('\n'),
      sourceLabel: sourceLabel,
      lowConfidence: lowConfidenceTokens.length > 0,
      lowConfidenceTokens: lowConfidenceTokens
    };
  }

  function convertJapaneseName(text) {
    if (hasHan(text)) {
      if (!global.kuroshiroInstance || typeof global.kuroshiroInstance.convert !== 'function') {
        return Promise.resolve({
          katakana: '',
          phonemes: 'Japanese name parser is still loading.',
          pending: true
        });
      }

      return global.kuroshiroInstance.convert(text, { to: 'katakana' }).then(function (result) {
        return {
          katakana: result,
          phonemes: 'Converted from kanji using Kuroshiro.',
          pending: false
        };
      });
    }

    return Promise.resolve({
      katakana: normalizeMixedKatakana(text, { IMEMode: true }),
      phonemes: 'Converted from kana or romaji using WanaKana.',
      pending: false
    });
  }

  function pickInitial(syllable) {
    var initials = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's', 'y', 'w'];
    for (var i = 0; i < initials.length; i++) {
      if (syllable.indexOf(initials[i]) === 0) {
        return initials[i];
      }
    }
    return '';
  }

  function baseKana(initial, vowel) {
    var tables = {
      '': ['ア', 'イ', 'ウ', 'エ', 'オ'],
      b: ['バ', 'ビ', 'ブ', 'ベ', 'ボ'],
      p: ['パ', 'ピ', 'プ', 'ペ', 'ポ'],
      m: ['マ', 'ミ', 'ム', 'メ', 'モ'],
      f: ['ファ', 'フィ', 'フ', 'フェ', 'フォ'],
      d: ['ダ', 'ディ', 'ドゥ', 'デ', 'ド'],
      t: ['タ', 'ティ', 'トゥ', 'テ', 'ト'],
      n: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
      l: ['ラ', 'リ', 'ル', 'レ', 'ロ'],
      g: ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'],
      k: ['カ', 'キ', 'ク', 'ケ', 'コ'],
      h: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
      j: ['ジャ', 'ジ', 'ジュ', 'ジェ', 'ジョ'],
      q: ['チャ', 'チ', 'チュ', 'チェ', 'チョ'],
      x: ['シャ', 'シ', 'シュ', 'シェ', 'ショ'],
      zh: ['ジャ', 'ジ', 'ジュ', 'ジェ', 'ジョ'],
      ch: ['チャ', 'チ', 'チュ', 'チェ', 'チョ'],
      sh: ['シャ', 'シ', 'シュ', 'シェ', 'ショ'],
      r: ['ラ', 'リ', 'ル', 'レ', 'ロ'],
      z: ['ザ', 'ズィ', 'ズ', 'ゼ', 'ゾ'],
      c: ['ツァ', 'ツィ', 'ツ', 'ツェ', 'ツォ'],
      s: ['サ', 'シ', 'ス', 'セ', 'ソ'],
      y: ['ヤ', 'イ', 'ユ', 'イェ', 'ヨ'],
      w: ['ワ', 'ウィ', 'ウ', 'ウェ', 'ウォ']
    };
    var vowelIndex = { a: 0, i: 1, u: 2, e: 3, o: 4 };
    var row = tables[initial];
    if (!row) return '';
    return row[vowelIndex[vowel]];
  }

  function combineInitialFinal(initial, final) {
    var v = final;

    if (!initial) {
      var bare = {
        a: 'ア', ai: 'アイ', an: 'アン', ang: 'アン', ao: 'アオ',
        e: 'ウ', ei: 'エイ', en: 'エン', eng: 'オン', er: 'アール',
        o: 'オ', ou: 'オウ', ong: 'オン',
        i: 'イ', ia: 'ヤ', ian: 'イェン', iang: 'ヤン', iao: 'ヤオ', ie: 'イエ', in: 'イン', ing: 'イン', iong: 'ヨン', iu: 'ヨウ',
        u: 'ウ', ua: 'ワ', uai: 'ワイ', uan: 'ワン', uang: 'ワン', ui: 'ウェイ', un: 'ウン', uo: 'ウォ',
        v: 'ユ', ve: 'ユエ', van: 'ユエン', vn: 'ユン'
      };
      return bare[v] || '';
    }

    if (v === 'a') return baseKana(initial, 'a');
    if (v === 'ai') return baseKana(initial, 'a') + 'イ';
    if (v === 'an') return baseKana(initial, 'a') + 'ン';
    if (v === 'ang') return baseKana(initial, 'a') + 'ン';
    if (v === 'ao') return baseKana(initial, 'a') + 'オ';
    if (v === 'e') return baseKana(initial, 'e');
    if (v === 'ei') return baseKana(initial, 'e') + 'イ';
    if (v === 'en') return baseKana(initial, 'e') + 'ン';
    if (v === 'eng') return baseKana(initial, 'o') + 'ン';
    if (v === 'er') return baseKana(initial, 'e') + 'ル';
    if (v === 'o') return baseKana(initial, 'o');
    if (v === 'ou') return baseKana(initial, 'o') + 'ウ';
    if (v === 'ong') return baseKana(initial, 'o') + 'ン';
    if (v === 'i') return baseKana(initial, 'i');
    if (v === 'ia') return baseKana(initial, 'i') + 'ャ';
    if (v === 'ian') return baseKana(initial, 'i') + 'ェン';
    if (v === 'iang') return baseKana(initial, 'i') + 'ャン';
    if (v === 'iao') return baseKana(initial, 'i') + 'ャオ';
    if (v === 'ie') return baseKana(initial, 'i') + 'エ';
    if (v === 'in') return baseKana(initial, 'i') + 'ン';
    if (v === 'ing') return baseKana(initial, 'i') + 'ン';
    if (v === 'iong') return baseKana(initial, 'i') + 'ョン';
    if (v === 'iu') return baseKana(initial, 'i') + 'ョウ';
    if (v === 'u') return baseKana(initial, 'u');
    if (v === 'ua') return baseKana(initial, 'u') + 'ァ';
    if (v === 'uai') return baseKana(initial, 'u') + 'ァイ';
    if (v === 'uan') return baseKana(initial, 'u') + 'ァン';
    if (v === 'uang') return baseKana(initial, 'u') + 'ァン';
    if (v === 'ui') return baseKana(initial, 'u') + 'ェイ';
    if (v === 'un') return baseKana(initial, 'u') + 'ン';
    if (v === 'uo') return baseKana(initial, 'u') + 'ォ';
    if (v === 'v') return baseKana(initial, 'u');
    if (v === 've') return baseKana(initial, 'u') + 'エ';
    if (v === 'van') return baseKana(initial, 'u') + 'エン';
    if (v === 'vn') return baseKana(initial, 'u') + 'ン';

    return '';
  }

  function pinyinSyllableToKatakana(syllable) {
    var value = String(syllable || '').toLowerCase()
      .replace(/[1-5]/g, '')
      .replace(/u:/g, 'v')
      .replace(/ü/g, 'v');

    if (!value) return '';

    var special = {
      zhi: 'ジー', chi: 'チー', shi: 'シー', ri: 'リー',
      zi: 'ズー', ci: 'ツー', si: 'スー',
      yi: 'イー', wu: 'ウー', yu: 'ユー', ye: 'イエ',
      yue: 'ユエ', yuan: 'ユエン', yin: 'イン', ying: 'イン',
      yun: 'ユン', er: 'アール'
    };
    if (special[value]) return special[value];

    var initial = pickInitial(value);
    var final = value.slice(initial.length);

    if (initial === 'y') {
      initial = '';
      if (final.indexOf('u') === 0) final = 'v' + final.slice(1);
      else if (final === 'i') return 'イー';
    }
    if (initial === 'w') {
      initial = '';
      if (final === 'u') return 'ウー';
      final = 'u' + final.slice(1);
    }

    var kana = combineInitialFinal(initial, final);
    return kana || value;
  }

  function convertChineseToKatakana(text) {
    if (!global.pinyinPro || typeof global.pinyinPro.pinyin !== 'function') {
      return {
        katakana: text,
        phonemes: 'Chinese conversion library failed to load.'
      };
    }

    var syllables = global.pinyinPro.pinyin(text, {
      toneType: 'none',
      type: 'array',
      nonZh: 'consecutive'
    });

    var katakana = syllables.map(function (syllable) {
      if (hasHan(syllable)) return syllable;
      if (/^[a-züv:]+$/i.test(syllable)) return pinyinSyllableToKatakana(syllable);
      return syllable;
    }).join(' ');

    return {
      katakana: katakana.replace(/\s+/g, ' ').trim(),
      phonemes: syllables.join(' ')
    };
  }

  global.ToolConverters = {
    convertEnglishWord: convertEnglishWord,
    convertEnglishWithEngine: convertEnglishWithEngine,
    convertLatinText: convertLatinText,
    convertJapaneseName: convertJapaneseName,
    convertChineseToKatakana: convertChineseToKatakana,
    normalizeMixedKatakana: normalizeMixedKatakana,
    looksLikeJapaneseRomajiToken: looksLikeJapaneseRomajiToken
  };
})(typeof window !== 'undefined' ? window : this);
