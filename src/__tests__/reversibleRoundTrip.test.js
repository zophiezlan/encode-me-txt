import { describe, it, expect } from "vitest";
import { encoderConfig } from "../utils/encoderConfig.js";

/**
 * For every encoder declaring `reversible: true`, verify that
 * decode(encode(input)) === input across a small fixture set.
 *
 * Encoders that use Math.random() / Date.now() inside encode cannot round-trip
 * — if they're flagged reversible, this test surfaces them. The fix is either
 * to seed the randomness deterministically or to flip `reversible: false` in
 * the encoderConfig entry.
 */

const FIXTURES = [
  "Hello World",
  "abc123",
  "The quick brown fox jumps over the lazy dog",
  "single",
  "A",
];

const reversible = encoderConfig.filter(
  (e) => e.reversible && e.encode && e.decode && !e.special,
);

describe("reversible round-trip", () => {
  for (const encoder of reversible) {
    // Skip shuffle — its encode signature takes additional args (resolved
    // encoder objects) and its decode is intentionally a stub. It's marked
    // reversible: false in config already; this is a belt-and-braces guard.
    if (encoder.id === "shuffle") continue;

    it(`${encoder.id}: encode → decode round-trips`, () => {
      const args = encoder.paramsResolver ? encoder.paramsResolver({}) : [];
      for (const input of FIXTURES) {
        let encoded;
        try {
          encoded = encoder.encode(input, ...args);
        } catch (err) {
          throw new Error(
            `${encoder.id} encode threw on "${input}": ${err.message}`,
          );
        }
        let decoded;
        try {
          decoded = encoder.decode(encoded, ...args);
        } catch (err) {
          throw new Error(
            `${encoder.id} decode threw on encode("${input}"): ${err.message}`,
          );
        }
        expect(decoded, `${encoder.id} input "${input}"`).toBe(input);
      }
    });
  }
});
