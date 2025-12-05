/**
 * Nature & Biology Encoders
 * Natural patterns, biological sequences, and ecological encodings
 */

/**
 * RNA sequence encoding
 * @param {string} text - The text to encode
 * @returns {string} - RNA sequence (AUGC)
 */
export const encodeRNA = (text) => {
  const bases = ['A', 'U', 'G', 'C'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    let sequence = '';
    let n = code;
    for (let i = 0; i < 4; i++) {
      sequence = bases[n % 4] + sequence;
      n = Math.floor(n / 4);
    }
    return sequence;
  }).join('-');
};

/**
 * Decode RNA sequence
 */
export const decodeRNA = (text) => {
  try {
    const baseMap = { 'A': 0, 'U': 1, 'G': 2, 'C': 3 };
    return text.split('-').map(seq => {
      let code = 0;
      for (const base of seq) {
        code = code * 4 + baseMap[base];
      }
      return String.fromCharCode(code);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Protein amino acid encoding
 * @param {string} text - The text to encode
 * @returns {string} - Amino acid sequence
 */
export const encodeAminoAcid = (text) => {
  const aminoAcids = ['Ala', 'Arg', 'Asn', 'Asp', 'Cys', 'Gln', 'Glu', 'Gly', 
                      'His', 'Ile', 'Leu', 'Lys', 'Met', 'Phe', 'Pro', 'Ser',
                      'Thr', 'Trp', 'Tyr', 'Val'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const aa1 = aminoAcids[code % aminoAcids.length];
    const aa2 = aminoAcids[Math.floor(code / aminoAcids.length) % aminoAcids.length];
    return `${aa1}-${aa2}`;
  }).join(' ');
};

/**
 * Codon encoding (triplet genetic code)
 * @param {string} text - The text to encode
 * @returns {string} - Codon sequence
 */
export const encodeCodon = (text) => {
  const bases = ['A', 'U', 'G', 'C'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const b1 = bases[code % 4];
    const b2 = bases[Math.floor(code / 4) % 4];
    const b3 = bases[Math.floor(code / 16) % 4];
    const b4 = bases[Math.floor(code / 64) % 4];
    return `${b1}${b2}${b3}-${b4}${bases[(code + 1) % 4]}${bases[(code + 2) % 4]}`;
  }).join(' ');
};

/**
 * Plant taxonomy encoding
 * @param {string} text - The text to encode
 * @returns {string} - Plant species names
 */
export const encodePlantTaxonomy = (text) => {
  const genera = ['Rosa', 'Quercus', 'Acer', 'Pinus', 'Ficus', 'Bambusa', 'Orchis', 'Lilium'];
  const species = ['alba', 'rubra', 'viridis', 'major', 'minor', 'elegans', 'grandiflora', 'sylvestris'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const genus = genera[code % genera.length];
    const sp = species[Math.floor(code / genera.length) % species.length];
    return `${genus} ${sp}`;
  }).join(', ');
};

/**
 * Animal taxonomy encoding
 * @param {string} text - The text to encode
 * @returns {string} - Animal species names
 */
export const encodeAnimalTaxonomy = (text) => {
  const genera = ['Canis', 'Felis', 'Ursus', 'Panthera', 'Aquila', 'Corvus', 'Delphinus', 'Equus'];
  const species = ['familiaris', 'catus', 'arctos', 'leo', 'chrysaetos', 'corax', 'delphis', 'caballus'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const genus = genera[code % genera.length];
    const sp = species[Math.floor(code / genera.length) % species.length];
    return `${genus} ${sp}`;
  }).join(', ');
};

/**
 * Constellation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Constellation patterns
 */
export const encodeConstellation = (text) => {
  const constellations = ['⭐Orion', '⭐Ursa Major', '⭐Cassiopeia', '⭐Scorpius', 
                          '⭐Cygnus', '⭐Leo', '⭐Virgo', '⭐Aquarius'];
  const stars = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const constellation = constellations[code % constellations.length];
    const star = stars[Math.floor(code / constellations.length) % stars.length];
    return `${star} ${constellation}`;
  }).join(' | ');
};

/**
 * Mineral encoding
 * @param {string} text - The text to encode
 * @returns {string} - Mineral names
 */
export const encodeMineral = (text) => {
  const minerals = ['Quartz', 'Feldspar', 'Mica', 'Olivine', 'Pyroxene', 'Amphibole', 
                    'Calcite', 'Dolomite', 'Gypsum', 'Halite', 'Magnetite', 'Hematite'];
  const forms = ['Crystal', 'Aggregate', 'Massive', 'Fibrous', 'Prismatic', 'Tabular'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const mineral = minerals[code % minerals.length];
    const form = forms[Math.floor(code / minerals.length) % forms.length];
    return `${mineral}(${form})`;
  }).join(' + ');
};

