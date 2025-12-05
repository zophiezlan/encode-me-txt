/**
 * Tests for Batch Encoder Utility
 */

import { describe, it, expect } from 'vitest';
import {
  batchEncode,
  batchDecode,
  multiEncode,
  generateComparisonMatrix,
  chainEncode,
  chainDecode,
  exportBatchResults,
  validateEncoderChain
} from '../utils/batchEncoder.js';

describe('Batch Encoder Utility', () => {
  // ============================================
  // BATCH ENCODE TESTS
  // ============================================
  describe('batchEncode', () => {
    it('encodes multiple texts with a single encoder', () => {
      const texts = ['Hello', 'World', 'Test'];
      const results = batchEncode(texts, 'hex');
      
      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result.success).toBe(true);
        expect(result.output).toBeTruthy();
        expect(result.encoderName).toBe('Hexadecimal');
      });
    });

    it('returns error for invalid encoder', () => {
      const texts = ['Hello'];
      const results = batchEncode(texts, 'invalid-encoder');
      
      expect(results[0].success).toBe(false);
      expect(results[0].error).toBe('Encoder not found');
    });

    it('includes metadata in results', () => {
      const texts = ['Hello'];
      const results = batchEncode(texts, 'base64');
      
      expect(results[0]).toHaveProperty('inputLength');
      expect(results[0]).toHaveProperty('outputLength');
      expect(results[0]).toHaveProperty('expansionRatio');
      expect(results[0]).toHaveProperty('processingTime');
    });

    it('handles empty array', () => {
      const results = batchEncode([], 'hex');
      expect(results).toHaveLength(0);
    });
  });

  // ============================================
  // BATCH DECODE TESTS
  // ============================================
  describe('batchDecode', () => {
    it('decodes multiple encoded texts', () => {
      const encoded = ['48 65 6c 6c 6f', '57 6f 72 6c 64'];
      const results = batchDecode(encoded, 'hex');
      
      expect(results).toHaveLength(2);
      expect(results[0].output).toBe('Hello');
      expect(results[1].output).toBe('World');
    });

    it('returns error for non-reversible encoder', () => {
      const texts = ['test'];
      const results = batchDecode(texts, 'bubble');
      
      expect(results[0].success).toBe(false);
    });
  });

  // ============================================
  // MULTI ENCODE TESTS
  // ============================================
  describe('multiEncode', () => {
    it('encodes single text with multiple encoders', () => {
      const text = 'Hello';
      const encoders = ['hex', 'base64', 'rot13'];
      const results = multiEncode(text, encoders);
      
      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result.input).toBe('Hello');
        expect(result.success).toBe(true);
      });
    });

    it('handles mix of valid and invalid encoders', () => {
      const results = multiEncode('Hello', ['hex', 'invalid', 'base64']);
      
      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(false);
      expect(results[2].success).toBe(true);
    });

    it('includes encoder metadata', () => {
      const results = multiEncode('Test', ['rot13']);
      
      expect(results[0]).toHaveProperty('category');
      expect(results[0]).toHaveProperty('reversible');
      expect(results[0]).toHaveProperty('emoji');
    });
  });

  // ============================================
  // COMPARISON MATRIX TESTS
  // ============================================
  describe('generateComparisonMatrix', () => {
    it('creates a matrix of texts and encoders', () => {
      const matrix = generateComparisonMatrix(
        ['A', 'B'],
        ['hex', 'base64']
      );
      
      expect(matrix.texts).toHaveLength(2);
      expect(matrix.results).toHaveLength(2);
      expect(matrix.results[0].encodings).toHaveProperty('hex');
      expect(matrix.results[0].encodings).toHaveProperty('base64');
    });

    it('marks failed encodings', () => {
      const matrix = generateComparisonMatrix(
        ['Test'],
        ['hex', 'invalid-encoder']
      );
      
      expect(matrix.results[0].encodings.hex.success).toBe(true);
    });
  });

  // ============================================
  // CHAIN ENCODE TESTS
  // ============================================
  describe('chainEncode', () => {
    it('applies encoders in sequence', () => {
      const result = chainEncode('Hello', ['base64', 'hex']);
      
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(2);
      expect(result.originalInput).toBe('Hello');
      expect(result.finalOutput).not.toBe('Hello');
    });

    it('tracks intermediate steps', () => {
      const result = chainEncode('Test', ['base64', 'hex']);
      
      expect(result.steps[0].input).toBe('Test');
      expect(result.steps[1].input).toBe(result.steps[0].output);
    });

    it('stops on first failure', () => {
      const result = chainEncode('Test', ['hex', 'invalid', 'base64']);
      
      expect(result.success).toBe(false);
      expect(result.steps).toHaveLength(2); // hex succeeds, invalid fails
    });

    it('calculates total expansion', () => {
      const result = chainEncode('Hi', ['hex', 'base64']);
      
      expect(result).toHaveProperty('totalExpansion');
      expect(result.totalExpansion).toBeGreaterThan(1);
    });
  });

  // ============================================
  // CHAIN DECODE TESTS
  // ============================================
  describe('chainDecode', () => {
    it('reverses a chain encoding', () => {
      // First encode
      const encoded = chainEncode('Hello', ['base64']);
      
      // Then decode
      const decoded = chainDecode(encoded.finalOutput, ['base64']);
      
      expect(decoded.success).toBe(true);
      expect(decoded.finalOutput).toBe('Hello');
    });

    it('applies decoders in reverse order', () => {
      const decoded = chainDecode('test', ['hex', 'base64']);
      
      // First decoder in chain should be base64 (last encoder)
      expect(decoded.encoderChain[0]).toBe('base64');
      expect(decoded.encoderChain[1]).toBe('hex');
    });
  });

  // ============================================
  // EXPORT RESULTS TESTS
  // ============================================
  describe('exportBatchResults', () => {
    const mockResults = [
      {
        index: 0,
        input: 'Hello',
        output: '48 65 6c 6c 6f',
        encoderName: 'Hexadecimal',
        success: true,
        processingTime: 1.5
      }
    ];

    it('exports as JSON', () => {
      const json = exportBatchResults(mockResults, 'json');
      const parsed = JSON.parse(json);
      
      expect(parsed).toHaveLength(1);
      expect(parsed[0].input).toBe('Hello');
    });

    it('exports as CSV', () => {
      const csv = exportBatchResults(mockResults, 'csv');
      
      expect(csv).toContain('Index,Input,Output');
      expect(csv).toContain('Hello');
      expect(csv).toContain('Hexadecimal');
    });

    it('exports as text', () => {
      const text = exportBatchResults(mockResults, 'text');
      
      expect(text).toContain('[Hexadecimal]');
      expect(text).toContain('Input: Hello');
    });

    it('defaults to JSON', () => {
      const result = exportBatchResults(mockResults);
      expect(() => JSON.parse(result)).not.toThrow();
    });
  });

  // ============================================
  // VALIDATE ENCODER CHAIN TESTS
  // ============================================
  describe('validateEncoderChain', () => {
    it('validates a valid chain', () => {
      const validation = validateEncoderChain(['hex', 'base64', 'rot13']);
      
      expect(validation.valid).toBe(true);
      expect(validation.chainLength).toBe(3);
      expect(validation.issues).toHaveLength(0);
    });

    it('reports invalid encoders', () => {
      const validation = validateEncoderChain(['hex', 'invalid-encoder']);
      
      expect(validation.valid).toBe(false);
      expect(validation.issues).toHaveLength(1);
      expect(validation.issues[0].index).toBe(1);
    });

    it('checks reversibility', () => {
      const validation = validateEncoderChain(['hex', 'base64']);
      
      expect(validation).toHaveProperty('reversible');
      expect(typeof validation.reversible).toBe('boolean');
    });

    it('includes encoder metadata', () => {
      const validation = validateEncoderChain(['hex']);
      
      expect(validation.encoders).toHaveLength(1);
      expect(validation.encoders[0]).toHaveProperty('id');
      expect(validation.encoders[0]).toHaveProperty('name');
    });
  });
});
