/**
 * Fantasy/Fictional Script Encoders
 * Aurebesh, Gallifreyan, Elvish/Tengwar, Klingon
 */

// Aurebesh (Star Wars) mapping using Unicode approximations
const AUREBESH_MAP = {
  'a': '𐤀', 'b': '𐤁', 'c': '𐤂', 'd': '𐤃', 'e': '𐤄', 'f': '𐤅', 'g': '𐤆',
  'h': '𐤇', 'i': '𐤈', 'j': '𐤉', 'k': '𐤊', 'l': '𐤋', 'm': '𐤌', 'n': '𐤍',
  'o': '𐤎', 'p': '𐤏', 'q': '𐤐', 'r': '𐤑', 's': '𐤒', 't': '𐤓', 'u': '𐤔',
  'v': '𐤕', 'w': '𐤖', 'x': '𐤗', 'y': '𐤘', 'z': '𐤙'
};

const AUREBESH_REVERSE = Object.fromEntries(Object.entries(AUREBESH_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Aurebesh (Star Wars galaxy script)
 */
export const encodeAurebesh = (text) => {
  return text.toLowerCase().split('').map(char => AUREBESH_MAP[char] || char).join('');
};

/**
 * Decodes Aurebesh back to Latin
 */
export const decodeAurebesh = (text) => {
  return text.split('').map(char => AUREBESH_REVERSE[char] || char).join('');
};

// Circular Gallifreyan (Doctor Who) - using circles and symbols
const GALLIFREYAN_MAP = {
  'a': '◐', 'b': '◑', 'c': '◒', 'd': '◓', 'e': '◔', 'f': '◕', 'g': '◖',
  'h': '◗', 'i': '◌', 'j': '◍', 'k': '◎', 'l': '●', 'm': '○', 'n': '◉',
  'o': '◯', 'p': '⊙', 'q': '⊚', 'r': '⊛', 's': '⊜', 't': '⊝', 'u': '⦿',
  'v': '⊖', 'w': '⊗', 'x': '⊘', 'y': '⊕', 'z': '⊜'
};

const GALLIFREYAN_REVERSE = Object.fromEntries(Object.entries(GALLIFREYAN_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Circular Gallifreyan style
 */
export const encodeGallifreyan = (text) => {
  return text.toLowerCase().split('').map(char => GALLIFREYAN_MAP[char] || char).join('');
};

/**
 * Decodes Gallifreyan back to Latin
 */
export const decodeGallifreyan = (text) => {
  return text.split('').map(char => GALLIFREYAN_REVERSE[char] || char).join('');
};

// Elvish/Tengwar (Lord of the Rings) - using Unicode Tengwar approximations
const ELVISH_MAP = {
  'a': 'ᚨ', 'b': 'ᛒ', 'c': 'ᚲ', 'd': 'ᛞ', 'e': 'ᛖ', 'f': 'ᚠ', 'g': 'ᚷ',
  'h': 'ᚺ', 'i': 'ᛁ', 'j': 'ᛃ', 'k': 'ᚲ', 'l': 'ᛚ', 'm': 'ᛗ', 'n': 'ᚾ',
  'o': 'ᛟ', 'p': 'ᛈ', 'q': 'ᚲᚹ', 'r': 'ᚱ', 's': 'ᛋ', 't': 'ᛏ', 'u': 'ᚢ',
  'v': 'ᚡ', 'w': 'ᚹ', 'x': 'ᚲᛋ', 'y': 'ᚤ', 'z': 'ᛉ'
};

const ELVISH_REVERSE = Object.fromEntries(Object.entries(ELVISH_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Elvish/Tengwar style
 */
export const encodeElvish = (text) => {
  return text.toLowerCase().split('').map(char => ELVISH_MAP[char] || char).join('');
};

/**
 * Decodes Elvish back to Latin
 */
export const decodeElvish = (text) => {
  return text.split('').map(char => ELVISH_REVERSE[char] || char).join('');
};

// Klingon pIqaD (Star Trek)
const KLINGON_MAP = {
  'a': '', 'b': '', 'c': '', 'd': '', 'e': '', 'f': '', 'g': '',
  'h': '', 'i': '', 'j': '', 'k': '', 'l': '', 'm': '', 'n': '',
  'o': '', 'p': '', 'q': '', 'r': '', 's': '', 't': '', 'u': '',
  'v': '', 'w': '', 'x': '', 'y': '', 'z': ''
};

const KLINGON_REVERSE = Object.fromEntries(Object.entries(KLINGON_MAP).map(([k, v]) => [v, k]));

/**
 * Encodes text to Klingon pIqaD
 */
export const encodeKlingon = (text) => {
  return text.toLowerCase().split('').map(char => KLINGON_MAP[char] || char).join('');
};

/**
 * Decodes Klingon back to Latin
 */
export const decodeKlingon = (text) => {
  return text.split('').map(char => KLINGON_REVERSE[char] || char).join('');
};
