/**
 * Linguistic Encoders
 * Greek, Cyrillic, Hebrew, Korean, and IPA transcription
 */

// Greek alphabet mapping
const GREEK_MAP = {
  'a': 'α', 'b': 'β', 'c': 'ψ', 'd': 'δ', 'e': 'ε', 'f': 'φ', 'g': 'γ',
  'h': 'η', 'i': 'ι', 'j': 'ξ', 'k': 'κ', 'l': 'λ', 'm': 'μ', 'n': 'ν',
  'o': 'ο', 'p': 'π', 'q': 'θ', 'r': 'ρ', 's': 'σ', 't': 'τ', 'u': 'υ',
  'v': 'ω', 'w': 'ς', 'x': 'χ', 'y': 'υ', 'z': 'ζ'
};

const GREEK_REVERSE = Object.fromEntries(Object.entries(GREEK_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Greek alphabet
 */
export const encodeGreek = (text) => {
  return text.toLowerCase().split('').map(char => GREEK_MAP[char] || char).join('');
};

/**
 * Decodes Greek alphabet back to Latin
 */
export const decodeGreek = (text) => {
  return text.split('').map(char => GREEK_REVERSE[char] || char).join('');
};

// Cyrillic alphabet mapping
const CYRILLIC_MAP = {
  'a': 'а', 'b': 'б', 'c': 'ц', 'd': 'д', 'e': 'е', 'f': 'ф', 'g': 'г',
  'h': 'х', 'i': 'и', 'j': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н',
  'o': 'о', 'p': 'п', 'q': 'к', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у',
  'v': 'в', 'w': 'в', 'x': 'кс', 'y': 'ы', 'z': 'з'
};

const CYRILLIC_REVERSE = Object.fromEntries(Object.entries(CYRILLIC_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Cyrillic script
 */
export const encodeCyrillic = (text) => {
  return text.toLowerCase().split('').map(char => CYRILLIC_MAP[char] || char).join('');
};

/**
 * Decodes Cyrillic back to Latin
 */
export const decodeCyrillic = (text) => {
  return text.split('').map(char => CYRILLIC_REVERSE[char] || char).join('');
};

// Hebrew alphabet mapping
const HEBREW_MAP = {
  'a': 'א', 'b': 'ב', 'c': 'צ', 'd': 'ד', 'e': 'ע', 'f': 'פ', 'g': 'ג',
  'h': 'ה', 'i': 'י', 'j': 'ג', 'k': 'כ', 'l': 'ל', 'm': 'מ', 'n': 'נ',
  'o': 'ו', 'p': 'פ', 'q': 'ק', 'r': 'ר', 's': 'ס', 't': 'ת', 'u': 'ו',
  'v': 'ו', 'w': 'ו', 'x': 'קס', 'y': 'י', 'z': 'ז'
};

const HEBREW_REVERSE = Object.fromEntries(Object.entries(HEBREW_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Hebrew alephbet
 */
export const encodeHebrew = (text) => {
  return text.toLowerCase().split('').map(char => HEBREW_MAP[char] || char).join('');
};

/**
 * Decodes Hebrew back to Latin
 */
export const decodeHebrew = (text) => {
  return text.split('').map(char => HEBREW_REVERSE[char] || char).join('');
};

// Korean Hangul mapping (basic consonant/vowel approximations)
const KOREAN_MAP = {
  'a': '아', 'b': '브', 'c': '츠', 'd': '드', 'e': '에', 'f': '프', 'g': '그',
  'h': '흐', 'i': '이', 'j': '즈', 'k': '크', 'l': '을', 'm': '음', 'n': '은',
  'o': '오', 'p': '프', 'q': '크', 'r': '르', 's': '스', 't': '트', 'u': '우',
  'v': '브', 'w': '우', 'x': '크스', 'y': '이', 'z': '즈'
};

const KOREAN_REVERSE = Object.fromEntries(Object.entries(KOREAN_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Korean Hangul
 */
export const encodeKorean = (text) => {
  return text.toLowerCase().split('').map(char => KOREAN_MAP[char] || char).join('');
};

/**
 * Decodes Korean Hangul back to Latin
 */
export const decodeKorean = (text) => {
  return text.split('').map(char => KOREAN_REVERSE[char] || char).join('');
};

// IPA (International Phonetic Alphabet) approximation
const IPA_MAP = {
  'a': 'æ', 'b': 'b', 'c': 'k', 'd': 'd', 'e': 'ɛ', 'f': 'f', 'g': 'g',
  'h': 'h', 'i': 'ɪ', 'j': 'dʒ', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n',
  'o': 'ɒ', 'p': 'p', 'q': 'kw', 'r': 'ɹ', 's': 's', 't': 't', 'u': 'ʌ',
  'v': 'v', 'w': 'w', 'x': 'ks', 'y': 'j', 'z': 'z'
};

/**
 * Encodes text to IPA (phonetic transcription approximation)
 */
export const encodeIPA = (text) => {
  return '/' + text.toLowerCase().split('').map(char => IPA_MAP[char] || char).join('') + '/';
};
