const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const projectDir = path.join(rootDir, '..');
const indexHtmlPath = path.join(projectDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('index.html not found: ' + indexHtmlPath);
  process.exit(1);
}

const rootHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

const tools = [
  {
    path: 'name-to-katakana',
    isFile: false,
    title: 'Katakana Name Converter',
    desc: 'Convert any English name into Japanese Katakana instantly.',
    inputLabel: 'Type your English Name',
    placeholder: 'e.g. John Smith',
    buttonLabel: 'Convert Name to Katakana',
    logic: "var out = ToolConverters.convertLatinText(val, { separator: '・', rulesOnly: document.getElementById('rules-only-toggle') && document.getElementById('rules-only-toggle').checked }); outEl.textContent = out.katakana; phEl.textContent = out.phonemes || 'Smart conversion'; if(sourceTag) sourceTag.textContent = out.sourceLabel || 'English + romaji smart conversion';",
    deps: '<script src="../js/engine.js"></script><script src="../js/cmudict-data.js"></script><script src=\"https://unpkg.com/wanakana\"></script>',
    h1: 'Katakana Name Converter',
    sections: [
      {
        heading: 'What is Katakana Name Converter?',
        body: 'Katakana is the Japanese script used for foreign names, imported vocabulary, and brand-like phonetic spellings. This tool converts English-style names into a Katakana reading that fits Japanese pronunciation rules.'
      },
      {
        heading: 'When to Use This Katakana Name Converter?',
        body: 'Use it when you need a clean Katakana version of your personal name for introductions, name cards, profile pages, or simple localization tasks. It is especially helpful when a name ends with consonants that need extra vowel support in Japanese.'
      },
      {
        heading: 'Why the Output Looks Different From English',
        body: 'Japanese is organized around syllable-like sound units, so names are reshaped to fit that rhythm. If you also need a more general English-input workflow, try our {{related}} for broader phrase conversion.'
      }
    ],
    faqs: [
      {
        question: 'What is Katakana Name Converter?',
        answer: 'It is a browser-based converter that turns English personal names into Japanese Katakana. The output follows pronunciation patterns rather than copying English spelling directly.'
      },
      {
        question: 'When to Use This Katakana Name Converter?',
        answer: 'Use it when you need a readable Katakana version of a foreign name for introductions, web forms, or localization mockups. It is also useful for checking how a name may appear in Japanese contexts.'
      },
      {
        question: 'Why do some names gain extra vowels?',
        answer: 'Japanese phonetics usually alternate consonants and vowels, so final consonants often need an added vowel sound. That is why some names become slightly longer in Katakana.'
      },
      {
        question: 'Does this tool send my name to a server?',
        answer: 'No. The conversion runs in the browser, so your input stays on your device during normal use.'
      }
    ],
    relatedPath: 'english-name'
  },
  {
    path: 'english-name',
    isFile: false,
    title: 'English Name to Katakana Converter',
    desc: 'Find out how your English name is pronounced and written in Japan.',
    inputLabel: 'English Name',
    placeholder: 'Enter an English Name...',
    buttonLabel: 'Translate to Katakana',
    logic: "var out = ToolConverters.convertLatinText(val, { separator: '・', rulesOnly: document.getElementById('rules-only-toggle') && document.getElementById('rules-only-toggle').checked }); outEl.textContent = out.katakana; phEl.textContent = out.phonemes || 'Smart conversion'; if(sourceTag) sourceTag.textContent = out.sourceLabel || 'English + romaji smart conversion';",
    deps: '<script src="../js/engine.js"></script><script src="../js/cmudict-data.js"></script><script src=\"https://unpkg.com/wanakana\"></script>',
    h1: 'English Name to Katakana',
    sections: [
      {
        heading: 'What is English Name to Katakana Converter?',
        body: 'This tool helps map English names into Japanese Katakana based on pronunciation. It is designed for names that need a practical reading rather than a literal character-by-character swap.'
      },
      {
        heading: 'When to Use This English Name to Katakana Converter?',
        body: 'Use it when you want to understand how an English first name or full name is likely to be represented in Japan. It works well for identity examples, basic localization, and profile content.'
      },
      {
        heading: 'How English Sounds Get Simplified',
        body: 'Japanese has fewer vowel and consonant contrasts than English, so the converter chooses the closest available sound pattern. If you are converting general romaji-style syllables instead of names, the {{related}} is a better fit.'
      }
    ],
    faqs: [
      {
        question: 'What is English Name to Katakana Converter?',
        answer: 'It is a tool that converts English personal names into Japanese Katakana based on how the name sounds. The goal is a natural reading, not a direct alphabet substitution.'
      },
      {
        question: 'When to Use This English Name to Katakana Converter?',
        answer: 'Use it when you need a Japanese rendering of an English name for a profile, contact page, design mockup, or introduction. It is particularly useful when spelling alone does not make pronunciation obvious.'
      },
      {
        question: 'How are L and R handled?',
        answer: 'Japanese does not separate English L and R the same way English does, so both sounds are mapped to the Japanese ra-ri-ru-re-ro family. That can make different English spellings produce similar Katakana.'
      },
      {
        question: 'Can I use this for full sentences?',
        answer: 'It is optimized for names rather than long sentences. For broader phonetic keyboard input, a romaji-focused converter is usually better.'
      }
    ],
    relatedPath: 'romaji'
  },
  {
    path: 'full-width-katakana',
    isFile: false,
    title: 'Full-Width Katakana Converter',
    desc: 'Format half-width characters or romaji into beautiful, standard Full-Width Katakana.',
    inputLabel: 'Romaji or Half-Width Katakana',
    placeholder: 'Type half-width/romaji texts here...',
    buttonLabel: 'Convert to Full-Width',
    logic: "var text = wanakana.toKatakana(val, { IMEMode: true }); outEl.textContent = text ? text : 'カタカナ'; phEl.textContent = 'Powered by WanaKana.js'; if(sourceTag) sourceTag.textContent = 'Kana conversion';",
    deps: '<script src="../js/cmudict-data.js"></script><script src="https://unpkg.com/wanakana"></script>',
    h1: 'Full-Width Katakana Converter',
    sections: [
      {
        heading: 'What is Full-Width Katakana Converter?',
        body: 'This converter normalizes romaji or narrow character input into standard full-width Katakana. It is useful when a Japanese form rejects half-width text or mixed-width formatting.'
      },
      {
        heading: 'When to Use This Full-Width Katakana Converter?',
        body: 'Use it for registrations, bookings, payment flows, and any system that explicitly asks for zenkaku Katakana. It helps prevent width validation errors before you paste your text into a third-party form.'
      },
      {
        heading: 'Why Width Matters on Japanese Forms',
        body: 'Many legacy and enterprise systems still validate text width very strictly, especially for names and addresses. If you specifically need a personal-name version of this workflow, the {{related}} keeps that task focused.'
      }
    ],
    faqs: [
      {
        question: 'What is Full-Width Katakana Converter?',
        answer: 'It is a formatting tool that turns supported input into standard full-width Katakana characters. That makes the output easier to use on Japanese websites and forms that reject half-width text.'
      },
      {
        question: 'When to Use This Full-Width Katakana Converter?',
        answer: 'Use it when a site asks for zenkaku Katakana or when pasted text keeps failing validation. It is also helpful for cleaning mixed-width content before submission.'
      },
      {
        question: 'What does full-width mean?',
        answer: 'Full-width characters occupy the standard Japanese text width used in most modern forms and interfaces. They are different from half-width variants that came from older computing environments.'
      },
      {
        question: 'Can I paste the result directly into a form?',
        answer: 'Yes, that is the main use case. You can copy the output and use it in another application immediately.'
      }
    ],
    relatedPath: 'full-width-name'
  },
  {
    path: 'full-width-name',
    isFile: false,
    title: 'Full Width Katakana Name Converter',
    desc: 'Quickly format your name into Full-Width Katakana for Japanese web forms.',
    inputLabel: 'Your Romaji Name',
    placeholder: 'Type your mapped name for web form validation...',
    buttonLabel: 'Get Full-Width Katakana',
    logic: "var out = ToolConverters.convertLatinText(val, { imeMode: true }); outEl.textContent = out.katakana ? out.katakana.replace(/\\s+/g, ' ') : 'カタカナ'; phEl.textContent = out.phonemes || 'Powered by smart converter'; if(sourceTag) sourceTag.textContent = out.sourceLabel || 'English + romaji smart conversion';",
    deps: '<script src="../js/cmudict-data.js"></script><script src="https://unpkg.com/wanakana"></script>',
    h1: 'Full Width Katakana Name Converter',
    sections: [
      {
        heading: 'What is Full Width Katakana Name Converter?',
        body: 'It is a specialized tool for turning a personal name into full-width Katakana that is easier to paste into Japanese forms. The focus is on names rather than general-purpose text conversion.'
      },
      {
        heading: 'When to Use This Full Width Katakana Name Converter?',
        body: 'Use it when signing up for Japanese services, entering traveler details, or filling out profile fields that request full-width Katakana. It helps reduce failed submissions caused by width mismatches.'
      },
      {
        heading: 'Extra Form Details to Watch For',
        body: 'Some forms also require a full-width space between given and family names, so formatting rules can vary by site. If you need a broader text-width cleanup instead of just name formatting, see the {{related}}.'
      }
    ],
    faqs: [
      {
        question: 'What is Full Width Katakana Name Converter?',
        answer: 'It converts personal names into full-width Katakana for Japanese form entry. The result is designed for copy-and-paste use in systems that enforce strict width rules.'
      },
      {
        question: 'When to Use This Full Width Katakana Name Converter?',
        answer: 'Use it when a signup, reservation, or ticketing form requires your name in full-width Katakana. It is especially helpful if a site keeps rejecting roman letters or mixed-width text.'
      },
      {
        question: 'Do Japanese forms always want a space between names?',
        answer: 'Not always. Some ask for a full-width space and others want the full name with no separator, so it is worth checking the field instructions on the destination form.'
      },
      {
        question: 'Is the conversion private?',
        answer: 'Yes. The conversion runs client-side in the browser, so your name is not uploaded during normal use.'
      }
    ],
    relatedPath: 'full-width-katakana'
  },
  {
    path: 'katakana-to-hiragana',
    isFile: false,
    title: 'Katakana to Hiragana Converter',
    desc: 'Instantly swap angular Katakana text to smooth, curvy Hiragana characters.',
    inputLabel: 'Katakana Text',
    placeholder: 'Paste Katakana (e.g. カタカナ)...',
    buttonLabel: 'Convert to Hiragana',
    logic: "var text = wanakana.toHiragana(val); outEl.textContent = text ? text : 'ひらがな'; phEl.textContent = 'Powered by WanaKana.js'; if(sourceTag) sourceTag.textContent = 'Kana conversion';",
    deps: '<script src="../js/cmudict-data.js"></script><script src="https://unpkg.com/wanakana"></script>',
    emptyOutput: 'ひらがな',
    h1: 'Katakana to Hiragana Converter',
    sections: [
      {
        heading: 'What is Katakana to Hiragana Converter?',
        body: 'This tool rewrites Katakana text into the equivalent Hiragana characters. Because the two kana systems map sound-for-sound, the conversion is straightforward and keeps pronunciation intact.'
      },
      {
        heading: 'When to Use This Katakana to Hiragana Converter?',
        body: 'Use it when you want learner-friendly Japanese text, softer typography, or easier reading for native grammar study. It is helpful for notes, examples, and study content that should avoid the sharper Katakana look.'
      },
      {
        heading: 'Why This Conversion Is Reliable',
        body: 'Both kana systems cover the same phonetic inventory, so the main change is script style rather than meaning. If you need the opposite direction, the {{related}} handles Hiragana to Katakana.'
      }
    ],
    faqs: [
      {
        question: 'What is Katakana to Hiragana Converter?',
        answer: 'It converts Katakana text into the matching Hiragana characters. The pronunciation stays the same because both writing systems represent the same sounds.'
      },
      {
        question: 'When to Use This Katakana to Hiragana Converter?',
        answer: 'Use it when you want more beginner-friendly Japanese text or when a phrase looks more natural in Hiragana. It is common in study materials and grammar-focused examples.'
      },
      {
        question: 'Does the meaning change after conversion?',
        answer: 'No, the script changes but the reading stays the same. The biggest difference is how the text looks and how readers interpret its tone or context.'
      },
      {
        question: 'Can this help with Japanese study?',
        answer: 'Yes. Many learners find Hiragana easier to read at an early stage, so converting text can make practice materials more approachable.'
      }
    ],
    relatedPath: 'hiragana-to'
  },
  {
    path: 'hiragana-to-katakana',
    isFile: false,
    title: 'Hiragana to Katakana Converter',
    desc: 'Instantly convert native Japanese Hiragana syllabaries into Katakana.',
    inputLabel: 'Hiragana Text',
    placeholder: 'Paste Hiragana (e.g. ひらがな)...',
    buttonLabel: 'Convert to Katakana',
    logic: "var text = wanakana.toKatakana(val); outEl.textContent = text ? text : 'カタカナ'; phEl.textContent = 'Powered by WanaKana.js'; if(sourceTag) sourceTag.textContent = 'Kana conversion';",
    deps: '<script src="https://unpkg.com/wanakana"></script>',
    h1: 'Hiragana to Katakana Converter',
    sections: [
      {
        heading: 'What is Hiragana to Katakana Converter?',
        body: 'This tool converts Hiragana into Katakana character-by-character. It is useful when you want a sharper script style for names, labels, emphasis, or formatting conventions.'
      },
      {
        heading: 'When to Use This Hiragana to Katakana Converter?',
        body: 'Use it when preparing vocabulary lists, emphasizing a word stylistically, or matching interfaces that display certain terms in Katakana. It is also useful for converting reading guides and display labels.'
      },
      {
        heading: 'Why Japanese Sometimes Switches Scripts',
        body: 'Japanese writers change script to signal tone, emphasis, foreignness, or UI conventions even when the pronunciation stays identical. If you need to reverse that styling choice, use the {{related}}.'
      }
    ],
    faqs: [
      {
        question: 'What is Hiragana to Katakana Converter?',
        answer: 'It changes Hiragana text into the equivalent Katakana script. The sounds remain the same while the visual style becomes more angular and emphatic.'
      },
      {
        question: 'When to Use This Hiragana to Katakana Converter?',
        answer: 'Use it when you want Katakana styling for labels, emphasis, product naming, or reading guides. It can also help standardize script usage across content.'
      },
      {
        question: 'Is the conversion exact?',
        answer: 'Yes, for normal kana mapping it is effectively one-to-one. Each Hiragana character has a corresponding Katakana form.'
      },
      {
        question: 'Will this translate Japanese into English?',
        answer: 'No. It only changes the kana script and does not translate meaning into another language.'
      }
    ],
    relatedPath: 'to-hiragana'
  },
  {
    path: 'japanese-name',
    isFile: false,
    title: 'Japanese Name to Katakana',
    desc: 'Easily transcribe Romaji or Hiragana combinations into Katakana characters.',
    inputLabel: 'Japanese Name (Romaji)',
    placeholder: 'e.g. Suzuki Ichiro...',
    buttonLabel: 'Create Katakana',
    logic: "ToolConverters.convertJapaneseName(val).then(function(out){ if(out.pending){ phEl.textContent = out.phonemes; return; } outEl.textContent = out.katakana ? out.katakana.replace(/\\s+/g, ' ') : 'カタカナ'; phEl.textContent = out.phonemes || 'Japanese name conversion'; if(sourceTag) sourceTag.textContent = /[\\u3400-\\u9fff]/.test(val) ? 'Kanji reading conversion' : 'Kana and romaji conversion'; });",
    deps: '<script src="https://unpkg.com/wanakana"></script><script src="https://unpkg.com/kuroshiro@1.2.0/dist/kuroshiro.min.js"></script><script src="https://unpkg.com/kuroshiro-analyzer-kuromoji@1.1.0/dist/kuroshiro-analyzer-kuromoji.min.js"></script><script>window.kuroshiroInstance=null;document.addEventListener("DOMContentLoaded",function(){var k=new Kuroshiro();k.init(new KuromojiAnalyzer({dictPath:\"https://unpkg.com/kuromoji@0.1.2/dict\"})).then(function(){window.kuroshiroInstance=k;console.log(\"Kuroshiro ready\");});});</script>',
    h1: 'Japanese Name to Katakana',
    sections: [
      {
        heading: 'What is Japanese Name to Katakana?',
        body: 'This tool converts Japanese-style name input into Katakana so you can create a clean reading form of the name. It is especially useful when a system asks for furigana beside a kanji name field.'
      },
      {
        heading: 'When to Use This Japanese Name to Katakana?',
        body: 'Use it when entering readings for a Japanese name, standardizing forms, or preparing profile details that need Katakana display. It helps with names typed in romaji or with simple kana input.'
      },
      {
        heading: 'Why Furigana Fields Matter',
        body: 'Many Japanese systems store a phonetic reading separately from the main name for search, validation, or customer support workflows. If your source text is already in kanji and needs automatic reading extraction, the {{related}} is more suitable.'
      }
    ],
    faqs: [
      {
        question: 'What is Japanese Name to Katakana?',
        answer: 'It converts Japanese name input into Katakana so you can create a readable phonetic version of the name. This is useful for furigana and standardized profile fields.'
      },
      {
        question: 'When to Use This Japanese Name to Katakana?',
        answer: 'Use it when a form asks for the reading of a Japanese name in Katakana. It is common in registrations, applications, and account settings.'
      },
      {
        question: 'Can I type romaji instead of kana?',
        answer: 'Yes, standard romaji input is supported for normal syllable conversion. The tool then outputs the corresponding Katakana form.'
      },
      {
        question: 'What if my name starts in kanji?',
        answer: 'If you only have kanji text and need the reading inferred automatically, a kanji-reading tool is usually the better fit.'
      }
    ],
    relatedPath: 'kanji'
  },
  {
    path: 'romaji-to-katakana',
    isFile: false,
    title: 'Romaji to Katakana Converter',
    desc: 'The best tool for typing Japanese Katakana using your standard English keyboard.',
    inputLabel: 'Type Romaji',
    placeholder: 'Type Romaji blocks e.g. "konnichiwa"...',
    buttonLabel: 'Convert to Katakana',
    logic: "var text = wanakana.toKatakana(val); outEl.textContent = text ? text : 'カタカナ'; phEl.textContent = 'Powered by WanaKana.js'; if(sourceTag) sourceTag.textContent = 'Romaji conversion';",
    deps: '<script src="https://unpkg.com/wanakana"></script>',
    h1: 'Romaji to Katakana Converter',
    sections: [
      {
        heading: 'What is Romaji to Katakana Converter?',
        body: 'This converter turns romanized Japanese syllables into Katakana as you type. It is ideal for users who know the sound pattern they want but are entering text with Latin letters.'
      },
      {
        heading: 'When to Use This Romaji to Katakana Converter?',
        body: 'Use it for keyboard-friendly Japanese input, quick transliteration, and draft text entry when a full Japanese keyboard is inconvenient. It works especially well for phonetic Japanese words and names.'
      },
      {
        heading: 'How to Get Better Results',
        body: 'Using standard romanization patterns such as shi, tsu, and double consonants improves output quality because the parser expects recognizable syllable blocks. If your source is already in Hiragana, the {{related}} avoids the extra romanization step.'
      }
    ],
    faqs: [
      {
        question: 'What is Romaji to Katakana Converter?',
        answer: 'It converts romanized Japanese input into Katakana. You type with Latin letters and the tool outputs the matching kana.'
      },
      {
        question: 'When to Use This Romaji to Katakana Converter?',
        answer: 'Use it when you want to type Japanese sounds from a standard keyboard without installing or switching to a Japanese IME. It is also useful for quick drafts and transliteration checks.'
      },
      {
        question: 'Why does double n sometimes matter?',
        answer: 'Typing nn can force the standalone ン sound before a vowel or y-sound. Without it, the parser may treat the n as part of the next syllable.'
      },
      {
        question: 'Does it support long words and phrases?',
        answer: 'Yes, as long as the input follows recognizable romaji patterns. More standard romanization usually leads to cleaner Katakana output.'
      }
    ],
    relatedPath: 'hiragana-to'
  },
  {
    path: 'latin-to-katakana',
    isFile: false,
    title: 'Latin to Katakana Converter',
    desc: 'Map standard Latin alphabet characters to Katakana representations natively.',
    inputLabel: 'Latin Text Context',
    placeholder: 'Enter Latin mapping phonetes...',
    buttonLabel: 'Convert Latin to Katakana',
    logic: "var out = ToolConverters.convertLatinText(val); outEl.textContent = out.katakana ? out.katakana.replace(/\\s+/g, ' ') : 'カタカナ'; phEl.textContent = out.phonemes || 'Powered by smart converter'; if(sourceTag) sourceTag.textContent = out.sourceLabel || 'English + romaji smart conversion';",
    deps: '<script src="../js/cmudict-data.js"></script><script src="https://unpkg.com/wanakana"></script>',
    h1: 'Latin to Katakana Converter',
    sections: [
      {
        heading: 'What is Latin to Katakana Converter?',
        body: 'This tool maps Latin-letter phonetic input into Katakana so you can move from alphabet text into a Japanese script quickly. It is useful for transliteration and simple localization workflows.'
      },
      {
        heading: 'When to Use This Latin to Katakana Converter?',
        body: 'Use it when your source text is already approximated in Latin characters and you want a Katakana rendering. It is a practical option for labels, names, and broad phonetic drafting.'
      },
      {
        heading: 'How It Differs From Name-Only Tools',
        body: 'Latin input can include more than personal names, so the tool is broader than a name-only converter while still staying phonetic rather than semantic. If the input is clearly standard Japanese romaji, the {{related}} provides a more focused workflow.'
      }
    ],
    faqs: [
      {
        question: 'What is Latin to Katakana Converter?',
        answer: 'It converts Latin-letter phonetic input into Katakana. This is useful when text starts in the alphabet but needs a Japanese-script rendering.'
      },
      {
        question: 'When to Use This Latin to Katakana Converter?',
        answer: 'Use it when you have alphabet-based phonetic text and want a Katakana version for display or localization. It works well for general-purpose transliteration tasks.'
      },
      {
        question: 'Is it the same as translation?',
        answer: 'No. The tool is phonetic, which means it changes script based on sound rather than translating meaning from one language to another.'
      },
      {
        question: 'Can I use this for names and product labels?',
        answer: 'Yes, those are common use cases as long as you want a sound-based Katakana rendering instead of a semantic translation.'
      }
    ],
    relatedPath: 'romaji'
  },
  {
    path: 'kanji-to-katakana',
    isFile: false,
    title: 'Kanji to Katakana Converter',
    desc: 'Use morphology to read complex Japanese Kanji characters and extract their Katakana pronunciation.',
    inputLabel: 'Paste Kanji Sentences',
    placeholder: 'Paste native Japanese text with Kanji...',
    buttonLabel: 'Read Kanji',
    logic: "if(!window.kuroshiroInstance){phEl.textContent='Please wait, loading Kanji dictionary (20MB)...';return;}phEl.textContent='Converting...';window.kuroshiroInstance.convert(val,{to:'katakana'}).then(function(result){outEl.textContent=result;phEl.textContent='Powered by Kuroshiro & Kuromoji';}).catch(function(err){console.error(err);phEl.textContent='Error parsing Kanji';});",
    deps: '<script src="https://unpkg.com/kuroshiro@1.2.0/dist/kuroshiro.min.js"></script><script src="https://unpkg.com/kuroshiro-analyzer-kuromoji@1.1.0/dist/kuroshiro-analyzer-kuromoji.min.js"></script><script>window.kuroshiroInstance=null;document.addEventListener("DOMContentLoaded",function(){var k=new Kuroshiro();k.init(new KuromojiAnalyzer({dictPath:"https://unpkg.com/kuromoji@0.1.2/dict"})).then(function(){window.kuroshiroInstance=k;console.log("Kuroshiro ready");});});</script>',
    h1: 'Kanji to Katakana Converter',
    sections: [
      {
        heading: 'What is Kanji to Katakana Converter?',
        body: 'This tool analyzes kanji text and outputs a Katakana reading based on Japanese morphological parsing. It is built for situations where you need the pronunciation instead of the original logographic script.'
      },
      {
        heading: 'When to Use This Kanji to Katakana Converter?',
        body: 'Use it when you need furigana-like readings, phonetic support for names and terms, or a faster way to inspect unfamiliar Japanese text. It is especially useful for reading assistance and localization prep.'
      },
      {
        heading: 'Why Context Matters With Kanji',
        body: 'The same kanji can be read differently depending on surrounding words, compounds, and grammar, so a dictionary-driven parser is needed for good results. If you want the output in softer learner-friendly kana instead, the {{related}} is the better companion tool.'
      }
    ],
    faqs: [
      {
        question: 'What is Kanji to Katakana Converter?',
        answer: 'It is a reading tool that converts kanji text into Katakana pronunciation. It uses a Japanese parser to infer readings from context rather than from isolated character guesses.'
      },
      {
        question: 'When to Use This Kanji to Katakana Converter?',
        answer: 'Use it when you need a phonetic reading of Japanese text, especially for names, vocabulary, or form-support workflows. It is helpful when kanji alone is hard to read.'
      },
      {
        question: 'Will every proper noun be perfect?',
        answer: 'Not always. Common words usually work well, but rare names and unusual domain-specific terms may still need manual review.'
      },
      {
        question: 'Does it run locally?',
        answer: 'The parsing logic runs in the browser after the required dictionary assets load. That keeps the workflow client-side once the resources are available.'
      }
    ],
    relatedPath: 'kanji-to-hiragana'
  },
  {
    path: 'kanji-to-hiragana',
    isFile: false,
    title: 'Kanji to Hiragana Converter',
    desc: 'Read Japanese Kanji sentences easily by translating them fully into Hiragana.',
    inputLabel: 'Paste Kanji Sentences',
    placeholder: 'Paste Kanji text here...',
    buttonLabel: 'Translate to Hiragana',
    logic: "if(!window.kuroshiroInstance){phEl.textContent='Please wait, loading Kanji dictionary (20MB)...';return;}phEl.textContent='Converting...';window.kuroshiroInstance.convert(val,{to:'hiragana'}).then(function(result){outEl.textContent=result;phEl.textContent='Powered by Kuroshiro & Kuromoji'; if(sourceTag) sourceTag.textContent='Japanese reading parser';}).catch(function(err){console.error(err);phEl.textContent='Error parsing Kanji';});",
    deps: '<script src="https://unpkg.com/kuroshiro@1.2.0/dist/kuroshiro.min.js"></script><script src="https://unpkg.com/kuroshiro-analyzer-kuromoji@1.1.0/dist/kuroshiro-analyzer-kuromoji.min.js"></script><script>window.kuroshiroInstance=null;document.addEventListener("DOMContentLoaded",function(){var k=new Kuroshiro();k.init(new KuromojiAnalyzer({dictPath:"https://unpkg.com/kuromoji@0.1.2/dict"})).then(function(){window.kuroshiroInstance=k;console.log("Kuroshiro ready");});});</script>',
    emptyOutput: 'ひらがな',
    h1: 'Kanji to Hiragana Converter',
    sections: [
      {
        heading: 'What is Kanji to Hiragana Converter?',
        body: 'This tool converts kanji text into Hiragana so the pronunciation becomes easier to read. It is useful for study, reading support, and simplifying dense Japanese text.'
      },
      {
        heading: 'When to Use This Kanji to Hiragana Converter?',
        body: 'Use it when you are learning Japanese, checking grammar patterns, or creating reading-friendly content for beginners. It is especially helpful when kanji knowledge is still limited.'
      },
      {
        heading: 'Why Hiragana Output Helps Learners',
        body: 'Hiragana makes sentence flow and particles easier to inspect because it removes the visual interruption caused by unfamiliar kanji. If you need the same kind of reading output in Katakana for form or labeling workflows, the {{related}} is a closer match.'
      }
    ],
    faqs: [
      {
        question: 'What is Kanji to Hiragana Converter?',
        answer: 'It changes kanji text into Hiragana pronunciation so Japanese becomes easier to read. The focus is phonetic readability, not English translation.'
      },
      {
        question: 'When to Use This Kanji to Hiragana Converter?',
        answer: 'Use it when you are studying Japanese, checking readings, or making text more accessible to beginners. It is especially useful for longer passages.'
      },
      {
        question: 'Does it understand whole sentences?',
        answer: 'Yes, it is designed to parse sentence context rather than treating each kanji as an isolated symbol. That helps produce more natural readings.'
      },
      {
        question: 'Can it replace a dictionary?',
        answer: 'Not completely. It is a strong reading aid, but vocabulary nuance and rare proper nouns may still require additional reference checks.'
      }
    ],
    relatedPath: 'kanji'
  },
  {
    path: 'chinese-to-katakana',
    isFile: false,
    title: 'Chinese to Katakana Converter',
    desc: 'Convert Chinese Hanzi characters into Japanese Katakana readings for localization.',
    inputLabel: 'Insert Chinese Hanzi',
    placeholder: 'Paste Traditional/Hanzi Characters...',
    buttonLabel: 'Retrieve Katakana',
    logic: "var out = ToolConverters.convertChineseToKatakana(val); outEl.textContent = out.katakana || 'カタカナ'; phEl.textContent = out.phonemes || 'Pinyin conversion'; if(sourceTag) sourceTag.textContent = 'Chinese pinyin conversion';",
    deps: '<script src="https://unpkg.com/pinyin-pro@3.27.0/dist/index.umd.js"></script>',
    h1: 'Chinese to Katakana Converter',
    sections: [
      {
        heading: 'What is Chinese to Katakana Converter?',
        body: 'This tool attempts to derive a Japanese Katakana reading from Chinese Hanzi input by using Japanese reading logic where possible. It is intended for rough localization support and phonetic reference.'
      },
      {
        heading: 'When to Use This Chinese to Katakana Converter?',
        body: 'Use it when exploring how Chinese-origin text may be represented phonetically for a Japanese audience. It can help with names, place references, and early-stage localization work.'
      },
      {
        heading: 'Important Limitations to Expect',
        body: 'Chinese and Japanese do not map perfectly, especially when simplified forms or name-specific readings are involved, so results should be reviewed carefully. If your source text is already standard Japanese kanji, the {{related}} is usually the more reliable choice.'
      }
    ],
    faqs: [
      {
        question: 'What is Chinese to Katakana Converter?',
        answer: 'It is a phonetic helper that tries to generate Japanese Katakana readings from Chinese Hanzi input. The goal is exploratory localization support rather than guaranteed linguistic accuracy.'
      },
      {
        question: 'When to Use This Chinese to Katakana Converter?',
        answer: 'Use it when you need a rough Japanese reading for Hanzi-based text, especially during early content adaptation or name research. It is best treated as a starting point for review.'
      },
      {
        question: 'Will every Chinese character map cleanly?',
        answer: 'No. Character sets, historical readings, and name conventions can differ, so some results may be approximate or incomplete.'
      },
      {
        question: 'Should I review the output manually?',
        answer: 'Yes. This tool is most useful for first-pass phonetic support, not final editorial approval.'
      }
    ],
    relatedPath: 'kanji'
  }
];

