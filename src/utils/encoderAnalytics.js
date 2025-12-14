/**
 * Encoder Analytics Utility
 * Provides statistics, insights, and analysis about encoders
 *
 * Unique Features:
 * - Encoder statistics and metrics
 * - Category distribution analysis
 * - Reversibility analysis
 * - Complexity scoring
 * - Usage recommendations
 */

import { encoderConfig, getEncoderById, categories } from "./encoderConfig.js";

/**
 * Category and tag constants for consistency
 */
export const COMPLEXITY_CATEGORIES = {
  SECRET: "secret",
  CIPHER: "cipher",
  COMPUTER: "computer",
  FUN: "fun",
  VISUAL: "visual",
};

export const COMPLEXITY_TAGS = {
  STEGANOGRAPHY: "steganography",
  CRYPTOGRAPHY: "cryptography",
  PUZZLE: "puzzle",
};

/**
 * Difficulty levels for encoders
 * Based on complexity of the encoding algorithm and output readability
 */
export const difficultyLevels = {
  BEGINNER: 1,
  EASY: 2,
  MEDIUM: 3,
  HARD: 4,
  EXPERT: 5,
};

/**
 * Encoder difficulty ratings
 * Maps encoder IDs to difficulty levels
 */
export const encoderDifficulty = {
  // Beginner (Very Simple)
  reverse: difficultyLevels.BEGINNER,
  "upside-down": difficultyLevels.BEGINNER,
  bubble: difficultyLevels.BEGINNER,
  fullwidth: difficultyLevels.BEGINNER,
  mirror: difficultyLevels.BEGINNER,
  "title-case": difficultyLevels.BEGINNER,
  "double-space": difficultyLevels.BEGINNER,

  // Easy (Simple substitutions)
  rot13: difficultyLevels.EASY,
  caesar: difficultyLevels.EASY,
  atbash: difficultyLevels.EASY,
  a1z26: difficultyLevels.EASY,
  leetspeak: difficultyLevels.EASY,
  "pig-latin": difficultyLevels.EASY,
  binary: difficultyLevels.EASY,
  hex: difficultyLevels.EASY,
  base64: difficultyLevels.EASY,
  morse: difficultyLevels.EASY,

  // Medium (Moderate complexity)
  vigenere: difficultyLevels.MEDIUM,
  "rail-fence": difficultyLevels.MEDIUM,
  bacon: difficultyLevels.MEDIUM,
  polybius: difficultyLevels.MEDIUM,
  affine: difficultyLevels.MEDIUM,
  columnar: difficultyLevels.MEDIUM,
  base32: difficultyLevels.MEDIUM,
  octal: difficultyLevels.MEDIUM,
  dna: difficultyLevels.MEDIUM,
  braille: difficultyLevels.MEDIUM,
  "phone-keypad": difficultyLevels.MEDIUM,

  // Hard (Complex algorithms)
  playfair: difficultyLevels.HARD,
  hill: difficultyLevels.HARD,
  bifid: difficultyLevels.HARD,
  autokey: difficultyLevels.HARD,
  beaufort: difficultyLevels.HARD,
  ascii85: difficultyLevels.HARD,
  brainfuck: difficultyLevels.HARD,
  cuneiform: difficultyLevels.HARD,
  hieroglyphs: difficultyLevels.HARD,

  // Expert (Very complex)
  shuffle: difficultyLevels.EXPERT,
  "zero-width": difficultyLevels.EXPERT,
  whitespace: difficultyLevels.EXPERT,
  homoglyph: difficultyLevels.EXPERT,
  "unicode-tag": difficultyLevels.EXPERT,
  "qr-code": difficultyLevels.EXPERT,
};

/**
 * Get the difficulty level for an encoder
 * @param {string} encoderId - The encoder ID
 * @returns {number} - Difficulty level (1-5), defaults to MEDIUM if not specified
 */
export const getEncoderDifficulty = (encoderId) => {
  return encoderDifficulty[encoderId] || difficultyLevels.MEDIUM;
};

/**
 * Get difficulty label for a level
 * @param {number} level - Difficulty level (1-5)
 * @returns {string} - Human-readable difficulty label
 */
export const getDifficultyLabel = (level) => {
  const labels = {
    1: "Beginner",
    2: "Easy",
    3: "Medium",
    4: "Hard",
    5: "Expert",
  };
  return labels[level] || "Unknown";
};

/**
 * Get overall encoder statistics
 * @returns {Object} - Comprehensive statistics about all encoders
 */
