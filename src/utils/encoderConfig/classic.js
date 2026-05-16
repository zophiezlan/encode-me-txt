import * as encoders from "../encoders/index.js";

export const classicEncoders = [
  {
    id: "braille",
    name: "Braille Patterns",
    description: "Touch-readable text encoding",
    emoji: "🤚",
    category: "classic",
    encode: encoders.encodeBraille,
    decode: encoders.decodeBraille,
    reversible: false,
    tags: ["classic", "accessibility", "tactile"],
  },
  {
    id: "morse-pro",
    name: "Morse Code Pro",
    description: "Morse with customizable delimiter styles",
    emoji: "📡",
    category: "classic",
    encode: encoders.encodeMorseParam,
    decode: encoders.decodeMorseParam,
    reversible: false,
    hasSettings: true,
    tags: ["classic", "morse", "delimiter", "settings"],
  },
  {
    id: "nato-extended",
    name: "NATO Phonetic Pro",
    description: "NATO/Police/Western Union phonetics",
    emoji: "🎖️",
    category: "classic",
    encode: encoders.encodeNATOExtended,
    reversible: false,
    hasSettings: true,
    tags: ["classic", "nato", "phonetic", "settings"],
  },
];
