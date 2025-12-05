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

/**
 * Wingdings-style encoding using Unicode symbols
 * @param {string} text - The text to encode
 * @returns {string} - Symbol representation
 */
export const encodeWingdings = (text) => {
  const wingdingsMap = {
    'A': '✌', 'B': '👍', 'C': '👎', 'D': '☜', 'E': '☞', 'F': '☝', 'G': '☟',
    'H': '✋', 'I': '☺', 'J': '😐', 'K': '☹', 'L': '💣', 'M': '☠', 'N': '⚐',
    'O': '✈', 'P': '☀', 'Q': '❄', 'R': '✝', 'S': '✡', 'T': '☪', 'U': '☯',
    'V': '♈', 'W': '♉', 'X': '♊', 'Y': '♋', 'Z': '♌',
    'a': '♍', 'b': '♎', 'c': '♏', 'd': '♐', 'e': '♑', 'f': '♒', 'g': '♓',
    'h': '⛎', 'i': '🔯', 'j': '🕎', 'k': '☸', 'l': '⚛', 'm': '✴',
    'n': '✳', 'o': '❇', 'p': '✦', 'q': '✧', 'r': '★', 's': '☆', 't': '✪',
    'u': '✫', 'v': '✬', 'w': '✭', 'x': '✮', 'y': '✯', 'z': '✰',
    '0': '🔟', '1': '①', '2': '②', '3': '③', '4': '④',
    '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨',
    ' ': ' ', '.': '●', ',': '◆', '!': '⚡', '?': '❓'
  };
  
  return text.split('').map(char => wingdingsMap[char] || char).join('');
};

/**
 * Semaphore Flag encoding - Maritime flag signals
 * @param {string} text - The text to encode
 * @returns {string} - Semaphore positions
 */
export const encodeSemaphore = (text) => {
  const semaphoreMap = {
    'A': '🚩↙', 'B': '🚩←', 'C': '🚩↖', 'D': '🚩↑', 'E': '🚩↗',
    'F': '🚩→', 'G': '🚩↘', 'H': '↙←', 'I': '↙↖', 'J': '→↑',
    'K': '↙↑', 'L': '↙↗', 'M': '↙→', 'N': '↙↘', 'O': '←↖',
    'P': '←↑', 'Q': '←↗', 'R': '←→', 'S': '←↘', 'T': '↖↑',
    'U': '↖↗', 'V': '↑↘', 'W': '↗→', 'X': '↗↘', 'Y': '↖→',
    'Z': '↘→', ' ': ' | '
  };
  
  return text.toUpperCase().split('').map(char => semaphoreMap[char] || char).join(' ');
};

/**
 * Navy Signal Flags encoding
 * @param {string} text - The text to encode
 * @returns {string} - Signal flag representation
 */
export const encodeNavyFlags = (text) => {
  const flagMap = {
    'A': '🔵⚪', 'B': '🔴🔴', 'C': '🔵⚪🔴⚪🔵', 'D': '🟡🔵', 'E': '🔴🔵',
    'F': '⚪🔴◆', 'G': '🟡🔵🟡🔵🟡🔵', 'H': '⚪🔴⚪🔴', 'I': '🟡●', 'J': '🔵⚪🔵',
    'K': '🟡🔵', 'L': '🟡⬛🟡⬛', 'M': '🔵⚪🔵⚪', 'N': '🔵⚪🔵⚪', 'O': '🔴🟡',
    'P': '🔵⬜', 'Q': '🟡', 'R': '🔴🟡🔴', 'S': '⚪🔵', 'T': '🔴⚪🔴',
    'U': '🔴⚪', 'V': '⚪🔴⚪🔴', 'W': '🔵⚪🔴', 'X': '⚪🔵⚪', 'Y': '🟡🔴',
    'Z': '🔴🟡🔵🟡', ' ': ' '
  };
  
  return text.toUpperCase().split('').map(char => flagMap[char] || char).join(' ');
};

/**
 * SpOnGeBoB MoCkInG text encoding
 * @param {string} text - The text to encode
 * @returns {string} - Alternating case text
 */
export const encodeSpongebob = (text) => {
  let upper = false;
  return text.split('').map(char => {
    if (/[a-zA-Z]/.test(char)) {
      upper = !upper;
      return upper ? char.toUpperCase() : char.toLowerCase();
    }
    return char;
  }).join('');
};

/**
 * UwU-ify text encoding
 * @param {string} text - The text to encode
 * @returns {string} - UwU-ified text
 */
