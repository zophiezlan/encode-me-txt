# Architecture Decisions

This document explains key architectural decisions and design choices made in the encode-me-txt project. These decisions address common questions about code organization and potential "issues" that are actually intentional design choices.

## Table of Contents

- [Morse Code Maps in Classic vs Parameterized](#morse-code-maps-in-classic-vs-parameterized)
- [Encoder Functions Not in Config](#encoder-functions-not-in-config)
- [Similar Coding Patterns](#similar-coding-patterns)
- [Shared Utilities](#shared-utilities)

---

## Morse Code Maps in Classic vs Parameterized

### Status: Intentional - Different Styles

**Files Involved:**
- `src/utils/encoders/classic.js` - `MORSE_CODE_MAP`
- `src/utils/encoders/parameterized.js` - `MORSE_MAP`

### Rationale

These two Morse code maps are **intentionally kept separate** because they serve different purposes and use different character sets:

#### Classic Morse (`MORSE_CODE_MAP`)
- Uses **Unicode visual symbols**: `•` (U+2022 bullet) and `−` (U+2212 minus sign)
- Lowercase letter keys for simpler input handling
- Optimized for **visual display** and readability
- Includes space character mapping to `/`

```javascript
// classic.js - Visual display style
const MORSE_CODE_MAP = {
  'a': '•−', 'b': '−•••', 'c': '−•−•', ...
};
```

#### Parameterized Morse (`MORSE_MAP`)
- Uses **ASCII characters**: `.` (period) and `-` (hyphen)
- Uppercase letter keys for standard Morse code representation
- Optimized for **compatibility** with external systems
- Supports multiple delimiter styles via the `style` parameter

```javascript
// parameterized.js - ASCII compatible style
const MORSE_MAP = {
  'A': '.-', 'B': '-...', 'C': '-.-.', ...
};
```

### Why Not Consolidate?

1. **Different Use Cases**: The Unicode version is better for display, while ASCII is better for interoperability
2. **Character Case Handling**: Classic expects lowercase, parameterized expects uppercase
3. **Feature Parity**: Parameterized version supports multiple delimiter styles that don't apply to classic
4. **No Performance Impact**: Maps are small constants, duplication has negligible memory impact
5. **Clarity of Intent**: Each module is self-contained and documents its own behavior

### Future Considerations

If consolidation becomes necessary, consider:
- Create a base map in `shared.js` with ASCII characters
- Transform at runtime for Unicode display
- Keep both exports for backward compatibility

---

## Encoder Functions Not in Config

### Status: Intentional - Design Choice

**Observation:** There are 38+ encoder functions in `src/utils/encoders/` that are not registered in `encoderConfig.js`.

### Rationale

This is an **intentional design choice** for the following reasons:

#### 1. Decoder-Only Functions

Many functions are **decoders without corresponding UI entries**:

```javascript
// These exist to support reversible encoders but don't need config entries
export const decodeMorse = (text) => { ... };
export const decodeBraille = (text) => { ... };
export const decodeROT13 = (text) => { ... };
```

Decoders are:
- Referenced by their encoder's config entry (`decode: encoders.decodeMorse`)
- Not meant to be standalone UI options
- Accessed programmatically through the encoder config's `decode` property

#### 2. Internal Utility Functions

Some functions are **internal utilities** not meant for end-user exposure:

```javascript
// Helper functions used by multiple encoders
const createReverseMap = (map) => Object.fromEntries(...);
const normalizeDelimiters = (text) => text.replace(...);
```

#### 3. Parameterized Variants

The `parameterized.js` module contains functions with configurable parameters that may supersede basic versions:

| Basic (in config) | Parameterized (for advanced use) |
|-------------------|----------------------------------|
| `encodeMorse` | `encodeMorseParam(text, style)` |
| `encodeBinary` | `encodeBinaryParam(text, groupSize)` |
| `encodeLeetspeak` | `encodeLeetspeakParam(text, intensity)` |

### Config Entry Requirements

For a function to appear in `encoderConfig.js`, it must:
1. Be an **encoding function** (not a decoder)
2. Be suitable for **end-user selection** in the UI
3. Have a **distinct purpose** not covered by another config entry
4. Be **stable and tested**

### How to Add New Encoders

See [CONTRIBUTING.md](./CONTRIBUTING.md#adding-new-encoders) for instructions on properly adding new encoders with config entries.

---

## Similar Coding Patterns

### Status: Refactoring Recommended

**Observation:** Multiple encoder modules contain similar coding patterns.

### Identified Patterns

#### 1. Character Map Transformations

```javascript
// Pattern found in 20+ encoders
const result = text.split('').map(char => MAP[char] || char).join('');
```

**Files:** `classic.js`, `fun.js`, `artistic.js`, `aesthetic.js`, etc.

#### 2. Reverse Map Generation

```javascript
// Pattern found in 15+ encoders
const reverseMap = Object.fromEntries(
  Object.entries(forwardMap).map(([k, v]) => [v, k])
);
```

**Files:** `classic.js`, `parameterized.js`, `ciphers.js`, etc.

#### 3. Decode with Error Handling

```javascript
// Pattern found in all decoders
try {
  // decoding logic
  return result;
} catch {
  return '[Decode failed]';
}
```

### Available Utilities in shared.js

The `src/utils/encoders/shared.js` file provides **reusable utilities** for common patterns:

```javascript
// Available utilities
export const createMapEncoder = (map, options) => { ... };
export const createMapDecoder = (map, options) => { ... };
export const createModuloEncoder = (array, options) => { ... };
export const createCaesarEncoder = (shift) => { ... };
export const createCaesarDecoder = (shift) => { ... };

// Shared data
export const MORSE_ALPHABET = { ... };
export const MORSE_REVERSE = { ... };
export const POLYBIUS_ALPHABET = '...';
export const EMOJI_SETS = { ... };
```

### Refactoring Plan

New encoders should use the utilities in `shared.js`. Existing encoders can be incrementally migrated to use these utilities to reduce code duplication and improve maintainability.

When refactoring, prioritize:

1. **High-Value Consolidation**
   - Encoders with identical patterns
   - Functions that can use `createMapEncoder`/`createMapDecoder`

2. **Medium-Value Consolidation**
   - Caesar/ROT variants sharing shift logic
   - Unicode block mappers

3. **Keep Separate**
   - Encoders with unique logic
   - Parameterized encoders (need flexibility)

### Refactoring Guidelines

When consolidating patterns:

```javascript
// BEFORE: Direct implementation
export const encodeMyEncoder = (text) => {
  const map = { 'a': 'X', 'b': 'Y', ... };
  return text.toLowerCase().split('').map(char => map[char] || char).join('');
};

// AFTER: Using shared utility
import { createMapEncoder } from './shared.js';

const MY_ENCODER_MAP = { 'a': 'X', 'b': 'Y', ... };
export const encodeMyEncoder = createMapEncoder(MY_ENCODER_MAP, { lowercase: true });
```

---

## Shared Utilities

### Location: `src/utils/encoders/shared.js`

This file contains shared constants and utility functions used across encoder modules.

### Shared Constants

| Constant | Description | Used By |
|----------|-------------|---------|
| `MORSE_ALPHABET` | Standard ITU Morse code map | `parameterized.js`, tests |
| `MORSE_REVERSE` | Reverse lookup for decoding | `parameterized.js`, tests |
| `POLYBIUS_ALPHABET` | 5x5 grid alphabet (I/J combined) | `parameterized.js` |
| `EMOJI_SETS` | Themed emoji collections | `fun.js`, `unique.js` |

### Factory Functions

| Function | Purpose | Parameters |
|----------|---------|------------|
| `createMapEncoder` | Create encoder from character map | `map`, `{ lowercase, separator }` |
| `createMapDecoder` | Create decoder from character map | `map`, `{ separator }` |
| `createModuloEncoder` | Create encoder using array modulo | `array`, `{ separator }` |
| `createCaesarEncoder` | Create Caesar cipher encoder | `shift` |
| `createCaesarDecoder` | Create Caesar cipher decoder | `shift` |

### Usage Example

```javascript
import { createMapEncoder, createMapDecoder, EMOJI_SETS } from './shared.js';

// Create encoder/decoder pair
const CUSTOM_MAP = { 'a': '1', 'b': '2', 'c': '3' };
export const encodeCustom = createMapEncoder(CUSTOM_MAP, { lowercase: true });
export const decodeCustom = createMapDecoder(CUSTOM_MAP);

// Use shared emoji set
const animals = EMOJI_SETS.animals;
export const encodeWithAnimals = createModuloEncoder(animals, { separator: '' });
```

---

## Summary

| Design Decision | Status | Rationale |
|----------------|--------|-----------|
| Duplicate Morse maps | Kept separate | Different styles (Unicode vs ASCII) |
| 38+ functions not in config | Intentional | Decoder-only and utility functions |
| Similar coding patterns | Refactoring recommended | Utilities available in shared.js |

These decisions prioritize:
- **Clarity** over premature optimization
- **Flexibility** for different use cases
- **Stability** of existing functionality
- **Testability** through isolation
