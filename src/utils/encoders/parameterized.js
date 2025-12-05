/**
 * Parameterized Encoders
 * Encoders with customizable settings and parameters
 * 
 * NOTE: This module provides ASCII-compatible encoders with configurable options.
 * For simpler Unicode-display versions, see classic.js.
 * See ARCHITECTURE.md for design rationale on keeping these separate.
 */

// ============================================
// LEETSPEAK WITH INTENSITY LEVELS
// ============================================

// Basic leetspeak substitutions
const LEET_BASIC = {
  'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7',
  'A': '4', 'E': '3', 'I': '1', 'O': '0', 'S': '5', 'T': '7'
};

// Medium leetspeak substitutions
const LEET_MEDIUM = {
  ...LEET_BASIC,
  'b': '8', 'g': '9', 'l': '1', 'z': '2',
  'B': '8', 'G': '9', 'L': '1', 'Z': '2'
};

// Extreme leetspeak substitutions
const LEET_EXTREME = {
  'a': '@', 'b': '|3', 'c': '(', 'd': '|)', 'e': '3', 'f': '|=',
  'g': '9', 'h': '|-|', 'i': '!', 'j': '_|', 'k': '|<', 'l': '|_',
  'm': '|\\/|', 'n': '|\\|', 'o': '0', 'p': '|*', 'q': '(,)', 'r': '|2',
  's': '$', 't': '+', 'u': '|_|', 'v': '\\/', 'w': '\\/\\/', 'x': '><',
  'y': '`/', 'z': '2',
  'A': '@', 'B': '|3', 'C': '(', 'D': '|)', 'E': '3', 'F': '|=',
  'G': '9', 'H': '|-|', 'I': '!', 'J': '_|', 'K': '|<', 'L': '|_',
  'M': '|\\/|', 'N': '|\\|', 'O': '0', 'P': '|*', 'Q': '(,)', 'R': '|2',
  'S': '$', 'T': '+', 'U': '|_|', 'V': '\\/', 'W': '\\/\\/', 'X': '><',
  'Y': '`/', 'Z': '2'
};

/**
 * Encodes text to leetspeak with configurable intensity
 * @param {string} text - The text to encode
 * @param {number} intensity - Intensity level (1=basic, 2=medium, 3=extreme)
 * @returns {string} - Leetspeak representation
 */
export const encodeLeetspeakParam = (text, intensity = 1) => {
  const map = intensity >= 3 ? LEET_EXTREME : intensity >= 2 ? LEET_MEDIUM : LEET_BASIC;
  return text.split('').map(char => map[char] || char).join('');
};

// ============================================
// UWU WITH INTENSITY LEVELS
// ============================================

/**
 * UwU-ify text with intensity level
 * @param {string} text - The text to encode
 * @param {number} intensity - Intensity (1-10, higher = more uwu)
 * @returns {string} - UwU-ified text
 */
export const encodeUwUParam = (text, intensity = 5) => {
  let result = text
    .replace(/[rl]/g, 'w')
    .replace(/[RL]/g, 'W')
    .replace(/n([aeiou])/g, 'ny$1')
    .replace(/N([aeiou])/g, 'Ny$1')
    .replace(/N([AEIOU])/g, 'NY$1')
    .replace(/ove/g, 'uv');

  // More faces at higher intensity
  const faces = ['UwU', 'OwO', '>w<', '^w^', 'uwu', '(◕ᴗ◕✿)', '(„• ֊ •„)', '(≧◡≦)'];
  const stutterChance = intensity / 20; // 5% at intensity 1, 50% at intensity 10
  const faceChance = intensity / 15;

  // Add stuttering at higher intensities
  if (intensity >= 3) {
    result = result.split(' ').map(word => {
      if (word.length > 2 && Math.random() < stutterChance) {
        return word[0] + '-' + word;
      }
      return word;
    }).join(' ');
  }

  // Replace punctuation with faces
  result = result
    .replace(/!+/g, () => Math.random() < faceChance ? '! ' + faces[Math.floor(Math.random() * faces.length)] + ' ' : '!')
    .replace(/\?+/g, () => Math.random() < faceChance ? '? ' + faces[Math.floor(Math.random() * faces.length)] + ' ' : '?');

  // Add ending face based on intensity
  if (intensity >= 5 && Math.random() < intensity / 10) {
    result += ' ' + faces[Math.floor(Math.random() * faces.length)];
  }

  return result;
};

// ============================================
// SPONGEBOB WITH RANDOMNESS CONTROL
// ============================================

/**
 * SpOnGeBoB MoCkInG text with randomness control
 * @param {string} text - The text to encode
 * @param {number} randomness - 0=strict alternating, 100=random
 * @returns {string} - Alternating case text
 */
export const encodeSpongebobParam = (text, randomness = 0) => {
  let upper = false;
  const threshold = randomness / 100;
  
  return text.split('').map(char => {
    if (/[a-zA-Z]/.test(char)) {
      if (Math.random() < threshold) {
        // Random case at higher randomness
        return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
      }
      upper = !upper;
      return upper ? char.toUpperCase() : char.toLowerCase();
    }
    return char;
  }).join('');
};

// ============================================
// EMOJIPASTA WITH DENSITY CONTROL
// ============================================

const EMOJIPASTA_EMOJIS = ['😂', '🔥', '💯', '👀', '😭', '💀', '🤣', '😍', '🥺', '✨', '💕', '🙏', '😤', '👏', '💪', '🙌', '😩', '🥵', '😈', '💅'];

/**
 * Emojipasta with configurable density
 * @param {string} text - The text to encode
 * @param {number} density - Number of emojis per word (1-5)
 * @returns {string} - Emojipasta text
 */
export const encodeEmojipastaParam = (text, density = 2) => {
  const clampedDensity = Math.max(1, Math.min(5, density));
  return text.split(' ').map(word => {
    const numEmojis = Math.floor(Math.random() * clampedDensity) + 1;
    const randomEmojis = Array(numEmojis).fill(0).map(() => 
      EMOJIPASTA_EMOJIS[Math.floor(Math.random() * EMOJIPASTA_EMOJIS.length)]
    ).join('');
    return word + ' ' + randomEmojis;
  }).join(' ');
};

// ============================================
// BINARY WITH BIT GROUPING
// ============================================

/**
 * Binary encoding with configurable bit grouping
 * @param {string} text - The text to encode
 * @param {number} groupSize - Group size (4, 8, or 0 for no grouping)
 * @returns {string} - Binary representation
 */
export const encodeBinaryParam = (text, groupSize = 8) => {
  const binary = text.split('').map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join('');
  
  if (groupSize === 0) return binary;
  
  // Group the binary digits
  return binary.match(new RegExp(`.{1,${groupSize}}`, 'g'))?.join(' ') || binary;
};

/**
 * Decode binary with auto-detection of grouping
 * @param {string} text - The binary to decode
 * @returns {string} - Decoded text
 */
export const decodeBinaryParam = (text) => {
  try {
    const binary = text.replace(/\s/g, '');
    let result = '';
    for (let i = 0; i < binary.length; i += 8) {
      result += String.fromCharCode(parseInt(binary.slice(i, i + 8), 2));
    }
    return result;
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// MORSE WITH DELIMITER STYLES
// ============================================

// Uses ASCII dots/dashes (. and -) for compatibility with external systems
// For Unicode visual symbols (• and −), see encodeMorse in classic.js
// This map uses uppercase keys and supports configurable delimiter styles
const MORSE_MAP = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
};

const MORSE_REVERSE = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]));

/**
 * Morse encoding with configurable delimiter style
 * @param {string} text - The text to encode
 * @param {number} style - 1=classic, 2=slash, 3=pipe, 4=emoji
 * @returns {string} - Morse representation
 */
export const encodeMorseParam = (text, style = 1) => {
  const delimiters = {
    1: { char: ' ', word: ' / ' },    // Classic
    2: { char: '/', word: '//' },     // Slash
    3: { char: '|', word: '||' },     // Pipe
    4: { char: '·', word: ' 🔹 ' }    // Emoji
  };
  
  const d = delimiters[style] || delimiters[1];
  
  return text.toUpperCase().split(' ').map(word =>
    word.split('').map(char => MORSE_MAP[char] || char).join(d.char)
  ).join(d.word);
};

/**
 * Decode Morse code
 * @param {string} text - The Morse to decode
 * @returns {string} - Decoded text
 */
export const decodeMorseParam = (text) => {
  try {
    // Normalize delimiters
    const normalized = text
      .replace(/🔹/g, ' / ')
      .replace(/\|\|/g, ' / ')
      .replace(/\/\//g, ' / ')
      .replace(/\|/g, ' ')
      .replace(/·/g, ' ');
    
    return normalized.split(' / ').map(word =>
      word.trim().split(/\s+/).map(code => MORSE_REVERSE[code] || code).join('')
    ).join(' ');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// ROT-N WITH CUSTOM ROTATION
// ============================================

/**
 * ROT-N cipher with custom rotation
 * @param {string} text - The text to encode
 * @param {number} n - The rotation amount (1-25)
 * @returns {string} - Rotated text
 */
export const encodeROTN = (text, n = 13) => {
  const shift = ((n % 26) + 26) % 26; // Normalize to 0-25
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
  });
};

/**
 * Decode ROT-N cipher
 * @param {string} text - The text to decode
 * @param {number} n - The rotation used for encoding
 * @returns {string} - Decoded text
 */
export const decodeROTN = (text, n = 13) => {
  return encodeROTN(text, 26 - (n % 26));
};

// ============================================
// ROT5 (NUMBERS ONLY)
// ============================================

/**
 * ROT5 cipher for numbers
 * @param {string} text - The text to encode
 * @param {number} shift - The rotation amount (1-9)
 * @returns {string} - Encoded text
 */
export const encodeROT5 = (text, shift = 5) => {
  const s = ((shift % 10) + 10) % 10;
  return text.replace(/[0-9]/g, (char) => {
    return String.fromCharCode(((char.charCodeAt(0) - 48 + s) % 10) + 48);
  });
};

export const decodeROT5 = (text, shift = 5) => encodeROT5(text, 10 - (shift % 10));

// ============================================
// ROT18 (ROT5 + ROT13 COMBINED)
// ============================================

/**
 * ROT18 cipher (ROT5 for numbers, ROT13 for letters)
 * @param {string} text - The text to encode
 * @returns {string} - Encoded text
 */
export const encodeROT18 = (text) => {
  return text.replace(/[a-zA-Z0-9]/g, (char) => {
    if (/[0-9]/.test(char)) {
      return String.fromCharCode(((char.charCodeAt(0) - 48 + 5) % 10) + 48);
    }
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
  });
};

export const decodeROT18 = encodeROT18; // Symmetric

// ============================================
// TAP CODE WITH SYMBOL STYLES
// ============================================

/**
 * Tap code encoding with configurable symbols
 * @param {string} text - The text to encode
 * @param {number} style - 1=dots, 2=numbers, 3=asterisks, 4=emoji
 * @returns {string} - Tap code representation
 */
export const encodeTapCodeParam = (text, style = 1) => {
  // 5x5 grid (K replaced by C)
  const grid = 'ABCDEFGHIJLMNOPQRSTUVWXYZ';
  const symbols = {
    1: { tap: '.', sep: ' ' },     // Dots
    2: { tap: '1', sep: '-' },     // Numbers
    3: { tap: '*', sep: ' ' },     // Asterisks
    4: { tap: '👊', sep: ' ' }     // Emoji
  };
  
  const s = symbols[style] || symbols[1];
  
  return text.toUpperCase().replace(/K/g, 'C').split('').map(char => {
    const idx = grid.indexOf(char);
    if (idx === -1) return char === ' ' ? '/' : char;
    const row = Math.floor(idx / 5) + 1;
    const col = (idx % 5) + 1;
    return s.tap.repeat(row) + s.sep + s.tap.repeat(col);
  }).join('  ');
};

/**
 * Decode tap code
 * @param {string} text - The tap code to decode
 * @returns {string} - Decoded text
 */
export const decodeTapCodeParam = (text) => {
  try {
    const grid = 'ABCDEFGHIJLMNOPQRSTUVWXYZ';
    // Normalize to dots
    const normalized = text
      .replace(/👊/g, '.')
      .replace(/\*/g, '.')
      .replace(/1/g, '.')
      .replace(/-/g, ' ');
    
    return normalized.split('  ').map(code => {
      if (code === '/') return ' ';
      const parts = code.trim().split(/\s+/);
      if (parts.length !== 2) return code;
      const row = parts[0].length - 1;
      const col = parts[1].length - 1;
      const idx = row * 5 + col;
      return grid[idx] || code;
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// KEYWORD CIPHER
// ============================================

/**
 * Keyword cipher - substitution cipher using a keyword
 * @param {string} text - The text to encode
 * @param {string} keyword - The keyword to use
 * @returns {string} - Encoded text
 */
export const encodeKeywordCipher = (text, keyword = 'KEYWORD') => {
  // Build alphabet from keyword
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '');
  const uniqueKey = [...new Set(key.split(''))].join('');
  const remaining = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(c => !uniqueKey.includes(c)).join('');
  const cipherAlphabet = uniqueKey + remaining;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const idx = (isUpper ? char : char.toUpperCase()).charCodeAt(0) - 65;
    const encoded = cipherAlphabet[idx];
    return isUpper ? encoded : encoded.toLowerCase();
  });
};

/**
 * Decode keyword cipher
 * @param {string} text - The text to decode
 * @param {string} keyword - The keyword used
 * @returns {string} - Decoded text
 */
export const decodeKeywordCipher = (text, keyword = 'KEYWORD') => {
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '');
  const uniqueKey = [...new Set(key.split(''))].join('');
  const remaining = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(c => !uniqueKey.includes(c)).join('');
  const cipherAlphabet = uniqueKey + remaining;
  const plainAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const idx = cipherAlphabet.indexOf(isUpper ? char : char.toUpperCase());
    const decoded = plainAlphabet[idx];
    return isUpper ? decoded : decoded.toLowerCase();
  });
};

