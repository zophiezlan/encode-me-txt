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
