/**
 * Artistic Encoders
 * Creative visual encodings using blocks, music, zalgo, colors, runes, and ASCII art
 * 
 * Refactored to use shared utilities from shared.js where applicable.
 */

import { createModuloEncoder } from './shared.js';

// Character sets for artistic encodings
const BLOCKS = ['█', '▓', '▒', '░', '▀', '▄', '▌', '▐', '■', '▪', '▫', '◾', '◽', '▪️', '▫️'];
const MUSICAL_NOTES = ['♪', '♫', '♬', '♩', '♭', '♮', '♯', '𝄞', '𝄢'];
const COLOR_BLOCKS = ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '🟫', '⬛', '⬜'];
const RUNES = [
  'ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ',
  'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'
];

// Unicode combining diacritical marks for Zalgo text
const COMBINING_MARKS = [
  '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307',
  '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F',
  '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u0315', '\u0316', '\u0317',
  '\u0318', '\u0319', '\u031A', '\u031B', '\u031C', '\u031D', '\u031E', '\u031F'
];

// ASCII art letters (simplified 3-line format)
const ASCII_LETTERS = {
  'A': [' █ ', '█▀█', '▀ ▀'],
  'B': ['██▄', '█▀█', '██▀'],
  'C': ['▄██', '█  ', '▀██'],
  'D': ['██▄', '█ █', '██▀'],
  'E': ['███', '█▄ ', '███'],
  'F': ['███', '█▄ ', '█  '],
  'G': ['▄██', '█▄█', '▀██'],
  'H': ['█ █', '███', '█ █'],
  'I': ['███', ' █ ', '███'],
  'J': ['███', '  █', '▀█▀'],
  'K': ['█▄█', '██ ', '█ █'],
  'L': ['█  ', '█  ', '███'],
  'M': ['█▄█', '█▀█', '█ █'],
  'N': ['█▄█', '█▀█', '█ █'],
  'O': ['▄█▄', '█ █', '▀█▀'],
  'P': ['██▄', '█▀▀', '█  '],
  'Q': ['▄█▄', '█ █', '▀██'],
  'R': ['██▄', '█▀█', '█ █'],
  'S': ['▄██', ' █ ', '██▀'],
  'T': ['███', ' █ ', ' █ '],
  'U': ['█ █', '█ █', '▀█▀'],
  'V': ['█ █', '█ █', ' ▀ '],
  'W': ['█ █', '█▄█', '▀▀▀'],
  'X': ['█ █', ' █ ', '█ █'],
  'Y': ['█ █', ' █ ', ' █ '],
  'Z': ['███', ' █ ', '███'],
  '0': ['▄█▄', '█ █', '▀█▀'],
  '1': [' █ ', ' █ ', ' █ '],
  '2': ['▀█▄', ' █ ', '██▀'],
  '3': ['▀█▄', ' █▄', '▀█▀'],
  '4': ['█ █', '▀█▀', '  █'],
  '5': ['██▄', '▀█ ', '██▀'],
  '6': ['▄█▄', '██ ', '▀█▀'],
  '7': ['███', '  █', '  █'],
  '8': ['▄█▄', '▄█▄', '▀█▀'],
  '9': ['▄█▄', '▀██', '▀█▀'],
  ' ': ['   ', '   ', '   '],
  '!': [' █ ', ' █ ', ' ▀ '],
  '?': ['▀█▄', ' █ ', ' ▀ '],
  '.': ['   ', '   ', ' ▀ '],
  ',': ['   ', '   ', ' ▄ ']
};

/**
 * Encodes text to block art using geometric patterns (uses createModuloEncoder)
 * @param {string} text - The text to encode
 * @returns {string} - Block art representation
 */
export const encodeBoxDrawing = createModuloEncoder(BLOCKS);

/**
 * Encodes text to musical notation (uses createModuloEncoder)
 * @param {string} text - The text to encode
 * @returns {string} - Musical notes representation
 */
export const encodeMusical = createModuloEncoder(MUSICAL_NOTES);

/**
 * Encodes text to color blocks (uses createModuloEncoder)
 * @param {string} text - The text to encode
 * @returns {string} - Color blocks representation
 */
export const encodeColorBlocks = createModuloEncoder(COLOR_BLOCKS);

/**
 * Encodes text to ancient runes (uses createModuloEncoder)
 * @param {string} text - The text to encode
 * @returns {string} - Runic representation
 */
export const encodeRunes = createModuloEncoder(RUNES);

/**
 * Encodes text to Zalgo (chaotic combining marks)
 * Note: Uses randomness, not suitable for shared utility
 * @param {string} text - The text to encode
 * @param {number} intensity - Intensity level (1-10, default 5)
 * @returns {string} - Zalgo text with combining marks
 */
