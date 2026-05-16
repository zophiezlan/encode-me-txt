import { describe, it, expect } from "vitest";
import {
  encodeAtbash,
  decodeAtbash,
  encodeVigenere,
  decodeVigenere,
  encodeRailFence,
  decodeRailFence,
  encodeBacon,
  decodeBacon,
  encodePolybius,
  decodePolybius,
  encodeROT47,
  decodeROT47,
  encodeROT13,
  encodeCaesar,
  decodeCaesar,
  encodeReverse,
} from "../utils/encoders/cipher.js";
import {
  encodeHex,
  decodeHex,
  encodeBase64,
  decodeBase64,
} from "../utils/encoders/computer.js";
// Bare encodeBinary / encodeMorse were deleted in Phase 4 as dead code.
// The registered encoders are binary-pro / morse-pro, backed by these
// param variants in parameterized.js.
import {
  encodeBinaryParam,
  decodeBinaryParam,
  encodeMorseParam,
  decodeMorseParam,
} from "../utils/encoders/parameterized.js";

describe("Binary encoding (binary-pro)", () => {
  it("encodes text to binary with default 8-bit grouping", () => {
    expect(encodeBinaryParam("A")).toBe("01000001");
    expect(encodeBinaryParam("Hi")).toBe("01001000 01101001");
  });

  it("decodes binary to text", () => {
    expect(decodeBinaryParam("01000001")).toBe("A");
    expect(decodeBinaryParam("01001000 01101001")).toBe("Hi");
  });

  it("is reversible", () => {
    const original = "Hello World!";
    const encoded = encodeBinaryParam(original);
    const decoded = decodeBinaryParam(encoded);
    expect(decoded).toBe(original);
  });
});

describe("Hexadecimal encoding", () => {
  it("encodes text to hex", () => {
    expect(encodeHex("A")).toBe("41");
    expect(encodeHex("Hi")).toBe("48 69");
  });

  it("decodes hex to text", () => {
    expect(decodeHex("41")).toBe("A");
    expect(decodeHex("48 69")).toBe("Hi");
  });

  it("is reversible", () => {
    const original = "Hello World!";
    const encoded = encodeHex(original);
    const decoded = decodeHex(encoded);
    expect(decoded).toBe(original);
  });
});

describe("Base64 encoding", () => {
  it("encodes text to base64", () => {
    expect(encodeBase64("Hello")).toBe("SGVsbG8=");
  });

  it("decodes base64 to text", () => {
    expect(decodeBase64("SGVsbG8=")).toBe("Hello");
  });

  it("is reversible", () => {
    const original = "Hello World!";
    const encoded = encodeBase64(original);
    const decoded = decodeBase64(encoded);
    expect(decoded).toBe(original);
  });

  it("handles unicode characters", () => {
    const original = "Héllo Wörld! 🎉";
    const encoded = encodeBase64(original);
    const decoded = decodeBase64(encoded);
    expect(decoded).toBe(original);
  });
});

describe("ROT13 encoding", () => {
  it("encodes text with ROT13", () => {
    expect(encodeROT13("ABC")).toBe("NOP");
    expect(encodeROT13("Hello")).toBe("Uryyb");
  });

  it("is its own inverse", () => {
    const original = "Hello World!";
    const encoded = encodeROT13(original);
    const decoded = encodeROT13(encoded);
    expect(decoded).toBe(original);
  });

  it("preserves non-alphabetic characters", () => {
    expect(encodeROT13("123")).toBe("123");
    expect(encodeROT13("!@#")).toBe("!@#");
  });
});

describe("Caesar Cipher encoding", () => {
  it("encodes with shift 3", () => {
    expect(encodeCaesar("ABC", 3)).toBe("DEF");
  });

  it("encodes with shift 13 equals ROT13", () => {
    expect(encodeCaesar("Hello", 13)).toBe(encodeROT13("Hello"));
  });

  it("is reversible with known shift", () => {
    const original = "Hello World!";
    const shift = 5;
    const encoded = encodeCaesar(original, shift);
    const decoded = decodeCaesar(encoded, shift);
    expect(decoded).toBe(original);
  });

  it("handles wrap-around", () => {
    expect(encodeCaesar("XYZ", 3)).toBe("ABC");
  });
});

