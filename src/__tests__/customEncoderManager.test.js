import { describe, it, expect, beforeEach } from "vitest";
import { CustomEncoderManager } from "../utils/customEncoderManager.js";
import { utf8ToBase64 } from "../utils/utf8Base64.js";

const sampleEncoder = (overrides = {}) => ({
  id: "custom-test-1",
  name: "Test Encoder",
  emoji: "🧪",
  description: "Round-trip target",
  mapping: { a: "α", b: "β", c: "γ" },
  caseSensitive: false,
  tags: ["test"],
  createdAt: 1700000000000,
  ...overrides,
});

describe("CustomEncoderManager", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("export / decode round-trip", () => {
    it("round-trips an encoder with Unicode name, description, and mapping", () => {
      const encoder = sampleEncoder({
        name: "🎨 Tëst Encödër 你好",
        description: "Description with emoji 🌍 and Arabic مرحبا",
        mapping: {
          a: "🐱",
          b: "🐶",
          c: "你",
          d: "好",
          e: "α",
        },
      });

      const payload = CustomEncoderManager.exportEncoder(encoder);
      const decoded = CustomEncoderManager.decodeEncoderPayload(payload);

      expect(decoded.name).toBe(encoder.name);
      expect(decoded.description).toBe(encoder.description);
      expect(decoded.mapping).toEqual(encoder.mapping);
      expect(decoded.emoji).toBe(encoder.emoji);
      expect(decoded.caseSensitive).toBe(encoder.caseSensitive);
      expect(decoded.tags).toEqual(encoder.tags);
      // decoded payload gets a fresh id + createdAt
      expect(typeof decoded.id).toBe("string");
      expect(decoded.id).toMatch(/^custom-/);
      expect(typeof decoded.createdAt).toBe("number");
    });
  });

  describe("decodeEncoderPayload rejections", () => {
    it("rejects malformed Base64", () => {
      expect(() =>
        CustomEncoderManager.decodeEncoderPayload("!!!not-base64!!!"),
      ).toThrow(/^Invalid encoder data/);
    });

    it("rejects valid Base64 with invalid JSON", () => {
      const notJson = utf8ToBase64("this is not JSON {");
      expect(() => CustomEncoderManager.decodeEncoderPayload(notJson)).toThrow(
        /^Invalid encoder data/,
      );
    });

    it("rejects JSON missing the version field", () => {
      const payload = utf8ToBase64(
        JSON.stringify({ encoder: { name: "x", mapping: { a: "b" } } }),
      );
      expect(() => CustomEncoderManager.decodeEncoderPayload(payload)).toThrow(
        "Unsupported encoder version",
      );
    });

    it("rejects JSON with a wrong version", () => {
      const payload = utf8ToBase64(
        JSON.stringify({
          version: "2.0",
          encoder: { name: "x", mapping: { a: "b" } },
        }),
      );
      expect(() => CustomEncoderManager.decodeEncoderPayload(payload)).toThrow(
        "Unsupported encoder version",
      );
    });

    it("rejects JSON missing the encoder field", () => {
      const payload = utf8ToBase64(JSON.stringify({ version: "1.0" }));
      expect(() => CustomEncoderManager.decodeEncoderPayload(payload)).toThrow(
        /missing encoder payload/,
      );
    });

    it("rejects an encoder missing name", () => {
      const payload = utf8ToBase64(
        JSON.stringify({
          version: "1.0",
          encoder: { mapping: { a: "b" } },
        }),
      );
      expect(() => CustomEncoderManager.decodeEncoderPayload(payload)).toThrow(
        /missing name or mapping/,
      );
    });

    it("rejects an encoder missing mapping", () => {
      const payload = utf8ToBase64(
        JSON.stringify({
          version: "1.0",
          encoder: { name: "no mapping" },
        }),
      );
      expect(() => CustomEncoderManager.decodeEncoderPayload(payload)).toThrow(
        /missing name or mapping/,
      );
    });
  });

  describe("saveEncoder", () => {
    it("enforces the MAX_CUSTOM_ENCODERS limit (20)", () => {
      for (let i = 0; i < 20; i++) {
        CustomEncoderManager.saveEncoder(sampleEncoder({ id: `custom-${i}` }));
      }
      expect(CustomEncoderManager.getEncoders()).toHaveLength(20);
      expect(() =>
        CustomEncoderManager.saveEncoder(sampleEncoder({ id: "custom-21" })),
      ).toThrow(/Maximum 20/);
    });

    it("rejects encoders missing required fields", () => {
      expect(() =>
        CustomEncoderManager.saveEncoder({ name: "x", mapping: { a: "b" } }),
      ).toThrow("Invalid encoder: missing required fields");
      expect(() =>
        CustomEncoderManager.saveEncoder({ id: "x", mapping: { a: "b" } }),
      ).toThrow("Invalid encoder: missing required fields");
      expect(() =>
        CustomEncoderManager.saveEncoder({ id: "x", name: "x" }),
      ).toThrow("Invalid encoder: missing required fields");
    });

    it("overwrites in place when saving a duplicate id (no double insert)", () => {
      CustomEncoderManager.saveEncoder(
        sampleEncoder({ id: "dup", name: "first" }),
      );
      CustomEncoderManager.saveEncoder(
        sampleEncoder({ id: "dup", name: "second" }),
      );

      const all = CustomEncoderManager.getEncoders();
      expect(all).toHaveLength(1);
      expect(all[0].name).toBe("second");
    });
  });

  describe("createEncoderFunctions", () => {
    it("produces encode/decode that round-trip a simple string", () => {
      const mapping = { h: "x", e: "y", l: "z", o: "w" };
      const { encode, decode } =
        CustomEncoderManager.createEncoderFunctions(mapping);

      const original = "hello";
      const encoded = encode(original);
      expect(encoded).toBe("xyzzw");
      expect(decode(encoded)).toBe(original);
    });
  });
});
