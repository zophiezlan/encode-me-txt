/**
 * Communication Encoders
 * Various communication and signaling codes
 */

// ============================================
// PHONETIC ALPHABETS
// ============================================

const NATO_ALPHABET = {
  'A': 'Alfa', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
  'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliet',
  'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
  'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
  'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee', 'Z': 'Zulu',
  '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
  '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Niner'
};

/**
 * Encode using NATO phonetic with options
 */
export const encodeNATOExtended = (text, style = 1) => {
  const alphabets = {
    1: NATO_ALPHABET,
    2: { // Police/Law Enforcement
      'A': 'Adam', 'B': 'Boy', 'C': 'Charles', 'D': 'David', 'E': 'Edward',
      'F': 'Frank', 'G': 'George', 'H': 'Henry', 'I': 'Ida', 'J': 'John',
      'K': 'King', 'L': 'Lincoln', 'M': 'Mary', 'N': 'Nora', 'O': 'Ocean',
      'P': 'Paul', 'Q': 'Queen', 'R': 'Robert', 'S': 'Sam', 'T': 'Tom',
      'U': 'Union', 'V': 'Victor', 'W': 'William', 'X': 'X-ray', 'Y': 'Young', 'Z': 'Zebra'
    },
    3: { // Western Union 1912
      'A': 'Adams', 'B': 'Boston', 'C': 'Chicago', 'D': 'Denver', 'E': 'Easy',
      'F': 'Frank', 'G': 'George', 'H': 'Henry', 'I': 'Ida', 'J': 'John',
      'K': 'King', 'L': 'Lincoln', 'M': 'Mary', 'N': 'New York', 'O': 'Ocean',
      'P': 'Peter', 'Q': 'Queen', 'R': 'Roger', 'S': 'Sugar', 'T': 'Thomas',
      'U': 'Union', 'V': 'Victor', 'W': 'William', 'X': 'X-ray', 'Y': 'Young', 'Z': 'Zero'
    }
  };
  
  const alpha = alphabets[style] || alphabets[1];
  return text.toUpperCase().split('').map(char => alpha[char] || char).join(' ');
};

// ============================================
// MILITARY TIME & COORDINATES
// ============================================

/**
 * Encode text as military grid references
 */
export const encodeMilitaryGrid = (text) => {
  const gridLetters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // No I or O
  return text.toUpperCase().split('').map(char => {
    if (char >= 'A' && char <= 'Z') {
      const idx = char.charCodeAt(0) - 65;
      const col = gridLetters[idx % 8];
      const row = Math.floor(idx / 8) + 1;
      return `${col}${row}`;
    }
    if (char >= '0' && char <= '9') {
      return `N${char}`;
    }
    return char === ' ' ? '/' : char;
  }).join(' ');
};

/**
 * Encode as aviation waypoint format
 */
export const encodeWaypoint = (text) => {
  return text.toUpperCase().split(' ').map((word, idx) => {
    const code = word.slice(0, 5).padEnd(5, 'X').toUpperCase();
    return `${code}${(idx + 1).toString().padStart(2, '0')}`;
  }).join(' → ');
};

// ============================================
// RADIO CODES
// ============================================

// CB radio codes reference (for potential future decode function)
const _CB_CODES = {
  '10-1': 'Receiving poorly', '10-2': 'Receiving well', '10-3': 'Stop transmitting',
  '10-4': 'OK/Understood', '10-5': 'Relay', '10-6': 'Busy', '10-7': 'Out of service',
  '10-8': 'In service', '10-9': 'Repeat', '10-10': 'Off duty', '10-20': 'Location'
};

/**
 * Encode as CB radio style
 */
export const encodeCBRadio = (text) => {
  const words = text.toLowerCase().split(' ');
  return words.map(word => {
    if (word === 'ok' || word === 'okay') return '10-4';
    if (word === 'where') return '10-20';
    if (word === 'repeat') return '10-9';
    return word.toUpperCase();
  }).join(' BREAK ');
};

/**
 * Encode as radio operator style
 */
