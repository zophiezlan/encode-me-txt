/**
 * Encoder Configuration (split into per-category modules).
 * The exported `encoderConfig` array preserves the exact original
 * cross-category ordering used by the UI.
 */

import { secretEncoders } from "./secret.js";
import { classicEncoders } from "./classic.js";
import { computerEncoders } from "./computer.js";
import { cipherEncoders } from "./cipher.js";
import { funEncoders } from "./fun.js";
import { artisticEncoders } from "./artistic.js";
import { advancedEncoders } from "./advanced.js";
import { uniqueEncoders } from "./unique.js";
import { linguisticEncoders } from "./linguistic.js";
import { fantasyEncoders } from "./fantasy.js";
import { visualEncoders } from "./visual.js";
import { retroEncoders } from "./retro.js";
import { ancientEncoders } from "./ancient.js";
import { aestheticEncoders } from "./aesthetic.js";
import { patternsEncoders } from "./patterns.js";
import { forensicsEncoders } from "./forensics.js";
import { scientificEncoders } from "./scientific.js";
import { modernEncoders } from "./modern.js";
import { natureEncoders } from "./nature.js";
import { gamesEncoders } from "./games.js";
import { militaryEncoders } from "./military.js";
import { cryptoEncoders } from "./crypto.js";
import { signaturesEncoders } from "./signatures.js";

export { categories } from "./categories.js";

// Per-category lookup keyed by category name. Each value is the array of
// entries belonging to that category, in their original within-category order.
const _byCategory = {
  secret: secretEncoders,
  classic: classicEncoders,
  computer: computerEncoders,
  cipher: cipherEncoders,
  fun: funEncoders,
  artistic: artisticEncoders,
  advanced: advancedEncoders,
  unique: uniqueEncoders,
  linguistic: linguisticEncoders,
  fantasy: fantasyEncoders,
  visual: visualEncoders,
  retro: retroEncoders,
  ancient: ancientEncoders,
  aesthetic: aestheticEncoders,
  patterns: patternsEncoders,
  forensics: forensicsEncoders,
  scientific: scientificEncoders,
  modern: modernEncoders,
  nature: natureEncoders,
  games: gamesEncoders,
  military: militaryEncoders,
  crypto: cryptoEncoders,
  signatures: signaturesEncoders,
};

// Original cross-category order: for each original encoderConfig index, the
// category name of the entry at that position. We rebuild encoderConfig by
// consuming each per-category array head-to-tail in this exact sequence,
// which guarantees byte-for-byte identical entry order to the pre-split file.
const _originalCategoryOrder = ["secret","classic","computer","computer","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","fun","fun","fun","fun","fun","fun","fun","fun","fun","fun","artistic","artistic","artistic","artistic","artistic","artistic","advanced","advanced","advanced","advanced","advanced","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","unique","advanced","linguistic","linguistic","linguistic","linguistic","linguistic","fantasy","fantasy","fantasy","fantasy","visual","visual","visual","visual","retro","retro","retro","retro","retro","ancient","ancient","ancient","ancient","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","fun","fun","fun","secret","fun","computer","computer","computer","computer","computer","computer","cipher","cipher","cipher","cipher","cipher","cipher","patterns","patterns","patterns","patterns","patterns","patterns","patterns","patterns","patterns","patterns","patterns","patterns","patterns","patterns","patterns","patterns","patterns","patterns","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","forensics","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","modern","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","games","games","games","games","games","games","games","games","games","games","games","games","games","games","games","games","games","games","games","games","games","games","games","fun","fun","fun","fun","computer","classic","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","cipher","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","linguistic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","fun","fun","fun","fun","fun","fun","fun","fun","classic","advanced","advanced","retro","retro","retro","retro","unique","unique","advanced","advanced","fun","fun","fun","unique","unique","unique","unique","modern","modern","unique","unique","unique","computer","computer","computer","computer","computer","computer","modern","scientific","modern","modern","modern","modern","games","games","games","modern","modern","modern","forensics","forensics","linguistic","linguistic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","visual","visual","visual","visual","visual","visual","visual","visual","visual","visual","visual","visual","aesthetic","aesthetic","aesthetic","fun","fun","fun","aesthetic","aesthetic","visual","aesthetic","visual","aesthetic","aesthetic","aesthetic","fun","aesthetic","unique","unique","unique","unique","unique","unique","unique","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","fun","aesthetic","aesthetic","aesthetic","aesthetic","aesthetic","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","nature","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","scientific","linguistic","artistic","artistic","artistic","artistic","military","military","military","military","military","military","military","military","military","military","military","crypto","crypto","crypto","crypto","crypto","crypto","crypto","crypto","crypto","crypto","crypto","crypto","crypto","crypto","crypto","crypto","crypto","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures","signatures"];

const _cursors = Object.fromEntries(Object.keys(_byCategory).map((k) => [k, 0]));

/**
 * Complete encoder configuration array
 * Each encoder includes metadata and function references
 */
export const encoderConfig = _originalCategoryOrder.map((cat) => {
  const idx = _cursors[cat]++;
  return _byCategory[cat][idx];
});

/**
 * Get encoder by ID
 * @param {string} id - The encoder ID
 * @returns {Object|null} - Encoder object or null
 */
export const getEncoderById = (id) => {
  return encoderConfig.find((encoder) => encoder.id === id) || null;
};

// Re-export advanced search utilities
export {
  searchEncoders,
  getAllTags,
  getEncoderStats,
  getFilterPreset,
  filterPresets,
} from "../encoderSearch.js";

import { deduplicateEncoders as dedupEncoders } from "../encoderDeduplication.js";

/**
 * Get deduplicated encoder configuration
 * Removes encoders that are superseded by Pro versions or are aliases of other encoders.
 *
 * IMPORTANT: Redundant encoders defined in encoderRelationships are completely
 * excluded from the system. Only Pro/extended versions are included.
 *
 * Excluded encoders (superseded by Pro versions):
 * - leetspeak → leetspeak-pro
 * - uwu → uwu-pro
 * - spongebob → spongebob-pro
 * - emojipasta → emojipasta-pro
 * - binary → binary-pro
 * - morse → morse-pro
 * - tap-code → tap-code-pro
 * - polybius → polybius-pro
 * - nato → nato-extended
 * - navy-flags → maritime-flags-pro
 *
 * Excluded encoders (aliases of existing encoders):
 * - vaporwave → fullwidth
 * - medieval → math-fraktur
 * - zodiac-signs → zodiac
 * - chess-pieces → chess
 * - weather-symbols → weather
 * - music-notes → musical
 *
 * @param {Object} options - Deduplication options
 * @param {boolean} options.removeSuperseded - Remove encoders superseded by Pro versions (default: true)
 * @param {boolean} options.removeAliases - Remove alias encoders (default: true)
 * @returns {Array} - Deduplicated encoder array
 */
export const getDeduplicatedEncoders = (options = {}) => {
  return dedupEncoders(encoderConfig, options);
};

/**
 * Get encoders with redundancy markers
 * Returns all encoders with isRedundant, redundantType, and preferredEncoder properties added
 * @returns {Array} - Encoder array with redundancy markers
 */
export const getEncodersWithRedundancyMarkers = () => {
  return dedupEncoders(encoderConfig, { markRedundant: true });
};
