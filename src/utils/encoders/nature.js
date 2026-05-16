/**
 * Nature & Biology Encoders
 * Natural patterns, biological sequences, and ecological encodings
 */

import { createCharEncoder } from "./shared.js";

const AMINO_ACIDS = [
  "Ala",
  "Arg",
  "Asn",
  "Asp",
  "Cys",
  "Gln",
  "Glu",
  "Gly",
  "His",
  "Ile",
  "Leu",
  "Lys",
  "Met",
  "Phe",
  "Pro",
  "Ser",
  "Thr",
  "Trp",
  "Tyr",
  "Val",
];

const CODON_BASES = ["A", "U", "G", "C"];

const PLANT_GENERA = [
  "Rosa",
  "Quercus",
  "Acer",
  "Pinus",
  "Ficus",
  "Bambusa",
  "Orchis",
  "Lilium",
];
const PLANT_SPECIES = [
  "alba",
  "rubra",
  "viridis",
  "major",
  "minor",
  "elegans",
  "grandiflora",
  "sylvestris",
];

const ANIMAL_GENERA = [
  "Canis",
  "Felis",
  "Ursus",
  "Panthera",
  "Aquila",
  "Corvus",
  "Delphinus",
  "Equus",
];
const ANIMAL_SPECIES = [
  "familiaris",
  "catus",
  "arctos",
  "leo",
  "chrysaetos",
  "corax",
  "delphis",
  "caballus",
];

const CONSTELLATIONS = [
  "⭐Orion",
  "⭐Ursa Major",
  "⭐Cassiopeia",
  "⭐Scorpius",
  "⭐Cygnus",
  "⭐Leo",
  "⭐Virgo",
  "⭐Aquarius",
];
const CONSTELLATION_STARS = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ"];

const MINERALS = [
  "Quartz",
  "Feldspar",
  "Mica",
  "Olivine",
  "Pyroxene",
  "Amphibole",
  "Calcite",
  "Dolomite",
  "Gypsum",
  "Halite",
  "Magnetite",
  "Hematite",
];
const MINERAL_FORMS = [
  "Crystal",
  "Aggregate",
  "Massive",
  "Fibrous",
  "Prismatic",
  "Tabular",
];

const GEOLOGICAL_ERAS = [
  "Cenozoic",
  "Mesozoic",
  "Paleozoic",
  "Proterozoic",
  "Archean",
  "Hadean",
];
const GEOLOGICAL_PERIODS = [
  "Quaternary",
  "Neogene",
  "Paleogene",
  "Cretaceous",
  "Jurassic",
  "Triassic",
  "Permian",
  "Carboniferous",
];

const FLOWERS = [
  "🌸 Cherry",
  "🌹 Rose",
  "🌷 Tulip",
  "🌻 Sunflower",
  "🌺 Hibiscus",
  "💐 Bouquet",
  "🏵️ Rosette",
  "💮 White Flower",
  "🌼 Daisy",
  "🥀 Wilted",
];

const BUTTERFLY_PATTERNS = ["◐◑", "◓◒", "◔◕", "◖◗", "●○", "◍◎", "◉◌"];

const SEASHELLS = ["🐚", "🦪", "🐌"];
const SEASHELL_PATTERNS = ["spiral", "conical", "bivalve", "chambered", "ridged"];

const CLOUDS = [
  "☁️Cirrus",
  "⛅Cumulus",
  "🌥️Stratus",
  "🌦️Nimbus",
  "☁️Cumulonimbus",
  "⛈️Stratocumulus",
  "🌫️Altocumulus",
  "☁️Cirrostratus",
];

const TERRAINS = [
  "🏔️ Mountain",
  "🌋 Volcano",
  "🏝️ Island",
  "🏜️ Desert",
  "🌲 Forest",
  "🌊 Ocean",
  "❄️ Glacier",
  "🌾 Prairie",
];

const ECOSYSTEMS = [
  "🌲Taiga",
  "🌴Tropical",
  "🏜️Arid",
  "🌊Marine",
  "🌿Grassland",
  "🌳Deciduous",
  "❄️Tundra",
  "🌾Savanna",
];
const BIOMES = ["forest", "reef", "desert", "wetland", "prairie", "alpine"];

