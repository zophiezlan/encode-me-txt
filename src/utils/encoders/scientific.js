/**
 * Scientific Encoders
 * Physics, Chemistry, Mathematics, and scientific notation encodings
 */

/**
 * Scientific notation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Scientific notation format
 */
export const encodeScientific = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const exp = Math.floor(Math.log10(code)) || 0;
    const mantissa = (code / Math.pow(10, exp)).toFixed(4);
    return `${mantissa}×10^${exp}`;
  }).join(' ');
};

/**
 * Decode Scientific notation
 */
export const decodeScientific = (text) => {
  try {
    return text.split(' ').map(part => {
      const match = part.match(/([0-9.]+)×10\^(-?[0-9]+)/);
      if (!match) return '?';
      const mantissa = parseFloat(match[1]);
      const exp = parseInt(match[2]);
      return String.fromCharCode(Math.round(mantissa * Math.pow(10, exp)));
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Physics constants encoding
 * @param {string} text - The text to encode
 * @returns {string} - Physics symbols
 */
export const encodePhysicsConstants = (text) => {
  const constants = ['c', 'ℏ', 'G', 'e', 'mₑ', 'mₚ', 'kB', 'NA', 'R', 'σ', 'α', 'μ₀', 'ε₀', 'Φ₀', 'h'];
  const units = ['m/s', 'J·s', 'm³/kg·s²', 'C', 'kg', 'kg', 'J/K', 'mol⁻¹', 'J/mol·K', 'W/m²·K⁴'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const constIdx = code % constants.length;
    const unitIdx = code % units.length;
    return `${constants[constIdx]}=${code}${units[unitIdx]}`;
  }).join(' | ');
};

/**
 * Chemical formula encoding
 * @param {string} text - The text to encode
 * @returns {string} - Chemical formula format
 */
export const encodeChemicalFormula = (text) => {
  const elements = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const elem1 = elements[code % elements.length];
    const subscript = Math.floor(code / elements.length) % 10;
    const superscript = code % 4;
    const charges = ['', '⁺', '²⁺', '⁻'];
    return `${elem1}${subscript > 1 ? '₀₁₂₃₄₅₆₇₈₉'[subscript] : ''}${charges[superscript]}`;
  }).join('');
};

/**
 * Molecular structure encoding
 * @param {string} text - The text to encode
 * @returns {string} - Molecular structure
 */
export const encodeMolecular = (text) => {
  const bonds = ['-', '=', '≡', '⊃', '⊂', '○'];
  const groups = ['CH₃', 'OH', 'NH₂', 'COOH', 'CO', 'NO₂', 'SO₃', 'PO₄'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const bondIdx = code % bonds.length;
    const groupIdx = code % groups.length;
    return `${groups[groupIdx]}${bonds[bondIdx]}`;
  }).join('');
};

/**
 * Electron configuration encoding
 * @param {string} text - The text to encode
 * @returns {string} - Electron configuration
 */
export const encodeElectronConfig = (text) => {
  const orbitals = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    let config = [];
    let remaining = code;
    let idx = 0;
    while (remaining > 0 && idx < orbitals.length) {
      const maxElectrons = orbitals[idx].includes('s') ? 2 : (orbitals[idx].includes('p') ? 6 : 10);
      const electrons = Math.min(remaining, maxElectrons);
      config.push(`${orbitals[idx]}${electrons < 10 ? '⁰¹²³⁴⁵⁶⁷⁸⁹'[electrons] : electrons}`);
      remaining -= electrons;
      idx++;
    }
    return `[${config.join(' ')}]`;
  }).join(' ');
};

/**
 * Quantum state encoding
 * @param {string} text - The text to encode
 * @returns {string} - Quantum notation
 */
export const encodeQuantumState = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const binary = code.toString(2).padStart(8, '0');
    const qubits = binary.split('').map(b => b === '0' ? '|0⟩' : '|1⟩').join('');
    return `⟨ψ|${qubits}`;
  }).join(' ⊗ ');
};

/**
 * Calculus notation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Calculus notation
 */
export const encodeCalculus = (text) => {
  const operators = ['∂', '∇', '∫', '∑', '∏', 'lim', 'd/dx', '∬', '∮'];
  const functions = ['f(x)', 'g(x)', 'sin(x)', 'cos(x)', 'e^x', 'ln(x)', 'x²'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const op = operators[code % operators.length];
    const func = functions[code % functions.length];
    return `${op}[${func}]=${code}`;
  }).join(' + ');
};

