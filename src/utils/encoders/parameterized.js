/**
 * Parameterized Encoders
 * Encoders with customizable settings and parameters
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
