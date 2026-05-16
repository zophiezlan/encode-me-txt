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
    const chars = inputText.split("");

    chars.forEach((char, index) => {
      // Encode single character
      let encoded;
      try {
        if (encoder.id === "caesar") {
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
        isSpace: char === " ",
        isPunctuation: /[.,!?;:]/.test(char),
        isNumber: /\d/.test(char),
        isLetter: /[a-zA-Z]/.test(char),
      });
    });

    return steps;
  }

  /**
   * Get color for character type
   */
  static getCharTypeColor(step) {
    if (step.isSpace) return "bg-gray-500/30";
    if (step.isPunctuation) return "bg-purple-500/30";
    if (step.isNumber) return "bg-blue-500/30";
    if (step.isLetter) return "bg-green-500/30";
    return "bg-white/20";
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

    steps.forEach((step) => {
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

    steps.forEach((step) => {
      const transform = `${step.original}→${step.encoded}`;
      frequency[transform] = (frequency[transform] || 0) + 1;
    });

    return Object.entries(frequency)
      .map(([transform, count]) => ({ transform, count }))
      .sort((a, b) => b.count - a.count);
  }

}
