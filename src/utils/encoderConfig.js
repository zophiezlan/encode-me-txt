/**
 * Encoder Configuration
 * Defines all available encoders with their metadata
 */

import * as encoders from './encoders/index.js';

/**
 * Complete encoder configuration array
 * Each encoder includes metadata and function references
 */
export const encoderConfig = [
  // 🔐 Steganography & Secrets
  {
    id: 'zero-width',
    name: 'Zero-Width Steganography',
    description: 'Hide messages in invisible characters',
    emoji: '👻',
    category: 'secret',
    encode: encoders.encodeZeroWidth,
    decode: encoders.decodeZeroWidth,
    reversible: true,
    special: true,
    tags: ['steganography', 'invisible', 'security']
  },

  // 📻 Classic Codes
  {
    id: 'morse',
    name: 'Morse Code',
    description: 'Classic dit-dah communication',
    emoji: '📡',
    category: 'classic',
    encode: encoders.encodeMorse,
    decode: encoders.decodeMorse,
    reversible: true,
    hasSound: true,
    tags: ['classic', 'audio', 'telegraph']
  },
  {
    id: 'braille',
    name: 'Braille Patterns',
    description: 'Touch-readable text encoding',
    emoji: '🤚',
    category: 'classic',
    encode: encoders.encodeBraille,
    decode: encoders.decodeBraille,
    reversible: true,
    tags: ['classic', 'accessibility', 'tactile']
  },
  {
    id: 'nato',
    name: 'NATO Phonetic',
    description: 'Alpha-Bravo-Charlie spelling',
    emoji: '🎖️',
    category: 'classic',
    encode: encoders.encodeNATO,
    reversible: false,
    tags: ['classic', 'military', 'phonetic']
  },

  // 💾 Computer Science
  {
    id: 'binary',
    name: 'Binary',
    description: 'Classic 0s and 1s',
    emoji: '💻',
    category: 'computer',
    encode: encoders.encodeBinary,
    decode: encoders.decodeBinary,
    reversible: true,
    tags: ['computer', 'binary', 'programming']
  },
  {
    id: 'hex',
    name: 'Hexadecimal',
    description: 'Base-16 number system',
    emoji: '🔢',
    category: 'computer',
    encode: encoders.encodeHex,
    decode: encoders.decodeHex,
    reversible: true,
    tags: ['computer', 'hexadecimal', 'programming']
  },
  {
    id: 'base64',
    name: 'Base64',
    description: 'Standard encoding for data transfer',
    emoji: '📦',
    category: 'computer',
    encode: encoders.encodeBase64,
    decode: encoders.decodeBase64,
    reversible: true,
    tags: ['computer', 'encoding', 'web']
  },

  // 🔑 Ciphers
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    description: 'Shift alphabet by N positions',
    emoji: '🏛️',
    category: 'cipher',
    encode: encoders.encodeCaesar,
    decode: encoders.decodeCaesar,
    reversible: true,
    hasSettings: true,
    tags: ['cipher', 'cryptography', 'ancient']
  },
  {
    id: 'rot13',
    name: 'ROT13',
    description: 'Caesar cipher with 13-letter shift',
    emoji: '🔄',
    category: 'cipher',
    encode: encoders.encodeROT13,
    decode: encoders.decodeROT13,
    reversible: true,
    tags: ['cipher', 'cryptography', 'simple']
  },
  {
    id: 'reverse',
    name: 'Reverse Text',
    description: 'Simply backwards',
    emoji: '↩️',
    category: 'cipher',
    encode: encoders.encodeReverse,
    decode: encoders.decodeReverse,
    reversible: true,
    tags: ['cipher', 'simple', 'mirror']
  },
  {
    id: 'atbash',
    name: 'Atbash Cipher',
    description: 'Hebrew cipher - reverse alphabet (A=Z)',
    emoji: '🔀',
    category: 'cipher',
    encode: encoders.encodeAtbash,
    decode: encoders.decodeAtbash,
    reversible: true,
    tags: ['cipher', 'cryptography', 'hebrew', 'ancient']
  },
  {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    description: 'Keyword-based polyalphabetic cipher',
    emoji: '🔐',
    category: 'cipher',
    encode: encoders.encodeVigenere,
    decode: encoders.decodeVigenere,
    reversible: true,
    tags: ['cipher', 'cryptography', 'polyalphabetic']
  },
  {
    id: 'rail-fence',
    name: 'Rail Fence Cipher',
    description: 'Zigzag transposition cipher',
    emoji: '🚃',
    category: 'cipher',
    encode: encoders.encodeRailFence,
    decode: encoders.decodeRailFence,
    reversible: true,
    tags: ['cipher', 'transposition', 'zigzag']
  },
  {
    id: 'bacon',
    name: "Bacon's Cipher",
    description: 'Binary cipher using A and B',
    emoji: '🥓',
    category: 'cipher',
    encode: encoders.encodeBacon,
    decode: encoders.decodeBacon,
    reversible: true,
    tags: ['cipher', 'binary', 'steganography']
  },
  {
    id: 'polybius',
    name: 'Polybius Square',
    description: 'Ancient Greek grid cipher',
    emoji: '🏛️',
    category: 'cipher',
    encode: encoders.encodePolybius,
    decode: encoders.decodePolybius,
    reversible: true,
    tags: ['cipher', 'grid', 'ancient', 'greek']
  },
  {
    id: 'affine',
    name: 'Affine Cipher',
    description: 'Mathematical substitution cipher',
    emoji: '📐',
    category: 'cipher',
    encode: encoders.encodeAffine,
    decode: encoders.decodeAffine,
    reversible: true,
    tags: ['cipher', 'mathematical', 'substitution']
  },
  {
    id: 'rot47',
    name: 'ROT47',
    description: 'Extended ASCII rotation cipher',
    emoji: '🔄',
    category: 'cipher',
    encode: encoders.encodeROT47,
    decode: encoders.decodeROT47,
    reversible: true,
    tags: ['cipher', 'rotation', 'ascii']
  },
  {
    id: 'tap-code',
    name: 'Tap Code',
    description: 'Prison/POW knock cipher',
    emoji: '👊',
    category: 'cipher',
    encode: encoders.encodeTapCode,
    decode: encoders.decodeTapCode,
    reversible: true,
    tags: ['cipher', 'tap', 'prison', 'historical']
  },
  {
    id: 'substitution',
    name: 'QWERTY Substitution',
    description: 'QWERTY keyboard cipher',
    emoji: '⌨️',
    category: 'cipher',
    encode: encoders.encodeSubstitution,
    decode: encoders.decodeSubstitution,
    reversible: true,
    tags: ['cipher', 'keyboard', 'substitution']
  },
  {
    id: 'beaufort',
    name: 'Beaufort Cipher',
    description: 'Symmetric Vigenère variant',
    emoji: '⚓',
    category: 'cipher',
    encode: encoders.encodeBeaufort,
    decode: encoders.decodeBeaufort,
    reversible: true,
    tags: ['cipher', 'polyalphabetic', 'symmetric']
  },

  // 🎉 Fun & Emoji
  {
    id: 'emoji',
    name: 'Emoji Encoding',
    description: 'Express text through emoji pairs',
    emoji: '😎',
    category: 'fun',
    encode: encoders.encodeEmoji,
    decode: encoders.decodeEmoji,
    reversible: true,
    tags: ['fun', 'emoji', 'creative']
  },
  {
    id: 'bubble',
    name: 'Bubble Text',
    description: 'Cute circled characters',
    emoji: '⭕',
    category: 'fun',
    encode: encoders.encodeBubble,
    reversible: false,
    tags: ['fun', 'aesthetic', 'social']
  },
  {
    id: 'upside-down',
    name: 'Upside Down',
    description: 'Australian mode activated',
    emoji: '🙃',
    category: 'fun',
    encode: encoders.encodeUpsideDown,
    reversible: false,
    tags: ['fun', 'flip', 'creative']
  },
  {
    id: 'leetspeak',
    name: 'Leetspeak',
    description: 'H4ck3r 5p34k',
    emoji: '🤓',
    category: 'fun',
    encode: encoders.encodeLeetspeak,
    reversible: false,
    tags: ['fun', 'hacker', 'internet']
  },
  {
    id: 'pig-latin',
    name: 'Pig Latin',
    description: 'Ixnay on the ormalfay',
    emoji: '🐷',
    category: 'fun',
    encode: encoders.encodePigLatin,
    reversible: false,
    tags: ['fun', 'language', 'playground']
  },
  {
    id: 'wingdings',
    name: 'Wingdings',
    description: 'Symbol font encoding',
    emoji: '✡',
    category: 'fun',
    encode: encoders.encodeWingdings,
    reversible: false,
    tags: ['fun', 'symbols', 'font']
  },
  {
    id: 'semaphore',
    name: 'Semaphore Flags',
    description: 'Maritime flag signals',
    emoji: '🚩',
    category: 'fun',
    encode: encoders.encodeSemaphore,
    reversible: false,
    tags: ['fun', 'flags', 'maritime']
  },
  {
    id: 'navy-flags',
    name: 'Navy Signal Flags',
    description: 'Nautical flag encoding',
    emoji: '⚓',
    category: 'fun',
    encode: encoders.encodeNavyFlags,
    reversible: false,
    tags: ['fun', 'navy', 'maritime']
  },
  {
    id: 'spongebob',
    name: 'SpOnGeBoB MoCk',
    description: 'aLtErNaTiNg CaSe TeXt',
    emoji: '🧽',
    category: 'fun',
    encode: encoders.encodeSpongebob,
    reversible: false,
    tags: ['fun', 'meme', 'sarcasm']
  },
  {
    id: 'uwu',
    name: 'UwU Speak',
    description: 'Cutesy internet speak OwO',
    emoji: '🥺',
    category: 'fun',
    encode: encoders.encodeUwU,
    reversible: false,
    tags: ['fun', 'cute', 'internet']
  },
  {
    id: 'morse-emoji',
    name: 'Morse Emoji',
    description: 'Morse code with visual dots',
    emoji: '⚫',
    category: 'fun',
    encode: encoders.encodeMorseEmoji,
    reversible: false,
    tags: ['fun', 'morse', 'visual']
  },
  {
    id: 'vaporwave',
    name: 'Ｖａｐｏｒｗａｖｅ',
    description: 'Ａｅｓｔｈｅｔｉｃ full-width',
    emoji: '🌴',
    category: 'fun',
    encode: encoders.encodeVaporwave,
    reversible: false,
    tags: ['fun', 'aesthetic', 'retro']
  },
  {
    id: 'tiny',
    name: 'ᵀⁱⁿʸ ᵀᵉˣᵗ',
    description: 'Superscript tiny text',
    emoji: '🔬',
    category: 'fun',
    encode: encoders.encodeTinyText,
    reversible: false,
    tags: ['fun', 'tiny', 'superscript']
  },
  {
    id: 'medieval',
    name: 'Medieval 𝔊𝔬𝔱𝔥𝔦𝔠',
    description: 'Blackletter Fraktur font',
    emoji: '⚔️',
    category: 'fun',
    encode: encoders.encodeMedieval,
    reversible: false,
    tags: ['fun', 'gothic', 'medieval']
  },
  {
    id: 'strikethrough',
    name: 'S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶',
    description: 'Crossed out text',
    emoji: '✖️',
    category: 'fun',
    encode: encoders.encodeStrikethrough,
    reversible: false,
    tags: ['fun', 'strikethrough', 'text-effect']
  },
  {
    id: 'underline',
    name: 'U̲n̲d̲e̲r̲l̲i̲n̲e̲',
    description: 'Underlined text',
    emoji: '📏',
    category: 'fun',
    encode: encoders.encodeUnderline,
    reversible: false,
    tags: ['fun', 'underline', 'text-effect']
  },

  // 🎨 Artistic
  {
    id: 'blocks',
    name: 'Block Art',
    description: 'Geometric pattern encoding',
    emoji: '◼️',
    category: 'artistic',
    encode: encoders.encodeBoxDrawing,
    reversible: false,
    tags: ['artistic', 'geometric', 'visual']
  },
  {
    id: 'musical',
    name: 'Musical Notes',
    description: 'Your text as a symphony',
    emoji: '🎵',
    category: 'artistic',
    encode: encoders.encodeMusical,
    reversible: false,
    tags: ['artistic', 'music', 'creative']
  },
  {
    id: 'zalgo',
    name: 'Zalgo Chaos',
    description: 'Ḩ̷̛e̶͝ ̸̕c̷̀o̶̎m̸̂e̵̊s̶̄',
    emoji: '😈',
    category: 'artistic',
    encode: encoders.encodeZalgo,
    reversible: false,
    tags: ['artistic', 'horror', 'chaos']
  },
  {
    id: 'colors',
    name: 'Color Blocks',
    description: 'Rainbow data encoding',
    emoji: '🌈',
    category: 'artistic',
    encode: encoders.encodeColorBlocks,
    reversible: false,
    tags: ['artistic', 'colors', 'visual']
  },
  {
    id: 'runes',
    name: 'Ancient Runes',
    description: 'Elder Futhark mysticism',
    emoji: '⚔️',
    category: 'artistic',
    encode: encoders.encodeRunes,
    reversible: false,
    tags: ['artistic', 'ancient', 'mystical']
  },
  {
    id: 'ascii-art',
    name: 'ASCII Art Banner',
    description: 'Retro text art style',
    emoji: '🎨',
    category: 'artistic',
    encode: encoders.encodeAsciiArt,
    reversible: false,
    tags: ['artistic', 'retro', 'banner', 'ascii']
  },

  // 🚀 Advanced (NEW!)
  {
    id: 'qr-code',
    name: 'QR Code Generator',
    description: 'Generate scannable QR codes',
    emoji: '📱',
    category: 'advanced',
    encode: encoders.encodeQRCode,
    reversible: false,
    special: true,
    tags: ['advanced', 'qr', 'mobile']
  },
  {
    id: 'url-encode',
    name: 'URL Encoding',
    description: 'Web-safe URL encoding',
    emoji: '🔗',
    category: 'advanced',
    encode: encoders.encodeURL,
    decode: encoders.decodeURL,
    reversible: true,
    tags: ['advanced', 'web', 'url']
  },
  {
    id: 'html-entities',
    name: 'HTML Entities',
    description: 'HTML-safe character encoding',
    emoji: '🌐',
    category: 'advanced',
    encode: encoders.encodeHTMLEntities,
    decode: encoders.decodeHTMLEntities,
    reversible: true,
    tags: ['advanced', 'web', 'html']
  },
  {
    id: 'sound-wave',
    name: 'Sound Wave',
    description: 'Visual sound wave representation',
    emoji: '🔊',
    category: 'advanced',
    encode: encoders.encodeSoundWave,
    reversible: false,
    tags: ['advanced', 'visual', 'audio']
  },
  {
    id: 'hash',
    name: 'Hash Generator',
    description: 'Generate unique hash from text',
    emoji: '🔐',
    category: 'advanced',
    encode: encoders.encodeHash,
    reversible: false,
    tags: ['advanced', 'hash', 'fingerprint']
  },

  // 🌟 Unique & Creative (NEW!)
  {
    id: 'dna',
    name: 'DNA Sequence',
    description: 'Encode as genetic base pairs (ATGC)',
    emoji: '🧬',
    category: 'unique',
    encode: encoders.encodeDNA,
    decode: encoders.decodeDNA,
    reversible: true,
    tags: ['unique', 'biology', 'science']
  },
  {
    id: 'playing-cards',
    name: 'Playing Cards',
    description: 'Express text through card deck',
    emoji: '🃏',
    category: 'unique',
    encode: encoders.encodePlayingCards,
    decode: encoders.decodePlayingCards,
    reversible: true,
    tags: ['unique', 'cards', 'games']
  },
  {
    id: 'chemistry',
    name: 'Chemistry Elements',
    description: 'Periodic table encoding',
    emoji: '⚗️',
    category: 'unique',
    encode: encoders.encodeChemistry,
    reversible: false,
    tags: ['unique', 'chemistry', 'science']
  },
  {
    id: 'coordinates',
    name: 'GPS Coordinates',
    description: 'Text as latitude/longitude',
    emoji: '🗺️',
    category: 'unique',
    encode: encoders.encodeCoordinates,
    decode: encoders.decodeCoordinates,
    reversible: true,
    tags: ['unique', 'geography', 'location']
  },
  {
    id: 'zodiac',
    name: 'Zodiac Signs',
    description: 'Astrological symbol encoding',
    emoji: '♈',
    category: 'unique',
    encode: encoders.encodeZodiac,
    decode: encoders.decodeZodiac,
    reversible: true,
    tags: ['unique', 'astrology', 'mystical']
  },
  {
    id: 'barcode',
    name: 'Barcode',
    description: 'Visual barcode-style bars',
    emoji: '📊',
    category: 'unique',
    encode: encoders.encodeBarcode,
    reversible: false,
    tags: ['unique', 'visual', 'retail']
  },
  {
    id: 'minecraft',
    name: 'Minecraft Blocks',
    description: 'Gaming block emojis',
    emoji: '⛏️',
    category: 'unique',
    encode: encoders.encodeMinecraft,
    reversible: false,
    tags: ['unique', 'gaming', 'minecraft']
  },
  {
    id: 'recipe',
    name: 'Recipe Cipher',
    description: 'Cooking ingredients encoding',
    emoji: '🍳',
    category: 'unique',
    encode: encoders.encodeRecipe,
    reversible: false,
    tags: ['unique', 'cooking', 'food']
  },
  {
    id: 'clock',
    name: 'Clock Time',
    description: 'Encode as clock times',
    emoji: '🕐',
    category: 'unique',
    encode: encoders.encodeClockTime,
    reversible: false,
    tags: ['unique', 'time', 'clock']
  },
  {
    id: 'weather',
    name: 'Weather Symbols',
    description: 'Meteorological encoding',
    emoji: '⛅',
    category: 'unique',
    encode: encoders.encodeWeather,
    reversible: false,
    tags: ['unique', 'weather', 'nature']
  },
  {
    id: 'domino',
    name: 'Domino Tiles',
    description: 'Game piece patterns',
    emoji: '🁣',
    category: 'unique',
    encode: encoders.encodeDomino,
    reversible: false,
    tags: ['unique', 'games', 'tiles']
  },
  {
    id: 'traffic',
    name: 'Traffic Signs',
    description: 'Road sign symbols',
    emoji: '🛑',
    category: 'unique',
    encode: encoders.encodeTrafficSigns,
    reversible: false,
    tags: ['unique', 'signs', 'roads']
  },
  {
    id: 'tree-pattern',
    name: 'Tree Pattern',
    description: 'Nature and tree symbols',
    emoji: '🌲',
    category: 'unique',
    encode: encoders.encodeTreePattern,
    reversible: false,
    tags: ['unique', 'nature', 'trees']
  },
  {
    id: 'moon-phase',
    name: 'Moon Phases',
    description: 'Lunar cycle encoding',
    emoji: '🌙',
    category: 'unique',
    encode: encoders.encodeMoonPhase,
    reversible: false,
    tags: ['unique', 'moon', 'celestial']
  },
  {
    id: 'animal',
    name: 'Animal Encoding',
    description: 'Cute animal emojis',
    emoji: '🐶',
    category: 'unique',
    encode: encoders.encodeAnimal,
    reversible: false,
    tags: ['unique', 'animals', 'cute']
  },
  {
    id: 'food',
    name: 'Food Encoding',
    description: 'Delicious food emojis',
    emoji: '🍎',
    category: 'unique',
    encode: encoders.encodeFood,
    reversible: false,
    tags: ['unique', 'food', 'fruit']
  },
  {
    id: 'sports',
    name: 'Sports Encoding',
    description: 'Athletic sports emojis',
    emoji: '⚽',
    category: 'unique',
    encode: encoders.encodeSports,
    reversible: false,
    tags: ['unique', 'sports', 'games']
  },
  {
    id: 'instruments',
    name: 'Musical Instruments',
    description: 'Instrument emojis',
    emoji: '🎸',
    category: 'unique',
    encode: encoders.encodeInstruments,
    reversible: false,
    tags: ['unique', 'music', 'instruments']
  },
  {
    id: 'space',
    name: 'Space Encoding',
    description: 'Cosmic space emojis',
    emoji: '🚀',
    category: 'unique',
    encode: encoders.encodeSpace,
    reversible: false,
    tags: ['unique', 'space', 'cosmic']
  },
  {
    id: 'ocean',
    name: 'Ocean Encoding',
    description: 'Marine sea life emojis',
    emoji: '🌊',
    category: 'unique',
    encode: encoders.encodeOcean,
    reversible: false,
    tags: ['unique', 'ocean', 'sea']
  },
  {
    id: 'roman',
    name: 'Roman Numerals',
    description: 'Ancient Roman numbers',
    emoji: '🏛️',
    category: 'unique',
    encode: encoders.encodeRomanNumeral,
    reversible: false,
    tags: ['unique', 'roman', 'numbers', 'ancient']
  },
  {
    id: 'number-words',
    name: 'Number Words',
    description: 'Spelled-out number encoding',
    emoji: '🔢',
    category: 'unique',
    encode: encoders.encodeNumberWords,
    reversible: false,
    tags: ['unique', 'words', 'numbers']
  },
  {
    id: 'hexagram',
    name: 'I Ching Hexagrams',
    description: 'Ancient Chinese divination',
    emoji: '☯',
    category: 'unique',
    encode: encoders.encodeHexagram,
    reversible: false,
    tags: ['unique', 'chinese', 'mystical']
  },
  {
    id: 'chess',
    name: 'Chess Pieces',
    description: 'Chess piece encoding',
    emoji: '♔',
    category: 'unique',
    encode: encoders.encodeChess,
    reversible: false,
    tags: ['unique', 'chess', 'games']
  },
  {
    id: 'dice',
    name: 'Dice Encoding',
    description: 'Roll the dice symbols',
    emoji: '🎲',
    category: 'unique',
    encode: encoders.encodeDice,
    reversible: false,
    tags: ['unique', 'dice', 'games']
  },
  {
    id: 'mahjong',
    name: 'Mahjong Tiles',
    description: 'Chinese tile game symbols',
    emoji: '🀄',
    category: 'unique',
    encode: encoders.encodeMahjong,
    reversible: false,
    tags: ['unique', 'mahjong', 'chinese', 'games']
  },

  // 🔀 Shuffle & Mixed Encoding
  {
    id: 'shuffle',
    name: 'Shuffle Encoding',
    description: 'Each character encoded with a random encoder from selected options',
    emoji: '🔀',
    category: 'advanced',
    encode: encoders.encodeShuffle,
    decode: encoders.decodeShuffle,
    reversible: true,
    special: true,
    hasSettings: true,
    tags: ['advanced', 'shuffle', 'random', 'mixed']
  }
];

