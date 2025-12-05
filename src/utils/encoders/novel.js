/**
 * Novel and Original Encoders
 * 30 completely unique encoding methods inspired by diverse fields
 */

// ============================================
// 1. ORIGAMI CREASE PATTERN ENCODING
// ============================================

/**
 * Encode text as origami crease patterns (mountain/valley folds)
 * @param {string} text - The text to encode
 * @returns {string} - Crease pattern encoding
 */
export const encodeOrigamiCrease = (text) => {
  const folds = ['╱', '╲', '─', '│', '┼', '╳', '◢', '◣'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const pattern = code.toString(2).padStart(8, '0').split('')
      .map(b => folds[parseInt(b) * 4 + (code % 4)]).join('');
    return `[${hex}]${pattern}`;
  }).join('');
};

export const decodeOrigamiCrease = (text) => {
  try {
    const matches = text.match(/\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => String.fromCharCode(parseInt(m.slice(1, 3), 16))).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 2. CONSTELLATION MAP ENCODING
// ============================================

/**
 * Encode text as star positions in constellations
 * @param {string} text - The text to encode
 * @returns {string} - Constellation encoding
 */
export const encodeConstellationMap = (text) => {
  const stars = ['✦', '✧', '★', '☆', '✯', '✰', '⋆', '✵'];
  const magnitudes = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const star = stars[code % stars.length];
    const mag = magnitudes[(code >> 3) % magnitudes.length];
    const ra = ((code * 15) % 360).toString().padStart(3, '0');
    const dec = ((code % 180) - 90).toString();
    return `${mag}${star}(${ra}°,${dec}°)[${hex}]`;
  }).join(' ');
};

