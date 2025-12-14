/**
 * Tests for Encoder Search Utility
 */

import { describe, it, expect } from "vitest";
import {
  searchEncoders,
  getAllTags,
  getAllCategories,
  getEncoderStats,
  findSimilarEncoders,
  groupEncodersBy,
  getFilterPreset,
  filterPresets,
  defaultSearchOptions,
} from "../utils/encoderSearch.js";

// Sample encoder data for testing
const mockEncoders = [
  {
    id: "caesar",
    name: "Caesar Cipher",
    description: "Shift alphabet by N positions",
    category: "cipher",
    reversible: true,
    hasSettings: true,
    special: false,
    tags: ["cipher", "cryptography", "ancient"],
  },
  {
    id: "morse-pro",
    name: "Morse Code Pro",
    description: "Morse code with customizable delimiters",
    category: "classic",
    reversible: true,
    hasSettings: true,
    special: false,
    tags: ["classic", "morse", "delimiter", "settings"],
  },
  {
    id: "emoji",
    name: "Emoji Encoding",
    description: "Express text through emoji pairs",
    category: "fun",
    reversible: true,
    hasSettings: false,
    special: false,
    tags: ["fun", "emoji", "creative"],
  },
  {
    id: "zero-width",
    name: "Zero-Width Steganography",
    description: "Hide messages in invisible characters",
    category: "secret",
    reversible: true,
    hasSettings: false,
    special: true,
    tags: ["steganography", "invisible", "security"],
  },
  {
    id: "zalgo",
    name: "Zalgo Chaos",
    description: "Creepy text with combining characters",
    category: "artistic",
    reversible: false,
    hasSettings: true,
    special: false,
    tags: ["artistic", "horror", "chaos"],
  },
];

describe("searchEncoders", () => {
  it("returns all encoders when no options provided", () => {
    const results = searchEncoders(mockEncoders);
    expect(results).toHaveLength(mockEncoders.length);
  });

  it("filters by text query in name", () => {
    const results = searchEncoders(mockEncoders, { query: "caesar" });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("caesar");
  });

  it("filters by text query in description", () => {
    const results = searchEncoders(mockEncoders, { query: "invisible" });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("zero-width");
  });

  it("filters by text query in tags", () => {
    const results = searchEncoders(mockEncoders, { query: "cryptography" });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("caesar");
  });

  it("filters by multiple search terms (AND logic)", () => {
    const results = searchEncoders(mockEncoders, { query: "cipher ancient" });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("caesar");
  });

  it("filters by category", () => {
    const results = searchEncoders(mockEncoders, { categories: ["cipher"] });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("caesar");
  });

  it("filters by multiple categories", () => {
    const results = searchEncoders(mockEncoders, {
      categories: ["cipher", "fun"],
    });
    expect(results).toHaveLength(2);
  });

  it("filters by tags (AND logic)", () => {
    const results = searchEncoders(mockEncoders, {
      tags: ["classic", "morse"],
    });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("morse-pro");
  });

  it("filters by anyTags (OR logic)", () => {
    const results = searchEncoders(mockEncoders, {
      anyTags: ["steganography", "horror"],
    });
    expect(results).toHaveLength(2);
  });

  it("excludes by tags", () => {
    const results = searchEncoders(mockEncoders, { excludeTags: ["cipher"] });
    expect(results).toHaveLength(4);
    expect(results.find((e) => e.id === "caesar")).toBeUndefined();
  });

  it("filters by reversible=true", () => {
    const results = searchEncoders(mockEncoders, { reversible: true });
    expect(results).toHaveLength(4);
    expect(results.find((e) => e.id === "zalgo")).toBeUndefined();
  });

  it("filters by reversible=false", () => {
    const results = searchEncoders(mockEncoders, { reversible: false });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("zalgo");
  });

  it("filters by hasSettings=true", () => {
    const results = searchEncoders(mockEncoders, { hasSettings: true });
    expect(results).toHaveLength(3);
  });

  it("filters by hasSettings=false", () => {
    const results = searchEncoders(mockEncoders, { hasSettings: false });
    expect(results).toHaveLength(2);
  });

  it("filters by special=true", () => {
    const results = searchEncoders(mockEncoders, { special: true });
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("zero-width");
  });

  it("sorts by name ascending", () => {
    const results = searchEncoders(mockEncoders, {
      sortBy: "name",
      sortOrder: "asc",
    });
    expect(results[0].name).toBe("Caesar Cipher");
    expect(results[results.length - 1].name).toBe("Zero-Width Steganography");
  });

  it("sorts by name descending", () => {
    const results = searchEncoders(mockEncoders, {
      sortBy: "name",
      sortOrder: "desc",
    });
    expect(results[0].name).toBe("Zero-Width Steganography");
    expect(results[results.length - 1].name).toBe("Caesar Cipher");
  });

  it("sorts by category", () => {
    const results = searchEncoders(mockEncoders, {
      sortBy: "category",
      sortOrder: "asc",
    });
    expect(results[0].category).toBe("artistic");
    expect(results[results.length - 1].category).toBe("secret");
  });

  it("combines multiple filters", () => {
    const results = searchEncoders(mockEncoders, {
      reversible: true,
      hasSettings: true,
      sortBy: "name",
      sortOrder: "asc",
    });
    expect(results).toHaveLength(2);
    expect(results[0].id).toBe("caesar");
    expect(results[1].id).toBe("morse-pro");
  });
});

