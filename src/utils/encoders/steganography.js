/**
 * Steganography Encoders
 * Hide messages in invisible or creative ways
 */

/**
 * Encodes text using zero-width Unicode characters for steganography
 * @param {string} text - The text to encode
 * @returns {string} - Encoded text using invisible Unicode characters
 */
export const encodeZeroWidth = (text) => {
  const zeroWidth = {
    '0': '\u200B', // Zero-width space
    '1': '\u200C', // Zero-width non-joiner
  };

  let encoded = '';
  for (let char of text) {
    const binary = char.charCodeAt(0).toString(2).padStart(16, '0');
    encoded += binary.split('').map(bit => zeroWidth[bit]).join('');
  }
  return encoded + '\u200D'; // Terminator
};

/**
 * Decodes zero-width steganography back to original text
 * @param {string} text - The encoded text
 * @returns {string} - Decoded text or error message
 */
export const decodeZeroWidth = (text) => {
  try {
    const reverseMap = {
      '\u200B': '0',
      '\u200C': '1',
    };

    const binary = text.replace('\u200D', '').split('').map(c => reverseMap[c] || '').join('');
    let decoded = '';

    for (let i = 0; i < binary.length; i += 16) {
      const byte = binary.substring(i, i + 16);
      if (byte.length === 16) {
        decoded += String.fromCharCode(parseInt(byte, 2));
      }
    }
    return decoded || '[Invalid zero-width encoding]';
  } catch {
    return '[Decode failed]';
  }
};