export const decodeConstellationMap = (text) => {
  try {
    const matches = text.match(/\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => String.fromCharCode(parseInt(m.slice(1, 3), 16))).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 3. TECTONIC PLATE ENCODING
// ============================================

/**
 * Encode text as tectonic plate movements
 * @param {string} text - The text to encode
 * @returns {string} - Tectonic encoding
 */
export const encodeTectonicPlate = (text) => {
  const movements = ['↗↙', '↘↖', '→←', '↑↓', '⤢⤡', '⇄⇅', '↻↺', '⟳⟲'];
  const boundaries = ['convergent', 'divergent', 'transform', 'subduction'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const move = movements[code % movements.length];
    const boundary = boundaries[(code >> 4) % boundaries.length];
    const rate = ((code % 15) + 1).toFixed(1);
    return `PLATE[${hex}]{${boundary}:${move}@${rate}cm/yr}`;
  }).join('⚏');
};

export const decodeTectonicPlate = (text) => {
  try {
    const matches = text.match(/PLATE\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 4. FUNGAL MYCELIUM NETWORK ENCODING
// ============================================

/**
 * Encode text as mycelium network connections
 * @param {string} text - The text to encode
 * @returns {string} - Mycelium encoding
 */
export const encodeMyceliumNetwork = (text) => {
  const nodes = ['◉', '◎', '●', '○', '◐', '◑', '◒', '◓'];
  const connections = ['╌', '┄', '┈', '╎', '┆', '┊', '╏', '║'];
  
  return text.split('').map((char) => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const node = nodes[code % nodes.length];
    const conn = connections[(code >> 3) % connections.length];
    const nutrients = ['N', 'P', 'K', 'C'][(code >> 5) % 4];
    return `${node}${conn}[${hex}:${nutrients}]${conn}`;
  }).join('⌇');
};

export const decodeMyceliumNetwork = (text) => {
  try {
    const matches = text.match(/\[([0-9a-f]{2}):[NPKC]\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 5. BIOLUMINESCENCE ENCODING
// ============================================

/**
 * Encode text as bioluminescent patterns
 * @param {string} text - The text to encode
 * @returns {string} - Bioluminescence encoding
 */
export const encodeBioluminescence = (text) => {
  const glows = ['💫', '✨', '🌟', '⭐', '🔆', '💡', '🌠', '☀️'];
  const wavelengths = [460, 480, 500, 520, 540, 560, 580, 600]; // nm
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const glow = glows[code % glows.length];
    const wl = wavelengths[(code >> 3) % wavelengths.length];
    const intensity = ((code % 100) + 1).toString().padStart(3, '0');
    return `${glow}λ${wl}nm:I${intensity}[${hex}]`;
  }).join('~');
};

export const decodeBioluminescence = (text) => {
  try {
    const matches = text.match(/\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => String.fromCharCode(parseInt(m.slice(1, 3), 16))).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 6. FLUID DYNAMICS ENCODING
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
// 7. CRYSTALLOGRAPHY ENCODING
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
// 8. AURORA BOREALIS ENCODING
// ============================================

/**
 * Encode text as aurora patterns
 * @param {string} text - The text to encode
 * @returns {string} - Aurora encoding
 */
export const encodeAuroraBorealis = (text) => {
  const colors = ['🟢', '🟣', '🔵', '🟡', '🟠', '🔴', '⚪', '🟤'];
  const forms = ['arc', 'band', 'ray', 'corona', 'veil', 'patch', 'glow', 'flaming'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const color = colors[code % colors.length];
    const form = forms[(code >> 3) % forms.length];
    const altitude = 100 + (code % 200);
    const kp = (code % 9) + 1;
    return `AURORA[${hex}]${color}{${form}:${altitude}km,Kp${kp}}`;
  }).join('🌌');
};

export const decodeAuroraBorealis = (text) => {
  try {
    const matches = text.match(/AURORA\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 9. BEEHIVE WAGGLE DANCE ENCODING
// ============================================

/**
 * Encode text as bee waggle dance patterns
 * @param {string} text - The text to encode
 * @returns {string} - Waggle dance encoding
 */
export const encodeWaggleDance = (text) => {
  const waggles = ['∿', '≋', '⌇', '〰', '⏦', '∾', '≀', '⁓'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const waggle = waggles[code % waggles.length];
    const angle = (code * 1.4) % 360;
    const duration = (code % 5) + 1;
    const distance = code * 10;
    return `🐝[${hex}]${waggle.repeat(duration)}∠${angle.toFixed(0)}°→${distance}m`;
  }).join(' ');
};

export const decodeWaggleDance = (text) => {
  try {
    const matches = text.match(/🐝\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 10. SONAR PING ENCODING
// ============================================

/**
 * Encode text as sonar ping patterns
 * @param {string} text - The text to encode
 * @returns {string} - Sonar encoding
 */
export const encodeSonarPing = (text) => {
  const pings = ['◌', '◍', '◎', '●', '◉', '⦿', '⊙', '⊚'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const ping = pings[code % pings.length];
    const depth = code * 10;
    const bearing = (code * 1.4) % 360;
    const range = (code % 1000) + 100;
    return `PING[${hex}]${ping}@${depth}m∠${bearing.toFixed(0)}°R${range}`;
  }).join('〉〈');
};

export const decodeSonarPing = (text) => {
  try {
    const matches = text.match(/PING\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 11. POTTERY KILN FIRING ENCODING
// ============================================

/**
 * Encode text as kiln firing schedules
 * @param {string} text - The text to encode
 * @returns {string} - Kiln encoding
 */
export const encodeKilnFiring = (text) => {
  const cones = ['06', '05', '04', '03', '02', '01', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const atmospheres = ['oxidation', 'reduction', 'neutral', 'heavy-reduction'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const cone = cones[code % cones.length];
    const atm = atmospheres[(code >> 4) % atmospheres.length];
    const temp = 600 + (code * 5);
    return `KILN[${hex}]🔥Cone${cone}@${temp}°C(${atm})`;
  }).join('⟹');
};

export const decodeKilnFiring = (text) => {
  try {
    const matches = text.match(/KILN\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 12. SEISMOGRAPH WAVE ENCODING
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
// 13. GLACIER STRATIGRAPHY ENCODING
// ============================================

/**
 * Encode text as ice core layers
 * @param {string} text - The text to encode
 * @returns {string} - Glacier encoding
 */
export const encodeGlacierStratigraphy = (text) => {
  const layers = ['❄', '🧊', '⛄', '❆', '❅', '✻', '✼', '❉'];
  const epochs = ['Holocene', 'Pleistocene', 'Pliocene', 'Miocene'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const layer = layers[code % layers.length];
    const epoch = epochs[(code >> 4) % epochs.length];
    const depth = code * 10;
    const age = code * 1000;
    return `ICE[${hex}]${layer}@${depth}m(${epoch}:${age}BP)`;
  }).join('═');
};

export const decodeGlacierStratigraphy = (text) => {
  try {
    const matches = text.match(/ICE\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 14. WIND ROSE ENCODING
// ============================================

/**
 * Encode text as wind rose patterns
 * @param {string} text - The text to encode
 * @returns {string} - Wind rose encoding
 */
export const encodeWindRose = (text) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const beaufort = ['calm', 'light-air', 'light-breeze', 'gentle-breeze', 'moderate', 'fresh', 'strong', 'near-gale', 'gale', 'strong-gale', 'storm', 'violent-storm', 'hurricane'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const dir = directions[code % directions.length];
    const bft = beaufort[code % beaufort.length];
    const speed = code % 100;
    return `🌬️[${hex}]${dir}@${speed}kts(${bft})`;
  }).join('↺');
};

export const decodeWindRose = (text) => {
  try {
    const matches = text.match(/🌬️\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 15. DENDROCHRONOLOGY ENCODING
// ============================================

/**
 * Encode text as tree ring patterns
 * @param {string} text - The text to encode
 * @returns {string} - Tree ring encoding
 */
export const encodeDendrochronology = (text) => {
  const rings = ['◯', '◎', '⊚', '⊛', '⦾', '⦿', '⊙', '⊕'];
  const conditions = ['wet', 'dry', 'normal', 'fire', 'frost', 'optimal', 'stress', 'recovery'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const ring = rings[code % rings.length];
    const condition = conditions[(code >> 3) % conditions.length];
    const width = ((code % 10) / 10 + 0.1).toFixed(2);
    const year = 2024 - (code % 200);
    return `🌳[${hex}]${ring}(${year}:${width}mm:${condition})`;
  }).join('≡');
};

export const decodeDendrochronology = (text) => {
  try {
    const matches = text.match(/🌳\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 16. MAGNETIC FIELD ENCODING
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
// 17. CORAL REEF ENCODING
// ============================================

/**
 * Encode text as coral polyp patterns
 * @param {string} text - The text to encode
 * @returns {string} - Coral encoding
 */
export const encodeCoralReef = (text) => {
  const corals = ['🪸', '🐚', '🦪', '🐙', '🦑', '🦐', '🦞', '🦀'];
  const species = ['staghorn', 'brain', 'elkhorn', 'pillar', 'star', 'mushroom', 'finger', 'table'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const coral = corals[code % corals.length];
    const sp = species[(code >> 3) % species.length];
    const depth = (code % 50) + 5;
    const bleaching = (code % 100);
    return `CORAL[${hex}]${coral}{${sp}@${depth}m:${bleaching}%health}`;
  }).join('🌊');
};

export const decodeCoralReef = (text) => {
  try {
    const matches = text.match(/CORAL\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 18. SUPERNOVA REMNANT ENCODING
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
// 19. CIRCADIAN RHYTHM ENCODING
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
// 20. HOLOGRAPHIC INTERFERENCE ENCODING
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
// 21. BIRD MIGRATION ENCODING
// ============================================

/**
 * Encode text as bird migration patterns
 * @param {string} text - The text to encode
 * @returns {string} - Migration encoding
 */
export const encodeBirdMigration = (text) => {
  const formations = ['V', 'J', 'line', 'cluster', 'echelon', 'column', 'extended', 'compressed'];
  const birds = ['🦅', '🦆', '🦢', '🦩', '🕊️', '🦜', '🐦', '🦉'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const bird = birds[code % birds.length];
    const formation = formations[(code >> 3) % formations.length];
    const altitude = (code * 50) + 500;
    const heading = (code * 1.4) % 360;
    return `MIGRATE[${hex}]${bird}{${formation}@${altitude}ft→${heading.toFixed(0)}°}`;
  }).join('➤');
};

export const decodeBirdMigration = (text) => {
  try {
    const matches = text.match(/MIGRATE\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 22. TESSELLATION ENCODING
// ============================================

/**
 * Encode text as tessellation patterns
 * @param {string} text - The text to encode
 * @returns {string} - Tessellation encoding
 */
export const encodeTessellation = (text) => {
  const tiles = ['⬡', '⬢', '◇', '◆', '△', '▽', '▷', '◁'];
  const patterns = ['regular', 'semi-regular', 'demi-regular', 'monohedral', 'isohedral', 'anisohedral', 'penrose', 'aperiodic'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const tile = tiles[code % tiles.length];
    const pattern = patterns[(code >> 3) % patterns.length];
    const symmetry = ['p1', 'p2', 'pm', 'pg', 'cm', 'p2mm', 'p2mg', 'p2gg'][(code >> 4) % 8];
    return `TESS[${hex}]${tile.repeat(3)}{${pattern}:${symmetry}}`;
  }).join('⟠');
};

export const decodeTessellation = (text) => {
  try {
    const matches = text.match(/TESS\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 23. EROSION PATTERN ENCODING
// ============================================

/**
 * Encode text as geological erosion patterns
 * @param {string} text - The text to encode
 * @returns {string} - Erosion encoding
 */
export const encodeErosionPattern = (text) => {
  const types = ['fluvial', 'aeolian', 'glacial', 'coastal', 'karst', 'mass-wasting', 'biological', 'chemical'];
  const features = ['canyon', 'arch', 'hoodoo', 'mesa', 'butte', 'pillar', 'cave', 'sinkhole'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const type = types[code % types.length];
    const feature = features[(code >> 3) % features.length];
    const rate = ((code % 100) / 10).toFixed(1);
    return `ERODE[${hex}]🏜️{${type}:${feature}@${rate}mm/yr}`;
  }).join('≈');
};

export const decodeErosionPattern = (text) => {
  try {
    const matches = text.match(/ERODE\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 24. FERMENTATION ENCODING
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
// 25. AURORA AUSTRALIS ENCODING
// ============================================

/**
 * Encode text as southern aurora patterns (distinct from borealis)
 * @param {string} text - The text to encode
 * @returns {string} - Aurora Australis encoding
 */
export const encodeAuroraAustralis = (text) => {
  const zones = ['auroral-oval', 'polar-cap', 'sub-auroral', 'diffuse'];
  const emissions = ['557.7nm-green', '630.0nm-red', '427.8nm-blue', '391.4nm-violet'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const zone = zones[code % zones.length];
    const emission = emissions[(code >> 4) % emissions.length];
    const lat = -90 + (code % 30);
    const intensity = code % 100;
    return `SOUTH[${hex}]🌌{${zone}:${emission}@${lat}°S:I${intensity}}`;
  }).join('✧');
};

export const decodeAuroraAustralis = (text) => {
  try {
    const matches = text.match(/SOUTH\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 26. STAINED GLASS ENCODING
// ============================================

/**
 * Encode text as stained glass patterns
 * @param {string} text - The text to encode
 * @returns {string} - Stained glass encoding
 */
export const encodeStainedGlass = (text) => {
  const glasses = ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬜', '⬛'];
  const leads = ['H', 'U', 'C', 'F', 'rounded', 'colonial', 'brass', 'zinc'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const glass = glasses[code % glasses.length];
    const lead = leads[(code >> 3) % leads.length];
    const opacity = (code % 100);
    const texture = ['smooth', 'rippled', 'hammered', 'seedy'][(code >> 5) % 4];
    return `GLASS[${hex}]${glass}{${lead}-lead:${texture}:${opacity}%}`;
  }).join('◈');
};

export const decodeStainedGlass = (text) => {
  try {
    const matches = text.match(/GLASS\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 27. SNOWFLAKE CRYSTAL ENCODING
// ============================================

/**
 * Encode text as snowflake crystal structures
 * @param {string} text - The text to encode
 * @returns {string} - Snowflake encoding
 */
export const encodeSnowflakeCrystal = (text) => {
  const types = ['stellar-dendrite', 'plate', 'column', 'needle', 'capped-column', 'spatial-dendrite', 'irregular', 'rime'];
  const branches = ['✻', '❅', '❆', '❄', '✼', '✽', '✾', '✿'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const type = types[code % types.length];
    const branch = branches[(code >> 3) % branches.length];
    const temp = -40 + (code % 35);
    const size = ((code % 50) / 10).toFixed(1);
    return `SNOW[${hex}]${branch}{${type}:${temp}°C:${size}mm}`;
  }).join('·');
};

export const decodeSnowflakeCrystal = (text) => {
  try {
    const matches = text.match(/SNOW\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};

// ============================================
// 28. NEUROTRANSMITTER ENCODING
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
// 29. MANTLE CONVECTION ENCODING
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

// ============================================
// 30. BONSAI GROWTH ENCODING
// ============================================

/**
 * Encode text as bonsai growth patterns
 * @param {string} text - The text to encode
 * @returns {string} - Bonsai encoding
 */
export const encodeBonsaiGrowth = (text) => {
  const styles = ['formal-upright', 'informal-upright', 'slanting', 'cascade', 'semi-cascade', 'literati', 'windswept', 'forest'];
  const trees = ['🌳', '🌲', '🌴', '🎋', '🎍', '🌿', '🍃', '🌱'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    const style = styles[code % styles.length];
    const tree = trees[(code >> 3) % trees.length];
    const age = code + 5;
    const height = (code % 80) + 10;
    const branches = (code % 12) + 3;
    return `BONSAI[${hex}]${tree}{${style}:${age}yr:${height}cm:${branches}branches}`;
  }).join('✿');
};

export const decodeBonsaiGrowth = (text) => {
  try {
    const matches = text.match(/BONSAI\[([0-9a-f]{2})\]/gi) || [];
    return matches.map(m => {
      const hex = m.match(/\[([0-9a-f]{2})\]/i)[1];
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch { return '[Decode failed]'; }
};
