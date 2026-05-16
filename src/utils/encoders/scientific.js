/**
 * Scientific Encoders
 * Physics, Chemistry, Mathematics, and scientific notation encodings
 */

import { createCharEncoder } from "./shared.js";

const PHYSICS_CONSTANTS = [
  "c",
  "ℏ",
  "G",
  "e",
  "mₑ",
  "mₚ",
  "kB",
  "NA",
  "R",
  "σ",
  "α",
  "μ₀",
  "ε₀",
  "Φ₀",
  "h",
];

const PHYSICS_UNITS = [
  "m/s",
  "J·s",
  "m³/kg·s²",
  "C",
  "kg",
  "kg",
  "J/K",
  "mol⁻¹",
  "J/mol·K",
  "W/m²·K⁴",
];

const CHEMICAL_ELEMENTS = [
  "H",
  "He",
  "Li",
  "Be",
  "B",
  "C",
  "N",
  "O",
  "F",
  "Ne",
  "Na",
  "Mg",
  "Al",
  "Si",
  "P",
  "S",
  "Cl",
  "Ar",
  "K",
  "Ca",
];

const MOLECULAR_BONDS = ["-", "=", "≡", "⊃", "⊂", "○"];
const MOLECULAR_GROUPS = ["CH₃", "OH", "NH₂", "COOH", "CO", "NO₂", "SO₃", "PO₄"];

const CALCULUS_OPERATORS = ["∂", "∇", "∫", "∑", "∏", "lim", "d/dx", "∬", "∮"];
const CALCULUS_FUNCTIONS = [
  "f(x)",
  "g(x)",
  "sin(x)",
  "cos(x)",
  "e^x",
  "ln(x)",
  "x²",
];

const PERIODIC_ELEMENTS = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryllium",
  "Boron",
  "Carbon",
  "Nitrogen",
  "Oxygen",
  "Fluorine",
  "Neon",
  "Sodium",
  "Magnesium",
  "Aluminum",
  "Silicon",
  "Phosphorus",
  "Sulfur",
  "Chlorine",
  "Argon",
  "Potassium",
  "Calcium",
  "Scandium",
  "Titanium",
  "Vanadium",
  "Chromium",
  "Manganese",
  "Iron",
  "Cobalt",
  "Nickel",
  "Copper",
  "Zinc",
  "Gallium",
  "Germanium",
];

const SI_UNITS = [
  "m",
  "kg",
  "s",
  "A",
  "K",
  "mol",
  "cd",
  "Hz",
  "N",
  "Pa",
  "J",
  "W",
  "C",
  "V",
  "Ω",
];
const SI_PREFIXES = ["", "k", "M", "G", "m", "μ", "n", "p"];

const STATISTICS_SYMBOLS = ["μ", "σ", "σ²", "χ²", "z", "t", "F", "p", "n", "r"];

const THERMO_VARS = ["ΔG", "ΔH", "ΔS", "T", "P", "V", "n", "U", "Q", "W"];

const LOGIC_GATES = ["AND", "OR", "XOR", "NOT", "NAND", "NOR", "XNOR"];

const SET_SYMBOLS = [
  "∈",
  "∉",
  "⊂",
  "⊃",
  "⊆",
  "⊇",
  "∪",
  "∩",
  "∅",
  "ℕ",
  "ℤ",
  "ℚ",
  "ℝ",
  "ℂ",
];

const GEOMETRY_SHAPES = ["△", "□", "○", "◇", "☆", "⬠", "⬡", "▽"];
const GEOMETRY_RELATIONS = ["≅", "∼", "⊥", "∥", "∦"];

const FLUID_FLOWS = ["≋", "≈", "∿", "〰", "⌇", "⏦", "☵", "☲"];
const FLUID_REGIMES = ["laminar", "turbulent", "transitional", "creeping"];

const CRYSTAL_SYSTEMS = [
  "cubic",
  "tetragonal",
  "orthorhombic",
  "hexagonal",
  "trigonal",
  "monoclinic",
  "triclinic",
];
const CRYSTAL_LATTICES = ["P", "I", "F", "C", "A", "B", "R"];

const SEISMIC_WAVES = ["P", "S", "L", "R"]; // Primary, Secondary, Love, Rayleigh
const SEISMIC_INTENSITIES = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

