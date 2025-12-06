/**
 * Classic Encoders
 * Traditional encoding methods like Morse Code, Braille, and NATO Phonetic
 * 
 * NOTE: This module uses Unicode visual symbols (• and −) for better display.
 * For ASCII-compatible Morse or parameterized variants, see parameterized.js.
 * See ARCHITECTURE.md for design rationale on keeping these separate.
 * 
 * Refactored to use shared utilities from shared.js where applicable.
 */

import { createMapEncoder, createMapDecoder } from './shared.js';

// Morse Code lookup tables
// Uses Unicode bullet (•) and minus sign (−) for visual clarity
// For ASCII dots/dashes with configurable delimiters, see encodeMorseParam in parameterized.js
const MORSE_CODE_MAP = {
  'a': '•−', 'b': '−•••', 'c': '−•−•', 'd': '−••', 'e': '•', 'f': '••−•',
  'g': '−−•', 'h': '••••', 'i': '••', 'j': '•−−−', 'k': '−•−', 'l': '•−••',
  'm': '−−', 'n': '−•', 'o': '−−−', 'p': '•−−•', 'q': '−−•−', 'r': '•−•',
  's': '•••', 't': '−', 'u': '••−', 'v': '•••−', 'w': '•−−', 'x': '−••−',
  'y': '−•−−', 'z': '−−••', '0': '−−−−−', '1': '•−−−−', '2': '••−−−',
  '3': '•••−−', '4': '••••−', '5': '•••••', '6': '−••••', '7': '−−•••',
  '8': '−−−••', '9': '−−−−•', '.': '•−•−•−', ',': '−−••−−', '?': '••−−••',
  '!': '−•−•−−', '/': '−••−•', ':': '−−−•••', ' ': '/'
};

// Braille lookup tables
const BRAILLE_MAP = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛',
  'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝',
  'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥',
  'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵', ' ': '⠀',
  '0': '⠚', '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
  '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '.': '⠲', ',': '⠂',
  '!': '⠖', '?': '⠦'
};

// NATO Phonetic lookup table
const NATO_MAP = {
  'a': 'Alpha', 'b': 'Bravo', 'c': 'Charlie', 'd': 'Delta', 'e': 'Echo',
  'f': 'Foxtrot', 'g': 'Golf', 'h': 'Hotel', 'i': 'India', 'j': 'Juliett',
  'k': 'Kilo', 'l': 'Lima', 'm': 'Mike', 'n': 'November', 'o': 'Oscar',
  'p': 'Papa', 'q': 'Quebec', 'r': 'Romeo', 's': 'Sierra', 't': 'Tango',
  'u': 'Uniform', 'v': 'Victor', 'w': 'Whiskey', 'x': 'X-ray', 'y': 'Yankee',
  'z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
  '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
};

/**
 * Encodes text to Morse code using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Morse code representation
 */
export const encodeMorse = createMapEncoder(MORSE_CODE_MAP, { lowercase: true, separator: ' ' });

/**
 * Decodes Morse code back to text using shared utility
 * @param {string} text - The Morse code to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeMorse = (text) => {
  try {
    const decoder = createMapDecoder(MORSE_CODE_MAP, { separator: ' ' });
    return decoder(text);
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to Braille patterns using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Braille representation
 */
export const encodeBraille = createMapEncoder(BRAILLE_MAP, { lowercase: true });

/**
 * Decodes Braille patterns back to text using shared utility
 * @param {string} text - The Braille to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeBraille = (text) => {
  try {
    const decoder = createMapDecoder(BRAILLE_MAP);
    return decoder(text);
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to NATO phonetic alphabet using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - NATO phonetic representation
 */
export const encodeNATO = createMapEncoder(NATO_MAP, { lowercase: true, separator: '-' });