const exploreCards = [
  { path: 'name-to-katakana', isFile: false, icon: 'Name', title: 'Katakana Name', desc: 'Convert your English name into a Japanese Katakana reading.' },
  { path: 'english-name', isFile: false, icon: 'EN', title: 'English Name Converter', desc: 'See how English names are commonly adapted into Japanese.' },
  { path: 'full-width-katakana', isFile: false, icon: 'FW', title: 'Full-Width Katakana', desc: 'Normalize romaji or narrow input into full-width Katakana.' },
  { path: 'full-width-name', isFile: false, icon: 'Form', title: 'Full-Width Name', desc: 'Prepare your name for Japanese web forms and signups.' },
  { path: 'katakana-to-hiragana', isFile: false, icon: 'K->H', title: 'Katakana to Hiragana', desc: 'Rewrite Katakana into the matching Hiragana script.' },
  { path: 'hiragana-to-katakana', isFile: false, icon: 'H->K', title: 'Hiragana to Katakana', desc: 'Convert Hiragana text into a Katakana presentation.' },
  { path: 'japanese-name', isFile: false, icon: 'JP', title: 'Japanese Name to Katakana', desc: 'Create Katakana readings for Japanese-style name input.' },
  { path: 'romaji-to-katakana', isFile: false, icon: 'Roma', title: 'Romaji to Katakana', desc: 'Type Japanese sounds from a standard Latin keyboard.' },
  { path: 'latin-to-katakana', isFile: false, icon: 'ABC', title: 'Latin to Katakana', desc: 'Map Latin-letter phonetic input into Katakana quickly.' },
  { path: 'kanji-to-katakana', isFile: false, icon: 'Kanji', title: 'Kanji to Katakana', desc: 'Extract a Katakana reading from Japanese kanji text.' },
  { path: 'kanji-to-hiragana', isFile: false, icon: 'Read', title: 'Kanji to Hiragana', desc: 'Turn kanji-heavy text into a Hiragana reading aid.' },
  { path: 'chinese-to-katakana', isFile: false, icon: 'CN', title: 'Chinese to Katakana', desc: 'Generate rough Japanese Katakana readings from Hanzi.' }
];

