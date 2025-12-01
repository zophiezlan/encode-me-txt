# API Documentation

## Encoder Functions API

All encoder functions follow consistent patterns for ease of use and testing.

## Table of Contents

- [Function Signatures](#function-signatures)
- [Encoder Categories](#encoder-categories)
- [Configuration API](#configuration-api)
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

## License

All encoder implementations are MIT licensed. See LICENSE file for details.
