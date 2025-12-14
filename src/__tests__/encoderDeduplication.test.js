import { describe, it, expect } from "vitest";
import {
  encoderRelationships,
  getPreferredEncoder,
  isSuperseded,
  isAlias,
  isRedundant,
  getEncoderRelationship,
  getRedundantEncoderIds,
  getSupersededEncoderIds,
  getAliasEncoderIds,
  deduplicateEncoders,
  getDeduplicationSummary,
  groupByPreferredEncoder,
} from "../utils/encoderDeduplication.js";
import {
  encoderConfig,
  getDeduplicatedEncoders,
  getEncodersWithRedundancyMarkers,
} from "../utils/encoderConfig.js";

describe("Encoder Deduplication", () => {
  describe("encoderRelationships", () => {
    it("should have relationship data for Pro versions", () => {
      expect(encoderRelationships["leetspeak"]).toBeDefined();
      expect(encoderRelationships["leetspeak"].supersededBy).toBe(
        "leetspeak-pro"
      );
    });

    it("should have relationship data for aliases", () => {
      expect(encoderRelationships["vaporwave"]).toBeDefined();
      expect(encoderRelationships["vaporwave"].aliasOf).toBe("fullwidth");
    });

    it("should include reason for all relationships", () => {
      for (const [, rel] of Object.entries(encoderRelationships)) {
        expect(rel.reason).toBeDefined();
        expect(typeof rel.reason).toBe("string");
        expect(rel.reason.length).toBeGreaterThan(0);
      }
    });
  });

  describe("getPreferredEncoder", () => {
    it("should return Pro version for superseded encoders", () => {
      expect(getPreferredEncoder("leetspeak")).toBe("leetspeak-pro");
      expect(getPreferredEncoder("binary")).toBe("binary-pro");
      expect(getPreferredEncoder("morse")).toBe("morse-pro");
    });

    it("should return canonical version for aliases", () => {
      expect(getPreferredEncoder("vaporwave")).toBe("fullwidth");
      expect(getPreferredEncoder("medieval")).toBe("math-fraktur");
    });

    it("should return same ID for non-redundant encoders", () => {
      expect(getPreferredEncoder("base64")).toBe("base64");
      expect(getPreferredEncoder("rot13")).toBe("rot13");
    });
  });

  describe("isSuperseded", () => {
    it("should return true for superseded encoders", () => {
      expect(isSuperseded("leetspeak")).toBe(true);
      expect(isSuperseded("binary")).toBe(true);
      expect(isSuperseded("nato")).toBe(true);
    });

    it("should return false for non-superseded encoders", () => {
      expect(isSuperseded("vaporwave")).toBe(false);
      expect(isSuperseded("base64")).toBe(false);
    });
  });

  describe("isAlias", () => {
    it("should return true for alias encoders", () => {
      expect(isAlias("vaporwave")).toBe(true);
      expect(isAlias("medieval")).toBe(true);
    });

    it("should return false for non-alias encoders", () => {
      expect(isAlias("leetspeak")).toBe(false);
      expect(isAlias("base64")).toBe(false);
    });
  });

  describe("isRedundant", () => {
    it("should return true for both superseded and alias encoders", () => {
      expect(isRedundant("leetspeak")).toBe(true);
      expect(isRedundant("vaporwave")).toBe(true);
    });

    it("should return false for non-redundant encoders", () => {
      expect(isRedundant("base64")).toBe(false);
      expect(isRedundant("rot13")).toBe(false);
    });
  });

  describe("getEncoderRelationship", () => {
    it("should return relationship info for redundant encoders", () => {
      const rel = getEncoderRelationship("leetspeak");
      expect(rel).toBeDefined();
      expect(rel.supersededBy).toBe("leetspeak-pro");
      expect(rel.reason).toBeDefined();
    });

    it("should return null for non-redundant encoders", () => {
      expect(getEncoderRelationship("base64")).toBeNull();
    });
  });

  describe("getRedundantEncoderIds", () => {
    it("should return all redundant encoder IDs", () => {
      const ids = getRedundantEncoderIds();
      expect(ids).toContain("leetspeak");
      expect(ids).toContain("vaporwave");
      expect(ids.length).toBeGreaterThan(0);
    });
  });

  describe("getSupersededEncoderIds", () => {
    it("should return only superseded encoder IDs", () => {
      const ids = getSupersededEncoderIds();
      expect(ids).toContain("leetspeak");
      expect(ids).not.toContain("vaporwave");
    });
  });

  describe("getAliasEncoderIds", () => {
    it("should return only alias encoder IDs", () => {
      const ids = getAliasEncoderIds();
      expect(ids).toContain("vaporwave");
      expect(ids).not.toContain("leetspeak");
    });
  });

  describe("deduplicateEncoders", () => {
    const mockEncoders = [
      { id: "leetspeak", name: "Leetspeak" },
      { id: "leetspeak-pro", name: "Leetspeak Pro" },
      { id: "vaporwave", name: "Vaporwave" },
      { id: "fullwidth", name: "Fullwidth" },
      { id: "base64", name: "Base64" },
    ];

    it("should remove superseded and alias encoders by default", () => {
      const result = deduplicateEncoders(mockEncoders);
      expect(result).toHaveLength(3);
      expect(result.find((e) => e.id === "leetspeak")).toBeUndefined();
      expect(result.find((e) => e.id === "vaporwave")).toBeUndefined();
      expect(result.find((e) => e.id === "leetspeak-pro")).toBeDefined();
      expect(result.find((e) => e.id === "fullwidth")).toBeDefined();
      expect(result.find((e) => e.id === "base64")).toBeDefined();
    });

    it("should keep superseded encoders when removeSuperseded is false", () => {
      const result = deduplicateEncoders(mockEncoders, {
        removeSuperseded: false,
      });
      expect(result.find((e) => e.id === "leetspeak")).toBeDefined();
    });

    it("should keep alias encoders when removeAliases is false", () => {
      const result = deduplicateEncoders(mockEncoders, {
        removeAliases: false,
      });
      expect(result.find((e) => e.id === "vaporwave")).toBeDefined();
    });

    it("should mark redundant encoders when markRedundant is true", () => {
      const result = deduplicateEncoders(mockEncoders, { markRedundant: true });
      expect(result).toHaveLength(5);

      const leetspeak = result.find((e) => e.id === "leetspeak");
      expect(leetspeak.isRedundant).toBe(true);
      expect(leetspeak.redundantType).toBe("superseded");
      expect(leetspeak.preferredEncoder).toBe("leetspeak-pro");

      const vaporwave = result.find((e) => e.id === "vaporwave");
      expect(vaporwave.isRedundant).toBe(true);
      expect(vaporwave.redundantType).toBe("alias");
      expect(vaporwave.preferredEncoder).toBe("fullwidth");

      const base64 = result.find((e) => e.id === "base64");
      expect(base64.isRedundant).toBeUndefined();
    });
  });

  describe("getDeduplicationSummary", () => {
    const mockEncoders = [
      { id: "leetspeak", name: "Leetspeak" },
      { id: "leetspeak-pro", name: "Leetspeak Pro" },
      { id: "vaporwave", name: "Vaporwave" },
      { id: "fullwidth", name: "Fullwidth" },
      { id: "base64", name: "Base64" },
    ];

    it("should provide accurate counts", () => {
      const summary = getDeduplicationSummary(mockEncoders);
      expect(summary.total).toBe(5);
      expect(summary.superseded).toBe(1);
      expect(summary.aliases).toBe(1);
      expect(summary.unique).toBe(3);
      expect(summary.deduplicatedCount).toBe(3);
    });

    it("should include details about superseded encoders", () => {
      const summary = getDeduplicationSummary(mockEncoders);
      expect(summary.supersededEncoders).toHaveLength(1);
      expect(summary.supersededEncoders[0].encoder.id).toBe("leetspeak");
      expect(summary.supersededEncoders[0].supersededBy).toBe("leetspeak-pro");
    });

    it("should include details about alias encoders", () => {
      const summary = getDeduplicationSummary(mockEncoders);
      expect(summary.aliasEncoders).toHaveLength(1);
      expect(summary.aliasEncoders[0].encoder.id).toBe("vaporwave");
      expect(summary.aliasEncoders[0].aliasOf).toBe("fullwidth");
    });
  });

  describe("groupByPreferredEncoder", () => {
    const mockEncoders = [
      { id: "leetspeak", name: "Leetspeak" },
      { id: "leetspeak-pro", name: "Leetspeak Pro" },
      { id: "base64", name: "Base64" },
    ];

    it("should group encoders by their preferred encoder", () => {
      const groups = groupByPreferredEncoder(mockEncoders);

      // Both leetspeak and leetspeak-pro should be under 'leetspeak-pro'
      const leetspeakGroup = groups.get("leetspeak-pro");
      expect(leetspeakGroup).toBeDefined();
      expect(leetspeakGroup).toHaveLength(2);

      // base64 should be in its own group
      const base64Group = groups.get("base64");
      expect(base64Group).toBeDefined();
      expect(base64Group).toHaveLength(1);
    });
  });

  // Integration tests with actual encoderConfig
  describe("Integration with encoderConfig", () => {
    it("should have Pro encoders in the actual encoderConfig", () => {
      const proEncoderIds = [
        "leetspeak-pro",
        "uwu-pro",
        "spongebob-pro",
        "binary-pro",
        "morse-pro",
      ];
      proEncoderIds.forEach((id) => {
        const encoder = encoderConfig.find((e) => e.id === id);
        expect(encoder).toBeDefined();
        expect(encoder.hasSettings).toBe(true);
      });
    });

    it("should have removed redundant encoders from encoderConfig", () => {
      // Verify that redundant encoders are no longer in the config
      const redundantIds = getRedundantEncoderIds();
      redundantIds.forEach((id) => {
        expect(encoderConfig.find((e) => e.id === id)).toBeUndefined();
      });
    });

    it("should have encoderRelationships still define redundancy for reference", () => {
      // The relationships are still defined for documentation/reference purposes
      expect(isSuperseded("leetspeak")).toBe(true);
      expect(isSuperseded("binary")).toBe(true);
      expect(isAlias("vaporwave")).toBe(true);
    });

    it("should return same list from getDeduplicatedEncoders since redundant already removed", () => {
      const dedup = getDeduplicatedEncoders();
      // Since redundant encoders are already removed, dedup list should equal original
      expect(dedup.length).toBe(encoderConfig.length);
    });

    it("should return markers with no redundant encoders since they were removed", () => {
      const marked = getEncodersWithRedundancyMarkers();
      expect(marked.length).toBe(encoderConfig.length);

      // No encoders should be marked as redundant since they've been removed
      const redundant = marked.filter((e) => e.isRedundant);
      expect(redundant.length).toBe(0);
    });
  });
});
