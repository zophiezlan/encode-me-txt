/**
 * Tests for Batch Encoder Utility
 */

import { describe, it, expect } from "vitest";
import {
  batchEncode,
  batchDecode,
  multiEncode,
  generateComparisonMatrix,
  exportBatchResults,
  validateEncoderChain,
} from "../utils/batchEncoder.js";
import { ChainEncoder } from "../utils/chainEncoder.js";
import { encoderConfig } from "../utils/encoderConfig.js";

const resolveEncoders = (ids) =>
  ids.map((id) => encoderConfig.find((e) => e.id === id)).filter(Boolean);

describe("Batch Encoder Utility", () => {
  // ============================================
  // BATCH ENCODE TESTS
  // ============================================
  describe("batchEncode", () => {
    it("encodes multiple texts with a single encoder", () => {
      const texts = ["Hello", "World", "Test"];
      const results = batchEncode(texts, "hex");

      expect(results).toHaveLength(3);
      results.forEach((result) => {
        expect(result.success).toBe(true);
        expect(result.output).toBeTruthy();
        expect(result.encoderName).toBe("Hexadecimal");
      });
    });

    it("returns error for invalid encoder", () => {
      const texts = ["Hello"];
      const results = batchEncode(texts, "invalid-encoder");

      expect(results[0].success).toBe(false);
      expect(results[0].error).toBe("Encoder not found");
    });

    it("includes metadata in results", () => {
      const texts = ["Hello"];
      const results = batchEncode(texts, "base64");

      expect(results[0]).toHaveProperty("inputLength");
      expect(results[0]).toHaveProperty("outputLength");
      expect(results[0]).toHaveProperty("expansionRatio");
      expect(results[0]).toHaveProperty("processingTime");
    });

    it("handles empty array", () => {
      const results = batchEncode([], "hex");
      expect(results).toHaveLength(0);
    });
  });

  // ============================================
  // BATCH DECODE TESTS
  // ============================================
  describe("batchDecode", () => {
    it("decodes multiple encoded texts", () => {
      const encoded = ["48 65 6c 6c 6f", "57 6f 72 6c 64"];
      const results = batchDecode(encoded, "hex");

      expect(results).toHaveLength(2);
      expect(results[0].output).toBe("Hello");
      expect(results[1].output).toBe("World");
    });

    it("returns error for non-reversible encoder", () => {
      const texts = ["test"];
      const results = batchDecode(texts, "bubble");

      expect(results[0].success).toBe(false);
    });
  });

  // ============================================
  // MULTI ENCODE TESTS
  // ============================================
  describe("multiEncode", () => {
    it("encodes single text with multiple encoders", () => {
      const text = "Hello";
      const encoders = ["hex", "base64", "rot13"];
      const results = multiEncode(text, encoders);

      expect(results).toHaveLength(3);
      results.forEach((result) => {
        expect(result.input).toBe("Hello");
        expect(result.success).toBe(true);
      });
    });

    it("handles mix of valid and invalid encoders", () => {
      const results = multiEncode("Hello", ["hex", "invalid", "base64"]);

      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(false);
      expect(results[2].success).toBe(true);
    });

    it("includes encoder metadata", () => {
      const results = multiEncode("Test", ["rot13"]);

      expect(results[0]).toHaveProperty("category");
      expect(results[0]).toHaveProperty("reversible");
      expect(results[0]).toHaveProperty("emoji");
    });
  });

  // ============================================
  // COMPARISON MATRIX TESTS
  // ============================================
  describe("generateComparisonMatrix", () => {
    it("creates a matrix of texts and encoders", () => {
      const matrix = generateComparisonMatrix(["A", "B"], ["hex", "base64"]);

      expect(matrix.texts).toHaveLength(2);
      expect(matrix.results).toHaveLength(2);
      expect(matrix.results[0].encodings).toHaveProperty("hex");
      expect(matrix.results[0].encodings).toHaveProperty("base64");
    });

    it("marks failed encodings", () => {
      const matrix = generateComparisonMatrix(
        ["Test"],
        ["hex", "invalid-encoder"],
      );

      expect(matrix.results[0].encodings.hex.success).toBe(true);
    });
  });

  // ============================================
  // CHAIN ENCODE TESTS (via ChainEncoder class — production code path)
  // ============================================
  describe("ChainEncoder.encode", () => {
    it("applies encoders in sequence", () => {
      const result = ChainEncoder.encode(
        "Hello",
        resolveEncoders(["base64", "hex"]),
      );

      expect(result.steps).toHaveLength(2);
      expect(result.finalResult).not.toBe("Hello");
      expect(result.steps[0].error).toBeUndefined();
      expect(result.steps[1].error).toBeUndefined();
    });

    it("tracks intermediate steps", () => {
      const result = ChainEncoder.encode(
        "Test",
        resolveEncoders(["base64", "hex"]),
      );

      // Step 0 is base64(Test); step 1 is hex(step 0 result)
      expect(result.steps[0].result).not.toBe("Test");
      expect(result.steps[0].result).not.toBe(result.steps[1].result);
    });

    it("stops when an encoder throws", () => {
      const bad = {
        id: "bad",
        name: "Bad",
        encode: () => {
          throw new Error("boom");
        },
      };
      const result = ChainEncoder.encode("Test", [
        ...resolveEncoders(["hex"]),
        bad,
        ...resolveEncoders(["base64"]),
      ]);

      expect(result.steps).toHaveLength(2); // hex ok, bad errors and breaks the chain
      expect(result.steps[1].error).toBe(true);
    });
  });

  // ============================================
  // CHAIN DECODE TESTS
  // ============================================
  describe("ChainEncoder.decode", () => {
    it("round-trips an encoded chain", () => {
      const encoders = resolveEncoders(["base64"]);
      const encoded = ChainEncoder.encode("Hello", encoders);
      const decoded = ChainEncoder.decode(encoded.finalResult, encoders);

      expect(decoded.finalResult).toBe("Hello");
      expect(decoded.steps[0].error).toBeUndefined();
    });

    it("rejects non-reversible encoders in chain", () => {
      const irreversible = {
        id: "fake-irreversible",
        name: "Fake",
        reversible: false,
        decode: () => "should not reach",
      };
      const result = ChainEncoder.decode("anything", [irreversible]);
      expect(result.steps[0].error).toBe(true);
      expect(result.steps[0].result).toContain("not reversible");
    });

    it("isChainReversible reflects whether all encoders are reversible", () => {
      expect(
        ChainEncoder.isChainReversible(resolveEncoders(["base64", "hex"])),
      ).toBe(true);
      expect(
        ChainEncoder.isChainReversible([
          ...resolveEncoders(["base64"]),
          { id: "x", name: "x", reversible: false },
        ]),
      ).toBe(false);
    });
  });

  // ============================================
  // EXPORT RESULTS TESTS
  // ============================================
  describe("exportBatchResults", () => {
    const mockResults = [
      {
        index: 0,
        input: "Hello",
        output: "48 65 6c 6c 6f",
        encoderName: "Hexadecimal",
        success: true,
        processingTime: 1.5,
      },
    ];

    it("exports as JSON", () => {
      const json = exportBatchResults(mockResults, "json");
      const parsed = JSON.parse(json);

      expect(parsed).toHaveLength(1);
      expect(parsed[0].input).toBe("Hello");
    });

    it("exports as CSV", () => {
      const csv = exportBatchResults(mockResults, "csv");

      expect(csv).toContain("Index,Input,Output");
      expect(csv).toContain("Hello");
      expect(csv).toContain("Hexadecimal");
    });

    it("exports as text", () => {
      const text = exportBatchResults(mockResults, "text");

      expect(text).toContain("[Hexadecimal]");
      expect(text).toContain("Input: Hello");
    });

    it("defaults to JSON", () => {
      const result = exportBatchResults(mockResults);
      expect(() => JSON.parse(result)).not.toThrow();
    });
  });

  // ============================================
  // VALIDATE ENCODER CHAIN TESTS
  // ============================================
  describe("validateEncoderChain", () => {
    it("validates a valid chain", () => {
      const validation = validateEncoderChain(["hex", "base64", "rot13"]);

      expect(validation.valid).toBe(true);
      expect(validation.chainLength).toBe(3);
      expect(validation.issues).toHaveLength(0);
    });

    it("reports invalid encoders", () => {
      const validation = validateEncoderChain(["hex", "invalid-encoder"]);

      expect(validation.valid).toBe(false);
      expect(validation.issues).toHaveLength(1);
      expect(validation.issues[0].index).toBe(1);
    });

    it("checks reversibility", () => {
      const validation = validateEncoderChain(["hex", "base64"]);

      expect(validation).toHaveProperty("reversible");
      expect(typeof validation.reversible).toBe("boolean");
    });

    it("includes encoder metadata", () => {
      const validation = validateEncoderChain(["hex"]);

      expect(validation.encoders).toHaveLength(1);
      expect(validation.encoders[0]).toHaveProperty("id");
      expect(validation.encoders[0]).toHaveProperty("name");
    });
  });
});