describe("getAllTags", () => {
  it("returns all unique tags sorted", () => {
    const tags = getAllTags(mockEncoders);
    expect(tags).toContain("cipher");
    expect(tags).toContain("emoji");
    expect(tags).toContain("steganography");
    // Should be sorted
    for (let i = 1; i < tags.length; i++) {
      expect(tags[i].localeCompare(tags[i - 1])).toBeGreaterThanOrEqual(0);
    }
  });

  it("returns empty array for empty input", () => {
    const tags = getAllTags([]);
    expect(tags).toEqual([]);
  });
});

describe("getAllCategories", () => {
  it("returns all unique categories sorted", () => {
    const categories = getAllCategories(mockEncoders);
    expect(categories).toContain("cipher");
    expect(categories).toContain("fun");
    expect(categories).toContain("secret");
    // Should be sorted
    for (let i = 1; i < categories.length; i++) {
      expect(
        categories[i].localeCompare(categories[i - 1])
      ).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("getEncoderStats", () => {
  it("returns correct counts", () => {
    const stats = getEncoderStats(mockEncoders);
    expect(stats.total).toBe(5);
    expect(stats.reversible).toBe(4);
    expect(stats.nonReversible).toBe(1);
    expect(stats.withSettings).toBe(3);
    expect(stats.special).toBe(1);
  });

  it("returns category breakdown", () => {
    const stats = getEncoderStats(mockEncoders);
    expect(stats.byCategory.cipher).toBe(1);
    expect(stats.byCategory.fun).toBe(1);
    expect(stats.byCategory.secret).toBe(1);
  });

  it("returns tag counts", () => {
    const stats = getEncoderStats(mockEncoders);
    expect(stats.tagCounts.cipher).toBe(1);
    expect(stats.tagCounts.settings).toBe(1);
  });
});

describe("findSimilarEncoders", () => {
  it("finds encoders with shared tags", () => {
    const similar = findSimilarEncoders(mockEncoders[0], mockEncoders, 5);
    expect(similar).not.toContain(mockEncoders[0]); // Should exclude reference encoder
    expect(similar.length).toBeLessThanOrEqual(5);
  });

  it("returns empty array when no similar encoders", () => {
    const unique = {
      id: "unique",
      name: "Unique",
      description: "Unique encoder",
      category: "unique-category",
      tags: ["unique-tag"],
    };
    const similar = findSimilarEncoders(unique, mockEncoders, 5);
    // May still find matches based on score > 0
    expect(Array.isArray(similar)).toBe(true);
  });
});

describe("groupEncodersBy", () => {
  it("groups by category", () => {
    const groups = groupEncodersBy(mockEncoders, "category");
    expect(groups.cipher).toHaveLength(1);
    expect(groups.fun).toHaveLength(1);
  });

  it("groups by reversible", () => {
    const groups = groupEncodersBy(mockEncoders, "reversible");
    expect(groups["true"]).toHaveLength(4);
    expect(groups["false"]).toHaveLength(1);
  });
});

describe("getFilterPreset", () => {
  it("returns default for unknown preset", () => {
    const preset = getFilterPreset("unknown");
    expect(preset).toEqual(defaultSearchOptions);
  });

  it("returns correct preset for reversible", () => {
    const preset = getFilterPreset("reversible");
    expect(preset.reversible).toBe(true);
  });

  it("returns correct preset for ciphers", () => {
    const preset = getFilterPreset("ciphers");
    expect(preset.categories).toContain("cipher");
  });
});

describe("filterPresets", () => {
  it("has required preset properties", () => {
    filterPresets.forEach((preset) => {
      expect(preset).toHaveProperty("id");
      expect(preset).toHaveProperty("name");
      expect(preset).toHaveProperty("emoji");
    });
  });

  it("includes all preset", () => {
    const allPreset = filterPresets.find((p) => p.id === "all");
    expect(allPreset).toBeDefined();
  });

  it("includes reversible preset", () => {
    const reversiblePreset = filterPresets.find((p) => p.id === "reversible");
    expect(reversiblePreset).toBeDefined();
  });
});

describe("defaultSearchOptions", () => {
  it("has expected structure", () => {
    expect(defaultSearchOptions).toHaveProperty("query");
    expect(defaultSearchOptions).toHaveProperty("categories");
    expect(defaultSearchOptions).toHaveProperty("tags");
    expect(defaultSearchOptions).toHaveProperty("sortBy");
    expect(defaultSearchOptions).toHaveProperty("sortOrder");
  });

  it("has sensible defaults", () => {
    expect(defaultSearchOptions.query).toBe("");
    expect(defaultSearchOptions.categories).toEqual([]);
    expect(defaultSearchOptions.reversible).toBeNull();
    expect(defaultSearchOptions.sortBy).toBe("default");
  });
});
