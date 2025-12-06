/**
 * Cultural Encoders
 * Encoders based on various cultural writing systems and codes
 * 
 * Refactored to use shared utilities from shared.js where applicable.
 */

import { createMapEncoder } from './shared.js';

// ============================================
// JAPANESE ENCODINGS
// ============================================

// Hiragana mapping (basic phonetic)
const HIRAGANA_MAP = {
  'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
  'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
  'sa': 'さ', 'si': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
  'ta': 'た', 'ti': 'ち', 'tu': 'つ', 'te': 'て', 'to': 'と',
  'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
  'ha': 'は', 'hi': 'ひ', 'hu': 'ふ', 'he': 'へ', 'ho': 'ほ',
  'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
  'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
  'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
  'wa': 'わ', 'wo': 'を', 'n': 'ん',
  'b': 'べ', 'c': 'くぇ', 'd': 'で', 'f': 'ふ', 'g': 'げ',
  'h': 'へ', 'j': 'じ', 'k': 'け', 'l': 'る', 'm': 'む',
  'p': 'ぺ', 'q': 'く', 'r': 'る', 's': 'す', 't': 'て',
  'v': 'ヴ', 'w': 'う', 'x': 'くす', 'y': 'い', 'z': 'ず'
};

// Katakana mapping (single chars)
const KATAKANA_MAP = {
  'a': 'ア', 'b': 'ブ', 'c': 'チ', 'd': 'ド', 'e': 'エ', 'f': 'フ',
  'g': 'グ', 'h': 'ハ', 'i': 'イ', 'j': 'ジ', 'k': 'ク', 'l': 'ル',
  'm': 'ム', 'n': 'ン', 'o': 'オ', 'p': 'プ', 'q': 'キュ', 'r': 'ル',
  's': 'ス', 't': 'ト', 'u': 'ウ', 'v': 'ヴ', 'w': 'ワ', 'x': 'クス',
  'y': 'イ', 'z': 'ズ'
};

/**
 * Encode text to Hiragana-style using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Hiragana encoded text
 */
export const encodeHiragana = createMapEncoder(HIRAGANA_MAP, { lowercase: true });

/**
 * Encode text to Katakana-style using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Katakana encoded text
 */
export const encodeKatakana = createMapEncoder(KATAKANA_MAP, { lowercase: true });

// ============================================
// ARABIC STYLE
// ============================================

const ARABIC_MAP = {
  'a': 'ا', 'b': 'ب', 'c': 'ث', 'd': 'د', 'e': 'ع', 'f': 'ف',
  'g': 'غ', 'h': 'ه', 'i': 'ي', 'j': 'ج', 'k': 'ك', 'l': 'ل',
  'm': 'م', 'n': 'ن', 'o': 'و', 'p': 'پ', 'q': 'ق', 'r': 'ر',
  's': 'س', 't': 'ت', 'u': 'ۆ', 'v': 'ڤ', 'w': 'و', 'x': 'خ',
  'y': 'ي', 'z': 'ز'
};

/**
 * Encode to Arabic-style letters using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Arabic-style encoded text
 */
export const encodeArabicStyle = createMapEncoder(ARABIC_MAP, { lowercase: true });

// ============================================
// THAI STYLE
// ============================================

const THAI_MAP = {
  'a': 'ก', 'b': 'ข', 'c': 'ค', 'd': 'ง', 'e': 'จ', 'f': 'ฉ',
  'g': 'ช', 'h': 'ซ', 'i': 'ฌ', 'j': 'ญ', 'k': 'ฎ', 'l': 'ฏ',
  'm': 'ฐ', 'n': 'ฑ', 'o': 'ฒ', 'p': 'ณ', 'q': 'ด', 'r': 'ต',
  's': 'ถ', 't': 'ท', 'u': 'ธ', 'v': 'น', 'w': 'บ', 'x': 'ป',
  'y': 'ผ', 'z': 'ฝ'
};

/**
 * Encode to Thai-style letters using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Thai-style encoded text
 */
export const encodeThaiStyle = createMapEncoder(THAI_MAP, { lowercase: true });

// ============================================
// DEVANAGARI (HINDI) STYLE
// ============================================

