/**
 * Batch Encoder Utility
 * Process multiple inputs with multiple encoders at once
 * 
 * Unique Features:
 * - Process multiple texts simultaneously
 * - Apply multiple encoders to each input
 * - Generate comparison matrices
 * - Export results in various formats
 */

import { getEncoderById } from './encoderConfig.js';

/**
 * Batch encode multiple texts with a single encoder
 * @param {string[]} texts - Array of texts to encode
 * @param {string} encoderId - The encoder ID to use
 * @param {Object} options - Additional options for the encoder
 * @returns {Object[]} - Array of results with input, output, and metadata
 */
export const batchEncode = (texts, encoderId, options = {}) => {
  const encoder = getEncoderById(encoderId);
  
  if (!encoder || !encoder.encode) {
    return texts.map(text => ({
      input: text,
      output: '[Encoder not found]',
      encoderId,
      success: false,
      error: 'Encoder not found'
    }));
  }

  return texts.map((text, index) => {
    try {
      const startTime = performance.now();
      const output = encoder.encode(text, options.param);
      const endTime = performance.now();
      
      return {
        input: text,
        output,
        encoderId,
        encoderName: encoder.name,
        index,
        success: true,
        processingTime: endTime - startTime,
        inputLength: text.length,
        outputLength: output.length,
        expansionRatio: output.length / Math.max(text.length, 1)
      };
    } catch (error) {
      return {
        input: text,
        output: '[Encode failed]',
        encoderId,
        encoderName: encoder.name,
        index,
        success: false,
        error: error.message
      };
    }
  });
};

/**
 * Batch decode multiple texts with a single encoder
 * @param {string[]} texts - Array of encoded texts to decode
 * @param {string} encoderId - The encoder ID to use
 * @param {Object} options - Additional options for the decoder
 * @returns {Object[]} - Array of results with input, output, and metadata
 */
export const batchDecode = (texts, encoderId, options = {}) => {
  const encoder = getEncoderById(encoderId);
  
  if (!encoder || !encoder.decode) {
    return texts.map(text => ({
      input: text,
      output: '[Decoder not found or encoder is not reversible]',
      encoderId,
      success: false,
      error: 'Decoder not found'
    }));
  }

  return texts.map((text, index) => {
    try {
      const startTime = performance.now();
      const output = encoder.decode(text, options.param);
      const endTime = performance.now();
      
      return {
        input: text,
        output,
        encoderId,
        encoderName: encoder.name,
        index,
        success: true,
        processingTime: endTime - startTime,
        inputLength: text.length,
        outputLength: output.length
      };
    } catch (error) {
      return {
        input: text,
        output: '[Decode failed]',
        encoderId,
        encoderName: encoder.name,
        index,
        success: false,
        error: error.message
      };
    }
  });
};

/**
 * Multi-encoder batch processing
 * Encode a single text with multiple encoders
 * @param {string} text - The text to encode
 * @param {string[]} encoderIds - Array of encoder IDs to use
 * @param {Object} options - Options keyed by encoder ID
 * @returns {Object[]} - Array of results for each encoder
 */
export const multiEncode = (text, encoderIds, options = {}) => {
  return encoderIds.map(encoderId => {
    const encoder = getEncoderById(encoderId);
    
    if (!encoder || !encoder.encode) {
      return {
        encoderId,
        encoderName: null,
        input: text,
        output: '[Encoder not found]',
        success: false,
        error: 'Encoder not found'
      };
    }

    try {
      const startTime = performance.now();
      const encoderOptions = options[encoderId] || {};
      const output = encoder.encode(text, encoderOptions.param);
      const endTime = performance.now();
      
      return {
        encoderId,
        encoderName: encoder.name,
        category: encoder.category,
        emoji: encoder.emoji,
        input: text,
        output,
        success: true,
        reversible: encoder.reversible,
        processingTime: endTime - startTime,
        inputLength: text.length,
        outputLength: output.length,
        expansionRatio: output.length / Math.max(text.length, 1)
      };
    } catch (error) {
      return {
        encoderId,
        encoderName: encoder.name,
        input: text,
        output: '[Encode failed]',
        success: false,
        error: error.message
      };
    }
  });
};

/**
 * Generate a comparison matrix of multiple texts with multiple encoders
 * @param {string[]} texts - Array of texts to encode
 * @param {string[]} encoderIds - Array of encoder IDs to use
 * @returns {Object} - Matrix with texts as rows and encoders as columns
 */
export const generateComparisonMatrix = (texts, encoderIds) => {
  const matrix = {
    texts,
    encoders: encoderIds.map(id => getEncoderById(id)).filter(Boolean),
    results: []
  };

  for (const text of texts) {
    const row = {
      input: text,
      encodings: {}
    };
    
    for (const encoderId of encoderIds) {
      const encoder = getEncoderById(encoderId);
      if (encoder && encoder.encode) {
        try {
          row.encodings[encoderId] = {
            output: encoder.encode(text),
            success: true
          };
        } catch {
          row.encodings[encoderId] = {
            output: '[Failed]',
            success: false
          };
        }
      }
    }
    
    matrix.results.push(row);
  }

  return matrix;
};

