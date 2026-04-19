/**
 * Benchmark & Evaluation Module
 * Measures accuracy of the Katakana conversion engine
 */
(function (global) {
  'use strict';

  /* ========================================
   * TEST DATASET
   * ======================================== */
  var testSet = [
  {
    "input": "coffee",
    "expected": "コーヒー"
  },
  {
    "input": "camera",
    "expected": "カメラ"
  },
  {
    "input": "strike",
    "expected": "ストライク"
  },
  {
    "input": "faakhir",
    "expected": "ファーキル"
  },
  {
    "input": "computer",
    "expected": "コンピュータ"
  },
  {
    "input": "chocolate",
    "expected": "チョコレート"
  },
  {
    "input": "internet",
    "expected": "インターネット"
  },
  {
    "input": "hamburger",
    "expected": "ハンバーガー"
  },
  {
    "input": "television",
    "expected": "テレビジョン"
  },
  {
    "input": "restaurant",
    "expected": "レストラン"
  },
  {
    "input": "piano",
    "expected": "ピアノ"
  },
  {
    "input": "taxi",
    "expected": "タクシー"
  },
  {
    "input": "hotel",
    "expected": "ホテル"
  },
  {
    "input": "bus",
    "expected": "バス"
  },
  {
    "input": "table",
    "expected": "テーブル"
  },
  {
    "input": "soccer",
    "expected": "サッカー"
  },
  {
    "input": "system",
    "expected": "システム"
  },
  {
    "input": "marathon",
    "expected": "マラソン"
  },
  {
    "input": "orange",
    "expected": "オレンジ"
  },
  {
    "input": "christmas",
    "expected": "クリスマス"
  },
  {
    "input": "johnson",
    "expected": "ジョンソン"
  },
  {
    "input": "shakespeare",
    "expected": "シェイクスピア"
  },
  {
    "input": "washington",
    "expected": "ワシントン"
  },
  {
    "input": "thatcher",
    "expected": "サッチャー"
  },
  {
    "input": "einstein",
    "expected": "アインシュタイン"
  },
  {
    "input": "newton",
    "expected": "ニュートン"
  },
  {
    "input": "kennedy",
    "expected": "ケネディ"
  },
  {
    "input": "lincoln",
    "expected": "リンカーン"
  },
  {
    "input": "obama",
    "expected": "オバマ"
  },
  {
    "input": "trump",
    "expected": "トランプ"
  },
  {
    "input": "biden",
    "expected": "バイデン"
  },
  {
    "input": "merkel",
    "expected": "メルケル"
  },
  {
    "input": "macron",
    "expected": "マクロン"
  },
  {
    "input": "churchill",
    "expected": "チャーチル"
  },
  {
    "input": "knight",
    "expected": "ナイト"
  },
  {
    "input": "psychology",
    "expected": "サイコロジー"
  },
  {
    "input": "knife",
    "expected": "ナイフ"
  },
  {
    "input": "doubt",
    "expected": "ダウト"
  },
  {
    "input": "island",
    "expected": "アイランド"
  },
  {
    "input": "comb",
    "expected": "コーム"
  },
  {
    "input": "debt",
    "expected": "デット"
  },
  {
    "input": "phantom",
    "expected": "ファントム"
  },
  {
    "input": "rhythm",
    "expected": "リズム"
  },
  {
    "input": "queue",
    "expected": "キュー"
  },
  {
    "input": "thorough",
    "expected": "サロー"
  },
  {
    "input": "receipt",
    "expected": "レシート"
  },
  {
    "input": "gnome",
    "expected": "ノーム"
  },
  {
    "input": "mnemonic",
    "expected": "ニモニック"
  },
  {
    "input": "beautiful",
    "expected": "ビューティフル"
  },
  {
    "input": "ocean",
    "expected": "オーシャン"
  },
  {
    "input": "europe",
    "expected": "ヨーロッパ"
  },
  {
    "input": "audio",
    "expected": "オーディオ"
  },
  {
    "input": "mountain",
    "expected": "マウンテン"
  },
  {
    "input": "journey",
    "expected": "ジャーニー"
  },
  {
    "input": "leather",
    "expected": "レザー"
  },
  {
    "input": "feather",
    "expected": "フェザー"
  },
  {
    "input": "weather",
    "expected": "ウェザー"
  },
  {
    "input": "feature",
    "expected": "フィーチャー"
  },
  {
    "input": "creature",
    "expected": "クリーチャー"
  },
  {
    "input": "structure",
    "expected": "ストラクチャー"
  },
  {
    "input": "algorithm",
    "expected": "アルゴリズム"
  },
  {
    "input": "blockchain",
    "expected": "ブロックチェーン"
  },
  {
    "input": "encryption",
    "expected": "エンクリプション"
  },
  {
    "input": "database",
    "expected": "データベース"
  },
  {
    "input": "software",
    "expected": "ソフトウェア"
  },
  {
    "input": "hardware",
    "expected": "ハードウェア"
  },
  {
    "input": "processor",
    "expected": "プロセッサー"
  },
  {
    "input": "interface",
    "expected": "インターフェース"
  },
  {
    "input": "protocol",
    "expected": "プロトコル"
  },
  {
    "input": "browser",
    "expected": "ブラウザ"
  },
  {
    "input": "compiler",
    "expected": "コンパイラ"
  },
  {
    "input": "debug",
    "expected": "デバッグ"
  },
  {
    "input": "function",
    "expected": "ファンクション"
  },
  {
    "input": "variable",
    "expected": "バリアブル"
  },
  {
    "input": "apple",
    "expected": "アップル"
  },
  {
    "input": "google",
    "expected": "グーグル"
  },
  {
    "input": "microsoft",
    "expected": "マイクロソフト"
  },
  {
    "input": "amazon",
    "expected": "アマゾン"
  },
  {
    "input": "netflix",
    "expected": "ネットフリックス"
  },
  {
    "input": "disney",
    "expected": "ディズニー"
  },
  {
    "input": "london",
    "expected": "ロンドン"
  },
  {
    "input": "paris",
    "expected": "パリ"
  },
  {
    "input": "tokyo",
    "expected": "トウキョウ"
  },
  {
    "input": "new york",
    "expected": "ニュー・ヨーク"
  },
  {
    "input": "berlin",
    "expected": "ベルリン"
  },
  {
    "input": "moscow",
    "expected": "モスクワ"
  },
  {
    "input": "beijing",
    "expected": "ベイジン"
  },
  {
    "input": "good morning",
    "expected": "グッドモーニング"
  },
  {
    "input": "thank you",
    "expected": "サンキュー"
  },
  {
    "input": "how are you",
    "expected": "ハゥ・アー・ユー"
  },
  {
    "input": "merry christmas",
    "expected": "メリークリスマス"
  },
  {
    "input": "happy birthday",
    "expected": "ハッピーバースデー"
  },
  {
    "input": "new york city",
    "expected": "ニューヨークシティ"
  },
  {
    "input": "los angeles",
    "expected": "ロサンゼルス"
  },
  {
    "input": "san francisco",
    "expected": "サンフランシスコ"
  },
  {
    "input": "artificial intelligence",
    "expected": "アーティフィシャル・インテリジェンス"
  },
  {
    "input": "machine learning",
    "expected": "マシンラーニング"
  },
  {
    "input": "social media",
    "expected": "ソーシャルメディア"
  },
  {
    "input": "good luck",
    "expected": "グッドラック"
  },
  {
    "input": "excuse me",
    "expected": "エクスキューズミー"
  },
  {
    "input": "no problem",
    "expected": "ノープロブレム"
  },
  {
    "input": "see you",
    "expected": "シーユー"
  },
  {
    "input": "i love you",
    "expected": "アイラブユー"
  },
  {
    "input": "good afternoon",
    "expected": "グッドアフタヌーン"
  },
  {
    "input": "nice to meet you",
    "expected": "ナイス・トゥ・ミート・ユー"
  },
  {
    "input": "united states",
    "expected": "ユナイテッド・ステイツ"
  },
  {
    "input": "hong kong",
    "expected": "ホンコン"
  },
  {
    "input": "ice cream",
    "expected": "アイスクリーム"
  },
  {
    "input": "hot dog",
    "expected": "ホットドッグ"
  },
  {
    "input": "smart phone",
    "expected": "スマートフォン"
  },
  {
    "input": "cyber security",
    "expected": "サイバーセキュリティ"
  }
];

  /* ========================================
   * LEVENSHTEIN DISTANCE
   * ======================================== */
  function levenshtein(a, b) {
    var la = a.length, lb = b.length;
    if (la === 0) return lb;
    if (lb === 0) return la;
    var matrix = [];
    for (var i = 0; i <= la; i++) {
      matrix[i] = [i];
    }
    for (var j = 0; j <= lb; j++) {
      matrix[0][j] = j;
    }
    for (var i = 1; i <= la; i++) {
      for (var j = 1; j <= lb; j++) {
        var cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[la][lb];
  }

  /* ========================================
   * SYLLABLE-LEVEL SIMILARITY
   * ======================================== */
  function splitKatakana(str) {
    var syllables = [];
    var chars = Array.from(str);
    for (var i = 0; i < chars.length; i++) {
      var ch = chars[i];
      if (ch === 'ー' || ch === 'ッ' || ch === 'ン') {
        if (syllables.length > 0) {
          syllables[syllables.length - 1] += ch;
        } else {
          syllables.push(ch);
        }
      } else if (isSmallKana(chars[i + 1])) {
        syllables.push(ch + chars[i + 1]);
        i++;
      } else {
        syllables.push(ch);
      }
    }
    return syllables;
  }

  function isSmallKana(ch) {
    if (!ch) return false;
    return 'ァィゥェォャュョ'.indexOf(ch) >= 0;
  }

  function syllableSimilarity(output, expected) {
    var outSyl = splitKatakana(output);
    var expSyl = splitKatakana(expected);
    if (outSyl.length === 0 && expSyl.length === 0) return 1;
    if (outSyl.length === 0 || expSyl.length === 0) return 0;
    var maxLen = Math.max(outSyl.length, expSyl.length);
    var matches = 0;
    var minLen = Math.min(outSyl.length, expSyl.length);
    for (var i = 0; i < minLen; i++) {
      if (outSyl[i] === expSyl[i]) {
        matches++;
      } else {
        // Partial credit for similar syllables
        var base1 = outSyl[i].charAt(0);
        var base2 = expSyl[i].charAt(0);
        if (base1 === base2) matches += 0.5;
      }
    }
    return matches / maxLen;
  }

  /* ========================================
   * EVALUATE FUNCTION
   * ======================================== */
  function evaluate(customTestSet, options) {
    options = options || {};
    var rulesOnly = options.rulesOnly || false;
    var tests = customTestSet || testSet;
    var results = [];
    var exactMatches = 0;
    var totalEditDist = 0;
    var totalSimilarity = 0;

    for (var i = 0; i < tests.length; i++) {
      var test = tests[i];
      var result = global.KatakanaEngine.convert(test.input, { rulesOnly: rulesOnly });
      var output = result.katakana;
      var exact = output === test.expected;
      if (exact) exactMatches++;
      var editDist = levenshtein(output, test.expected);
      totalEditDist += editDist;
      var similarity = syllableSimilarity(output, test.expected);
      totalSimilarity += similarity;
      var maxLen = Math.max(output.length, test.expected.length);
      var normalizedDist = maxLen > 0 ? 1 - (editDist / maxLen) : 1;

      results.push({
        input: test.input,
        expected: test.expected,
        output: output,
        phonemes: result.details[0] ? result.details[0].phonemes : [],
        source: result.details[0] ? result.details[0].source : 'unknown',
        exact: exact,
        editDistance: editDist,
        normalizedSimilarity: normalizedDist,
        syllableSimilarity: similarity
      });
    }

    var count = tests.length;
    return {
      results: results,
      summary: {
        totalTests: count,
        exactMatches: exactMatches,
        exactMatchRate: (exactMatches / count * 100).toFixed(1) + '%',
        avgEditDistance: (totalEditDist / count).toFixed(2),
        avgNormalizedSimilarity: (totalEditDist > 0 ?
          results.reduce(function (s, r) { return s + r.normalizedSimilarity; }, 0) / count * 100 : 100).toFixed(1) + '%',
        avgSyllableSimilarity: (totalSimilarity / count * 100).toFixed(1) + '%'
      }
    };
  }

  /* ========================================
   * CONSOLE REPORT
   * ======================================== */
  function printReport(evalResult) {
    console.log('\n═══════════════════════════════════════════');
    console.log('  KATAKANA CONVERTER — BENCHMARK REPORT');
    console.log('═══════════════════════════════════════════\n');
    evalResult.results.forEach(function (r) {
      var status = r.exact ? '✅' : '❌';
      console.log(status + ' ' + r.input);
      console.log('   Expected: ' + r.expected);
      console.log('   Output:   ' + r.output);
      console.log('   Source:   ' + r.source);
      console.log('   Edit Dist: ' + r.editDistance + '  Similarity: ' + (r.normalizedSimilarity * 100).toFixed(0) + '%');
      console.log('');
    });
    var s = evalResult.summary;
    console.log('───────────────────────────────────────────');
    console.log('  SUMMARY');
    console.log('───────────────────────────────────────────');
    console.log('  Total Tests:          ' + s.totalTests);
    console.log('  Exact Matches:        ' + s.exactMatches + ' (' + s.exactMatchRate + ')');
    console.log('  Avg Edit Distance:    ' + s.avgEditDistance);
    console.log('  Avg Char Similarity:  ' + s.avgNormalizedSimilarity);
    console.log('  Avg Syllable Sim:     ' + s.avgSyllableSimilarity);
    console.log('═══════════════════════════════════════════\n');
  }

  /* ========================================
   * EXPORT
   * ======================================== */
  global.KatakanaBenchmark = {
    testSet: testSet,
    evaluate: evaluate,
    printReport: printReport,
    levenshtein: levenshtein,
    syllableSimilarity: syllableSimilarity
  };

})(typeof window !== 'undefined' ? window : this);
