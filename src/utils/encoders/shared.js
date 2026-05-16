/**
 * Shared Encoder Utilities
 * Common patterns used across multiple encoder modules
 *
 * This module provides:
 * - Factory functions for creating encoders/decoders (createMapEncoder, etc.)
 * - Shared constant data (MORSE_ALPHABET, EMOJI_SETS, etc.)
 *
 * These utilities exist to support gradual consolidation of similar patterns
 * found across encoder modules. New encoders should prefer using these utilities.
 * Existing encoders may be migrated over time.
 *
 * See ARCHITECTURE.md for documentation on coding patterns and refactoring plans.
 */

/**
 * Creates a simple map-based encoder function
 * @param {Object} map - Character mapping object
 * @param {Object} options - Configuration options
 * @param {boolean} options.lowercase - Convert input to lowercase first
 * @param {string} options.separator - Join character (default '')
 * @returns {function} Encoder function
 */
export const createMapEncoder = (map, options = {}) => {
  const { lowercase = false, separator = "" } = options;
  return (text) => {
    const input = lowercase ? text.toLowerCase() : text;
    return input
      .split("")
      .map((char) => map[char] || char)
      .join(separator);
  };
};

/**
 * Creates a decoder from a character map (reverse lookup)
 * @param {Object} map - Original character mapping object
 * @param {Object} options - Configuration options
 * @param {string} options.separator - Split character (default '')
 * @returns {function} Decoder function
 */
export const createMapDecoder = (map, options = {}) => {
  const { separator = "" } = options;
  const reverseMap = Object.fromEntries(
    Object.entries(map).map(([k, v]) => [v, k]),
  );
  return (text) => {
    if (separator) {
      return text
        .split(separator)
        .map((char) => reverseMap[char] || char)
        .join("");
    }
    // Handle multi-character mappings by iterating through the string
    return [...text].map((char) => reverseMap[char] || char).join("");
  };
};

/**
 * Creates an encoder that maps characters to array elements using modulo.
 * The simple case (no per-char formatting beyond array lookup).
 *
 * @param {Array} array - Array of output elements
 * @param {Object} options - Configuration options
 * @param {string} [options.separator] - Join character (default '')
 * @returns {(text: string) => string}
 */
export const createModuloEncoder = (array, options = {}) => {
  const { separator = "" } = options;
  return (text) =>
    text
      .split("")
      .map((char) => array[char.charCodeAt(0) % array.length])
      .join(separator);
};

/**
 * Creates an encoder whose body is a per-character render function. Lets a
 * caller skip the .split('').map(charCode → ...).join(sep) boilerplate that
 * appears identically in hundreds of "stylized" encoders.
 *
 * Use this when the per-char output depends on `code` (or `char`) in any way
 * beyond a single array lookup — for simple `arr[code % N]` lookups prefer
 * createModuloEncoder.
 *
 * @param {(code: number, char: string) => string} renderChar - Renders one input char
 * @param {string} [separator] - Join string between rendered chars (default '')
 * @returns {(text: string) => string}
 */
export const createCharEncoder = (renderChar, separator = "") => {
  return (text) =>
    text
      .split("")
      .map((char) => renderChar(char.charCodeAt(0), char))
      .join(separator);
};