export const encodeZalgo = (text, intensity = 5) => {
  const level = Math.max(1, Math.min(10, intensity));
  const minMarks = Math.max(1, Math.floor(level / 2));
  const maxMarks = level;
  
  return text.split('').map(char => {
    const numMarks = Math.floor(Math.random() * (maxMarks - minMarks + 1)) + minMarks;
    let zalgoChar = char;
    for (let i = 0; i < numMarks; i++) {
      zalgoChar += COMBINING_MARKS[Math.floor(Math.random() * COMBINING_MARKS.length)];
    }
    return zalgoChar;
  }).join('');
};

/**
 * Encodes text to ASCII art banner (3 lines)
 * Note: Has unique multi-line output logic
 * @param {string} text - The text to encode
 * @returns {string} - ASCII art representation
 */
export const encodeAsciiArt = (text) => {
  const upperText = text.toUpperCase();
  const lines = ['', '', ''];
  
  for (const char of upperText) {
    const artChar = ASCII_LETTERS[char] || ASCII_LETTERS[' '];
    lines[0] += artChar[0] + ' ';
    lines[1] += artChar[1] + ' ';
    lines[2] += artChar[2] + ' ';
  }
  
  return lines.join('\n');
};

// ============================================
// SONAR PING ENCODING
// ============================================

/**
 * Encode text as sonar ping patterns
 * @param {string} text - The text to encode
 * @returns {string} - Sonar encoding
 */
export const encodeSonarPing = (text) => {
  const pings = ['◌', '◍', '◎', '●', '◉', '⦿', '⊙', '⊚'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const ping = pings[code % pings.length];
    const depth = code * 10;
    const bearing = (code * 1.4) % 360;
    const range = (code % 1000) + 100;
    return `PING[${hex}]${ping}@${depth}m∠${bearing.toFixed(0)}°R${range}`;
  }).join('〉〈');
};

export const decodeSonarPing = (text) => {
  try {
    const matches = text.match(/PING\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// POTTERY KILN FIRING ENCODING
// ============================================

/**
 * Encode text as kiln firing schedules
 * @param {string} text - The text to encode
 * @returns {string} - Kiln encoding
 */
export const encodeKilnFiring = (text) => {
  const cones = ['06', '05', '04', '03', '02', '01', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const atmospheres = ['oxidation', 'reduction', 'neutral', 'heavy-reduction'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const cone = cones[code % cones.length];
    const atm = atmospheres[(code >> 4) % atmospheres.length];
    const temp = 600 + (code * 5);
    return `KILN[${hex}]🔥Cone${cone}@${temp}°C(${atm})`;
  }).join('⟹');
};

export const decodeKilnFiring = (text) => {
  try {
    const matches = text.match(/KILN\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// STAINED GLASS ENCODING
// ============================================

/**
 * Encode text as stained glass patterns
 * @param {string} text - The text to encode
 * @returns {string} - Stained glass encoding
 */
export const encodeStainedGlass = (text) => {
  const glasses = ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬜', '⬛'];
  const leads = ['H', 'U', 'C', 'F', 'rounded', 'colonial', 'brass', 'zinc'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const glass = glasses[code % glasses.length];
    const lead = leads[(code >> 3) % leads.length];
    const opacity = (code % 100);
    const texture = ['smooth', 'rippled', 'hammered', 'seedy'][(code >> 5) % 4];
    return `GLASS[${hex}]${glass}{${lead}-lead:${texture}:${opacity}%}`;
  }).join('◈');
};

export const decodeStainedGlass = (text) => {
  try {
    const matches = text.match(/GLASS\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// TESSELLATION ENCODING
// ============================================

/**
 * Encode text as tessellation patterns
 * @param {string} text - The text to encode
 * @returns {string} - Tessellation encoding
 */
export const encodeTessellation = (text) => {
  const tiles = ['⬡', '⬢', '◇', '◆', '△', '▽', '▷', '◁'];
  const patterns = ['regular', 'semi-regular', 'demi-regular', 'monohedral', 'isohedral', 'anisohedral', 'penrose', 'aperiodic'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const tile = tiles[code % tiles.length];
    const pattern = patterns[(code >> 3) % patterns.length];
    const symmetry = ['p1', 'p2', 'pm', 'pg', 'cm', 'p2mm', 'p2mg', 'p2gg'][(code >> 4) % 8];
    return `TESS[${hex}]${tile.repeat(3)}{${pattern}:${symmetry}}`;
  }).join('⟠');
};

export const decodeTessellation = (text) => {
  try {
    const matches = text.match(/TESS\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};
