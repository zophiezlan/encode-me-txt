# API Documentation

## Encoder Functions API

All encoder functions follow consistent patterns for ease of use and testing.

## Table of Contents

- [Function Signatures](#function-signatures)
- [Encoder Categories](#encoder-categories)
- [Configuration API](#configuration-api)
- [Encoder Deduplication API](#encoder-deduplication-api)
- [Advanced Search API](#advanced-search-api)
- [Batch Encoder API](#batch-encoder-api) **NEW!**
- [Encoder Analytics API](#encoder-analytics-api) **NEW!**
- [Audio Player API](#audio-player-api)
- [Usage Examples](#usage-examples)

## Function Signatures

### Encoding Functions

```typescript
/**
 * Generic encoder function signature
 * @param text - The text to encode
 * @param options - Optional encoder-specific parameters
 * @returns Encoded string representation
 */
function encode(text: string, options?: EncoderOptions): string
```

### Decoding Functions

```typescript
/**
 * Generic decoder function signature
 * @param text - The encoded text to decode
 * @param options - Optional decoder-specific parameters
 * @returns Decoded string or error message
 */
function decode(text: string, options?: DecoderOptions): string
```

## Encoder Categories

### 🔐 Steganography

#### Zero-Width Steganography

Hides messages using invisible Unicode characters.

```javascript
import { encodeZeroWidth, decodeZeroWidth } from './utils/encoders/steganography.js';

// Encode
const hidden = encodeZeroWidth('Secret');
console.log(hidden); // Returns invisible characters
console.log(hidden.length); // 97 (16 bits per character + terminator)

// Decode
const revealed = decodeZeroWidth(hidden);
console.log(revealed); // 'Secret'
```

**Character Set:**
- `\u200B` - Zero-width space (represents 0)
- `\u200C` - Zero-width non-joiner (represents 1)
- `\u200D` - Zero-width joiner (terminator)

### 📻 Classic Encoders

#### Morse Code

```javascript
import { encodeMorse, decodeMorse } from './utils/encoders/classic.js';

encodeMorse('SOS');
// Returns: '••• −−− •••'

decodeMorse('••• −−− •••');
// Returns: 'sos'
```

**Character Set:**
- `•` - Dot (dit)
- `−` - Dash (dah)
- ` ` - Letter separator
- `/` - Word separator

#### Braille

```javascript
import { encodeBraille, decodeBraille } from './utils/encoders/classic.js';

encodeBraille('Hi');
// Returns: '⠓⠊'

decodeBraille('⠓⠊');
// Returns: 'hi'
```

#### NATO Phonetic

```javascript
import { encodeNATO } from './utils/encoders/classic.js';

encodeNATO('ABC');
// Returns: 'Alpha-Bravo-Charlie'
```

### 💾 Computer Science Encoders

#### Binary

```javascript
import { encodeBinary, decodeBinary } from './utils/encoders/computer.js';

encodeBinary('Hi');
// Returns: '01001000 01101001'

decodeBinary('01001000 01101001');
// Returns: 'Hi'
```

**Format:** 8-bit bytes, space-separated

#### Hexadecimal

```javascript
import { encodeHex, decodeHex } from './utils/encoders/computer.js';

encodeHex('Hi');
// Returns: '48 69'

decodeHex('48 69');
// Returns: 'Hi'
```

**Format:** 2-character hex values, space-separated

#### Base64

```javascript
import { encodeBase64, decodeBase64 } from './utils/encoders/computer.js';

encodeBase64('Hello World!');
// Returns: 'SGVsbG8gV29ybGQh'

decodeBase64('SGVsbG8gV29ybGQh');
// Returns: 'Hello World!'
```

**Standard:** RFC 4648 Base64 encoding

### 🔑 Ciphers

#### Caesar Cipher

```javascript
import { encodeCaesar, decodeCaesar } from './utils/encoders/ciphers.js';

// Encode with shift of 3
encodeCaesar('ABC', 3);
// Returns: 'DEF'

// Decode with same shift
decodeCaesar('DEF', 3);
// Returns: 'ABC'
```

**Parameters:**
- `text: string` - Text to encode/decode
- `shift: number` - Shift amount (1-25), default 13

#### ROT13

```javascript
import { encodeROT13, decodeROT13 } from './utils/encoders/ciphers.js';

encodeROT13('Hello');
// Returns: 'Uryyb'

decodeROT13('Uryyb');
// Returns: 'Hello'
```

**Note:** ROT13 is its own inverse (encode and decode are the same)

#### Reverse Text

```javascript
import { encodeReverse, decodeReverse } from './utils/encoders/ciphers.js';

encodeReverse('Hello');
// Returns: 'olleH'

decodeReverse('olleH');
// Returns: 'Hello'
```

### 🎉 Fun Encoders

#### Emoji Encoding

```javascript
import { encodeEmoji, decodeEmoji } from './utils/encoders/fun.js';

encodeEmoji('Hi');
// Returns: '😇😁😇🥲' (emoji pairs representing character codes)

decodeEmoji('😇😁😇🥲');
// Returns: 'Hi'
```

**Algorithm:** Each character represented by two emojis from a 30-emoji palette

#### Bubble Text

```javascript
import { encodeBubble } from './utils/encoders/fun.js';

encodeBubble('Hello');
// Returns: 'ⓗⓔⓛⓛⓞ'
```

**Not reversible** - aesthetic transformation only

#### Upside Down

```javascript
import { encodeUpsideDown } from './utils/encoders/fun.js';

encodeUpsideDown('Hello');
// Returns: 'oʃʃǝH' (reversed and flipped)
```

**Not reversible** - limited character mapping

#### Leetspeak

```javascript
import { encodeLeetspeak } from './utils/encoders/fun.js';

encodeLeetspeak('Hello');
// Returns: 'H3110'
```

**Mapping:**
- a/A → 4
- e/E → 3
- i/I → 1
- o/O → 0
- s/S → 5
- t/T → 7
- l/L → 1

#### Pig Latin

```javascript
import { encodePigLatin } from './utils/encoders/fun.js';

encodePigLatin('Hello World');
// Returns: 'elloHay orldWay'
```

**Rules:**
- Vowel-starting words: add "way"
- Consonant-starting words: move consonants to end + "ay"

### 🎨 Artistic Encoders

#### Block Art

```javascript
import { encodeBoxDrawing } from './utils/encoders/artistic.js';

encodeBoxDrawing('Hi');
// Returns: '■▫' (geometric patterns)
```

#### Musical Notes

```javascript
import { encodeMusical } from './utils/encoders/artistic.js';

encodeMusical('Hi');
// Returns: '♪♬' (musical notation)
```

#### Zalgo Chaos

```javascript
import { encodeZalgo } from './utils/encoders/artistic.js';

encodeZalgo('Hi');
// Returns: 'H̷̛i̶͝' (combining diacritical marks)
```

**Note:** Output includes random combining marks, non-deterministic

#### Color Blocks

```javascript
import { encodeColorBlocks } from './utils/encoders/artistic.js';

encodeColorBlocks('Hi');
// Returns: '🟩🟦' (colored square emojis)
```

#### Ancient Runes

```javascript
import { encodeRunes } from './utils/encoders/artistic.js';

encodeRunes('Hi');
// Returns: 'ᚺᛁ' (Elder Futhark runes)
```

### 🚀 Advanced Encoders

#### Shuffle Encoding

Encodes each character using a randomly selected encoder from your chosen options.

```javascript
import { encodeShuffle, decodeShuffle } from './utils/encoders/shuffle.js';

// Encode with default encoders (binary, morse, caesar, emoji, braille)
const result = encodeShuffle('Hi');
console.log(result);
// Returns:
// 🔀 SHUFFLE ENCODED 🔀
// 01001000|•••• •|...
//
// 📊 Encoding Map:
// [0] 'H' → '01001000' (Binary)
// [1] 'i' → '•••• •' (Morse Code)

// Encode with specific encoders
const customResult = encodeShuffle('Hello', ['binary', 'hex', 'base64']);
// Each character randomly encoded with binary, hex, or base64

// Decode
const decoded = decodeShuffle(result);
console.log(decoded); // 'Hi'
```

**Parameters:**
- `text` (string) - Text to encode
- `selectedEncoderIds` (array) - Array of encoder IDs to use (default: ['binary', 'morse', 'caesar', 'emoji', 'braille'])

**Returns:**
- Formatted string with:
  - Encoded text (characters separated by `|`)
  - Encoding map showing which encoder was used for each character
  - Character position tracking

**Features:**
- Fully reversible with encoding map
- Random selection per character
- Supports any combination of encoders
- Detailed visualization of encoding choices
- Minimum 1 encoder required

#### QR Code Generator

```javascript
import { encodeQRCode } from './utils/encoders/advanced.js';

encodeQRCode('Hello World');
// Returns: URL to QR code image
```

**External Service:** Uses `api.qrserver.com`

#### URL Encoding

```javascript
import { encodeURL, decodeURL } from './utils/encoders/advanced.js';

encodeURL('Hello World!');
// Returns: 'Hello%20World%21'

decodeURL('Hello%20World%21');
// Returns: 'Hello World!'
```

#### HTML Entities

```javascript
import { encodeHTMLEntities, decodeHTMLEntities } from './utils/encoders/advanced.js';

encodeHTMLEntities('Hello <World>');
// Returns: 'Hello &#60;World&#62;'

decodeHTMLEntities('Hello &#60;World&#62;');
// Returns: 'Hello <World>'
```

#### Sound Wave

```javascript
import { encodeSoundWave } from './utils/encoders/advanced.js';

encodeSoundWave('Hi');
// Returns: '▅▂' (wave height visualization)
```

#### Hash Generator

```javascript
import { encodeHash } from './utils/encoders/advanced.js';

encodeHash('Hello World');
// Returns: '4a5e1e4b' (8-character hex hash)
```

**Note:** Not cryptographically secure - for fingerprinting only

## Configuration API

### Encoder Config

```javascript
import {
  encoderConfig,
  getEncodersByCategory,
  getEncoderById,
  getReversibleEncoders,
  categories
} from './utils/encoderConfig.js';

// Get all encoders
console.log(encoderConfig);

// Filter by category
const funEncoders = getEncodersByCategory('fun');

// Get specific encoder
const morse = getEncoderById('morse');
console.log(morse.name); // 'Morse Code'

// Get only reversible encoders
const reversible = getReversibleEncoders();
console.log(reversible.length); // 18

// Get category metadata
console.log(categories.fun);
// { emoji: '🎉', name: 'Fun', description: '...' }
```

### Encoder Object Structure

```typescript
interface Encoder {
  id: string;              // Unique identifier
  name: string;            // Display name
  description: string;     // Short description
  emoji: string;           // Representative emoji
  category: string;        // Category key
  encode: Function;        // Encoding function
  decode?: Function;       // Decoding function (if reversible)
  reversible: boolean;     // Whether it can be decoded
  special?: boolean;       // Special handling needed
  hasSound?: boolean;      // Audio playback available
  hasSettings?: boolean;   // Has configurable settings
  tags: string[];          // Searchable tags
}
```

### Encoder Deduplication API

The encoder deduplication utility helps manage duplicate/related encoders, prioritizing "Pro" versions and identifying aliases.

```javascript
import {
  // Main functions
  getDeduplicatedEncoders,
  getEncodersWithRedundancyMarkers,
  getDeduplicationSummary,
  
  // Utility functions
  getPreferredEncoder,
  isSuperseded,
  isAlias,
  isRedundant,
  getEncoderRelationship,
  
  // Get lists of redundant encoders
  getRedundantEncoderIds,
  getSupersededEncoderIds,
  getAliasEncoderIds,
  
  // Advanced
  deduplicateEncoders,
  groupByPreferredEncoder,
  encoderRelationships
} from './utils/encoderConfig.js';
```

#### Get Deduplicated Encoders

```javascript
// Get encoder list with redundant encoders removed
// Prioritizes Pro versions and canonical implementations
const deduplicated = getDeduplicatedEncoders();
console.log(deduplicated.length); // Fewer than encoderConfig.length

// Custom options
const customDedup = getDeduplicatedEncoders({
  removeSuperseded: true,  // Remove encoders superseded by Pro versions (default: true)
  removeAliases: true      // Remove alias encoders (default: true)
});
```

#### Get Deduplication Summary

```javascript
const summary = getDeduplicationSummary(encoderConfig);
console.log(summary);
// {
//   total: 350,           // Total encoders
//   unique: 334,          // Non-redundant encoders
//   superseded: 10,       // Encoders superseded by Pro versions
//   aliases: 6,           // Alias encoders
//   deduplicatedCount: 334,
//   supersededEncoders: [...],  // Details about superseded encoders
//   aliasEncoders: [...]        // Details about alias encoders
// }
```

#### Check Encoder Relationships

```javascript
// Check if encoder has a better alternative
isSuperseded('leetspeak');     // true - has leetspeak-pro
isAlias('vaporwave');          // true - alias of fullwidth
isRedundant('binary');         // true - has binary-pro

// Get preferred encoder ID
getPreferredEncoder('leetspeak');   // 'leetspeak-pro'
getPreferredEncoder('vaporwave');   // 'fullwidth'
getPreferredEncoder('base64');      // 'base64' (unchanged)

// Get relationship details
const rel = getEncoderRelationship('leetspeak');
// { supersededBy: 'leetspeak-pro', reason: 'Pro version offers intensity control settings' }
```

#### Mark Redundant Encoders

```javascript
// Get all encoders with redundancy markers
const marked = getEncodersWithRedundancyMarkers();
marked.forEach(encoder => {
  if (encoder.isRedundant) {
    console.log(`${encoder.id} is redundant:`);
    console.log(`  Type: ${encoder.redundantType}`);  // 'superseded' or 'alias'
    console.log(`  Preferred: ${encoder.preferredEncoder}`);
    console.log(`  Reason: ${encoder.redundantReason}`);
  }
});
```

#### Encoder Relationships

The following encoders have better alternatives:

**Superseded by Pro versions:**
| Original | Pro Version | Reason |
|----------|-------------|--------|
| `leetspeak` | `leetspeak-pro` | Intensity control settings |
| `uwu` | `uwu-pro` | Customizable intensity |
| `spongebob` | `spongebob-pro` | Randomness control |
| `emojipasta` | `emojipasta-pro` | Density control |
| `binary` | `binary-pro` | Customizable bit grouping |
| `morse` | `morse-pro` | Customizable delimiter styles |
| `tap-code` | `tap-code-pro` | Symbol options |
| `polybius` | `polybius-pro` | 5x5 or 6x6 grid option |
| `nato` | `nato-extended` | NATO/Police/Western Union phonetics |
| `navy-flags` | `maritime-flags-pro` | International maritime flags |

**Aliases (functionally equivalent):**
| Alias | Canonical | Reason |
|-------|-----------|--------|
| `vaporwave` | `fullwidth` | Both produce full-width aesthetic characters |
| `medieval` | `math-fraktur` | Both produce Gothic/Fraktur text |
| `zodiac-signs` | `zodiac` | Both encode using zodiac symbols |
| `chess-pieces` | `chess` | Both encode using chess piece symbols |
| `weather-symbols` | `weather` | Both encode using weather symbols |
| `music-notes` | `musical` | Both encode using musical notation |

## Advanced Search API

The advanced search API provides comprehensive filtering and searching capabilities for encoders.

```javascript
import {
  // Main search function
  searchEncoders,
  
  // Utility functions
  getAllTags,
  getAllCategories,
  getEncoderStats,
  findSimilarEncoders,
  groupEncodersBy,
  
  // Filter presets
  getFilterPreset,
  filterPresets,
  defaultSearchOptions
} from './utils/encoderConfig.js';
```

### Search Encoders

Search and filter encoders with advanced options:

```javascript
// Basic text search
const results = searchEncoders(encoderConfig, {
  query: 'morse code'
});
// Searches name, description, id, category, and tags

// Filter by category
const cipherEncoders = searchEncoders(encoderConfig, {
  categories: ['cipher', 'secret']
});

// Filter by tags (AND logic - must have all)
const reversibleCiphers = searchEncoders(encoderConfig, {
  tags: ['cipher', 'reversible']
});

// Filter by any tag (OR logic - must have at least one)
const funOrCreative = searchEncoders(encoderConfig, {
  anyTags: ['fun', 'creative', 'emoji']
});

// Exclude by tags
const withoutAncient = searchEncoders(encoderConfig, {
  excludeTags: ['ancient', 'historical']
});

// Filter by reversibility
const reversibleOnly = searchEncoders(encoderConfig, {
  reversible: true
});

// Filter by settings
const withSettings = searchEncoders(encoderConfig, {
  hasSettings: true
});

// Filter special encoders
const specialEncoders = searchEncoders(encoderConfig, {
  special: true
});

// Sort results
const sortedByName = searchEncoders(encoderConfig, {
  sortBy: 'name',
  sortOrder: 'asc'
});

// Combine multiple filters
const advanced = searchEncoders(encoderConfig, {
  query: 'cipher',
  categories: ['cipher'],
  tags: ['cryptography'],
  reversible: true,
  hasSettings: true,
  sortBy: 'name',
  sortOrder: 'asc'
});
```

#### Search Options

```typescript
interface SearchOptions {
  query?: string;           // Text search query
  categories?: string[];    // Filter by categories
  tags?: string[];          // Must have ALL these tags
  anyTags?: string[];       // Must have AT LEAST ONE of these tags
  excludeTags?: string[];   // Exclude encoders with these tags
  reversible?: boolean;     // Filter by reversibility (null = any)
  hasSettings?: boolean;    // Filter by settings availability
  special?: boolean;        // Filter special encoders
  sortBy?: string;          // 'default', 'name', 'category', 'id'
  sortOrder?: string;       // 'asc' or 'desc'
}
```

### Get All Tags

```javascript
const tags = getAllTags(encoderConfig);
// Returns: ['ancient', 'cipher', 'computer', 'creative', 'emoji', ...]
// Sorted alphabetically
```

### Get All Categories

```javascript
const categories = getAllCategories(encoderConfig);
// Returns: ['advanced', 'aesthetic', 'ancient', 'artistic', 'cipher', ...]
```

### Get Encoder Statistics

```javascript
const stats = getEncoderStats(encoderConfig);
console.log(stats);
// {
//   total: 425,
//   reversible: 150,
//   nonReversible: 275,
//   withSettings: 45,
//   special: 5,
//   byCategory: {
//     cipher: 20,
//     fun: 35,
//     ...
//   },
//   tagCounts: {
//     cipher: 20,
//     emoji: 15,
//     ...
//   }
// }
```

### Find Similar Encoders

Find encoders similar to a given encoder based on tags and category:

```javascript
const morse = getEncoderById('morse-pro');
const similar = findSimilarEncoders(morse, encoderConfig, 5);
// Returns up to 5 encoders with shared tags/category
// Excludes the reference encoder
```

### Group Encoders

```javascript
// Group by category
const byCategory = groupEncodersBy(encoderConfig, 'category');
// { cipher: [...], fun: [...], ... }

// Group by reversibility
const byReversible = groupEncodersBy(encoderConfig, 'reversible');
// { 'true': [...], 'false': [...] }
```

### Filter Presets

Quick filter presets for common use cases:

```javascript
// Available presets
console.log(filterPresets);
// [
//   { id: 'all', name: 'All Encoders', emoji: '📋' },
//   { id: 'reversible', name: 'Reversible Only', emoji: '🔄' },
//   { id: 'non-reversible', name: 'One-Way Only', emoji: '➡️' },
//   { id: 'with-settings', name: 'With Settings', emoji: '⚙️' },
//   { id: 'special', name: 'Special', emoji: '✨' },
//   { id: 'ciphers', name: 'Ciphers', emoji: '🔐' },
//   { id: 'fun', name: 'Fun & Creative', emoji: '🎉' },
//   { id: 'classic', name: 'Classic Codes', emoji: '📻' },
//   { id: 'computer', name: 'Computer Science', emoji: '💻' },
//   { id: 'artistic', name: 'Artistic', emoji: '🎨' },
//   { id: 'linguistic', name: 'Languages', emoji: '🌍' },
// ]

// Get preset options
const preset = getFilterPreset('reversible');
// { ...defaultSearchOptions, reversible: true }

// Apply preset
const reversibleEncoders = searchEncoders(encoderConfig, preset);
```

## Batch Encoder API

The batch encoder utility provides powerful multi-text and multi-encoder processing capabilities.

### Batch Encode

Process multiple texts with a single encoder:

```javascript
import { batchEncode } from './utils/batchEncoder.js';

const texts = ['Hello', 'World', 'Test'];
const results = batchEncode(texts, 'hex');

results.forEach(r => {
  console.log(`${r.input} -> ${r.output}`);
  console.log(`Processing time: ${r.processingTime}ms`);
});
```

### Multi-Encode

Encode a single text with multiple encoders:

```javascript
import { multiEncode } from './utils/batchEncoder.js';

const results = multiEncode('Hello', ['hex', 'base64', 'rot13']);

results.forEach(r => {
  console.log(`${r.encoderName}: ${r.output}`);
});
```

### Chain Encode

Apply multiple encoders in sequence:

```javascript
import { chainEncode, chainDecode } from './utils/batchEncoder.js';

const encoded = chainEncode('Secret Message', ['base64', 'hex']);
console.log(encoded.finalOutput);
console.log(encoded.steps); // Shows each intermediate step

// Decode in reverse order
const decoded = chainDecode(encoded.finalOutput, ['base64', 'hex']);
console.log(decoded.finalOutput); // 'Secret Message'
```

### Generate Comparison Matrix

Create a matrix comparing multiple texts with multiple encoders:

```javascript
import { generateComparisonMatrix } from './utils/batchEncoder.js';

const matrix = generateComparisonMatrix(
  ['Hello', 'World'],
  ['hex', 'base64', 'rot13']
);

console.log(matrix.results[0].encodings.hex.output);
```

### Export Results

Export batch results to various formats:

```javascript
import { exportBatchResults } from './utils/batchEncoder.js';

const results = batchEncode(['Test'], 'hex');

// Export as JSON
const json = exportBatchResults(results, 'json');

// Export as CSV
const csv = exportBatchResults(results, 'csv');

// Export as plain text
const text = exportBatchResults(results, 'text');
```

### Validate Encoder Chain

Check if an encoder chain is valid:

```javascript
import { validateEncoderChain } from './utils/batchEncoder.js';

const validation = validateEncoderChain(['base64', 'hex', 'rot13']);
console.log(validation.valid); // true
console.log(validation.reversible); // true if all encoders support decode
```

## Encoder Analytics API

The encoder analytics utility provides statistics, insights, and recommendations about encoders.

### Difficulty Levels

Encoders are rated by difficulty from 1 (Beginner) to 5 (Expert):

```javascript
import { 
  difficultyLevels, 
  getEncoderDifficulty, 
  getDifficultyLabel 
} from './utils/encoderAnalytics.js';

const difficulty = getEncoderDifficulty('caesar');
console.log(getDifficultyLabel(difficulty)); // 'Easy'
```

### Encoder Statistics

Get comprehensive statistics about all encoders:

```javascript
import { getEncoderStatistics } from './utils/encoderAnalytics.js';

const stats = getEncoderStatistics();
console.log(`Total encoders: ${stats.total}`);
console.log(`Reversible: ${stats.reversible} (${stats.reversiblePercent}%)`);
console.log('By category:', stats.byCategory);
console.log('By difficulty:', stats.byDifficulty);
```

### Category Analysis

Analyze encoders by category:

```javascript
import { getCategoryAnalysis } from './utils/encoderAnalytics.js';

const analysis = getCategoryAnalysis();
analysis.forEach(cat => {
  console.log(`${cat.name}: ${cat.totalEncoders} encoders`);
  console.log(`  Reversible: ${cat.reversiblePercent}%`);
  console.log(`  Avg. Difficulty: ${cat.difficultyLabel}`);
});
```

### Encoder Recommendations

Get encoder recommendations based on criteria:

```javascript
import { getEncoderRecommendations } from './utils/encoderAnalytics.js';

const recommendations = getEncoderRecommendations({
  difficulty: 'easy',
  mustBeReversible: true,
  category: 'cipher',
  limit: 5
});

recommendations.forEach(e => {
  console.log(`${e.name} - ${e.difficultyLabel}`);
});
```

### Encoding Analysis

Analyze an encoding result:

```javascript
import { analyzeEncoding } from './utils/encoderAnalytics.js';

const analysis = analyzeEncoding('Hello', '48 65 6c 6c 6f', 'hex');
console.log(`Expansion ratio: ${analysis.expansionRatio}`);
console.log(`Readability score: ${analysis.readabilityScore}/100`);
```

### Encoding Complexity

Get a complexity score for an encoding:

```javascript
import { getEncodingComplexity } from './utils/encoderAnalytics.js';

const complexity = getEncodingComplexity('Hello', 'encoded', 'caesar');
console.log(`Score: ${complexity.totalScore}/100`);
console.log(`Level: ${complexity.level}`);
console.log(complexity.recommendation);
```

### Popular Combinations

Get recommended encoder combinations by purpose:

```javascript
import { getPopularCombinations } from './utils/encoderAnalytics.js';

const combos = getPopularCombinations('educational');
combos.forEach(c => {
  console.log(`${c.name}: ${c.encoders.join(' -> ')}`);
});
```

### Encoder Tips

Get usage tips for a specific encoder:

```javascript
import { getEncoderTips } from './utils/encoderAnalytics.js';

const tips = getEncoderTips('caesar');
console.log('Best for:', tips.bestFor);
console.log('Limitations:', tips.limitations);
console.log('Suggested combinations:', tips.combinations);
```

## Audio Player API

### Play Morse Code

```javascript
import { playMorseSound } from './utils/audioPlayer.js';
import { encodeMorse } from './utils/encoders/classic.js';

const morse = encodeMorse('SOS');
await playMorseSound(morse);
```

**Parameters:**
- `morseCode: string` - Morse code string with `•` and `−`

**Returns:** `Promise<void>`

**Audio Specifications:**
- Frequency: 600 Hz
- Dot duration: 80ms
- Dash duration: 240ms (3× dot)
- Gap duration: 80ms
- Word separator: 560ms (7× dot)

## Usage Examples

### Basic Encoding/Decoding

```javascript
import { encodeBinary, decodeBinary } from './utils/encoders/computer.js';

const text = 'Hello';
const encoded = encodeBinary(text);
const decoded = decodeBinary(encoded);

console.log(encoded);  // '01001000 01100101 01101100 01101100 01101111'
console.log(decoded);  // 'Hello'
console.log(decoded === text); // true
```

### Error Handling

```javascript
import { decodeBase64 } from './utils/encoders/computer.js';

const invalid = 'not-valid-base64!!!';
const result = decodeBase64(invalid);
console.log(result); // '[Decode failed]'
```

### Chain Encoding

```javascript
import { encodeBinary } from './utils/encoders/computer.js';
import { encodeBase64 } from './utils/encoders/computer.js';

const text = 'Secret';
const binary = encodeBinary(text);
const base64 = encodeBase64(binary);
console.log(base64);
// Double-encoded for extra obfuscation
```

### Custom Encoder

```javascript
// Create your own encoder following the pattern
export const encodeMyMethod = (text) => {
  return text.split('').map(char => {
    // Your transformation logic
    return transformedChar;
  }).join('');
};

export const decodeMyMethod = (text) => {
  try {
    return text.split('').map(char => {
      // Your reverse transformation
      return originalChar;
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};
```

## Testing

All encoder functions should be tested for:

1. **Basic functionality**
2. **Reversibility** (if applicable)
3. **Edge cases** (empty string, special characters, Unicode)
4. **Error handling**

```javascript
import { describe, it, expect } from 'vitest';
import { encodeBinary, decodeBinary } from '../utils/encoders/computer.js';

describe('Binary Encoder', () => {
  it('encodes text correctly', () => {
    expect(encodeBinary('A')).toBe('01000001');
  });

  it('decodes text correctly', () => {
    expect(decodeBinary('01000001')).toBe('A');
  });

  it('is reversible', () => {
    const text = 'Hello World! 🌍';
    expect(decodeBinary(encodeBinary(text))).toBe(text);
  });

  it('handles empty string', () => {
    expect(encodeBinary('')).toBe('');
    expect(decodeBinary('')).toBe('');
  });
});
```

## Performance Considerations

- Most encoders are **O(n)** complexity where n = text length
- Zalgo encoder uses randomization (non-deterministic)
- QR code generation requires network request
- Audio playback is asynchronous
- All processing happens client-side (no backend)

## Browser Compatibility

### Required APIs

- **TextEncoder/TextDecoder**: Modern browsers (IE not supported)
- **Clipboard API**: HTTPS required for copy functionality
- **Web Audio API**: For Morse code audio
- **Service Worker**: For PWA offline support (optional)

### Polyfills

Not required - application targets modern browsers only.

## New Encoder Categories (v2.0)

### 🌍 Linguistic Encoders

```javascript
import { 
  encodeGreek, decodeGreek,
  encodeCyrillic, decodeCyrillic,
  encodeHebrew, decodeHebrew,
  encodeKorean, decodeKorean,
  encodeIPA
} from './utils/encoders/linguistic.js';

encodeGreek('Hello');    // Returns: 'ηελλο'
encodeCyrillic('Hello'); // Returns: 'хелло'
encodeHebrew('Hello');   // Returns: 'העללו'
encodeKorean('Hello');   // Returns: '흐에을을오'
encodeIPA('Hello');      // Returns: '/hɛllɒ/'
```

### 🧙 Fantasy Encoders

```javascript
import {
  encodeAurebesh, decodeAurebesh,
  encodeGallifreyan, decodeGallifreyan,
  encodeElvish, decodeElvish,
  encodeKlingon, decodeKlingon
} from './utils/encoders/fantasy.js';

encodeAurebesh('Hello');    // Returns: Star Wars Aurebesh characters
encodeGallifreyan('Hello'); // Returns: Doctor Who circular patterns
encodeElvish('Hello');      // Returns: ᚺᛖᛚᛚᛟ (Tengwar-inspired)
```

### 👁️ Visual Encoders

```javascript
import {
  encodeASL,
  encode7Segment,
  encodeDancingMen, decodeDancingMen,
  encodePigpen, decodePigpen
} from './utils/encoders/visual.js';

encodeASL('Hello');        // Returns: ASL hand sign emojis
encode7Segment('Hello');   // Returns: [H][E][L][L][0]
encodeDancingMen('Hello'); // Returns: Sherlock Holmes dancing figures
encodePigpen('Hello');     // Returns: Pigpen cipher symbols
```

### 📟 Retro Encoders

```javascript
import {
  encodePhoneKeypad, decodePhoneKeypad,
  encodePagerCode,
  encodePunchCard,
  encodeBaudot, decodeBaudot,
  encodeResistorColorCode
} from './utils/encoders/retro.js';

encodePhoneKeypad('Hello'); // Returns: '44-33-555-555-666'
encodePagerCode('Hello');   // Returns: Pager-style numeric codes
encodePunchCard('Hello');   // Returns: IBM punch card patterns
encodeBaudot('Hello');      // Returns: 5-bit teleprinter code
```

### 🏛️ Ancient Encoders

```javascript
import {
  encodeOgham, decodeOgham,
  encodeHieroglyphs, decodeHieroglyphs,
  encodeCuneiform, decodeCuneiform,
  encodeMayan, decodeMayan
} from './utils/encoders/ancient.js';

encodeOgham('Hello');      // Returns: ᚆᚓᚂᚂᚑ (Celtic Ogham)
encodeHieroglyphs('Hello'); // Returns: 𓉔𓇋𓃭𓃭𓍯 (Egyptian)
encodeCuneiform('Hello');  // Returns: 𒄩𒂊𒇷𒇷𒌋 (Sumerian)
encodeMayan('Hello');      // Returns: Mayan numeral representation
```

### ✨ Aesthetic Encoders

```javascript
import {
  encodeFullwidth, decodeFullwidth,
  encodeSquared, decodeSquared,
  encodeParenthesized, decodeParenthesized,
  encodeDoubleStruck, decodeDoubleStruck,
  encodeCursive, decodeCursive,
  encodeMirror
} from './utils/encoders/aesthetic.js';

encodeFullwidth('Hello');     // Returns: Ｈｅｌｌｏ
encodeSquared('Hello');       // Returns: 🄷🄴🄻🄻🄾
encodeParenthesized('Hello'); // Returns: ⒣⒠⒧⒧⒪
encodeDoubleStruck('Hello');  // Returns: ℍ𝕖𝕝𝕝𝕠
encodeCursive('Hello');       // Returns: ℋ𝑒𝓁𝓁𝑜
encodeMirror('Hello');        // Returns: ollɘH (horizontally mirrored)
```

### Additional Cipher Encoders

```javascript
import {
  encodePlayfair, decodePlayfair,
  encodeColumnar, decodeColumnar,
  encodeScytale, decodeScytale,
  encodeAutokey, decodeAutokey,
  encodeHill, decodeHill,
  encodeBifid, decodeBifid
} from './utils/encoders/ciphers.js';

encodePlayfair('Hello World', 'KEYWORD'); // Playfair cipher
encodeColumnar('Hello World', 'KEY');     // Columnar transposition
encodeScytale('Hello World', 4);          // Spartan scytale cipher
encodeAutokey('Hello World', 'KEY');      // Autokey Vigenère variant
encodeHill('Hello World');                // Hill cipher (matrix-based)
encodeBifid('Hello World', 'KEYWORD');    // Bifid cipher
```

### Additional Computer Encoders

```javascript
import {
  encodeBase32, decodeBase32,
  encodeOctal, decodeOctal,
  encodeAscii85, decodeAscii85,
  encodeQuotedPrintable, decodeQuotedPrintable,
  encodeA1Z26, decodeA1Z26,
  encodeBrainfuck, decodeBrainfuck
} from './utils/encoders/computer.js';

encodeBase32('Hello');          // Returns: JBSWY3DP
encodeOctal('Hello');           // Returns: 110 145 154 154 157
encodeAscii85('Hello');         // Returns: <~87cURD]~>
encodeQuotedPrintable('Hello'); // Returns: Hello (with =XX escapes)
encodeA1Z26('Hello');           // Returns: 8-5-12-12-15
encodeBrainfuck('Hello');       // Returns: Brainfuck program
```

## License

All encoder implementations are MIT licensed. See LICENSE file for details.
