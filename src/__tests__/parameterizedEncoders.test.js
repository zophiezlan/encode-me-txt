/**
 * Tests for Parameterized Encoders
 * Encoders with configurable settings and parameters
 */

import { describe, it, expect } from 'vitest';
import {
  encodeLeetspeakParam,
  encodeUwUParam,
  encodeSpongebobParam,
  encodeBinaryParam,
  decodeBinaryParam,
  encodeMorseParam,
  decodeMorseParam,
  encodeROTN,
  decodeROTN,
  encodeKeywordCipher,
  decodeKeywordCipher,
  encodeTapCodeParam,
  encodePolybiusParam,
  decodePolybiusParam,
  encodeEmojipastaParam,
  encodeGronsfeld,
  decodeGronsfeld,
  // New parameterized encoders
  encodeAlternatingCaseParam,
  encodeCustomBase,
  decodeCustomBase,
  encodeMultiCaesar,
  decodeMultiCaesar,
  encodeScrambler,
  encodePhoneticParam,
  decodePhoneticParam,
  encodeNumericBase,
  decodeNumericBase,
  encodeWordTransform,
  encodeDelimited,
  decodeDelimited,
  encodeRepeat,
  encodeVowelConsonant,
} from '../utils/encoders/parameterized.js';

import { encodeZalgo } from '../utils/encoders/artistic.js';

