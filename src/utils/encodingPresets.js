/**
 * Encoding Presets Manager
 * Save, load, and share favorite encoder configurations and chains
 */

const PRESETS_KEY = "encoding-presets";
const MAX_PRESETS = 50;

export class EncodingPresetsManager {
  /**
   * Save an encoding preset
   */
  static savePreset(preset) {
    const presets = this.getPresets();

    if (presets.length >= MAX_PRESETS) {
      throw new Error(`Maximum ${MAX_PRESETS} presets allowed`);
    }

    const newPreset = {
      id:
        preset.id ||
        `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: preset.name,
      description: preset.description || "",
      type: preset.type, // 'chain' or 'single'
      encoderIds: preset.encoderIds, // Array of encoder IDs
      params: preset.params || {}, // Encoder parameters (e.g., caesar shift)
      createdAt: Date.now(),
      usageCount: 0,
      tags: preset.tags || [],
    };

    // Check for duplicate
    const existingIndex = presets.findIndex((p) => p.id === newPreset.id);
    if (existingIndex >= 0) {
      presets[existingIndex] = { ...presets[existingIndex], ...newPreset };
    } else {
      presets.push(newPreset);
    }

    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
    return newPreset;
  }

  /**
   * Get all presets
   */
  static getPresets() {
    try {
      const data = localStorage.getItem(PRESETS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load presets:", error);
      return [];
    }
  }

  /**
   * Get preset by ID
   */
  static getPreset(id) {
    const presets = this.getPresets();
    return presets.find((p) => p.id === id);
  }

  /**
   * Delete preset
   */
  static deletePreset(id) {
    const presets = this.getPresets();
    const filtered = presets.filter((p) => p.id !== id);
    localStorage.setItem(PRESETS_KEY, JSON.stringify(filtered));
  }

  /**
   * Increment usage count
   */
  static trackUsage(id) {
    const presets = this.getPresets();
    const preset = presets.find((p) => p.id === id);

    if (preset) {
      preset.usageCount = (preset.usageCount || 0) + 1;
      preset.lastUsed = Date.now();
      localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
    }
  }

  /**
   * Export preset to shareable format
   */
  static exportPreset(preset) {
    const data = {
      version: "1.0",
      preset: {
        name: preset.name,
        description: preset.description,
        type: preset.type,
        encoderIds: preset.encoderIds,
        params: preset.params,
        tags: preset.tags,
      },
    };

    return btoa(JSON.stringify(data));
  }

  /**
   * Import preset from shareable format
   */
  static importPreset(encodedData) {
    try {
      const data = JSON.parse(atob(encodedData));

      if (data.version !== "1.0") {
        throw new Error("Unsupported preset version");
      }

      const preset = {
        ...data.preset,
        id: `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now(),
        usageCount: 0,
      };

      return this.savePreset(preset);
    } catch (error) {
      throw new Error("Invalid preset data: " + error.message);
    }
  }

  /**
   * Get built-in preset templates
   */
  static getBuiltInPresets() {
    return [
      {
        id: "builtin-ultra-secure",
        name: "Ultra Secure Chain",
        description: "Maximum security: Binary → Base64 → Caesar → Morse",
        type: "chain",
        encoderIds: ["binary", "base64", "caesar", "morse"],
        params: { caesar: 17 },
        tags: ["security", "complex"],
        builtin: true,
      },
      {
        id: "builtin-stealth-message",
        name: "Stealth Message",
        description: "Hidden communication: Zero-Width → Base64",
        type: "chain",
        encoderIds: ["steganography", "base64"],
        params: {},
        tags: ["stealth", "hidden"],
        builtin: true,
      },
      {
        id: "builtin-creative-text",
        name: "Creative Text Art",
        description: "Artistic: Bubble → Emoji → Color Blocks",
        type: "chain",
        encoderIds: ["bubble", "emoji", "colorblocks"],
        params: {},
        tags: ["fun", "artistic"],
        builtin: true,
      },
      {
        id: "builtin-classic-crypto",
        name: "Classic Cryptography",
        description: "Traditional: Caesar → ROT13 → Reverse",
        type: "chain",
        encoderIds: ["caesar", "rot13", "reverse"],
        params: { caesar: 7 },
        tags: ["classic", "cipher"],
        builtin: true,
      },
      {
        id: "builtin-communication",
        name: "Emergency Signals",
        description: "Communication codes: Morse → NATO Phonetic",
        type: "chain",
        encoderIds: ["morse", "nato"],
        params: {},
        tags: ["communication", "classic"],
        builtin: true,
      },
      {
        id: "builtin-gamer-speak",
        name: "Gamer Speak",
        description: "Gaming culture: Leetspeak → Upside Down",
        type: "chain",
        encoderIds: ["leet", "upsidedown"],
        params: {},
        tags: ["fun", "gaming"],
        builtin: true,
      },
      {
        id: "builtin-scientific",
        name: "Scientific Code",
        description: "Science themed: DNA → Chemistry Elements",
        type: "chain",
        encoderIds: ["dna", "chemistry"],
        params: {},
        tags: ["unique", "science"],
        builtin: true,
      },
      {
        id: "builtin-party-message",
        name: "Party Message",
        description: "Fun celebrations: Emoji → Zalgo → Bubble",
        type: "chain",
        encoderIds: ["emoji", "zalgo", "bubble"],
        params: {},
        tags: ["fun", "party"],
        builtin: true,
      },
    ];
  }

  /**
   * Search presets
   */
  static searchPresets(query) {
    const allPresets = [...this.getPresets(), ...this.getBuiltInPresets()];

    if (!query) return allPresets;

    const lowerQuery = query.toLowerCase();

    return allPresets.filter(
      (preset) =>
        preset.name.toLowerCase().includes(lowerQuery) ||
        preset.description.toLowerCase().includes(lowerQuery) ||
        preset.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * Get most used presets
   */
  static getMostUsed(limit = 5) {
    const presets = this.getPresets();
    return presets
      .filter((p) => p.usageCount > 0)
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, limit);
  }
}
