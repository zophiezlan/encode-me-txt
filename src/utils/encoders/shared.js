/**
 * Shared Encoder Utilities
 * Common patterns used across multiple encoder modules
 * 
 * This module provides:
 * - Factory functions for creating encoders/decoders (createMapEncoder, etc.)
 * - Shared constant data (MORSE_ALPHABET, EMOJI_SETS, etc.)
 * 
 * These utilities exist to support gradual consolidation of similar patterns
 * found across encoder modules. New encoders should prefer using these utilities.
 * Existing encoders may be migrated over time.
 * 
 * See ARCHITECTURE.md for documentation on coding patterns and refactoring plans.
 */

/**
 * Creates a simple map-based encoder function
 * @param {Object} map - Character mapping object
 * @param {Object} options - Configuration options
 * @param {boolean} options.lowercase - Convert input to lowercase first
 * @param {string} options.separator - Join character (default '')
 * @returns {function} Encoder function
 */
export const createMapEncoder = (map, options = {}) => {
  const { lowercase = false, separator = '' } = options;
  return (text) => {
    const input = lowercase ? text.toLowerCase() : text;
    return input.split('').map(char => map[char] || char).join(separator);
  };
};

/**
 * Creates a decoder from a character map (reverse lookup)
 * @param {Object} map - Original character mapping object
 * @param {Object} options - Configuration options
 * @param {string} options.separator - Split character (default '')
 * @returns {function} Decoder function
 */
export const createMapDecoder = (map, options = {}) => {
  const { separator = '' } = options;
  const reverseMap = Object.fromEntries(
    Object.entries(map).map(([k, v]) => [v, k])
  );
  return (text) => {
    if (separator) {
      return text.split(separator).map(char => reverseMap[char] || char).join('');
    }
    // Handle multi-character mappings by iterating through the string
    return [...text].map(char => reverseMap[char] || char).join('');
  };
};

/**
 * Creates an encoder that maps characters to array elements using modulo
 * @param {Array} array - Array of output elements
 * @param {Object} options - Configuration options
 * @param {string} options.separator - Join character (default '')
 * @returns {function} Encoder function
 */
export const createModuloEncoder = (array, options = {}) => {
  const { separator = '' } = options;
  return (text) => {
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      return array[code % array.length];
    }).join(separator);
  };
};

/**
 * Creates a Caesar/ROT cipher encoder
 * @param {number} shift - Number of positions to shift (default 13)
 * @returns {function} Encoder function
 */
export const createCaesarEncoder = (shift = 13) => {
  return (text) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
    });
  };
};

/**
 * Creates a Caesar/ROT cipher decoder
 * @param {number} shift - Number of positions that were shifted
 * @returns {function} Decoder function
 */
export const createCaesarDecoder = (shift = 13) => {
  // Decoding is just encoding with the inverse shift
  return createCaesarEncoder(26 - (shift % 26));
};

/**
 * Shared Morse code alphabet (standard ITU)
 * Used by both classic.js and parameterized.js
 */
export const MORSE_ALPHABET = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', '/': '-..-.',
  ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
  '_': '..--.-', '"': '.-..-.', '(': '-.--.', ')': '-.--.-', '@': '.--.-.'
};

export const MORSE_REVERSE = Object.fromEntries(
  Object.entries(MORSE_ALPHABET).map(([k, v]) => [v, k])
);

/**
 * Standard 5x5 Polybius grid alphabet (I/J combined)
 */
export const POLYBIUS_ALPHABET = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';

/**
 * Shared emoji collections
 */
export const EMOJI_SETS = {
  faces: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'],
  nature: ['🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '🌱', '🌿', '🍀', '🌲', '🌳', '🌴', '🌵', '🍁', '🍂'],
  food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝', '🥑', '🍆', '🥕'],
  weather: ['☀️', '🌤️', '⛅', '🌥️', '☁️', '🌧️', '⛈️', '🌩️', '❄️', '🌨️', '💨', '🌪️', '🌈', '⭐', '🌙'],
  hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💗', '💖', '💝', '💘', '💕', '💞'],
  symbols: ['⭐', '✨', '💫', '🌟', '⚡', '🔥', '💧', '🌊', '🎵', '🎶', '💎', '🔮', '🎯', '🎪', '🎭']
};