// ============================================
// RUNNING KEY CIPHER
// ============================================

/**
 * Running key cipher - uses a book/text as key
 * @param {string} text - The text to encode
 * @param {string} key - The running key text
 * @returns {string} - Encoded text
 */
export const encodeRunningKey = (text, key = 'THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG') => {
  const keyText = key.toUpperCase().replace(/[^A-Z]/g, '');
  let keyIndex = 0;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const plainPos = (isUpper ? char : char.toUpperCase()).charCodeAt(0) - 65;
    const keyPos = keyText.charCodeAt(keyIndex % keyText.length) - 65;
    const encoded = String.fromCharCode(((plainPos + keyPos) % 26) + 65);
    keyIndex++;
    return isUpper ? encoded : encoded.toLowerCase();
  });
};

/**
 * Decode running key cipher
 * @param {string} text - The text to decode
 * @param {string} key - The running key used
 * @returns {string} - Decoded text
 */
export const decodeRunningKey = (text, key = 'THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG') => {
  const keyText = key.toUpperCase().replace(/[^A-Z]/g, '');
  let keyIndex = 0;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const cipherPos = (isUpper ? char : char.toUpperCase()).charCodeAt(0) - 65;
    const keyPos = keyText.charCodeAt(keyIndex % keyText.length) - 65;
    const decoded = String.fromCharCode(((cipherPos - keyPos + 26) % 26) + 65);
    keyIndex++;
    return isUpper ? decoded : decoded.toLowerCase();
  });
};

// ============================================
// GRONSFELD CIPHER
// ============================================

/**
 * Gronsfeld cipher - Vigenère with numeric key
 * @param {string} text - The text to encode
 * @param {string} key - Numeric key (e.g., "31415")
 * @returns {string} - Encoded text
 */
export const encodeGronsfeld = (text, key = '31415') => {
  const numKey = key.replace(/[^0-9]/g, '') || '31415';
  let keyIndex = 0;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const shift = parseInt(numKey[keyIndex % numKey.length]);
    keyIndex++;
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
  });
};

/**
 * Decode Gronsfeld cipher
 * @param {string} text - The text to decode
 * @param {string} key - Numeric key used
 * @returns {string} - Decoded text
 */
export const decodeGronsfeld = (text, key = '31415') => {
  const numKey = key.replace(/[^0-9]/g, '') || '31415';
  let keyIndex = 0;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const shift = parseInt(numKey[keyIndex % numKey.length]);
    keyIndex++;
    return String.fromCharCode(((char.charCodeAt(0) - start - shift + 26) % 26) + start);
  });
};

// ============================================
// TRITHEMIUS CIPHER
// ============================================

/**
 * Trithemius cipher - progressive shift
 * @param {string} text - The text to encode
 * @param {number} start - Starting shift value
 * @returns {string} - Encoded text
 */
export const encodeTrithemius = (text, start = 0) => {
  let shift = start % 26;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const encoded = String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
    shift = (shift + 1) % 26;
    return encoded;
  });
};

/**
 * Decode Trithemius cipher
 * @param {string} text - The text to decode
 * @param {number} startShift - Starting shift used
 * @returns {string} - Decoded text
 */
export const decodeTrithemius = (text, startShift = 0) => {
  let shift = startShift % 26;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const decoded = String.fromCharCode(((char.charCodeAt(0) - start - shift + 26) % 26) + start);
    shift = (shift + 1) % 26;
    return decoded;
  });
};

// ============================================
// PORTA CIPHER
// ============================================

/**
 * Porta cipher - reciprocal polyalphabetic cipher
 * @param {string} text - The text to encode
 * @param {string} keyword - The keyword
 * @returns {string} - Encoded text
 */
export const encodePorta = (text, keyword = 'SECRET') => {
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '') || 'SECRET';
  const alphabets = [
    'NOPQRSTUVWXYZABCDEFGHIJKLM',
    'OPQRSTUVWXYZNMABCDEFGHIJKL',
    'PQRSTUVWXYZNOMABCDEFGHIJKL',
    'QRSTUVWXYZNOPABCDEFGHIJKLM',
    'RSTUVWXYZNOPQABCDEFGHIJKLM',
    'STUVWXYZNOPQRABCDEFGHIJKLM',
    'TUVWXYZNOPQRSABCDEFGHIJKLM',
    'UVWXYZNOPQRSTABCDEFGHIJKLM',
    'VWXYZNOPQRSTUABCDEFGHIJKLM',
    'WXYZNOPQRSTUVABCDEFGHIJKLM',
    'XYZNOPQRSTUVWABCDEFGHIJKLM',
    'YZNOPQRSTUVWXABCDEFGHIJKLM',
    'ZNOPQRSTUVWXYABCDEFGHIJKLM'
  ];
  
  let keyIndex = 0;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const c = (isUpper ? char : char.toUpperCase());
    const keyChar = key[keyIndex % key.length];
    const tableIndex = Math.floor((keyChar.charCodeAt(0) - 65) / 2);
    const charIndex = c.charCodeAt(0) - 65;
    const encoded = alphabets[tableIndex][charIndex];
    keyIndex++;
    return isUpper ? encoded : encoded.toLowerCase();
  });
};

// Porta is symmetric
export const decodePorta = encodePorta;

// ============================================
// NIHILIST CIPHER
// ============================================

/**
 * Nihilist cipher - based on Polybius square with keyword
 * @param {string} text - The text to encode
 * @param {string} keyword - The keyword
 * @returns {string} - Encoded text (numbers)
 */
export const encodeNihilist = (text, keyword = 'ZEBRA') => {
  // Build Polybius square from keyword
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I') || 'ZEBRA';
  const uniqueKey = [...new Set(key.split(''))].join('');
  const remaining = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'.split('').filter(c => !uniqueKey.includes(c)).join('');
  const square = uniqueKey + remaining;
  
  const getCoord = (char) => {
    const c = char.toUpperCase().replace(/J/g, 'I');
    const idx = square.indexOf(c);
    if (idx === -1) return null;
    return (Math.floor(idx / 5) + 1) * 10 + (idx % 5 + 1);
  };
  
  // Get keyword as numbers
  const keyNums = key.split('').map(c => getCoord(c));
  let keyIndex = 0;
  
  return text.toUpperCase().replace(/J/g, 'I').split('').map(char => {
    if (/[A-Z]/.test(char)) {
      const plainNum = getCoord(char);
      const sum = plainNum + keyNums[keyIndex % keyNums.length];
      keyIndex++;
      return sum;
    }
    return char === ' ' ? ' ' : '';
  }).join(' ');
};

/**
 * Decode Nihilist cipher
 * @param {string} text - The encoded numbers
 * @param {string} keyword - The keyword used
 * @returns {string} - Decoded text
 */
