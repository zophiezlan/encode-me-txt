/**
 * Tests for Novel Encoders
 * 30 completely original encoders - now organized into nature.js, scientific.js, and artistic.js
 */

import { describe, it, expect } from 'vitest';
// Nature encoders (from nature.js)
import {
  encodeOrigamiCrease, decodeOrigamiCrease,
  encodeConstellationMap, decodeConstellationMap,
  encodeTectonicPlate, decodeTectonicPlate,
  encodeMyceliumNetwork, decodeMyceliumNetwork,
  encodeBioluminescence, decodeBioluminescence,
  encodeAuroraBorealis, decodeAuroraBorealis,
  encodeWaggleDance, decodeWaggleDance,
  encodeGlacierStratigraphy, decodeGlacierStratigraphy,
  encodeWindRose, decodeWindRose,
  encodeDendrochronology, decodeDendrochronology,
  encodeCoralReef, decodeCoralReef,
  encodeBirdMigration, decodeBirdMigration,
  encodeErosionPattern, decodeErosionPattern,
  encodeAuroraAustralis, decodeAuroraAustralis,
  encodeSnowflakeCrystal, decodeSnowflakeCrystal,
  encodeBonsaiGrowth, decodeBonsaiGrowth,
} from '../utils/encoders/nature.js';

// Scientific encoders (from scientific.js)
import {
  encodeFluidDynamics, decodeFluidDynamics,
  encodeCrystallography, decodeCrystallography,
  encodeSeismograph, decodeSeismograph,
  encodeMagneticField, decodeMagneticField,
  encodeSupernovaRemnant, decodeSupernovaRemnant,
  encodeCircadianRhythm, decodeCircadianRhythm,
  encodeHolographicInterference, decodeHolographicInterference,
  encodeFermentation, decodeFermentation,
  encodeNeurotransmitter, decodeNeurotransmitter,
  encodeMantleConvection, decodeMantleConvection,
} from '../utils/encoders/scientific.js';

// Artistic encoders (from artistic.js)
import {
  encodeSonarPing, decodeSonarPing,
  encodeKilnFiring, decodeKilnFiring,
  encodeStainedGlass, decodeStainedGlass,
  encodeTessellation, decodeTessellation,
} from '../utils/encoders/artistic.js';

