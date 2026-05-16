import * as encoders from "../encoders/index.js";

export const secretEncoders = [
  {
    id: "zero-width",
    name: "Zero-Width Steganography",
    description: "Hide messages in invisible characters",
    emoji: "👻",
    category: "secret",
    encode: encoders.encodeZeroWidth,
    decode: encoders.decodeZeroWidth,
    reversible: true,
    special: true,
    tags: ["steganography", "invisible", "security"],
  },
  {
    id: "whitespace",
    name: "Whitespace Stego",
    description: "Hide data in spaces and tabs",
    emoji: "🌫️",
    category: "secret",
    encode: encoders.encodeWhitespace,
    decode: encoders.decodeWhitespace,
    reversible: true,
    tags: ["secret", "steganography", "invisible"],
  },
];