export const getEncoderStatistics = () => {
  const stats = {
    total: encoderConfig.length,
    reversible: 0,
    nonReversible: 0,
    special: 0,
    hasSettings: 0,
    byCategory: {},
    byDifficulty: {
      [difficultyLevels.BEGINNER]: 0,
      [difficultyLevels.EASY]: 0,
      [difficultyLevels.MEDIUM]: 0,
      [difficultyLevels.HARD]: 0,
      [difficultyLevels.EXPERT]: 0,
    },
    tags: {},
    categories: Object.keys(categories).length,
  };

  for (const encoder of encoderConfig) {
    // Reversibility
    if (encoder.reversible) {
      stats.reversible++;
    } else {
      stats.nonReversible++;
    }

    // Special encoders
    if (encoder.special) {
      stats.special++;
    }

    // Settings
    if (encoder.hasSettings) {
      stats.hasSettings++;
    }

    // Category distribution
    if (!stats.byCategory[encoder.category]) {
      stats.byCategory[encoder.category] = 0;
    }
    stats.byCategory[encoder.category]++;

    // Difficulty distribution
    const difficulty = getEncoderDifficulty(encoder.id);
    stats.byDifficulty[difficulty]++;

    // Tag analysis
    if (encoder.tags) {
      for (const tag of encoder.tags) {
        if (!stats.tags[tag]) {
          stats.tags[tag] = 0;
        }
        stats.tags[tag]++;
      }
    }
  }

  // Calculate percentages
  stats.reversiblePercent = ((stats.reversible / stats.total) * 100).toFixed(1);
  stats.settingsPercent = ((stats.hasSettings / stats.total) * 100).toFixed(1);

  return stats;
};

/**
 * Get category analysis
 * @returns {Object[]} - Array of category analytics
 */
export const getCategoryAnalysis = () => {
  const analysis = [];

  for (const [catId, catMeta] of Object.entries(categories)) {
    const encoders = encoderConfig.filter((e) => e.category === catId);
    const reversible = encoders.filter((e) => e.reversible).length;
    const withSettings = encoders.filter((e) => e.hasSettings).length;

    // Calculate average difficulty
    const difficulties = encoders.map((e) => getEncoderDifficulty(e.id));
    const avgDifficulty =
      difficulties.length > 0
        ? difficulties.reduce((a, b) => a + b, 0) / difficulties.length
        : 0;

    analysis.push({
      id: catId,
      name: catMeta.name,
      emoji: catMeta.emoji,
      description: catMeta.description,
      totalEncoders: encoders.length,
      reversibleEncoders: reversible,
      reversiblePercent:
        encoders.length > 0
          ? ((reversible / encoders.length) * 100).toFixed(1)
          : "0",
      encodersWithSettings: withSettings,
      averageDifficulty: avgDifficulty.toFixed(2),
      difficultyLabel: getDifficultyLabel(Math.round(avgDifficulty)),
      encoderIds: encoders.map((e) => e.id),
    });
  }

  // Sort by total encoders descending
  return analysis.sort((a, b) => b.totalEncoders - a.totalEncoders);
};

/**
 * Get encoder recommendations based on criteria
 * @param {Object} criteria - Recommendation criteria
 * @param {string} criteria.difficulty - Preferred difficulty ('beginner', 'easy', 'medium', 'hard', 'expert')
 * @param {boolean} criteria.mustBeReversible - Only reversible encoders
 * @param {string} criteria.category - Preferred category
 * @param {string[]} criteria.tags - Preferred tags
 * @param {number} criteria.limit - Maximum number of recommendations
 * @returns {Object[]} - Array of recommended encoders
 */
export const getEncoderRecommendations = (criteria = {}) => {
  const {
    difficulty,
    mustBeReversible = false,
    category,
    tags = [],
    limit = 10,
  } = criteria;

  let recommendations = [...encoderConfig];

  // Filter by reversibility
  if (mustBeReversible) {
    recommendations = recommendations.filter((e) => e.reversible);
  }

  // Filter by category
  if (category) {
    recommendations = recommendations.filter((e) => e.category === category);
  }

  // Filter by difficulty
  if (difficulty) {
    const difficultyMap = {
      beginner: difficultyLevels.BEGINNER,
      easy: difficultyLevels.EASY,
      medium: difficultyLevels.MEDIUM,
      hard: difficultyLevels.HARD,
      expert: difficultyLevels.EXPERT,
    };
    const targetDifficulty = difficultyMap[difficulty.toLowerCase()];
    if (targetDifficulty) {
      recommendations = recommendations.filter(
        (e) => getEncoderDifficulty(e.id) === targetDifficulty
      );
    }
  }

  // Filter by tags
  if (tags.length > 0) {
    recommendations = recommendations.filter(
      (e) => e.tags && tags.some((t) => e.tags.includes(t))
    );
  }

  // Add scores and metadata
  recommendations = recommendations.map((e) => ({
    ...e,
    difficulty: getEncoderDifficulty(e.id),
    difficultyLabel: getDifficultyLabel(getEncoderDifficulty(e.id)),
    categoryInfo: categories[e.category],
  }));

  return recommendations.slice(0, limit);
};

