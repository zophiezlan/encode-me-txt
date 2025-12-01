/**
 * Fun Encoders
 * Emoji, Bubble Text, Upside Down, Leetspeak, and Pig Latin
 */

// Emoji palette for encoding
const EMOJI_PALETTE = [
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
  '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
  '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫'
];

// Bubble text lookup
const BUBBLE_MAP = {
  'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ',
  'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ',
  'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ',
  'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
  '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤',
  '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨'
};

// Upside down text lookup
const UPSIDE_DOWN_MAP = {
  'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ',
  'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'ʃ', 'm': 'ɯ', 'n': 'u',
  'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n',
  'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
  '!': '¡', '?': '¿', '.': '˙', ',': '\'', '(': ')', ')': '('
};

// Leetspeak lookup
const LEET_MAP = {
  'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7', 'l': '1',
  'A': '4', 'E': '3', 'I': '1', 'O': '0', 'S': '5', 'T': '7', 'L': '1'
};

/**
 * Encodes text using emoji pairs
 * @param {string} text - The text to encode
 * @returns {string} - Emoji representation
 */
export const encodeEmoji = (text) => {
  let encoded = '';
  for (let char of text) {
    const code = char.charCodeAt(0);
    const emoji1 = EMOJI_PALETTE[Math.floor(code / EMOJI_PALETTE.length)];
    const emoji2 = EMOJI_PALETTE[code % EMOJI_PALETTE.length];
    encoded += emoji1 + emoji2;
  }
  return encoded;
};

/**
 * Decodes emoji pairs back to text
 * @param {string} text - The emoji to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeEmoji = (text) => {
  try {
    const emojiArray = [...text];
    let decoded = '';

    for (let i = 0; i < emojiArray.length; i += 2) {
      if (i + 1 < emojiArray.length) {
        const idx1 = EMOJI_PALETTE.indexOf(emojiArray[i]);
        const idx2 = EMOJI_PALETTE.indexOf(emojiArray[i + 1]);
        if (idx1 !== -1 && idx2 !== -1) {
          decoded += String.fromCharCode(idx1 * EMOJI_PALETTE.length + idx2);
        }
      }
    }
    return decoded || '[Invalid emoji encoding]';
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to bubble text
 * @param {string} text - The text to encode
 * @returns {string} - Bubble text representation
 */
export const encodeBubble = (text) => {
  return text.toLowerCase().split('').map(char => BUBBLE_MAP[char] || char).join('');
};

/**
 * Encodes text to upside down text
 * @param {string} text - The text to encode
 * @returns {string} - Upside down text
 */
export const encodeUpsideDown = (text) => {
  return text.toLowerCase().split('').reverse().map(char => UPSIDE_DOWN_MAP[char] || char).join('');
};

/**
 * Encodes text to leetspeak
 * @param {string} text - The text to encode
 * @returns {string} - Leetspeak representation
 */
export const encodeLeetspeak = (text) => {
  return text.split('').map(char => LEET_MAP[char] || char).join('');
};

/**
 * Encodes text to Pig Latin
 * @param {string} text - The text to encode
 * @returns {string} - Pig Latin representation
 */
export const encodePigLatin = (text) => {
  return text.split(' ').map(word => {
    if (word.length === 0) return word;
    const vowels = 'aeiouAEIOU';
    if (vowels.includes(word[0])) {
      return word + 'way';
    } else {
      const firstVowelIndex = word.split('').findIndex(char => vowels.includes(char));
      if (firstVowelIndex === -1) return word + 'ay';
      return word.slice(firstVowelIndex) + word.slice(0, firstVowelIndex) + 'ay';
    }
  }).join(' ');
};