describe("Morse Code encoding (morse-pro)", () => {
  it("encodes letters to morse using ASCII dots/dashes", () => {
    // morse-pro uses ASCII . and - (not Unicode • −) and uppercases input
    expect(encodeMorseParam("sos")).toBe("... --- ...");
  });

  it("encodes word separator as ' / '", () => {
    expect(encodeMorseParam("a b")).toBe(".- / -...");
  });

  it("is reversible for letters", () => {
    const original = "hello world";
    const encoded = encodeMorseParam(original);
    const decoded = decodeMorseParam(encoded);
    // morse-pro normalises to uppercase
    expect(decoded.toLowerCase()).toBe(original);
  });
});

describe("Reverse Text encoding", () => {
  it("reverses text", () => {
    expect(encodeReverse("hello")).toBe("olleh");
    expect(encodeReverse("ABC")).toBe("CBA");
  });

  it("is its own inverse", () => {
    const original = "Hello World!";
    const encoded = encodeReverse(original);
    const decoded = encodeReverse(encoded);
    expect(decoded).toBe(original);
  });
});

describe("Atbash Cipher encoding", () => {
  it("encodes text with reversed alphabet", () => {
    expect(encodeAtbash("ABC")).toBe("ZYX");
    expect(encodeAtbash("Hello")).toBe("Svool");
  });

  it("is its own inverse", () => {
    const original = "Hello World!";
    const encoded = encodeAtbash(original);
    const decoded = decodeAtbash(encoded);
    expect(decoded).toBe(original);
  });

  it("preserves non-alphabetic characters", () => {
    expect(encodeAtbash("123")).toBe("123");
    expect(encodeAtbash("!@#")).toBe("!@#");
  });
});

describe("Vigenère Cipher encoding", () => {
  it("encodes text with keyword", () => {
    // Using keyword 'SECRET': S=18, E=4, C=2, R=17, E=4, T=19
    // 'A' + 18 = 'S', 'B' + 4 = 'F', 'C' + 2 = 'E'
    expect(encodeVigenere("ABC", "SEC")).toBe("SFE");
  });

  it("is reversible with known keyword", () => {
    const original = "Hello World!";
    const keyword = "SECRET";
    const encoded = encodeVigenere(original, keyword);
    const decoded = decodeVigenere(encoded, keyword);
    expect(decoded).toBe(original);
  });

  it("preserves non-alphabetic characters", () => {
    expect(encodeVigenere("123")).toBe("123");
    expect(encodeVigenere("!@#")).toBe("!@#");
  });
});

// New cipher tests
describe("Rail Fence Cipher", () => {
  it("encodes text with zigzag pattern", () => {
    expect(encodeRailFence("HELLO", 3)).toBe("HOELL");
  });

  it("is reversible", () => {
    const original = "HELLOWORLD";
    const encoded = encodeRailFence(original, 3);
    const decoded = decodeRailFence(encoded, 3);
    expect(decoded).toBe(original);
  });
});

describe("Bacon's Cipher", () => {
  it("encodes letters as A/B patterns", () => {
    expect(encodeBacon("A")).toBe("AAAAA");
    expect(encodeBacon("B")).toBe("AAAAB");
  });

  it("is reversible", () => {
    const original = "HELLO";
    const encoded = encodeBacon(original);
    const decoded = decodeBacon(encoded);
    expect(decoded).toBe(original);
  });
});

describe("Polybius Square", () => {
  it("encodes letters as coordinate pairs", () => {
    expect(encodePolybius("A")).toBe("11");
    expect(encodePolybius("Z")).toBe("55");
  });

  it("is reversible", () => {
    const original = "HELLO";
    const encoded = encodePolybius(original);
    const decoded = decodePolybius(encoded);
    expect(decoded).toBe(original);
  });
});

describe("ROT47 Cipher", () => {
  it("rotates printable ASCII characters", () => {
    const original = "Hello World!";
    const encoded = encodeROT47(original);
    expect(encoded).not.toBe(original);
  });

  it("is its own inverse (symmetric)", () => {
    const original = "Hello World!";
    const encoded = encodeROT47(original);
    const decoded = decodeROT47(encoded);
    expect(decoded).toBe(original);
  });
});

// New encoder tests
import {
  encodeGreek,
  decodeGreek,
  encodeCyrillic,
  decodeCyrillic,
} from "../utils/encoders/linguistic.js";

import {
  encodePlayfair,
  decodePlayfair,
  encodeColumnar,
  decodeColumnar,
} from "../utils/encoders/cipher.js";