export const encodeUwU = (text) => {
  let result = text
    .replace(/[rl]/g, 'w')
    .replace(/[RL]/g, 'W')
    .replace(/n([aeiou])/g, 'ny$1')
    .replace(/N([aeiou])/g, 'Ny$1')
    .replace(/N([AEIOU])/g, 'NY$1')
    .replace(/ove/g, 'uv')
    .replace(/!+/g, '! OwO ')
    .replace(/\?+/g, '? UwU ');
  
  // Add occasional faces
  const faces = ['UwU', 'OwO', '>w<', '^w^', 'uwu'];
  if (Math.random() > 0.5) {
    result += ' ' + faces[Math.floor(Math.random() * faces.length)];
  }
  
  return result;
};

/**
 * Morse with emojis encoding
 * @param {string} text - The text to encode
 * @returns {string} - Morse with visual dots and dashes
 */
export const encodeMorseEmoji = (text) => {
  const morseMap = {
    'A': '⚫➖', 'B': '➖⚫⚫⚫', 'C': '➖⚫➖⚫', 'D': '➖⚫⚫',
    'E': '⚫', 'F': '⚫⚫➖⚫', 'G': '➖➖⚫', 'H': '⚫⚫⚫⚫',
    'I': '⚫⚫', 'J': '⚫➖➖➖', 'K': '➖⚫➖', 'L': '⚫➖⚫⚫',
    'M': '➖➖', 'N': '➖⚫', 'O': '➖➖➖', 'P': '⚫➖➖⚫',
    'Q': '➖➖⚫➖', 'R': '⚫➖⚫', 'S': '⚫⚫⚫', 'T': '➖',
    'U': '⚫⚫➖', 'V': '⚫⚫⚫➖', 'W': '⚫➖➖', 'X': '➖⚫⚫➖',
    'Y': '➖⚫➖➖', 'Z': '➖➖⚫⚫',
    '0': '➖➖➖➖➖', '1': '⚫➖➖➖➖', '2': '⚫⚫➖➖➖',
    '3': '⚫⚫⚫➖➖', '4': '⚫⚫⚫⚫➖', '5': '⚫⚫⚫⚫⚫',
    '6': '➖⚫⚫⚫⚫', '7': '➖➖⚫⚫⚫', '8': '➖➖➖⚫⚫',
    '9': '➖➖➖➖⚫', ' ': '   '
  };
  
  return text.toUpperCase().split('').map(char => morseMap[char] || char).join(' ');
};

/**
 * Vaporwave aesthetic text encoding
 * @param {string} text - The text to encode
 * @returns {string} - Full-width text
 */
export const encodeVaporwave = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    // Convert ASCII to full-width
    if (code >= 33 && code <= 126) {
      return String.fromCharCode(code + 65248);
    }
    if (code === 32) return '　'; // Full-width space
    return char;
  }).join('');
};

/**
 * Tiny/Superscript text encoding
 * @param {string} text - The text to encode
 * @returns {string} - Tiny text
 */
export const encodeTinyText = (text) => {
  const tinyMap = {
    'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ',
    'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ',
    'o': 'ᵒ', 'p': 'ᵖ', 'q': 'q', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ',
    'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
    'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᶜ', 'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ᶠ', 'G': 'ᴳ',
    'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ',
    'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'Q', 'R': 'ᴿ', 'S': 'ˢ', 'T': 'ᵀ', 'U': 'ᵁ',
    'V': 'ⱽ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ',
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };
  
  return text.split('').map(char => tinyMap[char] || char).join('');
};

/**
 * Medieval/Blackletter style encoding
 * @param {string} text - The text to encode
 * @returns {string} - Medieval style text
 */
export const encodeMedieval = (text) => {
  const medievalMap = {
    'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊',
    'H': 'ℌ', 'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑',
    'O': '𝔒', 'P': '𝔓', 'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘',
    'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ',
    'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤',
    'h': '𝔥', 'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫',
    'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱', 'u': '𝔲',
    'v': '𝔳', 'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷'
  };
  
  return text.split('').map(char => medievalMap[char] || char).join('');
};

/**
 * Strikethrough text encoding
 * @param {string} text - The text to encode
 * @returns {string} - Strikethrough text
 */
export const encodeStrikethrough = (text) => {
  return text.split('').map(char => char + '\u0336').join('');
};

/**
 * Underline text encoding
 * @param {string} text - The text to encode
 * @returns {string} - Underlined text
 */
export const encodeUnderline = (text) => {
  return text.split('').map(char => char + '\u0332').join('');
};

/**
 * Redacted text encoding - randomly redacts characters
 * @param {string} text - The text to encode
 * @returns {string} - Redacted text
 */
export const encodeRedacted = (text) => {
  return text.split('').map(char => {
    if (char === ' ') return ' ';
    return Math.random() < 0.4 ? '█' : char;
  }).join('');
};

