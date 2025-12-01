/**
 * Computer Science Encoders
 * Binary, Hexadecimal, Base64, and other technical encodings
 */

/**
 * Encodes text to binary (8-bit)
 * @param {string} text - The text to encode
 * @returns {string} - Binary representation
 */
export const encodeBinary = (text) => {
  return text.split('').map(char =>
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join(' ');
};

/**
 * Decodes binary back to text
 * @param {string} text - The binary to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeBinary = (text) => {
  try {
    return text.split(' ').map(binary =>
      String.fromCharCode(parseInt(binary, 2))
    ).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to hexadecimal
 * @param {string} text - The text to encode
 * @returns {string} - Hexadecimal representation
 */
export const encodeHex = (text) => {
  return text.split('').map(char =>
    char.charCodeAt(0).toString(16).padStart(2, '0')
  ).join(' ');
};

/**
 * Decodes hexadecimal back to text
 * @param {string} text - The hexadecimal to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeHex = (text) => {
  try {
    return text.split(' ').map(hex =>
      String.fromCharCode(parseInt(hex, 16))
    ).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to Base64
 * @param {string} text - The text to encode
 * @returns {string} - Base64 representation
 */
export const encodeBase64 = (text) => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    let binary = '';
    data.forEach(byte => binary += String.fromCharCode(byte));
    return btoa(binary);
  } catch {
    return '[Encode failed]';
  }
};

/**
 * Decodes Base64 back to text
 * @param {string} text - The Base64 to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeBase64 = (text) => {
  try {
    const binary = atob(text);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  } catch {
    return '[Decode failed]';
  }
};
