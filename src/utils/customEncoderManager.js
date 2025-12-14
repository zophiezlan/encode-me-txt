/**
 * Custom Encoder Manager
 * Handles creation, storage, and management of user-created custom encoders
 */

const STORAGE_KEY = "custom-encoders";
const MAX_CUSTOM_ENCODERS = 20;

export class CustomEncoderManager {
  /**
   * Save a custom encoder to localStorage
   */
  static saveEncoder(encoder) {
    const encoders = this.getEncoders();

    // Check limit
    if (encoders.length >= MAX_CUSTOM_ENCODERS) {
      throw new Error(`Maximum ${MAX_CUSTOM_ENCODERS} custom encoders allowed`);
    }

    // Validate encoder
    if (!encoder.id || !encoder.name || !encoder.mapping) {
      throw new Error("Invalid encoder: missing required fields");
    }

    // Check for duplicates
    const existingIndex = encoders.findIndex((e) => e.id === encoder.id);
    if (existingIndex >= 0) {
      encoders[existingIndex] = encoder;
    } else {
      encoders.push(encoder);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(encoders));
    return encoder;
  }

  /**
   * Get all custom encoders
   */
  static getEncoders() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load custom encoders:", error);
      return [];
    }
  }

  /**
   * Get a specific custom encoder by ID
   */
  static getEncoder(id) {
    const encoders = this.getEncoders();
    return encoders.find((e) => e.id === id);
  }

  /**
   * Delete a custom encoder
   */
  static deleteEncoder(id) {
    const encoders = this.getEncoders();
    const filtered = encoders.filter((e) => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }

  /**
   * Create encode/decode functions from character mapping
   */
  static createEncoderFunctions(mapping, caseSensitive = false) {
    // Create reverse mapping for decoding
    const reverseMapping = {};
    Object.entries(mapping).forEach(([key, value]) => {
      reverseMapping[value] = key;
    });

    const encode = (text) => {
      return text
        .split("")
        .map((char) => {
          const lookupChar = caseSensitive ? char : char.toLowerCase();
          const result = mapping[lookupChar];

          if (result !== undefined) {
            // Preserve original case if not case sensitive
            if (
              !caseSensitive &&
              char !== char.toLowerCase() &&
              result.length === 1
            ) {
              return result.toUpperCase();
            }
            return result;
          }

          return char; // Keep unmapped characters as-is
        })
        .join("");
    };

    const decode = (text) => {
      let result = "";
      let i = 0;

      while (i < text.length) {
        let found = false;

        // Try to match longest possible sequence first
        for (
          let len = Math.max(
            ...Object.keys(reverseMapping).map((k) => k.length)
          );
          len > 0;
          len--
        ) {
          const substr = text.substr(i, len);
          const lookupStr = caseSensitive ? substr : substr.toLowerCase();

          if (reverseMapping[lookupStr] !== undefined) {
            const originalChar = reverseMapping[lookupStr];

            // Preserve case if first char is uppercase
            if (
              !caseSensitive &&
              substr[0] !== substr[0].toLowerCase() &&
              originalChar.length === 1
            ) {
              result += originalChar.toUpperCase();
            } else {
              result += originalChar;
            }

            i += len;
            found = true;
            break;
          }
        }

        if (!found) {
          result += text[i];
          i++;
        }
      }

      return result;
    };

    return { encode, decode };
  }

  /**
   * Convert custom encoder to encoder config format
   */
  static toEncoderConfig(customEncoder) {
    const { encode, decode } = this.createEncoderFunctions(
      customEncoder.mapping,
      customEncoder.caseSensitive
    );

    return {
      id: customEncoder.id,
      name: customEncoder.name,
      emoji: customEncoder.emoji || "🎨",
      description: customEncoder.description || "Custom user-created encoder",
      category: "custom",
      tags: ["custom", ...(customEncoder.tags || [])],
      reversible: true,
      encode,
      decode,
      custom: true,
      createdAt: customEncoder.createdAt,
    };
  }

  /**
   * Export custom encoder to shareable format
   */
  static exportEncoder(encoder) {
    const data = {
      version: "1.0",
      encoder: {
        name: encoder.name,
        emoji: encoder.emoji,
        description: encoder.description,
        mapping: encoder.mapping,
        caseSensitive: encoder.caseSensitive,
        tags: encoder.tags,
      },
    };

    return btoa(JSON.stringify(data));
  }

  /**
   * Import custom encoder from shareable format
   */
  static importEncoder(encodedData) {
    try {
      const data = JSON.parse(atob(encodedData));

      if (data.version !== "1.0") {
        throw new Error("Unsupported encoder version");
      }

      const encoder = {
        ...data.encoder,
        id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now(),
      };

      return this.saveEncoder(encoder);
    } catch (error) {
      throw new Error("Invalid encoder data: " + error.message);
    }
  }

  /**
   * Get encoder templates (pre-made examples)
   */
  static getTemplates() {
    return [
      {
        id: "template-1337",
        name: "1337 Speak Elite",
        emoji: "💻",
        description: "Enhanced leetspeak with more substitutions",
        mapping: {
          a: "4",
          e: "3",
          i: "1",
          o: "0",
          s: "5",
          t: "7",
          l: "1",
          g: "9",
          z: "2",
          b: "8",
        },
        caseSensitive: false,
        tags: ["fun", "gaming"],
      },
      {
        id: "template-wingdings",
        name: "Symbol Speak",
        emoji: "🔣",
        description: "Replace letters with symbols",
        mapping: {
          a: "★",
          b: "♠",
          c: "♣",
          d: "♦",
          e: "♥",
          f: "✿",
          g: "☀",
          h: "☁",
          i: "⚡",
          j: "♪",
          k: "♫",
          l: "☎",
          m: "✉",
          n: "⌛",
          o: "⭐",
          p: "🌙",
          q: "☄",
          r: "☮",
          s: "☯",
          t: "✝",
          u: "☪",
          v: "✡",
          w: "☸",
          x: "✖",
          y: "☢",
          z: "⚠",
        },
        caseSensitive: false,
        tags: ["artistic", "symbols"],
      },
      {
        id: "template-arrows",
        name: "Arrow Code",
        emoji: "➡️",
        description: "Directional arrows for each letter",
        mapping: {
          a: "→",
          b: "←",
          c: "↑",
          d: "↓",
          e: "↗",
          f: "↖",
          g: "↘",
          h: "↙",
          i: "⇒",
          j: "⇐",
          k: "⇑",
          l: "⇓",
          m: "⟹",
          n: "⟸",
          o: "⇨",
          p: "⇦",
          q: "⇧",
          r: "⇩",
          s: "➔",
          t: "➜",
          u: "➞",
          v: "➚",
          w: "➘",
          x: "✈",
          y: "⤴",
          z: "⤵",
        },
        caseSensitive: false,
        tags: ["artistic", "directional"],
      },
      {
        id: "template-morse-alt",
        name: "Dots & Dashes",
        emoji: "⚫",
        description: "Alternative visual morse code",
        mapping: {
          a: "⚫⚪",
          b: "⚪⚫⚫⚫",
          c: "⚪⚫⚪⚫",
          d: "⚪⚫⚫",
          e: "⚫",
          f: "⚫⚫⚪⚫",
          g: "⚪⚪⚫",
          h: "⚫⚫⚫⚫",
          i: "⚫⚫",
          j: "⚫⚪⚪⚪",
          k: "⚪⚫⚪",
          l: "⚫⚪⚫⚫",
          m: "⚪⚪",
          n: "⚪⚫",
          o: "⚪⚪⚪",
          p: "⚫⚪⚪⚫",
          q: "⚪⚪⚫⚪",
          r: "⚫⚪⚫",
          s: "⚫⚫⚫",
          t: "⚪",
          u: "⚫⚫⚪",
          v: "⚫⚫⚫⚪",
          w: "⚫⚪⚪",
          x: "⚪⚫⚫⚪",
          y: "⚪⚫⚪⚪",
          z: "⚪⚪⚫⚫",
        },
        caseSensitive: false,
        tags: ["classic", "visual"],
      },
      {
        id: "template-emoji-faces",
        name: "Emoji Faces",
        emoji: "😀",
        description: "Different emoji faces for each letter",
        mapping: {
          a: "😀",
          b: "😃",
          c: "😄",
          d: "😁",
          e: "😆",
          f: "😅",
          g: "🤣",
          h: "😂",
          i: "🙂",
          j: "🙃",
          k: "😉",
          l: "😊",
          m: "😇",
          n: "🥰",
          o: "😍",
          p: "🤩",
          q: "😘",
          r: "😗",
          s: "😚",
          t: "😋",
          u: "😛",
          v: "😜",
          w: "🤪",
          x: "😝",
          y: "🤑",
          z: "🤗",
        },
        caseSensitive: false,
        tags: ["fun", "emoji"],
      },
    ];
  }
}
