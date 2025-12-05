/**
 * Cipher Encoders
 * Caesar, ROT13, Atbash, Vigenère, and other substitution ciphers
 */

/**
 * Encodes text using Caesar cipher with specified shift
 * @param {string} text - The text to encode
 * @param {number} shift - The number of positions to shift (1-25)
 * @returns {string} - Encoded text
 */
export const encodeCaesar = (text, shift = 13) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
  });
};

/**
 * Decodes Caesar cipher with specified shift
 * @param {string} text - The text to decode
 * @param {number} shift - The shift used for encoding
 * @returns {string} - Decoded text
 */
export const decodeCaesar = (text, shift = 13) => {
  return encodeCaesar(text, 26 - shift);
};

/**
 * Encodes/decodes text using ROT13 (Caesar cipher with shift 13)
 * ROT13 is its own inverse
 * @param {string} text - The text to encode/decode
 * @returns {string} - Encoded/decoded text
 */
export const encodeROT13 = (text) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
  });
};

/**
 * ROT13 decoder (same as encoder since it's symmetric)
 */
export const decodeROT13 = encodeROT13;

/**
 * Reverses text (simple cipher)
 * @param {string} text - The text to reverse
 * @returns {string} - Reversed text
 */
export const encodeReverse = (text) => {
  return text.split('').reverse().join('');
};

/**
 * Reverse decoder (same as encoder since reversing is symmetric)
 */
export const decodeReverse = encodeReverse;

/**
 * Atbash Cipher - Reverses the alphabet (A=Z, B=Y, C=X, etc.)
 * This is a symmetric cipher, so encoding and decoding are the same
 * @param {string} text - The text to encode
 * @returns {string} - Encoded text
 */
export const encodeAtbash = (text) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const position = char.charCodeAt(0) - start;
    const reversedPosition = 25 - position;
    return String.fromCharCode(reversedPosition + start);
  });
};

/**
 * Atbash decoder (same as encoder since it's symmetric)
 */
export const decodeAtbash = encodeAtbash;

/**
 * Vigenère Cipher - Uses a keyword to shift each letter
 * @param {string} text - The text to encode
 * @param {string} keyword - The keyword for the cipher (default: 'SECRET')
 * @returns {string} - Encoded text
 */
export const encodeVigenere = (text, keyword = 'SECRET') => {
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '') || 'SECRET';
  let keyIndex = 0;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const charPosition = char.toUpperCase().charCodeAt(0) - 65;
    const keyPosition = key.charCodeAt(keyIndex % key.length) - 65;
    const newPosition = (charPosition + keyPosition) % 26;
    keyIndex++;
    return String.fromCharCode(newPosition + start);
  });
};

/**
 * Vigenère decoder
 * @param {string} text - The text to decode
 * @param {string} keyword - The keyword used for encoding
 * @returns {string} - Decoded text
 */
export const decodeVigenere = (text, keyword = 'SECRET') => {
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '') || 'SECRET';
  let keyIndex = 0;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const charPosition = char.toUpperCase().charCodeAt(0) - 65;
    const keyPosition = key.charCodeAt(keyIndex % key.length) - 65;
    const newPosition = (charPosition - keyPosition + 26) % 26;
    keyIndex++;
    return String.fromCharCode(newPosition + start);
  });
};
