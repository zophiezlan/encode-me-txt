/**
 * Classic Encoders
 * Traditional encoding methods like Morse Code, Braille, and NATO Phonetic
 *
 * NOTE: This module uses Unicode visual symbols (• and −) for better display.
 * For ASCII-compatible Morse or parameterized variants, see parameterized.js.
 * See ARCHITECTURE.md for design rationale on keeping these separate.
 *
 * Refactored to use shared utilities from shared.js where applicable.
 */

import { createMapEncoder, createMapDecoder } from "./shared.js";

// Braille lookup tables
const BRAILLE_MAP = {
  a: "⠁",
  b: "⠃",
  c: "⠉",
  d: "⠙",
  e: "⠑",
  f: "⠋",
  g: "⠛",
  h: "⠓",
  i: "⠊",
  j: "⠚",
  k: "⠅",
  l: "⠇",
  m: "⠍",
  n: "⠝",
  o: "⠕",
  p: "⠏",
  q: "⠟",
  r: "⠗",
  s: "⠎",
  t: "⠞",
  u: "⠥",
  v: "⠧",
  w: "⠺",
  x: "⠭",
  y: "⠽",
  z: "⠵",
  " ": "⠀",
  0: "⠚",
  1: "⠁",
  2: "⠃",
  3: "⠉",
  4: "⠙",
  5: "⠑",
  6: "⠋",
  7: "⠛",
  8: "⠓",
  9: "⠊",
  ".": "⠲",
  ",": "⠂",
  "!": "⠖",
  "?": "⠦",
};

/**
 * Encodes text to Braille patterns using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Braille representation
 */
export const encodeBraille = createMapEncoder(BRAILLE_MAP, { lowercase: true });

/**
 * Decodes Braille patterns back to text using shared utility
 * @param {string} text - The Braille to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeBraille = (text) => {
  try {
    const decoder = createMapDecoder(BRAILLE_MAP);
    return decoder(text);
  } catch {
    return "[Decode failed]";
  }
};
