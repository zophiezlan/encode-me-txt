/**
 * Encoder Deduplication Utility
 * Handles identifying and managing duplicate/related encoders
 */

/**
 * Map of encoder relationships
 * Key: encoder ID that has a better alternative
 * Value: { supersededBy: ID of the better version, reason: explanation }
 */
export const encoderRelationships = {
  // Pro versions supersede regular versions
  leetspeak: {
    supersededBy: "leetspeak-pro",
    reason: "Pro version offers intensity control settings",
  },
  uwu: {
    supersededBy: "uwu-pro",
    reason: "Pro version offers customizable intensity",
  },
  spongebob: {
    supersededBy: "spongebob-pro",
    reason: "Pro version offers randomness control",
  },
  emojipasta: {
    supersededBy: "emojipasta-pro",
    reason: "Pro version offers density control",
  },
  binary: {
    supersededBy: "binary-pro",
    reason: "Pro version offers customizable bit grouping",
  },
  morse: {
    supersededBy: "morse-pro",
    reason: "Pro version offers customizable delimiter styles",
  },
  "tap-code": {
    supersededBy: "tap-code-pro",
    reason: "Pro version offers symbol options",
  },
  polybius: {
    supersededBy: "polybius-pro",
    reason: "Pro version offers 5x5 or 6x6 grid option",
  },
  nato: {
    supersededBy: "nato-extended",
    reason: "Extended version supports NATO/Police/Western Union phonetics",
  },
  "navy-flags": {
    supersededBy: "maritime-flags-pro",
    reason: "Pro version offers international maritime flags",
  },

  // Functionally similar encoders (aliases)
  vaporwave: {
    aliasOf: "fullwidth",
    reason: "Both produce full-width aesthetic characters",
  },
  medieval: {
    aliasOf: "math-fraktur",
    reason: "Both produce Gothic/Fraktur text",
  },
  "zodiac-signs": {
    aliasOf: "zodiac",
    reason: "Both encode using zodiac symbols",
  },
  "chess-pieces": {
    aliasOf: "chess",
    reason: "Both encode using chess piece symbols",
  },
  "weather-symbols": {
    aliasOf: "weather",
    reason: "Both encode using weather symbols",
  },
  "music-notes": {
    aliasOf: "musical",
    reason: "Both encode using musical notation",
  },
};

/**
 * Get the preferred encoder ID for a given encoder
 * Returns the Pro/extended version if available, or the canonical version for aliases
 * @param {string} encoderId - The encoder ID to check
 * @returns {string} - The preferred encoder ID
 */
export const getPreferredEncoder = (encoderId) => {
  const relationship = encoderRelationships[encoderId];
  if (!relationship) {
    return encoderId;
  }

  if (relationship.supersededBy) {
    return relationship.supersededBy;
  }

  if (relationship.aliasOf) {
    return relationship.aliasOf;
  }

  return encoderId;
};

/**
 * Check if an encoder is superseded by another
 * @param {string} encoderId - The encoder ID to check
 * @returns {boolean} - True if encoder is superseded
 */
export const isSuperseded = (encoderId) => {
  const relationship = encoderRelationships[encoderId];
  return relationship?.supersededBy !== undefined;
};

/**
 * Check if an encoder is an alias of another
 * @param {string} encoderId - The encoder ID to check
 * @returns {boolean} - True if encoder is an alias
 */
export const isAlias = (encoderId) => {
  const relationship = encoderRelationships[encoderId];
  return relationship?.aliasOf !== undefined;
};

/**
 * Check if an encoder is redundant (either superseded or an alias)
 * @param {string} encoderId - The encoder ID to check
 * @returns {boolean} - True if encoder is redundant
 */
export const isRedundant = (encoderId) => {
  return isSuperseded(encoderId) || isAlias(encoderId);
};

/**
 * Get the relationship info for an encoder
 * @param {string} encoderId - The encoder ID to check
 * @returns {Object|null} - Relationship info or null
 */