export const encodeRadioOperator = (text) => {
  return `CQ CQ CQ ${text.toUpperCase()} OVER`;
};

// ============================================
// TELEGRAPH/TELEX CODES
// ============================================

/**
 * Encode as teletype style
 */
export const encodeTeletype = (text) => {
  return `ZCZC ${text.toUpperCase().replace(/\s+/g, ' ')} NNNN`;
};

/**
 * Encode as wire service style
 */
export const encodeWireService = (text) => {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `URGENT ${timestamp} -- ${text.toUpperCase()} -- END`;
};

// ============================================
// MARITIME CODES
// ============================================

const MARITIME_FLAGS = {
  'A': '🔵⚪', 'B': '🔴', 'C': '🔵⚪🔴⚪🔵', 'D': '🟡🔵🟡',
  'E': '🔵🔴', 'F': '⚪🔴', 'G': '🟡🔵🟡🔵🟡🔵', 'H': '⚪🔴⚪🔴',
  'I': '🟡⚫', 'J': '🔵⚪🔵', 'K': '🟡🔵', 'L': '🟡⬛🟡⬛',
  'M': '🔵⚪🔵⚪', 'N': '⚪🔵', 'O': '🟡🔴', 'P': '🔵',
  'Q': '🟡', 'R': '🔴🟡🔴', 'S': '⚪🔵', 'T': '🔴⚪🔴',
  'U': '🔴⚪', 'V': '⚪🔴⚪🔴', 'W': '🔵⚪🔴', 'X': '⚪🔵⚪',
  'Y': '🟡🔴🟡🔴🟡🔴', 'Z': '🟡⬛🔴⬛'
};

/**
 * Encode as international maritime signal flags
 */
export const encodeMaritimeFlags = (text) => {
  return text.toUpperCase().split('').map(char => MARITIME_FLAGS[char] || char).join(' ');
};

/**
 * Encode as ship call sign
 */
export const encodeCallSign = (text) => {
  const prefix = text.slice(0, 3).toUpperCase().padEnd(3, 'X');
  const suffix = text.length.toString().padStart(4, '0');
  return `${prefix}${suffix}`;
};

// ============================================
// AVIATION CODES
// ============================================

// Aviation weather codes reference (for potential future decode function)
const _AVIATION_WEATHER = ['CAVOK', 'SKC', 'FEW', 'SCT', 'BKN', 'OVC', 'VV'];

/**
 * Encode as METAR weather format
 */
export const encodeMETAR = (text) => {
  const words = text.split(' ');
  const timestamp = new Date();
  const day = timestamp.getDate().toString().padStart(2, '0');
  const hour = timestamp.getHours().toString().padStart(2, '0');
  const minute = timestamp.getMinutes().toString().padStart(2, '0');
  
  return `METAR ${words[0]?.toUpperCase() || 'XXXX'} ${day}${hour}${minute}Z AUTO ${words.slice(1).join(' ').toUpperCase()} RMK AO2`;
};

/**
 * Encode as NOTAM format
 */
export const encodeNOTAM = (text) => {
  const id = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `A${id}/24 NOTAMN\nQ) ${text.toUpperCase()}\nE) ${text.toUpperCase()}`;
};

// ============================================
// BROADCAST CODES
// ============================================

/**
 * Encode as news ticker style
 */
export const encodeNewsTicker = (text) => {
  return `+++ BREAKING +++ ${text.toUpperCase()} +++ MORE DETAILS TO FOLLOW +++`;
};

/**
 * Encode as emergency broadcast
 */
export const encodeEmergencyBroadcast = (text) => {
  return `⚠️ THIS IS A TEST ⚠️ ${text.toUpperCase()} ⚠️ THIS IS ONLY A TEST ⚠️`;
};

/**
 * Encode as news headline
 */
export const encodeHeadline = (text) => {
  return text.split(' ').map(word => 
    word.length > 3 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase()
  ).join(' ') + ' — Reports';
};

// ============================================
// POSTAL/SHIPPING CODES
// ============================================

/**
 * Encode as postal barcode style
 */
