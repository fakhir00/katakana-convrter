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
    { input: 'coffee', expected: 'コーヒー' },
    { input: 'camera', expected: 'カメラ' },
    { input: 'strike', expected: 'ストライク' },
    { input: 'faakhir', expected: 'ファーキル' },
    { input: 'computer', expected: 'コンピュータ' },
    { input: 'chocolate', expected: 'チョコレート' },
    { input: 'internet', expected: 'インターネット' },
    { input: 'hamburger', expected: 'ハンバーガー' },
    { input: 'television', expected: 'テレビジョン' },
    { input: 'restaurant', expected: 'レストラン' },
    { input: 'piano', expected: 'ピアノ' },
    { input: 'taxi', expected: 'タクシー' },
    { input: 'hotel', expected: 'ホテル' },
    { input: 'bus', expected: 'バス' },
    { input: 'table', expected: 'テーブル' },
    { input: 'soccer', expected: 'サッカー' },
    { input: 'system', expected: 'システム' },
    { input: 'marathon', expected: 'マラソン' },
    { input: 'orange', expected: 'オレンジ' },
    { input: 'christmas', expected: 'クリスマス' },
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
