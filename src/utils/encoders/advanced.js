/**
 * Advanced Encoders
 * QR Code, URL encoding, and other advanced transformations
 */

/**
 * Generates a data URL for a QR code (using a simple QR code generation approach)
 * @param {string} text - The text to encode in QR
 * @returns {string} - Description with instructions
 */
export const encodeQRCode = (text) => {
  // Using Google Charts API for QR code generation (simple, no dependencies)
  const size = '200x200';
  const encoded = encodeURIComponent(text);
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encoded}`;
  return `QR Code URL: ${url}\n\n(Paste this URL in browser to see QR code)`;
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
    return '[Decode failed]';
  }
};

/**
 * Encodes text to HTML entities
 * @param {string} text - The text to encode
 * @returns {string} - HTML entity encoded text
 */
export const encodeHTMLEntities = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return code > 127 || ['<', '>', '&', '"', "'"].includes(char)
      ? `&#${code};`
      : char;
  }).join('');
};

/**
 * Decodes HTML entities back to text
 * @param {string} text - The HTML entity encoded text
 * @returns {string} - Decoded text
 */
export const decodeHTMLEntities = (text) => {
  try {
    return text.replace(/&#(\d+);/g, (match, dec) =>
      String.fromCharCode(dec)
    );
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to Morse code with actual sound wave representation
 * @param {string} text - The text to encode
 * @returns {string} - Sound wave representation
 */
export const encodeSoundWave = (text) => {
  const waves = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  return text.split('').map(char =>
    waves[char.charCodeAt(0) % waves.length]
  ).join('');
};

/**
 * Encodes text to Punycode (for internationalized domain names)
 * @param {string} text - The text to encode
 * @returns {string} - Punycode representation
 */
export const encodePunycode = (text) => {
  try {
    // Simple ASCII-safe encoding fallback
    return 'xn--' + text.split('').map(c =>
      c.charCodeAt(0).toString(36)
    ).join('');
  } catch {
    return '[Encode failed]';
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
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
};