/**
 * Geological era encoding
 * @param {string} text - The text to encode
 * @returns {string} - Geological time periods
 */
export const encodeGeologicalEra = (text) => {
  const eras = ['Cenozoic', 'Mesozoic', 'Paleozoic', 'Proterozoic', 'Archean', 'Hadean'];
  const periods = ['Quaternary', 'Neogene', 'Paleogene', 'Cretaceous', 'Jurassic', 
                   'Triassic', 'Permian', 'Carboniferous'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const era = eras[code % eras.length];
    const period = periods[code % periods.length];
    const mya = code + 10;
    return `${era}:${period}(${mya}Ma)`;
  }).join(' → ');
};

/**
 * Flower encoding
 * @param {string} text - The text to encode
 * @returns {string} - Flower emojis and names
 */
export const encodeFlower = (text) => {
  const flowers = [
    '🌸 Cherry', '🌹 Rose', '🌷 Tulip', '🌻 Sunflower', '🌺 Hibiscus',
    '💐 Bouquet', '🏵️ Rosette', '💮 White Flower', '🌼 Daisy', '🥀 Wilted'
  ];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return flowers[code % flowers.length];
  }).join(' ');
};

/**
 * Butterfly wing pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - Butterfly pattern
 */
export const encodeButterflyWing = (text) => {
  const patterns = ['◐◑', '◓◒', '◔◕', '◖◗', '●○', '◍◎', '◉◌'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const pattern = patterns[code % patterns.length];
    return `🦋[${pattern.repeat(2)}]`;
  }).join(' ');
};

/**
 * Seashell encoding
 * @param {string} text - The text to encode
 * @returns {string} - Seashell patterns
 */
export const encodeSeashell = (text) => {
  const shells = ['🐚', '🦪', '🐌'];
  const patterns = ['spiral', 'conical', 'bivalve', 'chambered', 'ridged'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const shell = shells[code % shells.length];
    const pattern = patterns[Math.floor(code / shells.length) % patterns.length];
    return `${shell}(${pattern}:${code})`;
  }).join(' ');
};

/**
 * Cloud type encoding
 * @param {string} text - The text to encode
 * @returns {string} - Cloud type names
 */
export const encodeCloudType = (text) => {
  const clouds = ['☁️Cirrus', '⛅Cumulus', '🌥️Stratus', '🌦️Nimbus', 
                  '☁️Cumulonimbus', '⛈️Stratocumulus', '🌫️Altocumulus', '☁️Cirrostratus'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const cloud = clouds[code % clouds.length];
    const altitude = (code * 100) % 10000;
    return `${cloud}@${altitude}m`;
  }).join(' | ');
};

/**
 * Terrain encoding
 * @param {string} text - The text to encode
 * @returns {string} - Terrain features
 */
export const encodeTerrain = (text) => {
  const terrains = ['🏔️ Mountain', '🌋 Volcano', '🏝️ Island', '🏜️ Desert', 
                    '🌲 Forest', '🌊 Ocean', '❄️ Glacier', '🌾 Prairie'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const terrain = terrains[code % terrains.length];
    const elevation = (code * 10) - 500;
    return `${terrain}(${elevation >= 0 ? '+' : ''}${elevation}m)`;
  }).join(' ');
};

/**
 * Ecosystem encoding
 * @param {string} text - The text to encode
 * @returns {string} - Ecosystem description
 */
export const encodeEcosystem = (text) => {
  const ecosystems = ['🌲Taiga', '🌴Tropical', '🏜️Arid', '🌊Marine', 
                      '🌿Grassland', '🌳Deciduous', '❄️Tundra', '🌾Savanna'];
  const biomes = ['forest', 'reef', 'desert', 'wetland', 'prairie', 'alpine'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const eco = ecosystems[code % ecosystems.length];
    const biome = biomes[Math.floor(code / ecosystems.length) % biomes.length];
    return `${eco}/${biome}`;
  }).join(' → ');
};

/**
 * Bird call encoding
 * @param {string} text - The text to encode
 * @returns {string} - Bird call representations
 */
export const encodeBirdCall = (text) => {
  const calls = ['🐦♪tweet', '🦜♫squawk', '🦉♬hoot', '🦅♪screech', 
                 '🐧♫honk', '🦆♬quack', '🦚♪call', '🦢♫trumpet'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const call = calls[code % calls.length];
    const count = (code % 3) + 1;
    return `${call}`.repeat(count);
  }).join(' ');
};

/**
 * Paw print pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - Paw print pattern
 */
export const encodePawPrint = (text) => {
  const paws = ['🐾', '🦶', '👣', '🐿️'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const paw = paws[code % paws.length];
    const steps = (code % 4) + 2;
    return paw.repeat(steps);
  }).join(' ');
};