const BIRD_CALLS = [
  "🐦♪tweet",
  "🦜♫squawk",
  "🦉♬hoot",
  "🦅♪screech",
  "🐧♫honk",
  "🦆♬quack",
  "🦚♪call",
  "🦢♫trumpet",
];

const PAWS = ["🐾", "🦶", "👣", "🐿️"];

const LEAVES = ["🍃", "🍂", "🍁", "🌿", "☘️", "🌱", "🪴", "🌴"];

const CRYSTAL_SYSTEMS = [
  "Cubic",
  "Tetragonal",
  "Orthorhombic",
  "Hexagonal",
  "Trigonal",
  "Monoclinic",
  "Triclinic",
];
const CRYSTAL_SHAPES = ["💎", "🔷", "🔶", "📐", "⬡", "⬢"];

const OCEAN_ZONES = [
  "🌊Epipelagic",
  "🌑Mesopelagic",
  "🦑Bathypelagic",
  "🐙Abyssopelagic",
  "⬛Hadopelagic",
];

const INSECTS = ["🐜", "🐝", "🦋", "🐛", "🦗", "🦟", "🐞", "🦠"];
const INSECT_BEHAVIORS = ["crawl", "fly", "hop", "buzz", "flutter"];

const VOLCANO_TYPES = ["🌋Active", "🗻Dormant", "⛰️Extinct", "💨Fumarole"];
const VOLCANO_ACTIVITIES = [
  "erupting",
  "smoking",
  "quiet",
  "bubbling",
  "rumbling",
];

const ORGANELLES = [
  "🔴Nucleus",
  "🟢Mitochondria",
  "🟡Ribosome",
  "🔵ER",
  "🟣Golgi",
  "⚪Vacuole",
  "🟤Lysosome",
  "⚫Chloroplast",
];

const ORIGAMI_FOLDS = ["╱", "╲", "─", "│", "┼", "╳", "◢", "◣"];

const CONSTELLATION_MAP_STARS = ["✦", "✧", "★", "☆", "✯", "✰", "⋆", "✵"];
const CONSTELLATION_MAGNITUDES = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ"];

const TECTONIC_MOVEMENTS = [
  "↗↙",
  "↘↖",
  "→←",
  "↑↓",
  "⤢⤡",
  "⇄⇅",
  "↻↺",
  "⟳⟲",
];
const TECTONIC_BOUNDARIES = [
  "convergent",
  "divergent",
  "transform",
  "subduction",
];

const MYCELIUM_NODES = ["◉", "◎", "●", "○", "◐", "◑", "◒", "◓"];
const MYCELIUM_CONNECTIONS = ["╌", "┄", "┈", "╎", "┆", "┊", "╏", "║"];
const MYCELIUM_NUTRIENTS = ["N", "P", "K", "C"];

const BIOLUM_GLOWS = ["💫", "✨", "🌟", "⭐", "🔆", "💡", "🌠", "☀️"];
// Wavelengths in nanometers (nm) - typical bioluminescence range
const BIOLUM_WAVELENGTHS = [460, 480, 500, 520, 540, 560, 580, 600];

const AURORA_COLORS = ["🟢", "🟣", "🔵", "🟡", "🟠", "🔴", "⚪", "🟤"];
const AURORA_FORMS = [
  "arc",
  "band",
  "ray",
  "corona",
  "veil",
  "patch",
  "glow",
  "flaming",
];

const WAGGLE_PATTERNS = ["∿", "≋", "⌇", "〰", "⏦", "∾", "≀", "⁓"];

const GLACIER_LAYERS = ["❄", "🧊", "⛄", "❆", "❅", "✻", "✼", "❉"];
const GLACIER_EPOCHS = ["Holocene", "Pleistocene", "Pliocene", "Miocene"];

const WIND_DIRECTIONS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];
const WIND_BEAUFORT = [
  "calm",
  "light-air",
  "light-breeze",
  "gentle-breeze",
  "moderate",
  "fresh",
  "strong",
  "near-gale",
  "gale",
  "strong-gale",
  "storm",
  "violent-storm",
  "hurricane",
];