export const encodePostalBarcode = (text) => {
  const bars = { '0': '||...', '1': '...||', '2': '..|.|', '3': '..||.', '4': '.|..|',
                 '5': '.|.|.', '6': '.||..', '7': '|...|', '8': '|..|.', '9': '|.|..' };
  
  return text.split('').map(char => {
    if (char >= '0' && char <= '9') return bars[char];
    if (char >= 'A' && char <= 'Z') return bars[(char.charCodeAt(0) - 65) % 10];
    if (char >= 'a' && char <= 'z') return bars[(char.charCodeAt(0) - 97) % 10];
    return '....';
  }).join(' ');
};

/**
 * Encode as tracking number
 */
export const encodeTrackingNumber = (text) => {
  const chars = text.replace(/\s/g, '').toUpperCase();
  const prefix = chars.slice(0, 2).padEnd(2, 'X');
  const middle = chars.slice(2).split('').map(c => 
    c.charCodeAt(0).toString().slice(-2)
  ).join('').slice(0, 9).padEnd(9, '0');
  const checkDigit = middle.split('').reduce((a, b) => a + parseInt(b), 0) % 10;
  return `${prefix}${middle}${checkDigit}XX`;
};

// ============================================
// MEDICAL/EMERGENCY CODES
// ============================================

/**
 * Encode as hospital code
 */
export const encodeHospitalCode = (text) => {
  const codes = {
    'fire': 'CODE RED', 'emergency': 'CODE BLUE', 'security': 'CODE SILVER',
    'help': 'CODE WHITE', 'danger': 'CODE ORANGE'
  };
  
  return text.split(' ').map(word => 
    codes[word.toLowerCase()] || word.toUpperCase()
  ).join(' ');
};

/**
 * Encode as EMS style
 */
export const encodeEMS = (text) => {
  const priority = text.length > 20 ? 'PRIORITY 1' : 'PRIORITY 2';
  return `${priority} DISPATCH: ${text.toUpperCase()} RESPOND IMMEDIATELY`;
};

// ============================================
// FINANCIAL/STOCK CODES
// ============================================

/**
 * Encode as stock ticker
 */
export const encodeStockTicker = (text) => {
  const words = text.split(' ');
  return words.map((word, idx) => {
    const symbol = word.slice(0, 4).toUpperCase();
    const change = (idx % 2 === 0) ? `+${(Math.random() * 5).toFixed(2)}%` : `-${(Math.random() * 3).toFixed(2)}%`;
    return `${symbol}: ${change}`;
  }).join(' | ');
};

/**
 * Encode as SWIFT code style
 */
export const encodeSWIFT = (text) => {
  const chars = text.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const bankCode = chars.slice(0, 4).padEnd(4, 'X');
  const countryCode = chars.slice(4, 6).padEnd(2, 'X');
  const locationCode = chars.slice(6, 8).padEnd(2, '0');
  const branchCode = chars.slice(8, 11).padEnd(3, 'X');
  return `${bankCode}${countryCode}${locationCode}${branchCode}`;
};

// ============================================
// LIBRARY/ACADEMIC CODES
// ============================================

/**
 * Encode as ISBN-like
 */
export const encodeISBN = (text) => {
  const nums = text.split('').map(c => c.charCodeAt(0) % 10);
  while (nums.length < 12) nums.push(0);
  const check = nums.slice(0, 12).reduce((acc, n, i) => acc + n * (i % 2 === 0 ? 1 : 3), 0);
  const checkDigit = (10 - (check % 10)) % 10;
  return `978-${nums.slice(0, 3).join('')}-${nums.slice(3, 5).join('')}-${nums.slice(5, 11).join('')}-${checkDigit}`;
};

/**
 * Encode as DOI
 */
export const encodeDOI = (text) => {
  const chars = text.replace(/\s/g, '_').toLowerCase();
  return `10.${Math.floor(Math.random() * 9999)}/${chars.slice(0, 20)}`;
};

/**
 * Encode as library call number
 */
