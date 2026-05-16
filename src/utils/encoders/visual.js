/**
 * Visual Encoders
 * ASL Fingerspelling, 7-Segment Display, Dancing Men
 *
 * Refactored to use shared utilities from shared.js where applicable.
 */

import { createMapEncoder, createMapDecoder } from "./shared.js";

// ASL Fingerspelling using hand sign emojis (approximations)
const ASL_MAP = {
  a: "🤙",
  b: "🖐️",
  c: "🤏",
  d: "☝️",
  e: "✊",
  f: "👌",
  g: "🤞",
  h: "🤟",
  i: "🤙",
  j: "🤙",
  k: "✌️",
  l: "🤟",
  m: "✊",
  n: "✊",
  o: "👌",
  p: "👇",
  q: "👇",
  r: "✌️",
  s: "✊",
  t: "✊",
  u: "✌️",
  v: "✌️",
  w: "🤟",
  x: "☝️",
  y: "🤙",
  z: "☝️",
  " ": "  ",
};

/**
 * Encodes text to ASL fingerspelling representation using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - ASL encoded text
 */
export const encodeASL = createMapEncoder(ASL_MAP, {
  lowercase: true,
  separator: " ",
});

// 7-Segment Display encoding
const SEVEN_SEGMENT_MAP = {
  0: "🯰",
  1: "🯱",
  2: "🯲",
  3: "🯳",
  4: "🯴",
  5: "🯵",
  6: "🯶",
  7: "🯷",
  8: "🯸",
  9: "🯹",
  a: "[Ā]",
  b: "[b]",
  c: "[C]",
  d: "[d]",
  e: "[E]",
  f: "[F]",
  g: "[9]",
  h: "[H]",
  i: "[I]",
  j: "[J]",
  k: "[K]",
  l: "[L]",
  m: "[M]",
  n: "[n]",
  o: "[0]",
  p: "[P]",
  q: "[q]",
  r: "[r]",
  s: "[5]",
  t: "[t]",
  u: "[U]",
  v: "[V]",
  w: "[W]",
  x: "[X]",
  y: "[Y]",
  z: "[2]",
};

/**
 * Encodes text to 7-segment display representation using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - 7-segment encoded text
 */
export const encodeSevenSegment = createMapEncoder(SEVEN_SEGMENT_MAP, {
  lowercase: true,
});

// Dancing Men cipher (Sherlock Holmes)
const DANCING_MEN_MAP = {
  a: "🕺",
  b: "💃",
  c: "🕴️",
  d: "🧍",
  e: "🧎",
  f: "🚶",
  g: "🏃",
  h: "🤸",
  i: "🏌️",
  j: "🏋️",
  k: "⛹️",
  l: "🤾",
  m: "🏊",
  n: "🚣",
  o: "🧗",
  p: "🤺",
  q: "🏇",
  r: "⛷️",
  s: "🏂",
  t: "🪂",
  u: "🤼",
  v: "🤽",
  w: "🤹",
  x: "🧘",
  y: "🛀",
  z: "🛌",
  " ": "|",
};

/**
 * Encodes text to Dancing Men cipher (stick figures) using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Dancing Men encoded text
 */
export const encodeDancingMen = createMapEncoder(DANCING_MEN_MAP, {
  lowercase: true,
});

/**
 * Decodes Dancing Men back to Latin using shared utility
 * @param {string} text - The text to decode
 * @returns {string} - Decoded text
 */
export const decodeDancingMen = createMapDecoder(DANCING_MEN_MAP);

// Pigpen cipher symbols
const PIGPEN_MAP = {
  a: "┘",
  b: "└",
  c: "┐",
  d: "│",
  e: "─",
  f: "┌",
  g: "┤",
  h: "├",
  i: "┬",
  j: "┴",
  k: "┼",
  l: "═",
  m: "║",
  n: "╔",
  o: "╗",
  p: "╚",
  q: "╝",
  r: "╠",
  s: "╣",
  t: "╦",
  u: "╩",
  v: "╬",
  w: "◊",
  x: "□",
  y: "○",
  z: "●",
};

/**
 * Encodes text to Pigpen cipher using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Pigpen encoded text
 */
export const encodePigpen = createMapEncoder(PIGPEN_MAP, { lowercase: true });

/**
 * Decodes Pigpen cipher back to Latin using shared utility
 * @param {string} text - The text to decode
 * @returns {string} - Decoded text
 */
export const decodePigpen = createMapDecoder(PIGPEN_MAP);