const TREE_RINGS = ["◯", "◎", "⊚", "⊛", "⦾", "⦿", "⊙", "⊕"];
const TREE_CONDITIONS = [
  "wet",
  "dry",
  "normal",
  "fire",
  "frost",
  "optimal",
  "stress",
  "recovery",
];

const CORALS = ["🪸", "🐚", "🦪", "🐙", "🦑", "🦐", "🦞", "🦀"];
const CORAL_SPECIES = [
  "staghorn",
  "brain",
  "elkhorn",
  "pillar",
  "star",
  "mushroom",
  "finger",
  "table",
];

const MIGRATION_FORMATIONS = [
  "V",
  "J",
  "line",
  "cluster",
  "echelon",
  "column",
  "extended",
  "compressed",
];
const MIGRATION_BIRDS = ["🦅", "🦆", "🦢", "🦩", "🕊️", "🦜", "🐦", "🦉"];

const EROSION_TYPES = [
  "fluvial",
  "aeolian",
  "glacial",
  "coastal",
  "karst",
  "mass-wasting",
  "biological",
  "chemical",
];
const EROSION_FEATURES = [
  "canyon",
  "arch",
  "hoodoo",
  "mesa",
  "butte",
  "pillar",
  "cave",
  "sinkhole",
];

const AUSTRALIS_ZONES = ["auroral-oval", "polar-cap", "sub-auroral", "diffuse"];
const AUSTRALIS_EMISSIONS = [
  "557.7nm-green",
  "630.0nm-red",
  "427.8nm-blue",
  "391.4nm-violet",
];

const SNOWFLAKE_TYPES = [
  "stellar-dendrite",
  "plate",
  "column",
  "needle",
  "capped-column",
  "spatial-dendrite",
  "irregular",
  "rime",
];
const SNOWFLAKE_BRANCHES = ["✻", "❅", "❆", "❄", "✼", "✽", "✾", "✿"];

const BONSAI_STYLES = [
  "formal-upright",
  "informal-upright",
  "slanting",
  "cascade",
  "semi-cascade",
  "literati",
  "windswept",
  "forest",
];
const BONSAI_TREES = ["🌳", "🌲", "🌴", "🎋", "🎍", "🌿", "🍃", "🌱"];

/**
 * RNA sequence encoding
 * @param {string} text - The text to encode
 * @returns {string} - RNA sequence (AUGC)
 */
export const encodeRNA = (text) => {
  const bases = ["A", "U", "G", "C"];
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      let sequence = "";
      let n = code;
      for (let i = 0; i < 4; i++) {
        sequence = bases[n % 4] + sequence;
        n = Math.floor(n / 4);
      }
      return sequence;
    })
    .join("-");
};

/**
 * Decode RNA sequence
 */
