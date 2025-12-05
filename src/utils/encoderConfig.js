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
  aesthetic: { emoji: '✨', name: 'Aesthetic', description: 'Stylized text encodings' }
};