/**
 * Get encoders by category
 * @param {string} category - The category to filter by
 * @returns {Array} - Filtered encoder array
 */
export const getEncodersByCategory = (category) => {
  return encoderConfig.filter(encoder => encoder.category === category);
};

/**
 * Get encoder by ID
 * @param {string} id - The encoder ID
 * @returns {Object|null} - Encoder object or null
 */
export const getEncoderById = (id) => {
  return encoderConfig.find(encoder => encoder.id === id) || null;
};

/**
 * Get all reversible encoders
 * @returns {Array} - Array of reversible encoders
 */
export const getReversibleEncoders = () => {
  return encoderConfig.filter(encoder => encoder.reversible);
};

/**
 * Category metadata
 */
export const categories = {
  secret: { emoji: '🔐', name: 'Secret', description: 'Steganography and hidden messages' },
  classic: { emoji: '📻', name: 'Classic', description: 'Traditional encoding methods' },
  computer: { emoji: '💾', name: 'Computer', description: 'Computer science encodings' },
  cipher: { emoji: '🔑', name: 'Ciphers', description: 'Cryptographic substitution ciphers' },
  fun: { emoji: '🎉', name: 'Fun', description: 'Playful and creative encodings' },
  artistic: { emoji: '🎨', name: 'Artistic', description: 'Visual and aesthetic encodings' },
  advanced: { emoji: '🚀', name: 'Advanced', description: 'Advanced technical encodings' },
  unique: { emoji: '🌟', name: 'Unique', description: 'One-of-a-kind creative encodings' },
  custom: { emoji: '🎨', name: 'Custom', description: 'User-created custom encoders' }
};
