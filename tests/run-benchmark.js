const fs = require('fs');
const path = require('path');

// Create a global object to simulate the browser window
const mockGlobal = {
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
};

// Load dependencies
const cmudictData = JSON.parse(fs.readFileSync('js/cmudict-data.json', 'utf8'));
mockGlobal.CMUDict = cmudictData;

// Function to load a script into our mock global context
function loadScript(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  // Use a function constructor to set the global/this context
  const fn = new Function('global', code);
  fn.call(mockGlobal, mockGlobal);
}

// Load engine and benchmark
loadScript('js/engine.js');
loadScript('js/benchmark.js');

// Run the evaluation
const KatakanaBenchmark = mockGlobal.KatakanaBenchmark;
const result = KatakanaBenchmark.evaluate();

// Print result using the built-in printer
KatakanaBenchmark.printReport(result);

// Check if we hit 100%
const rate = parseFloat(result.summary.exactMatchRate);
if (rate < 100) {
    console.log('\n❌ ACCURACY IS ' + rate + '%. FIXES REQUIRED.');
    process.exit(1);
} else {
    console.log('\n✅ 100% ACCURACY ACHIEVED ON CURRENT TEST SET.');
    process.exit(0);
}