const siteNavItems = [
  { name: 'Home', url: 'https://www.katakanaconverter.com/' },
  { name: 'About', url: 'https://www.katakanaconverter.com/about-us/' },
  { name: 'Contact', url: 'https://www.katakanaconverter.com/contact-us/' },
  { name: 'Katakana Name Converter', url: 'https://www.katakanaconverter.com/name-to-katakana/' },
  { name: 'English Name to Katakana', url: 'https://www.katakanaconverter.com/english-name/' },
  { name: 'Full-Width Katakana Converter', url: 'https://www.katakanaconverter.com/full-width-katakana/' },
  { name: 'Full Width Katakana Name Converter', url: 'https://www.katakanaconverter.com/full-width-name/' },
  { name: 'Katakana to Hiragana Converter', url: 'https://www.katakanaconverter.com/katakana-to-hiragana/' },
  { name: 'Hiragana to Katakana Converter', url: 'https://www.katakanaconverter.com/hiragana-to-katakana/' },
  { name: 'Japanese Name to Katakana', url: 'https://www.katakanaconverter.com/japanese-name/' },
  { name: 'Romaji to Katakana Converter', url: 'https://www.katakanaconverter.com/romaji-to-katakana/' },
  { name: 'Latin to Katakana Converter', url: 'https://www.katakanaconverter.com/latin-to-katakana/' },
  { name: 'Kanji to Katakana Converter', url: 'https://www.katakanaconverter.com/kanji-to-katakana/' },
  { name: 'Kanji to Hiragana Converter', url: 'https://www.katakanaconverter.com/kanji-to-hiragana/' },
  { name: 'Chinese to Katakana Converter', url: 'https://www.katakanaconverter.com/chinese-to-katakana/' }
];