const DEVANAGARI_MAP = {
  'a': 'अ', 'b': 'ब', 'c': 'च', 'd': 'द', 'e': 'ए', 'f': 'फ',
  'g': 'ग', 'h': 'ह', 'i': 'इ', 'j': 'ज', 'k': 'क', 'l': 'ल',
  'm': 'म', 'n': 'न', 'o': 'ओ', 'p': 'प', 'q': 'क़', 'r': 'र',
  's': 'स', 't': 'त', 'u': 'उ', 'v': 'व', 'w': 'व', 'x': 'क्ष',
  'y': 'य', 'z': 'ज़'
};

/**
 * Encode to Devanagari-style letters using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Devanagari-style encoded text
 */
export const encodeDevanagari = createMapEncoder(DEVANAGARI_MAP, { lowercase: true });

// ============================================
// BENGALI STYLE
// ============================================

const BENGALI_MAP = {
  'a': 'অ', 'b': 'ব', 'c': 'চ', 'd': 'দ', 'e': 'এ', 'f': 'ফ',
  'g': 'গ', 'h': 'হ', 'i': 'ই', 'j': 'জ', 'k': 'ক', 'l': 'ল',
  'm': 'ম', 'n': 'ন', 'o': 'ও', 'p': 'প', 'q': 'ক', 'r': 'র',
  's': 'স', 't': 'ত', 'u': 'উ', 'v': 'ভ', 'w': 'ওয়', 'x': 'ক্স',
  'y': 'য়', 'z': 'জ'
};

/**
 * Encode to Bengali-style letters using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Bengali-style encoded text
 */
export const encodeBengali = createMapEncoder(BENGALI_MAP, { lowercase: true });

// ============================================
// TAMIL STYLE
// ============================================

const TAMIL_MAP = {
  'a': 'அ', 'b': 'ப', 'c': 'ச', 'd': 'ட', 'e': 'எ', 'f': 'ஃப',
  'g': 'க', 'h': 'ஹ', 'i': 'இ', 'j': 'ஜ', 'k': 'க', 'l': 'ல',
  'm': 'ம', 'n': 'ந', 'o': 'ஒ', 'p': 'ப', 'q': 'க', 'r': 'ர',
  's': 'ஸ', 't': 'த', 'u': 'உ', 'v': 'வ', 'w': 'வ', 'x': 'க்ஸ',
  'y': 'ய', 'z': 'ஸ'
};

/**
 * Encode to Tamil-style letters using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Tamil-style encoded text
 */
export const encodeTamil = createMapEncoder(TAMIL_MAP, { lowercase: true });

// ============================================
// GEORGIAN STYLE
// ============================================

const GEORGIAN_MAP = {
  'a': 'ა', 'b': 'ბ', 'c': 'ც', 'd': 'დ', 'e': 'ე', 'f': 'ფ',
  'g': 'გ', 'h': 'ჰ', 'i': 'ი', 'j': 'ჯ', 'k': 'კ', 'l': 'ლ',
  'm': 'მ', 'n': 'ნ', 'o': 'ო', 'p': 'პ', 'q': 'ყ', 'r': 'რ',
  's': 'ს', 't': 'ტ', 'u': 'უ', 'v': 'ვ', 'w': 'წ', 'x': 'ხ',
  'y': 'ყ', 'z': 'ზ'
};

/**
 * Encode to Georgian-style letters using shared utility
 * @param {string} text - The text to encode
 * @returns {string} - Georgian-style encoded text
 */
export const encodeGeorgian = createMapEncoder(GEORGIAN_MAP, { lowercase: true });

// ============================================
// ARMENIAN STYLE
// ============================================

/**
 * Encode to Armenian-style letters  
 */
export const encodeArmenian = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      // Armenian lowercase letters start at U+0561
      const armenianBase = 0x0561;
      return String.fromCharCode(armenianBase + (char.charCodeAt(0) - 97));
    }
    return char;
  }).join('');
};

// ETHIOPIC STYLE
// ============================================

/**
 * Encode to Ethiopic-style letters
 */
export const encodeEthiopic = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      // Map to Ethiopic syllables (base forms)
      const ethiopicBase = 0x1200;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(ethiopicBase + (idx * 8) % 240);
    }
    return char;
  }).join('');
};