export const decodeRNA = (text) => {
  try {
    const baseMap = { A: 0, U: 1, G: 2, C: 3 };
    return text
      .split("-")
      .map((seq) => {
        let code = 0;
        for (const base of seq) {
          code = code * 4 + baseMap[base];
        }
        return String.fromCharCode(code);
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

/**
 * Protein amino acid encoding
 * @param {string} text - The text to encode
 * @returns {string} - Amino acid sequence
 */
export const encodeAminoAcid = createCharEncoder((code) => {
  const aa1 = AMINO_ACIDS[code % AMINO_ACIDS.length];
  const aa2 = AMINO_ACIDS[Math.floor(code / AMINO_ACIDS.length) % AMINO_ACIDS.length];
  return `${aa1}-${aa2}`;
}, " ");

/**
 * Codon encoding (triplet genetic code)
 * @param {string} text - The text to encode
 * @returns {string} - Codon sequence
 */
export const encodeCodon = createCharEncoder((code) => {
  const b1 = CODON_BASES[code % 4];
  const b2 = CODON_BASES[Math.floor(code / 4) % 4];
  const b3 = CODON_BASES[Math.floor(code / 16) % 4];
  const b4 = CODON_BASES[Math.floor(code / 64) % 4];
  return `${b1}${b2}${b3}-${b4}${CODON_BASES[(code + 1) % 4]}${CODON_BASES[(code + 2) % 4]}`;
}, " ");

/**
 * Plant taxonomy encoding
 * @param {string} text - The text to encode
 * @returns {string} - Plant species names
 */
export const encodePlantTaxonomy = createCharEncoder((code) => {
  const genus = PLANT_GENERA[code % PLANT_GENERA.length];
  const sp = PLANT_SPECIES[Math.floor(code / PLANT_GENERA.length) % PLANT_SPECIES.length];
  return `${genus} ${sp}`;
}, ", ");

/**
 * Animal taxonomy encoding
 * @param {string} text - The text to encode
 * @returns {string} - Animal species names
 */
export const encodeAnimalTaxonomy = createCharEncoder((code) => {
  const genus = ANIMAL_GENERA[code % ANIMAL_GENERA.length];
  const sp = ANIMAL_SPECIES[Math.floor(code / ANIMAL_GENERA.length) % ANIMAL_SPECIES.length];
  return `${genus} ${sp}`;
}, ", ");

/**
 * Constellation encoding
 * @param {string} text - The text to encode
 * @returns {string} - Constellation patterns
 */
export const encodeConstellation = createCharEncoder((code) => {
  const constellation = CONSTELLATIONS[code % CONSTELLATIONS.length];
  const star = CONSTELLATION_STARS[Math.floor(code / CONSTELLATIONS.length) % CONSTELLATION_STARS.length];
  return `${star} ${constellation}`;
}, " | ");

/**
 * Mineral encoding
 * @param {string} text - The text to encode
 * @returns {string} - Mineral names
 */
export const encodeMineral = createCharEncoder((code) => {
  const mineral = MINERALS[code % MINERALS.length];
  const form = MINERAL_FORMS[Math.floor(code / MINERALS.length) % MINERAL_FORMS.length];
  return `${mineral}(${form})`;
}, " + ");

/**
 * Geological era encoding
 * @param {string} text - The text to encode
 * @returns {string} - Geological time periods
 */
export const encodeGeologicalEra = createCharEncoder((code) => {
  const era = GEOLOGICAL_ERAS[code % GEOLOGICAL_ERAS.length];
  const period = GEOLOGICAL_PERIODS[code % GEOLOGICAL_PERIODS.length];
  const mya = code + 10;
  return `${era}:${period}(${mya}Ma)`;
}, " → ");

/**
 * Flower encoding
 * @param {string} text - The text to encode
 * @returns {string} - Flower emojis and names
 */
export const encodeFlower = createCharEncoder((code) => {
  return FLOWERS[code % FLOWERS.length];
}, " ");

/**
 * Butterfly wing pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - Butterfly pattern
 */
export const encodeButterflyWing = createCharEncoder((code) => {
  const pattern = BUTTERFLY_PATTERNS[code % BUTTERFLY_PATTERNS.length];
  return `🦋[${pattern.repeat(2)}]`;
}, " ");

/**
 * Seashell encoding
 * @param {string} text - The text to encode
 * @returns {string} - Seashell patterns
 */
export const encodeSeashell = createCharEncoder((code) => {
  const shell = SEASHELLS[code % SEASHELLS.length];
  const pattern = SEASHELL_PATTERNS[Math.floor(code / SEASHELLS.length) % SEASHELL_PATTERNS.length];
  return `${shell}(${pattern}:${code})`;
}, " ");

/**
 * Cloud type encoding
 * @param {string} text - The text to encode
 * @returns {string} - Cloud type names
 */
export const encodeCloudType = createCharEncoder((code) => {
  const cloud = CLOUDS[code % CLOUDS.length];
  const altitude = (code * 100) % 10000;
  return `${cloud}@${altitude}m`;
}, " | ");

/**
 * Terrain encoding
 * @param {string} text - The text to encode
 * @returns {string} - Terrain features
 */
export const encodeTerrain = createCharEncoder((code) => {
  const terrain = TERRAINS[code % TERRAINS.length];
  const elevation = code * 10 - 500;
  return `${terrain}(${elevation >= 0 ? "+" : ""}${elevation}m)`;
}, " ");

/**
 * Ecosystem encoding
 * @param {string} text - The text to encode
 * @returns {string} - Ecosystem description
 */
export const encodeEcosystem = createCharEncoder((code) => {
  const eco = ECOSYSTEMS[code % ECOSYSTEMS.length];
  const biome = BIOMES[Math.floor(code / ECOSYSTEMS.length) % BIOMES.length];
  return `${eco}/${biome}`;
}, " → ");

/**
 * Bird call encoding
 * @param {string} text - The text to encode
 * @returns {string} - Bird call representations
 */
export const encodeBirdCall = createCharEncoder((code) => {
  const call = BIRD_CALLS[code % BIRD_CALLS.length];
  const count = (code % 3) + 1;
  return `${call}`.repeat(count);
}, " ");

/**
 * Paw print pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - Paw print pattern
 */
export const encodePawPrint = createCharEncoder((code) => {
  const paw = PAWS[code % PAWS.length];
  const steps = (code % 4) + 2;
  return paw.repeat(steps);
}, " ");

/**
 * Leaf pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - Leaf patterns
 */
export const encodeLeafPattern = createCharEncoder((code) => {
  const leaf = LEAVES[code % LEAVES.length];
  return `${leaf}${code.toString(16)}`;
}, " ");

/**
 * Crystal structure encoding
 * @param {string} text - The text to encode
 * @returns {string} - Crystal structure notation
 */
export const encodeCrystalStructure = createCharEncoder((code) => {
  const system = CRYSTAL_SYSTEMS[code % CRYSTAL_SYSTEMS.length];
  const shape = CRYSTAL_SHAPES[code % CRYSTAL_SHAPES.length];
  return `${shape}${system}[${code}]`;
}, " ");

/**
 * Ocean depth encoding
 * @param {string} text - The text to encode
 * @returns {string} - Ocean depth zones
 */
export const encodeOceanDepth = createCharEncoder((code) => {
  const zone = OCEAN_ZONES[code % OCEAN_ZONES.length];
  const depth = code * 50;
  return `${zone}(-${depth}m)`;
}, " ");

/**
 * Insect encoding
 * @param {string} text - The text to encode
 * @returns {string} - Insect patterns
 */
export const encodeInsect = createCharEncoder((code) => {
  const insect = INSECTS[code % INSECTS.length];
  const behavior = INSECT_BEHAVIORS[Math.floor(code / INSECTS.length) % INSECT_BEHAVIORS.length];
  return `${insect}${behavior}`;
}, " ");

/**
 * Volcano encoding
 * @param {string} text - The text to encode
 * @returns {string} - Volcano activity patterns
 */
export const encodeVolcano = createCharEncoder((code) => {
  const type = VOLCANO_TYPES[code % VOLCANO_TYPES.length];
  const activity = VOLCANO_ACTIVITIES[Math.floor(code / VOLCANO_TYPES.length) % VOLCANO_ACTIVITIES.length];
  return `${type}(${activity}:${code}VEI)`;
}, " ");

/**
 * Cell organelle encoding
 * @param {string} text - The text to encode
 * @returns {string} - Cell structure
 */
export const encodeCellOrganelle = createCharEncoder((code) => {
  const organelle = ORGANELLES[code % ORGANELLES.length];
  const count = (code % 10) + 1;
  return `${organelle}×${count}`;
}, " ");

// ============================================
// ORIGAMI CREASE PATTERN ENCODING
// ============================================

/**
 * Encode text as origami crease patterns (mountain/valley folds)
 * @param {string} text - The text to encode
 * @returns {string} - Crease pattern encoding
 */
export const encodeOrigamiCrease = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const pattern = code
    .toString(2)
    .padStart(8, "0")
    .split("")
    .map((b) => ORIGAMI_FOLDS[(parseInt(b) * 4 + (code % 4)) % ORIGAMI_FOLDS.length])
    .join("");
  return `[${hex}]${pattern}`;
});

export const decodeOrigamiCrease = (text) => {
  try {
    const matches = text.match(/\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => String.fromCharCode(parseInt(m.slice(1, 3), 16)))
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// CONSTELLATION MAP ENCODING
// ============================================

/**
 * Encode text as star positions in constellations
 * @param {string} text - The text to encode
 * @returns {string} - Constellation encoding
 */
export const encodeConstellationMap = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const star = CONSTELLATION_MAP_STARS[code % CONSTELLATION_MAP_STARS.length];
  const mag = CONSTELLATION_MAGNITUDES[(code >> 3) % CONSTELLATION_MAGNITUDES.length];
  const ra = ((code * 15) % 360).toString().padStart(3, "0");
  const dec = ((code % 180) - 90).toString();
  return `${mag}${star}(${ra}°,${dec}°)[${hex}]`;
}, " ");

export const decodeConstellationMap = (text) => {
  try {
    const matches = text.match(/\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => String.fromCharCode(parseInt(m.slice(1, 3), 16)))
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// TECTONIC PLATE ENCODING
// ============================================

/**
 * Encode text as tectonic plate movements
 * @param {string} text - The text to encode
 * @returns {string} - Tectonic encoding
 */
export const encodeTectonicPlate = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const move = TECTONIC_MOVEMENTS[code % TECTONIC_MOVEMENTS.length];
  const boundary = TECTONIC_BOUNDARIES[(code >> 4) % TECTONIC_BOUNDARIES.length];
  const rate = ((code % 15) + 1).toFixed(1);
  return `PLATE[${hex}]{${boundary}:${move}@${rate}cm/yr}`;
}, "⚏");

export const decodeTectonicPlate = (text) => {
  try {
    const matches = text.match(/PLATE\[([0-9a-f]{2})\]/gi) || [];
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
// FUNGAL MYCELIUM NETWORK ENCODING
// ============================================

/**
 * Encode text as mycelium network connections
 * @param {string} text - The text to encode
 * @returns {string} - Mycelium encoding
 */
export const encodeMyceliumNetwork = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const node = MYCELIUM_NODES[code % MYCELIUM_NODES.length];
  const conn = MYCELIUM_CONNECTIONS[(code >> 3) % MYCELIUM_CONNECTIONS.length];
  const nutrients = MYCELIUM_NUTRIENTS[(code >> 5) % 4];
  return `${node}${conn}[${hex}:${nutrients}]${conn}`;
}, "⌇");

export const decodeMyceliumNetwork = (text) => {
  try {
    const matches = text.match(/\[([0-9a-f]{2}):[NPKC]\]/gi) || [];
    return matches
      .map((m) => {
        const hex = m.match(/\[([0-9a-f]{2})/i)[1];
        return String.fromCharCode(parseInt(hex, 16));
      })
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// BIOLUMINESCENCE ENCODING
// ============================================

/**
 * Encode text as bioluminescent patterns
 * @param {string} text - The text to encode
 * @returns {string} - Bioluminescence encoding
 */
export const encodeBioluminescence = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const glow = BIOLUM_GLOWS[code % BIOLUM_GLOWS.length];
  const wl = BIOLUM_WAVELENGTHS[(code >> 3) % BIOLUM_WAVELENGTHS.length];
  const intensity = ((code % 100) + 1).toString().padStart(3, "0");
  return `${glow}λ${wl}nm:I${intensity}[${hex}]`;
}, "~");

export const decodeBioluminescence = (text) => {
  try {
    const matches = text.match(/\[([0-9a-f]{2})\]/gi) || [];
    return matches
      .map((m) => String.fromCharCode(parseInt(m.slice(1, 3), 16)))
      .join("");
  } catch {
    return "[Decode failed]";
  }
};

// ============================================
// AURORA BOREALIS ENCODING
// ============================================

/**
 * Encode text as aurora patterns
 * @param {string} text - The text to encode
 * @returns {string} - Aurora encoding
 */
export const encodeAuroraBorealis = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const color = AURORA_COLORS[code % AURORA_COLORS.length];
  const form = AURORA_FORMS[(code >> 3) % AURORA_FORMS.length];
  const altitude = 100 + (code % 200);
  const kp = (code % 9) + 1;
  return `AURORA[${hex}]${color}{${form}:${altitude}km,Kp${kp}}`;
}, "🌌");

export const decodeAuroraBorealis = (text) => {
  try {
    const matches = text.match(/AURORA\[([0-9a-f]{2})\]/gi) || [];
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
// BEEHIVE WAGGLE DANCE ENCODING
// ============================================

/**
 * Encode text as bee waggle dance patterns
 * @param {string} text - The text to encode
 * @returns {string} - Waggle dance encoding
 */
export const encodeWaggleDance = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const waggle = WAGGLE_PATTERNS[code % WAGGLE_PATTERNS.length];
  const angle = (code * 1.4) % 360;
  const duration = (code % 5) + 1;
  const distance = code * 10;
  return `🐝[${hex}]${waggle.repeat(duration)}∠${angle.toFixed(0)}°→${distance}m`;
}, " ");

export const decodeWaggleDance = (text) => {
  try {
    const matches = text.match(/🐝\[([0-9a-f]{2})\]/gi) || [];
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
// GLACIER STRATIGRAPHY ENCODING
// ============================================

/**
 * Encode text as ice core layers
 * @param {string} text - The text to encode
 * @returns {string} - Glacier encoding
 */
export const encodeGlacierStratigraphy = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const layer = GLACIER_LAYERS[code % GLACIER_LAYERS.length];
  const epoch = GLACIER_EPOCHS[(code >> 4) % GLACIER_EPOCHS.length];
  const depth = code * 10;
  const age = code * 1000;
  return `ICE[${hex}]${layer}@${depth}m(${epoch}:${age}BP)`;
}, "═");

export const decodeGlacierStratigraphy = (text) => {
  try {
    const matches = text.match(/ICE\[([0-9a-f]{2})\]/gi) || [];
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
// WIND ROSE ENCODING
// ============================================

/**
 * Encode text as wind rose patterns
 * @param {string} text - The text to encode
 * @returns {string} - Wind rose encoding
 */
export const encodeWindRose = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const dir = WIND_DIRECTIONS[code % WIND_DIRECTIONS.length];
  const bft = WIND_BEAUFORT[code % WIND_BEAUFORT.length];
  const speed = code % 100;
  return `🌬️[${hex}]${dir}@${speed}kts(${bft})`;
}, "↺");

export const decodeWindRose = (text) => {
  try {
    const matches = text.match(/🌬️\[([0-9a-f]{2})\]/gi) || [];
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
// DENDROCHRONOLOGY ENCODING
// ============================================

/**
 * Encode text as tree ring patterns
 * @param {string} text - The text to encode
 * @returns {string} - Tree ring encoding
 */
export const encodeDendrochronology = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const ring = TREE_RINGS[code % TREE_RINGS.length];
  const condition = TREE_CONDITIONS[(code >> 3) % TREE_CONDITIONS.length];
  const width = ((code % 10) / 10 + 0.1).toFixed(2);
  const year = 2024 - (code % 200);
  return `🌳[${hex}]${ring}(${year}:${width}mm:${condition})`;
}, "≡");

export const decodeDendrochronology = (text) => {
  try {
    const matches = text.match(/🌳\[([0-9a-f]{2})\]/gi) || [];
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
// CORAL REEF ENCODING
// ============================================

/**
 * Encode text as coral polyp patterns
 * @param {string} text - The text to encode
 * @returns {string} - Coral encoding
 */
export const encodeCoralReef = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const coral = CORALS[code % CORALS.length];
  const sp = CORAL_SPECIES[(code >> 3) % CORAL_SPECIES.length];
  const depth = (code % 50) + 5;
  const bleaching = code % 100;
  return `CORAL[${hex}]${coral}{${sp}@${depth}m:${bleaching}%health}`;
}, "🌊");

export const decodeCoralReef = (text) => {
  try {
    const matches = text.match(/CORAL\[([0-9a-f]{2})\]/gi) || [];
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
// BIRD MIGRATION ENCODING
// ============================================

/**
 * Encode text as bird migration patterns
 * @param {string} text - The text to encode
 * @returns {string} - Migration encoding
 */
export const encodeBirdMigration = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const bird = MIGRATION_BIRDS[code % MIGRATION_BIRDS.length];
  const formation = MIGRATION_FORMATIONS[(code >> 3) % MIGRATION_FORMATIONS.length];
  const altitude = code * 50 + 500;
  const heading = (code * 1.4) % 360;
  return `MIGRATE[${hex}]${bird}{${formation}@${altitude}ft→${heading.toFixed(0)}°}`;
}, "➤");

export const decodeBirdMigration = (text) => {
  try {
    const matches = text.match(/MIGRATE\[([0-9a-f]{2})\]/gi) || [];
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
// EROSION PATTERN ENCODING
// ============================================

/**
 * Encode text as geological erosion patterns
 * @param {string} text - The text to encode
 * @returns {string} - Erosion encoding
 */
export const encodeErosionPattern = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const type = EROSION_TYPES[code % EROSION_TYPES.length];
  const feature = EROSION_FEATURES[(code >> 3) % EROSION_FEATURES.length];
  const rate = ((code % 100) / 10).toFixed(1);
  return `ERODE[${hex}]🏜️{${type}:${feature}@${rate}mm/yr}`;
}, "≈");

export const decodeErosionPattern = (text) => {
  try {
    const matches = text.match(/ERODE\[([0-9a-f]{2})\]/gi) || [];
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
// AURORA AUSTRALIS ENCODING
// ============================================

/**
 * Encode text as southern aurora patterns (distinct from borealis)
 * @param {string} text - The text to encode
 * @returns {string} - Aurora Australis encoding
 */
export const encodeAuroraAustralis = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const zone = AUSTRALIS_ZONES[code % AUSTRALIS_ZONES.length];
  const emission = AUSTRALIS_EMISSIONS[(code >> 4) % AUSTRALIS_EMISSIONS.length];
  const lat = -90 + (code % 30);
  const intensity = code % 100;
  return `SOUTH[${hex}]🌌{${zone}:${emission}@${lat}°S:I${intensity}}`;
}, "✧");

export const decodeAuroraAustralis = (text) => {
  try {
    const matches = text.match(/SOUTH\[([0-9a-f]{2})\]/gi) || [];
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
// SNOWFLAKE CRYSTAL ENCODING
// ============================================

/**
 * Encode text as snowflake crystal structures
 * @param {string} text - The text to encode
 * @returns {string} - Snowflake encoding
 */
export const encodeSnowflakeCrystal = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const type = SNOWFLAKE_TYPES[code % SNOWFLAKE_TYPES.length];
  const branch = SNOWFLAKE_BRANCHES[(code >> 3) % SNOWFLAKE_BRANCHES.length];
  const temp = -40 + (code % 35);
  const size = ((code % 50) / 10).toFixed(1);
  return `SNOW[${hex}]${branch}{${type}:${temp}°C:${size}mm}`;
}, "·");

export const decodeSnowflakeCrystal = (text) => {
  try {
    const matches = text.match(/SNOW\[([0-9a-f]{2})\]/gi) || [];
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
// BONSAI GROWTH ENCODING
// ============================================

/**
 * Encode text as bonsai growth patterns
 * @param {string} text - The text to encode
 * @returns {string} - Bonsai encoding
 */
export const encodeBonsaiGrowth = createCharEncoder((code) => {
  const hex = code.toString(16).padStart(2, "0");
  const style = BONSAI_STYLES[code % BONSAI_STYLES.length];
  const tree = BONSAI_TREES[(code >> 3) % BONSAI_TREES.length];
  const age = code + 5;
  const height = (code % 80) + 10;
  const branchCount = (code % 12) + 3;
  return `BONSAI[${hex}]${tree}{${style}:${age}yr:${height}cm:${branchCount}branches}`;
}, "✿");

export const decodeBonsaiGrowth = (text) => {
  try {
    const matches = text.match(/BONSAI\[([0-9a-f]{2})\]/gi) || [];
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