describe('Novel Encoders', () => {
  const testText = 'Hello';

  describe('encodeOrigamiCrease / decodeOrigamiCrease', () => {
    it('encodes as origami crease patterns', () => {
      const result = encodeOrigamiCrease(testText);
      expect(result).toContain('[');
      expect(result.length).toBeGreaterThan(testText.length);
    });

    it('is reversible', () => {
      const encoded = encodeOrigamiCrease(testText);
      const decoded = decodeOrigamiCrease(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeConstellationMap / decodeConstellationMap', () => {
    it('encodes as constellation positions', () => {
      const result = encodeConstellationMap(testText);
      expect(result).toContain('°');
      expect(result).toMatch(/[αβγδεζηθ]/);
    });

    it('is reversible', () => {
      const encoded = encodeConstellationMap(testText);
      const decoded = decodeConstellationMap(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeTectonicPlate / decodeTectonicPlate', () => {
    it('encodes as tectonic movements', () => {
      const result = encodeTectonicPlate(testText);
      expect(result).toContain('PLATE');
      expect(result).toContain('cm/yr');
    });

    it('is reversible', () => {
      const encoded = encodeTectonicPlate(testText);
      const decoded = decodeTectonicPlate(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeMyceliumNetwork / decodeMyceliumNetwork', () => {
    it('encodes as mycelium network', () => {
      const result = encodeMyceliumNetwork(testText);
      expect(result).toMatch(/[◉◎●○◐◑◒◓]/);
    });

    it('is reversible', () => {
      const encoded = encodeMyceliumNetwork(testText);
      const decoded = decodeMyceliumNetwork(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeBioluminescence / decodeBioluminescence', () => {
    it('encodes as bioluminescent patterns', () => {
      const result = encodeBioluminescence(testText);
      expect(result).toContain('nm');
    });

    it('is reversible', () => {
      const encoded = encodeBioluminescence(testText);
      const decoded = decodeBioluminescence(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeFluidDynamics / decodeFluidDynamics', () => {
    it('encodes as fluid flow patterns', () => {
      const result = encodeFluidDynamics(testText);
      expect(result).toContain('FLOW');
      expect(result).toContain('Re=');
    });

    it('is reversible', () => {
      const encoded = encodeFluidDynamics(testText);
      const decoded = decodeFluidDynamics(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeCrystallography / decodeCrystallography', () => {
    it('encodes as crystal structures', () => {
      const result = encodeCrystallography(testText);
      expect(result).toContain('⬡');
      expect(result).toContain('Å');
    });

    it('is reversible', () => {
      const encoded = encodeCrystallography(testText);
      const decoded = decodeCrystallography(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeAuroraBorealis / decodeAuroraBorealis', () => {
    it('encodes as aurora patterns', () => {
      const result = encodeAuroraBorealis(testText);
      expect(result).toContain('AURORA');
      expect(result).toContain('Kp');
    });

    it('is reversible', () => {
      const encoded = encodeAuroraBorealis(testText);
      const decoded = decodeAuroraBorealis(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeWaggleDance / decodeWaggleDance', () => {
    it('encodes as bee waggle dance', () => {
      const result = encodeWaggleDance(testText);
      expect(result).toContain('🐝');
      expect(result).toContain('°');
    });

    it('is reversible', () => {
      const encoded = encodeWaggleDance(testText);
      const decoded = decodeWaggleDance(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeSonarPing / decodeSonarPing', () => {
    it('encodes as sonar pings', () => {
      const result = encodeSonarPing(testText);
      expect(result).toContain('PING');
    });

    it('is reversible', () => {
      const encoded = encodeSonarPing(testText);
      const decoded = decodeSonarPing(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeKilnFiring / decodeKilnFiring', () => {
    it('encodes as kiln firing schedules', () => {
      const result = encodeKilnFiring(testText);
      expect(result).toContain('KILN');
      expect(result).toContain('Cone');
    });

    it('is reversible', () => {
      const encoded = encodeKilnFiring(testText);
      const decoded = decodeKilnFiring(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeSeismograph / decodeSeismograph', () => {
    it('encodes as seismic waves', () => {
      const result = encodeSeismograph(testText);
      expect(result).toContain('SEISMIC');
      expect(result).toMatch(/-wave/);
    });

    it('is reversible', () => {
      const encoded = encodeSeismograph(testText);
      const decoded = decodeSeismograph(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeGlacierStratigraphy / decodeGlacierStratigraphy', () => {
    it('encodes as ice core layers', () => {
      const result = encodeGlacierStratigraphy(testText);
      expect(result).toContain('ICE');
      expect(result).toContain('BP');
    });

    it('is reversible', () => {
      const encoded = encodeGlacierStratigraphy(testText);
      const decoded = decodeGlacierStratigraphy(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeWindRose / decodeWindRose', () => {
    it('encodes as wind rose patterns', () => {
      const result = encodeWindRose(testText);
      expect(result).toContain('🌬️');
      expect(result).toContain('kts');
    });

    it('is reversible', () => {
      const encoded = encodeWindRose(testText);
      const decoded = decodeWindRose(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeDendrochronology / decodeDendrochronology', () => {
    it('encodes as tree rings', () => {
      const result = encodeDendrochronology(testText);
      expect(result).toContain('🌳');
      expect(result).toContain('mm');
    });

    it('is reversible', () => {
      const encoded = encodeDendrochronology(testText);
      const decoded = decodeDendrochronology(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeMagneticField / decodeMagneticField', () => {
    it('encodes as magnetic fields', () => {
      const result = encodeMagneticField(testText);
      expect(result).toContain('MAG');
      expect(result).toContain('T/');
    });

    it('is reversible', () => {
      const encoded = encodeMagneticField(testText);
      const decoded = decodeMagneticField(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeCoralReef / decodeCoralReef', () => {
    it('encodes as coral reef', () => {
      const result = encodeCoralReef(testText);
      expect(result).toContain('CORAL');
      expect(result).toContain('health');
    });

    it('is reversible', () => {
      const encoded = encodeCoralReef(testText);
      const decoded = decodeCoralReef(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeSupernovaRemnant / decodeSupernovaRemnant', () => {
    it('encodes as supernova remnants', () => {
      const result = encodeSupernovaRemnant(testText);
      expect(result).toContain('SN');
      expect(result).toContain('Type-');
    });

    it('is reversible', () => {
      const encoded = encodeSupernovaRemnant(testText);
      const decoded = decodeSupernovaRemnant(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeCircadianRhythm / decodeCircadianRhythm', () => {
    it('encodes as circadian rhythms', () => {
      const result = encodeCircadianRhythm(testText);
      expect(result).toContain('CIRCA');
      expect(result).toContain(':00');
    });

    it('is reversible', () => {
      const encoded = encodeCircadianRhythm(testText);
      const decoded = decodeCircadianRhythm(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeHolographicInterference / decodeHolographicInterference', () => {
    it('encodes as holographic patterns', () => {
      const result = encodeHolographicInterference(testText);
      expect(result).toContain('HOLO');
      expect(result).toContain('fringes');
    });

    it('is reversible', () => {
      const encoded = encodeHolographicInterference(testText);
      const decoded = decodeHolographicInterference(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeBirdMigration / decodeBirdMigration', () => {
    it('encodes as bird migration patterns', () => {
      const result = encodeBirdMigration(testText);
      expect(result).toContain('MIGRATE');
      expect(result).toContain('ft');
    });

    it('is reversible', () => {
      const encoded = encodeBirdMigration(testText);
      const decoded = decodeBirdMigration(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeTessellation / decodeTessellation', () => {
    it('encodes as tessellation patterns', () => {
      const result = encodeTessellation(testText);
      expect(result).toContain('TESS');
    });

    it('is reversible', () => {
      const encoded = encodeTessellation(testText);
      const decoded = decodeTessellation(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeErosionPattern / decodeErosionPattern', () => {
    it('encodes as erosion patterns', () => {
      const result = encodeErosionPattern(testText);
      expect(result).toContain('ERODE');
      expect(result).toContain('mm/yr');
    });

    it('is reversible', () => {
      const encoded = encodeErosionPattern(testText);
      const decoded = decodeErosionPattern(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeFermentation / decodeFermentation', () => {
    it('encodes as fermentation processes', () => {
      const result = encodeFermentation(testText);
      expect(result).toContain('FERM');
      expect(result).toContain('pH');
    });

    it('is reversible', () => {
      const encoded = encodeFermentation(testText);
      const decoded = decodeFermentation(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeAuroraAustralis / decodeAuroraAustralis', () => {
    it('encodes as southern aurora patterns', () => {
      const result = encodeAuroraAustralis(testText);
      expect(result).toContain('SOUTH');
      expect(result).toContain('nm');
    });

    it('is reversible', () => {
      const encoded = encodeAuroraAustralis(testText);
      const decoded = decodeAuroraAustralis(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeStainedGlass / decodeStainedGlass', () => {
    it('encodes as stained glass patterns', () => {
      const result = encodeStainedGlass(testText);
      expect(result).toContain('GLASS');
      expect(result).toContain('-lead');
    });

    it('is reversible', () => {
      const encoded = encodeStainedGlass(testText);
      const decoded = decodeStainedGlass(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeSnowflakeCrystal / decodeSnowflakeCrystal', () => {
    it('encodes as snowflake crystals', () => {
      const result = encodeSnowflakeCrystal(testText);
      expect(result).toContain('SNOW');
      expect(result).toContain('°C');
    });

    it('is reversible', () => {
      const encoded = encodeSnowflakeCrystal(testText);
      const decoded = decodeSnowflakeCrystal(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeNeurotransmitter / decodeNeurotransmitter', () => {
    it('encodes as neurotransmitter patterns', () => {
      const result = encodeNeurotransmitter(testText);
      expect(result).toContain('NEURO');
      expect(result).toContain('🧠');
    });

    it('is reversible', () => {
      const encoded = encodeNeurotransmitter(testText);
      const decoded = decodeNeurotransmitter(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeMantleConvection / decodeMantleConvection', () => {
    it('encodes as mantle convection', () => {
      const result = encodeMantleConvection(testText);
      expect(result).toContain('MANTLE');
      expect(result).toContain('Pa·s');
    });

    it('is reversible', () => {
      const encoded = encodeMantleConvection(testText);
      const decoded = decodeMantleConvection(encoded);
      expect(decoded).toBe(testText);
    });
  });

  describe('encodeBonsaiGrowth / decodeBonsaiGrowth', () => {
    it('encodes as bonsai growth patterns', () => {
      const result = encodeBonsaiGrowth(testText);
      expect(result).toContain('BONSAI');
      expect(result).toContain('branches');
    });

    it('is reversible', () => {
      const encoded = encodeBonsaiGrowth(testText);
      const decoded = decodeBonsaiGrowth(encoded);
      expect(decoded).toBe(testText);
    });
  });
});
