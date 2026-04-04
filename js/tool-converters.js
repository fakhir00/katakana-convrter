(function (global) {
  'use strict';

  function hasKana(text) {
    return /[\u3040-\u30ff]/.test(text);
  }

  function hasHan(text) {
    return /[\u3400-\u9fff]/.test(text);
  }

  function tokenizeWords(text) {
    return text.trim().split(/\s+/).filter(Boolean);
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
      }).join('\n')
    };
  }

  function convertLatinText(text, options) {
    options = options || {};
    var tokens = tokenizeWords(text);
    var converted = [];
    var notes = [];

    tokens.forEach(function (token) {
      if (hasKana(token)) {
        converted.push(normalizeMixedKatakana(token, { IMEMode: !!options.imeMode }));
        notes.push(token + ' -> kana');
        return;
      }

      if (looksLikeJapaneseRomajiToken(token)) {
        converted.push(normalizeMixedKatakana(token, { IMEMode: !!options.imeMode }));
        notes.push(token + ' -> romaji');
        return;
      }

      var english = convertEnglishWithEngine(token, options);
      converted.push(english.katakana);
      notes.push(english.phonemes || (token + ' -> english'));
    });

    return {
      katakana: converted.join(options.separator || ' '),
      phonemes: notes.join('\n')
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
    convertEnglishWithEngine: convertEnglishWithEngine,
    convertLatinText: convertLatinText,
    convertJapaneseName: convertJapaneseName,
    convertChineseToKatakana: convertChineseToKatakana,
    normalizeMixedKatakana: normalizeMixedKatakana,
    looksLikeJapaneseRomajiToken: looksLikeJapaneseRomajiToken
  };
})(typeof window !== 'undefined' ? window : this);
