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

    var rulesOnlyToggle = document.getElementById('rules-only-toggle');
    var charCount = document.getElementById('char-count');
    var copyBtn = document.getElementById('copy-btn');

    /* ── Render Structured Phonemes ── */
    function renderPhonemes(phData) {
      if (!phonemeOutput) return;
      phonemeOutput.innerHTML = '';
      if (!phData || (Array.isArray(phData) && phData.length === 0)) {
        phonemeOutput.textContent = 'Your phoneme breakdown will appear here after conversion.';
        return;
      }
      
      // Handle legacy string output or simple notes
      if (typeof phData === 'string') {
        phonemeOutput.textContent = phData;
        return;
      }

      phData.forEach(function(item) {
        var group = document.createElement('div');
        group.className = 'phoneme-group';

        var wordLabel = document.createElement('span');
        wordLabel.className = 'phoneme-word-text';
        wordLabel.textContent = item.word;
        group.appendChild(wordLabel);

        var tokenList = document.createElement('div');
        tokenList.className = 'phoneme-tokens';

        var pText = (item.phonemes || '').replace(/[\[\]]/g, '').trim();
        if (!pText || pText === 'romaji' || pText === 'romaji phrase' || pText === 'kana' || pText === '[dictionary]') {
          var note = document.createElement('span');
          note.style.fontSize = '0.86rem';
          note.style.color = 'var(--text-muted)';
          note.style.fontWeight = '500';
          note.textContent = item.source === 'kana' ? 'Direct kana map' : (item.source === 'dictionary' ? 'Dictionary match' : 'Direct romaji map');
          tokenList.appendChild(note);
        } else {
          var tokens = pText.split(/\s+/);
          tokens.forEach(function(token) {
            var badge = document.createElement('span');
            badge.className = 'phoneme-token';
            badge.textContent = token;
            tokenList.appendChild(badge);
          });
        }

        group.appendChild(tokenList);
        phonemeOutput.appendChild(group);
      });
    }

    /* ── Convert Action ── */
    async function doConvert() {
      var text = inputField.value.trim();
      if (!text) {
        katakanaOutput.textContent = 'カタカナ';
        katakanaOutput.classList.add('placeholder-text');
        phonemeOutput.textContent = 'Your phoneme breakdown will appear here after conversion.';
        sourceTag.textContent = 'Ready to convert';
        return;
      }
      
      // Visual feedback for long translations
      katakanaOutput.textContent = 'Translating...';
      katakanaOutput.classList.add('placeholder-text');

      var rulesOnly = rulesOnlyToggle && rulesOnlyToggle.checked;
      try {
        var result = await ToolConverters.convertLatinText(text, { separator: '・', rulesOnly: rulesOnly });

        katakanaOutput.textContent = result.katakana;
        katakanaOutput.classList.remove('placeholder-text');
        renderPhonemes(result.details);
        sourceTag.textContent = result.sourceLabel || 'English + romaji smart conversion';
      } catch (err) {
        console.error('Conversion error:', err);
        katakanaOutput.textContent = 'Error';
        sourceTag.textContent = 'Something went wrong';
      }
    }


    convertBtn.addEventListener('click', doConvert);
    inputField.addEventListener('input', function () {
      if (charCount) charCount.textContent = inputField.value.length;
    });

    clearBtn.addEventListener('click', function () {
      inputField.value = '';
      katakanaOutput.textContent = 'カタカナ';
      katakanaOutput.classList.add('placeholder-text');
      renderPhonemes([]);
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
