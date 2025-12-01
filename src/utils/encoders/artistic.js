/**
 * Artistic Encoders
 * Creative visual encodings using blocks, music, zalgo, colors, and runes
 */

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

/**
 * Encodes text to block art using geometric patterns
 * @param {string} text - The text to encode
 * @returns {string} - Block art representation
 */
export const encodeBoxDrawing = (text) => {
  return text.split('').map(char =>
    BLOCKS[char.charCodeAt(0) % BLOCKS.length]
  ).join('');
};

/**
 * Encodes text to musical notation
 * @param {string} text - The text to encode
 * @returns {string} - Musical notes representation
 */
export const encodeMusical = (text) => {
  return text.split('').map(char =>
    MUSICAL_NOTES[char.charCodeAt(0) % MUSICAL_NOTES.length]
  ).join('');
};

/**
 * Encodes text to Zalgo (chaotic combining marks)
 * @param {string} text - The text to encode
 * @returns {string} - Zalgo text with combining marks
 */
export const encodeZalgo = (text) => {
  return text.split('').map(char => {
    const numMarks = Math.floor(Math.random() * 4) + 2;
    let zalgoChar = char;
    for (let i = 0; i < numMarks; i++) {
      zalgoChar += COMBINING_MARKS[Math.floor(Math.random() * COMBINING_MARKS.length)];
    }
    return zalgoChar;
  }).join('');
};

/**
 * Encodes text to color blocks
 * @param {string} text - The text to encode
 * @returns {string} - Color blocks representation
 */
export const encodeColorBlocks = (text) => {
  return text.split('').map(char =>
    COLOR_BLOCKS[char.charCodeAt(0) % COLOR_BLOCKS.length]
  ).join('');
};

/**
 * Encodes text to ancient runes (Elder Futhark)
 * @param {string} text - The text to encode
 * @returns {string} - Runic representation
 */
export const encodeRunes = (text) => {
  return text.split('').map(char =>
    RUNES[char.charCodeAt(0) % RUNES.length]
  ).join('');
};
