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
    hasSettings: true,
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
    hasSettings: true,
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
    hasSettings: true,
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
    hasSettings: true,
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
    hasSettings: true,
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
  },

  // 🌍 Linguistic Encoders
  {
    id: 'greek',
    name: 'Greek Alphabet',
    description: 'Transliterate to Greek letters',
    emoji: 'Ω',
    category: 'linguistic',
    encode: encoders.encodeGreek,
    decode: encoders.decodeGreek,
    reversible: true,
    tags: ['linguistic', 'greek', 'alphabet']
  },
  {
    id: 'cyrillic',
    name: 'Cyrillic Script',
    description: 'Transliterate to Cyrillic letters',
    emoji: 'Д',
    category: 'linguistic',
    encode: encoders.encodeCyrillic,
    decode: encoders.decodeCyrillic,
    reversible: true,
    tags: ['linguistic', 'cyrillic', 'russian']
  },
  {
    id: 'hebrew',
    name: 'Hebrew Alephbet',
    description: 'Transliterate to Hebrew letters',
    emoji: 'א',
    category: 'linguistic',
    encode: encoders.encodeHebrew,
    decode: encoders.decodeHebrew,
    reversible: true,
    tags: ['linguistic', 'hebrew', 'ancient']
  },
  {
    id: 'korean',
    name: 'Korean Hangul',
    description: 'Map to Korean syllables',
    emoji: '한',
    category: 'linguistic',
    encode: encoders.encodeKorean,
    decode: encoders.decodeKorean,
    reversible: true,
    tags: ['linguistic', 'korean', 'hangul']
  },
  {
    id: 'phonetic-ipa',
    name: 'IPA Transcription',
    description: 'International Phonetic Alphabet',
    emoji: '🗣️',
    category: 'linguistic',
    encode: encoders.encodeIPA,
    reversible: false,
    tags: ['linguistic', 'phonetic', 'pronunciation']
  },

  // 🧙 Fantasy Encoders
  {
    id: 'aurebesh',
    name: 'Aurebesh',
    description: 'Star Wars galaxy script',
    emoji: '⭐',
    category: 'fantasy',
    encode: encoders.encodeAurebesh,
    decode: encoders.decodeAurebesh,
    reversible: true,
    tags: ['fantasy', 'starwars', 'scifi']
  },
  {
    id: 'gallifreyan',
    name: 'Circular Gallifreyan',
    description: 'Doctor Who Time Lord script',
    emoji: '🌀',
    category: 'fantasy',
    encode: encoders.encodeGallifreyan,
    decode: encoders.decodeGallifreyan,
    reversible: true,
    tags: ['fantasy', 'doctorwho', 'scifi']
  },
  {
    id: 'elvish',
    name: 'Elvish/Tengwar',
    description: 'Lord of the Rings script',
    emoji: '💍',
    category: 'fantasy',
    encode: encoders.encodeElvish,
    decode: encoders.decodeElvish,
    reversible: true,
    tags: ['fantasy', 'lotr', 'tolkien']
  },
  {
    id: 'klingon',
    name: 'Klingon pIqaD',
    description: 'Star Trek Klingon script',
    emoji: '🖖',
    category: 'fantasy',
    encode: encoders.encodeKlingon,
    decode: encoders.decodeKlingon,
    reversible: true,
    tags: ['fantasy', 'startrek', 'scifi']
  },

  // 👁️ Visual Encoders
  {
    id: 'sign-language',
    name: 'ASL Fingerspelling',
    description: 'American Sign Language hand signs',
    emoji: '🤟',
    category: 'visual',
    encode: encoders.encodeASL,
    reversible: false,
    tags: ['visual', 'asl', 'accessibility']
  },
  {
    id: 'seven-segment',
    name: '7-Segment Display',
    description: 'Digital display encoding',
    emoji: '🧮',
    category: 'visual',
    encode: encoders.encodeSevenSegment,
    reversible: false,
    tags: ['visual', 'digital', 'display']
  },
  {
    id: 'dancing-men',
    name: 'Dancing Men Cipher',
    description: "Sherlock Holmes' Dancing Men",
    emoji: '🕺',
    category: 'visual',
    encode: encoders.encodeDancingMen,
    decode: encoders.decodeDancingMen,
    reversible: true,
    tags: ['visual', 'cipher', 'sherlock']
  },
  {
    id: 'pigpen',
    name: 'Pigpen Cipher',
    description: 'Geometric substitution cipher',
    emoji: '🔳',
    category: 'visual',
    encode: encoders.encodePigpen,
    decode: encoders.decodePigpen,
    reversible: true,
    tags: ['visual', 'cipher', 'geometric']
  },

  // 📟 Retro Encoders
  {
    id: 'phone-keypad',
    name: 'Phone Keypad (T9)',
    description: 'Old mobile phone multi-tap',
    emoji: '📱',
    category: 'retro',
    encode: encoders.encodePhoneKeypad,
    decode: encoders.decodePhoneKeypad,
    reversible: true,
    tags: ['retro', 'phone', 't9']
  },
  {
    id: 'pager',
    name: 'Pager Code',
    description: 'Classic pager numeric codes',
    emoji: '📟',
    category: 'retro',
    encode: encoders.encodePagerCode,
    reversible: false,
    tags: ['retro', 'pager', 'numeric']
  },
  {
    id: 'punch-card',
    name: 'IBM Punch Card',
    description: 'Vintage punch card patterns',
    emoji: '🎫',
    category: 'retro',
    encode: encoders.encodePunchCard,
    reversible: false,
    tags: ['retro', 'punchcard', 'ibm']
  },
  {
    id: 'baudot',
    name: 'Baudot Code',
    description: '5-bit teleprinter code',
    emoji: '📟',
    category: 'retro',
    encode: encoders.encodeBaudot,
    decode: encoders.decodeBaudot,
    reversible: true,
    tags: ['retro', 'teleprinter', 'telegraph']
  },
  {
    id: 'resistor',
    name: 'Resistor Color Code',
    description: 'Electronics color bands',
    emoji: '⚡',
    category: 'retro',
    encode: encoders.encodeResistor,
    reversible: false,
    tags: ['retro', 'electronics', 'engineering']
  },

  // 🏛️ Ancient Script Encoders
  {
    id: 'ogham',
    name: 'Ogham Script',
    description: 'Celtic tree alphabet',
    emoji: '🎋',
    category: 'ancient',
    encode: encoders.encodeOgham,
    decode: encoders.decodeOgham,
    reversible: true,
    tags: ['ancient', 'celtic', 'irish']
  },
  {
    id: 'hieroglyphs',
    name: 'Egyptian Hieroglyphs',
    description: 'Ancient Egyptian writing',
    emoji: '🦅',
    category: 'ancient',
    encode: encoders.encodeHieroglyphs,
    decode: encoders.decodeHieroglyphs,
    reversible: true,
    tags: ['ancient', 'egyptian', 'hieroglyphs']
  },
  {
    id: 'cuneiform',
    name: 'Sumerian Cuneiform',
    description: 'Ancient Mesopotamian script',
    emoji: '🧱',
    category: 'ancient',
    encode: encoders.encodeCuneiform,
    decode: encoders.decodeCuneiform,
    reversible: true,
    tags: ['ancient', 'sumerian', 'mesopotamia']
  },
  {
    id: 'mayan',
    name: 'Mayan Numerals',
    description: 'Ancient Mayan number system',
    emoji: '🗿',
    category: 'ancient',
    encode: encoders.encodeMayan,
    decode: encoders.decodeMayan,
    reversible: true,
    tags: ['ancient', 'mayan', 'numbers']
  },

  // ✨ Aesthetic Encoders
  {
    id: 'fullwidth',
    name: 'Ｆｕｌｌｗｉｄｔｈ Ｔｅｘｔ',
    description: 'Wide aesthetic characters',
    emoji: '↔️',
    category: 'aesthetic',
    encode: encoders.encodeFullwidth,
    decode: encoders.decodeFullwidth,
    reversible: true,
    tags: ['aesthetic', 'wide', 'vaporwave']
  },
  {
    id: 'squared',
    name: '🅂🅀🅄🄰🅁🄴🄳 🅃🄴🅇🅃',
    description: 'Squared Unicode letters',
    emoji: '🔲',
    category: 'aesthetic',
    encode: encoders.encodeSquared,
    decode: encoders.decodeSquared,
    reversible: true,
    tags: ['aesthetic', 'squared', 'unicode']
  },
  {
    id: 'parenthesized',
    name: '⒫⒜⒭⒠⒩⒯⒣⒠⒮⒤⒵⒠⒟',
    description: 'Parenthesized letters',
    emoji: '⒜',
    category: 'aesthetic',
    encode: encoders.encodeParenthesized,
    decode: encoders.decodeParenthesized,
    reversible: true,
    tags: ['aesthetic', 'parenthesized', 'unicode']
  },
  {
    id: 'double-struck',
    name: '𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜',
    description: 'Mathematical blackboard bold',
    emoji: '🎯',
    category: 'aesthetic',
    encode: encoders.encodeDoubleStruck,
    decode: encoders.decodeDoubleStruck,
    reversible: true,
    tags: ['aesthetic', 'doublestruck', 'math']
  },
  {
    id: 'cursive',
    name: '𝒞𝓊𝓇𝓈𝒾𝓋𝑒 𝒮𝒸𝓇𝒾𝓅𝓉',
    description: 'Elegant cursive script',
    emoji: '✒️',
    category: 'aesthetic',
    encode: encoders.encodeCursive,
    decode: encoders.decodeCursive,
    reversible: true,
    tags: ['aesthetic', 'cursive', 'script']
  },
  {
    id: 'mirror',
    name: 'Mirror Text',
    description: 'Horizontally mirrored text',
    emoji: '🪞',
    category: 'aesthetic',
    encode: encoders.encodeMirror,
    reversible: false,
    tags: ['aesthetic', 'mirror', 'reversed']
  },

  // 🎮 Additional Fun Encoders
  {
    id: 'redacted',
    name: 'R██ac██d T██t',
    description: 'Randomly redacted text',
    emoji: '⬛',
    category: 'fun',
    encode: encoders.encodeRedacted,
    reversible: false,
    hasSettings: true,
    tags: ['fun', 'redacted', 'secret']
  },
  {
    id: 'keyboard-shift',
    name: 'Keyboard Shift',
    description: 'Shift keys right on keyboard',
    emoji: '⌨️',
    category: 'fun',
    encode: encoders.encodeKeyboardShift,
    decode: encoders.decodeKeyboardShift,
    reversible: true,
    tags: ['fun', 'keyboard', 'shift']
  },
  {
    id: 'emojipasta',
    name: 'Emojipasta 🍝',
    description: 'Add random emojis everywhere',
    emoji: '😫',
    category: 'fun',
    encode: encoders.encodeEmojipasta,
    reversible: false,
    tags: ['fun', 'emoji', 'meme']
  },
  {
    id: 'tally',
    name: 'Tally Marks',
    description: 'Counting tally marks',
    emoji: '𝍡',
    category: 'fun',
    encode: encoders.encodeTally,
    reversible: false,
    tags: ['fun', 'tally', 'counting']
  },
  {
    id: 'whitespace',
    name: 'Whitespace Stego',
    description: 'Hide data in spaces and tabs',
    emoji: '🌫️',
    category: 'secret',
    encode: encoders.encodeWhitespace,
    decode: encoders.decodeWhitespace,
    reversible: true,
    tags: ['secret', 'steganography', 'invisible']
  },
  {
    id: 'acrostic',
    name: 'Acrostic Generator',
    description: 'First letters spell message',
    emoji: '📝',
    category: 'fun',
    encode: encoders.encodeAcrostic,
    reversible: false,
    tags: ['fun', 'acrostic', 'poem']
  },

  // 💻 Additional Computer Encoders
  {
    id: 'base32',
    name: 'Base32',
    description: 'RFC 4648 encoding',
    emoji: '📋',
    category: 'computer',
    encode: encoders.encodeBase32,
    decode: encoders.decodeBase32,
    reversible: true,
    tags: ['computer', 'base32', 'encoding']
  },
  {
    id: 'octal',
    name: 'Octal (Base-8)',
    description: 'Octal number representation',
    emoji: '8️⃣',
    category: 'computer',
    encode: encoders.encodeOctal,
    decode: encoders.decodeOctal,
    reversible: true,
    tags: ['computer', 'octal', 'base8']
  },
  {
    id: 'ascii85',
    name: 'ASCII85 (Base85)',
    description: 'Adobe-style Base85 encoding',
    emoji: '📄',
    category: 'computer',
    encode: encoders.encodeAscii85,
    decode: encoders.decodeAscii85,
    reversible: true,
    tags: ['computer', 'ascii85', 'base85']
  },
  {
    id: 'quoted-printable',
    name: 'Quoted-Printable',
    description: 'Email-safe encoding',
    emoji: '📧',
    category: 'computer',
    encode: encoders.encodeQuotedPrintable,
    decode: encoders.decodeQuotedPrintable,
    reversible: true,
    tags: ['computer', 'email', 'encoding']
  },
  {
    id: 'a1z26',
    name: 'A1Z26 (1=A, 2=B)',
    description: 'Letter to number substitution',
    emoji: '🔢',
    category: 'computer',
    encode: encoders.encodeA1Z26,
    decode: encoders.decodeA1Z26,
    reversible: true,
    tags: ['computer', 'simple', 'numbers']
  },
  {
    id: 'brainfuck',
    name: 'Brainfuck Code',
    description: 'Esoteric programming language',
    emoji: '🤯',
    category: 'computer',
    encode: encoders.encodeBrainfuck,
    decode: encoders.decodeBrainfuck,
    reversible: true,
    tags: ['computer', 'esoteric', 'programming']
  },

  // 🔐 Additional Cipher Encoders
  {
    id: 'playfair',
    name: 'Playfair Cipher',
    description: 'Keyword-based digraph cipher',
    emoji: '🎭',
    category: 'cipher',
    encode: encoders.encodePlayfair,
    decode: encoders.decodePlayfair,
    reversible: true,
    hasSettings: true,
    tags: ['cipher', 'playfair', 'digraph']
  },
  {
    id: 'columnar',
    name: 'Columnar Transposition',
    description: 'Column-based rearrangement',
    emoji: '📊',
    category: 'cipher',
    encode: encoders.encodeColumnar,
    decode: encoders.decodeColumnar,
    reversible: true,
    hasSettings: true,
    tags: ['cipher', 'transposition', 'columnar']
  },
  {
    id: 'scytale',
    name: 'Scytale Cipher',
    description: 'Ancient Spartan cylinder cipher',
    emoji: '📜',
    category: 'cipher',
    encode: encoders.encodeScytale,
    decode: encoders.decodeScytale,
    reversible: true,
    hasSettings: true,
    tags: ['cipher', 'ancient', 'spartan']
  },
  {
    id: 'autokey',
    name: 'Autokey Cipher',
    description: 'Self-keying Vigenère variant',
    emoji: '🗝️',
    category: 'cipher',
    encode: encoders.encodeAutokey,
    decode: encoders.decodeAutokey,
    reversible: true,
    hasSettings: true,
    tags: ['cipher', 'autokey', 'vigenere']
  },
  {
    id: 'hill',
    name: 'Hill Cipher',
    description: 'Matrix-based encryption',
    emoji: '📐',
    category: 'cipher',
    encode: encoders.encodeHill,
    decode: encoders.decodeHill,
    reversible: true,
    tags: ['cipher', 'hill', 'matrix']
  },
  {
    id: 'bifid',
    name: 'Bifid Cipher',
    description: 'Polybius-based fractionation',
    emoji: '🔺',
    category: 'cipher',
    encode: encoders.encodeBifid,
    decode: encoders.decodeBifid,
    reversible: true,
    tags: ['cipher', 'bifid', 'polybius']
  },

  // 📊 Pattern-Based Encoders (NEW v3.0!)
  {
    id: 'fibonacci',
    name: 'Fibonacci Encoding',
    description: 'Maps characters to Fibonacci sequence',
    emoji: '🌀',
    category: 'patterns',
    encode: encoders.encodeFibonacci,
    decode: encoders.decodeFibonacci,
    reversible: true,
    tags: ['patterns', 'mathematical', 'fibonacci']
  },
  {
    id: 'prime',
    name: 'Prime Number Encoding',
    description: 'Uses prime numbers for positions',
    emoji: '🔢',
    category: 'patterns',
    encode: encoders.encodePrime,
    decode: encoders.decodePrime,
    reversible: true,
    tags: ['patterns', 'mathematical', 'prime']
  },
  {
    id: 'golden-ratio',
    name: 'Golden Ratio Encoding',
    description: 'Phi-based mathematical encoding',
    emoji: 'φ',
    category: 'patterns',
    encode: encoders.encodeGoldenRatio,
    decode: encoders.decodeGoldenRatio,
    reversible: true,
    tags: ['patterns', 'mathematical', 'golden']
  },
  {
    id: 'triangle',
    name: 'Triangle Number Encoding',
    description: 'Uses triangular number sequence',
    emoji: '△',
    category: 'patterns',
    encode: encoders.encodeTriangle,
    reversible: false,
    tags: ['patterns', 'mathematical', 'sequence']
  },
  {
    id: 'square-number',
    name: 'Square Number Encoding',
    description: 'Perfect square encoding',
    emoji: '□',
    category: 'patterns',
    encode: encoders.encodeSquareNumber,
    reversible: false,
    tags: ['patterns', 'mathematical', 'square']
  },
  {
    id: 'hexagram-pattern',
    name: 'Hexagram Pattern',
    description: 'I-Ching style patterns',
    emoji: '☯',
    category: 'patterns',
    encode: encoders.encodeHexagramPattern,
    reversible: false,
    tags: ['patterns', 'iching', 'mystical']
  },
  {
    id: 'binary-tree',
    name: 'Binary Tree Path',
    description: 'Left/right tree traversal',
    emoji: '🌳',
    category: 'patterns',
    encode: encoders.encodeBinaryTree,
    decode: encoders.decodeBinaryTree,
    reversible: true,
    tags: ['patterns', 'tree', 'path']
  },
  {
    id: 'matrix-coord',
    name: 'Matrix Coordinates',
    description: 'Row/column coordinate encoding',
    emoji: '📐',
    category: 'patterns',
    encode: encoders.encodeMatrixCoord,
    decode: encoders.decodeMatrixCoord,
    reversible: true,
    tags: ['patterns', 'matrix', 'coordinates']
  },
  {
    id: 'spiral',
    name: 'Spiral Pattern',
    description: 'Spiral rotation encoding',
    emoji: '🌀',
    category: 'patterns',
    encode: encoders.encodeSpiral,
    reversible: false,
    tags: ['patterns', 'spiral', 'geometric']
  },
  {
    id: 'wave-pattern',
    name: 'Wave Pattern',
    description: 'Sinusoidal wave encoding',
    emoji: '〰️',
    category: 'patterns',
    encode: encoders.encodeWavePattern,
    reversible: false,
    tags: ['patterns', 'wave', 'sinusoidal']
  },
  {
    id: 'fractal',
    name: 'Fractal Pattern',
    description: 'Self-similar fractal encoding',
    emoji: '❄️',
    category: 'patterns',
    encode: encoders.encodeFractal,
    reversible: false,
    tags: ['patterns', 'fractal', 'geometric']
  },
  {
    id: 'pascal',
    name: 'Pascal Triangle',
    description: "Pascal's triangle encoding",
    emoji: '▲',
    category: 'patterns',
    encode: encoders.encodePascal,
    reversible: false,
    tags: ['patterns', 'pascal', 'mathematical']
  },
  {
    id: 'rule30',
    name: 'Rule 30 Automaton',
    description: 'Cellular automaton encoding',
    emoji: '🤖',
    category: 'patterns',
    encode: encoders.encodeRule30,
    reversible: false,
    tags: ['patterns', 'automaton', 'cellular']
  },
  {
    id: 'checksum',
    name: 'Checksum Encoding',
    description: 'Hex with checksum verification',
    emoji: '✓',
    category: 'patterns',
    encode: encoders.encodeChecksum,
    reversible: false,
    tags: ['patterns', 'checksum', 'verification']
  },
  {
    id: 'crc',
    name: 'CRC Pattern',
    description: 'CRC-like error checking',
    emoji: '∑',
    category: 'patterns',
    encode: encoders.encodeCRC,
    reversible: false,
    tags: ['patterns', 'crc', 'error-checking']
  },
  {
    id: 'hamming',
    name: 'Hamming Code (7,4)',
    description: 'Error-correcting Hamming code',
    emoji: 'H',
    category: 'patterns',
    encode: encoders.encodeHamming,
    reversible: false,
    tags: ['patterns', 'hamming', 'error-correction']
  },
  {
    id: 'gray-code',
    name: 'Gray Code',
    description: 'Single-bit change encoding',
    emoji: '◐',
    category: 'patterns',
    encode: encoders.encodeGrayCode,
    decode: encoders.decodeGrayCode,
    reversible: true,
    tags: ['patterns', 'gray', 'binary']
  },
  {
    id: 'manchester',
    name: 'Manchester Encoding',
    description: 'Clock + data signal encoding',
    emoji: '↕️',
    category: 'patterns',
    encode: encoders.encodeManchester,
    decode: encoders.decodeManchester,
    reversible: true,
    tags: ['patterns', 'manchester', 'signal']
  },

  // 🔍 Forensics & Security Encoders (NEW v3.0!)
  {
    id: 'timestamp',
    name: 'Unix Timestamp',
    description: 'Encode as Unix timestamps',
    emoji: '⏰',
    category: 'forensics',
    encode: encoders.encodeTimestamp,
    decode: encoders.decodeTimestamp,
    reversible: true,
    tags: ['forensics', 'timestamp', 'time']
  },
  {
    id: 'mac-address',
    name: 'MAC Address Format',
    description: 'Network MAC address style',
    emoji: '🔌',
    category: 'forensics',
    encode: encoders.encodeMACAddress,
    reversible: false,
    tags: ['forensics', 'network', 'mac']
  },
  {
    id: 'ip-address',
    name: 'IP Address Format',
    description: 'IPv4 address encoding',
    emoji: '🌐',
    category: 'forensics',
    encode: encoders.encodeIPAddress,
    reversible: false,
    tags: ['forensics', 'network', 'ip']
  },
  {
    id: 'uuid',
    name: 'UUID Style',
    description: 'Universally unique identifier',
    emoji: '🆔',
    category: 'forensics',
    encode: encoders.encodeUUID,
    reversible: false,
    tags: ['forensics', 'uuid', 'identifier']
  },
  {
    id: 'visual-hash',
    name: 'Visual Hash',
    description: 'Graphical hash pattern',
    emoji: '#️⃣',
    category: 'forensics',
    encode: encoders.encodeVisualHash,
    reversible: false,
    tags: ['forensics', 'hash', 'visual']
  },
  {
    id: 'magic-bytes',
    name: 'Magic Bytes',
    description: 'File signature headers',
    emoji: '✨',
    category: 'forensics',
    encode: encoders.encodeMagicBytes,
    reversible: false,
    tags: ['forensics', 'magic', 'file-header']
  },
  {
    id: 'registry',
    name: 'Registry Path',
    description: 'Windows registry format',
    emoji: '📁',
    category: 'forensics',
    encode: encoders.encodeRegistryPath,
    reversible: false,
    tags: ['forensics', 'registry', 'windows']
  },
  {
    id: 'hex-dump',
    name: 'Hex Dump',
    description: 'Forensic hex dump format',
    emoji: '🔬',
    category: 'forensics',
    encode: encoders.encodeHexDump,
    reversible: false,
    tags: ['forensics', 'hexdump', 'analysis']
  },
  {
    id: 'base58',
    name: 'Base58 (Bitcoin)',
    description: 'Bitcoin-style Base58',
    emoji: '₿',
    category: 'forensics',
    encode: encoders.encodeBase58,
    decode: encoders.decodeBase58,
    reversible: true,
    tags: ['forensics', 'base58', 'bitcoin']
  },
  {
    id: 'homoglyph',
    name: 'Homoglyph Steganography',
    description: 'Similar-looking characters',
    emoji: '👀',
    category: 'forensics',
    encode: encoders.encodeHomoglyph,
    decode: encoders.decodeHomoglyph,
    reversible: true,
    tags: ['forensics', 'steganography', 'homoglyph']
  },
  {
    id: 'unicode-tag',
    name: 'Unicode Tag Steganography',
    description: 'Invisible Unicode tags',
    emoji: '🏷️',
    category: 'forensics',
    encode: encoders.encodeUnicodeTag,
    decode: encoders.decodeUnicodeTag,
    reversible: true,
    tags: ['forensics', 'steganography', 'invisible']
  },
  {
    id: 'variation-selector',
    name: 'Variation Selector',
    description: 'Unicode variation steganography',
    emoji: '🌟',
    category: 'forensics',
    encode: encoders.encodeVariationSelector,
    reversible: false,
    tags: ['forensics', 'steganography', 'unicode']
  },
  {
    id: 'metadata',
    name: 'Metadata Format',
    description: 'EXIF-like metadata tags',
    emoji: '📋',
    category: 'forensics',
    encode: encoders.encodeMetadata,
    reversible: false,
    tags: ['forensics', 'metadata', 'exif']
  },
  {
    id: 'null-byte',
    name: 'Null Byte Pattern',
    description: 'Null byte injection style',
    emoji: '∅',
    category: 'forensics',
    encode: encoders.encodeNullByte,
    decode: encoders.decodeNullByte,
    reversible: true,
    tags: ['forensics', 'null', 'security']
  },
  {
    id: 'certificate',
    name: 'Certificate Format',
    description: 'PEM certificate style',
    emoji: '🔏',
    category: 'forensics',
    encode: encoders.encodeCertificate,
    reversible: false,
    tags: ['forensics', 'certificate', 'ssl']
  },
  {
    id: 'dns-txt',
    name: 'DNS TXT Record',
    description: 'DNS record format',
    emoji: '📡',
    category: 'forensics',
    encode: encoders.encodeDNSTXT,
    reversible: false,
    tags: ['forensics', 'dns', 'record']
  },
  {
    id: 'jwt-style',
    name: 'JWT Style',
    description: 'JSON Web Token format',
    emoji: '🎫',
    category: 'forensics',
    encode: encoders.encodeJWTStyle,
    decode: encoders.decodeJWTStyle,
    reversible: true,
    tags: ['forensics', 'jwt', 'token']
  },
  {
    id: 'http-header',
    name: 'HTTP Headers',
    description: 'HTTP header format',
    emoji: '📨',
    category: 'forensics',
    encode: encoders.encodeHTTPHeader,
    reversible: false,
    tags: ['forensics', 'http', 'headers']
  },
  {
    id: 'sql-escape',
    name: 'SQL CHAR Encoding',
    description: 'SQL character encoding',
    emoji: '💾',
    category: 'forensics',
    encode: encoders.encodeSQLEscape,
    reversible: false,
    tags: ['forensics', 'sql', 'database']
  },
  {
    id: 'regex-pattern',
    name: 'Regex Escape',
    description: 'Regular expression encoding',
    emoji: '🔍',
    category: 'forensics',
    encode: encoders.encodeRegexPattern,
    decode: encoders.decodeRegexPattern,
    reversible: true,
    tags: ['forensics', 'regex', 'pattern']
  },
  {
    id: 'assembly',
    name: 'Assembly MOV',
    description: 'x86 assembly style',
    emoji: '⚙️',
    category: 'forensics',
    encode: encoders.encodeAssembly,
    reversible: false,
    tags: ['forensics', 'assembly', 'low-level']
  },

  // 🔬 Scientific Encoders (NEW v3.0!)
  {
    id: 'scientific-notation',
    name: 'Scientific Notation',
    description: 'Mantissa × 10^exponent',
    emoji: '🔬',
    category: 'scientific',
    encode: encoders.encodeScientific,
    decode: encoders.decodeScientific,
    reversible: true,
    tags: ['scientific', 'notation', 'math']
  },
  {
    id: 'physics-constants',
    name: 'Physics Constants',
    description: 'Physical constant encoding',
    emoji: '⚛️',
    category: 'scientific',
    encode: encoders.encodePhysicsConstants,
    reversible: false,
    tags: ['scientific', 'physics', 'constants']
  },
  {
    id: 'chemical-formula',
    name: 'Chemical Formula',
    description: 'Chemical compound notation',
    emoji: '⚗️',
    category: 'scientific',
    encode: encoders.encodeChemicalFormula,
    reversible: false,
    tags: ['scientific', 'chemistry', 'formula']
  },
  {
    id: 'molecular',
    name: 'Molecular Structure',
    description: 'Molecular bond notation',
    emoji: '🧪',
    category: 'scientific',
    encode: encoders.encodeMolecular,
    reversible: false,
    tags: ['scientific', 'molecular', 'bonds']
  },
  {
    id: 'electron-config',
    name: 'Electron Configuration',
    description: 'Atomic orbital notation',
    emoji: '⚡',
    category: 'scientific',
    encode: encoders.encodeElectronConfig,
    reversible: false,
    tags: ['scientific', 'electron', 'orbital']
  },
  {
    id: 'quantum-state',
    name: 'Quantum State',
    description: 'Qubit state notation',
    emoji: '🔮',
    category: 'scientific',
    encode: encoders.encodeQuantumState,
    reversible: false,
    tags: ['scientific', 'quantum', 'physics']
  },
  {
    id: 'calculus',
    name: 'Calculus Notation',
    description: 'Mathematical operators',
    emoji: '∫',
    category: 'scientific',
    encode: encoders.encodeCalculus,
    reversible: false,
    tags: ['scientific', 'calculus', 'math']
  },
  {
    id: 'matrix-notation',
    name: 'Matrix Notation',
    description: '2x2 matrix format',
    emoji: '⎡⎤',
    category: 'scientific',
    encode: encoders.encodeMatrix,
    reversible: false,
    tags: ['scientific', 'matrix', 'linear-algebra']
  },
  {
    id: 'vector-notation',
    name: 'Vector Notation',
    description: '3D vector format',
    emoji: '→',
    category: 'scientific',
    encode: encoders.encodeVector,
    decode: encoders.decodeVector,
    reversible: true,
    tags: ['scientific', 'vector', 'math']
  },
  {
    id: 'complex-number',
    name: 'Complex Numbers',
    description: 'Real + imaginary format',
    emoji: 'i',
    category: 'scientific',
    encode: encoders.encodeComplex,
    decode: encoders.decodeComplex,
    reversible: true,
    tags: ['scientific', 'complex', 'imaginary']
  },
  {
    id: 'polar-coord',
    name: 'Polar Coordinates',
    description: 'Radius + angle format',
    emoji: '🎯',
    category: 'scientific',
    encode: encoders.encodePolar,
    reversible: false,
    tags: ['scientific', 'polar', 'coordinates']
  },
  {
    id: 'periodic-table',
    name: 'Periodic Table Names',
    description: 'Full element names',
    emoji: '⚛️',
    category: 'scientific',
    encode: encoders.encodePeriodicTable,
    reversible: false,
    tags: ['scientific', 'periodic', 'elements']
  },
  {
    id: 'si-units',
    name: 'SI Units',
    description: 'Metric unit encoding',
    emoji: '📏',
    category: 'scientific',
    encode: encoders.encodeSIUnits,
    reversible: false,
    tags: ['scientific', 'units', 'metric']
  },
  {
    id: 'astronomical',
    name: 'Astronomical Coords',
    description: 'RA/DEC coordinates',
    emoji: '🌌',
    category: 'scientific',
    encode: encoders.encodeAstronomical,
    reversible: false,
    tags: ['scientific', 'astronomy', 'coordinates']
  },
  {
    id: 'wave-function',
    name: 'Wave Function',
    description: 'Amplitude/frequency notation',
    emoji: '〜',
    category: 'scientific',
    encode: encoders.encodeWaveFunction,
    reversible: false,
    tags: ['scientific', 'wave', 'physics']
  },
  {
    id: 'statistics',
    name: 'Statistical Notation',
    description: 'Statistical symbols',
    emoji: 'σ',
    category: 'scientific',
    encode: encoders.encodeStatistics,
    reversible: false,
    tags: ['scientific', 'statistics', 'math']
  },
  {
    id: 'thermodynamic',
    name: 'Thermodynamic',
    description: 'Thermodynamic variables',
    emoji: '🌡️',
    category: 'scientific',
    encode: encoders.encodeThermodynamic,
    reversible: false,
    tags: ['scientific', 'thermodynamics', 'physics']
  },
  {
    id: 'logic-gates',
    name: 'Logic Gates',
    description: 'Boolean logic encoding',
    emoji: '🔲',
    category: 'scientific',
    encode: encoders.encodeLogicGates,
    reversible: false,
    tags: ['scientific', 'logic', 'boolean']
  },
  {
    id: 'tensor',
    name: 'Tensor Notation',
    description: 'Tensor index notation',
    emoji: '⊗',
    category: 'scientific',
    encode: encoders.encodeTensor,
    reversible: false,
    tags: ['scientific', 'tensor', 'math']
  },
  {
    id: 'set-theory',
    name: 'Set Theory',
    description: 'Set notation encoding',
    emoji: '∈',
    category: 'scientific',
    encode: encoders.encodeSetTheory,
    reversible: false,
    tags: ['scientific', 'set', 'math']
  },
  {
    id: 'geometry-notation',
    name: 'Geometry Notation',
    description: 'Geometric symbols',
    emoji: '📐',
    category: 'scientific',
    encode: encoders.encodeGeometry,
    reversible: false,
    tags: ['scientific', 'geometry', 'shapes']
  },
  {
    id: 'number-theory',
    name: 'Number Theory',
    description: 'Divisor notation',
    emoji: '÷',
    category: 'scientific',
    encode: encoders.encodeNumberTheory,
    reversible: false,
    tags: ['scientific', 'number-theory', 'divisors']
  },

  // 📱 Modern Tech Encoders (NEW v3.0!)
  {
    id: 'code128',
    name: 'Code128 Barcode',
    description: 'Barcode pattern encoding',
    emoji: '▐',
    category: 'modern',
    encode: encoders.encodeCode128,
    reversible: false,
    tags: ['modern', 'barcode', 'visual']
  },
  {
    id: 'datamatrix',
    name: 'DataMatrix',
    description: '2D barcode pattern',
    emoji: '⬛',
    category: 'modern',
    encode: encoders.encodeDataMatrix,
    reversible: false,
    tags: ['modern', 'datamatrix', '2d-barcode']
  },
  {
    id: 'pdf417',
    name: 'PDF417 Pattern',
    description: 'PDF417 barcode style',
    emoji: '📊',
    category: 'modern',
    encode: encoders.encodePDF417,
    reversible: false,
    tags: ['modern', 'pdf417', 'barcode']
  },
  {
    id: 'hashtag',
    name: 'Hashtag Encoding',
    description: 'Social media hashtags',
    emoji: '#️⃣',
    category: 'modern',
    encode: encoders.encodeHashtag,
    reversible: false,
    tags: ['modern', 'hashtag', 'social']
  },
  {
    id: 'emoji-reaction',
    name: 'Emoji Reactions',
    description: 'Social media reactions',
    emoji: '👍',
    category: 'modern',
    encode: encoders.encodeEmojiReaction,
    reversible: false,
    tags: ['modern', 'emoji', 'reactions']
  },
  {
    id: 'mention',
    name: '@Mention Format',
    description: 'Social media mentions',
    emoji: '@',
    category: 'modern',
    encode: encoders.encodeMention,
    reversible: false,
    tags: ['modern', 'mention', 'social']
  },
  {
    id: 'short-url',
    name: 'Short URL Style',
    description: 'URL shortener format',
    emoji: '🔗',
    category: 'modern',
    encode: encoders.encodeShortURL,
    reversible: false,
    tags: ['modern', 'url', 'shortener']
  },
  {
    id: 'git-commit',
    name: 'Git Commit Hash',
    description: 'Git-style commit IDs',
    emoji: '📝',
    category: 'modern',
    encode: encoders.encodeGitCommit,
    decode: encoders.decodeGitCommit,
    reversible: true,
    tags: ['modern', 'git', 'commit']
  },
  {
    id: 'json-path',
    name: 'JSON Path',
    description: 'JSON path notation',
    emoji: '{}',
    category: 'modern',
    encode: encoders.encodeJSONPath,
    reversible: false,
    tags: ['modern', 'json', 'path']
  },
  {
    id: 'css-color',
    name: 'CSS Color',
    description: 'Hex color codes',
    emoji: '🎨',
    category: 'modern',
    encode: encoders.encodeCSSColor,
    decode: encoders.decodeCSSColor,
    reversible: true,
    tags: ['modern', 'css', 'color']
  },
  {
    id: 'pixel-coord',
    name: 'Pixel Coordinates',
    description: 'Screen pixel positions',
    emoji: '📺',
    category: 'modern',
    encode: encoders.encodePixelCoord,
    reversible: false,
    tags: ['modern', 'pixel', 'coordinates']
  },
  {
    id: 'api-endpoint',
    name: 'API Endpoint',
    description: 'REST API format',
    emoji: '🔌',
    category: 'modern',
    encode: encoders.encodeAPIEndpoint,
    reversible: false,
    tags: ['modern', 'api', 'rest']
  },
  {
    id: 'cron',
    name: 'Cron Expression',
    description: 'Cron schedule format',
    emoji: '⏰',
    category: 'modern',
    encode: encoders.encodeCron,
    reversible: false,
    tags: ['modern', 'cron', 'schedule']
  },
  {
    id: 'version',
    name: 'SemVer Version',
    description: 'Semantic versioning',
    emoji: 'v',
    category: 'modern',
    encode: encoders.encodeVersion,
    decode: encoders.decodeVersion,
    reversible: true,
    tags: ['modern', 'version', 'semver']
  },
  {
    id: 'log-level',
    name: 'Log Level Format',
    description: 'Application log style',
    emoji: '📋',
    category: 'modern',
    encode: encoders.encodeLogLevel,
    reversible: false,
    tags: ['modern', 'log', 'debug']
  },
  {
    id: 'env-var',
    name: 'Environment Variables',
    description: 'ENV var format',
    emoji: '🔧',
    category: 'modern',
    encode: encoders.encodeEnvVar,
    reversible: false,
    tags: ['modern', 'env', 'config']
  },
  {
    id: 'docker-tag',
    name: 'Docker Tags',
    description: 'Container image tags',
    emoji: '🐳',
    category: 'modern',
    encode: encoders.encodeDockerTag,
    reversible: false,
    tags: ['modern', 'docker', 'container']
  },
  {
    id: 'k8s-label',
    name: 'Kubernetes Labels',
    description: 'K8s label format',
    emoji: '☸️',
    category: 'modern',
    encode: encoders.encodeK8sLabel,
    reversible: false,
    tags: ['modern', 'kubernetes', 'labels']
  },
  {
    id: 'wifi-signal',
    name: 'WiFi Signal',
    description: 'Signal strength pattern',
    emoji: '📶',
    category: 'modern',
    encode: encoders.encodeWiFiSignal,
    reversible: false,
    tags: ['modern', 'wifi', 'signal']
  },
  {
    id: 'battery',
    name: 'Battery Level',
    description: 'Battery indicator',
    emoji: '🔋',
    category: 'modern',
    encode: encoders.encodeBattery,
    reversible: false,
    tags: ['modern', 'battery', 'indicator']
  },
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    description: 'Loading bar pattern',
    emoji: '▓',
    category: 'modern',
    encode: encoders.encodeProgressBar,
    reversible: false,
    tags: ['modern', 'progress', 'loading']
  },
  {
    id: 'notification-badge',
    name: 'Notification Badge',
    description: 'App notification style',
    emoji: '🔔',
    category: 'modern',
    encode: encoders.encodeNotificationBadge,
    reversible: false,
    tags: ['modern', 'notification', 'badge']
  },
  {
    id: 'status-indicator',
    name: 'Status Indicator',
    description: 'Online/offline status',
    emoji: '🟢',
    category: 'modern',
    encode: encoders.encodeStatus,
    reversible: false,
    tags: ['modern', 'status', 'online']
  },
  {
    id: 'file-size',
    name: 'File Size',
    description: 'Byte size format',
    emoji: '📁',
    category: 'modern',
    encode: encoders.encodeFileSize,
    reversible: false,
    tags: ['modern', 'file', 'size']
  },
  {
    id: 'rating',
    name: 'Star Rating',
    description: '5-star rating format',
    emoji: '⭐',
    category: 'modern',
    encode: encoders.encodeRating,
    reversible: false,
    tags: ['modern', 'rating', 'stars']
  },
  {
    id: 'checkbox',
    name: 'Checkbox Todo',
    description: 'Task checkbox format',
    emoji: '☑️',
    category: 'modern',
    encode: encoders.encodeCheckbox,
    reversible: false,
    tags: ['modern', 'checkbox', 'todo']
  },

  // 🌿 Nature & Biology Encoders (NEW v3.0!)
  {
    id: 'rna',
    name: 'RNA Sequence',
    description: 'AUGC base encoding',
    emoji: '🧬',
    category: 'nature',
    encode: encoders.encodeRNA,
    decode: encoders.decodeRNA,
    reversible: true,
    tags: ['nature', 'rna', 'biology']
  },
  {
    id: 'amino-acid',
    name: 'Amino Acid Sequence',
    description: 'Protein sequence encoding',
    emoji: '🥩',
    category: 'nature',
    encode: encoders.encodeAminoAcid,
    reversible: false,
    tags: ['nature', 'protein', 'biology']
  },
  {
    id: 'codon',
    name: 'Codon Triplets',
    description: 'Genetic codon encoding',
    emoji: '🧪',
    category: 'nature',
    encode: encoders.encodeCodon,
    reversible: false,
    tags: ['nature', 'codon', 'genetics']
  },
  {
    id: 'plant-taxonomy',
    name: 'Plant Taxonomy',
    description: 'Botanical species names',
    emoji: '🌱',
    category: 'nature',
    encode: encoders.encodePlantTaxonomy,
    reversible: false,
    tags: ['nature', 'plant', 'taxonomy']
  },
  {
    id: 'animal-taxonomy',
    name: 'Animal Taxonomy',
    description: 'Zoological species names',
    emoji: '🦁',
    category: 'nature',
    encode: encoders.encodeAnimalTaxonomy,
    reversible: false,
    tags: ['nature', 'animal', 'taxonomy']
  },
  {
    id: 'constellation',
    name: 'Constellation',
    description: 'Star constellation encoding',
    emoji: '⭐',
    category: 'nature',
    encode: encoders.encodeConstellation,
    reversible: false,
    tags: ['nature', 'constellation', 'astronomy']
  },
  {
    id: 'mineral',
    name: 'Mineral Encoding',
    description: 'Geological mineral names',
    emoji: '💎',
    category: 'nature',
    encode: encoders.encodeMineral,
    reversible: false,
    tags: ['nature', 'mineral', 'geology']
  },
  {
    id: 'geological-era',
    name: 'Geological Era',
    description: 'Earth history periods',
    emoji: '🌍',
    category: 'nature',
    encode: encoders.encodeGeologicalEra,
    reversible: false,
    tags: ['nature', 'geology', 'era']
  },
  {
    id: 'flower',
    name: 'Flower Encoding',
    description: 'Botanical flower names',
    emoji: '🌸',
    category: 'nature',
    encode: encoders.encodeFlower,
    reversible: false,
    tags: ['nature', 'flower', 'botanical']
  },
  {
    id: 'butterfly-wing',
    name: 'Butterfly Wing',
    description: 'Wing pattern encoding',
    emoji: '🦋',
    category: 'nature',
    encode: encoders.encodeButterflyWing,
    reversible: false,
    tags: ['nature', 'butterfly', 'pattern']
  },
  {
    id: 'seashell',
    name: 'Seashell Pattern',
    description: 'Shell type encoding',
    emoji: '🐚',
    category: 'nature',
    encode: encoders.encodeSeashell,
    reversible: false,
    tags: ['nature', 'seashell', 'marine']
  },
  {
    id: 'cloud-type',
    name: 'Cloud Type',
    description: 'Meteorological clouds',
    emoji: '☁️',
    category: 'nature',
    encode: encoders.encodeCloudType,
    reversible: false,
    tags: ['nature', 'cloud', 'weather']
  },
  {
    id: 'terrain',
    name: 'Terrain Features',
    description: 'Geographic features',
    emoji: '🏔️',
    category: 'nature',
    encode: encoders.encodeTerrain,
    reversible: false,
    tags: ['nature', 'terrain', 'geography']
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem',
    description: 'Biome encoding',
    emoji: '🌲',
    category: 'nature',
    encode: encoders.encodeEcosystem,
    reversible: false,
    tags: ['nature', 'ecosystem', 'biome']
  },
  {
    id: 'bird-call',
    name: 'Bird Call',
    description: 'Avian vocalization',
    emoji: '🐦',
    category: 'nature',
    encode: encoders.encodeBirdCall,
    reversible: false,
    tags: ['nature', 'bird', 'sound']
  },
  {
    id: 'paw-print',
    name: 'Paw Print',
    description: 'Animal track pattern',
    emoji: '🐾',
    category: 'nature',
    encode: encoders.encodePawPrint,
    reversible: false,
    tags: ['nature', 'paw', 'animal']
  },
  {
    id: 'leaf-pattern',
    name: 'Leaf Pattern',
    description: 'Botanical leaf encoding',
    emoji: '🍃',
    category: 'nature',
    encode: encoders.encodeLeafPattern,
    reversible: false,
    tags: ['nature', 'leaf', 'botanical']
  },
  {
    id: 'crystal-structure',
    name: 'Crystal Structure',
    description: 'Crystallographic encoding',
    emoji: '💎',
    category: 'nature',
    encode: encoders.encodeCrystalStructure,
    reversible: false,
    tags: ['nature', 'crystal', 'mineralogy']
  },
  {
    id: 'ocean-depth',
    name: 'Ocean Depth Zones',
    description: 'Pelagic zone encoding',
    emoji: '🌊',
    category: 'nature',
    encode: encoders.encodeOceanDepth,
    reversible: false,
    tags: ['nature', 'ocean', 'marine']
  },
  {
    id: 'insect',
    name: 'Insect Encoding',
    description: 'Entomological encoding',
    emoji: '🐜',
    category: 'nature',
    encode: encoders.encodeInsect,
    reversible: false,
    tags: ['nature', 'insect', 'entomology']
  },
  {
    id: 'volcano',
    name: 'Volcano Activity',
    description: 'Volcanic activity encoding',
    emoji: '🌋',
    category: 'nature',
    encode: encoders.encodeVolcano,
    reversible: false,
    tags: ['nature', 'volcano', 'geology']
  },
  {
    id: 'cell-organelle',
    name: 'Cell Organelle',
    description: 'Cellular structure encoding',
    emoji: '🔬',
    category: 'nature',
    encode: encoders.encodeCellOrganelle,
    reversible: false,
    tags: ['nature', 'cell', 'biology']
  },

  // 🎮 Game & Entertainment Encoders (NEW v3.0!)
  {
    id: 'tetris',
    name: 'Tetris Blocks',
    description: 'Tetromino encoding',
    emoji: '🟦',
    category: 'games',
    encode: encoders.encodeTetris,
    reversible: false,
    tags: ['games', 'tetris', 'puzzle']
  },
  {
    id: 'poker-hand',
    name: 'Poker Hand',
    description: 'Playing card hands',
    emoji: '♠️',
    category: 'games',
    encode: encoders.encodePokerHand,
    decode: encoders.decodePokerHand,
    reversible: true,
    tags: ['games', 'poker', 'cards']
  },
  {
    id: 'rpg-stats',
    name: 'RPG Stats',
    description: 'Character attributes',
    emoji: '⚔️',
    category: 'games',
    encode: encoders.encodeRPGStats,
    reversible: false,
    tags: ['games', 'rpg', 'stats']
  },
  {
    id: 'level-xp',
    name: 'Level/XP',
    description: 'Experience points',
    emoji: '📊',
    category: 'games',
    encode: encoders.encodeLevelXP,
    reversible: false,
    tags: ['games', 'level', 'xp']
  },
  {
    id: 'achievement-badge',
    name: 'Achievement Badge',
    description: 'Gaming achievements',
    emoji: '🏆',
    category: 'games',
    encode: encoders.encodeAchievement,
    reversible: false,
    tags: ['games', 'achievement', 'badge']
  },
  {
    id: 'health-bar',
    name: 'Health Bar',
    description: 'HP bar visualization',
    emoji: '❤️',
    category: 'games',
    encode: encoders.encodeHealthBar,
    reversible: false,
    tags: ['games', 'health', 'hp']
  },
  {
    id: 'slot-machine',
    name: 'Slot Machine',
    description: 'Casino slot symbols',
    emoji: '🎰',
    category: 'games',
    encode: encoders.encodeSlotMachine,
    reversible: false,
    tags: ['games', 'slot', 'casino']
  },
  {
    id: 'crossword',
    name: 'Crossword Clue',
    description: 'Crossword puzzle format',
    emoji: '📝',
    category: 'games',
    encode: encoders.encodeCrossword,
    reversible: false,
    tags: ['games', 'crossword', 'puzzle']
  },
  {
    id: 'sudoku',
    name: 'Sudoku Grid',
    description: 'Number puzzle grid',
    emoji: '🔢',
    category: 'games',
    encode: encoders.encodeSudoku,
    reversible: false,
    tags: ['games', 'sudoku', 'puzzle']
  },
  {
    id: 'pacman',
    name: 'Pacman Pattern',
    description: 'Arcade game symbols',
    emoji: 'ᗧ',
    category: 'games',
    encode: encoders.encodePacman,
    reversible: false,
    tags: ['games', 'pacman', 'arcade']
  },
  {
    id: 'mario-block',
    name: 'Mario Blocks',
    description: 'Platform game blocks',
    emoji: '❓',
    category: 'games',
    encode: encoders.encodeMarioBlock,
    reversible: false,
    tags: ['games', 'mario', 'platform']
  },
  {
    id: 'rubiks-cube',
    name: "Rubik's Cube Moves",
    description: 'Cube notation',
    emoji: '🟩',
    category: 'games',
    encode: encoders.encodeRubiksCube,
    decode: encoders.decodeRubiksCube,
    reversible: true,
    tags: ['games', 'rubiks', 'puzzle']
  },
  {
    id: 'dungeon-map',
    name: 'Dungeon Map',
    description: 'Roguelike map symbols',
    emoji: '🗺️',
    category: 'games',
    encode: encoders.encodeDungeonMap,
    reversible: false,
    tags: ['games', 'dungeon', 'rpg']
  },
  {
    id: 'pokemon-type',
    name: 'Pokemon Types',
    description: 'Element type encoding',
    emoji: '🔥',
    category: 'games',
    encode: encoders.encodePokemonType,
    reversible: false,
    tags: ['games', 'pokemon', 'type']
  },
  {
    id: 'trading-card',
    name: 'Trading Card',
    description: 'CCG card format',
    emoji: '🃏',
    category: 'games',
    encode: encoders.encodeTradingCard,
    reversible: false,
    tags: ['games', 'card', 'trading']
  },
  {
    id: 'scoreboard',
    name: 'Scoreboard',
    description: 'Game score display',
    emoji: '🏅',
    category: 'games',
    encode: encoders.encodeScoreboard,
    reversible: false,
    tags: ['games', 'score', 'rank']
  },
  {
    id: 'controller-input',
    name: 'Controller Input',
    description: 'Button press sequence',
    emoji: '🎮',
    category: 'games',
    encode: encoders.encodeControllerInput,
    reversible: false,
    tags: ['games', 'controller', 'input']
  },
  {
    id: 'inventory',
    name: 'Inventory Slot',
    description: 'Game item inventory',
    emoji: '🎒',
    category: 'games',
    encode: encoders.encodeInventory,
    reversible: false,
    tags: ['games', 'inventory', 'items']
  },
  {
    id: 'quest-log',
    name: 'Quest Log',
    description: 'Quest tracker format',
    emoji: '📜',
    category: 'games',
    encode: encoders.encodeQuestLog,
    reversible: false,
    tags: ['games', 'quest', 'rpg']
  },
  {
    id: 'skill-tree',
    name: 'Skill Tree',
    description: 'Ability progression',
    emoji: '🌟',
    category: 'games',
    encode: encoders.encodeSkillTree,
    reversible: false,
    tags: ['games', 'skill', 'rpg']
  },
  {
    id: 'mini-map',
    name: 'Mini Map',
    description: 'Miniature map grid',
    emoji: '🗺️',
    category: 'games',
    encode: encoders.encodeMiniMap,
    reversible: false,
    tags: ['games', 'map', 'navigation']
  },
  {
    id: 'combo-move',
    name: 'Combo Move',
    description: 'Fighting game combo',
    emoji: '💥',
    category: 'games',
    encode: encoders.encodeComboMove,
    reversible: false,
    tags: ['games', 'combo', 'fighting']
  },
  {
    id: 'leaderboard',
    name: 'Leaderboard',
    description: 'High score rankings',
    emoji: '🥇',
    category: 'games',
    encode: encoders.encodeLeaderboard,
    reversible: false,
    tags: ['games', 'leaderboard', 'rank']
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
  custom: { emoji: '🎨', name: 'Custom', description: 'User-created custom encoders' },
  linguistic: { emoji: '🌍', name: 'Linguistic', description: 'Language and alphabet encodings' },
  fantasy: { emoji: '🧙', name: 'Fantasy', description: 'Fictional and fantasy scripts' },
  visual: { emoji: '👁️', name: 'Visual', description: 'Visual and geometric encodings' },
  retro: { emoji: '📟', name: 'Retro', description: 'Vintage and retro encodings' },
  ancient: { emoji: '🏛️', name: 'Ancient', description: 'Ancient scripts and writing systems' },
  aesthetic: { emoji: '✨', name: 'Aesthetic', description: 'Stylized text encodings' },
  patterns: { emoji: '📊', name: 'Patterns', description: 'Mathematical and pattern-based encodings' },
  forensics: { emoji: '🔍', name: 'Forensics', description: 'Digital forensics and security encodings' },
  scientific: { emoji: '🔬', name: 'Scientific', description: 'Science and math notation encodings' },
  modern: { emoji: '📱', name: 'Modern Tech', description: 'Modern technology and social media encodings' },
  nature: { emoji: '🌿', name: 'Nature', description: 'Nature, biology, and ecological encodings' },
  games: { emoji: '🎮', name: 'Games', description: 'Gaming and entertainment encodings' }
};