// ============================================
// TIBETAN STYLE
// ============================================

/**
 * Encode to Tibetan-style letters
 */
export const encodeTibetan = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const tibetanBase = 0x0F40;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(tibetanBase + idx % 30);
    }
    return char;
  }).join('');
};

// ============================================
// KHMER (CAMBODIAN) STYLE
// ============================================

/**
 * Encode to Khmer-style letters
 */
export const encodeKhmer = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const khmerBase = 0x1780;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(khmerBase + idx % 33);
    }
    return char;
  }).join('');
};

// ============================================
// MYANMAR (BURMESE) STYLE
// ============================================

/**
 * Encode to Myanmar-style letters
 */
export const encodeMyanmar = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const myanmarBase = 0x1000;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(myanmarBase + idx % 33);
    }
    return char;
  }).join('');
};

// ============================================
// SINHALA STYLE
// ============================================

/**
 * Encode to Sinhala-style letters
 */
export const encodeSinhala = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const sinhalaBase = 0x0D85;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(sinhalaBase + idx % 48);
    }
    return char;
  }).join('');
};

// ============================================
// TELUGU STYLE
// ============================================

/**
 * Encode to Telugu-style letters
 */
export const encodeTelugu = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const teluguBase = 0x0C05;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(teluguBase + idx % 56);
    }
    return char;
  }).join('');
};

// ============================================
// KANNADA STYLE
// ============================================

/**
 * Encode to Kannada-style letters
 */
export const encodeKannada = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const kannadaBase = 0x0C85;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(kannadaBase + idx % 56);
    }
    return char;
  }).join('');
};

// ============================================
// MALAYALAM STYLE
// ============================================

/**
 * Encode to Malayalam-style letters
 */
export const encodeMalayalam = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const malayalamBase = 0x0D05;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(malayalamBase + idx % 56);
    }
    return char;
  }).join('');
};

// ============================================
// GUJARATI STYLE
// ============================================

/**
 * Encode to Gujarati-style letters
 */
export const encodeGujarati = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const gujaratiBase = 0x0A85;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(gujaratiBase + idx % 56);
    }
    return char;
  }).join('');
};

// ============================================
// PUNJABI (GURMUKHI) STYLE
// ============================================

/**
 * Encode to Punjabi/Gurmukhi-style letters
 */
export const encodePunjabi = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const gurmukhiBase = 0x0A05;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(gurmukhiBase + idx % 52);
    }
    return char;
  }).join('');
};

// ============================================
// ORIYA STYLE
// ============================================

/**
 * Encode to Oriya-style letters
 */
export const encodeOriya = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const oriyaBase = 0x0B05;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(oriyaBase + idx % 56);
    }
    return char;
  }).join('');
};

// ============================================
// LAO STYLE
// ============================================

/**
 * Encode to Lao-style letters
 */
export const encodeLao = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const laoBase = 0x0E81;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(laoBase + idx % 45);
    }
    return char;
  }).join('');
};

// ============================================
// MONGOLIAN STYLE
// ============================================

/**
 * Encode to Mongolian-style letters
 */
export const encodeMongolian = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const mongolianBase = 0x1820;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(mongolianBase + idx % 35);
    }
    return char;
  }).join('');
};

// ============================================
// CHEROKEE STYLE
// ============================================

/**
 * Encode to Cherokee-style letters
 */
export const encodeCherokee = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const cherokeeBase = 0x13A0;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(cherokeeBase + idx % 85);
    }
    return char;
  }).join('');
};

// ============================================
// CANADIAN ABORIGINAL SYLLABICS
// ============================================

/**
 * Encode to Canadian Aboriginal Syllabics
 */
export const encodeCanadianAboriginal = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const syllabicsBase = 0x1400;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(syllabicsBase + idx * 4 % 640);
    }
    return char;
  }).join('');
};

// ============================================
// JAVANESE STYLE
// ============================================

/**
 * Encode to Javanese-style letters
 */
export const encodeJavanese = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const javaneseBase = 0xA980;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(javaneseBase + idx % 53);
    }
    return char;
  }).join('');
};

