/**
 * Visual Encoding Flow
 * Creates step-by-step visualization of how text transforms during encoding
 */

export class VisualEncodingFlow {
  /**
   * Generate character-by-character transformation steps
   */
  static generateFlow(inputText, encoder, caesarShift = 13) {
    if (!inputText || !encoder) return [];

    const steps = [];
    const chars = inputText.split('');

    chars.forEach((char, index) => {
      // Encode single character
      let encoded;
      try {
        if (encoder.id === 'caesar') {
          encoded = encoder.encode(char, caesarShift);
        } else {
          encoded = encoder.encode(char);
        }
      } catch {
        encoded = char;
      }

      steps.push({
        index,
        original: char,
        encoded,
        position: index,
        isSpace: char === ' ',
        isPunctuation: /[.,!?;:]/.test(char),
        isNumber: /\d/.test(char),
        isLetter: /[a-zA-Z]/.test(char),
      });
    });

    return steps;
  }

  /**
   * Generate comparison flow for multiple encoders
   */
  static generateComparisonFlow(inputText, encoders, caesarShift = 13) {
    if (!inputText || !encoders || encoders.length === 0) return [];

    const chars = inputText.split('');
    const flows = {};

    encoders.forEach(encoder => {
      flows[encoder.id] = this.generateFlow(inputText, encoder, caesarShift);
    });

    return { chars, flows };
  }

  /**
   * Get color for character type
   */
  static getCharTypeColor(step) {
    if (step.isSpace) return 'bg-gray-500/30';
    if (step.isPunctuation) return 'bg-purple-500/30';
    if (step.isNumber) return 'bg-blue-500/30';
    if (step.isLetter) return 'bg-green-500/30';
    return 'bg-white/20';
  }

  /**
   * Calculate transformation complexity
   */
  static analyzeTransformation(original, encoded) {
    return {
      lengthChange: encoded.length - original.length,
      lengthRatio: encoded.length / original.length,
      sizeIncrease: new Blob([encoded]).size - new Blob([original]).size,
      charDiversity: new Set(encoded).size / new Set(original).size,
      reversible: true, // Determined by encoder config
    };
  }

  /**
   * Generate animation timeline for encoding
   */
  static generateAnimationTimeline(steps, duration = 2000) {
    const timeline = [];
    const delayPerChar = duration / steps.length;

    steps.forEach((step, index) => {
      timeline.push({
        ...step,
        delay: index * delayPerChar,
        duration: delayPerChar,
      });
    });

    return timeline;
  }

  /**
   * Create grouped transformations (by character type)
   */
  static groupByType(steps) {
    const groups = {
      letters: [],
      numbers: [],
      punctuation: [],
      spaces: [],
      other: [],
    };

    steps.forEach(step => {
      if (step.isLetter) groups.letters.push(step);
      else if (step.isNumber) groups.numbers.push(step);
      else if (step.isPunctuation) groups.punctuation.push(step);
      else if (step.isSpace) groups.spaces.push(step);
      else groups.other.push(step);
    });

    return groups;
  }

  /**
   * Generate frequency map of transformations
   */
  static getTransformationFrequency(steps) {
    const frequency = {};

    steps.forEach(step => {
      const transform = `${step.original}→${step.encoded}`;
      frequency[transform] = (frequency[transform] || 0) + 1;
    });

    return Object.entries(frequency)
      .map(([transform, count]) => ({ transform, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Create encoding "pattern" visualization
   */
  static createPattern(encoded) {
    const chars = encoded.split('');
    const pattern = chars.map(char => {
      // Categorize characters for visual pattern
      if (/[a-zA-Z]/.test(char)) return 'L';
      if (/\d/.test(char)) return 'N';
      if (/[.,!?;:]/.test(char)) return 'P';
      if (char === ' ') return '_';
      if (/[\u{1F300}-\u{1F9FF}]/u.test(char)) return 'E'; // Emoji
      return 'S'; // Symbol
    });

    return pattern;
  }
}