/**
 * Analyze an encoding result
 * @param {string} input - Original text
 * @param {string} output - Encoded text
 * @param {string} encoderId - The encoder used
 * @returns {Object} - Analysis of the encoding
 */
export const analyzeEncoding = (input, output, encoderId) => {
  const encoder = getEncoderById(encoderId);

  const analysis = {
    encoderId,
    encoderName: encoder?.name || "Unknown",
    inputLength: input.length,
    outputLength: output.length,
    expansionRatio: output.length / Math.max(input.length, 1),
    compressionRatio: input.length / Math.max(output.length, 1),
    sizeChange: output.length - input.length,
    sizeChangePercent: (
      ((output.length - input.length) / Math.max(input.length, 1)) *
      100
    ).toFixed(1),

    // Character analysis
    inputUniqueChars: new Set(input).size,
    outputUniqueChars: new Set(output).size,

    // Pattern analysis
    containsSpaces: output.includes(" "),
    containsNumbers: /\d/.test(output),
    containsLetters: /[a-zA-Z]/.test(output),
    containsSpecial: /[^a-zA-Z0-9\s]/.test(output),

    // Encoding metadata
    isReversible: encoder?.reversible || false,
    difficulty: getEncoderDifficulty(encoderId),
    difficultyLabel: getDifficultyLabel(getEncoderDifficulty(encoderId)),
    category: encoder?.category || "unknown",
    categoryInfo: encoder?.category ? categories[encoder.category] : null,
  };

  // Readability score (0-100, higher = more readable)
  let readabilityScore = 100;
  if (!analysis.containsLetters) readabilityScore -= 30;
  if (analysis.expansionRatio > 3) readabilityScore -= 20;
  if (analysis.outputUniqueChars < 5) readabilityScore -= 15;
  if (analysis.expansionRatio > 5) readabilityScore -= 20;
  if (analysis.difficulty >= 4) readabilityScore -= 15;
  analysis.readabilityScore = Math.max(0, readabilityScore);

  return analysis;
};

/**
 * Get encoding complexity score for a text-encoder pair
 * Higher score = more complex/secure encoding
 * @param {string} input - Original text
 * @param {string} output - Encoded text
 * @param {string} encoderId - The encoder used
 * @returns {Object} - Complexity analysis
 */
export const getEncodingComplexity = (input, output, encoderId) => {
  const encoder = getEncoderById(encoderId);
  let score = 0;
  const factors = [];

  // Base difficulty score
  const difficulty = getEncoderDifficulty(encoderId);
  score += difficulty * 15;
  factors.push({
    name: "Algorithm Complexity",
    score: difficulty * 15,
    description: `${getDifficultyLabel(difficulty)} level algorithm`,
  });

  // Expansion ratio factor
  const expansion = output.length / Math.max(input.length, 1);
  if (expansion > 2) {
    const expansionScore = Math.min(20, Math.floor((expansion - 1) * 5));
    score += expansionScore;
    factors.push({
      name: "Size Expansion",
      score: expansionScore,
      description: `${expansion.toFixed(1)}x size increase`,
    });
  }

  // Character diversity factor
  const uniqueRatio = new Set(output).size / Math.max(output.length, 1);
  if (uniqueRatio < 0.3) {
    score += 10;
    factors.push({
      name: "Low Character Diversity",
      score: 10,
      description: "Limited character set used",
    });
  }

  // Special encoding types
  if (encoder?.special) {
    score += 15;
    factors.push({
      name: "Special Encoding",
      score: 15,
      description: "Uses advanced techniques",
    });
  }

  // Steganography bonus - using constants for consistency
  if (
    encoder?.category === COMPLEXITY_CATEGORIES.SECRET ||
    encoder?.tags?.includes(COMPLEXITY_TAGS.STEGANOGRAPHY)
  ) {
    score += 20;
    factors.push({
      name: "Steganography",
      score: 20,
      description: "Hidden message encoding",
    });
  }

  // Non-reversible penalty (for security, reversible is actually less secure)
  if (!encoder?.reversible) {
    score += 5;
    factors.push({
      name: "One-Way Encoding",
      score: 5,
      description: "Cannot be decoded without key",
    });
  }

  return {
    totalScore: Math.min(100, score),
    factors,
    level:
      score < 25
        ? "Low"
        : score < 50
        ? "Medium"
        : score < 75
        ? "High"
        : "Very High",
    recommendation:
      score < 25
        ? "Basic encoding for casual use"
        : score < 50
        ? "Good for educational purposes"
        : score < 75
        ? "Suitable for moderate security needs"
        : "Advanced encoding for privacy-conscious users",
  };
};

