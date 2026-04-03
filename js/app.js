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
    var rulesOnlyToggle = document.getElementById('rules-only-toggle');
    var charCount = document.getElementById('char-count');

    /* ── Convert Action ── */
    function doConvert() {
      var text = inputField.value.trim();
      if (!text) {
        katakanaOutput.textContent = 'カタカナ';
        katakanaOutput.classList.add('placeholder-text');
        phonemeOutput.textContent = 'Your phoneme breakdown will appear here after conversion.';
        sourceTag.textContent = 'Ready to convert';
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
      phonemeOutput.textContent = 'Your phoneme breakdown will appear here after conversion.';
      sourceTag.textContent = 'Ready to convert';
      if (charCount) charCount.textContent = '0';
      inputField.focus();
    });

  });
})();