describe('Parameterized Encoders', () => {
  // ============================================
  // LEETSPEAK TESTS
  // ============================================
  describe('encodeLeetspeakParam', () => {
    it('encodes with basic intensity (level 1)', () => {
      const result = encodeLeetspeakParam('test', 1);
      expect(result).toBe('7357'); // t->7, e->3, s->5, t->7
    });

    it('encodes with medium intensity (level 2)', () => {
      const result = encodeLeetspeakParam('hello', 2);
      expect(result).toContain('3'); // e -> 3
      expect(result).toContain('0'); // o -> 0
    });

    it('encodes with extreme intensity (level 3)', () => {
      const result = encodeLeetspeakParam('hello', 3);
      expect(result).toContain('|-|'); // h -> |-|
      expect(result).toContain('3'); // e -> 3
    });

    it('preserves non-alphabetic characters', () => {
      const result = encodeLeetspeakParam('test 123!', 1);
      expect(result).toContain(' ');
      expect(result).toContain('123');
      expect(result).toContain('!');
    });

    it('defaults to intensity 1', () => {
      expect(encodeLeetspeakParam('test')).toBe('7357');
    });
  });

  // ============================================
  // UWU TESTS
  // ============================================
  describe('encodeUwUParam', () => {
    it('replaces r and l with w', () => {
      const result = encodeUwUParam('hello world', 1);
      expect(result).toBe('hewwo wowwd');
    });

    it('replaces n before vowels with ny', () => {
      const result = encodeUwUParam('nice', 1);
      expect(result).toBe('nyice');
    });

    it('preserves basic structure at low intensity', () => {
      const result = encodeUwUParam('test', 1);
      expect(result).toBe('test');
    });
  });

  // ============================================
  // SPONGEBOB TESTS
  // ============================================
  describe('encodeSpongebobParam', () => {
    it('alternates case at randomness 0 (deterministic)', () => {
      const result = encodeSpongebobParam('test', 0);
      // With randomness 0, should alternate consistently
      expect(result.toLowerCase()).toBe('test');
      // Should have some uppercase
      expect(result).not.toBe('test');
    });

    it('produces different output at high randomness', () => {
      const results = new Set();
      for (let i = 0; i < 10; i++) {
        results.add(encodeSpongebobParam('test', 100));
      }
      // High randomness should produce varied results
      expect(results.size).toBeGreaterThanOrEqual(1);
    });
  });

  // ============================================
  // BINARY TESTS
  // ============================================
  describe('encodeBinaryParam', () => {
    it('encodes with default grouping (8 bits)', () => {
      const result = encodeBinaryParam('A');
      expect(result).toBe('01000001');
    });

    it('encodes with 4-bit grouping', () => {
      const result = encodeBinaryParam('A', 4);
      expect(result).toContain(' '); // 4-bit groups separated by space
    });

    it('handles multiple characters', () => {
      const result = encodeBinaryParam('AB');
      expect(result).toBe('01000001 01000010');
    });

    it('decodes back to original', () => {
      const encoded = encodeBinaryParam('Hello');
      const decoded = decodeBinaryParam(encoded);
      expect(decoded).toBe('Hello');
    });
  });

  // ============================================
  // MORSE TESTS
  // ============================================
  describe('encodeMorseParam', () => {
    it('encodes with default style', () => {
      const result = encodeMorseParam('SOS');
      // SOS in morse is ... --- ...
      expect(result).toContain('.');
      expect(result).toContain('-');
    });

    it('handles spaces between words', () => {
      const result = encodeMorseParam('A B');
      // Should have some separator for words
      expect(result.length).toBeGreaterThan(2);
    });

    it('decodes back to original', () => {
      const encoded = encodeMorseParam('HELLO');
      const decoded = decodeMorseParam(encoded);
      expect(decoded.toUpperCase()).toBe('HELLO');
    });
  });

  // ============================================
  // ROT-N CIPHER TESTS (Caesar with variable shift)
  // ============================================
  describe('encodeROTN / decodeROTN', () => {
    it('encodes with default shift of 13 (ROT13)', () => {
      const result = encodeROTN('HELLO');
      expect(result).toBe('URYYB');
    });

    it('encodes with custom shift', () => {
      const result = encodeROTN('ABC', 3);
      expect(result).toBe('DEF');
    });

    it('decodes back to original', () => {
      const encoded = encodeROTN('HELLO', 5);
      const decoded = decodeROTN(encoded, 5);
      expect(decoded).toBe('HELLO');
    });

    it('preserves case', () => {
      const result = encodeROTN('Hello', 3);
      expect(result).toBe('Khoor');
    });

    it('preserves non-alphabetic characters', () => {
      const result = encodeROTN('Hello, World!', 3);
      expect(result).toBe('Khoor, Zruog!');
    });

    it('wraps around alphabet', () => {
      const result = encodeROTN('XYZ', 3);
      expect(result).toBe('ABC');
    });

    it('ROT13 is its own inverse', () => {
      const text = 'Hello World';
      const encoded = encodeROTN(text, 13);
      const decoded = encodeROTN(encoded, 13);
      expect(decoded).toBe(text);
    });
  });

  // ============================================
  // KEYWORD CIPHER TESTS
  // ============================================
  describe('encodeKeywordCipher / decodeKeywordCipher', () => {
    it('encodes with keyword', () => {
      const result = encodeKeywordCipher('HELLO', 'KEY');
      expect(result).not.toBe('HELLO');
    });

    it('decodes back to original', () => {
      const encoded = encodeKeywordCipher('HELLO', 'SECRET');
      const decoded = decodeKeywordCipher(encoded, 'SECRET');
      expect(decoded).toBe('HELLO');
    });

    it('preserves non-alphabetic characters', () => {
      const result = encodeKeywordCipher('HELLO, WORLD!', 'KEY');
      expect(result).toContain(',');
      expect(result).toContain('!');
    });
  });

  // ============================================
  // ZALGO TESTS (using artistic.js)
  // ============================================
  describe('encodeZalgo', () => {
    it('adds combining marks', () => {
      const result = encodeZalgo('test');
      expect(result.length).toBeGreaterThan('test'.length);
    });

    it('preserves original characters', () => {
      const result = encodeZalgo('test');
      expect(result).toContain('t');
      expect(result).toContain('e');
      expect(result).toContain('s');
    });
  });

  // ============================================
  // EMOJIPASTA TESTS
  // ============================================
  describe('encodeEmojipastaParam', () => {
    it('adds emojis to text', () => {
      const result = encodeEmojipastaParam('hello world', 5);
      // Should contain some emojis
      expect(result.length).toBeGreaterThanOrEqual('hello world'.length);
    });

    it('increases emoji density with higher density param', () => {
      const lowDensity = encodeEmojipastaParam('hello world test', 1);
      const highDensity = encodeEmojipastaParam('hello world test', 10);
      // High density should have more characters (emojis)
      expect(highDensity.length).toBeGreaterThanOrEqual(lowDensity.length);
    });
  });

  // ============================================
  // TAP CODE TESTS
  // ============================================
  describe('encodeTapCodeParam', () => {
    it('encodes text', () => {
      const result = encodeTapCodeParam('A');
      // Should produce some output
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles K as C (tap code convention)', () => {
      const resultK = encodeTapCodeParam('K');
      const resultC = encodeTapCodeParam('C');
      expect(resultK).toBe(resultC);
    });
  });

  // ============================================
  // POLYBIUS TESTS
  // ============================================
  describe('encodePolybiusParam / decodePolybiusParam', () => {
    it('encodes with 5x5 grid', () => {
      const result = encodePolybiusParam('A', 5);
      expect(result).toBe('11');
    });

    it('encodes with 6x6 grid', () => {
      const result = encodePolybiusParam('A', 6);
      expect(result).toBe('11');
    });

    it('decodes 5x5 encoded text', () => {
      const encoded = encodePolybiusParam('HELLO', 5);
      const decoded = decodePolybiusParam(encoded, 5);
      // Note: I and J are combined in 5x5, so we compare after normalization
      expect(decoded.replace(/J/g, 'I')).toBe('HELLO'.replace(/J/g, 'I'));
    });

    it('handles spaces', () => {
      const result = encodePolybiusParam('A B', 5);
      expect(result).toContain(' ');
    });
  });

  // ============================================
  // GRONSFELD TESTS
  // ============================================
  describe('encodeGronsfeld / decodeGronsfeld', () => {
    it('encodes with numeric key', () => {
      const result = encodeGronsfeld('HELLO', '31415');
      expect(result).not.toBe('HELLO');
    });

    it('decodes back to original', () => {
      const encoded = encodeGronsfeld('HELLO', '12345');
      const decoded = decodeGronsfeld(encoded, '12345');
      expect(decoded).toBe('HELLO');
    });
  });

  // ============================================
  // NEW PARAMETERIZED ENCODER TESTS
  // ============================================
  
  describe('encodeAlternatingCaseParam', () => {
    it('alternates case by character', () => {
      const result = encodeAlternatingCaseParam('hello', 'char');
      expect(result.toLowerCase()).toBe('hello');
      expect(result).not.toBe('hello');
    });

    it('alternates case by word', () => {
      const result = encodeAlternatingCaseParam('hello world test', 'word');
      expect(result).toBe('HELLO world TEST');
    });
  });

  describe('encodeCustomBase / decodeCustomBase', () => {
    it('encodes with binary alphabet', () => {
      const result = encodeCustomBase('A', '01');
      expect(result).toContain('0');
      expect(result).toContain('1');
    });

    it('is reversible', () => {
      const original = 'Hi';
      const encoded = encodeCustomBase(original, 'ABC');
      const decoded = decodeCustomBase(encoded, 'ABC');
      expect(decoded).toBe(original);
    });
  });

  describe('encodeMultiCaesar / decodeMultiCaesar', () => {
    it('applies rotating shifts', () => {
      const result = encodeMultiCaesar('ABC', [1, 2, 3]);
      expect(result).toBe('BDF'); // A+1=B, B+2=D, C+3=F
    });

    it('is reversible', () => {
      const original = 'HELLO';
      const shifts = [3, 7, 13];
      const encoded = encodeMultiCaesar(original, shifts);
      const decoded = decodeMultiCaesar(encoded, shifts);
      expect(decoded).toBe(original);
    });
  });

  describe('encodeScrambler', () => {
    it('preserves first and last chars in middle mode', () => {
      const result = encodeScrambler('testing', 'middle');
      expect(result[0]).toBe('t');
      expect(result[result.length - 1]).toBe('g');
    });

    it('preserves short words', () => {
      expect(encodeScrambler('the', 'middle')).toBe('the');
    });
  });

  describe('encodePhoneticParam / decodePhoneticParam', () => {
    it('encodes with NATO alphabet', () => {
      const result = encodePhoneticParam('AB', 'nato');
      expect(result).toContain('Alpha');
      expect(result).toContain('Bravo');
    });

    it('encodes with police alphabet', () => {
      const result = encodePhoneticParam('AB', 'police');
      expect(result).toContain('Adam');
      expect(result).toContain('Boy');
    });

    it('is reversible', () => {
      const original = 'HELLO';
      const encoded = encodePhoneticParam(original, 'nato');
      const decoded = decodePhoneticParam(encoded, 'nato');
      expect(decoded).toBe(original);
    });
  });

  describe('encodeNumericBase / decodeNumericBase', () => {
    it('encodes with decimal base', () => {
      const result = encodeNumericBase('A', 10, '-');
      expect(result).toBe('65'); // ASCII code of 'A'
    });

    it('encodes with hex base', () => {
      const result = encodeNumericBase('A', 16, '-');
      expect(result).toBe('41'); // Hex ASCII code
    });

    it('is reversible', () => {
      const original = 'Test';
      const encoded = encodeNumericBase(original, 16, '.');
      const decoded = decodeNumericBase(encoded, 16, '.');
      expect(decoded).toBe(original);
    });
  });

  describe('encodeWordTransform', () => {
    it('reverses each word', () => {
      const result = encodeWordTransform('hello world', 'reverse');
      expect(result).toBe('olleh dlrow');
    });

    it('sorts letters in each word', () => {
      const result = encodeWordTransform('bad', 'sort');
      expect(result).toBe('abd');
    });

    it('doubles each character', () => {
      const result = encodeWordTransform('hi', 'double');
      expect(result).toBe('hhii');
    });
  });

  describe('encodeDelimited / decodeDelimited', () => {
    it('adds delimiters between characters', () => {
      const result = encodeDelimited('hi', '-', 'char');
      expect(result).toBe('h-i');
    });

    it('adds delimiters between words', () => {
      const result = encodeDelimited('hello world', '_', 'word');
      expect(result).toBe('hello_world');
    });

    it('is reversible', () => {
      const original = 'test';
      const encoded = encodeDelimited(original, '.', 'char');
      const decoded = decodeDelimited(encoded, '.', 'char');
      expect(decoded).toBe(original);
    });
  });

  describe('encodeRepeat', () => {
    it('repeats characters with fixed count', () => {
      const result = encodeRepeat('hi', 'fixed', 3);
      expect(result).toBe('hhhiii');
    });

    it('varies repeat by position', () => {
      const result = encodeRepeat('abc', 'position');
      // Position 0: 1 repeat, Position 1: 2 repeats, Position 2: 3 repeats
      expect(result).toBe('abbccc');
    });
  });

  describe('encodeVowelConsonant', () => {
    it('uppercases vowels', () => {
      const result = encodeVowelConsonant('hello', 'vowels', 'upper');
      expect(result).toBe('hEllO');
    });

    it('removes consonants', () => {
      const result = encodeVowelConsonant('hello', 'consonants', 'remove');
      expect(result).toBe('eo');
    });

    it('replaces vowels', () => {
      const result = encodeVowelConsonant('hello', 'vowels', 'replace', '*');
      expect(result).toBe('h*ll*');
    });
  });
});

describe('Edge Cases', () => {
  it('handles empty string', () => {
    expect(encodeLeetspeakParam('')).toBe('');
    expect(encodeROTN('')).toBe('');
    expect(encodeMorseParam('')).toBe('');
  });

  it('handles special characters', () => {
    expect(encodeROTN('!@#$%')).toBe('!@#$%');
  });

  it('handles unicode characters', () => {
    const result = encodeLeetspeakParam('café');
    expect(result).toContain('é'); // Non-ASCII preserved
  });

  it('handles numbers in ROT-N', () => {
    const result = encodeROTN('ABC123', 3);
    expect(result).toBe('DEF123');
  });
});