/**
 * Matrix notation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Matrix format
 */
export const encodeMatrix = (text) => {
  const result = [];
  for (let i = 0; i < text.length; i += 4) {
    const chunk = text.slice(i, i + 4).padEnd(4, ' ');
    const vals = chunk.split('').map(c => c.charCodeAt(0).toString().padStart(3));
    result.push(`⎡${vals[0]} ${vals[1]}⎤\n⎣${vals[2]} ${vals[3]}⎦`);
  }
  return result.join('\n\n');
};

/**
 * Vector notation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Vector format
 */
export const encodeVector = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const x = code % 16;
    const y = Math.floor(code / 16) % 16;
    const z = Math.floor(code / 256);
    return `⟨${x}, ${y}, ${z}⟩`;
  }).join(' ');
};

/**
 * Decode Vector notation
 */
export const decodeVector = (text) => {
  try {
    const vectors = text.match(/⟨(\d+), (\d+), (\d+)⟩/g);
    if (!vectors) return '[Invalid format]';
    return vectors.map(v => {
      const match = v.match(/⟨(\d+), (\d+), (\d+)⟩/);
      const code = parseInt(match[1]) + parseInt(match[2]) * 16 + parseInt(match[3]) * 256;
      return String.fromCharCode(code);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Complex number encoding
 * @param {string} text - The text to encode
 * @returns {string} - Complex numbers
 */
export const encodeComplex = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const real = code % 100;
    const imag = Math.floor(code / 100);
    return `${real}${imag >= 0 ? '+' : ''}${imag}i`;
  }).join(' ');
};

/**
 * Decode Complex numbers
 */
export const decodeComplex = (text) => {
  try {
    return text.split(' ').map(c => {
      const match = c.match(/(-?\d+)([+-]\d+)i/);
      if (!match) return '?';
      const real = parseInt(match[1]);
      const imag = parseInt(match[2]);
      return String.fromCharCode(real + imag * 100);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Polar coordinate encoding
 * @param {string} text - The text to encode
 * @returns {string} - Polar coordinates
 */
export const encodePolar = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const r = code;
    const theta = (code * Math.PI / 128).toFixed(2);
    return `(r=${r}, θ=${theta}rad)`;
  }).join(' ');
};

/**
 * Periodic table encoding (full element names)
 * @param {string} text - The text to encode
 * @returns {string} - Element names
 */
export const encodePeriodicTable = (text) => {
  const elements = [
    'Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen',
    'Fluorine', 'Neon', 'Sodium', 'Magnesium', 'Aluminum', 'Silicon', 'Phosphorus', 'Sulfur',
    'Chlorine', 'Argon', 'Potassium', 'Calcium', 'Scandium', 'Titanium', 'Vanadium', 'Chromium',
    'Manganese', 'Iron', 'Cobalt', 'Nickel', 'Copper', 'Zinc', 'Gallium', 'Germanium'
  ];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const elem = elements[code % elements.length];
    const isotope = code % 10;
    return `${elem}-${isotope}`;
  }).join(' · ');
};

/**
 * SI units encoding
 * @param {string} text - The text to encode
 * @returns {string} - SI unit format
 */
export const encodeSIUnits = (text) => {
  const units = ['m', 'kg', 's', 'A', 'K', 'mol', 'cd', 'Hz', 'N', 'Pa', 'J', 'W', 'C', 'V', 'Ω'];
  const prefixes = ['', 'k', 'M', 'G', 'm', 'μ', 'n', 'p'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const unit = units[code % units.length];
    const prefix = prefixes[Math.floor(code / units.length) % prefixes.length];
    return `${code}${prefix}${unit}`;
  }).join(' ');
};

/**
 * Astronomical coordinate encoding
 * @param {string} text - The text to encode
 * @returns {string} - Astronomical coordinates
 */
export const encodeAstronomical = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const ra = (code * 24 / 256).toFixed(2);
    const dec = ((code - 128) * 90 / 128).toFixed(2);
    return `RA:${ra}h DEC:${dec >= 0 ? '+' : ''}${dec}°`;
  }).join(' | ');
};