const MAGNETIC_POLES = ["N⟶S", "S⟶N", "N⟷N", "S⟷S"];
const MAGNETIC_FIELDS = ["⟵⟶", "⟷", "↝↜", "⇌", "⥊⥋", "⥎⥏", "⥂⥃", "⇶"];

const SUPERNOVA_TYPES = ["Ia", "Ib", "Ic", "II-P", "II-L", "IIn", "IIb"];
const SUPERNOVA_PHASES = ["free-expansion", "Sedov-Taylor", "snow-plow", "fade"];

const CIRCADIAN_PHASES = ["🌅", "☀️", "🌤️", "⛅", "🌥️", "🌙", "🌑", "💤"];
const CIRCADIAN_HORMONES = ["melatonin", "cortisol", "serotonin", "dopamine"];

const HOLO_PATTERNS = ["▓▒░", "░▒▓", "▒▓░", "▓░▒", "░▓▒", "▒░▓", "█▓▒", "▒▓█"];
const HOLO_LASERS = [
  "He-Ne",
  "Ar",
  "Kr",
  "Nd:YAG",
  "diode",
  "ruby",
  "CO2",
  "excimer",
];

const FERMENTATION_ORGANISMS = [
  "S.cerevisiae",
  "L.bulgaricus",
  "B.subtilis",
  "A.niger",
  "K.marxianus",
  "L.plantarum",
  "S.thermophilus",
  "P.roqueforti",
];
const FERMENTATION_PRODUCTS = [
  "ethanol",
  "lactate",
  "acetate",
  "CO2",
  "citrate",
  "butyrate",
  "propionate",
  "succinate",
];

const NEURO_TRANSMITTERS = [
  "dopamine",
  "serotonin",
  "norepinephrine",
  "GABA",
  "glutamate",
  "acetylcholine",
  "endorphin",
  "histamine",
];
const NEURO_RECEPTORS = ["D1", "D2", "5-HT", "α", "β", "NMDA", "AMPA", "mAChR"];

const MANTLE_CELLS = [
  "whole-mantle",
  "layered",
  "plume",
  "slab-driven",
  "thermal",
  "compositional",
  "thermo-chemical",
  "stagnant-lid",
];
const MANTLE_VISCOSITIES = [
  "1e18",
  "1e19",
  "1e20",
  "1e21",
  "1e22",
  "1e23",
  "1e24",
  "1e25",
];

/**
 * Scientific notation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Scientific notation format
 */
export const encodeScientific = createCharEncoder((code) => {
  const exp = Math.floor(Math.log10(code)) || 0;
  const mantissa = (code / Math.pow(10, exp)).toFixed(4);
  return `${mantissa}×10^${exp}`;
}, " ");

/**
 * Decode Scientific notation
 */