export const encodeCallNumber = (text) => {
  const firstWord = text.split(' ')[0] || 'Unknown';
  const letter = firstWord.charAt(0).toUpperCase();
  const num = firstWord.length * 100 + text.length;
  const cutter = firstWord.slice(0, 3).toUpperCase();
  return `${letter}${num}\n.${cutter}${new Date().getFullYear()}`;
};

// ============================================
// INTERNET/NETWORK CODES
// ============================================

/**
 * Encode as HTTP status style
 */
export const encodeHTTPStatus = (text) => {
  const statuses = ['200 OK', '201 Created', '202 Accepted', '204 No Content'];
  const words = text.split(' ');
  return words.map((word, idx) => {
    const status = statuses[idx % statuses.length];
    return `[${status}] ${word}`;
  }).join(' ');
};

/**
 * Encode as log file entry
 */
export const encodeLogEntry = (text) => {
  const now = new Date();
  const timestamp = now.toISOString();
  return `[${timestamp}] [INFO] ${text}`;
};

/**
 * Encode as terminal command
 */
export const encodeTerminal = (text) => {
  return `$ echo "${text}"\n${text}`;
};

/**
 * Encode as file path
 */
export const encodeFilePath = (text) => {
  const words = text.split(' ').map(w => w.toLowerCase().replace(/[^a-z0-9]/g, '_'));
  return `/home/user/${words.join('/')}.txt`;
};

// ============================================
// TIME ENCODING
// ============================================

/**
 * Encode as Unix epoch
 */
export const encodeUnixEpoch = (text) => {
  return text.split('').map(char => {
    const base = Date.now();
    return (base + char.charCodeAt(0) * 1000).toString();
  }).join(' ');
};

/**
 * Encode as ISO date sequence
 */
export const encodeISODate = (text) => {
  const baseDate = new Date('2000-01-01');
  return text.split('').map(char => {
    const days = char.charCodeAt(0);
    const date = new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000);
    return date.toISOString().slice(0, 10);
  }).join(' ');
};

/**
 * Encode as relative time
 */
export const encodeRelativeTime = (text) => {
  const units = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'];
  return text.split('').map((char, idx) => {
    const num = char.charCodeAt(0) % 60;
    const unit = units[idx % units.length];
    return `${num} ${unit} ago`;
  }).join(', ');
};

// ============================================
// COORDINATE SYSTEMS
// ============================================

/**
 * Encode as UTM coordinates
 */
export const encodeUTM = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const zone = (code % 60) + 1;
    const letter = String.fromCharCode(67 + (code % 20)); // C to W
    const easting = ((code * 12345) % 999999).toString().padStart(6, '0');
    const northing = ((code * 54321) % 9999999).toString().padStart(7, '0');
    return `${zone}${letter} ${easting}E ${northing}N`;
  }).join(' | ');
};

/**
 * Encode as what3words style
 */
export const encodeWhat3Words = (text) => {
  const words = ['apple', 'banana', 'cherry', 'date', 'elder', 'fig', 'grape', 'honey',
                 'ice', 'jam', 'kiwi', 'lemon', 'mango', 'nut', 'orange', 'peach',
                 'quince', 'raisin', 'strawberry', 'tomato', 'ugli', 'vanilla', 'walnut', 'yam', 'zest'];
  
  return text.split(' ').map(word => {
    const chars = word.split('');
    const w1 = words[(chars[0]?.charCodeAt(0) || 0) % words.length];
    const w2 = words[(chars[1]?.charCodeAt(0) || 0) % words.length];
    const w3 = words[(word.length) % words.length];
    return `///${w1}.${w2}.${w3}`;
  }).join(' → ');
};

// ============================================
// QR/BARCODE FORMATS
// ============================================

/**
 * Encode as vCard format
 */