/**
 * Leaf pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - Leaf patterns
 */
export const encodeLeafPattern = (text) => {
  const leaves = ['🍃', '🍂', '🍁', '🌿', '☘️', '🌱', '🪴', '🌴'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const leaf = leaves[code % leaves.length];
    return `${leaf}${code.toString(16)}`;
  }).join(' ');
};

/**
 * Crystal structure encoding
 * @param {string} text - The text to encode
 * @returns {string} - Crystal structure notation
 */
export const encodeCrystalStructure = (text) => {
  const systems = ['Cubic', 'Tetragonal', 'Orthorhombic', 'Hexagonal', 
                   'Trigonal', 'Monoclinic', 'Triclinic'];
  const shapes = ['💎', '🔷', '🔶', '📐', '⬡', '⬢'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const system = systems[code % systems.length];
    const shape = shapes[code % shapes.length];
    return `${shape}${system}[${code}]`;
  }).join(' ');
};

/**
 * Ocean depth encoding
 * @param {string} text - The text to encode
 * @returns {string} - Ocean depth zones
 */
export const encodeOceanDepth = (text) => {
  const zones = ['🌊Epipelagic', '🌑Mesopelagic', '🦑Bathypelagic', 
                 '🐙Abyssopelagic', '⬛Hadopelagic'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const zone = zones[code % zones.length];
    const depth = code * 50;
    return `${zone}(-${depth}m)`;
  }).join(' ');
};

/**
 * Insect encoding
 * @param {string} text - The text to encode
 * @returns {string} - Insect patterns
 */
export const encodeInsect = (text) => {
  const insects = ['🐜', '🐝', '🦋', '🐛', '🦗', '🦟', '🐞', '🦠'];
  const behaviors = ['crawl', 'fly', 'hop', 'buzz', 'flutter'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const insect = insects[code % insects.length];
    const behavior = behaviors[Math.floor(code / insects.length) % behaviors.length];
    return `${insect}${behavior}`;
  }).join(' ');
};

/**
 * Volcano encoding
 * @param {string} text - The text to encode
 * @returns {string} - Volcano activity patterns
 */
export const encodeVolcano = (text) => {
  const types = ['🌋Active', '🗻Dormant', '⛰️Extinct', '💨Fumarole'];
  const activities = ['erupting', 'smoking', 'quiet', 'bubbling', 'rumbling'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const type = types[code % types.length];
    const activity = activities[Math.floor(code / types.length) % activities.length];
    return `${type}(${activity}:${code}VEI)`;
  }).join(' ');
};

/**
 * Cell organelle encoding
 * @param {string} text - The text to encode
 * @returns {string} - Cell structure
 */
export const encodeCellOrganelle = (text) => {
  const organelles = ['🔴Nucleus', '🟢Mitochondria', '🟡Ribosome', '🔵ER', 
                      '🟣Golgi', '⚪Vacuole', '🟤Lysosome', '⚫Chloroplast'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const organelle = organelles[code % organelles.length];
    const count = (code % 10) + 1;
    return `${organelle}×${count}`;
  }).join(' ');
};

// ============================================
// ORIGAMI CREASE PATTERN ENCODING
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
      .map(b => folds[(parseInt(b) * 4 + (code % 4)) % folds.length]).join('');
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
// CONSTELLATION MAP ENCODING
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
// TECTONIC PLATE ENCODING
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
// FUNGAL MYCELIUM NETWORK ENCODING
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
// BIOLUMINESCENCE ENCODING
// ============================================

/**
 * Encode text as bioluminescent patterns
 * @param {string} text - The text to encode
 * @returns {string} - Bioluminescence encoding
 */
export const encodeBioluminescence = (text) => {
  const glows = ['💫', '✨', '🌟', '⭐', '🔆', '💡', '🌠', '☀️'];
  const wavelengths = [460, 480, 500, 520, 540, 560, 580, 600];
  
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
// AURORA BOREALIS ENCODING
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
// BEEHIVE WAGGLE DANCE ENCODING
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
// GLACIER STRATIGRAPHY ENCODING
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
// WIND ROSE ENCODING
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
// DENDROCHRONOLOGY ENCODING
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
// CORAL REEF ENCODING
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
// BIRD MIGRATION ENCODING
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
// EROSION PATTERN ENCODING
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
// AURORA AUSTRALIS ENCODING
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
// SNOWFLAKE CRYSTAL ENCODING
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
// BONSAI GROWTH ENCODING
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
    const branchCount = (code % 12) + 3;
    return `BONSAI[${hex}]${tree}{${style}:${age}yr:${height}cm:${branchCount}branches}`;
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
