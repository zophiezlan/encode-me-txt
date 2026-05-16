/**
 * Encoding Analyzer
 * Analyzes encoding strength and complexity
 */

export class EncodingAnalyzer {
  /**
   * Calculate encoding strength score (0-100)
   * @param {string} originalText - Original input text
   * @param {string} encodedText - Encoded result
   * @param {Object} encoder - Encoder configuration
   * @returns {Object} - Analysis result
   */
  static analyzeStrength(originalText, encodedText, encoder) {
    let score = 0;
    const factors = [];

    // Factor 1: Reversibility (reversible = weaker for security)
    if (encoder.reversible) {
      score += 20;
      factors.push({
        name: "Reversible",
        impact: 20,
        description: "Can be decoded",
      });
    } else {
      score += 50;
      factors.push({
        name: "Non-reversible",
        impact: 50,
        description: "Cannot be decoded",
      });
    }

    // Factor 2: Length change (more change = stronger obfuscation)
    const lengthRatio = encodedText.length / originalText.length;
    if (lengthRatio > 2) {
      score += 20;
      factors.push({
        name: "Significant expansion",
        impact: 20,
        description: `${lengthRatio.toFixed(1)}x longer`,
      });
    } else if (lengthRatio > 1.5) {
      score += 10;
      factors.push({
        name: "Moderate expansion",
        impact: 10,
        description: `${lengthRatio.toFixed(1)}x longer`,
      });
    } else {
      score += 5;
      factors.push({
        name: "Minimal expansion",
        impact: 5,
        description: `${lengthRatio.toFixed(1)}x longer`,
      });
    }

    // Factor 3: Character diversity
    const uniqueChars = new Set(encodedText).size;
    const diversityRatio = uniqueChars / encodedText.length;
    if (diversityRatio > 0.5) {
      score += 15;
      factors.push({
        name: "High diversity",
        impact: 15,
        description: `${uniqueChars} unique characters`,
      });
    } else if (diversityRatio > 0.3) {
      score += 10;
      factors.push({
        name: "Medium diversity",
        impact: 10,
        description: `${uniqueChars} unique characters`,
      });
    } else {
      score += 5;
      factors.push({
        name: "Low diversity",
        impact: 5,
        description: `${uniqueChars} unique characters`,
      });
    }

    // Factor 4: Encoding category
    const categoryScores = {
      secret: 15,
      cipher: 10,
      computer: 8,
      advanced: 8,
      classic: 6,
      unique: 5,
      artistic: 3,
      fun: 2,
    };
    const categoryScore = categoryScores[encoder.category] || 5;
    score += categoryScore;
    factors.push({
      name: `Category: ${encoder.category}`,
      impact: categoryScore,
      description: "Based on encoding type",
    });

    // Cap at 100
    score = Math.min(100, score);

    // Determine strength level
    let level, color, description;
    if (score >= 80) {
      level = "Very Strong";
      color = "green";
      description = "Excellent obfuscation for casual sharing";
    } else if (score >= 60) {
      level = "Strong";
      color = "lime";
      description = "Good for hiding messages from casual observers";
    } else if (score >= 40) {
      level = "Moderate";
      color = "yellow";
      description = "Provides basic obfuscation";
    } else if (score >= 20) {
      level = "Weak";
      color = "orange";
      description = "Easily recognizable encoding";
    } else {
      level = "Very Weak";
      color = "red";
      description = "Minimal obfuscation";
    }

    return {
      score,
      level,
      color,
      description,
      factors,
    };
  }

}