// ============================================
// BALINESE STYLE
// ============================================

/**
 * Encode to Balinese-style letters
 */
export const encodeBalinese = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const balineseBase = 0x1B00;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(balineseBase + idx % 63);
    }
    return char;
  }).join('');
};

// ============================================
// SUNDANESE STYLE
// ============================================

/**
 * Encode to Sundanese-style letters
 */
export const encodeSundanese = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      const sundaneseBase = 0x1B80;
      const idx = char.charCodeAt(0) - 97;
      return String.fromCharCode(sundaneseBase + idx % 64);
    }
    return char;
  }).join('');
};

// ============================================
// MATHEMATICAL SCRIPTS
// ============================================

/**
 * Encode to Mathematical Bold
 */
export const encodeMathBold = (text) => {
  return text.split('').map(char => {
    if (char >= 'A' && char <= 'Z') return String.fromCodePoint(0x1D400 + char.charCodeAt(0) - 65);
    if (char >= 'a' && char <= 'z') return String.fromCodePoint(0x1D41A + char.charCodeAt(0) - 97);
    if (char >= '0' && char <= '9') return String.fromCodePoint(0x1D7CE + char.charCodeAt(0) - 48);
    return char;
  }).join('');
};

/**
 * Encode to Mathematical Italic
 */
export const encodeMathItalic = (text) => {
  return text.split('').map(char => {
    if (char >= 'A' && char <= 'Z') return String.fromCodePoint(0x1D434 + char.charCodeAt(0) - 65);
    if (char >= 'a' && char <= 'z') return String.fromCodePoint(0x1D44E + char.charCodeAt(0) - 97);
    return char;
  }).join('');
};

/**
 * Encode to Mathematical Bold Italic
 */
export const encodeMathBoldItalic = (text) => {
  return text.split('').map(char => {
    if (char >= 'A' && char <= 'Z') return String.fromCodePoint(0x1D468 + char.charCodeAt(0) - 65);
    if (char >= 'a' && char <= 'z') return String.fromCodePoint(0x1D482 + char.charCodeAt(0) - 97);
    return char;
  }).join('');
};

/**
 * Encode to Mathematical Script (calligraphy)
 */
export const encodeMathScript = (text) => {
  return text.split('').map(char => {
    if (char >= 'A' && char <= 'Z') return String.fromCodePoint(0x1D49C + char.charCodeAt(0) - 65);
    if (char >= 'a' && char <= 'z') return String.fromCodePoint(0x1D4B6 + char.charCodeAt(0) - 97);
    return char;
  }).join('');
};

/**
 * Encode to Mathematical Bold Script
 */
export const encodeMathBoldScript = (text) => {
  return text.split('').map(char => {
    if (char >= 'A' && char <= 'Z') return String.fromCodePoint(0x1D4D0 + char.charCodeAt(0) - 65);
    if (char >= 'a' && char <= 'z') return String.fromCodePoint(0x1D4EA + char.charCodeAt(0) - 97);
    return char;
  }).join('');
};

/**
 * Encode to Mathematical Fraktur
 */
export const encodeMathFraktur = (text) => {
  return text.split('').map(char => {
    if (char >= 'A' && char <= 'Z') return String.fromCodePoint(0x1D504 + char.charCodeAt(0) - 65);
    if (char >= 'a' && char <= 'z') return String.fromCodePoint(0x1D51E + char.charCodeAt(0) - 97);
    return char;
  }).join('');
};

/**
 * Encode to Mathematical Bold Fraktur
 */
export const encodeMathBoldFraktur = (text) => {
  return text.split('').map(char => {
    if (char >= 'A' && char <= 'Z') return String.fromCodePoint(0x1D56C + char.charCodeAt(0) - 65);
    if (char >= 'a' && char <= 'z') return String.fromCodePoint(0x1D586 + char.charCodeAt(0) - 97);
    return char;
  }).join('');
};

/**
 * Encode to Mathematical Sans-Serif
 */
