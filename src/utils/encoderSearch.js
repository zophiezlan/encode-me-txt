/**
 * Advanced Encoder Search and Filtering Utility
 * Provides comprehensive search and filter capabilities for encoders
 */

/**
 * Search options for advanced encoder filtering
 * @typedef {Object} SearchOptions
 * @property {string} query - Text search query
 * @property {string[]} categories - Filter by categories
 * @property {string[]} tags - Filter by tags (AND logic)
 * @property {string[]} anyTags - Filter by tags (OR logic)
 * @property {string[]} excludeTags - Exclude encoders with these tags
 * @property {boolean|null} reversible - Filter by reversibility (true/false/null for all)
 * @property {boolean|null} hasSettings - Filter by settings availability
 * @property {boolean|null} special - Filter by special encoders
 * @property {string} sortBy - Sort field ('name', 'category', 'id', 'default')
 * @property {string} sortOrder - Sort order ('asc', 'desc')
 */

/**
 * Default search options
 */
export const defaultSearchOptions = {
  query: '',
  categories: [],
  tags: [],
  anyTags: [],
  excludeTags: [],
  reversible: null,
  hasSettings: null,
  special: null,
  sortBy: 'default',
  sortOrder: 'asc'
};

/**
 * Normalize text for search comparison
 * @param {string} text - Text to normalize
 * @returns {string} - Normalized text
 */
const normalizeText = (text) => {
  return (text || '').toLowerCase().trim();
};

/**
 * Check if encoder matches text query
 * Searches name, description, id, and tags
 * @param {Object} encoder - Encoder object
 * @param {string} query - Search query
 * @returns {boolean} - True if matches
 */
const matchesQuery = (encoder, query) => {
  if (!query) return true;
  
  const normalizedQuery = normalizeText(query);
  const searchTerms = normalizedQuery.split(/\s+/).filter(Boolean);
  
  // All search terms must match somewhere
  return searchTerms.every(term => {
    const matchesName = normalizeText(encoder.name).includes(term);
    const matchesDescription = normalizeText(encoder.description).includes(term);
    const matchesId = normalizeText(encoder.id).includes(term);
    const matchesCategory = normalizeText(encoder.category).includes(term);
    const matchesTags = encoder.tags?.some(tag => normalizeText(tag).includes(term)) || false;
    
    return matchesName || matchesDescription || matchesId || matchesCategory || matchesTags;
  });
};

/**
 * Check if encoder matches category filter
 * @param {Object} encoder - Encoder object
 * @param {string[]} categories - Category filter array
 * @returns {boolean} - True if matches
 */
const matchesCategories = (encoder, categories) => {
  if (!categories || categories.length === 0) return true;
  return categories.includes(encoder.category);
};

/**
 * Check if encoder matches tag filter (AND logic - must have all tags)
 * @param {Object} encoder - Encoder object
 * @param {string[]} tags - Tag filter array
 * @returns {boolean} - True if matches
 */
const matchesTags = (encoder, tags) => {
  if (!tags || tags.length === 0) return true;
  return tags.every(tag => encoder.tags?.includes(tag));
};

/**
 * Check if encoder matches any tag filter (OR logic - must have at least one)
 * @param {Object} encoder - Encoder object
 * @param {string[]} anyTags - Tag filter array
 * @returns {boolean} - True if matches
 */
const matchesAnyTag = (encoder, anyTags) => {
  if (!anyTags || anyTags.length === 0) return true;
  return anyTags.some(tag => encoder.tags?.includes(tag));
};

/**
 * Check if encoder should be excluded by tags
 * @param {Object} encoder - Encoder object
 * @param {string[]} excludeTags - Tags to exclude
 * @returns {boolean} - True if should be excluded
 */
const shouldExcludeByTags = (encoder, excludeTags) => {
  if (!excludeTags || excludeTags.length === 0) return false;
  return excludeTags.some(tag => encoder.tags?.includes(tag));
};

/**
 * Check if encoder matches boolean filter
 * @param {Object} encoder - Encoder object
 * @param {string} field - Field name
 * @param {boolean|null} value - Filter value (null means any)
 * @returns {boolean} - True if matches
 */
const matchesBooleanFilter = (encoder, field, value) => {
  if (value === null || value === undefined) return true;
  return encoder[field] === value;
};

/**
 * Compare function for sorting encoders
 * @param {Object} a - First encoder
 * @param {Object} b - Second encoder
 * @param {string} sortBy - Sort field
 * @param {string} sortOrder - Sort order
 * @returns {number} - Comparison result
 */
const compareEncoders = (a, b, sortBy, sortOrder) => {
  let comparison = 0;
  
  switch (sortBy) {
    case 'name':
      comparison = a.name.localeCompare(b.name);
      break;
    case 'category':
      comparison = a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      break;
    case 'id':
      comparison = a.id.localeCompare(b.id);
      break;
    case 'default':
    default:
      return 0; // Keep original order
  }
  
  return sortOrder === 'desc' ? -comparison : comparison;
};

/**
 * Search and filter encoders with advanced options
 * @param {Array} encoders - Array of encoder objects
 * @param {SearchOptions} options - Search and filter options
 * @returns {Array} - Filtered and sorted encoder array
 */