/**
 * Chain encode - apply multiple encoders in sequence
 * @param {string} text - The text to encode
 * @param {string[]} encoderIds - Array of encoder IDs to apply in order
 * @param {Object} options - Options for each encoder
 * @returns {Object} - Result with intermediate steps
 */
export const chainEncode = (text, encoderIds, options = {}) => {
  const steps = [];
  let currentText = text;
  let success = true;

  for (const encoderId of encoderIds) {
    const encoder = getEncoderById(encoderId);
    
    if (!encoder || !encoder.encode) {
      steps.push({
        encoderId,
        input: currentText,
        output: '[Encoder not found]',
        success: false
      });
      success = false;
      break;
    }

    try {
      const encoderOptions = options[encoderId] || {};
      const output = encoder.encode(currentText, encoderOptions.param);
      steps.push({
        encoderId,
        encoderName: encoder.name,
        input: currentText,
        output,
        success: true
      });
      currentText = output;
    } catch (error) {
      steps.push({
        encoderId,
        encoderName: encoder.name,
        input: currentText,
        output: '[Encode failed]',
        success: false,
        error: error.message
      });
      success = false;
      break;
    }
  }

  return {
    originalInput: text,
    finalOutput: currentText,
    steps,
    encoderChain: encoderIds,
    success,
    totalExpansion: currentText.length / Math.max(text.length, 1)
  };
};

/**
 * Chain decode - reverse a chain encoding
 * @param {string} text - The encoded text
 * @param {string[]} encoderIds - Array of encoder IDs in original encoding order
 * @param {Object} options - Options for each decoder
 * @returns {Object} - Result with intermediate steps
 */
export const chainDecode = (text, encoderIds, options = {}) => {
  const reversedIds = [...encoderIds].reverse();
  const steps = [];
  let currentText = text;
  let success = true;

  for (const encoderId of reversedIds) {
    const encoder = getEncoderById(encoderId);
    
    if (!encoder || !encoder.decode) {
      steps.push({
        encoderId,
        input: currentText,
        output: '[Decoder not found]',
        success: false
      });
      success = false;
      break;
    }

    try {
      const encoderOptions = options[encoderId] || {};
      const output = encoder.decode(currentText, encoderOptions.param);
      steps.push({
        encoderId,
        encoderName: encoder.name,
        input: currentText,
        output,
        success: true
      });
      currentText = output;
    } catch (error) {
      steps.push({
        encoderId,
        encoderName: encoder.name,
        input: currentText,
        output: '[Decode failed]',
        success: false,
        error: error.message
      });
      success = false;
      break;
    }
  }

  return {
    originalInput: text,
    finalOutput: currentText,
    steps,
    encoderChain: reversedIds,
    success
  };
};

/**
 * Escape a string for CSV format
 * @param {string} value - The value to escape
 * @returns {string} - Escaped CSV value
 */
const escapeCSV = (value) => {
  if (value == null) return '';
  return `"${String(value).replace(/"/g, '""')}"`;
};

/**
 * Export batch results to various formats
 * @param {Object[]} results - Array of encoding results
 * @param {string} format - Export format ('json', 'csv', 'text')
 * @returns {string} - Formatted output
 */
export const exportBatchResults = (results, format = 'json') => {
  switch (format) {
    case 'csv': {
      const headers = ['Index', 'Input', 'Output', 'Encoder', 'Success', 'Processing Time (ms)'];
      const rows = results.map(r => [
        r.index ?? '',
        escapeCSV(r.input),
        escapeCSV(r.output),
        r.encoderName || r.encoderId || '',
        r.success ? 'Yes' : 'No',
        r.processingTime?.toFixed(2) ?? ''
      ].join(','));
      return [headers.join(','), ...rows].join('\n');
    }
    
    case 'text': {
      return results.map(r => 
        `[${r.encoderName || r.encoderId}]\nInput: ${r.input}\nOutput: ${r.output}\n`
      ).join('\n');
    }
    
    case 'json':
    default:
      return JSON.stringify(results, null, 2);
  }
};

/**
 * Validate encoder chain compatibility
 * Check if all encoders in a chain can work together
 * @param {string[]} encoderIds - Array of encoder IDs
 * @returns {Object} - Validation result
 */
export const validateEncoderChain = (encoderIds) => {
  const issues = [];
  const encoders = encoderIds.map(id => getEncoderById(id));
  
  for (let i = 0; i < encoders.length; i++) {
    const encoder = encoders[i];
    if (!encoder) {
      issues.push({
        index: i,
        encoderId: encoderIds[i],
        issue: 'Encoder not found'
      });
    }
  }

  // Check if chain is reversible
  const allReversible = encoders.every(e => e && e.reversible);
  
  return {
    valid: issues.length === 0,
    issues,
    chainLength: encoderIds.length,
    reversible: allReversible,
    encoders: encoders.filter(Boolean).map(e => ({
      id: e.id,
      name: e.name,
      reversible: e.reversible
    }))
  };
};
