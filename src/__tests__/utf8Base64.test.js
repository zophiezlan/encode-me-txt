import { describe, it, expect } from "vitest";
import { utf8ToBase64, base64ToUtf8 } from "../utils/utf8Base64.js";

describe("utf8Base64 round-trip", () => {
  it("round-trips ASCII text", () => {
    const input = "Hello, World!";
    expect(base64ToUtf8(utf8ToBase64(input))).toBe(input);
  });

  it("round-trips emoji", () => {
    const input = "Hello 🎉 World 🌍";
    expect(base64ToUtf8(utf8ToBase64(input))).toBe(input);
  });

  it("round-trips Chinese, Japanese, and Arabic", () => {
    const chinese = "你好世界";
    const japanese = "こんにちは世界";
    const arabic = "مرحبا بالعالم";
    expect(base64ToUtf8(utf8ToBase64(chinese))).toBe(chinese);
    expect(base64ToUtf8(utf8ToBase64(japanese))).toBe(japanese);
    expect(base64ToUtf8(utf8ToBase64(arabic))).toBe(arabic);
  });

  it("round-trips accented Latin characters", () => {
    const input = "café piñata Zürich é ñ ü";
    expect(base64ToUtf8(utf8ToBase64(input))).toBe(input);
  });

  it("round-trips the empty string", () => {
    expect(base64ToUtf8(utf8ToBase64(""))).toBe("");
  });

  it("round-trips JSON-shape payloads (the real use case)", () => {
    const payload = JSON.stringify({
      version: "1.0",
      encoder: {
        name: "Custom 🎨",
        description: "Encoder with unicode ñ é 你好",
        mapping: { a: "α", b: "β", "🙂": "😀" },
      },
    });
    expect(base64ToUtf8(utf8ToBase64(payload))).toBe(payload);
  });
});