export const getEncoderRelationship = (encoderId) => {
  return encoderRelationships[encoderId] || null;
};

/**
 * Get all redundant encoder IDs
 * @returns {string[]} - Array of redundant encoder IDs
 */
export const getRedundantEncoderIds = () => {
  return Object.keys(encoderRelationships);
};

/**
 * Get all superseded encoder IDs
 * @returns {string[]} - Array of superseded encoder IDs
 */
export const getSupersededEncoderIds = () => {
  return Object.keys(encoderRelationships).filter(
    (id) => encoderRelationships[id].supersededBy !== undefined
  );
};

/**
 * Get all alias encoder IDs
 * @returns {string[]} - Array of alias encoder IDs
 */
export const getAliasEncoderIds = () => {
  return Object.keys(encoderRelationships).filter(
    (id) => encoderRelationships[id].aliasOf !== undefined
  );
};

/**
 * Deduplicate an array of encoder config objects
 * Removes encoders that are superseded by Pro versions or are aliases
 * @param {Array} encoders - Array of encoder config objects
 * @param {Object} options - Deduplication options
 * @param {boolean} options.removeSuperseded - Remove encoders superseded by Pro versions (default: true)
 * @param {boolean} options.removeAliases - Remove alias encoders (default: true)
 * @param {boolean} options.markRedundant - Instead of removing, mark redundant encoders (default: false)
 * @returns {Array} - Deduplicated or marked encoder array
 */
export const deduplicateEncoders = (encoders, options = {}) => {
  const {
    removeSuperseded = true,
    removeAliases = true,
    markRedundant = false,
  } = options;

  if (markRedundant) {
    // Mark redundant encoders instead of removing them
    return encoders.map((encoder) => {
      const relationship = encoderRelationships[encoder.id];
      if (!relationship) {
        return encoder;
      }

      return {
        ...encoder,
        isRedundant: true,
        redundantReason: relationship.reason,
        preferredEncoder: relationship.supersededBy || relationship.aliasOf,
        redundantType: relationship.supersededBy ? "superseded" : "alias",
      };
    });
  }

  // Filter out redundant encoders
  return encoders.filter((encoder) => {
    const relationship = encoderRelationships[encoder.id];
    if (!relationship) {
      return true;
    }

    if (removeSuperseded && relationship.supersededBy) {
      return false;
    }

    if (removeAliases && relationship.aliasOf) {
      return false;
    }

    return true;
  });
};

/**
 * Get encoder deduplication summary
 * @param {Array} encoders - Array of encoder config objects
 * @returns {Object} - Summary of deduplication
 */
export const getDeduplicationSummary = (encoders) => {
  const superseded = [];
  const aliases = [];
  const unique = [];

  for (const encoder of encoders) {
    const relationship = encoderRelationships[encoder.id];
    if (!relationship) {
      unique.push(encoder);
    } else if (relationship.supersededBy) {
      superseded.push({
        encoder,
        supersededBy: relationship.supersededBy,
        reason: relationship.reason,
      });
    } else if (relationship.aliasOf) {
      aliases.push({
        encoder,
        aliasOf: relationship.aliasOf,
        reason: relationship.reason,
      });
    }
  }

  return {
    total: encoders.length,
    unique: unique.length,
    superseded: superseded.length,
    aliases: aliases.length,
    supersededEncoders: superseded,
    aliasEncoders: aliases,
    deduplicatedCount: unique.length,
  };
};

/**
 * Group encoders by their preferred encoder
 * Useful for showing related encoders together
 * @param {Array} encoders - Array of encoder config objects
 * @returns {Map} - Map of preferred encoder ID to array of related encoders
 */
export const groupByPreferredEncoder = (encoders) => {
  const groups = new Map();

  for (const encoder of encoders) {
    const preferredId = getPreferredEncoder(encoder.id);

    if (!groups.has(preferredId)) {
      groups.set(preferredId, []);
    }

    groups.get(preferredId).push(encoder);
  }

  return groups;
};