export const encodeMathSansSerif = (text) => {
  return text.split('').map(char => {
    if (char >= 'A' && char <= 'Z') return String.fromCodePoint(0x1D5A0 + char.charCodeAt(0) - 65);
    if (char >= 'a' && char <= 'z') return String.fromCodePoint(0x1D5BA + char.charCodeAt(0) - 97);
    if (char >= '0' && char <= '9') return String.fromCodePoint(0x1D7E2 + char.charCodeAt(0) - 48);
    return char;
  }).join('');
};

/**
 * Encode to Mathematical Sans-Serif Bold
 */
export const encodeMathSansSerifBold = (text) => {
  return text.split('').map(char => {
    if (char >= 'A' && char <= 'Z') return String.fromCodePoint(0x1D5D4 + char.charCodeAt(0) - 65);
    if (char >= 'a' && char <= 'z') return String.fromCodePoint(0x1D5EE + char.charCodeAt(0) - 97);
    if (char >= '0' && char <= '9') return String.fromCodePoint(0x1D7EC + char.charCodeAt(0) - 48);
    return char;
  }).join('');
};

/**
 * Encode to Mathematical Sans-Serif Italic
 */
export const encodeMathSansSerifItalic = (text) => {
  return text.split('').map(char => {
    if (char >= 'A' && char <= 'Z') return String.fromCodePoint(0x1D608 + char.charCodeAt(0) - 65);
    if (char >= 'a' && char <= 'z') return String.fromCodePoint(0x1D622 + char.charCodeAt(0) - 97);
    return char;
  }).join('');
};

/**
 * Encode to Mathematical Monospace
 */
export const encodeMathMonospace = (text) => {
  return text.split('').map(char => {
    if (char >= 'A' && char <= 'Z') return String.fromCodePoint(0x1D670 + char.charCodeAt(0) - 65);
    if (char >= 'a' && char <= 'z') return String.fromCodePoint(0x1D68A + char.charCodeAt(0) - 97);
    if (char >= '0' && char <= '9') return String.fromCodePoint(0x1D7F6 + char.charCodeAt(0) - 48);
    return char;
  }).join('');
};

// ============================================
// SPECIAL UNICODE STYLES
// ============================================

/**
 * Encode with circle overlay
 */
export const encodeCircleOverlay = (text) => {
  return text.split('').map(char => char + '\u20DD').join('');
};

/**
 * Encode with square overlay
 */
export const encodeSquareOverlay = (text) => {
  return text.split('').map(char => char + '\u20DE').join('');
};

/**
 * Encode with diamond overlay
 */
export const encodeDiamondOverlay = (text) => {
  return text.split('').map(char => char + '\u20DF').join('');
};

/**
 * Encode with double underline
 */
export const encodeDoubleUnderline = (text) => {
  return text.split('').map(char => char + '\u0333').join('');
};

/**
 * Encode with overline
 */
export const encodeOverline = (text) => {
  return text.split('').map(char => char + '\u0305').join('');
};

/**
 * Encode with double overline
 */
export const encodeDoubleOverline = (text) => {
  return text.split('').map(char => char + '\u033F').join('');
};

/**
 * Encode with slash overlay
 */
export const encodeSlashOverlay = (text) => {
  return text.split('').map(char => char + '\u0338').join('');
};

/**
 * Encode with X overlay
 */
export const encodeXOverlay = (text) => {
  return text.split('').map(char => char + '\u0337').join('');
};

// ============================================
// REGIONAL INDICATOR SYMBOLS (FLAGS)
// ============================================

/**
 * Encode to Regional Indicator Symbols
 */
export const encodeRegionalIndicators = (text) => {
  return text.toUpperCase().split('').map(char => {
    if (char >= 'A' && char <= 'Z') {
      return String.fromCodePoint(0x1F1E6 + char.charCodeAt(0) - 65);
    }
    return char;
  }).join('');
};

// ============================================
// ENCLOSED ALPHANUMERICS
// ============================================

/**
 * Encode to Negative Circled Latin
 */
export const encodeNegativeCircled = (text) => {
  return text.toUpperCase().split('').map(char => {
    if (char >= 'A' && char <= 'Z') {
      return String.fromCodePoint(0x1F150 + char.charCodeAt(0) - 65);
    }
    return char;
  }).join('');
};

/**
 * Encode to Negative Squared Latin
 */