function buildMetaDescription(keyword) {
  const candidates = [
    keyword + ' for fast browser-based Japanese text conversion, phonetic checks, and Japan-ready formatting. Try it now online.',
    keyword + ' for browser-based Japanese text conversion, phonetic checks, and form-ready formatting. Try it now for free.',
    keyword + ' for fast Japanese text conversion, phonetic checks, and Japan-ready formatting in your browser. Try it free online.'
  ];

  for (const candidate of candidates) {
    if (candidate.length >= 145 && candidate.length <= 160) {
      return candidate;
    }
  }

  let best = candidates[0];
  if (best.length > 160) {
    best = best.slice(0, 160).replace(/\s+\S*$/, '') + '.';
  }
  return best;
}

function buildHeroDescription(keyword) {
  return '<strong>' + keyword + '</strong> for fast browser-based Japanese text conversion, phonetic checks, and Japan-ready formatting. Free and easy to use online.';
}

function buildMetaTitle(keyword) {
  return keyword + ' | Free Online Tool';
}

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Katakana Converter',
    url: 'https://www.katakanaconverter.com/',
    logo: 'https://www.katakanaconverter.com/favicon.svg',
    description: 'Free Katakana conversion tool for names, forms, and Japanese text formatting.',
    email: 'contact@katakanaconverter.com',
    telephone: '+1-555-240-9087',
    sameAs: [
      'https://twitter.com/katakanaconvert',
      'https://facebook.com/katakanaconverter',
      'https://linkedin.com/company/katakana-converter',
      'https://pinterest.com/katakanaconverter'
    ]
  };
}

function buildSiteNavigationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': siteNavItems.map(function (item) {
      return {
        '@type': 'SiteNavigationElement',
        name: item.name,
        url: item.url
      };
    })
  };
}

function buildBreadcrumbSchema(name, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.katakanaconverter.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: name,
        item: url
      }
    ]
  };
}

function resolveHref(tool, relPath) {
  return relPath + tool.path + (tool.isFile ? '' : '/');
}

function buildFaqSchema(tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map(function (faq) {
      return {
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      };
    })
  };
}

function replaceJsonLdBlock(html, label, schemaObject) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp('<!-- ' + escapedLabel + ' -->\\s*<script type="application/ld\\+json">[\\s\\S]*?<\\/script>');
  if (!pattern.test(html)) {
    throw new Error('Unable to update schema block for ' + label);
  }
  return html.replace(
    pattern,
    '<!-- ' + label + ' -->\n  <script type="application/ld+json">\n' + JSON.stringify(schemaObject, null, 2) + '\n  </script>'
  );
}

function buildSemanticBody(tool, relPath) {
  const relatedTool = tools.find(function (entry) {
    return entry.path === tool.relatedPath;
  });
  const relatedHref = relatedTool ? resolveHref(relatedTool, relPath) : null;
  const relatedLink = relatedTool
    ? '<a href="' + relatedHref + '">' + relatedTool.title + '</a>'
    : '';

  const sectionsHtml = tool.sections.map(function (section) {
    const body = relatedLink ? section.body.replace('{{related}}', relatedLink) : section.body.replace('{{related}}', tool.title);
    return (
      '<article class="content-block">' +
        '<h2>' + section.heading + '</h2>' +
        '<p>' + body + '</p>' +
      '</article>'
    );
  }).join('');

  const faqHtml = tool.faqs.map(function (faq, index) {
    return (
      '<details class="faq-item"' + (index === 0 ? ' open' : '') + '>' +
        '<summary class="faq-question">' + faq.question + '</summary>' +
        '<div class="faq-answer"><p>' + faq.answer + '</p></div>' +
      '</details>'
    );
  }).join('');

  return (
    '<section class="seo-content-section">' +
      '<div class="container">' +
        '<div class="content-flow">' + sectionsHtml + '</div>' +
      '</div>' +
    '</section>'
  );
}

