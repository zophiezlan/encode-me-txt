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
 * @returns {string} - Encoded text with metadata
 */
export const encodeShuffle = (text, selectedEncoderIds = []) => {
  if (!text) return '';

  // Default to a few interesting encoders if none selected
  if (!selectedEncoderIds || selectedEncoderIds.length === 0) {
    selectedEncoderIds = ['binary', 'morse', 'caesar', 'emoji', 'braille'];
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

    } catch (error) {
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

  // Create result with metadata
  const result = {
    encoded: encodedParts.join('|'), // Use | as delimiter between characters
    map: encodingMap,
    selectedEncoders: selectedEncoderIds
  };

  // Return as formatted string with embedded metadata
  return `🔀 SHUFFLE ENCODED 🔀\n${result.encoded}\n\n📊 Encoding Map:\n${
    encodingMap.map(m => `[${m.position}] '${m.original}' → '${m.encoded}' (${m.encoderName})`).join('\n')
  }`;
};

/**
 * Decodes shuffle-encoded text
 * Uses the encoding map to decode each character with the correct encoder
 *
 * @param {string} encodedText - Encoded text with metadata
 * @returns {string} - Decoded text
 */
export const decodeShuffle = (encodedText) => {
  if (!encodedText) return '';

  try {
    // Extract the encoded part (between first line and encoding map)
    const lines = encodedText.split('\n');
    const encodedLine = lines.find(line => line && !line.includes('🔀') && !line.includes('📊'));

    if (!encodedLine) {
      return 'Error: Invalid shuffle-encoded format';
    }

    // Extract encoding map
    const mapStartIndex = lines.findIndex(line => line.includes('📊 Encoding Map:'));
    if (mapStartIndex === -1) {
      return 'Error: Encoding map not found';
    }

    // Parse the map to get original characters in order
    const originalChars = [];
    for (let i = mapStartIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      // Parse format: [position] 'original' → 'encoded' (encoderName)
      const match = line.match(/\[(\d+)\] '(.)'/);
      if (match) {
        const position = parseInt(match[1]);
        const original = match[2];
        originalChars[position] = original;
      }
    }

    return originalChars.join('');

  } catch (error) {
    return 'Error: Failed to decode shuffle-encoded text';
  }
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
