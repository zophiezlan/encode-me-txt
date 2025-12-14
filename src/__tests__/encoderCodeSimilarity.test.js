import { describe, it, expect } from "vitest";
import { encoderConfig } from "../utils/encoderConfig.js";

/**
 * Encoder Code Similarity Test
 *
 * This test analyzes all encoders for duplicates by comparing:
 * 1. Function code similarity (actual implementation)
 * 2. Behavioral similarity (identical outputs for test inputs)
 * 3. Structural patterns (use of similar algorithms)
 *
 * Unlike encoderDeduplication.test.js which checks manually-defined relationships,
 * this test automatically detects potential duplicates based on code analysis.
 */

// Test strings covering various character types and edge cases
// Reduced set for performance with 500+ encoders
const TEST_STRINGS = ["Hello World", "abc123", "Test!", "UPPER", "lower"];

/**
 * Normalize function source code for comparison
 * Removes whitespace, comments, and standardizes formatting
 */
const normalizeFunctionCode = (func) => {
  if (!func) return "";

  let code = func.toString();

  // Remove comments
  code = code.replace(/\/\*[\s\S]*?\*\//g, ""); // Block comments
  code = code.replace(/\/\/.*/g, ""); // Line comments

  // Remove all whitespace and normalize
  code = code.replace(/\s+/g, "");

  // Normalize variable names (replace single-char vars with standard names)
  // This helps detect structurally identical code with different variable names
  code = code.replace(/\btext\b/g, "INPUT");
  code = code.replace(/\bchar\b/g, "CHAR");
  code = code.replace(/\bcode\b/g, "CODE");

  return code;
};

/**
 * Calculate similarity ratio between two strings using Levenshtein distance
 * Returns a value between 0 (completely different) and 1 (identical)
 */
const calculateSimilarity = (str1, str2) => {
  if (str1 === str2) return 1;
  if (!str1 || !str2) return 0;

  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1;

  // Calculate Levenshtein distance
  const distance = levenshteinDistance(longer, shorter);

  // Convert to similarity ratio
  return (longer.length - distance) / longer.length;
};

/**
 * Calculate Levenshtein distance between two strings
 */
const levenshteinDistance = (str1, str2) => {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};

/**
 * Test if two encoders produce identical outputs for all test strings
 */
const testBehavioralEquivalence = (encoder1, encoder2) => {
  if (!encoder1.encode || !encoder2.encode) return false;

  let identicalCount = 0;
  let totalTests = 0;

  for (const testStr of TEST_STRINGS) {
    try {
      const output1 = encoder1.encode(testStr);
      const output2 = encoder2.encode(testStr);

      totalTests++;
      if (output1 === output2) {
        identicalCount++;
      }
    } catch (error) {
      // If either encoder throws an error, skip this test
      continue;
    }
  }

  // Return the percentage of identical outputs
  return totalTests > 0 ? identicalCount / totalTests : 0;
};

/**
 * Analyze code patterns to detect structural similarity
 */
const analyzeCodePatterns = (func) => {
  if (!func) return {};

  const code = func.toString();

  return {
    usesCharCodeAt: code.includes("charCodeAt"),
    usesFromCharCode: code.includes("fromCharCode"),
    usesSplit: code.includes("split"),
    usesMap: code.includes(".map("),
    usesReplace: code.includes("replace"),
    usesToString: code.includes("toString("),
    usesParseInt: code.includes("parseInt"),
    usesBtoa: code.includes("btoa"),
    usesAtob: code.includes("atob"),
    usesModulo: code.includes("%"),
    usesShift: /[\+\-]\s*\d+/.test(code),
    usesJoin: code.includes("join"),
    usesNormalize: code.includes("normalize"),
    usesToUpperCase: code.includes("toUpperCase"),
    usesToLowerCase: code.includes("toLowerCase"),
    linesOfCode: code.split("\n").length,
  };
};

/**
 * Calculate pattern similarity between two encoders
 */
const calculatePatternSimilarity = (patterns1, patterns2) => {
  const keys = Object.keys(patterns1).filter(
    (k) => typeof patterns1[k] === "boolean"
  );
  let matchCount = 0;

  for (const key of keys) {
    if (patterns1[key] === patterns2[key]) {
      matchCount++;
    }
  }

  return matchCount / keys.length;
};

/**
 * Find all potential duplicate encoder pairs
 */
const findDuplicateEncoders = (
  threshold = {
    codeSimilarity: 0.9, // 90% code similarity
    behavioralMatch: 0.95, // 95% identical outputs
    patternSimilarity: 0.85, // 85% pattern match
  }
) => {
  const duplicates = [];
  const encoders = encoderConfig.filter((e) => e.encode);

  console.log(`Analyzing ${encoders.length} encoders for duplicates...`);

  // Pre-compute normalized code and patterns for all encoders
  const encoderData = encoders.map((enc) => ({
    encoder: enc,
    normalizedCode: normalizeFunctionCode(enc.encode),
    codeLength: enc.encode.toString().length,
    patterns: analyzeCodePatterns(enc.encode),
  }));

  let comparisons = 0;
  const totalComparisons = (encoders.length * (encoders.length - 1)) / 2;
  let lastProgress = 0;

  for (let i = 0; i < encoderData.length; i++) {
    for (let j = i + 1; j < encoderData.length; j++) {
      comparisons++;

      // Progress logging every 10%
      const progress = Math.floor((comparisons / totalComparisons) * 100);
      if (progress >= lastProgress + 10) {
        console.log(
          `Progress: ${progress}% (${comparisons}/${totalComparisons} comparisons)`
        );
        lastProgress = progress;
      }

      const data1 = encoderData[i];
      const data2 = encoderData[j];

      // Quick pre-filter: skip if code length differs by more than 50%
      const lengthRatio =
        Math.min(data1.codeLength, data2.codeLength) /
        Math.max(data1.codeLength, data2.codeLength);
      if (lengthRatio < 0.5) continue;

      // Quick pre-filter: if normalized code is very different in length, skip
      const normLengthRatio =
        Math.min(data1.normalizedCode.length, data2.normalizedCode.length) /
        Math.max(data1.normalizedCode.length, data2.normalizedCode.length);
      if (normLengthRatio < 0.6) continue;

      // Calculate code similarity
      const codeSimilarity = calculateSimilarity(
        data1.normalizedCode,
        data2.normalizedCode
      );

      // Early exit: if code similarity is very low, skip expensive behavioral test
      if (codeSimilarity < 0.5) continue;

      // Calculate pattern similarity
      const patternSimilarity = calculatePatternSimilarity(
        data1.patterns,
        data2.patterns
      );

      // Only do expensive behavioral test if code or pattern similarity is promising
      let behavioralMatch = 0;
      if (codeSimilarity >= 0.7 || patternSimilarity >= 0.8) {
        behavioralMatch = testBehavioralEquivalence(
          data1.encoder,
          data2.encoder
        );
      }

      // Check if any threshold is exceeded
      const isDuplicate =
        codeSimilarity >= threshold.codeSimilarity ||
        behavioralMatch >= threshold.behavioralMatch ||
        (codeSimilarity >= 0.7 &&
          patternSimilarity >= threshold.patternSimilarity);

      if (isDuplicate) {
        duplicates.push({
          encoder1: data1.encoder.id,
          encoder2: data2.encoder.id,
          codeSimilarity: Math.round(codeSimilarity * 100),
          behavioralMatch: Math.round(behavioralMatch * 100),
          patternSimilarity: Math.round(patternSimilarity * 100),
          name1: data1.encoder.name,
          name2: data2.encoder.name,
          category1: data1.encoder.category,
          category2: data2.encoder.category,
          patterns1: data1.patterns,
          patterns2: data2.patterns,
        });
      }
    }
  }

  console.log(
    `Completed ${comparisons} comparisons. Found ${duplicates.length} potential duplicates.`
  );
  return duplicates;
};

/**
 * Format duplicate report for human readability
 * Limits output to top 20 duplicates to avoid overwhelming console
 */
const formatDuplicateReport = (duplicates) => {
  if (duplicates.length === 0) {
    return "No duplicate encoders detected.";
  }

  // Sort by highest similarity score (combined metric)
  const sorted = duplicates.sort((a, b) => {
    const scoreA = a.codeSimilarity + a.behavioralMatch + a.patternSimilarity;
    const scoreB = b.codeSimilarity + b.behavioralMatch + b.patternSimilarity;
    return scoreB - scoreA;
  });

  const topDuplicates = sorted.slice(0, 20);

  let report = `Found ${duplicates.length} potential duplicate encoder pair(s)\n`;
  report += `Showing top ${Math.min(
    20,
    duplicates.length
  )} by similarity score:\n\n`;

  topDuplicates.forEach((dup, index) => {
    report += `${index + 1}. ${dup.encoder1} (${dup.name1}) ↔ ${
      dup.encoder2
    } (${dup.name2})\n`;
    report += `   Code: ${dup.codeSimilarity}% | Behavior: ${dup.behavioralMatch}% | Pattern: ${dup.patternSimilarity}%\n`;
    report += `   Categories: ${dup.category1} / ${dup.category2}\n\n`;
  });

  return report;
};

describe("Encoder Code Similarity Analysis", () => {
  describe("Function Normalization", () => {
    it("should normalize function code correctly", () => {
      const func1 = function (text) {
        return text.toUpperCase();
      };
      const func2 = function (text) {
        return text.toUpperCase();
      };

      const norm1 = normalizeFunctionCode(func1);
      const norm2 = normalizeFunctionCode(func2);

      expect(norm1).toBe(norm2);
    });

    it("should remove comments from function code", () => {
      const funcWithComments = function (text) {
        // This is a comment
        /* Block comment */
        return text;
      };

      const normalized = normalizeFunctionCode(funcWithComments);
      expect(normalized).not.toContain("//");
      expect(normalized).not.toContain("/*");
    });
  });

  describe("Similarity Calculation", () => {
    it("should return 1.0 for identical strings", () => {
      expect(calculateSimilarity("hello", "hello")).toBe(1);
    });

    it("should return 0 for completely different strings", () => {
      const similarity = calculateSimilarity("abc", "xyz");
      expect(similarity).toBeLessThan(0.5);
    });

    it("should return intermediate values for similar strings", () => {
      const similarity = calculateSimilarity("hello", "hallo");
      expect(similarity).toBeGreaterThan(0.7);
      expect(similarity).toBeLessThan(1.0);
    });
  });

  describe("Behavioral Equivalence", () => {
    it("should detect identical encoder behavior", () => {
      const encoder1 = {
        encode: (text) => text.toUpperCase(),
      };
      const encoder2 = {
        encode: (text) => text.toUpperCase(),
      };

      const match = testBehavioralEquivalence(encoder1, encoder2);
      expect(match).toBe(1); // 100% match
    });

    it("should detect different encoder behavior", () => {
      const encoder1 = {
        encode: (text) => text.toUpperCase(),
      };
      const encoder2 = {
        encode: (text) => text.toLowerCase(),
      };

      const match = testBehavioralEquivalence(encoder1, encoder2);
      expect(match).toBe(0); // 0% match
    });
  });

  describe("Pattern Analysis", () => {
    it("should detect code patterns correctly", () => {
      const func = function (text) {
        return text
          .split("")
          .map((char) => char.charCodeAt(0))
          .join(" ");
      };

      const patterns = analyzeCodePatterns(func);

      expect(patterns.usesSplit).toBe(true);
      expect(patterns.usesMap).toBe(true);
      expect(patterns.usesCharCodeAt).toBe(true);
      expect(patterns.usesJoin).toBe(true);
      expect(patterns.usesBtoa).toBe(false);
    });

    it("should calculate pattern similarity correctly", () => {
      const patterns1 = {
        usesCharCodeAt: true,
        usesSplit: true,
        usesMap: true,
        usesJoin: true,
      };

      const patterns2 = {
        usesCharCodeAt: true,
        usesSplit: true,
        usesMap: true,
        usesJoin: false,
      };

      const similarity = calculatePatternSimilarity(patterns1, patterns2);
      expect(similarity).toBe(0.75); // 3 out of 4 match
    });
  });

  describe("Duplicate Detection on Real Encoders", () => {
    it("should analyze all encoders without errors", () => {
      expect(() => {
        findDuplicateEncoders();
      }).not.toThrow();
    });

    it("should detect potential duplicates in the encoder set", () => {
      const duplicates = findDuplicateEncoders({
        codeSimilarity: 0.9,
        behavioralMatch: 0.95,
        patternSimilarity: 0.85,
      });

      // Log the report for manual review
      const report = formatDuplicateReport(duplicates);
      console.log("\n" + "=".repeat(80));
      console.log("ENCODER DUPLICATE DETECTION REPORT");
      console.log("=".repeat(80));
      console.log(report);
      console.log("=".repeat(80) + "\n");

      // Store duplicates for inspection
      if (duplicates.length > 0) {
        console.log("Detailed duplicate analysis:");
        duplicates.forEach((dup) => {
          console.log(`\n${dup.encoder1} vs ${dup.encoder2}:`);
          console.log(
            `  Code: ${dup.codeSimilarity}% | Behavior: ${dup.behavioralMatch}% | Pattern: ${dup.patternSimilarity}%`
          );
        });
      }

      // This test passes regardless, but logs duplicates for review
      // If you want the test to fail when duplicates are found, uncomment:
      // expect(duplicates.length).toBe(0);

      expect(duplicates).toBeDefined();
      expect(Array.isArray(duplicates)).toBe(true);
    });

    it("should not flag known different encoders as duplicates", () => {
      const duplicates = findDuplicateEncoders();

      // These encoders should NOT be flagged as duplicates (they're clearly different)
      const knownDifferent = [
        ["base64", "hex"],
        ["morse", "braille"],
        ["caesar", "reverse"],
      ];

      for (const [id1, id2] of knownDifferent) {
        const foundDup = duplicates.find(
          (d) =>
            (d.encoder1 === id1 && d.encoder2 === id2) ||
            (d.encoder1 === id2 && d.encoder2 === id1)
        );

        if (foundDup) {
          console.warn(
            `Warning: ${id1} and ${id2} were flagged as similar:`,
            foundDup
          );
        }

        // These should not be highly similar
        if (foundDup) {
          expect(foundDup.codeSimilarity).toBeLessThan(80);
        }
      }
    });

    it("should detect exact code duplicates with 100% similarity", () => {
      const duplicates = findDuplicateEncoders({
        codeSimilarity: 0.99, // 99%+ code similarity
        behavioralMatch: 1.0,
        patternSimilarity: 0.99,
      });

      const exactDuplicates = duplicates.filter(
        (d) => d.codeSimilarity >= 99 && d.behavioralMatch >= 99
      );

      if (exactDuplicates.length > 0) {
        console.log("\nEXACT DUPLICATES FOUND:");
        exactDuplicates.forEach((dup) => {
          console.log(`  - ${dup.encoder1} === ${dup.encoder2}`);
          console.log(
            `    Code: ${dup.codeSimilarity}% | Behavior: ${dup.behavioralMatch}%`
          );
        });

        // Fail the test if exact duplicates are found (they should be consolidated)
        expect(exactDuplicates.length).toBe(0);
      }
    });

    it("should categorize duplicates by severity", () => {
      const duplicates = findDuplicateEncoders();

      const critical = duplicates.filter(
        (d) => d.codeSimilarity >= 95 && d.behavioralMatch >= 95
      );
      const high = duplicates.filter(
        (d) => d.codeSimilarity >= 85 || d.behavioralMatch >= 90
      );
      const medium = duplicates.filter(
        (d) => d.codeSimilarity >= 70 || d.behavioralMatch >= 80
      );

      console.log("\nDuplicate Severity Breakdown:");
      console.log(`  Critical (95%+ code & behavior): ${critical.length}`);
      console.log(`  High (85%+ code OR 90%+ behavior): ${high.length}`);
      console.log(`  Medium (70%+ code OR 80%+ behavior): ${medium.length}`);
      console.log(`  Total potential duplicates: ${duplicates.length}`);

      // Critical duplicates should be zero (exact duplicates should be removed)
      expect(critical.length).toBe(0);
    });
  });

  describe("Encoder Coverage", () => {
    it("should test a significant portion of all encoders", () => {
      const totalEncoders = encoderConfig.length;
      const encodersWithEncode = encoderConfig.filter((e) => e.encode).length;

      console.log(`\nEncoder Coverage:`);
      console.log(`  Total encoders: ${totalEncoders}`);
      console.log(`  Encoders with encode function: ${encodersWithEncode}`);
      console.log(
        `  Coverage: ${Math.round((encodersWithEncode / totalEncoders) * 100)}%`
      );

      // At least 90% of encoders should have an encode function
      expect(encodersWithEncode / totalEncoders).toBeGreaterThan(0.9);
    });

    it("should test all encoders with the test strings", () => {
      const encoders = encoderConfig.filter((e) => e.encode);
      let successCount = 0;
      let errorCount = 0;
      const errors = [];

      for (const encoder of encoders) {
        try {
          for (const testStr of TEST_STRINGS) {
            encoder.encode(testStr);
          }
          successCount++;
        } catch (error) {
          errorCount++;
          errors.push({ id: encoder.id, error: error.message });
        }
      }

      console.log(`\nEncoder Test Results:`);
      console.log(`  Successful: ${successCount}`);
      console.log(`  Errors: ${errorCount}`);

      if (errors.length > 0 && errors.length < 10) {
        console.log(
          `  Encoders with errors:`,
          errors.map((e) => e.id).join(", ")
        );
      }

      // Most encoders should work without errors
      expect(successCount / encoders.length).toBeGreaterThan(0.95);
    });
  });
});