function buildExploreHtml(relPath) {
  const cardsHtml = exploreCards.map(function (card) {
    const href = resolveHref(card, relPath);
    return (
      '<a href="' + href + '" class="tool-card">' +
        '<div class="tool-icon" aria-hidden="true">' + card.icon + '</div>' +
        '<h3>' + card.title + '</h3>' +
        '<p>' + card.desc + '</p>' +
        '<div class="tool-link-text">Open tool</div>' +
      '</a>'
    );
  }).join('');

  return (
    '<section class="explore-tools-section">' +
      '<div class="container">' +
        '<div class="section-header section-header-left">' +
          '<h2 class="section-title">Explore All Converters</h2>' +
          '<p class="section-subtitle">Related tools for name formatting, script conversion, and Japanese reading support.</p>' +
        '</div>' +
        '<div class="tools-grid">' + cardsHtml + '</div>' +
      '</div>' +
    '</section>'
  );
}

function buildFaqHtml(tool) {
  const faqHtml = tool.faqs.map(function (faq, index) {
    return (
      '<details class="faq-item"' + (index === 0 ? ' open' : '') + '>' +
        '<summary class="faq-question">' + faq.question + '</summary>' +
        '<div class="faq-answer"><p>' + faq.answer + '</p></div>' +
      '</details>'
    );
  }).join('');

  return (
    '<section class="faq-section" id="about" aria-labelledby="faq-title">' +
      '<div class="container">' +
        '<div class="section-header section-header-left">' +
          '<h2 class="section-title" id="faq-title">Frequently Asked Questions</h2>' +
          '<p class="section-subtitle">Short answers for common questions about ' + tool.title + '.</p>' +
        '</div>' +
        '<div class="faq-list">' + faqHtml + '</div>' +
      '</div>' +
    '</section>'
  );
}

