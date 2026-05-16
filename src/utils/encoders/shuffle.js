/**
 * Shuffle Encoder — encodes each character using a randomly selected encoder
 * from a caller-provided list. Accepts resolved encoder objects (not IDs) so
 * this module does not depend on encoderConfig — breaks the previous
 * shuffle → encoderConfig → encoders/index → shuffle circular import.
 */

/**
 * @param {string} text - Text to encode
 * @param {Array<{id:string, name:string, encode:function}>} selectedEncoders -
 *   Resolved encoder objects. The caller is responsible for filtering out
 *   invalid entries and for excluding the shuffle encoder itself.
 * @returns {string} - Pipe-delimited encoded parts
 */
export const encodeShuffle = (text, selectedEncoders = []) => {
  if (!text) return "";

  const valid = (selectedEncoders || []).filter((e) => e && e.encode);
  if (valid.length === 0) {
    return "[Shuffle: select at least one encoder]";
  }

  const encodedParts = [];
  for (const char of text.split("")) {
    const picked = valid[Math.floor(Math.random() * valid.length)];
    try {
      // Caesar takes a shift parameter; use ROT13 as the default for shuffle.
      encodedParts.push(
        picked.id === "caesar" ? picked.encode(char, 13) : picked.encode(char),
      );
    } catch {
      encodedParts.push(char);
    }
  }
  return encodedParts.join("|");
};

export const decodeShuffle = (encodedText) => {
  if (!encodedText) return "";
  return "[Shuffle decoding requires knowing which encoder was used for each character - not available]";
};
