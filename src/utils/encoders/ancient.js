/**
 * Ancient Script Encoders
 * Ogham, Egyptian Hieroglyphs, Sumerian Cuneiform, Mayan Numerals
 */

// Ogham (Celtic Tree Alphabet)
const OGHAM_MAP = {
  'a': 'ᚐ', 'b': 'ᚁ', 'c': 'ᚉ', 'd': 'ᚇ', 'e': 'ᚓ', 'f': 'ᚃ', 'g': 'ᚌ',
  'h': 'ᚆ', 'i': 'ᚔ', 'j': 'ᚔ', 'k': 'ᚉ', 'l': 'ᚂ', 'm': 'ᚋ', 'n': 'ᚅ',
  'o': 'ᚑ', 'p': 'ᚚ', 'q': 'ᚊ', 'r': 'ᚏ', 's': 'ᚄ', 't': 'ᚈ', 'u': 'ᚒ',
  'v': 'ᚃ', 'w': 'ᚃ', 'x': 'ᚉᚄ', 'y': 'ᚔ', 'z': 'ᚎ'
};

const OGHAM_REVERSE = Object.fromEntries(Object.entries(OGHAM_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Ogham (Celtic Tree alphabet)
 */
export const encodeOgham = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char === ' ') return '᚜';
    return OGHAM_MAP[char] || char;
  }).join('');
};

/**
 * Decodes Ogham back to Latin
 */
export const decodeOgham = (text) => {
  return text.split('').map(char => {
    if (char === '᚜') return ' ';
    return OGHAM_REVERSE[char] || char;
  }).join('');
};

// Egyptian Hieroglyphs (approximation using Unicode hieroglyphs)
const HIEROGLYPH_MAP = {
  'a': '𓀀', 'b': '𓃀', 'c': '𓂓', 'd': '𓂧', 'e': '𓇋', 'f': '𓆑', 'g': '𓎼',
  'h': '𓉔', 'i': '𓇌', 'j': '𓆓', 'k': '𓎡', 'l': '𓃭', 'm': '𓅓', 'n': '𓈖',
  'o': '𓍯', 'p': '𓊪', 'q': '𓏘', 'r': '𓂋', 's': '𓋴', 't': '𓏏', 'u': '𓅱',
  'v': '𓆑', 'w': '𓅱', 'x': '𓎡𓋴', 'y': '𓇌', 'z': '𓊃'
};

const HIEROGLYPH_REVERSE = Object.fromEntries(Object.entries(HIEROGLYPH_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Egyptian Hieroglyphs
 */
export const encodeHieroglyphs = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char === ' ') return '𓏭';
    return HIEROGLYPH_MAP[char] || char;
  }).join('');
};

/**
 * Decodes Hieroglyphs back to Latin
 */
export const decodeHieroglyphs = (text) => {
  return [...text].map(char => {
    if (char === '𓏭') return ' ';
    return HIEROGLYPH_REVERSE[char] || char;
  }).join('');
};

// Sumerian Cuneiform
const CUNEIFORM_MAP = {
  'a': '𒀀', 'b': '𒁀', 'c': '𒂵', 'd': '𒁲', 'e': '𒂊', 'f': '𒆳', 'g': '𒂷',
  'h': '𒄩', 'i': '𒄿', 'j': '𒋛', 'k': '𒆠', 'l': '𒇷', 'm': '𒈠', 'n': '𒈾',
  'o': '𒌋', 'p': '𒉺', 'q': '𒆪', 'r': '𒊑', 's': '𒊓', 't': '𒋫', 'u': '𒌑',
  'v': '𒅀', 'w': '𒉿', 'x': '𒆜', 'y': '𒅀', 'z': '𒍣'
};

const CUNEIFORM_REVERSE = Object.fromEntries(Object.entries(CUNEIFORM_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Sumerian Cuneiform
 */
export const encodeCuneiform = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char === ' ') return '𒑱';
    return CUNEIFORM_MAP[char] || char;
  }).join('');
};

/**
 * Decodes Cuneiform back to Latin
 */
export const decodeCuneiform = (text) => {
  return [...text].map(char => {
    if (char === '𒑱') return ' ';
    return CUNEIFORM_REVERSE[char] || char;
  }).join('');
};

// Mayan Numerals (0-19 representation)
const MAYAN_NUMERALS = ['𝋠', '𝋡', '𝋢', '𝋣', '𝋤', '𝋥', '𝋦', '𝋧', '𝋨', '𝋩', 
                        '𝋪', '𝋫', '𝋬', '𝋭', '𝋮', '𝋯', '𝋰', '𝋱', '𝋲', '𝋳'];

/**
 * Encodes numbers to Mayan Numerals
 */
export const encodeMayan = (text) => {
  return text.split('').map(char => {
    const num = parseInt(char);
    if (!isNaN(num) && num >= 0 && num <= 9) {
      return MAYAN_NUMERALS[num];
    }
    // For letters, convert to position (a=1, b=2, etc.)
    if (/[a-z]/i.test(char)) {
      const pos = char.toLowerCase().charCodeAt(0) - 96;
      return MAYAN_NUMERALS[pos % 20];
    }
    return char;
  }).join(' ');
};

/**
 * Decodes Mayan Numerals back to numbers
 */
export const decodeMayan = (text) => {
  return text.split(' ').map(char => {
    const idx = MAYAN_NUMERALS.indexOf(char);
    if (idx !== -1) {
      return idx.toString();
    }
    return char;
  }).join('');
};
