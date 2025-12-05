/**
 * Classic Encoders
 * Traditional encoding methods like Morse Code, Braille, and NATO Phonetic
 * 
 * NOTE: This module uses Unicode visual symbols (• and −) for better display.
 * For ASCII-compatible Morse or parameterized variants, see parameterized.js.
 * See ARCHITECTURE.md for design rationale on keeping these separate.
 */

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
 * Encodes text to Morse code
 * @param {string} text - The text to encode
 * @returns {string} - Morse code representation
 */
export const encodeMorse = (text) => {
  return text.toLowerCase().split('').map(char => MORSE_CODE_MAP[char] || char).join(' ');
};

/**
 * Decodes Morse code back to text
 * @param {string} text - The Morse code to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeMorse = (text) => {
  try {
    const reverseMorse = Object.fromEntries(
      Object.entries(MORSE_CODE_MAP).map(([k, v]) => [v, k])
    );
    return text.split(' ').map(code => reverseMorse[code] || '').join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to Braille patterns
 * @param {string} text - The text to encode
 * @returns {string} - Braille representation
 */
export const encodeBraille = (text) => {
  return text.toLowerCase().split('').map(char => BRAILLE_MAP[char] || char).join('');
};

/**
 * Decodes Braille patterns back to text
 * @param {string} text - The Braille to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeBraille = (text) => {
  try {
    const reverseBraille = Object.fromEntries(
      Object.entries(BRAILLE_MAP).map(([k, v]) => [v, k])
    );
    return text.split('').map(char => reverseBraille[char] || '').join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to NATO phonetic alphabet
 * @param {string} text - The text to encode
 * @returns {string} - NATO phonetic representation
 */
export const encodeNATO = (text) => {
  return text.toLowerCase().split('').map(char => NATO_MAP[char] || char).join('-');
};
