# Tool Cleanup and UI Refactoring

The goal is to cleanly eliminate the pronunciation tool from our ecosystem, strip out the developer benchmark widget, and overhaul the entire page structure/CSS for all generated tools to map perfectly to the requested reference pictures (plain-text silo content, customized accordion FAQs, flat dark glowing UX cards).

## User Review Required

Does the sequence of formatting updates below precisely match your expectations for the card visual rollback and plain text headers? We will remove all glass UI backgrounds for the internal content section and adopt the clean typography from Picture 1.

## Proposed Changes

### Global Adjustments
- Find and delete all traces of `katakana-pronunciation-converter` in `sitemap/index.html` and `js/layout.js`.
- Remove the benchmark widget entirely from `index.html`. 

### `css/style.css` 
- Add strict styling rules for the FAQ accordion dropdown (Picture 2 matching: dark blocks with a `+` right expand icon).
- Revert `.tool-card` to match Picture 3 exactly: flat `#1A172D`-like background colors (using existing site variants) replacing the radial sweep background. Add a distinct CSS hover state matching the golden-border glow selection from the reference. Align title and text to the left.

### `scripts/build-tools.js`
- Generate new JSON arrays inside `build-tools.js` storing 3-5 specific FAQ inputs for each remaining tool.
- Rework `semanticBody` template strings to inject standard `<h2>` layout arrays matching the exact string values:
  * *What is {Tool Name}?*
  * *When to Use This {Tool Name}?*
  * Included internal silo hyperlink injection.
- Redefine how the FAQ loops into an accordion inside the template generator.

## Open Questions
Do you have specific copy you would like to use for the FAQs, or should I generate logical SEO-driven generic questions for each tool block automatically?

## Verification Plan
1. Re-run `node scripts/build-tools.js`. 
2. Open a tool pathway and visually confirm that the Benchmark is gone, the card grid resembles Picture 3, the FAQs resemble Picture 2, and the content format resembles Picture 1.

## Detailed Execution Plan

### Phase 1: Remove Deprecated Tool References
- Delete `katakana-pronunciation-converter` from the `tools` array in `scripts/build-tools.js` so it no longer generates output pages or appears in explore blocks.
- Remove the pronunciation tool from `NAV_LINKS` and `TOOL_LINKS` in `js/layout.js`.
- Remove any remaining pronunciation-tool link from `index.html` and `sitemap/index.html`.
- Run a repository-wide search for `katakana-pronunciation-converter` after edits to confirm there are no stale references left behind.

### Phase 2: Remove Benchmark UI and Messaging
- Remove the entire benchmark `<section>` from `index.html`, including button, summary, table, and anchor target.
- Remove `js/benchmark.js` from the homepage script stack and make sure generated tool pages continue stripping that script include.
- Update homepage metadata and schema copy that currently references benchmarking so the copy matches the new product position.
- Remove the benchmark anchor from `sitemap/index.html` because the section will no longer exist.

### Phase 3: Rebuild Generator Output Structure
- Replace the current card-like semantic content blocks in `semanticBody` with a flatter text-first content layout.
- Standardize each generated tool page to use the same section order:
  1. Converter block
  2. Plain-text informational content
  3. FAQ accordion
  4. Explore-more tools grid
- Replace the current hardcoded `h2Title` and related `h3/h4/h5/h6` fields with structured long-form content fields that better match the desired picture-based layout.
- Keep the generator flexible enough for special-case tools like `kanji-to-katakana` and `kanji-to-hiragana`, which may need slightly different explanatory copy.

### Phase 4: Introduce Tool-Level FAQ Data
- Add a `faqs` array to each tool object in `scripts/build-tools.js`.
- Store each FAQ as a `{ question, answer }` object so the accordion markup and FAQ schema can be generated from the same source.
- Default to 3-5 FAQs per tool, keeping the first two questions aligned with the new heading system:
  * `What is {Tool Name}?`
  * `When to Use This {Tool Name}?`
- Use the remaining FAQ slots for practical intent-driven questions such as formatting rules, use cases, or accuracy expectations.

### Phase 5: Update Content and Internal Linking Rules
- Replace the current silo body copy with cleaner paragraphs and section headers that read like editorial content instead of stacked feature cards.
- Add one relevant internal link inside each generated informational section, pointing to a closely related converter.
- Keep anchor text specific rather than generic `click here` phrasing.
- Use consistent heading casing and avoid decorative subheading noise so the generated pages stay visually close to the plain-text reference.

## File-by-File Implementation Notes

### `scripts/build-tools.js`
- This will be the primary source-of-truth change.
- Refactor the tool definitions so descriptive content and FAQ content are data-driven instead of spread across many one-off title/paragraph properties.
- Update the `semanticBody` template to output:
  * plain content wrappers instead of glass cards
  * accordion FAQ markup
  * an explore-tools block that omits the deleted pronunciation tool
- Preserve relative-path handling for both root pages and nested tool pages.

### `css/style.css`
- Add a dedicated accordion pattern for `.faq-list`, `.faq-item`, `.faq-question`, and `.faq-answer` instead of relying on incidental inherited styles.
- Restyle `.tool-card` to a flatter, darker block with left-aligned text and a more defined border-glow hover.
- Add plain-content section styles for the new text-driven layout so generated informational copy no longer looks like dashboard widgets.
- Audit mobile spacing because the current system is tuned around glass cards and may feel too padded once flattened.

### `index.html`
- Remove the benchmark block and benchmark script include.
- Replace the homepage FAQ/about cards with the same flatter content language used by generated tool pages if visual consistency is required.
- Remove the pronunciation tool card from the explore grid.
- Update SEO copy that still says `built-in benchmarking`.

### `js/layout.js`
- Remove the pronunciation entry from both header and footer tool collections.
- Update the global site description string to remove benchmark language.
- Keep dropdown ordering aligned with the remaining generated tools so the nav matches the actual site inventory.

### `sitemap/index.html`
- Remove the benchmark anchor from the core features list.
- Confirm the converter tools list matches the new live set exactly.
- If the pronunciation page is currently deployed, remove it from the HTML sitemap only after the generator and nav changes are complete so the site stays internally consistent.

## Content Rules

- FAQ copy should be tool-specific, not generic boilerplate repeated across all pages.
- Answers should stay concise enough for accordion UX, ideally 2-4 sentences each.
- Informational sections should read naturally as SEO landing-page copy without keyword stuffing.
- Internal links should connect genuinely adjacent intents, for example:
  * `Romaji to Katakana` links to `Hiragana to Katakana`
  * `Full-Width Katakana Name Converter` links to `Full-Width Katakana Converter`
  * `Kanji to Katakana` links to `Kanji to Hiragana`

## Risk Checks

- `scripts/build-tools.js` currently mixes generator logic and content data, so refactoring the data shape may break template interpolation if done partially.
- Some pages use file output (`katakana-to-hiragana.html`) while others use folder output, so relative asset paths must be re-verified after template changes.
- The site already contains in-progress edits in `css/style.css`, `index.html`, `js/layout.js`, and `sitemap/index.html`; changes should be merged carefully rather than overwritten wholesale.

## Acceptance Criteria

- No visible references to the pronunciation tool remain in navigation, sitemap, homepage cards, or generated related-tool blocks.
- The homepage no longer contains the benchmark section or benchmark-oriented copy.
- Generated tool pages show plain text content sections followed by a dark accordion FAQ block.
- Tool cards use the flatter dark appearance with a stronger hover-outline glow and left-aligned text.
- `node scripts/build-tools.js` completes successfully and regenerated pages render with correct relative links.