export const decodeScientific = (text) => {
  try {
    return text
      .split(" ")
      .map((part) => {
        const match = part.match(/([0-9.]+)×10\^(-?[0-9]+)/);
        if (!match) return "?";
        const mantissa = parseFloat(match[1]);
        const exp = parseInt(match[2]);
        return String.fromCharCode(Math.round(mantissa * Math.pow(10, exp)));
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

/**
 * Physics constants encoding
 * @param {string} text - The text to encode
 * @returns {string} - Physics symbols
 */
export const encodePhysicsConstants = createCharEncoder((code) => {
  const constIdx = code % PHYSICS_CONSTANTS.length;
  const unitIdx = code % PHYSICS_UNITS.length;
  return `${PHYSICS_CONSTANTS[constIdx]}=${code}${PHYSICS_UNITS[unitIdx]}`;
}, " | ");

/**
 * Chemical formula encoding
 * @param {string} text - The text to encode
 * @returns {string} - Chemical formula format
 */
export const encodeChemicalFormula = createCharEncoder((code) => {
  const elem1 = CHEMICAL_ELEMENTS[code % CHEMICAL_ELEMENTS.length];
  const subscript = Math.floor(code / CHEMICAL_ELEMENTS.length) % 10;
  const superscript = code % 4;
  const charges = ["", "⁺", "²⁺", "⁻"];
  return `${elem1}${subscript > 1 ? "₀₁₂₃₄₅₆₇₈₉"[subscript] : ""}${charges[superscript]}`;
});

/**
 * Molecular structure encoding
 * @param {string} text - The text to encode
 * @returns {string} - Molecular structure
 */
export const encodeMolecular = createCharEncoder((code) => {
  const bondIdx = code % MOLECULAR_BONDS.length;
  const groupIdx = code % MOLECULAR_GROUPS.length;
  return `${MOLECULAR_GROUPS[groupIdx]}${MOLECULAR_BONDS[bondIdx]}`;
});

/**
 * Electron configuration encoding
 * @param {string} text - The text to encode
 * @returns {string} - Electron configuration
 */
export const encodeElectronConfig = (text) => {
  const orbitals = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p", "5s", "4d"];

  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      let config = [];
      let remaining = code;
      let idx = 0;
      while (remaining > 0 && idx < orbitals.length) {
        const maxElectrons = orbitals[idx].includes("s")
          ? 2
          : orbitals[idx].includes("p")
            ? 6
            : 10;
        const electrons = Math.min(remaining, maxElectrons);
        config.push(
          `${orbitals[idx]}${electrons < 10 ? "⁰¹²³⁴⁵⁶⁷⁸⁹"[electrons] : electrons}`,
        );
        remaining -= electrons;
        idx++;
      }
      return `[${config.join(" ")}]`;
    })
    .join(" ");
};

/**
 * Quantum state encoding
 * @param {string} text - The text to encode
 * @returns {string} - Quantum notation
 */
export const encodeQuantumState = createCharEncoder((code) => {
  const binary = code.toString(2).padStart(8, "0");
  const qubits = binary
    .split("")
    .map((b) => (b === "0" ? "|0⟩" : "|1⟩"))
    .join("");
  return `⟨ψ|${qubits}`;
}, " ⊗ ");

/**
 * Calculus notation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Calculus notation
 */
export const encodeCalculus = createCharEncoder((code) => {
  const op = CALCULUS_OPERATORS[code % CALCULUS_OPERATORS.length];
  const func = CALCULUS_FUNCTIONS[code % CALCULUS_FUNCTIONS.length];
  return `${op}[${func}]=${code}`;
}, " + ");

/**
 * Matrix notation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Matrix format
 */
export const encodeMatrix = (text) => {
  const result = [];
  for (let i = 0; i < text.length; i += 4) {
    const chunk = text.slice(i, i + 4).padEnd(4, " ");
    const vals = chunk
      .split("")
      .map((c) => c.charCodeAt(0).toString().padStart(3));
    result.push(`⎡${vals[0]} ${vals[1]}⎤\n⎣${vals[2]} ${vals[3]}⎦`);
  }
  return result.join("\n\n");
};

/**
 * Vector notation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Vector format
 */
export const encodeVector = createCharEncoder((code) => {
  const x = code % 16;
  const y = Math.floor(code / 16) % 16;
  const z = Math.floor(code / 256);
  return `⟨${x}, ${y}, ${z}⟩`;
}, " ");

/**
 * Decode Vector notation
 */
export const decodeVector = (text) => {
  try {
    const vectors = text.match(/⟨(\d+), (\d+), (\d+)⟩/g);
    if (!vectors) return "[Invalid format]";
    return vectors
      .map((v) => {
        const match = v.match(/⟨(\d+), (\d+), (\d+)⟩/);
        const code =
          parseInt(match[1]) +
          parseInt(match[2]) * 16 +
          parseInt(match[3]) * 256;
        return String.fromCharCode(code);
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

/**
 * Complex number encoding
 * @param {string} text - The text to encode
 * @returns {string} - Complex numbers
 */
export const encodeComplex = createCharEncoder((code) => {
  const real = code % 100;
  const imag = Math.floor(code / 100);
  return `${real}${imag >= 0 ? "+" : ""}${imag}i`;
}, " ");

/**
 * Decode Complex numbers
 */
export const decodeComplex = (text) => {
  try {
    return text
      .split(" ")
      .map((c) => {
        const match = c.match(/(-?\d+)([+-]\d+)i/);
        if (!match) return "?";
        const real = parseInt(match[1]);
        const imag = parseInt(match[2]);
        return String.fromCharCode(real + imag * 100);
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

/**
 * Polar coordinate encoding
 * @param {string} text - The text to encode
 * @returns {string} - Polar coordinates
 */
export const encodePolar = createCharEncoder((code) => {
  const r = code;
  const theta = ((code * Math.PI) / 128).toFixed(2);
  return `(r=${r}, θ=${theta}rad)`;
}, " ");

/**
 * Periodic table encoding (full element names)
 * @param {string} text - The text to encode
 * @returns {string} - Element names
 */
export const encodePeriodicTable = createCharEncoder((code) => {
  const elem = PERIODIC_ELEMENTS[code % PERIODIC_ELEMENTS.length];
  const isotope = code % 10;
  return `${elem}-${isotope}`;
}, " · ");

/**
 * SI units encoding
 * @param {string} text - The text to encode
 * @returns {string} - SI unit format
 */
export const encodeSIUnits = createCharEncoder((code) => {
  const unit = SI_UNITS[code % SI_UNITS.length];
  const prefix = SI_PREFIXES[Math.floor(code / SI_UNITS.length) % SI_PREFIXES.length];
  return `${code}${prefix}${unit}`;
}, " ");

/**
 * Astronomical coordinate encoding
 * @param {string} text - The text to encode
 * @returns {string} - Astronomical coordinates
 */
export const encodeAstronomical = createCharEncoder((code) => {
  const ra = ((code * 24) / 256).toFixed(2);
  const dec = (((code - 128) * 90) / 128).toFixed(2);
  return `RA:${ra}h DEC:${dec >= 0 ? "+" : ""}${dec}°`;
}, " | ");

/**
 * Wave function encoding
 * @param {string} text - The text to encode
 * @returns {string} - Wave function notation
 */
export const encodeWaveFunction = createCharEncoder((code) => {
  const amplitude = (code / 255).toFixed(3);
  const frequency = code % 10;
  const phase = (((code * Math.PI) / 128) % (2 * Math.PI)).toFixed(2);
  return `Ψ=${amplitude}·sin(${frequency}ωt+${phase})`;
}, " + ");

/**
 * Statistical notation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Statistical notation
 */
export const encodeStatistics = createCharEncoder((code) => {
  const symbol = STATISTICS_SYMBOLS[code % STATISTICS_SYMBOLS.length];
  const value = (code / 10).toFixed(2);
  return `${symbol}=${value}`;
}, ", ");

/**
 * Thermodynamic encoding
 * @param {string} text - The text to encode
 * @returns {string} - Thermodynamic notation
 */
export const encodeThermodynamic = createCharEncoder((code) => {
  const variable = THERMO_VARS[code % THERMO_VARS.length];
  const value = code;
  return `${variable}=${value}`;
}, " → ");

/**
 * Logic gate encoding
 * @param {string} text - The text to encode
 * @returns {string} - Logic gate representation
 */
export const encodeLogicGates = createCharEncoder((code) => {
  const binary = code.toString(2).padStart(8, "0");
  const gateIdx = code % LOGIC_GATES.length;
  return `${LOGIC_GATES[gateIdx]}(${binary.slice(0, 4)}, ${binary.slice(4)})`;
}, " | ");

/**
 * Tensor notation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Tensor notation
 */
export const encodeTensor = createCharEncoder((code) => {
  const i = code % 4;
  const j = Math.floor(code / 4) % 4;
  const k = Math.floor(code / 16) % 4;
  return `T^${i}_{${j}${k}}`;
}, " ⊗ ");

/**
 * Set theory encoding
 * @param {string} text - The text to encode
 * @returns {string} - Set notation
 */
export const encodeSetTheory = createCharEncoder((code) => {
  const symbol = SET_SYMBOLS[code % SET_SYMBOLS.length];
  return `{${code}} ${symbol} ${SET_SYMBOLS[(code + 1) % SET_SYMBOLS.length]}`;
}, " ");

/**
 * Geometry encoding
 * @param {string} text - The text to encode
 * @returns {string} - Geometry notation
 */
export const encodeGeometry = createCharEncoder((code) => {
  const shape = GEOMETRY_SHAPES[code % GEOMETRY_SHAPES.length];
  const relation = GEOMETRY_RELATIONS[code % GEOMETRY_RELATIONS.length];
  return `${shape}${code}${relation}`;
}, " ");

/**
 * Number theory encoding
 * @param {string} text - The text to encode
 * @returns {string} - Number theory notation
 */
export const encodeNumberTheory = (text) => {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      const divisors = [];
      for (let d = 1; d <= code && divisors.length < 4; d++) {
        if (code % d === 0) divisors.push(d);
      }
      return `${code}={${divisors.join(",")}}`;
    })
    .join(" | ");
};

// ============================================
// FLUID DYNAMICS ENCODING
// ============================================

/**
 * Encode text as fluid flow patterns
 * @param {string} text - The text to encode
 * @returns {string} - Fluid dynamics encoding
 */
export const encodeFluidDynamics = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const flow = FLUID_FLOWS[code % FLUID_FLOWS.length];
  const regime = FLUID_REGIMES[(code >> 4) % FLUID_REGIMES.length];
  const reynolds = code * 100;
  return `FLOW[${hex}]{${flow}Re=${reynolds}:${regime}}`;
}, "→");

export const decodeFluidDynamics = (text) => {
  try {
    const matches = text.match(/FLOW\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => {
        const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
        return String.fromCharCode(parseInt(hex, 16));
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// CRYSTALLOGRAPHY ENCODING
// ============================================

/**
 * Encode text as crystal lattice structures
 * @param {string} text - The text to encode
 * @returns {string} - Crystal encoding
 */
export const encodeCrystallography = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const system = CRYSTAL_SYSTEMS[code % CRYSTAL_SYSTEMS.length];
  const lattice = CRYSTAL_LATTICES[(code >> 3) % CRYSTAL_LATTICES.length];
  const a = ((code % 10) + 2).toFixed(2);
  const b = (((code >> 2) % 10) + 2).toFixed(2);
  const c = (((code >> 4) % 10) + 2).toFixed(2);
  return `⬡${lattice}[${hex}]{${system}:a=${a}Å,b=${b}Å,c=${c}Å}`;
}, "⟷");

export const decodeCrystallography = (text) => {
  try {
    const matches = text.match(/[PIFCABR]\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => {
        const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
        return String.fromCharCode(parseInt(hex, 16));
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// SEISMOGRAPH WAVE ENCODING
// ============================================

/**
 * Encode text as seismic wave patterns
 * @param {string} text - The text to encode
 * @returns {string} - Seismic encoding
 */
export const encodeSeismograph = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const wave = SEISMIC_WAVES[code % SEISMIC_WAVES.length];
  const intensity = SEISMIC_INTENSITIES[code % SEISMIC_INTENSITIES.length];
  const magnitude = (code / 25.5).toFixed(1);
  const amplitude = "∿".repeat((code % 5) + 1);
  return `SEISMIC[${hex}]${wave}-wave:M${magnitude}(${intensity})${amplitude}`;
}, "⚡");

export const decodeSeismograph = (text) => {
  try {
    const matches = text.match(/SEISMIC\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => {
        const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
        return String.fromCharCode(parseInt(hex, 16));
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// MAGNETIC FIELD ENCODING
// ============================================

/**
 * Encode text as magnetic field lines
 * @param {string} text - The text to encode
 * @returns {string} - Magnetic encoding
 */
export const encodeMagneticField = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const pole = MAGNETIC_POLES[code % MAGNETIC_POLES.length];
  const field = MAGNETIC_FIELDS[(code >> 2) % MAGNETIC_FIELDS.length];
  const tesla = (code / 1000).toFixed(4);
  const gauss = (code / 10).toFixed(1);
  return `MAG[${hex}]${field}{${pole}:${tesla}T/${gauss}G}`;
}, "⊗");

export const decodeMagneticField = (text) => {
  try {
    const matches = text.match(/MAG\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => {
        const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
        return String.fromCharCode(parseInt(hex, 16));
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// SUPERNOVA REMNANT ENCODING
// ============================================

/**
 * Encode text as supernova remnant properties
 * @param {string} text - The text to encode
 * @returns {string} - Supernova encoding
 */
export const encodeSupernovaRemnant = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const type = SUPERNOVA_TYPES[code % SUPERNOVA_TYPES.length];
  const phase = SUPERNOVA_PHASES[(code >> 4) % SUPERNOVA_PHASES.length];
  const age = code * 100;
  const radius = (code / 10).toFixed(1);
  return `SN[${hex}]💥Type-${type}(${age}yr,${radius}pc,${phase})`;
}, "✴");

export const decodeSupernovaRemnant = (text) => {
  try {
    const matches = text.match(/SN\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => {
        const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
        return String.fromCharCode(parseInt(hex, 16));
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// CIRCADIAN RHYTHM ENCODING
// ============================================

/**
 * Encode text as circadian rhythm patterns
 * @param {string} text - The text to encode
 * @returns {string} - Circadian encoding
 */
export const encodeCircadianRhythm = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const phase = CIRCADIAN_PHASES[code % CIRCADIAN_PHASES.length];
  const hormone = CIRCADIAN_HORMONES[(code >> 4) % CIRCADIAN_HORMONES.length];
  const hour = code % 24;
  const level = ((code % 100) + 1).toString().padStart(3, "0");
  return `CIRCA[${hex}]${phase}@${hour.toString().padStart(2, "0")}:00(${hormone}:${level}%)`;
}, "→");

export const decodeCircadianRhythm = (text) => {
  try {
    const matches = text.match(/CIRCA\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => {
        const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
        return String.fromCharCode(parseInt(hex, 16));
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// HOLOGRAPHIC INTERFERENCE ENCODING
// ============================================

/**
 * Encode text as holographic interference patterns
 * @param {string} text - The text to encode
 * @returns {string} - Holographic encoding
 */
export const encodeHolographicInterference = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const pattern = HOLO_PATTERNS[code % HOLO_PATTERNS.length];
  const laser = HOLO_LASERS[(code >> 3) % HOLO_LASERS.length];
  const wavelength = 400 + (code % 300);
  const fringe = (code % 50) + 10;
  return `HOLO[${hex}]${pattern}{${laser}:λ${wavelength}nm:${fringe}fringes}`;
}, "⟡");

export const decodeHolographicInterference = (text) => {
  try {
    const matches = text.match(/HOLO\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => {
        const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
        return String.fromCharCode(parseInt(hex, 16));
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// FERMENTATION ENCODING
// ============================================

/**
 * Encode text as fermentation process patterns
 * @param {string} text - The text to encode
 * @returns {string} - Fermentation encoding
 */
export const encodeFermentation = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const org = FERMENTATION_ORGANISMS[code % FERMENTATION_ORGANISMS.length];
  const prod = FERMENTATION_PRODUCTS[(code >> 3) % FERMENTATION_PRODUCTS.length];
  const ph = (3 + (code % 5)).toFixed(1);
  const temp = 20 + (code % 25);
  return `FERM[${hex}]🧫{${org}→${prod}@${temp}°C,pH${ph}}`;
}, "⇝");

export const decodeFermentation = (text) => {
  try {
    const matches = text.match(/FERM\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => {
        const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
        return String.fromCharCode(parseInt(hex, 16));
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// NEUROTRANSMITTER ENCODING
// ============================================

/**
 * Encode text as neurotransmitter patterns
 * @param {string} text - The text to encode
 * @returns {string} - Neurotransmitter encoding
 */
export const encodeNeurotransmitter = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const nt = NEURO_TRANSMITTERS[code % NEURO_TRANSMITTERS.length];
  const rec = NEURO_RECEPTORS[(code >> 3) % NEURO_RECEPTORS.length];
  const conc = (code / 10).toFixed(1);
  const action = ["excitatory", "inhibitory"][(code >> 7) % 2];
  return `NEURO[${hex}]🧠{${nt}→${rec}:${conc}nM:${action}}`;
}, "⚡");

export const decodeNeurotransmitter = (text) => {
  try {
    const matches = text.match(/NEURO\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => {
        const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
        return String.fromCharCode(parseInt(hex, 16));
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// MANTLE CONVECTION ENCODING
// ============================================

/**
 * Encode text as mantle convection patterns
 * @param {string} text - The text to encode
 * @returns {string} - Mantle convection encoding
 */
export const encodeMantleConvection = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const cell = MANTLE_CELLS[code % MANTLE_CELLS.length];
  const visc = MANTLE_VISCOSITIES[(code >> 3) % MANTLE_VISCOSITIES.length];
  const depth = 100 + code * 10;
  const temp = 1000 + code * 10;
  return `MANTLE[${hex}]🌋{${cell}:η${visc}Pa·s@${depth}km:${temp}K}`;
}, "↻");

export const decodeMantleConvection = (text) => {
  try {
    const matches = text.match(/MANTLE\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => {
        const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
        return String.fromCharCode(parseInt(hex, 16));
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};