function ensureReplaced(html, pattern, replacement, description) {
  if (!pattern.test(html)) {
    throw new Error('Unable to update ' + description);
  }
  return html.replace(pattern, replacement);
}

tools.forEach(function (tool) {
  const relPath = tool.isFile ? '' : '../';
  const semanticBody = buildSemanticBody(tool, relPath);
  const exploreHtml = buildExploreHtml(relPath);
  const faqHtml = buildFaqHtml(tool);
  const fullUrl = tool.isFile
    ? 'https://www.katakanaconverter.com/' + tool.path
    : 'https://www.katakanaconverter.com/' + tool.path + '/';
  const faqSchema = JSON.stringify(buildFaqSchema(tool), null, 2);
  const metaDescription = buildMetaDescription(tool.title);
  const organizationSchema = buildOrganizationSchema();
  const siteNavigationSchema = buildSiteNavigationSchema();
  const breadcrumbSchema = buildBreadcrumbSchema(tool.title, fullUrl);

  let locHtml = rootHtml;

  locHtml = ensureReplaced(
    locHtml,
    /<title>.*?<\/title>/,
    '<title>' + buildMetaTitle(tool.title) + '</title>',
    'title'
  );
  locHtml = ensureReplaced(
    locHtml,
    /<meta name="description" content=".*?">/,
    '<meta name="description" content="' + metaDescription + '">',
    'meta description'
  );
  locHtml = ensureReplaced(
    locHtml,
    /<meta property="og:title" content=".*?">/,
    '<meta property="og:title" content="' + buildMetaTitle(tool.title) + '">',
    'og:title'
  );
  locHtml = ensureReplaced(
    locHtml,
    /<meta property="og:description" content=".*?">/,
    '<meta property="og:description" content="' + metaDescription + '">',
    'og:description'
  );
  locHtml = ensureReplaced(
    locHtml,
    /<meta name="twitter:title" content=".*?">/,
    '<meta name="twitter:title" content="' + buildMetaTitle(tool.title) + '">',
    'twitter:title'
  );
  locHtml = ensureReplaced(
    locHtml,
    /<meta name="twitter:description" content=".*?">/,
    '<meta name="twitter:description" content="' + metaDescription + '">',
    'twitter:description'
  );
  locHtml = ensureReplaced(
    locHtml,
    /<link rel="canonical" href=".*?">/,
    '<link rel="canonical" href="' + fullUrl + '">',
    'canonical link'
  );
  locHtml = ensureReplaced(
    locHtml,
    /<meta property="og:url" content=".*?">/,
    '<meta property="og:url" content="' + fullUrl + '">',
    'og:url'
  );
  locHtml = ensureReplaced(
    locHtml,
    /<h1 id="hero-title">.*?<\/h1>/s,
    '<h1 id="hero-title"><strong>' + tool.title + '</strong></h1>',
    'hero title'
  );
  locHtml = ensureReplaced(
    locHtml,
    /(<h1 id="hero-title">.*?<\/h1>\s*)<p>.*?<\/p>/s,
    '$1<p>' + buildHeroDescription(tool.title) + '</p>',
    'hero description'
  );
  locHtml = ensureReplaced(
    locHtml,
    /<label for="english-input">.*?<\/label>/,
    '<label for="english-input">' + tool.inputLabel + '</label>',
    'input label'
  );
  locHtml = ensureReplaced(
    locHtml,
    /placeholder=".*?"/,
    'placeholder="' + tool.placeholder + '"',
    'input placeholder'
  );
  locHtml = ensureReplaced(
    locHtml,
    /<button class="btn-primary" id="convert-btn" type="button">.*?<\/button>/,
    '<button class="btn-primary" id="convert-btn" type="button">' + tool.buttonLabel + '</button>',
    'convert button text'
  );
  locHtml = replaceJsonLdBlock(locHtml, 'JSON-LD: WebSite Schema', {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Katakana Converter',
    url: fullUrl,
    description: 'Free Katakana conversion tool for names, forms, and Japanese text formatting.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.katakanaconverter.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  });
  locHtml = replaceJsonLdBlock(locHtml, 'JSON-LD: Organization Schema', organizationSchema);
  locHtml = replaceJsonLdBlock(locHtml, 'JSON-LD: SiteNavigationElement Schema', siteNavigationSchema);
  locHtml = replaceJsonLdBlock(locHtml, 'JSON-LD: BreadcrumbList Schema', breadcrumbSchema);
  locHtml = replaceJsonLdBlock(locHtml, 'JSON-LD: WebApplication Schema', {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    url: fullUrl,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    description: metaDescription
  });
  locHtml = replaceJsonLdBlock(locHtml, 'JSON-LD: FAQPage Schema', buildFaqSchema(tool));

  const semanticStart = locHtml.indexOf('<section class="how-section" id="how-it-works"');
  const mainEnd = locHtml.lastIndexOf('</main>');
  if (semanticStart === -1 || mainEnd === -1) {
    throw new Error('Unable to locate replaceable content region for ' + tool.path);
  }
  locHtml = locHtml.substring(0, semanticStart) + exploreHtml + '\n\n    ' + semanticBody + '\n\n    ' + faqHtml + '\n\n  </main>' + locHtml.substring(mainEnd + 7);

  locHtml = locHtml.replace('<script src="js/engine.js"></script>', '');
  locHtml = locHtml.replace('<script src="../js/engine.js"></script>', '');
  locHtml = locHtml.replace('<script src="js/cmudict-data.js"></script>', '');
  locHtml = locHtml.replace('<script src="../js/cmudict-data.js"></script>', '');
  locHtml = locHtml.replace('<script src="https://unpkg.com/wanakana"></script>', '');
  locHtml = locHtml.replace('<script src="js/tool-converters.js"></script>', '');
  locHtml = locHtml.replace('<script src="../js/tool-converters.js"></script>', '');
  locHtml = locHtml.replace('<script src="js/benchmark.js"></script>', '');
  locHtml = locHtml.replace('<script src="../js/benchmark.js"></script>', '');
  locHtml = locHtml.replace('<script src="js/app.js"></script>', '');
  locHtml = locHtml.replace('<script src="../js/app.js"></script>', '');

  if (!tool.isFile) {
    locHtml = locHtml.replace(/href="css\//g, 'href="../css/');
    locHtml = locHtml.replace(/src="js\//g, 'src="../js/');
    locHtml = locHtml.replace(/SiteLayout\.init\('\/'\);/g, 'SiteLayout.init(\'/' + tool.path + '/\');');
  } else {
    locHtml = locHtml.replace(/SiteLayout\.init\('\/'\);/g, 'SiteLayout.init(\'/' + tool.path + '\');');
  }

  const helperScript = tool.isFile ? '<script src="js/tool-converters.js"></script>' : '<script src="../js/tool-converters.js"></script>';
  const emptyOutput = tool.emptyOutput || 'カタカナ';
  const customScript = helperScript + tool.deps + '<script>document.addEventListener("DOMContentLoaded", function() { var btn = document.getElementById("convert-btn"); var clearBtn = document.getElementById("clear-btn"); var input = document.getElementById("english-input"); var outEl = document.getElementById("katakana-output"); var phEl = document.getElementById("phoneme-output"); var sourceTag = document.getElementById("source-tag"); var charCount = document.getElementById("char-count"); var copyBtn = document.getElementById("copy-btn"); function process() { var val = input.value.trim(); if(!val) { outEl.textContent = "' + emptyOutput + '"; outEl.classList.add("placeholder-text"); phEl.textContent = "Your phoneme breakdown will appear here after conversion."; if(sourceTag) sourceTag.textContent = "Ready to convert"; return; } outEl.classList.remove("placeholder-text"); ' + tool.logic + ' } btn.addEventListener("click", process); input.addEventListener("input", function() { charCount.textContent = input.value.length; }); input.addEventListener("keypress", function(e) { if(e.key === "Enter") process(); }); clearBtn.addEventListener("click", function() { input.value = ""; outEl.textContent = "' + emptyOutput + '"; outEl.classList.add("placeholder-text"); phEl.textContent = "Your phoneme breakdown will appear here after conversion."; if(sourceTag) sourceTag.textContent = "Ready to convert"; charCount.textContent = "0"; }); if (copyBtn) { copyBtn.addEventListener("click", function() { var textToCopy = outEl.textContent; if (textToCopy === "' + emptyOutput + '" || textToCopy === "Please wait, loading Kanji dictionary (20MB)..." || textToCopy === "Converting..." || textToCopy === "Error parsing Kanji") return; navigator.clipboard.writeText(textToCopy).then(function() { var originalHTML = copyBtn.innerHTML; copyBtn.innerHTML = \'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>\'; copyBtn.classList.add("copied"); setTimeout(function() { copyBtn.innerHTML = originalHTML; copyBtn.classList.remove("copied"); }, 2000); }); }); } });</script></body>';
  locHtml = locHtml.replace(/<\/body>/, customScript);

  if (tool.isFile) {
    fs.writeFileSync(path.join(projectDir, tool.path), locHtml);
  } else {
    const dirPath = path.join(projectDir, tool.path);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    fs.writeFileSync(path.join(dirPath, 'index.html'), locHtml);
  }

  console.log('Generated tool: ' + tool.path);
});

console.log('All ' + tools.length + ' tools generated successfully.');