export const searchEncoders = (encoders, options = {}) => {
  const opts = { ...defaultSearchOptions, ...options };
  
  let results = encoders.filter(encoder => {
    // Text search
    if (!matchesQuery(encoder, opts.query)) return false;
    
    // Category filter
    if (!matchesCategories(encoder, opts.categories)) return false;
    
    // Tag filters
    if (!matchesTags(encoder, opts.tags)) return false;
    if (!matchesAnyTag(encoder, opts.anyTags)) return false;
    if (shouldExcludeByTags(encoder, opts.excludeTags)) return false;
    
    // Boolean filters
    if (!matchesBooleanFilter(encoder, 'reversible', opts.reversible)) return false;
    if (!matchesBooleanFilter(encoder, 'hasSettings', opts.hasSettings)) return false;
    if (!matchesBooleanFilter(encoder, 'special', opts.special)) return false;
    
    return true;
  });
  
  // Sort results
  if (opts.sortBy !== 'default') {
    results = [...results].sort((a, b) => compareEncoders(a, b, opts.sortBy, opts.sortOrder));
  }
  
  return results;
};

/**
 * Get all unique tags from encoders
 * @param {Array} encoders - Array of encoder objects
 * @returns {string[]} - Sorted array of unique tags
 */
export const getAllTags = (encoders) => {
  const tags = new Set();
  encoders.forEach(encoder => {
    encoder.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

/**
 * Get all unique categories from encoders
 * @param {Array} encoders - Array of encoder objects
 * @returns {string[]} - Sorted array of unique categories
 */
export const getAllCategories = (encoders) => {
  const categories = new Set();
  encoders.forEach(encoder => {
    if (encoder.category) categories.add(encoder.category);
  });
  return Array.from(categories).sort();
};

/**
 * Get encoder statistics
 * @param {Array} encoders - Array of encoder objects
 * @returns {Object} - Statistics object
 */
export const getEncoderStats = (encoders) => {
  const stats = {
    total: encoders.length,
    reversible: 0,
    nonReversible: 0,
    withSettings: 0,
    special: 0,
    byCategory: {},
    tagCounts: {}
  };
  
  encoders.forEach(encoder => {
    if (encoder.reversible) stats.reversible++;
    else stats.nonReversible++;
    
    if (encoder.hasSettings) stats.withSettings++;
    if (encoder.special) stats.special++;
    
    if (encoder.category) {
      stats.byCategory[encoder.category] = (stats.byCategory[encoder.category] || 0) + 1;
    }
    
    encoder.tags?.forEach(tag => {
      stats.tagCounts[tag] = (stats.tagCounts[tag] || 0) + 1;
    });
  });
  
  return stats;
};

/**
 * Find similar encoders based on tags and category
 * @param {Object} encoder - Reference encoder
 * @param {Array} encoders - Array of encoder objects to search
 * @param {number} limit - Maximum results to return
 * @returns {Array} - Array of similar encoders (excluding the reference)
 */
export const findSimilarEncoders = (encoder, encoders, limit = 5) => {
  const scores = encoders
    .filter(e => e.id !== encoder.id)
    .map(e => {
      let score = 0;
      
      // Same category bonus
      if (e.category === encoder.category) score += 3;
      
      // Shared tags bonus
      const sharedTags = encoder.tags?.filter(tag => e.tags?.includes(tag)) || [];
      score += sharedTags.length * 2;
      
      // Same reversibility bonus
      if (e.reversible === encoder.reversible) score += 1;
      
      return { encoder: e, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  
  return scores.map(item => item.encoder);
};

/**
 * Group encoders by a field
 * @param {Array} encoders - Array of encoder objects
 * @param {string} field - Field to group by ('category', 'reversible', etc.)
 * @returns {Object} - Object with field values as keys and encoder arrays as values
 */
export const groupEncodersBy = (encoders, field) => {
  const groups = {};
  
  encoders.forEach(encoder => {
    const value = encoder[field];
    const key = value === undefined || value === null ? 'unknown' : String(value);
    if (!groups[key]) groups[key] = [];
    groups[key].push(encoder);
  });
  
  return groups;
};

/**
 * Create a quick filter preset
 * @param {string} presetName - Name of the preset
 * @returns {SearchOptions} - Search options for the preset
 */
export const getFilterPreset = (presetName) => {
  const presets = {
    'all': { ...defaultSearchOptions },
    'reversible': { ...defaultSearchOptions, reversible: true },
    'non-reversible': { ...defaultSearchOptions, reversible: false },
    'with-settings': { ...defaultSearchOptions, hasSettings: true },
    'special': { ...defaultSearchOptions, special: true },
    'ciphers': { ...defaultSearchOptions, categories: ['cipher'] },
    'fun': { ...defaultSearchOptions, categories: ['fun'] },
    'classic': { ...defaultSearchOptions, categories: ['classic'] },
    'computer': { ...defaultSearchOptions, categories: ['computer'] },
    'artistic': { ...defaultSearchOptions, categories: ['artistic'] },
    'linguistic': { ...defaultSearchOptions, categories: ['linguistic'] },
    'pro-versions': { ...defaultSearchOptions, anyTags: ['settings'] },
  };
  
  return presets[presetName] || defaultSearchOptions;
};

/**
 * Available filter presets
 */
export const filterPresets = [
  { id: 'all', name: 'All Encoders', emoji: '📋' },
  { id: 'reversible', name: 'Reversible Only', emoji: '🔄' },
  { id: 'non-reversible', name: 'One-Way Only', emoji: '➡️' },
  { id: 'with-settings', name: 'With Settings', emoji: '⚙️' },
  { id: 'special', name: 'Special', emoji: '✨' },
  { id: 'ciphers', name: 'Ciphers', emoji: '🔐' },
  { id: 'fun', name: 'Fun & Creative', emoji: '🎉' },
  { id: 'classic', name: 'Classic Codes', emoji: '📻' },
  { id: 'computer', name: 'Computer Science', emoji: '💻' },
  { id: 'artistic', name: 'Artistic', emoji: '🎨' },
  { id: 'linguistic', name: 'Languages', emoji: '🌍' },
];
