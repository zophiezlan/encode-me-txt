/**
 * Tests for Encoder Analytics Utility
 */

import { describe, it, expect } from 'vitest';
import {
  difficultyLevels,
  getEncoderDifficulty,
  getDifficultyLabel,
  getEncoderStatistics,
  getCategoryAnalysis,
  getEncoderRecommendations,
  analyzeEncoding,
  getEncodingComplexity,
  getPopularCombinations,
  getEncoderTips
} from '../utils/encoderAnalytics.js';

describe('Encoder Analytics Utility', () => {
  // ============================================
  // DIFFICULTY LEVEL TESTS
  // ============================================
  describe('difficultyLevels', () => {
    it('has correct level values', () => {
      expect(difficultyLevels.BEGINNER).toBe(1);
      expect(difficultyLevels.EASY).toBe(2);
      expect(difficultyLevels.MEDIUM).toBe(3);
      expect(difficultyLevels.HARD).toBe(4);
      expect(difficultyLevels.EXPERT).toBe(5);
    });
  });

  describe('getEncoderDifficulty', () => {
    it('returns correct difficulty for known encoders', () => {
      expect(getEncoderDifficulty('reverse')).toBe(difficultyLevels.BEGINNER);
      expect(getEncoderDifficulty('caesar')).toBe(difficultyLevels.EASY);
      expect(getEncoderDifficulty('vigenere')).toBe(difficultyLevels.MEDIUM);
      expect(getEncoderDifficulty('playfair')).toBe(difficultyLevels.HARD);
      expect(getEncoderDifficulty('shuffle')).toBe(difficultyLevels.EXPERT);
    });

    it('defaults to MEDIUM for unknown encoders', () => {
      expect(getEncoderDifficulty('unknown-encoder')).toBe(difficultyLevels.MEDIUM);
    });
  });

  describe('getDifficultyLabel', () => {
    it('returns correct labels', () => {
      expect(getDifficultyLabel(1)).toBe('Beginner');
      expect(getDifficultyLabel(2)).toBe('Easy');
      expect(getDifficultyLabel(3)).toBe('Medium');
      expect(getDifficultyLabel(4)).toBe('Hard');
      expect(getDifficultyLabel(5)).toBe('Expert');
    });

    it('returns Unknown for invalid levels', () => {
      expect(getDifficultyLabel(0)).toBe('Unknown');
      expect(getDifficultyLabel(6)).toBe('Unknown');
    });
  });

  // ============================================
  // ENCODER STATISTICS TESTS
  // ============================================
  describe('getEncoderStatistics', () => {
    it('returns comprehensive statistics', () => {
      const stats = getEncoderStatistics();
      
      expect(stats).toHaveProperty('total');
      expect(stats).toHaveProperty('reversible');
      expect(stats).toHaveProperty('nonReversible');
      expect(stats).toHaveProperty('byCategory');
      expect(stats).toHaveProperty('byDifficulty');
      expect(stats).toHaveProperty('tags');
    });

    it('has positive total count', () => {
      const stats = getEncoderStatistics();
      expect(stats.total).toBeGreaterThan(0);
    });

    it('reversible + nonReversible equals total', () => {
      const stats = getEncoderStatistics();
      expect(stats.reversible + stats.nonReversible).toBe(stats.total);
    });

    it('includes category distribution', () => {
      const stats = getEncoderStatistics();
      const categoryTotal = Object.values(stats.byCategory).reduce((a, b) => a + b, 0);
      expect(categoryTotal).toBe(stats.total);
    });

    it('includes percentage calculations', () => {
      const stats = getEncoderStatistics();
      expect(stats).toHaveProperty('reversiblePercent');
      expect(parseFloat(stats.reversiblePercent)).toBeGreaterThanOrEqual(0);
      expect(parseFloat(stats.reversiblePercent)).toBeLessThanOrEqual(100);
    });
  });

  // ============================================
  // CATEGORY ANALYSIS TESTS
  // ============================================
  describe('getCategoryAnalysis', () => {
    it('returns analysis for all categories', () => {
      const analysis = getCategoryAnalysis();
      
      expect(Array.isArray(analysis)).toBe(true);
      expect(analysis.length).toBeGreaterThan(0);
    });

    it('each category has required properties', () => {
      const analysis = getCategoryAnalysis();
      
      analysis.forEach(cat => {
        expect(cat).toHaveProperty('id');
        expect(cat).toHaveProperty('name');
        expect(cat).toHaveProperty('totalEncoders');
        expect(cat).toHaveProperty('reversibleEncoders');
        expect(cat).toHaveProperty('averageDifficulty');
      });
    });

    it('sorts categories by encoder count', () => {
      const analysis = getCategoryAnalysis();
      
      for (let i = 1; i < analysis.length; i++) {
        expect(analysis[i - 1].totalEncoders).toBeGreaterThanOrEqual(analysis[i].totalEncoders);
      }
    });

    it('includes encoder IDs for each category', () => {
      const analysis = getCategoryAnalysis();
      
      analysis.forEach(cat => {
        expect(Array.isArray(cat.encoderIds)).toBe(true);
        expect(cat.encoderIds.length).toBe(cat.totalEncoders);
      });
    });
  });

  // ============================================
  // ENCODER RECOMMENDATIONS TESTS
  // ============================================
  describe('getEncoderRecommendations', () => {
    it('returns recommendations with no criteria', () => {
      const recommendations = getEncoderRecommendations();
      
      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations.length).toBeLessThanOrEqual(10); // default limit
    });

    it('filters by reversibility', () => {
      const recommendations = getEncoderRecommendations({ mustBeReversible: true });
      
      recommendations.forEach(encoder => {
        expect(encoder.reversible).toBe(true);
      });
    });

    it('filters by difficulty', () => {
      const recommendations = getEncoderRecommendations({ difficulty: 'easy' });
      
      recommendations.forEach(encoder => {
        expect(encoder.difficulty).toBe(difficultyLevels.EASY);
      });
    });

    it('filters by category', () => {
      const recommendations = getEncoderRecommendations({ category: 'cipher' });
      
      recommendations.forEach(encoder => {
        expect(encoder.category).toBe('cipher');
      });
    });

    it('respects limit parameter', () => {
      const recommendations = getEncoderRecommendations({ limit: 5 });
      
      expect(recommendations.length).toBeLessThanOrEqual(5);
    });

    it('includes difficulty metadata', () => {
      const recommendations = getEncoderRecommendations();
      
      recommendations.forEach(encoder => {
        expect(encoder).toHaveProperty('difficulty');
        expect(encoder).toHaveProperty('difficultyLabel');
      });
    });
  });

  // ============================================
  // ENCODING ANALYSIS TESTS
  // ============================================
  describe('analyzeEncoding', () => {
    it('analyzes encoding results', () => {
      const analysis = analyzeEncoding('Hello', '48 65 6c 6c 6f', 'hex');
      
      expect(analysis).toHaveProperty('inputLength', 5);
      expect(analysis).toHaveProperty('outputLength');
      expect(analysis).toHaveProperty('expansionRatio');
      expect(analysis).toHaveProperty('encoderName');
    });

    it('includes character analysis', () => {
      const analysis = analyzeEncoding('Test', '54 65 73 74', 'hex');
      
      expect(analysis).toHaveProperty('inputUniqueChars');
      expect(analysis).toHaveProperty('outputUniqueChars');
      expect(analysis).toHaveProperty('containsSpaces');
      expect(analysis).toHaveProperty('containsNumbers');
    });

    it('calculates readability score', () => {
      const analysis = analyzeEncoding('Hello', 'Uryyb', 'rot13');
      
      expect(analysis).toHaveProperty('readabilityScore');
      expect(analysis.readabilityScore).toBeGreaterThanOrEqual(0);
      expect(analysis.readabilityScore).toBeLessThanOrEqual(100);
    });

    it('includes encoder metadata', () => {
      const analysis = analyzeEncoding('Test', 'test', 'reverse');
      
      expect(analysis).toHaveProperty('isReversible');
      expect(analysis).toHaveProperty('difficulty');
      expect(analysis).toHaveProperty('category');
    });
  });

  // ============================================
  // ENCODING COMPLEXITY TESTS
  // ============================================
  describe('getEncodingComplexity', () => {
    it('returns complexity analysis', () => {
      const complexity = getEncodingComplexity('Hello', 'Uryyb', 'rot13');
      
      expect(complexity).toHaveProperty('totalScore');
      expect(complexity).toHaveProperty('factors');
      expect(complexity).toHaveProperty('level');
      expect(complexity).toHaveProperty('recommendation');
    });

    it('score is between 0 and 100', () => {
      const complexity = getEncodingComplexity('Test', 'encoded', 'caesar');
      
      expect(complexity.totalScore).toBeGreaterThanOrEqual(0);
      expect(complexity.totalScore).toBeLessThanOrEqual(100);
    });

    it('includes scoring factors', () => {
      const complexity = getEncodingComplexity('Hello', 'Output', 'vigenere');
      
      expect(Array.isArray(complexity.factors)).toBe(true);
      complexity.factors.forEach(factor => {
        expect(factor).toHaveProperty('name');
        expect(factor).toHaveProperty('score');
        expect(factor).toHaveProperty('description');
      });
    });

    it('gives higher score to complex encoders', () => {
      const simpleComplexity = getEncodingComplexity('Test', 'tseT', 'reverse');
      const complexComplexity = getEncodingComplexity('Test', 'xyz', 'shuffle');
      
      expect(complexComplexity.totalScore).toBeGreaterThan(simpleComplexity.totalScore);
    });
  });

  // ============================================
  // POPULAR COMBINATIONS TESTS
  // ============================================
  describe('getPopularCombinations', () => {
    it('returns combinations for different purposes', () => {
      const funCombos = getPopularCombinations('fun');
      const secureCombos = getPopularCombinations('secure');
      const visualCombos = getPopularCombinations('visual');
      const eduCombos = getPopularCombinations('educational');
      
      expect(funCombos.length).toBeGreaterThan(0);
      expect(secureCombos.length).toBeGreaterThan(0);
      expect(visualCombos.length).toBeGreaterThan(0);
      expect(eduCombos.length).toBeGreaterThan(0);
    });

    it('each combination has required properties', () => {
      const combos = getPopularCombinations('fun');
      
      combos.forEach(combo => {
        expect(combo).toHaveProperty('name');
        expect(combo).toHaveProperty('description');
        expect(combo).toHaveProperty('encoders');
        expect(combo).toHaveProperty('difficulty');
        expect(Array.isArray(combo.encoders)).toBe(true);
      });
    });

    it('defaults to fun purpose', () => {
      const defaultCombos = getPopularCombinations();
      const funCombos = getPopularCombinations('fun');
      
      expect(defaultCombos).toEqual(funCombos);
    });
  });

  // ============================================
  // ENCODER TIPS TESTS
  // ============================================
  describe('getEncoderTips', () => {
    it('returns tips for valid encoder', () => {
      const tips = getEncoderTips('caesar');
      
      expect(tips).not.toBeNull();
      expect(tips).toHaveProperty('encoder');
      expect(tips).toHaveProperty('difficulty');
      expect(tips).toHaveProperty('general');
      expect(tips).toHaveProperty('bestFor');
      expect(tips).toHaveProperty('limitations');
      expect(tips).toHaveProperty('combinations');
    });

    it('returns null for invalid encoder', () => {
      const tips = getEncoderTips('invalid-encoder');
      expect(tips).toBeNull();
    });

    it('includes encoder metadata', () => {
      const tips = getEncoderTips('hex');
      
      expect(tips.encoder).toHaveProperty('id');
      expect(tips.encoder).toHaveProperty('name');
      expect(tips.encoder).toHaveProperty('emoji');
    });

    it('provides relevant tips based on category', () => {
      const cipherTips = getEncoderTips('caesar');
      const _funTips = getEncoderTips('bubble');
      
      // Cipher tips should mention cryptography or puzzles
      expect(cipherTips.bestFor.some(tip => 
        tip.toLowerCase().includes('crypto') || 
        tip.toLowerCase().includes('puzzle')
      )).toBe(true);
    });

    it('indicates reversibility in tips', () => {
      const reversibleTips = getEncoderTips('base64');
      const nonReversibleTips = getEncoderTips('bubble');
      
      expect(reversibleTips.general.some(tip => 
        tip.toLowerCase().includes('decod')
      )).toBe(true);
      
      expect(nonReversibleTips.limitations.some(tip => 
        tip.toLowerCase().includes('one-way') || 
        tip.toLowerCase().includes('cannot')
      )).toBe(true);
    });
  });
});