export const decodeNihilist = (text, keyword = 'ZEBRA') => {
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I') || 'ZEBRA';
  const uniqueKey = [...new Set(key.split(''))].join('');
  const remaining = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'.split('').filter(c => !uniqueKey.includes(c)).join('');
  const square = uniqueKey + remaining;
  
  const getCoord = (char) => {
    const c = char.toUpperCase().replace(/J/g, 'I');
    const idx = square.indexOf(c);
    if (idx === -1) return null;
    return (Math.floor(idx / 5) + 1) * 10 + (idx % 5 + 1);
  };
  
  const getChar = (num) => {
    const row = Math.floor(num / 10) - 1;
    const col = (num % 10) - 1;
    if (row < 0 || row > 4 || col < 0 || col > 4) return '?';
    return square[row * 5 + col];
  };
  
  const keyNums = key.split('').map(c => getCoord(c));
  let keyIndex = 0;
  
  try {
    return text.trim().split(/\s+/).map(numStr => {
      if (!numStr) return '';
      const num = parseInt(numStr);
      if (isNaN(num)) return numStr;
      const diff = num - keyNums[keyIndex % keyNums.length];
      keyIndex++;
      return getChar(diff);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// POLYBIUS SQUARE WITH CUSTOM SIZE
// ============================================

/**
 * Polybius square with size option
 * @param {string} text - The text to encode
 * @param {number} size - Grid size (5 for 5x5, 6 for 6x6 with numbers)
 * @returns {string} - Coordinate pairs
 */
export const encodePolybiusParam = (text, size = 5) => {
  const alphabets = {
    5: 'ABCDEFGHIKLMNOPQRSTUVWXYZ', // I/J combined
    6: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' // Full
  };
  
  const alpha = alphabets[size] || alphabets[5];
  const gridSize = size === 6 ? 6 : 5;
  
  return text.toUpperCase().replace(/J/g, size === 5 ? 'I' : 'J').split('').map(char => {
    const idx = alpha.indexOf(char);
    if (idx === -1) return char === ' ' ? ' ' : '';
    const row = Math.floor(idx / gridSize) + 1;
    const col = (idx % gridSize) + 1;
    return `${row}${col}`;
  }).join(' ');
};

/**
 * Decode Polybius square
 * @param {string} text - The coordinates to decode
 * @param {number} size - Grid size used
 * @returns {string} - Decoded text
 */
export const decodePolybiusParam = (text, size = 5) => {
  const alphabets = {
    5: 'ABCDEFGHIKLMNOPQRSTUVWXYZ',
    6: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  };
  
  const alpha = alphabets[size] || alphabets[5];
  const gridSize = size === 6 ? 6 : 5;
  
  try {
    return text.trim().split(/\s+/).map(code => {
      if (code.length !== 2) return code;
      const row = parseInt(code[0]) - 1;
      const col = parseInt(code[1]) - 1;
      if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) return code;
      return alpha[row * gridSize + col];
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// ADFGVX CIPHER
// ============================================

/**
 * ADFGVX cipher - WWI German cipher
 * @param {string} text - The text to encode
 * @param {string} keyword - The columnar transposition keyword
 * @returns {string} - ADFGVX encoded text
 */
export const encodeADFGVX = (text, keyword = 'GERMAN') => {
  const square = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const labels = 'ADFGVX';
  
  // First: substitute using 6x6 square
  const substituted = text.toUpperCase().replace(/[^A-Z0-9]/g, '').split('').map(char => {
    const idx = square.indexOf(char);
    if (idx === -1) return '';
    const row = Math.floor(idx / 6);
    const col = idx % 6;
    return labels[row] + labels[col];
  }).join('');
  
  // Second: columnar transposition
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '') || 'GERMAN';
  const keyOrder = [...key].map((c, i) => ({ c, i })).sort((a, b) => a.c.localeCompare(b.c)).map(x => x.i);
  
  const numCols = key.length;
  const numRows = Math.ceil(substituted.length / numCols);
  const padded = substituted.padEnd(numRows * numCols, 'X');
  
  // Fill grid row by row
  const grid = [];
  for (let r = 0; r < numRows; r++) {
    grid.push(padded.slice(r * numCols, (r + 1) * numCols).split(''));
  }
  
  // Read columns in key order
  return keyOrder.map(col => 
    grid.map(row => row[col]).join('')
  ).join(' ');
};

/**
 * Decode ADFGVX cipher
 * @param {string} text - The ADFGVX text to decode
 * @param {string} keyword - The keyword used
 * @returns {string} - Decoded text
 */
export const decodeADFGVX = (text, keyword = 'GERMAN') => {
  try {
    const square = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const labels = 'ADFGVX';
    const key = keyword.toUpperCase().replace(/[^A-Z]/g, '') || 'GERMAN';
    
    // Reverse columnar transposition
    const columns = text.replace(/\s+/g, ' ').split(' ');
    const keyOrder = [...key].map((c, i) => ({ c, i })).sort((a, b) => a.c.localeCompare(b.c)).map(x => x.i);
    
    const numRows = columns[0]?.length || 0;
    const grid = Array(numRows).fill(null).map(() => Array(key.length).fill(''));
    
    keyOrder.forEach((origCol, sortedIdx) => {
      for (let r = 0; r < numRows; r++) {
        grid[r][origCol] = columns[sortedIdx]?.[r] || '';
      }
    });
    
    // Read row by row
    const substituted = grid.map(row => row.join('')).join('');
    
    // Reverse substitution
    let result = '';
    for (let i = 0; i < substituted.length; i += 2) {
      const rowLabel = substituted[i];
      const colLabel = substituted[i + 1];
      const row = labels.indexOf(rowLabel);
      const col = labels.indexOf(colLabel);
      if (row !== -1 && col !== -1) {
        result += square[row * 6 + col];
      }
    }
    
    return result;
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// BOOK CIPHER
// ============================================

/**
 * Book cipher - encodes using word positions
 * @param {string} text - The text to encode
 * @param {string} book - The book text to reference
 * @returns {string} - Position references
 */
export const encodeBookCipher = (text, book = 'The quick brown fox jumps over the lazy dog and runs away quickly') => {
  const words = book.toLowerCase().split(/\s+/);
  const wordIndex = {};
  words.forEach((word, idx) => {
    const clean = word.replace(/[^a-z]/g, '');
    if (!wordIndex[clean]) wordIndex[clean] = [];
    wordIndex[clean].push(idx + 1);
  });
  
  return text.toLowerCase().split(/\s+/).map(word => {
    const clean = word.replace(/[^a-z]/g, '');
    const positions = wordIndex[clean];
    if (positions && positions.length > 0) {
      // Pick random position for variety
      return positions[Math.floor(Math.random() * positions.length)];
    }
    // Spell out letter by letter using first letters
    return clean.split('').map(char => {
      for (let i = 0; i < words.length; i++) {
        if (words[i][0] === char) return i + 1;
      }
      return '?';
    }).join('-');
  }).join(' ');
};

/**
 * Decode book cipher
 * @param {string} text - The position references
 * @param {string} book - The book text used
 * @returns {string} - Decoded text
 */
export const decodeBookCipher = (text, book = 'The quick brown fox jumps over the lazy dog and runs away quickly') => {
  try {
    const words = book.toLowerCase().split(/\s+/);
    
    return text.split(' ').map(ref => {
      if (ref.includes('-')) {
        // Letter by letter
        return ref.split('-').map(pos => {
          const idx = parseInt(pos) - 1;
          return words[idx]?.[0] || '?';
        }).join('');
      }
      const idx = parseInt(ref) - 1;
      return words[idx] || '?';
    }).join(' ');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// DOUBLE TRANSPOSITION
// ============================================

/**
 * Double transposition cipher
 * @param {string} text - The text to encode
 * @param {string} key1 - First keyword
 * @param {string} key2 - Second keyword
 * @returns {string} - Doubly transposed text
 */
export const encodeDoubleTransposition = (text, key1 = 'FIRST', key2 = 'SECOND') => {
  const transpose = (txt, key) => {
    const k = key.toUpperCase().replace(/[^A-Z]/g, '') || 'KEY';
    const keyOrder = [...k].map((c, i) => ({ c, i })).sort((a, b) => a.c.localeCompare(b.c) || a.i - b.i).map(x => x.i);
    const numCols = k.length;
    const numRows = Math.ceil(txt.length / numCols);
    const padded = txt.padEnd(numRows * numCols, 'X');
    
    const grid = [];
    for (let r = 0; r < numRows; r++) {
      grid.push(padded.slice(r * numCols, (r + 1) * numCols).split(''));
    }
    
    return keyOrder.map(col => grid.map(row => row[col]).join('')).join('');
  };
  
  const cleaned = text.toUpperCase().replace(/[^A-Z]/g, '');
  const first = transpose(cleaned, key1);
  return transpose(first, key2);
};

/**
 * Decode double transposition
 * @param {string} text - The text to decode
 * @param {string} key1 - First keyword
 * @param {string} key2 - Second keyword
 * @returns {string} - Decoded text
 */
export const decodeDoubleTransposition = (text, key1 = 'FIRST', key2 = 'SECOND') => {
  const untranspose = (txt, key) => {
    const k = key.toUpperCase().replace(/[^A-Z]/g, '') || 'KEY';
    const keyOrder = [...k].map((c, i) => ({ c, i })).sort((a, b) => a.c.localeCompare(b.c) || a.i - b.i).map(x => x.i);
    const numCols = k.length;
    const numRows = Math.ceil(txt.length / numCols);
    const colLen = numRows;
    
    // Split into columns
    const columns = [];
    let pos = 0;
    for (let i = 0; i < numCols; i++) {
      columns.push(txt.slice(pos, pos + colLen));
      pos += colLen;
    }
    
    // Rebuild grid
    const grid = Array(numRows).fill(null).map(() => Array(numCols).fill(''));
    keyOrder.forEach((origCol, sortedIdx) => {
      for (let r = 0; r < numRows; r++) {
        grid[r][origCol] = columns[sortedIdx][r] || '';
      }
    });
    
    return grid.map(row => row.join('')).join('');
  };
  
  try {
    const first = untranspose(text, key2);
    return untranspose(first, key1);
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// FOUR-SQUARE CIPHER
// ============================================

/**
 * Four-square cipher
 * @param {string} text - The text to encode
 * @param {string} keyword1 - First keyword
 * @param {string} keyword2 - Second keyword
 * @returns {string} - Encoded text
 */
export const encodeFourSquare = (text, keyword1 = 'EXAMPLE', keyword2 = 'KEYWORD') => {
  const makeSquare = (keyword) => {
    const key = keyword.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    const unique = [...new Set(key.split(''))].join('');
    const remaining = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'.split('').filter(c => !unique.includes(c)).join('');
    return unique + remaining;
  };
  
  const plainSquare = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  const square1 = makeSquare(keyword1);
  const square2 = makeSquare(keyword2);
  
  const getPos = (square, char) => {
    const idx = square.indexOf(char);
    return { row: Math.floor(idx / 5), col: idx % 5 };
  };
  
  const getChar = (square, row, col) => square[row * 5 + col];
  
  // Prepare text - pairs of letters
  let prepared = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  if (prepared.length % 2 !== 0) prepared += 'X';
  
  let result = '';
  for (let i = 0; i < prepared.length; i += 2) {
    const pos1 = getPos(plainSquare, prepared[i]);
    const pos2 = getPos(plainSquare, prepared[i + 1]);
    result += getChar(square1, pos1.row, pos2.col);
    result += getChar(square2, pos2.row, pos1.col);
  }
  
  return result;
};

/**
 * Decode four-square cipher
 * @param {string} text - The text to decode
 * @param {string} keyword1 - First keyword
 * @param {string} keyword2 - Second keyword
 * @returns {string} - Decoded text
 */
export const decodeFourSquare = (text, keyword1 = 'EXAMPLE', keyword2 = 'KEYWORD') => {
  const makeSquare = (keyword) => {
    const key = keyword.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    const unique = [...new Set(key.split(''))].join('');
    const remaining = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'.split('').filter(c => !unique.includes(c)).join('');
    return unique + remaining;
  };
  
  const plainSquare = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  const square1 = makeSquare(keyword1);
  const square2 = makeSquare(keyword2);
  
  const getPos = (square, char) => {
    const idx = square.indexOf(char);
    return { row: Math.floor(idx / 5), col: idx % 5 };
  };
  
  const getChar = (square, row, col) => square[row * 5 + col];
  
  try {
    const prepared = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let result = '';
    
    for (let i = 0; i < prepared.length; i += 2) {
      const pos1 = getPos(square1, prepared[i]);
      const pos2 = getPos(square2, prepared[i + 1]);
      result += getChar(plainSquare, pos1.row, pos2.col);
      result += getChar(plainSquare, pos2.row, pos1.col);
    }
    
    return result;
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// STRADDLING CHECKERBOARD
// ============================================

/**
 * Straddling checkerboard cipher
 * @param {string} text - The text to encode
 * @param {string} keyword - The keyword for the checkerboard
 * @returns {string} - Numeric encoding
 */
export const encodeStraddlingCheckerboard = (text, keyword = 'ESTONAI') => {
  // Build checkerboard - keyword fills first row with gaps at positions 2 and 6
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8) || 'ESTONAI';
  const unique = [...new Set(key.split(''))].join('');
  const remaining = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(c => !unique.includes(c)).join('');
  
  // First row: keyword chars at positions 0,1,3,4,5,7,8,9 (skip 2 and 6)
  // Rows 2 and 6 extend with remaining letters
  const firstRow = {};
  let keyIdx = 0;
  for (let i = 0; i < 10; i++) {
    if (i === 2 || i === 6) continue; // escape positions
    if (keyIdx < unique.length) {
      firstRow[unique[keyIdx]] = i.toString();
      keyIdx++;
    }
  }
  
  // Fill rows 2 and 6
  const row2 = {}, row6 = {};
  let remIdx = 0;
  for (let i = 0; i < 10 && remIdx < remaining.length; i++) {
    row2[remaining[remIdx]] = '2' + i;
    remIdx++;
  }
  for (let i = 0; i < 10 && remIdx < remaining.length; i++) {
    row6[remaining[remIdx]] = '6' + i;
    remIdx++;
  }
  
  const encodeMap = { ...firstRow, ...row2, ...row6 };
  
  return text.toUpperCase().replace(/[^A-Z]/g, '').split('').map(char => 
    encodeMap[char] || char
  ).join('');
};

/**
 * Decode straddling checkerboard
 * @param {string} text - The numeric encoding
 * @param {string} keyword - The keyword used
 * @returns {string} - Decoded text
 */
export const decodeStraddlingCheckerboard = (text, keyword = 'ESTONAI') => {
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8) || 'ESTONAI';
  const unique = [...new Set(key.split(''))].join('');
  const remaining = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(c => !unique.includes(c)).join('');
  
  const decodeMap = {};
  let keyIdx = 0;
  for (let i = 0; i < 10; i++) {
    if (i === 2 || i === 6) continue;
    if (keyIdx < unique.length) {
      decodeMap[i.toString()] = unique[keyIdx];
      keyIdx++;
    }
  }
  
  let remIdx = 0;
  for (let i = 0; i < 10 && remIdx < remaining.length; i++) {
    decodeMap['2' + i] = remaining[remIdx];
    remIdx++;
  }
  for (let i = 0; i < 10 && remIdx < remaining.length; i++) {
    decodeMap['6' + i] = remaining[remIdx];
    remIdx++;
  }
  
  try {
    let result = '';
    let i = 0;
    while (i < text.length) {
      if (text[i] === '2' || text[i] === '6') {
        result += decodeMap[text.slice(i, i + 2)] || '?';
        i += 2;
      } else {
        result += decodeMap[text[i]] || '?';
        i++;
      }
    }
    return result;
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// HOMOPHONIC SUBSTITUTION
// ============================================

/**
 * Homophonic substitution - multiple codes per letter
 * @param {string} text - The text to encode
 * @param {number} complexity - Number of alternatives (2-5)
 * @returns {string} - Numeric encoding
 */
export const encodeHomophonic = (text, complexity = 3) => {
  // Generate multiple codes per letter based on frequency
  const freq = {
    'E': 4, 'T': 3, 'A': 3, 'O': 3, 'I': 3, 'N': 3, 'S': 2, 'H': 2, 'R': 2,
    'D': 2, 'L': 2, 'C': 1, 'U': 1, 'M': 1, 'W': 1, 'F': 1, 'G': 1, 'Y': 1,
    'P': 1, 'B': 1, 'V': 1, 'K': 1, 'J': 1, 'X': 1, 'Q': 1, 'Z': 1
  };
  
  const map = {};
  let code = 10;
  
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
    const count = Math.min(freq[letter] || 1, complexity);
    map[letter] = [];
    for (let i = 0; i < count; i++) {
      map[letter].push(code++);
    }
  });
  
  return text.toUpperCase().replace(/[^A-Z]/g, '').split('').map(char => {
    const codes = map[char];
    return codes ? codes[Math.floor(Math.random() * codes.length)] : char;
  }).join(' ');
};

/**
 * Decode homophonic substitution
 * @param {string} text - The numeric encoding
 * @param {number} complexity - Complexity level used
 * @returns {string} - Decoded text
 */
export const decodeHomophonic = (text, complexity = 3) => {
  const freq = {
    'E': 4, 'T': 3, 'A': 3, 'O': 3, 'I': 3, 'N': 3, 'S': 2, 'H': 2, 'R': 2,
    'D': 2, 'L': 2, 'C': 1, 'U': 1, 'M': 1, 'W': 1, 'F': 1, 'G': 1, 'Y': 1,
    'P': 1, 'B': 1, 'V': 1, 'K': 1, 'J': 1, 'X': 1, 'Q': 1, 'Z': 1
  };
  
  const reverseMap = {};
  let code = 10;
  
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
    const count = Math.min(freq[letter] || 1, complexity);
    for (let i = 0; i < count; i++) {
      reverseMap[code++] = letter;
    }
  });
  
  try {
    return text.split(/\s+/).map(code => {
      const num = parseInt(code);
      return reverseMap[num] || code;
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// ALTERNATING CASE WITH PATTERNS
// ============================================

/**
 * Alternating case with configurable patterns
 * @param {string} text - The text to encode
 * @param {string} pattern - Pattern type: 'char', 'word', 'sentence', 'random'
 * @returns {string} - Alternating case text
 */
export const encodeAlternatingCaseParam = (text, pattern = 'char') => {
  switch (pattern) {
    case 'word': {
      // Alternate case by word
      return text.split(' ').map((word, idx) => 
        idx % 2 === 0 ? word.toUpperCase() : word.toLowerCase()
      ).join(' ');
    }
    case 'sentence': {
      // Alternate case by sentence
      return text.split(/([.!?]+\s*)/).map((part, idx) => 
        idx % 4 === 0 ? part.toUpperCase() : part.toLowerCase()
      ).join('');
    }
    case 'random': {
      // Pseudo-random case for each character using prime multiplier
      // 31337 is a prime number chosen for good distribution properties
      const SEED_PRIME = 31337;
      return text.split('').map((char, idx) => {
        const seed = (idx * SEED_PRIME) % 100;
        return seed > 50 ? char.toUpperCase() : char.toLowerCase();
      }).join('');
    }
    case 'char':
    default: {
      // Classic character-by-character alternation
      let upper = false;
      return text.split('').map(char => {
        if (/[a-zA-Z]/.test(char)) {
          upper = !upper;
          return upper ? char.toUpperCase() : char.toLowerCase();
        }
        return char;
      }).join('');
    }
  }
};

// ============================================
// BASE ENCODING WITH CUSTOM ALPHABET
// ============================================

/**
 * Base encoding with custom alphabet
 * @param {string} text - The text to encode
 * @param {string} alphabet - Custom alphabet string (min 2 chars)
 * @returns {string} - Encoded text using custom base
 */
export const encodeCustomBase = (text, alphabet = '01') => {
  if (alphabet.length < 2) alphabet = '01';
  const base = alphabet.length;
  
  return text.split('').map(char => {
    let num = char.charCodeAt(0);
    const digits = [];
    do {
      digits.unshift(alphabet[num % base]);
      num = Math.floor(num / base);
    } while (num > 0);
    return digits.join('');
  }).join(' ');
};

/**
 * Decode custom base encoding
 * @param {string} text - The encoded text
 * @param {string} alphabet - Custom alphabet used
 * @returns {string} - Decoded text
 */
export const decodeCustomBase = (text, alphabet = '01') => {
  if (alphabet.length < 2) alphabet = '01';
  const base = alphabet.length;
  
  try {
    return text.split(' ').map(encoded => {
      let num = 0;
      for (const char of encoded) {
        const idx = alphabet.indexOf(char);
        if (idx === -1) return encoded;
        num = num * base + idx;
      }
      return String.fromCharCode(num);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// CAESAR WITH MULTIPLE SHIFTS
// ============================================

/**
 * Caesar cipher with multiple rotating shifts
 * @param {string} text - The text to encode
 * @param {number[]} shifts - Array of shift values to cycle through
 * @returns {string} - Encoded text
 */
export const encodeMultiCaesar = (text, shifts = [3, 7, 13]) => {
  if (!shifts || shifts.length === 0) shifts = [3, 7, 13];
  let shiftIndex = 0;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const shift = shifts[shiftIndex % shifts.length];
    shiftIndex++;
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
  });
};

/**
 * Decode multi-shift Caesar cipher
 * @param {string} text - The encoded text
 * @param {number[]} shifts - Array of shift values used
 * @returns {string} - Decoded text
 */
export const decodeMultiCaesar = (text, shifts = [3, 7, 13]) => {
  if (!shifts || shifts.length === 0) shifts = [3, 7, 13];
  const reverseShifts = shifts.map(s => (26 - (s % 26)) % 26);
  return encodeMultiCaesar(text, reverseShifts);
};

// ============================================
// TEXT SCRAMBLER WITH WORD PRESERVATION
// ============================================

/**
 * Text scrambler that preserves word readability
 * @param {string} text - The text to scramble
 * @param {string} mode - 'middle' (keep first/last), 'ends' (keep middle), 'all' (full scramble)
 * @returns {string} - Scrambled text
 */
export const encodeScrambler = (text, mode = 'middle') => {
  // Primes for deterministic shuffle algorithm
  // Using small primes 7 and 13 for good distribution with minimal computation
  const SHUFFLE_PRIME_A = 7;
  const SHUFFLE_PRIME_B = 13;
  
  const scramble = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      // Deterministic shuffle using prime multipliers
      const j = (i * SHUFFLE_PRIME_A + arr.length * SHUFFLE_PRIME_B) % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return text.split(' ').map(word => {
    if (word.length <= 3) return word;
    const chars = word.split('');
    
    switch (mode) {
      case 'ends':
        // Keep first and last 2 chars, scramble middle
        if (chars.length <= 4) return word;
        return chars[0] + chars[1] + scramble(chars.slice(2, -2)).join('') + chars.slice(-2).join('');
      
      case 'all':
        // Full scramble
        return scramble(chars).join('');
      
      case 'middle':
      default:
        // Keep first and last char (Cambridge style)
        if (chars.length <= 2) return word;
        return chars[0] + scramble(chars.slice(1, -1)).join('') + chars[chars.length - 1];
    }
  }).join(' ');
};

// ============================================
// PHONETIC SUBSTITUTION WITH STYLES
// ============================================

const PHONETIC_STYLES = {
  nato: {
    'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
    'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliet',
    'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
    'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
    'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
    'Z': 'Zulu', ' ': '[space]'
  },
  police: {
    'A': 'Adam', 'B': 'Boy', 'C': 'Charles', 'D': 'David', 'E': 'Edward',
    'F': 'Frank', 'G': 'George', 'H': 'Henry', 'I': 'Ida', 'J': 'John',
    'K': 'King', 'L': 'Lincoln', 'M': 'Mary', 'N': 'Nora', 'O': 'Ocean',
    'P': 'Paul', 'Q': 'Queen', 'R': 'Robert', 'S': 'Sam', 'T': 'Tom',
    'U': 'Union', 'V': 'Victor', 'W': 'William', 'X': 'X-ray', 'Y': 'Young',
    'Z': 'Zebra', ' ': '[space]'
  },
  german: {
    'A': 'Anton', 'B': 'Berta', 'C': 'Cäsar', 'D': 'Dora', 'E': 'Emil',
    'F': 'Friedrich', 'G': 'Gustav', 'H': 'Heinrich', 'I': 'Ida', 'J': 'Julius',
    'K': 'Kaufmann', 'L': 'Ludwig', 'M': 'Martha', 'N': 'Nordpol', 'O': 'Otto',
    'P': 'Paula', 'Q': 'Quelle', 'R': 'Richard', 'S': 'Samuel', 'T': 'Theodor',
    'U': 'Ulrich', 'V': 'Viktor', 'W': 'Wilhelm', 'X': 'Xanthippe', 'Y': 'Ypsilon',
    'Z': 'Zacharias', ' ': '[Pause]'
  }
};

/**
 * Phonetic alphabet encoding with style selection
 * @param {string} text - The text to encode
 * @param {string} style - 'nato', 'police', or 'german'
 * @returns {string} - Phonetic representation
 */
export const encodePhoneticParam = (text, style = 'nato') => {
  const alphabet = PHONETIC_STYLES[style] || PHONETIC_STYLES.nato;
  return text.toUpperCase().split('').map(char => 
    alphabet[char] || char
  ).join(' ');
};

/**
 * Decode phonetic alphabet
 * @param {string} text - The phonetic text
 * @param {string} style - Style used for encoding
 * @returns {string} - Decoded text
 */
export const decodePhoneticParam = (text, style = 'nato') => {
  const alphabet = PHONETIC_STYLES[style] || PHONETIC_STYLES.nato;
  const reverse = Object.fromEntries(
    Object.entries(alphabet).map(([k, v]) => [v.toLowerCase(), k])
  );
  
  try {
    return text.split(' ').map(word => {
      const key = word.toLowerCase();
      return reverse[key] || word;
    }).join('').replace(/\[space\]/gi, ' ').replace(/\[pause\]/gi, ' ');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// NUMERIC SUBSTITUTION WITH BASES
// ============================================

/**
 * Convert text to numeric values with configurable base
 * @param {string} text - The text to convert
 * @param {number} base - Output number base (2-36)
 * @param {string} separator - Character to separate numbers
 * @returns {string} - Numeric representation
 */
export const encodeNumericBase = (text, base = 10, separator = '-') => {
  const clampedBase = Math.max(2, Math.min(36, base));
  return text.split('').map(char => 
    char.charCodeAt(0).toString(clampedBase).toUpperCase()
  ).join(separator);
};

/**
 * Decode numeric base encoding
 * @param {string} text - The numeric text
 * @param {number} base - Base used for encoding
 * @param {string} separator - Separator used
 * @returns {string} - Decoded text
 */
export const decodeNumericBase = (text, base = 10, separator = '-') => {
  const clampedBase = Math.max(2, Math.min(36, base));
  try {
    return text.split(separator).map(num => 
      String.fromCharCode(parseInt(num, clampedBase))
    ).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// WORD TRANSFORMATION
// ============================================

/**
 * Transform words with various operations
 * @param {string} text - The text to transform
 * @param {string} operation - 'reverse', 'sort', 'shuffle', 'double', 'truncate'
 * @param {number} param - Optional parameter for the operation
 * @returns {string} - Transformed text
 */
export const encodeWordTransform = (text, operation = 'reverse', param = 0) => {
  // Prime number for deterministic shuffle - chosen for good distribution
  const SHUFFLE_PRIME = 7919;
  
  return text.split(' ').map((word, idx) => {
    switch (operation) {
      case 'reverse':
        return word.split('').reverse().join('');
      
      case 'sort':
        return word.split('').sort().join('');
      
      case 'shuffle': {
        const chars = word.split('');
        // Deterministic shuffle using prime multiplier
        for (let i = chars.length - 1; i > 0; i--) {
          const j = ((i + idx) * SHUFFLE_PRIME) % (i + 1);
          [chars[i], chars[j]] = [chars[j], chars[i]];
        }
        return chars.join('');
      }
      
      case 'double':
        return word.split('').map(c => c + c).join('');
      
      case 'truncate': {
        const length = param || 3;
        return word.slice(0, length);
      }
      
      case 'initial':
        return word[0] || '';
      
      case 'pig-latin-advanced': {
        if (!/^[a-zA-Z]/.test(word)) return word;
        const vowels = 'aeiouAEIOU';
        if (vowels.includes(word[0])) {
          return word + 'way';
        }
        let consonantCluster = '';
        let i = 0;
        while (i < word.length && !vowels.includes(word[i])) {
          consonantCluster += word[i];
          i++;
        }
        return word.slice(i) + consonantCluster + 'ay';
      }
      
      default:
        return word;
    }
  }).join(' ');
};

// ============================================
// DELIMITER ENCODING
// ============================================

/**
 * Add delimiters between characters with configurable patterns
 * @param {string} text - The text to encode
 * @param {string} delimiter - Delimiter pattern (can be multiple chars)
 * @param {string} mode - 'char', 'word', 'alternate'
 * @returns {string} - Delimited text
 */
export const encodeDelimited = (text, delimiter = '-', mode = 'char') => {
  switch (mode) {
    case 'word':
      return text.split(' ').join(delimiter);
    
    case 'alternate': {
      const delimiters = delimiter.split('');
      return text.split('').map((char, idx) => 
        idx === 0 ? char : delimiters[idx % delimiters.length] + char
      ).join('');
    }
    
    case 'char':
    default:
      return text.split('').join(delimiter);
  }
};

/**
 * Decode delimited text
 * @param {string} text - The delimited text
 * @param {string} delimiter - Delimiter used
 * @param {string} mode - Mode used for encoding
 * @returns {string} - Decoded text
 */
export const decodeDelimited = (text, delimiter = '-', mode = 'char') => {
  try {
    switch (mode) {
      case 'word':
        return text.split(delimiter).join(' ');
      
      case 'alternate': {
        const delimiters = delimiter.split('');
        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (!delimiters.includes(text[i])) {
            result += text[i];
          }
        }
        return result;
      }
      
      case 'char':
      default:
        return text.split(delimiter).join('');
    }
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// REPEAT ENCODING
// ============================================

/**
 * Repeat characters based on their position or value
 * @param {string} text - The text to encode
 * @param {string} mode - 'position', 'value', 'fixed'
 * @param {number} count - Fixed repeat count (for 'fixed' mode)
 * @returns {string} - Repeated text
 */
export const encodeRepeat = (text, mode = 'fixed', count = 2) => {
  return text.split('').map((char, idx) => {
    let repeatCount;
    switch (mode) {
      case 'position':
        repeatCount = (idx % 5) + 1; // 1-5 repeats based on position
        break;
      case 'value':
        repeatCount = (char.charCodeAt(0) % 4) + 1; // 1-4 repeats based on char code
        break;
      case 'fixed':
      default:
        repeatCount = count;
    }
    return char.repeat(repeatCount);
  }).join('');
};

// ============================================
// VOWEL/CONSONANT OPERATIONS
// ============================================

/**
 * Transform vowels or consonants specifically
 * @param {string} text - The text to transform
 * @param {string} target - 'vowels', 'consonants', or 'both'
 * @param {string} operation - 'upper', 'lower', 'remove', 'double', 'replace'
 * @param {string} replacement - Replacement char (for 'replace' operation)
 * @returns {string} - Transformed text
 */
export const encodeVowelConsonant = (text, target = 'vowels', operation = 'upper', replacement = '*') => {
  const vowels = 'aeiouAEIOU';
  
  const isTarget = (char) => {
    const isVowel = vowels.includes(char);
    if (target === 'vowels') return isVowel;
    if (target === 'consonants') return /[a-zA-Z]/.test(char) && !isVowel;
    return /[a-zA-Z]/.test(char); // both
  };
  
  return text.split('').map(char => {
    if (!isTarget(char)) return char;
    
    switch (operation) {
      case 'upper':
        return char.toUpperCase();
      case 'lower':
        return char.toLowerCase();
      case 'remove':
        return '';
      case 'double':
        return char + char;
      case 'replace':
        return replacement;
      default:
        return char;
    }
  }).join('');
};

// ============================================
// CUTTING-EDGE ENCODERS
// ============================================

// ============================================
// BLOCKCHAIN-STYLE ENCODING
// ============================================

/**
 * Encode text as blockchain-style hash chain
 * Each character becomes a "block" with a hash reference to the previous
 * @param {string} text - The text to encode
 * @param {string} style - 'full', 'compact', or 'visual'
 * @returns {string} - Blockchain-style encoding
 */
export const encodeBlockchain = (text, style = 'compact') => {
  const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  };

  let prevHash = '00000000';
  const blocks = text.split('').map((char, idx) => {
    const data = char.charCodeAt(0).toString(16).padStart(2, '0');
    const blockHash = simpleHash(prevHash + data + idx);
    const block = style === 'full' 
      ? `[B${idx}:${data}|prev:${prevHash.slice(0,4)}|hash:${blockHash}]`
      : style === 'visual'
      ? `⛓${data}:${blockHash.slice(0,4)}`
      : `${data}:${blockHash.slice(0,4)}`;
    prevHash = blockHash;
    return block;
  });
  
  return style === 'full' 
    ? blocks.join('\n')
    : blocks.join(style === 'visual' ? '' : '-');
};

/**
 * Decode blockchain-style encoding
 * @param {string} text - The blockchain encoding
 * @param {string} style - Style used for encoding
 * @returns {string} - Decoded text
 */
export const decodeBlockchain = (text, style = 'compact') => {
  try {
    let parts;
    if (style === 'full') {
      parts = text.split('\n').map(block => {
        const match = block.match(/\[B\d+:([0-9a-f]{2})/i);
        return match ? match[1] : null;
      });
    } else if (style === 'visual') {
      parts = text.split('⛓').filter(Boolean).map(p => p.split(':')[0]);
    } else {
      parts = text.split('-').map(p => p.split(':')[0]);
    }
    return parts.filter(Boolean).map(hex => 
      String.fromCharCode(parseInt(hex, 16))
    ).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// MERKLE TREE ENCODING
// ============================================

/**
 * Encode text as Merkle tree structure
 * @param {string} text - The text to encode
 * @returns {string} - Merkle tree representation
 */
export const encodeMerkleTree = (text) => {
  const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  };

  // Create leaf nodes
  const leaves = text.split('').map(char => ({
    data: char.charCodeAt(0).toString(16).padStart(2, '0'),
    hash: simpleHash(char)
  }));

  // Build tree levels
  const buildLevel = (nodes) => {
    if (nodes.length <= 1) return nodes;
    const newLevel = [];
    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i];
      const right = nodes[i + 1] || left;
      newLevel.push({
        hash: simpleHash(left.hash + right.hash),
        children: [left, right]
      });
    }
    return newLevel;
  };

  let level = leaves;
  while (level.length > 1) {
    level = buildLevel(level);
  }

  const root = level[0]?.hash || '00000000';
  const leafData = leaves.map(l => l.data).join('');
  return `ROOT:${root}|DATA:${leafData}`;
};

/**
 * Decode Merkle tree encoding
 * @param {string} text - The Merkle encoding
 * @returns {string} - Decoded text
 */
export const decodeMerkleTree = (text) => {
  try {
    const match = text.match(/DATA:([0-9a-f]+)/i);
    if (!match) return '[Decode failed]';
    const hexData = match[1];
    let result = '';
    for (let i = 0; i < hexData.length; i += 2) {
      result += String.fromCharCode(parseInt(hexData.slice(i, i + 2), 16));
    }
    return result;
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// NEURAL NETWORK STYLE ENCODING
// ============================================

/**
 * Encode text as neural network weight matrices
 * @param {string} text - The text to encode
 * @param {number} layers - Number of "layers" (1-5)
 * @returns {string} - Neural network style encoding
 */
export const encodeNeuralNetwork = (text, layers = 2) => {
  const clampedLayers = Math.max(1, Math.min(5, layers));
  
  // Convert to initial "input layer"
  let values = text.split('').map(c => c.charCodeAt(0));
  
  // Apply "transformations" through layers
  const layerOutputs = [values.map(v => v.toString(16).padStart(2, '0')).join('')];
  
  for (let layer = 0; layer < clampedLayers; layer++) {
    const weights = [0.7, 0.3, 0.5, 0.2, 0.8]; // Simulated weights
    const bias = layer * 7;
    values = values.map((v, i) => {
      const w = weights[i % weights.length];
      return Math.floor((v * w + bias) % 256);
    });
    layerOutputs.push(values.map(v => v.toString(16).padStart(2, '0')).join(''));
  }
  
  return `NN[${clampedLayers}]:{${layerOutputs.join('→')}}`;
};

/**
 * Decode neural network encoding (extracts original input)
 * @param {string} text - The neural encoding
 * @returns {string} - Decoded text
 */
export const decodeNeuralNetwork = (text) => {
  try {
    const match = text.match(/NN\[\d+\]:\{([^→]+)/);
    if (!match) return '[Decode failed]';
    const hexData = match[1];
    let result = '';
    for (let i = 0; i < hexData.length; i += 2) {
      result += String.fromCharCode(parseInt(hexData.slice(i, i + 2), 16));
    }
    return result;
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// QUANTUM SUPERPOSITION ENCODING
// ============================================

/**
 * Encode text as quantum superposition states
 * @param {string} text - The text to encode
 * @param {string} notation - 'ket', 'wave', or 'matrix'
 * @returns {string} - Quantum-style encoding
 */
export const encodeQuantumSuperposition = (text, notation = 'ket') => {
  const chars = text.split('');
  
  switch (notation) {
    case 'wave':
      // Schrödinger wave function style
      return chars.map(c => {
        const code = c.charCodeAt(0);
        const real = ((code >> 4) / 16).toFixed(2);
        const imag = ((code & 0x0F) / 16).toFixed(2);
        return `Ψ(${real}+${imag}i)`;
      }).join('⊗');
    
    case 'matrix':
      // Density matrix style
      return chars.map(c => {
        const code = c.charCodeAt(0);
        const a = ((code >> 6) / 4).toFixed(1);
        const b = (((code >> 4) & 0x3) / 4).toFixed(1);
        const cp = (((code >> 2) & 0x3) / 4).toFixed(1);
        const d = ((code & 0x3) / 4).toFixed(1);
        return `[${a},${b};${cp},${d}]`;
      }).join('');
    
    case 'ket':
    default:
      // Dirac notation |ψ⟩
      return chars.map(c => {
        const code = c.charCodeAt(0);
        const alpha = (code >> 4).toString(16);
        const beta = (code & 0x0F).toString(16);
        return `|${alpha}⟩⊕|${beta}⟩`;
      }).join('⊗');
  }
};

/**
 * Decode quantum superposition encoding
 * @param {string} text - The quantum encoding
 * @param {string} notation - Notation used
 * @returns {string} - Decoded text
 */
export const decodeQuantumSuperposition = (text, notation = 'ket') => {
  try {
    switch (notation) {
      case 'wave': {
        const parts = text.split('⊗');
        return parts.map(p => {
          const match = p.match(/Ψ\(([0-9.]+)\+([0-9.]+)i\)/);
          if (!match) return '';
          const real = Math.round(parseFloat(match[1]) * 16);
          const imag = Math.round(parseFloat(match[2]) * 16);
          return String.fromCharCode((real << 4) | imag);
        }).join('');
      }
      case 'matrix': {
        const matrices = text.match(/\[[0-9.,;]+\]/g) || [];
        return matrices.map(m => {
          const nums = m.match(/[0-9.]+/g);
          if (!nums || nums.length < 4) return '';
          const a = Math.round(parseFloat(nums[0]) * 4);
          const b = Math.round(parseFloat(nums[1]) * 4);
          const c = Math.round(parseFloat(nums[2]) * 4);
          const d = Math.round(parseFloat(nums[3]) * 4);
          return String.fromCharCode((a << 6) | (b << 4) | (c << 2) | d);
        }).join('');
      }
      case 'ket':
      default: {
        const parts = text.split('⊗');
        return parts.map(p => {
          const match = p.match(/\|([0-9a-f])⟩⊕\|([0-9a-f])⟩/i);
          if (!match) return '';
          const alpha = parseInt(match[1], 16);
          const beta = parseInt(match[2], 16);
          return String.fromCharCode((alpha << 4) | beta);
        }).join('');
      }
    }
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// COMPRESSION-STYLE ENCODING (RLE)
// ============================================

/**
 * Run-length encoding with configurable format
 * @param {string} text - The text to encode
 * @param {string} format - 'standard', 'compact', 'verbose'
 * @returns {string} - RLE encoded text
 */
export const encodeRLE = (text, format = 'standard') => {
  if (!text) return '';
  
  const runs = [];
  let currentChar = text[0];
  let count = 1;
  
  for (let i = 1; i < text.length; i++) {
    if (text[i] === currentChar) {
      count++;
    } else {
      runs.push({ char: currentChar, count });
      currentChar = text[i];
      count = 1;
    }
  }
  runs.push({ char: currentChar, count });
  
  switch (format) {
    case 'compact':
      return runs.map(r => r.count > 1 ? `${r.count}${r.char}` : r.char).join('');
    case 'verbose':
      return runs.map(r => `[${r.char}×${r.count}]`).join('');
    case 'standard':
    default:
      return runs.map(r => `${r.char}${r.count}`).join('');
  }
};

/**
 * Decode RLE
 * @param {string} text - The RLE text
 * @param {string} format - Format used
 * @returns {string} - Decoded text
 */
export const decodeRLE = (text, format = 'standard') => {
  try {
    switch (format) {
      case 'compact': {
        return text.replace(/(\d+)(.)/g, (_, count, char) => char.repeat(parseInt(count)));
      }
      case 'verbose': {
        const matches = text.match(/\[(.?)×(\d+)\]/g) || [];
        return matches.map(m => {
          const match = m.match(/\[(.?)×(\d+)\]/);
          return match ? match[1].repeat(parseInt(match[2])) : '';
        }).join('');
      }
      case 'standard':
      default: {
        return text.replace(/(.)(\d+)/g, (_, char, count) => char.repeat(parseInt(count)));
      }
    }
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// HUFFMAN-STYLE ENCODING
// ============================================

/**
 * Simplified Huffman-style encoding
 * @param {string} text - The text to encode
 * @returns {string} - Huffman-style encoding with dictionary
 */
export const encodeHuffmanStyle = (text) => {
  if (!text) return '';
  
  // Count frequencies
  const freq = {};
  for (const char of text) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  // Sort by frequency (most frequent = shortest code)
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  
  // Assign prefix-free codes using canonical Huffman approach
  const codes = {};
  let code = 0;
  let prevLen = 1;
  
  sorted.forEach(([char], idx) => {
    // Calculate code length based on position
    const codeLen = Math.max(1, Math.ceil(Math.log2(idx + 2)));
    
    // Shift code if length increased
    if (codeLen > prevLen) {
      code = code << (codeLen - prevLen);
    }
    
    codes[char] = code.toString(2).padStart(codeLen, '0');
    code++;
    prevLen = codeLen;
  });
  
  // Encode
  const encoded = text.split('').map(c => codes[c]).join('|');
  const dict = sorted.map(([c]) => `${c.charCodeAt(0).toString(16).padStart(2, '0')}:${codes[c]}`).join(',');
  
  return `HUFF{${dict}}[${encoded}]`;
};

/**
 * Decode Huffman-style encoding
 * @param {string} text - The Huffman encoding
 * @returns {string} - Decoded text
 */
export const decodeHuffmanStyle = (text) => {
  try {
    const dictMatch = text.match(/HUFF\{([^}]+)\}/);
    const dataMatch = text.match(/\[([^[\]]+)\]/);
    if (!dictMatch || !dataMatch) return '[Decode failed]';
    
    // Parse dictionary
    const reverseDict = {};
    dictMatch[1].split(',').forEach(entry => {
      const [hex, code] = entry.split(':');
      reverseDict[code] = String.fromCharCode(parseInt(hex, 16));
    });
    
    // Decode using separator
    const data = dataMatch[1];
    return data.split('|').map(code => reverseDict[code] || '?').join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// SEMANTIC ENCODING
// ============================================

/**
 * Encode text using semantic word categories
 * @param {string} text - The text to encode
 * @param {string} theme - 'nature', 'tech', 'food', 'space'
 * @returns {string} - Semantically encoded text
 */
export const encodeSemanticTheme = (text, theme = 'nature') => {
  const themes = {
    nature: ['🌳', '🌸', '🌊', '🌙', '⭐', '🌿', '🍃', '🌺', '🦋', '🐦', '☀️', '🌈', '⛰️', '🌻', '🍀', '🌴'],
    tech: ['💻', '🖥️', '⌨️', '🖱️', '📱', '💾', '🔌', '⚡', '🤖', '🛸', '📡', '🔋', '💡', '🎮', '📟', '🔧'],
    food: ['🍕', '🍔', '🌮', '🍣', '🍜', '🍩', '🍪', '🎂', '🍰', '🍦', '🍫', '🍿', '🥗', '🍱', '🥐', '🧁'],
    space: ['🚀', '🛸', '🌍', '🌑', '🌕', '⭐', '💫', '☄️', '🌌', '👽', '🛰️', '🔭', '🌟', '✨', '🪐', '🌠']
  };
  
  const symbols = themes[theme] || themes.nature;
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const high = (code >> 4) % symbols.length;
    const low = (code & 0x0F) % symbols.length;
    return symbols[high] + symbols[low];
  }).join('');
};

/**
 * Decode semantic theme encoding
 * @param {string} text - The semantic encoding
 * @param {string} theme - Theme used
 * @returns {string} - Decoded text
 */
export const decodeSemanticTheme = (text, theme = 'nature') => {
  const themes = {
    nature: ['🌳', '🌸', '🌊', '🌙', '⭐', '🌿', '🍃', '🌺', '🦋', '🐦', '☀️', '🌈', '⛰️', '🌻', '🍀', '🌴'],
    tech: ['💻', '🖥️', '⌨️', '🖱️', '📱', '💾', '🔌', '⚡', '🤖', '🛸', '📡', '🔋', '💡', '🎮', '📟', '🔧'],
    food: ['🍕', '🍔', '🌮', '🍣', '🍜', '🍩', '🍪', '🎂', '🍰', '🍦', '🍫', '🍿', '🥗', '🍱', '🥐', '🧁'],
    space: ['🚀', '🛸', '🌍', '🌑', '🌕', '⭐', '💫', '☄️', '🌌', '👽', '🛰️', '🔭', '🌟', '✨', '🪐', '🌠']
  };
  
  const symbols = themes[theme] || themes.nature;
  
  try {
    // Convert text to array of grapheme clusters
    const graphemes = [...text];
    const result = [];
    
    for (let i = 0; i < graphemes.length; i += 2) {
      const highSymbol = graphemes[i];
      const lowSymbol = graphemes[i + 1];
      const high = symbols.indexOf(highSymbol);
      const low = symbols.indexOf(lowSymbol);
      if (high >= 0 && low >= 0) {
        result.push(String.fromCharCode((high << 4) | low));
      }
    }
    
    return result.join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// GENETIC ALGORITHM ENCODING
// ============================================

/**
 * Encode text as genetic algorithm chromosome representation
 * Each character becomes a "gene" with fitness scores
 * @param {string} text - The text to encode
 * @param {number} generations - Number of simulated generations (1-10)
 * @returns {string} - Genetic encoding
 */
export const encodeGeneticAlgorithm = (text, generations = 3) => {
  const clampedGen = Math.max(1, Math.min(10, generations));
  
  // Create initial population (characters as genes)
  const genes = text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    // Simulate fitness based on char code
    const fitness = ((code * 7 + idx * 13) % 100) / 100;
    return {
      allele: code.toString(16).padStart(2, '0'),
      fitness: fitness.toFixed(2),
      generation: clampedGen
    };
  });
  
  const chromosome = genes.map(g => 
    `[${g.allele}|f:${g.fitness}|g${g.generation}]`
  ).join('');
  
  return `GENOME{gen:${clampedGen},pop:${genes.length}}::${chromosome}`;
};

/**
 * Decode genetic algorithm encoding
 * @param {string} text - The genetic encoding
 * @returns {string} - Decoded text
 */
export const decodeGeneticAlgorithm = (text) => {
  try {
    const geneMatches = text.match(/\[([0-9a-f]{2})\|/gi) || [];
    return geneMatches.map(g => {
      const hex = g.match(/\[([0-9a-f]{2})/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// CELLULAR AUTOMATA ENCODING
// ============================================

/**
 * Encode text using cellular automata patterns (Rule 110 inspired)
 * @param {string} text - The text to encode
 * @param {number} rule - CA rule number (0-255)
 * @returns {string} - Cellular automata pattern
 */
export const encodeCellularAutomata = (text, rule = 110) => {
  const clampedRule = Math.max(0, Math.min(255, rule));
  
  // Convert text to binary seed
  const binary = text.split('').map(c => 
    c.charCodeAt(0).toString(2).padStart(8, '0')
  ).join('');
  
  // Apply CA rule for one generation
  const applyRule = (cells) => {
    let result = '';
    for (let i = 0; i < cells.length; i++) {
      const left = i > 0 ? cells[i-1] : '0';
      const center = cells[i];
      const right = i < cells.length - 1 ? cells[i+1] : '0';
      const pattern = parseInt(left + center + right, 2);
      result += (clampedRule >> pattern) & 1;
    }
    return result;
  };
  
  const evolved = applyRule(binary);
  
  // Convert to visual pattern
  const visual = evolved.split('').map(b => b === '1' ? '█' : '░').join('');
  
  return `CA[R${clampedRule}]:{${binary}}→{${visual}}`;
};

/**
 * Decode cellular automata encoding
 * @param {string} text - The CA encoding
 * @returns {string} - Decoded text
 */
export const decodeCellularAutomata = (text) => {
  try {
    const match = text.match(/\{([01]+)\}→/);
    if (!match) return '[Decode failed]';
    
    const binary = match[1];
    let result = '';
    for (let i = 0; i < binary.length; i += 8) {
      result += String.fromCharCode(parseInt(binary.slice(i, i + 8), 2));
    }
    return result;
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// FRACTAL DIMENSION ENCODING
// ============================================

/**
 * Encode text using fractal-like recursive patterns
 * @param {string} text - The text to encode
 * @param {number} depth - Recursion depth (1-4)
 * @returns {string} - Fractal encoding
 */
export const encodeFractalDimension = (text, depth = 2) => {
  const clampedDepth = Math.max(1, Math.min(4, depth));
  
  const fractalPattern = (code, d) => {
    if (d === 0) return code.toString(16).padStart(2, '0');
    
    const high = (code >> 4) & 0x0F;
    const low = code & 0x0F;
    
    return `(${fractalPattern(high, d-1)}⊕${fractalPattern(low, d-1)})`;
  };
  
  const patterns = text.split('').map(c => 
    fractalPattern(c.charCodeAt(0), clampedDepth)
  );
  
  return `FRACTAL[d${clampedDepth}]:${patterns.join('∘')}`;
};

/**
 * Decode fractal dimension encoding
 * @param {string} text - The fractal encoding
 * @returns {string} - Decoded text
 */
export const decodeFractalDimension = (text) => {
  try {
    const match = text.match(/FRACTAL\[d(\d+)\]:(.+)/);
    if (!match) return '[Decode failed]';
    
    const pattern = match[2];
    // Extract all hex pairs at deepest level
    const hexPairs = pattern.match(/[0-9a-f]{2}(?=[⊕)])/gi) || [];
    
    // Reconstruct bytes from fractal pattern
    const result = [];
    for (let i = 0; i < hexPairs.length; i += 2) {
      const high = parseInt(hexPairs[i], 16);
      const low = parseInt(hexPairs[i + 1] || '0', 16);
      result.push(String.fromCharCode((high << 4) | low));
    }
    
    return result.join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// TOPOLOGICAL ENCODING
// ============================================

/**
 * Encode text using topological/knot theory notation
 * @param {string} text - The text to encode
 * @returns {string} - Topological encoding
 */
export const encodeTopological = (text) => {
  // Represent characters as knot crossings
  const crossings = ['⊗', '⊘', '⊙', '⊚', '⊛', '⊜', '⊝', '⊞', '⊟', '⊠', '⊡', '⧉', '⧊', '⧋', '⧌', '⧍'];
  const twists = ['↷', '↶', '⟳', '⟲'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const crossing = crossings[code % crossings.length];
    const twist = twists[(code >> 4) % twists.length];
    const loops = (code >> 6) + 1;
    return `${twist}${crossing}${'○'.repeat(loops)}`;
  }).join('─');
};

/**
 * Decode topological encoding
 * @param {string} text - The topological encoding
 * @returns {string} - Decoded text
 */
export const decodeTopological = (text) => {
  const crossings = ['⊗', '⊘', '⊙', '⊚', '⊛', '⊜', '⊝', '⊞', '⊟', '⊠', '⊡', '⧉', '⧊', '⧋', '⧌', '⧍'];
  const twists = ['↷', '↶', '⟳', '⟲'];
  
  try {
    const parts = text.split('─');
    return parts.map(p => {
      const twistMatch = p.match(/^([↷↶⟳⟲])/);
      const crossingMatch = p.match(/([⊗⊘⊙⊚⊛⊜⊝⊞⊟⊠⊡⧉⧊⧋⧌⧍])/);
      const loops = (p.match(/○/g) || []).length;
      
      if (!twistMatch || !crossingMatch) return '';
      
      const twistIdx = twists.indexOf(twistMatch[1]);
      const crossIdx = crossings.indexOf(crossingMatch[1]);
      const loopVal = Math.min(3, Math.max(0, loops - 1)); // Clamp to 0-3 for 2 bits
      
      const code = Math.min(255, crossIdx + (twistIdx << 4) + (loopVal << 6));
      return String.fromCharCode(code);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// SYNAESTHETIC ENCODING
// ============================================

/**
 * Encode text as synaesthetic color-sound-taste mappings
 * @param {string} text - The text to encode
 * @returns {string} - Synaesthetic encoding
 */
export const encodeSynaesthetic = (text) => {
  const colors = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫'];
  const sounds = ['♩', '♪', '♫', '♬', '𝄞', '𝄢', '𝄫', '𝄬'];
  const tastes = ['甘', '酸', '苦', '辛', '咸', '鮮', '渋', '淡'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const color = colors[code % colors.length];
    const sound = sounds[(code >> 3) % sounds.length];
    const taste = tastes[(code >> 5) % tastes.length];
    return `${color}${sound}${taste}`;
  }).join('');
};

/**
 * Decode synaesthetic encoding
 * @param {string} text - The synaesthetic encoding
 * @returns {string} - Decoded text
 */
export const decodeSynaesthetic = (text) => {
  const colors = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫'];
  const sounds = ['♩', '♪', '♫', '♬', '𝄞', '𝄢', '𝄫', '𝄬'];
  const tastes = ['甘', '酸', '苦', '辛', '咸', '鮮', '渋', '淡'];
  
  try {
    const graphemes = [...text];
    const results = [];
    
    for (let i = 0; i < graphemes.length; i += 3) {
      const color = graphemes[i];
      const sound = graphemes[i + 1];
      const taste = graphemes[i + 2];
      
      const colorIdx = colors.indexOf(color);
      const soundIdx = sounds.indexOf(sound);
      const tasteIdx = tastes.indexOf(taste);
      
      if (colorIdx >= 0 && soundIdx >= 0 && tasteIdx >= 0) {
        // Reconstruct approximate character code
        const code = colorIdx + (soundIdx << 3) + (tasteIdx << 5);
        results.push(String.fromCharCode(code));
      }
    }
    
    return results.join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// METABOLIC PATHWAY ENCODING
// ============================================

/**
 * Encode text as biochemical pathway notation
 * @param {string} text - The text to encode
 * @returns {string} - Metabolic pathway encoding
 */
export const encodeMetabolicPathway = (text) => {
  const enzymes = ['kinase', 'synthase', 'lyase', 'ligase', 'hydrolase', 'transferase', 'isomerase', 'oxidase'];
  const cofactors = ['ATP', 'NAD+', 'FAD', 'CoA', 'NADP+', 'GTP', 'UTP', 'CTP'];
  
  return text.split('').map((char) => {
    const code = char.charCodeAt(0);
    const enzyme = enzymes[code % enzymes.length];
    const cofactor = cofactors[(code >> 3) % cofactors.length];
    const hex = code.toString(16).padStart(2, '0');
    return `[${hex}]─${cofactor}→(${enzyme})`;
  }).join('⟶');
};

/**
 * Decode metabolic pathway encoding
 * @param {string} text - The pathway encoding
 * @returns {string} - Decoded text
 */
export const decodeMetabolicPathway = (text) => {
  try {
    const hexMatches = text.match(/\[([0-9a-f]{2})\]/gi) || [];
    return hexMatches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// NEURAL SPIKE TRAIN ENCODING
// ============================================

/**
 * Encode text as neural spike train patterns
 * @param {string} text - The text to encode
 * @param {string} format - 'visual', 'timing', 'rate'
 * @returns {string} - Spike train encoding
 */
export const encodeSpikeTrain = (text, format = 'visual') => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const binary = code.toString(2).padStart(8, '0');
    
    switch (format) {
      case 'timing': {
        // Inter-spike intervals in ms
        const intervals = binary.split('').map((b, i) => 
          b === '1' ? (i + 1) * 10 : 0
        ).filter(t => t > 0);
        return `ISI[${intervals.join(',')}]`;
      }
      case 'rate': {
        const spikeCount = (code.toString(2).match(/1/g) || []).length;
        const rate = (spikeCount / 8 * 100).toFixed(0);
        return `${rate}Hz:${code.toString(16)}`;
      }
      case 'visual':
      default: {
        return binary.split('').map(b => b === '1' ? '│' : '·').join('');
      }
    }
  }).join(format === 'visual' ? ' ' : '→');
};

/**
 * Decode spike train encoding
 * @param {string} text - The spike train encoding
 * @param {string} format - Format used
 * @returns {string} - Decoded text
 */
export const decodeSpikeTrain = (text, format = 'visual') => {
  try {
    switch (format) {
      case 'timing': {
        const matches = text.match(/ISI\[([^\]]+)\]/g) || [];
        return matches.map(m => {
          const intervals = m.match(/\[([^\]]+)\]/)[1].split(',').map(Number);
          let binary = '00000000'.split('');
          intervals.forEach(t => {
            const pos = Math.floor(t / 10) - 1;
            if (pos >= 0 && pos < 8) binary[pos] = '1';
          });
          return String.fromCharCode(parseInt(binary.join(''), 2));
        }).join('');
      }
      case 'rate': {
        const matches = text.match(/\d+Hz:([0-9a-f]{2})/gi) || [];
        return matches.map(m => {
          const hex = m.match(/:([0-9a-f]{2})/i)[1];
          return String.fromCharCode(parseInt(hex, 16));
        }).join('');
      }
      case 'visual':
      default: {
        const patterns = text.split(' ');
        return patterns.map(p => {
          const binary = p.split('').map(c => c === '│' ? '1' : '0').join('');
          return String.fromCharCode(parseInt(binary, 2));
        }).join('');
      }
    }
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// LINGUISTIC PHONEME ENCODING
// ============================================

/**
 * Encode text using IPA-inspired phoneme transcription
 * Different from existing IPA - this creates a fictional phoneme system
 * @param {string} text - The text to encode
 * @returns {string} - Phoneme encoding
 */
export const encodePhonemeSystem = (text) => {
  // Custom fictional phoneme system with hex encoding
  const consonants = ['pʰ', 'tʰ', 'kʰ', 'bʱ', 'dʱ', 'gʱ', 'ʈ', 'ɖ', 'ɳ', 'ɽ', 'ʂ', 'ʐ', 'ɕ', 'ʑ', 'ɧ', 'ʜ'];
  const vowels = ['ɨ', 'ʉ', 'ɯ', 'ɤ', 'ɵ', 'ɞ', 'ɐ', 'ɶ'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const c = consonants[code % consonants.length];
    const v = vowels[(code >> 4) % vowels.length];
    // Store hex in transcription for reversibility
    return `/[${hex}]${c}${v}/`;
  }).join('');
};

/**
 * Decode phoneme system encoding
 * @param {string} text - The phoneme encoding
 * @returns {string} - Decoded text
 */
export const decodePhonemeSystem = (text) => {
  try {
    const hexMatches = text.match(/\[([0-9a-f]{2})\]/gi) || [];
    return hexMatches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// AI PROMPT STYLE ENCODING
// ============================================

/**
 * Encode text as AI-style prompt/response format
 * @param {string} text - The text to encode
 * @param {string} style - 'chatgpt', 'claude', 'llama', 'instruct'
 * @returns {string} - AI prompt style encoding
 */
export const encodeAIPrompt = (text, style = 'chatgpt') => {
  const hex = text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
  
  switch (style) {
    case 'claude':
      return `Human: Decode: ${hex}\n\nAssistant: The decoded message is: [HIDDEN]`;
    case 'llama':
      return `[INST] Decode this hex: ${hex} [/INST]\nDecoded: [HIDDEN]`;
    case 'instruct':
      return `### Instruction:\nDecode: ${hex}\n\n### Response:\n[HIDDEN]`;
    case 'chatgpt':
    default:
      return `<|system|>Decode hex<|user|>${hex}<|assistant|>[HIDDEN]`;
  }
};

/**
 * Decode AI prompt encoding
 * @param {string} text - The AI prompt text
 * @returns {string} - Decoded text
 */
export const decodeAIPrompt = (text) => {
  try {
    // Extract hex from various formats
    // ChatGPT: <|user|>HEX<|assistant|>
    // Claude: Decode: HEX
    // Llama: hex: HEX
    // Instruct: Decode: HEX
    const hexMatch = text.match(/(?:Decode[^:]*:\s*|hex:\s*|<\|user\|>)([0-9a-f]+)/i);
    if (!hexMatch) return '[Decode failed]';
    
    const hex = hexMatch[1];
    let result = '';
    for (let i = 0; i < hex.length; i += 2) {
      result += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
    }
    return result;
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// PROTOCOL BUFFER STYLE ENCODING
// ============================================

/**
 * Encode text as Protocol Buffer-style format
 * @param {string} text - The text to encode
 * @returns {string} - Protobuf-style encoding
 */
export const encodeProtobuf = (text) => {
  const fields = text.split('').map((char, idx) => {
    const fieldNum = idx + 1;
    const wireType = 0; // Varint
    const tag = (fieldNum << 3) | wireType;
    const value = char.charCodeAt(0);
    return `${tag.toString(16)}:${value.toString(16)}`;
  });
  
  return `message{${fields.join(';')}}`;
};

/**
 * Decode Protocol Buffer-style encoding
 * @param {string} text - The protobuf text
 * @returns {string} - Decoded text
 */
export const decodeProtobuf = (text) => {
  try {
    const match = text.match(/message\{([^}]+)\}/);
    if (!match) return '[Decode failed]';
    
    const fields = match[1].split(';');
    return fields.map(field => {
      const [_tag, value] = field.split(':');
      return String.fromCharCode(parseInt(value, 16));
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// GRAPHQL STYLE ENCODING
// ============================================

/**
 * Encode text as GraphQL-style query
 * @param {string} text - The text to encode
 * @returns {string} - GraphQL-style encoding
 */
export const encodeGraphQL = (text) => {
  const chars = text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    return `  char_${idx}: decode(hex: "${code.toString(16).padStart(2, '0')}")`;
  });
  
  return `query DecodeMessage {\n${chars.join('\n')}\n}`;
};

/**
 * Decode GraphQL-style encoding
 * @param {string} text - The GraphQL text
 * @returns {string} - Decoded text
 */
export const decodeGraphQL = (text) => {
  try {
    const matches = text.match(/hex:\s*"([0-9a-f]{2})"/gi) || [];
    return matches.map(m => {
      const hex = m.match(/([0-9a-f]{2})/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// LAMBDA/FUNCTIONAL ENCODING
// ============================================

/**
 * Encode text as lambda calculus style
 * @param {string} text - The text to encode
 * @param {string} style - 'lambda', 'arrow', 'haskell'
 * @returns {string} - Functional style encoding
 */
export const encodeLambda = (text, style = 'lambda') => {
  const chars = text.split('').map(c => c.charCodeAt(0));
  
  switch (style) {
    case 'arrow':
      return chars.map((c, i) => `f${i} = x => ${c}`).join('; ');
    case 'haskell':
      return chars.map((c, i) => `let c${i} = ${c}`).join(' in ');
    case 'lambda':
    default:
      return chars.map((c, i) => `(λc${i}.${c})`).join(' ');
  }
};

/**
 * Decode lambda encoding
 * @param {string} text - The lambda text
 * @param {string} style - Style used
 * @returns {string} - Decoded text
 */
export const decodeLambda = (text, style = 'lambda') => {
  try {
    switch (style) {
      case 'arrow': {
        const matches = text.match(/=>\s*(\d+)/g) || [];
        return matches.map(m => String.fromCharCode(parseInt(m.match(/(\d+)/)[1]))).join('');
      }
      case 'haskell': {
        const matches = text.match(/=\s*(\d+)/g) || [];
        return matches.map(m => String.fromCharCode(parseInt(m.match(/(\d+)/)[1]))).join('');
      }
      case 'lambda':
      default: {
        const matches = text.match(/\.(\d+)\)/g) || [];
        return matches.map(m => String.fromCharCode(parseInt(m.match(/(\d+)/)[1]))).join('');
      }
    }
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// SONIC/FREQUENCY ENCODING
// ============================================

/**
 * Encode text as audio frequency representation
 * @param {string} text - The text to encode
 * @param {string} format - 'hz', 'note', 'waveform'
 * @returns {string} - Frequency encoding
 */
export const encodeSonicFrequency = (text, format = 'hz') => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const baseFreq = 440; // A4
    const freq = baseFreq * Math.pow(2, (code - 69) / 12);
    
    switch (format) {
      case 'note': {
        const noteIdx = code % 12;
        const octave = Math.floor(code / 12) - 1;
        return `${notes[noteIdx]}${octave}`;
      }
      case 'waveform': {
        const amplitude = ((code >> 4) / 16).toFixed(2);
        const phase = ((code & 0x0F) / 16 * 360).toFixed(0);
        return `~${amplitude}∠${phase}°`;
      }
      case 'hz':
      default:
        return `${freq.toFixed(1)}Hz`;
    }
  }).join(' ');
};

/**
 * Decode sonic frequency encoding
 * @param {string} text - The frequency text
 * @param {string} format - Format used
 * @returns {string} - Decoded text
 */
export const decodeSonicFrequency = (text, format = 'hz') => {
  try {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const parts = text.split(' ');
    
    return parts.map(p => {
      switch (format) {
        case 'note': {
          const match = p.match(/([A-G]#?)(-?\d+)/);
          if (!match) return '';
          const noteIdx = notes.indexOf(match[1]);
          const octave = parseInt(match[2]);
          return String.fromCharCode(noteIdx + (octave + 1) * 12);
        }
        case 'waveform': {
          const match = p.match(/~([0-9.]+)∠(\d+)°/);
          if (!match) return '';
          const amplitude = Math.round(parseFloat(match[1]) * 16);
          const phase = Math.round(parseInt(match[2]) / 360 * 16);
          return String.fromCharCode((amplitude << 4) | phase);
        }
        case 'hz':
        default: {
          const match = p.match(/([0-9.]+)Hz/);
          if (!match) return '';
          const freq = parseFloat(match[1]);
          const code = Math.min(255, Math.max(0, Math.round(12 * Math.log2(freq / 440) + 69)));
          return String.fromCharCode(code);
        }
      }
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// MNEMONIC ENCODING
// ============================================

/**
 * Encode text as BIP39-style mnemonic words
 * @param {string} text - The text to encode
 * @returns {string} - Mnemonic phrase
 */
export const encodeMnemonic = (text) => {
  const wordList = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
    'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
    'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual',
    'adapt', 'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance',
    'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'age', 'agent',
    'agree', 'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album',
    'alcohol', 'alert', 'alien', 'all', 'alley', 'allow', 'almost', 'alone',
    'alpha', 'already', 'also', 'alter', 'always', 'amateur', 'amazing', 'among',
    'amount', 'amused', 'analyst', 'anchor', 'ancient', 'anger', 'angle', 'angry',
    'animal', 'ankle', 'announce', 'annual', 'another', 'answer', 'antenna', 'antique',
    'anxiety', 'any', 'apart', 'apology', 'appear', 'apple', 'approve', 'april',
    'arch', 'arctic', 'area', 'arena', 'argue', 'arm', 'armed', 'armor',
    'army', 'around', 'arrange', 'arrest', 'arrive', 'arrow', 'art', 'artefact',
    'artist', 'artwork', 'ask', 'aspect', 'assault', 'asset', 'assist', 'assume',
    'asthma', 'athlete', 'atom', 'attack', 'attend', 'attitude', 'attract', 'auction',
    'audit', 'august', 'aunt', 'author', 'auto', 'autumn', 'average', 'avocado',
    'avoid', 'awake', 'aware', 'away', 'awesome', 'awful', 'awkward', 'axis',
    'baby', 'bachelor', 'bacon', 'badge', 'bag', 'balance', 'balcony', 'ball',
    'bamboo', 'banana', 'banner', 'bar', 'barely', 'bargain', 'barrel', 'base',
    'basic', 'basket', 'battle', 'beach', 'bean', 'beauty', 'because', 'become',
    'beef', 'before', 'begin', 'behave', 'behind', 'believe', 'below', 'belt',
    'bench', 'benefit', 'best', 'betray', 'better', 'between', 'beyond', 'bicycle',
    'bid', 'bike', 'bind', 'biology', 'bird', 'birth', 'bitter', 'black',
    'blade', 'blame', 'blanket', 'blast', 'bleak', 'bless', 'blind', 'blood',
    'blossom', 'blouse', 'blue', 'blur', 'blush', 'board', 'boat', 'body',
    'boil', 'bomb', 'bone', 'bonus', 'book', 'boost', 'border', 'boring',
    'borrow', 'boss', 'bottom', 'bounce', 'box', 'boy', 'bracket', 'brain',
    'brand', 'brass', 'brave', 'bread', 'breeze', 'brick', 'bridge', 'brief',
    'bright', 'bring', 'brisk', 'broccoli', 'broken', 'bronze', 'broom', 'brother',
    'brown', 'brush', 'bubble', 'buddy', 'budget', 'buffalo', 'build', 'bulb',
    'bulk', 'bullet', 'bundle', 'bunker', 'burden', 'burger', 'burst', 'bus'
  ];
  
  // Include hex data for reversibility
  const hex = text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
  const words = text.split('').map(char => {
    const code = char.charCodeAt(0);
    return wordList[code % wordList.length];
  }).join(' ');
  
  return `MNEMONIC[${hex}]:${words}`;
};

/**
 * Decode mnemonic encoding
 * @param {string} text - The mnemonic phrase
 * @returns {string} - Decoded text
 */
export const decodeMnemonic = (text) => {
  try {
    // Extract hex from the mnemonic format
    const hexMatch = text.match(/MNEMONIC\[([0-9a-f]+)\]/i);
    if (!hexMatch) return '[Decode failed]';
    
    const hex = hexMatch[1];
    let result = '';
    for (let i = 0; i < hex.length; i += 2) {
      result += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
    }
    return result;
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// COORDINATE GRID ENCODING
// ============================================

/**
 * Encode text as coordinate grid positions
 * @param {string} text - The text to encode
 * @param {string} system - 'cartesian', 'polar', 'chess'
 * @returns {string} - Coordinate encoding
 */
export const encodeCoordinateGrid = (text, system = 'cartesian') => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const x = code >> 4;
    const y = code & 0x0F;
    
    switch (system) {
      case 'polar': {
        const r = Math.sqrt(x * x + y * y).toFixed(1);
        const theta = (Math.atan2(y, x) * 180 / Math.PI).toFixed(0);
        return `(${r}∠${theta}°)`;
      }
      case 'chess': {
        const file = String.fromCharCode(65 + (x % 8));
        const rank = (y % 8) + 1;
        return `${file}${rank}`;
      }
      case 'cartesian':
      default:
        return `(${x},${y})`;
    }
  }).join('');
};

/**
 * Decode coordinate grid encoding
 * @param {string} text - The coordinate text
 * @param {string} system - System used
 * @returns {string} - Decoded text
 */
export const decodeCoordinateGrid = (text, system = 'cartesian') => {
  try {
    switch (system) {
      case 'polar': {
        const matches = text.match(/\(([0-9.]+)∠(-?\d+)°\)/g) || [];
        return matches.map(m => {
          const match = m.match(/\(([0-9.]+)∠(-?\d+)°\)/);
          const r = parseFloat(match[1]);
          const theta = parseInt(match[2]) * Math.PI / 180;
          const x = Math.min(15, Math.max(0, Math.round(r * Math.cos(theta))));
          const y = Math.min(15, Math.max(0, Math.round(r * Math.sin(theta))));
          return String.fromCharCode((x << 4) | y);
        }).join('');
      }
      case 'chess': {
        const matches = text.match(/[A-H][1-8]/gi) || [];
        return matches.map(m => {
          const x = m.charCodeAt(0) - 65;
          const y = parseInt(m[1]) - 1;
          return String.fromCharCode((x << 4) | y);
        }).join('');
      }
      case 'cartesian':
      default: {
        const matches = text.match(/\((\d+),(\d+)\)/g) || [];
        return matches.map(m => {
          const match = m.match(/\((\d+),(\d+)\)/);
          const x = Math.min(15, parseInt(match[1]));
          const y = Math.min(15, parseInt(match[2]));
          return String.fromCharCode((x << 4) | y);
        }).join('');
      }
    }
  } catch {
    return '[Decode failed]';
  }
};