import {
  encodeBase32,
  decodeBase32,
  encodeOctal,
  decodeOctal,
  encodeA1Z26,
  decodeA1Z26,
} from "../utils/encoders/computer.js";

import {
  encodeFullwidth,
  decodeFullwidth,
} from "../utils/encoders/aesthetic.js";

import {
  encodePhoneKeypad,
  decodePhoneKeypad,
  encodeBaudot,
  decodeBaudot,
} from "../utils/encoders/retro.js";

// Tests for new encoders
describe("Greek Alphabet Encoding", () => {
  it("encodes Latin to Greek letters", () => {
    expect(encodeGreek("abc")).toBe("αβψ");
  });

  it("is reversible", () => {
    const original = "hello";
    const encoded = encodeGreek(original);
    const decoded = decodeGreek(encoded);
    expect(decoded).toBe(original);
  });
});

describe("Cyrillic Script Encoding", () => {
  it("encodes Latin to Cyrillic letters", () => {
    expect(encodeCyrillic("abc")).toBe("абц");
  });

  it("is reversible", () => {
    const original = "hello";
    const encoded = encodeCyrillic(original);
    const decoded = decodeCyrillic(encoded);
    expect(decoded).toBe(original);
  });
});

describe("Playfair Cipher", () => {
  it("encodes digraphs using grid", () => {
    const encoded = encodePlayfair("HELLO");
    expect(encoded.length).toBeGreaterThan(0);
  });

  it("is reversible", () => {
    const original = "HELLO";
    const encoded = encodePlayfair(original);
    const decoded = decodePlayfair(encoded);
    expect(decoded).toBe("HELXLO"); // X added for double L
  });
});

describe("Columnar Transposition Cipher", () => {
  it("rearranges text by columns", () => {
    const encoded = encodeColumnar("HELLOWORLD", "KEY");
    expect(encoded).not.toBe("HELLOWORLD");
  });

  it("is reversible", () => {
    const original = "HELLOWORLDX";
    const encoded = encodeColumnar(original, "KEY");
    const decoded = decodeColumnar(encoded, "KEY");
    expect(decoded.substring(0, original.length)).toBe(original);
  });
});

describe("Base32 Encoding", () => {
  it("encodes text to Base32", () => {
    expect(encodeBase32("Hi")).toBe("JBUQ====");
  });

  it("is reversible", () => {
    const original = "Hello";
    const encoded = encodeBase32(original);
    const decoded = decodeBase32(encoded);
    expect(decoded).toBe(original);
  });
});

describe("Octal Encoding", () => {
  it("encodes text to octal numbers", () => {
    expect(encodeOctal("A")).toBe("101");
  });

  it("is reversible", () => {
    const original = "ABC";
    const encoded = encodeOctal(original);
    const decoded = decodeOctal(encoded);
    expect(decoded).toBe(original);
  });
});

describe("A1Z26 Encoding", () => {
  it("encodes letters to numbers", () => {
    expect(encodeA1Z26("abc")).toBe("1-2-3");
  });

  it("is reversible", () => {
    const original = "hello";
    const encoded = encodeA1Z26(original);
    const decoded = decodeA1Z26(encoded);
    expect(decoded).toBe(original);
  });
});

describe("Fullwidth Text Encoding", () => {
  it("converts ASCII to fullwidth", () => {
    expect(encodeFullwidth("Hi")).toBe("Ｈｉ");
  });

  it("is reversible", () => {
    const original = "Hello";
    const encoded = encodeFullwidth(original);
    const decoded = decodeFullwidth(encoded);
    expect(decoded).toBe(original);
  });
});

describe("Phone Keypad Encoding", () => {
  it("encodes to T9 multi-tap format", () => {
    expect(encodePhoneKeypad("abc")).toBe("2-22-222");
  });

  it("is reversible", () => {
    const original = "hello";
    const encoded = encodePhoneKeypad(original);
    const decoded = decodePhoneKeypad(encoded);
    expect(decoded).toBe(original);
  });
});

describe("Baudot Code Encoding", () => {
  it("encodes to 5-bit patterns", () => {
    const encoded = encodeBaudot("abc");
    expect(encoded).toContain("●");
    expect(encoded).toContain("○");
  });

  it("is reversible", () => {
    const original = "hello";
    const encoded = encodeBaudot(original);
    const decoded = decodeBaudot(encoded);
    expect(decoded).toBe(original);
  });
});
