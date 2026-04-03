/**
 * App Controller — UI logic for Katakana Converter
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    /* ── DOM References ── */
    var inputField = document.getElementById('english-input');
    var convertBtn = document.getElementById('convert-btn');
    var clearBtn = document.getElementById('clear-btn');
    var katakanaOutput = document.getElementById('katakana-output');
    var phonemeOutput = document.getElementById('phoneme-output');
    var sourceTag = document.getElementById('source-tag');
    var resultCard = document.getElementById('result-card');
    var benchmarkBtn = document.getElementById('benchmark-btn');
    var benchmarkResults = document.getElementById('benchmark-results');
    var benchmarkBody = document.getElementById('benchmark-body');
    var benchmarkSummary = document.getElementById('benchmark-summary');
    var rulesOnlyToggle = document.getElementById('rules-only-toggle');
    var charCount = document.getElementById('char-count');

    /* ── Convert Action ── */
    function doConvert() {
      var text = inputField.value.trim();
      if (!text) {
        katakanaOutput.textContent = 'テキストを入力してください';
        katakanaOutput.classList.add('placeholder-text');
        phonemeOutput.textContent = '';
        sourceTag.textContent = '';
        resultCard.classList.remove('visible');
        return;
      }
      var rulesOnly = rulesOnlyToggle && rulesOnlyToggle.checked;
      var result = KatakanaEngine.convert(text, { rulesOnly: rulesOnly });

      katakanaOutput.textContent = result.katakana;
      katakanaOutput.classList.remove('placeholder-text');

      var phonemes = result.details.map(function (d) {
        return d.word + ' → [' + d.phonemes.join(' ') + ']';
      }).join('\n');
      phonemeOutput.textContent = phonemes;

      var sources = result.details.map(function (d) { return d.source; });
      var hasDict = sources.indexOf('dictionary') >= 0;
      var hasRules = sources.indexOf('rules') >= 0;
      if (hasDict && hasRules) sourceTag.textContent = '📖 Dictionary + 🔧 Rules';
      else if (hasDict) sourceTag.textContent = '📖 Dictionary Match';
      else sourceTag.textContent = '🔧 Rule-Based Conversion';

      resultCard.classList.add('visible');
    }

    convertBtn.addEventListener('click', doConvert);
    inputField.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); doConvert(); }
    });
    inputField.addEventListener('input', function () {
      if (charCount) charCount.textContent = inputField.value.length;
    });

    clearBtn.addEventListener('click', function () {
      inputField.value = '';
      katakanaOutput.textContent = 'カタカナ';
      katakanaOutput.classList.add('placeholder-text');
      phonemeOutput.textContent = '';
      sourceTag.textContent = '';
      resultCard.classList.remove('visible');
      if (charCount) charCount.textContent = '0';
      inputField.focus();
    });

    /* ── Benchmark Action ── */
    benchmarkBtn.addEventListener('click', function () {
      benchmarkBtn.classList.add('loading');
      benchmarkBtn.textContent = 'Running...';

      setTimeout(function () {
        var rulesOnly = rulesOnlyToggle && rulesOnlyToggle.checked;
        var evalResult = KatakanaBenchmark.evaluate(null, { rulesOnly: rulesOnly });
        KatakanaBenchmark.printReport(evalResult);

        // Populate table
        benchmarkBody.innerHTML = '';
        evalResult.results.forEach(function (r) {
          var tr = document.createElement('tr');
          tr.className = r.exact ? 'pass' : 'fail';
          tr.innerHTML =
            '<td>' + r.input + '</td>' +
            '<td>' + r.expected + '</td>' +
            '<td>' + r.output + '</td>' +
            '<td class="status-cell">' + (r.exact ? '<span class="badge pass">✓</span>' : '<span class="badge fail">✗</span>') + '</td>' +
            '<td>' + r.editDistance + '</td>' +
            '<td>' + (r.normalizedSimilarity * 100).toFixed(0) + '%</td>' +
            '<td><span class="source-badge ' + r.source + '">' + r.source + '</span></td>';
          benchmarkBody.appendChild(tr);
        });

        // Summary
        var s = evalResult.summary;
        benchmarkSummary.innerHTML =
          '<div class="metric-card">' +
            '<div class="metric-value">' + s.exactMatchRate + '</div>' +
            '<div class="metric-label">Exact Match</div>' +
          '</div>' +
          '<div class="metric-card">' +
            '<div class="metric-value">' + s.avgEditDistance + '</div>' +
            '<div class="metric-label">Avg Edit Distance</div>' +
          '</div>' +
          '<div class="metric-card">' +
            '<div class="metric-value">' + s.avgNormalizedSimilarity + '</div>' +
            '<div class="metric-label">Char Similarity</div>' +
          '</div>' +
          '<div class="metric-card">' +
            '<div class="metric-value">' + s.avgSyllableSimilarity + '</div>' +
            '<div class="metric-label">Syllable Similarity</div>' +
          '</div>';

        benchmarkResults.classList.add('visible');
        benchmarkBtn.classList.remove('loading');
        benchmarkBtn.textContent = '▶ Run Benchmark';
        benchmarkResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });

    /* ── Smooth scroll for nav links ── */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /* ── Mobile nav toggle ── */
    var mobileToggle = document.getElementById('mobile-nav-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', function () {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        mobileMenu.setAttribute('aria-hidden', expanded);
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
      });
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
          mobileMenu.classList.remove('open');
          document.body.classList.remove('menu-open');
        });
      });
    }
  });
})();
