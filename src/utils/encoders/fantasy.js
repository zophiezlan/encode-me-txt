/**
 * Fantasy/Fictional Script Encoders
 * Aurebesh, Gallifreyan, Elvish/Tengwar, Klingon
 *
 * Refactored to use shared utilities from shared.js where applicable.
 */

import { createMapEncoder, createMapDecoder } from "./shared.js";

// Aurebesh (Star Wars) mapping using Unicode approximations
const AUREBESH_MAP = {
  a: "𐤀",
  b: "𐤁",
  c: "𐤂",
  d: "𐤃",
  e: "𐤄",
  f: "𐤅",
  g: "𐤆",
  h: "𐤇",
  i: "𐤈",
  j: "𐤉",
  k: "𐤊",
  l: "𐤋",
  m: "𐤌",
  n: "𐤍",
  o: "𐤎",
  p: "𐤏",
  q: "𐤐",
  r: "𐤑",
  s: "𐤒",
  t: "𐤓",
  u: "𐤔",
  v: "𐤕",
  w: "𐤖",
  x: "𐤗",
  y: "𐤘",
  z: "𐤙",
};

/**
 * Encodes text to Aurebesh (Star Wars galaxy script) using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Aurebesh encoded text
 */
export const encodeAurebesh = createMapEncoder(AUREBESH_MAP, {
  lowercase: true,
});

/**
 * Decodes Aurebesh back to Latin using shared utility
 * @param {string} text - The text to decode
 * @returns {string} - Decoded text
 */
export const decodeAurebesh = createMapDecoder(AUREBESH_MAP);

// Circular Gallifreyan (Doctor Who) - using circles and symbols
const GALLIFREYAN_MAP = {
  a: "◐",
  b: "◑",
  c: "◒",
  d: "◓",
  e: "◔",
  f: "◕",
  g: "◖",
  h: "◗",
  i: "◌",
  j: "◍",
  k: "◎",
  l: "●",
  m: "○",
  n: "◉",
  o: "◯",
  p: "⊙",
  q: "⊚",
  r: "⊛",
  s: "⊜",
  t: "⊝",
  u: "⦿",
  v: "⊖",
  w: "⊗",
  x: "⊘",
  y: "⊕",
  z: "⊜",
};

/**
 * Encodes text to Circular Gallifreyan style using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Gallifreyan encoded text
 */
export const encodeGallifreyan = createMapEncoder(GALLIFREYAN_MAP, {
  lowercase: true,
});

/**
 * Decodes Gallifreyan back to Latin using shared utility
 * @param {string} text - The text to decode
 * @returns {string} - Decoded text
 */
export const decodeGallifreyan = createMapDecoder(GALLIFREYAN_MAP);

// Elvish/Tengwar (Lord of the Rings) - using Unicode Tengwar approximations
const ELVISH_MAP = {
  a: "ᚨ",
  b: "ᛒ",
  c: "ᚲ",
  d: "ᛞ",
  e: "ᛖ",
  f: "ᚠ",
  g: "ᚷ",
  h: "ᚺ",
  i: "ᛁ",
  j: "ᛃ",
  k: "ᚲ",
  l: "ᛚ",
  m: "ᛗ",
  n: "ᚾ",
  o: "ᛟ",
  p: "ᛈ",
  q: "ᚲᚹ",
  r: "ᚱ",
  s: "ᛋ",
  t: "ᛏ",
  u: "ᚢ",
  v: "ᚡ",
  w: "ᚹ",
  x: "ᚲᛋ",
  y: "ᚤ",
  z: "ᛉ",
};

/**
 * Encodes text to Elvish/Tengwar style using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Elvish encoded text
 */
export const encodeElvish = createMapEncoder(ELVISH_MAP, { lowercase: true });

/**
 * Decodes Elvish back to Latin using shared utility
 * @param {string} text - The text to decode
 * @returns {string} - Decoded text
 */
export const decodeElvish = createMapDecoder(ELVISH_MAP);

// Klingon pIqaD (Star Trek) - Using ConScript Private Use Area (U+F8D0-U+F8FF)
// These characters require a Klingon font to display properly (e.g., pIqaD qolqoS)
const KLINGON_MAP = {
  a: "\uF8D0",
  b: "\uF8D1",
  ch: "\uF8D2",
  d: "\uF8D3",
  e: "\uF8D4",
  gh: "\uF8D5",
  h: "\uF8D6",
  i: "\uF8D7",
  j: "\uF8D8",
  l: "\uF8D9",
  m: "\uF8DA",
  n: "\uF8DB",
  ng: "\uF8DC",
  o: "\uF8DD",
  p: "\uF8DE",
  q: "\uF8DF",
  Q: "\uF8E0",
  r: "\uF8E1",
  s: "\uF8E2",
  t: "\uF8E3",
  tlh: "\uF8E4",
  u: "\uF8E5",
  v: "\uF8E6",
  w: "\uF8E7",
  y: "\uF8E8",
  "'": "\uF8E9",
  0: "\uF8F0",
  1: "\uF8F1",
  2: "\uF8F2",
  3: "\uF8F3",
  4: "\uF8F4",
  5: "\uF8F5",
  6: "\uF8F6",
  7: "\uF8F7",
  8: "\uF8F8",
  9: "\uF8F9",
  " ": " ",
};

const KLINGON_REVERSE = Object.fromEntries(
  Object.entries(KLINGON_MAP).map(([k, v]) => [v, k]),
);

/**
 * Encodes text to Klingon pIqaD script
 * Note: Requires a Klingon font to display correctly
 */
export const encodeKlingon = (text) => {
  let result = "";
  const lower = text.toLowerCase();
  let i = 0;

  while (i < lower.length) {
    // Check for trigraph 'tlh' first
    if (i + 2 < lower.length && lower.slice(i, i + 3) === "tlh") {
      result += KLINGON_MAP["tlh"];
      i += 3;
      // Check for digraphs: ch, gh, ng
    } else if (i + 1 < lower.length) {
      const digraph = lower.slice(i, i + 2);
      if (KLINGON_MAP[digraph]) {
        result += KLINGON_MAP[digraph];
        i += 2;
      } else {
        result += KLINGON_MAP[lower[i]] || lower[i];
        i++;
      }
    } else {
      result += KLINGON_MAP[lower[i]] || lower[i];
      i++;
    }
  }
  return result;
};

/**
 * Decodes Klingon pIqaD back to Latin transliteration
 */
export const decodeKlingon = (text) => {
  return [...text].map((char) => KLINGON_REVERSE[char] || char).join("");
};