export const encodeVCard = (text) => {
  const name = text.split(' ').slice(0, 2).join(' ') || 'Unknown';
  return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nNOTE:${text}\nEND:VCARD`;
};

/**
 * Encode as WiFi QR format
 */
export const encodeWiFiQR = (text) => {
  const ssid = text.split(' ')[0] || 'Network';
  return `WIFI:S:${ssid};T:WPA;P:${text.replace(/\s/g, '')};;`;
};

/**
 * Encode as iCal event
 */
export const encodeICal = (text) => {
  const now = new Date();
  const dtstart = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  return `BEGIN:VCALENDAR\nBEGIN:VEVENT\nSUMMARY:${text}\nDTSTART:${dtstart}\nEND:VEVENT\nEND:VCALENDAR`;
};

// ============================================
// GAMING COMMUNICATION
// ============================================

/**
 * Encode as game chat style
 */
export const encodeGameChat = (text) => {
  const emotes = ['Kappa', 'PogChamp', 'LUL', 'monkaS', 'FeelsBadMan', 'FeelsGoodMan'];
  const words = text.split(' ');
  return words.map((word, idx) => {
    if (idx % 3 === 0) {
      return `${word} ${emotes[idx % emotes.length]}`;
    }
    return word;
  }).join(' ');
};

/**
 * Encode as MMORPG loot
 */
export const encodeMMOLoot = (text) => {
  const rarities = ['[Common]', '[Uncommon]', '[Rare]', '[Epic]', '[Legendary]'];
  const words = text.split(' ');
  return words.map((word, idx) => {
    const rarity = rarities[idx % rarities.length];
    return `${rarity} ${word}`;
  }).join(' ');
};

/**
 * Encode as D&D dice notation
 */
export const encodeDiceNotation = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const numDice = (code % 5) + 1;
    const dieType = [4, 6, 8, 10, 12, 20][code % 6];
    const modifier = code % 10;
    return `${numDice}d${dieType}+${modifier}`;
  }).join(' ');
};

// ============================================
// SOCIAL MEDIA FORMATS
// ============================================

/**
 * Encode as Twitter style
 */
export const encodeTwitterStyle = (text) => {
  const words = text.split(' ');
  const hashtags = words.slice(0, 3).map(w => `#${w.replace(/[^a-zA-Z]/g, '')}`);
  return `${text.slice(0, 240)} ${hashtags.join(' ')}`;
};

/**
 * Encode as Reddit style
 */
export const encodeRedditStyle = (text) => {
  return `TL;DR: ${text}\n\nEdit: Thanks for the gold, kind stranger!`;
};

/**
 * Encode as forum quote
 */
export const encodeForumQuote = (text) => {
  return `[QUOTE="Anonymous"]\n${text}\n[/QUOTE]\n\nThis.`;
};

// ============================================
// ENCRYPTION INDICATORS
// ============================================

/**
 * Encode as PGP message style
 */
export const encodePGPStyle = (text) => {
  const hash = text.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0).toString(16);
  return `-----BEGIN PGP MESSAGE-----\nVersion: Encoded v1.0\n\n${btoa(text)}\n=${hash.slice(0, 4).toUpperCase()}\n-----END PGP MESSAGE-----`;
};

/**
 * Encode as encrypted placeholder
 */
export const encodeEncryptedPlaceholder = (text) => {
  return `🔒 ENCRYPTED: ${btoa(text).slice(0, 20)}... [${text.length} chars]`;
};

// ============================================
// LANGUAGE/LINGUISTIC CODES
// ============================================

/**
 * Encode as phonetic transcription (simple)
 */
export const encodePhoneticSimple = (text) => {
  const phonetics = {
    'a': '/eɪ/', 'e': '/iː/', 'i': '/aɪ/', 'o': '/oʊ/', 'u': '/juː/',
    'th': '/θ/', 'sh': '/ʃ/', 'ch': '/tʃ/', 'ng': '/ŋ/'
  };
  
  let result = text.toLowerCase();
  for (const [key, val] of Object.entries(phonetics)) {
    result = result.replace(new RegExp(key, 'g'), val);
  }
  return result;
};

/**
 * Encode as ISO language code format
 */
export const encodeISOLanguage = (text) => {
  const words = text.split(' ');
  return words.map((word, idx) => {
    const code = word.slice(0, 2).toLowerCase();
    return `[${code}-${idx.toString(36).toUpperCase()}] ${word}`;
  }).join(' ');
};