/**
 * Get popular encoder combinations
 * Returns suggested encoder chains that work well together
 * @param {string} purpose - Purpose of encoding ('fun', 'secure', 'visual', 'educational')
 * @returns {Object[]} - Array of recommended encoder chains
 */
export const getPopularCombinations = (purpose = "fun") => {
  const combinations = {
    fun: [
      {
        name: "Social Media Style",
        description: "Perfect for social media posts",
        encoders: ["fullwidth", "emoji"],
        difficulty: "Easy",
      },
      {
        name: "Retro Gamer",
        description: "Classic gaming aesthetic",
        encoders: ["leetspeak", "upside-down"],
        difficulty: "Easy",
      },
      {
        name: "Mystery Message",
        description: "Add chaos to your text",
        encoders: ["reverse", "zalgo"],
        difficulty: "Medium",
      },
    ],
    secure: [
      {
        name: "Double Cipher",
        description: "Two-layer encryption",
        encoders: ["vigenere", "base64"],
        difficulty: "Medium",
      },
      {
        name: "Hidden in Plain Sight",
        description: "Steganographic encoding",
        encoders: ["zero-width", "whitespace"],
        difficulty: "Expert",
      },
      {
        name: "Multilayer Security",
        description: "Complex encoding chain",
        encoders: ["playfair", "binary", "base64"],
        difficulty: "Hard",
      },
    ],
    visual: [
      {
        name: "Artistic Expression",
        description: "Visual text art",
        encoders: ["blocks", "runes"],
        difficulty: "Easy",
      },
      {
        name: "Ancient Wisdom",
        description: "Historical writing systems",
        encoders: ["hieroglyphs", "cuneiform"],
        difficulty: "Hard",
      },
      {
        name: "Fantasy Script",
        description: "Fictional languages",
        encoders: ["elvish", "aurebesh"],
        difficulty: "Medium",
      },
    ],
    educational: [
      {
        name: "Beginner Crypto",
        description: "Learn basic cryptography",
        encoders: ["caesar", "rot13", "atbash"],
        difficulty: "Easy",
      },
      {
        name: "Binary Computing",
        description: "Understand binary encoding",
        encoders: ["binary", "hex", "octal"],
        difficulty: "Medium",
      },
      {
        name: "Classic Ciphers",
        description: "Historical cipher methods",
        encoders: ["vigenere", "polybius", "playfair"],
        difficulty: "Hard",
      },
    ],
  };

  return combinations[purpose] || combinations.fun;
};

/**
 * Get encoder usage tips
 * @param {string} encoderId - The encoder ID
 * @returns {Object} - Usage tips and best practices
 */
export const getEncoderTips = (encoderId) => {
  const encoder = getEncoderById(encoderId);
  if (!encoder) return null;

  const tips = {
    general: [],
    bestFor: [],
    limitations: [],
    combinations: [],
  };

  // General tips based on encoder properties
  if (encoder.reversible) {
    tips.general.push("This encoder supports decoding back to original text");
  } else {
    tips.limitations.push("This encoding is one-way and cannot be decoded");
  }

  if (encoder.hasSettings) {
    tips.general.push("Use the settings to customize the encoding parameters");
  }

  // Category-specific tips
  switch (encoder.category) {
    case "cipher":
      tips.bestFor.push("Educational cryptography learning");
      tips.bestFor.push("Creating puzzle games");
      tips.combinations.push("Combine with Base64 for extra security");
      break;
    case "fun":
      tips.bestFor.push("Social media posts");
      tips.bestFor.push("Casual messaging");
      tips.combinations.push("Stack with emoji encoders for more fun");
      break;
    case "secret":
      tips.bestFor.push("Hiding messages in plain sight");
      tips.bestFor.push("Privacy-conscious communication");
      tips.limitations.push("May not work with all text editors");
      break;
    case "visual":
      tips.bestFor.push("Creating visual art");
      tips.bestFor.push("Accessibility considerations");
      tips.limitations.push("May require special fonts");
      break;
    case "computer":
      tips.bestFor.push("Data transfer and storage");
      tips.bestFor.push("Programming and development");
      tips.combinations.push("Use as intermediate format in chains");
      break;
    default:
      tips.bestFor.push("Creative text transformation");
  }

  // Difficulty-based tips
  const difficulty = getEncoderDifficulty(encoderId);
  if (difficulty <= 2) {
    tips.general.push("Great for beginners and casual use");
  } else if (difficulty >= 4) {
    tips.general.push("Recommended for advanced users");
  }

  return {
    encoder: {
      id: encoder.id,
      name: encoder.name,
      emoji: encoder.emoji,
      description: encoder.description,
    },
    difficulty: getDifficultyLabel(difficulty),
    ...tips,
  };
};
