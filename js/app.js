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
    var copyBtn = document.getElementById('copy-btn');

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
      var result = ToolConverters.convertLatinText(text, { separator: '・', rulesOnly: rulesOnly });

      katakanaOutput.textContent = result.katakana;
      katakanaOutput.classList.remove('placeholder-text');
      phonemeOutput.textContent = result.phonemes || 'Smart conversion';
      sourceTag.textContent = result.sourceLabel || 'English + romaji smart conversion';

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

    if (copyBtn) {
      copyBtn.addEventListener('click', function() {
        var textToCopy = katakanaOutput.textContent;
        if (textToCopy === 'カタカナ') return;
        navigator.clipboard.writeText(textToCopy).then(function() {
          var originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          copyBtn.classList.add('copied');
          setTimeout(function() {
            copyBtn.innerHTML = originalHTML;
            copyBtn.classList.remove('copied');
          }, 2000);
        });
      });
    }

  });
})();