/**
 * Keyboard shift encoding - shifts keys right on QWERTY keyboard
 * @param {string} text - The text to encode
 * @returns {string} - Shifted text
 */
export const encodeKeyboardShift = (text) => {
  const shiftMap = {
    'a': 's', 'b': 'n', 'c': 'v', 'd': 'f', 'e': 'r', 'f': 'g', 'g': 'h',
    'h': 'j', 'i': 'o', 'j': 'k', 'k': 'l', 'l': ';', 'm': ',', 'n': 'm',
    'o': 'p', 'p': '[', 'q': 'w', 'r': 't', 's': 'd', 't': 'y', 'u': 'i',
    'v': 'b', 'w': 'e', 'x': 'c', 'y': 'u', 'z': 'x'
  };
  return text.toLowerCase().split('').map(char => shiftMap[char] || char).join('');
};

/**
 * Decodes keyboard shift back to normal
 */
export const decodeKeyboardShift = (text) => {
  const reverseMap = {
    's': 'a', 'n': 'b', 'v': 'c', 'f': 'd', 'r': 'e', 'g': 'f', 'h': 'g',
    'j': 'h', 'o': 'i', 'k': 'j', 'l': 'k', ';': 'l', ',': 'm', 'm': 'n',
    'p': 'o', '[': 'p', 'w': 'q', 't': 'r', 'd': 's', 'y': 't', 'i': 'u',
    'b': 'v', 'e': 'w', 'c': 'x', 'u': 'y', 'x': 'z'
  };
  return text.toLowerCase().split('').map(char => reverseMap[char] || char).join('');
};

/**
 * Emojipasta encoding - adds random emojis between words
 * @param {string} text - The text to encode
 * @returns {string} - Emojipasta text
 */
export const encodeEmojipasta = (text) => {
  const emojis = ['😂', '🔥', '💯', '👀', '😭', '💀', '🤣', '😍', '🥺', '✨', '💕', '🙏', '😤', '👏', '💪'];
  return text.split(' ').map(word => {
    const numEmojis = Math.floor(Math.random() * 3) + 1;
    const randomEmojis = Array(numEmojis).fill(0).map(() => 
      emojis[Math.floor(Math.random() * emojis.length)]
    ).join('');
    return word + ' ' + randomEmojis;
  }).join(' ');
};

/**
 * Tally marks encoding - represents letters as tally marks
 * @param {string} text - The text to encode
 * @returns {string} - Tally marks representation
 */
export const encodeTally = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (/[a-z]/.test(char)) {
      const num = char.charCodeAt(0) - 96;
      const fives = Math.floor(num / 5);
      const ones = num % 5;
      return '卌'.repeat(fives) + '|'.repeat(ones);
    }
    if (char === ' ') return '  ';
    return char;
  }).join(' ');
};

/**
 * Whitespace steganography - encodes text as spaces and tabs
 * @param {string} text - The text to encode
 * @returns {string} - Whitespace encoded text
 */
export const encodeWhitespace = (text) => {
  return text.split('').map(char => {
    const binary = char.charCodeAt(0).toString(2).padStart(8, '0');
    return binary.replace(/0/g, ' ').replace(/1/g, '\t');
  }).join('');
};

/**
 * Decodes whitespace steganography
 */
export const decodeWhitespace = (text) => {
  try {
    const binary = text.replace(/ /g, '0').replace(/\t/g, '1');
    let result = '';
    for (let i = 0; i < binary.length; i += 8) {
      result += String.fromCharCode(parseInt(binary.slice(i, i + 8), 2));
    }
    return result;
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Acrostic generator - creates an acrostic poem from text
 * @param {string} text - The text to encode
 * @returns {string} - Acrostic poem
 */
export const encodeAcrostic = (text) => {
  const words = {
    'a': 'Amazing', 'b': 'Brilliant', 'c': 'Creative', 'd': 'Daring', 'e': 'Elegant',
    'f': 'Fantastic', 'g': 'Graceful', 'h': 'Heroic', 'i': 'Incredible', 'j': 'Joyful',
    'k': 'Kind', 'l': 'Lovely', 'm': 'Magical', 'n': 'Noble', 'o': 'Outstanding',
    'p': 'Perfect', 'q': 'Quick', 'r': 'Radiant', 's': 'Stunning', 't': 'Terrific',
    'u': 'Unique', 'v': 'Vibrant', 'w': 'Wonderful', 'x': 'Xtraordinary', 'y': 'Youthful',
    'z': 'Zealous'
  };
  return text.toLowerCase().split('').filter(c => /[a-z]/.test(c)).map(char => 
    words[char] || char.toUpperCase()
  ).join('\n');
};
