/**
 * Aesthetic Text Encoders
 * Fullwidth, Squared, Parenthesized, Double-Struck, Cursive
 */

/**
 * Encodes text to Fullwidth characters
 */
export const encodeFullwidth = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    // Convert ASCII printable characters to fullwidth
    if (code >= 33 && code <= 126) {
      return String.fromCharCode(code + 65248);
    }
    if (code === 32) return '　'; // Fullwidth space
    return char;
  }).join('');
};

/**
 * Decodes Fullwidth back to regular text
 */
export const decodeFullwidth = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    // Convert fullwidth back to ASCII
    if (code >= 65281 && code <= 65374) {
      return String.fromCharCode(code - 65248);
    }
    if (code === 12288) return ' '; // Fullwidth space to regular
    return char;
  }).join('');
};

// Squared letters (Enclosed Alphanumeric Supplement)
const SQUARED_MAP = {
  'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶',
  'h': '🄷', 'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽',
  'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄',
  'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉'
};

const SQUARED_REVERSE = Object.fromEntries(Object.entries(SQUARED_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Squared letters
 */
export const encodeSquared = (text) => {
  return text.toLowerCase().split('').map(char => SQUARED_MAP[char] || char).join('');
};

/**
 * Decodes Squared back to regular text
 */
export const decodeSquared = (text) => {
  return [...text].map(char => SQUARED_REVERSE[char] || char).join('');
};

// Parenthesized letters
const PARENTHESIZED_MAP = {
  'a': '⒜', 'b': '⒝', 'c': '⒞', 'd': '⒟', 'e': '⒠', 'f': '⒡', 'g': '⒢',
  'h': '⒣', 'i': '⒤', 'j': '⒥', 'k': '⒦', 'l': '⒧', 'm': '⒨', 'n': '⒩',
  'o': '⒪', 'p': '⒫', 'q': '⒬', 'r': '⒭', 's': '⒮', 't': '⒯', 'u': '⒰',
  'v': '⒱', 'w': '⒲', 'x': '⒳', 'y': '⒴', 'z': '⒵'
};

const PARENTHESIZED_REVERSE = Object.fromEntries(Object.entries(PARENTHESIZED_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Parenthesized letters
 */
export const encodeParenthesized = (text) => {
  return text.toLowerCase().split('').map(char => PARENTHESIZED_MAP[char] || char).join('');
};

/**
 * Decodes Parenthesized back to regular text
 */
export const decodeParenthesized = (text) => {
  return [...text].map(char => PARENTHESIZED_REVERSE[char] || char).join('');
};

// Double-struck (Blackboard bold) letters
const DOUBLE_STRUCK_MAP = {
  'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘',
  'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟',
  'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦',
  'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
  'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾',
  'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ',
  'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌',
  'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ',
  '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜',
  '5': '𝟝', '6': '𝟞', '7': '𝟟', '8': '𝟠', '9': '𝟡'
};

const DOUBLE_STRUCK_REVERSE = Object.fromEntries(Object.entries(DOUBLE_STRUCK_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Double-Struck (Blackboard Bold)
 */
export const encodeDoubleStruck = (text) => {
  return text.split('').map(char => DOUBLE_STRUCK_MAP[char] || char).join('');
};

/**
 * Decodes Double-Struck back to regular text
 */
export const decodeDoubleStruck = (text) => {
  return [...text].map(char => DOUBLE_STRUCK_REVERSE[char] || char).join('');
};

// Cursive/Script letters (Mathematical Script)
const CURSIVE_MAP = {
  'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': '𝑒', 'f': '𝒻', 'g': '𝑔',
  'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃',
  'o': '𝑜', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊',
  'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
  'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢',
  'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩',
  'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰',
  'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵'
};

const CURSIVE_REVERSE = Object.fromEntries(Object.entries(CURSIVE_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Cursive/Script style
 */
export const encodeCursive = (text) => {
  return text.split('').map(char => CURSIVE_MAP[char] || char).join('');
};

/**
 * Decodes Cursive back to regular text
 */
export const decodeCursive = (text) => {
  return [...text].map(char => CURSIVE_REVERSE[char] || char).join('');
};

// Mirror text
const MIRROR_MAP = {
  'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'ꟻ', 'g': 'ǫ',
  'h': 'ʜ', 'i': 'i', 'j': 'ꞁ', 'k': 'ʞ', 'l': 'l', 'm': 'm', 'n': 'ᴎ',
  'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɿ', 's': 'ꙅ', 't': 'ƚ', 'u': 'u',
  'v': 'v', 'w': 'w', 'x': 'x', 'y': 'ʏ', 'z': 'ƹ'
};

/**
 * Encodes text to Mirror text (reversed and mirrored)
 */
export const encodeMirror = (text) => {
  return text.toLowerCase().split('').reverse().map(char => MIRROR_MAP[char] || char).join('');
};
