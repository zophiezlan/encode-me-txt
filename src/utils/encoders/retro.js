/**
 * Retro Encoders
 * Phone Keypad (T9), Pager Code, IBM Punch Card, Baudot Code
 */

// Phone Keypad (T9 Multi-tap)
const PHONE_KEYPAD_MAP = {
  a: "2",
  b: "22",
  c: "222",
  d: "3",
  e: "33",
  f: "333",
  g: "4",
  h: "44",
  i: "444",
  j: "5",
  k: "55",
  l: "555",
  m: "6",
  n: "66",
  o: "666",
  p: "7",
  q: "77",
  r: "777",
  s: "7777",
  t: "8",
  u: "88",
  v: "888",
  w: "9",
  x: "99",
  y: "999",
  z: "9999",
  " ": "0",
  1: "1",
};

/**
 * Encodes text to Phone Keypad (T9 multi-tap)
 */
export const encodePhoneKeypad = (text) => {
  return text
    .toLowerCase()
    .split("")
    .map((char) => PHONE_KEYPAD_MAP[char] || char)
    .join("-");
};

/**
 * Decodes Phone Keypad back to text
 */
export const decodePhoneKeypad = (text) => {
  const REVERSE_MAP = {
    2: "a",
    22: "b",
    222: "c",
    3: "d",
    33: "e",
    333: "f",
    4: "g",
    44: "h",
    444: "i",
    5: "j",
    55: "k",
    555: "l",
    6: "m",
    66: "n",
    666: "o",
    7: "p",
    77: "q",
    777: "r",
    7777: "s",
    8: "t",
    88: "u",
    888: "v",
    9: "w",
    99: "x",
    999: "y",
    9999: "z",
    0: " ",
    1: "1",
  };
  return text
    .split("-")
    .map((code) => REVERSE_MAP[code] || code)
    .join("");
};

// Pager Code (143 = I Love You style) - each letter has a unique code
const PAGER_CODE_MAP = {
  a: "8",
  b: "13",
  c: "6",
  d: "0",
  e: "3",
  f: "4",
  g: "9",
  h: "44",
  i: "1",
  j: "77",
  k: "15",
  l: "7",
  m: "177",
  n: "17",
  o: "0",
  p: "91",
  q: "01",
  r: "12",
  s: "5",
  t: "71",
  u: "11",
  v: "111",
  w: "1111",
  x: "25",
  y: "41",
  z: "2",
};

/**
 * Encodes text to Pager Code style
 */
export const encodePagerCode = (text) => {
  return text
    .toLowerCase()
    .split("")
    .map((char) => {
      if (char === " ") return "*";
      return PAGER_CODE_MAP[char] || char;
    })
    .join("-");
};

// IBM Punch Card representation
const PUNCH_CARD_MAP = {
  a: "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛",
  b: "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛⬜",
  c: "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬛⬜⬜",
  d: "⬛⬜⬜⬜⬜⬜⬜⬜⬛⬜⬜⬜",
  e: "⬛⬜⬜⬜⬜⬜⬜⬛⬜⬜⬜⬜",
  f: "⬛⬜⬜⬜⬜⬜⬛⬜⬜⬜⬜⬜",
  g: "⬛⬜⬜⬜⬜⬛⬜⬜⬜⬜⬜⬜",
  h: "⬛⬜⬜⬜⬛⬜⬜⬜⬜⬜⬜⬜",
  i: "⬛⬜⬜⬛⬜⬜⬜⬜⬜⬜⬜⬜",
  j: "⬜⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛",
  k: "⬜⬛⬜⬜⬜⬜⬜⬜⬜⬜⬛⬜",
  l: "⬜⬛⬜⬜⬜⬜⬜⬜⬜⬛⬜⬜",
  m: "⬜⬛⬜⬜⬜⬜⬜⬜⬛⬜⬜⬜",
  n: "⬜⬛⬜⬜⬜⬜⬜⬛⬜⬜⬜⬜",
  o: "⬜⬛⬜⬜⬜⬜⬛⬜⬜⬜⬜⬜",
  p: "⬜⬛⬜⬜⬜⬛⬜⬜⬜⬜⬜⬜",
  q: "⬜⬛⬜⬜⬛⬜⬜⬜⬜⬜⬜⬜",
  r: "⬜⬛⬜⬛⬜⬜⬜⬜⬜⬜⬜⬜",
  s: "⬜⬜⬛⬜⬜⬜⬜⬜⬜⬜⬛⬜",
  t: "⬜⬜⬛⬜⬜⬜⬜⬜⬜⬛⬜⬜",
  u: "⬜⬜⬛⬜⬜⬜⬜⬜⬛⬜⬜⬜",
  v: "⬜⬜⬛⬜⬜⬜⬜⬛⬜⬜⬜⬜",
  w: "⬜⬜⬛⬜⬜⬜⬛⬜⬜⬜⬜⬜",
  x: "⬜⬜⬛⬜⬜⬛⬜⬜⬜⬜⬜⬜",
  y: "⬜⬜⬛⬜⬛⬜⬜⬜⬜⬜⬜⬜",
  z: "⬜⬜⬛⬛⬜⬜⬜⬜⬜⬜⬜⬜",
};

/**
 * Encodes text to IBM Punch Card representation
 */
export const encodePunchCard = (text) => {
  return text
    .toLowerCase()
    .split("")
    .map((char) => {
      if (char === " ") return "⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜";
      return PUNCH_CARD_MAP[char] || "⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜";
    })
    .join("\n");
};

// Baudot Code (5-bit teleprinter code)
const BAUDOT_MAP = {
  a: "●●○○○",
  b: "●○○●●",
  c: "○●●●○",
  d: "●○○●○",
  e: "●○○○○",
  f: "●○●●○",
  g: "○●○●●",
  h: "○○●○●",
  i: "○●●○○",
  j: "●●○●○",
  k: "●●●●○",
  l: "○●○○●",
  m: "○○●●●",
  n: "○○●●○",
  o: "○○○●●",
  p: "○●●○●",
  q: "●●●○●",
  r: "○●○●○",
  s: "●○●○○",
  t: "○○○○●",
  u: "●●●○○",
  v: "○●●●●",
  w: "●●○○●",
  x: "●○●●●",
  y: "●○●○●",
  z: "●○○○●",
  " ": "○○●○○",
};

const BAUDOT_REVERSE = Object.fromEntries(
  Object.entries(BAUDOT_MAP).map(([k, v]) => [v, k]),
);

/**
 * Encodes text to Baudot Code
 */
export const encodeBaudot = (text) => {
  return text
    .toLowerCase()
    .split("")
    .map((char) => BAUDOT_MAP[char] || char)
    .join(" ");
};

/**
 * Decodes Baudot Code back to text
 */
export const decodeBaudot = (text) => {
  return text
    .split(" ")
    .map((code) => BAUDOT_REVERSE[code] || code)
    .join("");
};

// Resistor Color Code
const RESISTOR_COLORS = [
  "Black",
  "Brown",
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Violet",
  "Gray",
  "White",
];
const RESISTOR_EMOJIS = [
  "⬛",
  "🟫",
  "🔴",
  "🟠",
  "🟡",
  "🟢",
  "🔵",
  "🟣",
  "⬜",
  "⚪",
];

/**
 * Encodes numbers to Resistor Color Code
 */
export const encodeResistor = (text) => {
  return text
    .split("")
    .map((char) => {
      const num = parseInt(char);
      if (!isNaN(num) && num >= 0 && num <= 9) {
        return `${RESISTOR_EMOJIS[num]}${RESISTOR_COLORS[num]}`;
      }
      return char;
    })
    .join(" ");
};
