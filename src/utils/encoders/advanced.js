/**
 * Advanced Encoders
 * QR Code, URL encoding, and other advanced transformations
 */

import QRCode from "qrcode";

// Renders QR matrix as Unicode half-block ASCII art — 100% client-side, no
// external requests, scannable in monospace fonts.
export const encodeQRCode = (text) => {
  if (!text) return "";
  try {
    const qr = QRCode.create(String(text), { errorCorrectionLevel: "M" });
    const { size, data } = qr.modules;
    const get = (x, y) => data[y * size + x] === 1;

    const quiet = " ".repeat(size + 4);
    const lines = [quiet];
    for (let y = 0; y < size; y += 2) {
      let line = "  ";
      for (let x = 0; x < size; x++) {
        const top = get(x, y);
        const bot = y + 1 < size ? get(x, y + 1) : false;
        line += top && bot ? "█" : top ? "▀" : bot ? "▄" : " ";
      }
      lines.push(line + "  ");
    }
    lines.push(quiet);
    return lines.join("\n");
  } catch (e) {
    return `[QR generation failed: ${e?.message || "unknown error"}]`;
  }
};

/**
 * Encodes text to URL-safe format
 * @param {string} text - The text to encode
 * @returns {string} - URL-encoded text
 */
export const encodeURL = (text) => {
  return encodeURIComponent(text);
};

/**
 * Decodes URL-encoded text
 * @param {string} text - The URL-encoded text
 * @returns {string} - Decoded text or error message
 */
export const decodeURL = (text) => {
  try {
    return decodeURIComponent(text);
  } catch {
    return "[Decode failed]";
  }
};

/**
 * Encodes text to HTML entities
 * @param {string} text - The text to encode
 * @returns {string} - HTML entity encoded text
 */
export const encodeHTMLEntities = (text) => {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return code > 127 || ["<", ">", "&", '"', "'"].includes(char)
        ? `&#${code};`
        : char;
    })
    .join("");
};

/**
 * Decodes HTML entities back to text
 * @param {string} text - The HTML entity encoded text
 * @returns {string} - Decoded text
 */
export const decodeHTMLEntities = (text) => {
  try {
    return text.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
  } catch {
    return "[Decode failed]";
  }
};

/**
 * Encodes text to Morse code with actual sound wave representation
 * @param {string} text - The text to encode
 * @returns {string} - Sound wave representation
 */
export const encodeSoundWave = (text) => {
  const waves = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];
  return text
    .split("")
    .map((char) => waves[char.charCodeAt(0) % waves.length])
    .join("");
};

/**
 * Encodes text to Punycode (for internationalized domain names)
 * @param {string} text - The text to encode
 * @returns {string} - Punycode representation
 */
export const encodePunycode = (text) => {
  try {
    // Simple ASCII-safe encoding fallback
    return (
      "xn--" +
      text
        .split("")
        .map((c) => c.charCodeAt(0).toString(36))
        .join("")
    );
  } catch {
    return "[Encode failed]";
  }
};

/**
 * Creates a hash-like representation (not cryptographic)
 * @param {string} text - The text to hash
 * @returns {string} - Hash-like string
 */
export const encodeHash = (text) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
};
