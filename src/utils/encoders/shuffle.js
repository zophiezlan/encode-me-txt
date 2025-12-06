/**
 * Shuffle Encoder - Encodes each character using a randomly selected encoder from chosen options
 * Creates a mixed encoding where different characters use different encoding methods
 */

import { encoderConfig } from '../encoderConfig';

/**
 * Encodes text using a shuffle of selected encoders
 * Each character gets encoded with a randomly selected encoder from the provided list
 *
 * @param {string} text - Text to encode
 * @param {Array<string>} selectedEncoderIds - Array of encoder IDs to choose from
 * @returns {string} - Encoded text (just the result, no metadata)
 */
export const encodeShuffle = (text, selectedEncoderIds = []) => {
  if (!text) return '';

  // Default to a few interesting encoders if none selected
  if (!selectedEncoderIds || selectedEncoderIds.length === 0) {
    selectedEncoderIds = ['binary-pro', 'morse-pro', 'caesar', 'emoji', 'braille'];
  }

  // Get encoder objects from IDs
  const selectedEncoders = selectedEncoderIds
    .map(id => encoderConfig.find(enc => enc.id === id))
    .filter(enc => enc && enc.encode); // Only include valid encoders with encode function

  if (selectedEncoders.length === 0) {
    return 'Error: No valid encoders selected';
  }

  // Track which encoder was used for each character (for potential decoding)
  const encodingMap = [];
  const encodedParts = [];

  // Process each character
  text.split('').forEach((char, index) => {
    // Randomly select an encoder
    const randomIndex = Math.floor(Math.random() * selectedEncoders.length);
    const selectedEncoder = selectedEncoders[randomIndex];

    try {
      // Encode the single character
      let encodedChar;

      // Handle special cases for encoders that might need specific parameters
      if (selectedEncoder.id === 'caesar') {
        encodedChar = selectedEncoder.encode(char, 13); // Use default ROT13
      } else {
        encodedChar = selectedEncoder.encode(char);
      }

      // Store the mapping
      encodingMap.push({
        original: char,
        encoded: encodedChar,
        encoderId: selectedEncoder.id,
        encoderName: selectedEncoder.name,
        position: index
      });

      // Add encoded character with delimiter
      encodedParts.push(encodedChar);

    } catch {
      // If encoding fails, keep original character
      encodedParts.push(char);
      encodingMap.push({
        original: char,
        encoded: char,
        encoderId: 'none',
        encoderName: 'Original',
        position: index
      });
    }
  });

  // Return just the encoded parts joined with delimiter
  return encodedParts.join('|');
};

/**
 * Decodes shuffle-encoded text
 * Note: Shuffle encoding is not fully reversible without knowing which encoder was used for each character.
 * This decoder returns the raw encoded parts without attempting to decode them.
 *
 * @param {string} encodedText - Encoded text (pipe-delimited parts)
 * @returns {string} - Description that decoding is not supported
 */
export const decodeShuffle = (encodedText) => {
  if (!encodedText) return '';

  // Shuffle encoding is not reversible without the encoding map
  // Just return a message explaining this
  return '[Shuffle decoding requires knowing which encoder was used for each character - not available]';
};

/**
 * Get visual representation showing which encoder was used for each character
 *
 * @param {string} text - Original text
 * @param {Array<string>} selectedEncoderIds - Encoder IDs to use
 * @returns {string} - Visual representation
 */
export const getShuffleVisualization = (text, selectedEncoderIds = []) => {
  if (!text) return '';

  const result = encodeShuffle(text, selectedEncoderIds);
  return result;
};
