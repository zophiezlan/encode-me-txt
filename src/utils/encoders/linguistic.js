/**
 * Linguistic Encoders
 * Greek, Cyrillic, Hebrew, Korean, and IPA transcription
 * 
 * Refactored to use shared utilities from shared.js where applicable.
 */

import { createMapEncoder, createMapDecoder } from './shared.js';

// Greek alphabet mapping
const GREEK_MAP = {
  'a': 'α', 'b': 'β', 'c': 'ψ', 'd': 'δ', 'e': 'ε', 'f': 'φ', 'g': 'γ',
  'h': 'η', 'i': 'ι', 'j': 'ξ', 'k': 'κ', 'l': 'λ', 'm': 'μ', 'n': 'ν',
  'o': 'ο', 'p': 'π', 'q': 'θ', 'r': 'ρ', 's': 'σ', 't': 'τ', 'u': 'υ',
  'v': 'ω', 'w': 'ς', 'x': 'χ', 'y': 'υ', 'z': 'ζ'
};

/**
 * Encodes text to Greek alphabet using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Greek encoded text
 */
export const encodeGreek = createMapEncoder(GREEK_MAP, { lowercase: true });

/**
 * Decodes Greek alphabet back to Latin using shared utility
 * @param {string} text - The text to decode
 * @returns {string} - Decoded text
 */
export const decodeGreek = createMapDecoder(GREEK_MAP);

// Cyrillic alphabet mapping
const CYRILLIC_MAP = {
  'a': 'а', 'b': 'б', 'c': 'ц', 'd': 'д', 'e': 'е', 'f': 'ф', 'g': 'г',
  'h': 'х', 'i': 'и', 'j': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н',
  'o': 'о', 'p': 'п', 'q': 'к', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у',
  'v': 'в', 'w': 'в', 'x': 'кс', 'y': 'ы', 'z': 'з'
};

/**
 * Encodes text to Cyrillic script using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Cyrillic encoded text
 */
export const encodeCyrillic = createMapEncoder(CYRILLIC_MAP, { lowercase: true });

/**
 * Decodes Cyrillic back to Latin using shared utility
 * @param {string} text - The text to decode
 * @returns {string} - Decoded text
 */
export const decodeCyrillic = createMapDecoder(CYRILLIC_MAP);

// Hebrew alphabet mapping
const HEBREW_MAP = {
  'a': 'א', 'b': 'ב', 'c': 'צ', 'd': 'ד', 'e': 'ע', 'f': 'פ', 'g': 'ג',
  'h': 'ה', 'i': 'י', 'j': 'ג', 'k': 'כ', 'l': 'ל', 'm': 'מ', 'n': 'נ',
  'o': 'ו', 'p': 'פ', 'q': 'ק', 'r': 'ר', 's': 'ס', 't': 'ת', 'u': 'ו',
  'v': 'ו', 'w': 'ו', 'x': 'קס', 'y': 'י', 'z': 'ז'
};

/**
 * Encodes text to Hebrew alephbet using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Hebrew encoded text
 */
export const encodeHebrew = createMapEncoder(HEBREW_MAP, { lowercase: true });

/**
 * Decodes Hebrew back to Latin using shared utility
 * @param {string} text - The text to decode
 * @returns {string} - Decoded text
 */
export const decodeHebrew = createMapDecoder(HEBREW_MAP);

// Korean Hangul mapping (basic consonant/vowel approximations)
const KOREAN_MAP = {
  'a': '아', 'b': '브', 'c': '츠', 'd': '드', 'e': '에', 'f': '프', 'g': '그',
  'h': '흐', 'i': '이', 'j': '즈', 'k': '크', 'l': '을', 'm': '음', 'n': '은',
  'o': '오', 'p': '프', 'q': '크', 'r': '르', 's': '스', 't': '트', 'u': '우',
  'v': '브', 'w': '우', 'x': '크스', 'y': '이', 'z': '즈'
};

/**
 * Encodes text to Korean Hangul using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Korean encoded text
 */
export const encodeKorean = createMapEncoder(KOREAN_MAP, { lowercase: true });

/**
 * Decodes Korean Hangul back to Latin using shared utility
 * @param {string} text - The text to decode
 * @returns {string} - Decoded text
 */
export const decodeKorean = createMapDecoder(KOREAN_MAP);

// IPA (International Phonetic Alphabet) approximation
const IPA_MAP = {
  'a': 'æ', 'b': 'b', 'c': 'k', 'd': 'd', 'e': 'ɛ', 'f': 'f', 'g': 'g',
  'h': 'h', 'i': 'ɪ', 'j': 'dʒ', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n',
  'o': 'ɒ', 'p': 'p', 'q': 'kw', 'r': 'ɹ', 's': 's', 't': 't', 'u': 'ʌ',
  'v': 'v', 'w': 'w', 'x': 'ks', 'y': 'j', 'z': 'z'
};

/**
 * Encodes text to IPA (phonetic transcription approximation)
 * @param {string} text - The text to encode
 * @returns {string} - IPA transcription with slashes
 */
export const encodeIPA = (text) => {
  const encoder = createMapEncoder(IPA_MAP, { lowercase: true });
  return '/' + encoder(text) + '/';
};