export const encodeNegativeSquared = (text) => {
  return text.toUpperCase().split('').map(char => {
    if (char >= 'A' && char <= 'Z') {
      return String.fromCodePoint(0x1F170 + char.charCodeAt(0) - 65);
    }
    return char;
  }).join('');
};

/**
 * Encode with Smallcaps
 */
export const encodeSmallCaps = (text) => {
  const smallCaps = {
    'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ',
    'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ',
    'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'Q', 'r': 'ʀ',
    's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
    'y': 'ʏ', 'z': 'ᴢ'
  };
  return text.toLowerCase().split('').map(char => smallCaps[char] || char).join('');
};

/**
 * Encode with Subscript
 */
export const encodeSubscript = (text) => {
  const subscript = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
    'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
    'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
    'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
    'v': 'ᵥ', 'x': 'ₓ'
  };
  return text.toLowerCase().split('').map(char => subscript[char] || char).join('');
};

// ============================================
// EMOJI SEQUENCES
// ============================================

const FRUIT_EMOJIS = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒', '🍑', '🍐', '🍌', '🥝', '🍅', '🥥', '🍆', '🥑', '🥕', '🌽', '🥔', '🧅', '🥒', '🥬', '🥦', '🧄', '🧇', '🥯', '🍞', '🥖'];

/**
 * Encode with fruit emojis
 */
export const encodeFruitEmoji = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      return FRUIT_EMOJIS[char.charCodeAt(0) - 97] || char;
    }
    return char;
  }).join('');
};

const FACE_EMOJIS = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪'];

/**
 * Encode with face emojis
 */
export const encodeFaceEmoji = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      return FACE_EMOJIS[char.charCodeAt(0) - 97] || char;
    }
    return char;
  }).join('');
};

const HAND_EMOJIS = ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏'];

/**
 * Encode with hand emojis
 */
export const encodeHandEmoji = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      return HAND_EMOJIS[char.charCodeAt(0) - 97] || char;
    }
    return char;
  }).join('');
};

const HEART_EMOJIS = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️', '🫀', '💑', '💏', '👩‍❤️‍👨', '👨‍❤️‍👨', '👩‍❤️‍👩'];

/**
 * Encode with heart emojis
 */
export const encodeHeartEmoji = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      return HEART_EMOJIS[char.charCodeAt(0) - 97] || char;
    }
    return char;
  }).join('');
};

const NATURE_EMOJIS = ['🌸', '💮', '🏵️', '🌹', '🥀', '🌺', '🌻', '🌼', '🌷', '🌱', '🪴', '🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🪺', '🪹', '🪨', '🪵'];

/**
 * Encode with nature emojis
 */
export const encodeNatureEmoji = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      return NATURE_EMOJIS[char.charCodeAt(0) - 97] || char;
    }
    return char;
  }).join('');
};

const TRANSPORT_EMOJIS = ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🛵', '🏍️', '🛺', '🚲', '🛴', '🛹', '🛼', '🚁', '🛸', '✈️', '🚀', '🛶'];

/**
 * Encode with transport emojis
 */
export const encodeTransportEmoji = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      return TRANSPORT_EMOJIS[char.charCodeAt(0) - 97] || char;
    }
    return char;
  }).join('');
};

const BUILDING_EMOJIS = ['🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏯', '🏰', '💒', '🗼', '🗽', '⛪', '🕌', '🛕', '🕍', '⛩️', '🕋', '⛲', '⛺'];

/**
 * Encode with building emojis
 */
export const encodeBuildingEmoji = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      return BUILDING_EMOJIS[char.charCodeAt(0) - 97] || char;
    }
    return char;
  }).join('');
};

const TOOL_EMOJIS = ['🔧', '🪛', '🔩', '⚙️', '🗜️', '⛏️', '⚒️', '🛠️', '🪓', '🔨', '🪚', '🔪', '🗡️', '⚔️', '💣', '🪃', '🏹', '🛡️', '🔑', '🗝️', '🔐', '🔏', '🔒', '🔓', '🪤', '🧲'];

/**
 * Encode with tool emojis
 */
export const encodeToolEmoji = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      return TOOL_EMOJIS[char.charCodeAt(0) - 97] || char;
    }
    return char;
  }).join('');
};