/**
 * Wave function encoding
 * @param {string} text - The text to encode
 * @returns {string} - Wave function notation
 */
export const encodeWaveFunction = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const amplitude = (code / 255).toFixed(3);
    const frequency = code % 10;
    const phase = ((code * Math.PI / 128) % (2 * Math.PI)).toFixed(2);
    return `Ψ=${amplitude}·sin(${frequency}ωt+${phase})`;
  }).join(' + ');
};

/**
 * Statistical notation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Statistical notation
 */
export const encodeStatistics = (text) => {
  const symbols = ['μ', 'σ', 'σ²', 'χ²', 'z', 't', 'F', 'p', 'n', 'r'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const symbol = symbols[code % symbols.length];
    const value = (code / 10).toFixed(2);
    return `${symbol}=${value}`;
  }).join(', ');
};

/**
 * Thermodynamic encoding
 * @param {string} text - The text to encode
 * @returns {string} - Thermodynamic notation
 */
export const encodeThermodynamic = (text) => {
  const vars = ['ΔG', 'ΔH', 'ΔS', 'T', 'P', 'V', 'n', 'U', 'Q', 'W'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const variable = vars[code % vars.length];
    const value = code;
    return `${variable}=${value}`;
  }).join(' → ');
};

/**
 * Logic gate encoding
 * @param {string} text - The text to encode
 * @returns {string} - Logic gate representation
 */
export const encodeLogicGates = (text) => {
  const gates = ['AND', 'OR', 'XOR', 'NOT', 'NAND', 'NOR', 'XNOR'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const binary = code.toString(2).padStart(8, '0');
    const gateIdx = code % gates.length;
    return `${gates[gateIdx]}(${binary.slice(0, 4)}, ${binary.slice(4)})`;
  }).join(' | ');
};

/**
 * Tensor notation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Tensor notation
 */
export const encodeTensor = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const i = code % 4;
    const j = Math.floor(code / 4) % 4;
    const k = Math.floor(code / 16) % 4;
    return `T^${i}_{${j}${k}}`;
  }).join(' ⊗ ');
};

/**
 * Set theory encoding
 * @param {string} text - The text to encode
 * @returns {string} - Set notation
 */
export const encodeSetTheory = (text) => {
  const symbols = ['∈', '∉', '⊂', '⊃', '⊆', '⊇', '∪', '∩', '∅', 'ℕ', 'ℤ', 'ℚ', 'ℝ', 'ℂ'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const symbol = symbols[code % symbols.length];
    return `{${code}} ${symbol} ${symbols[(code + 1) % symbols.length]}`;
  }).join(' ');
};

/**
 * Geometry encoding
 * @param {string} text - The text to encode
 * @returns {string} - Geometry notation
 */
export const encodeGeometry = (text) => {
  const shapes = ['△', '□', '○', '◇', '☆', '⬠', '⬡', '▽'];
  const relations = ['≅', '∼', '⊥', '∥', '∦'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const shape = shapes[code % shapes.length];
    const relation = relations[code % relations.length];
    return `${shape}${code}${relation}`;
  }).join(' ');
};

/**
 * Number theory encoding
 * @param {string} text - The text to encode
 * @returns {string} - Number theory notation
 */
export const encodeNumberTheory = (text) => {
  return text.split('').map((char) => {
    const code = char.charCodeAt(0);
    const divisors = [];
    for (let d = 1; d <= code && divisors.length < 4; d++) {
      if (code % d === 0) divisors.push(d);
    }
    return `${code}={${divisors.join(',')}}`;
  }).join(' | ');
};

// ============================================
// FLUID DYNAMICS ENCODING
// ============================================

/**
 * Encode text as fluid flow patterns
 * @param {string} text - The text to encode
 * @returns {string} - Fluid dynamics encoding
 */
export const encodeFluidDynamics = (text) => {
  const flows = ['≋', '≈', '∿', '〰', '⌇', '⏦', '☵', '☲'];
  const regimes = ['laminar', 'turbulent', 'transitional', 'creeping'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const flow = flows[code % flows.length];
    const regime = regimes[(code >> 4) % regimes.length];
    const reynolds = code * 100;
    return `FLOW[${hex}]{${flow}Re=${reynolds}:${regime}}`;
  }).join('→');
};

