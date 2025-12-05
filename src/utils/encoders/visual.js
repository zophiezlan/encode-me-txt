/**
 * Visual Encoders
 * ASL Fingerspelling, 7-Segment Display, Dancing Men
 */

// ASL Fingerspelling using hand sign emojis (approximations)
const ASL_MAP = {
  'a': '🤙', 'b': '🖐️', 'c': '🤏', 'd': '☝️', 'e': '✊', 'f': '👌', 'g': '🤞',
  'h': '🤟', 'i': '🤙', 'j': '🤙', 'k': '✌️', 'l': '🤟', 'm': '✊', 'n': '✊',
  'o': '👌', 'p': '👇', 'q': '👇', 'r': '✌️', 's': '✊', 't': '✊', 'u': '✌️',
  'v': '✌️', 'w': '🤟', 'x': '☝️', 'y': '🤙', 'z': '☝️'
};

/**
 * Encodes text to ASL fingerspelling representation
 */
export const encodeASL = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char === ' ') return '  ';
    return ASL_MAP[char] || char;
  }).join(' ');
};

// 7-Segment Display encoding
const SEVEN_SEGMENT_MAP = {
  '0': '🯰', '1': '🯱', '2': '🯲', '3': '🯳', '4': '🯴',
  '5': '🯵', '6': '🯶', '7': '🯷', '8': '🯸', '9': '🯹',
  'a': '[Ā]', 'b': '[b]', 'c': '[C]', 'd': '[d]', 'e': '[E]', 'f': '[F]',
  'g': '[9]', 'h': '[H]', 'i': '[I]', 'j': '[J]', 'k': '[K]', 'l': '[L]',
  'm': '[M]', 'n': '[n]', 'o': '[0]', 'p': '[P]', 'q': '[q]', 'r': '[r]',
  's': '[5]', 't': '[t]', 'u': '[U]', 'v': '[V]', 'w': '[W]', 'x': '[X]',
  'y': '[Y]', 'z': '[2]'
};

/**
 * Encodes text to 7-segment display representation
 */
export const encodeSevenSegment = (text) => {
  return text.toLowerCase().split('').map(char => SEVEN_SEGMENT_MAP[char] || char).join('');
};

// Dancing Men cipher (Sherlock Holmes)
const DANCING_MEN_MAP = {
  'a': '🕺', 'b': '💃', 'c': '🕴️', 'd': '🧍', 'e': '🧎', 'f': '🚶',
  'g': '🏃', 'h': '🤸', 'i': '🏌️', 'j': '🏋️', 'k': '⛹️', 'l': '🤾',
  'm': '🏊', 'n': '🚣', 'o': '🧗', 'p': '🤺', 'q': '🏇', 'r': '⛷️',
  's': '🏂', 't': '🪂', 'u': '🤼', 'v': '🤽', 'w': '🤹', 'x': '🧘',
  'y': '🛀', 'z': '🛌'
};

const DANCING_MEN_REVERSE = Object.fromEntries(Object.entries(DANCING_MEN_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Dancing Men cipher (stick figures)
 */
export const encodeDancingMen = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char === ' ') return '|';
    return DANCING_MEN_MAP[char] || char;
  }).join('');
};

/**
 * Decodes Dancing Men back to Latin
 */
export const decodeDancingMen = (text) => {
  return [...text].map(char => {
    if (char === '|') return ' ';
    return DANCING_MEN_REVERSE[char] || char;
  }).join('');
};

// Pigpen cipher symbols
const PIGPEN_MAP = {
  'a': '┘', 'b': '└', 'c': '┐', 'd': '│', 'e': '─', 'f': '┌',
  'g': '┤', 'h': '├', 'i': '┬', 'j': '┴', 'k': '┼', 'l': '═',
  'm': '║', 'n': '╔', 'o': '╗', 'p': '╚', 'q': '╝', 'r': '╠',
  's': '╣', 't': '╦', 'u': '╩', 'v': '╬', 'w': '◊', 'x': '□',
  'y': '○', 'z': '●'
};

const PIGPEN_REVERSE = Object.fromEntries(Object.entries(PIGPEN_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Pigpen cipher
 */
export const encodePigpen = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char === ' ') return ' ';
    return PIGPEN_MAP[char] || char;
  }).join('');
};

/**
 * Decodes Pigpen cipher back to Latin
 */
export const decodePigpen = (text) => {
  return text.split('').map(char => PIGPEN_REVERSE[char] || char).join('');
};