export const decodeFluidDynamics = (text) => {
  try {
    const matches = text.match(/FLOW\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// CRYSTALLOGRAPHY ENCODING
// ============================================

/**
 * Encode text as crystal lattice structures
 * @param {string} text - The text to encode
 * @returns {string} - Crystal encoding
 */
export const encodeCrystallography = (text) => {
  const systems = ['cubic', 'tetragonal', 'orthorhombic', 'hexagonal', 'trigonal', 'monoclinic', 'triclinic'];
  const lattices = ['P', 'I', 'F', 'C', 'A', 'B', 'R'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const system = systems[code % systems.length];
    const lattice = lattices[(code >> 3) % lattices.length];
    const a = (code % 10 + 2).toFixed(2);
    const b = ((code >> 2) % 10 + 2).toFixed(2);
    const c = ((code >> 4) % 10 + 2).toFixed(2);
    return `⬡${lattice}[${hex}]{${system}:a=${a}Å,b=${b}Å,c=${c}Å}`;
  }).join('⟷');
};

export const decodeCrystallography = (text) => {
  try {
    const matches = text.match(/[PIFCABR]\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// SEISMOGRAPH WAVE ENCODING
// ============================================

/**
 * Encode text as seismic wave patterns
 * @param {string} text - The text to encode
 * @returns {string} - Seismic encoding
 */
export const encodeSeismograph = (text) => {
  const waves = ['P', 'S', 'L', 'R']; // Primary, Secondary, Love, Rayleigh
  const intensities = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const wave = waves[code % waves.length];
    const intensity = intensities[code % intensities.length];
    const magnitude = (code / 25.5).toFixed(1);
    const amplitude = '∿'.repeat((code % 5) + 1);
    return `SEISMIC[${hex}]${wave}-wave:M${magnitude}(${intensity})${amplitude}`;
  }).join('⚡');
};

export const decodeSeismograph = (text) => {
  try {
    const matches = text.match(/SEISMIC\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// MAGNETIC FIELD ENCODING
// ============================================

/**
 * Encode text as magnetic field lines
 * @param {string} text - The text to encode
 * @returns {string} - Magnetic encoding
 */
export const encodeMagneticField = (text) => {
  const poles = ['N⟶S', 'S⟶N', 'N⟷N', 'S⟷S'];
  const fields = ['⟵⟶', '⟷', '↝↜', '⇌', '⥊⥋', '⥎⥏', '⥂⥃', '⇶'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const pole = poles[code % poles.length];
    const field = fields[(code >> 2) % fields.length];
    const tesla = (code / 1000).toFixed(4);
    const gauss = (code / 10).toFixed(1);
    return `MAG[${hex}]${field}{${pole}:${tesla}T/${gauss}G}`;
  }).join('⊗');
};

export const decodeMagneticField = (text) => {
  try {
    const matches = text.match(/MAG\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// SUPERNOVA REMNANT ENCODING
// ============================================

/**
 * Encode text as supernova remnant properties
 * @param {string} text - The text to encode
 * @returns {string} - Supernova encoding
 */
export const encodeSupernovaRemnant = (text) => {
  const types = ['Ia', 'Ib', 'Ic', 'II-P', 'II-L', 'IIn', 'IIb'];
  const phases = ['free-expansion', 'Sedov-Taylor', 'snow-plow', 'fade'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const type = types[code % types.length];
    const phase = phases[(code >> 4) % phases.length];
    const age = code * 100;
    const radius = (code / 10).toFixed(1);
    return `SN[${hex}]💥Type-${type}(${age}yr,${radius}pc,${phase})`;
  }).join('✴');
};

export const decodeSupernovaRemnant = (text) => {
  try {
    const matches = text.match(/SN\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// CIRCADIAN RHYTHM ENCODING
// ============================================

/**
 * Encode text as circadian rhythm patterns
 * @param {string} text - The text to encode
 * @returns {string} - Circadian encoding
 */
export const encodeCircadianRhythm = (text) => {
  const phases = ['🌅', '☀️', '🌤️', '⛅', '🌥️', '🌙', '🌑', '💤'];
  const hormones = ['melatonin', 'cortisol', 'serotonin', 'dopamine'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const phase = phases[code % phases.length];
    const hormone = hormones[(code >> 4) % hormones.length];
    const hour = code % 24;
    const level = ((code % 100) + 1).toString().padStart(3, '0');
    return `CIRCA[${hex}]${phase}@${hour.toString().padStart(2, '0')}:00(${hormone}:${level}%)`;
  }).join('→');
};

export const decodeCircadianRhythm = (text) => {
  try {
    const matches = text.match(/CIRCA\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// HOLOGRAPHIC INTERFERENCE ENCODING
// ============================================

/**
 * Encode text as holographic interference patterns
 * @param {string} text - The text to encode
 * @returns {string} - Holographic encoding
 */
export const encodeHolographicInterference = (text) => {
  const patterns = ['▓▒░', '░▒▓', '▒▓░', '▓░▒', '░▓▒', '▒░▓', '█▓▒', '▒▓█'];
  const lasers = ['He-Ne', 'Ar', 'Kr', 'Nd:YAG', 'diode', 'ruby', 'CO2', 'excimer'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const pattern = patterns[code % patterns.length];
    const laser = lasers[(code >> 3) % lasers.length];
    const wavelength = 400 + (code % 300);
    const fringe = (code % 50) + 10;
    return `HOLO[${hex}]${pattern}{${laser}:λ${wavelength}nm:${fringe}fringes}`;
  }).join('⟡');
};

export const decodeHolographicInterference = (text) => {
  try {
    const matches = text.match(/HOLO\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// FERMENTATION ENCODING
// ============================================

/**
 * Encode text as fermentation process patterns
 * @param {string} text - The text to encode
 * @returns {string} - Fermentation encoding
 */
export const encodeFermentation = (text) => {
  const organisms = ['S.cerevisiae', 'L.bulgaricus', 'B.subtilis', 'A.niger', 'K.marxianus', 'L.plantarum', 'S.thermophilus', 'P.roqueforti'];
  const products = ['ethanol', 'lactate', 'acetate', 'CO2', 'citrate', 'butyrate', 'propionate', 'succinate'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const org = organisms[code % organisms.length];
    const prod = products[(code >> 3) % products.length];
    const ph = (3 + (code % 5)).toFixed(1);
    const temp = 20 + (code % 25);
    return `FERM[${hex}]🧫{${org}→${prod}@${temp}°C,pH${ph}}`;
  }).join('⇝');
};

export const decodeFermentation = (text) => {
  try {
    const matches = text.match(/FERM\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// NEUROTRANSMITTER ENCODING
// ============================================

/**
 * Encode text as neurotransmitter patterns
 * @param {string} text - The text to encode
 * @returns {string} - Neurotransmitter encoding
 */
export const encodeNeurotransmitter = (text) => {
  const transmitters = ['dopamine', 'serotonin', 'norepinephrine', 'GABA', 'glutamate', 'acetylcholine', 'endorphin', 'histamine'];
  const receptors = ['D1', 'D2', '5-HT', 'α', 'β', 'NMDA', 'AMPA', 'mAChR'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const nt = transmitters[code % transmitters.length];
    const rec = receptors[(code >> 3) % receptors.length];
    const conc = (code / 10).toFixed(1);
    const action = ['excitatory', 'inhibitory'][(code >> 7) % 2];
    return `NEURO[${hex}]🧠{${nt}→${rec}:${conc}nM:${action}}`;
  }).join('⚡');
};

export const decodeNeurotransmitter = (text) => {
  try {
    const matches = text.match(/NEURO\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// MANTLE CONVECTION ENCODING
// ============================================

/**
 * Encode text as mantle convection patterns
 * @param {string} text - The text to encode
 * @returns {string} - Mantle convection encoding
 */
export const encodeMantleConvection = (text) => {
  const cells = ['whole-mantle', 'layered', 'plume', 'slab-driven', 'thermal', 'compositional', 'thermo-chemical', 'stagnant-lid'];
  const viscosities = ['1e18', '1e19', '1e20', '1e21', '1e22', '1e23', '1e24', '1e25'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const cell = cells[code % cells.length];
    const visc = viscosities[(code >> 3) % viscosities.length];
    const depth = 100 + (code * 10);
    const temp = 1000 + (code * 10);
    return `MANTLE[${hex}]🌋{${cell}:η${visc}Pa·s@${depth}km:${temp}K}`;
  }).join('↻');
};

export const decodeMantleConvection = (text) => {
  try {
    const matches = text.match(/MANTLE\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};
