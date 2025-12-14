/**
 * Military & Government Encoders
 * Serious encoding standards used in military, government, and defense contexts
 */

// ============================================
// MILITARY GRID REFERENCE SYSTEM (MGRS)
// ============================================

/**
 * Encode text as MGRS (Military Grid Reference System) coordinates
 * Used by NATO militaries for geolocation
 * @param {string} text - The text to encode
 * @returns {string} - MGRS coordinate format
 */
export const encodeMGRS = (text) => {
  const gridZones = 'CDEFGHJKLMNPQRSTUVWXX'; // UTM grid zones
  const col100k = 'ABCDEFGHJKLMNPQRSTUV';
  const row100k = 'ABCDEFGHJKLMNPQRSTUV';

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const zone = (code % 60) + 1;
    const band = gridZones[code % gridZones.length];
    const colLetter = col100k[(code + idx) % col100k.length];
    const rowLetter = row100k[(code * 2) % row100k.length];
    const easting = String(code * 37 % 100000).padStart(5, '0');
    const northing = String(code * 73 % 100000).padStart(5, '0');

    return `${zone}${band} ${colLetter}${rowLetter} ${easting} ${northing}`;
  }).join(' | ');
};

/**
 * Decode MGRS encoding
 */
export const decodeMGRS = (text) => {
  try {
    return text.split(' | ').map(coord => {
      const parts = coord.trim().split(' ');
      if (parts.length >= 3) {
        const easting = parseInt(parts[2]);
        // Reverse the encoding formula
        let code = 0;
        for (let i = 0; i < 256; i++) {
          if ((i * 37 % 100000) === easting) {
            code = i;
            break;
          }
        }
        return String.fromCharCode(code || 65);
      }
      return '?';
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// NATO STANAG CODES
// ============================================

/**
 * Encode using STANAG 4439 (NATO classification system)
 * @param {string} text - The text to encode
 * @returns {string} - STANAG encoded format
 */
export const encodeSTANAG = (text) => {
  const classifications = [
    'COSMIC TOP SECRET',
    'FOCAL TOP SECRET',
    'NATO SECRET',
    'NATO CONFIDENTIAL',
    'NATO RESTRICTED',
    'NATO UNCLASSIFIED'
  ];

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const classification = classifications[code % classifications.length];
    const serial = String(code * 1000 + idx).padStart(6, '0');
    const checksum = (code + idx) % 100;

    return `${classification}/${serial}/${checksum.toString().padStart(2, '0')}`;
  }).join('\n');
};

// ============================================
// ACP 125 MILITARY COMMUNICATION PROWORDS
// ============================================

/**
 * Encode using ACP 125 procedure words (prowords)
 * Used in military radio communications
 */
export const encodeProwords = (text) => {
  const prowords = {
    'A': 'AUTHENTICATE', 'B': 'BREAK', 'C': 'CORRECT', 'D': 'DISREGARD',
    'E': 'EXECUTE', 'F': 'FIGURES', 'G': 'GO AHEAD', 'H': 'HAVE',
    'I': 'I SAY AGAIN', 'J': 'JUMP', 'K': 'KEEP', 'L': 'LIMA',
    'M': 'MESSAGE', 'N': 'NEGATIVE', 'O': 'OUT', 'P': 'PRIORITY',
    'Q': 'QUERY', 'R': 'ROGER', 'S': 'SAY AGAIN', 'T': 'THIS IS',
    'U': 'URGENT', 'V': 'VERIFY', 'W': 'WAIT', 'X': 'EXTRACT',
    'Y': 'AFFIRMATIVE', 'Z': 'ZERO',
    ' ': 'BREAK'
  };

  return text.toUpperCase().split('').map(char =>
    prowords[char] || char
  ).join(' ');
};

/**
 * Decode ACP 125 prowords
 */
export const decodeProwords = (text) => {
  const reverseProwords = {
    'AUTHENTICATE': 'A', 'BREAK': 'B', 'CORRECT': 'C', 'DISREGARD': 'D',
    'EXECUTE': 'E', 'FIGURES': 'F', 'GO AHEAD': 'G', 'HAVE': 'H',
    'I SAY AGAIN': 'I', 'JUMP': 'J', 'KEEP': 'K', 'LIMA': 'L',
    'MESSAGE': 'M', 'NEGATIVE': 'N', 'OUT': 'O', 'PRIORITY': 'P',
    'QUERY': 'Q', 'ROGER': 'R', 'SAY AGAIN': 'S', 'THIS IS': 'T',
    'URGENT': 'U', 'VERIFY': 'V', 'WAIT': 'W', 'EXTRACT': 'X',
    'AFFIRMATIVE': 'Y', 'ZERO': 'Z'
  };

  try {
    return text.toUpperCase().split(' ').map(word =>
      reverseProwords[word] || (word === 'BREAK' ? ' ' : word)
    ).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// GOVERNMENT CLASSIFICATION MARKINGS
// ============================================

/**
 * Encode with US Government classification markings
 * Based on Executive Order 13526
 */
export const encodeClassified = (text) => {
  const levels = ['TOP SECRET//SCI', 'SECRET//NOFORN', 'CONFIDENTIAL', 'UNCLASSIFIED//FOUO'];
  const compartments = ['TK', 'SI', 'G', 'HCS', 'KDK', 'KLONDIKE', 'TALENT KEYHOLE'];

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const level = levels[code % levels.length];
    const compartment = compartments[(code + idx) % compartments.length];
    const control = `CC${String((code * 17) % 10000).padStart(4, '0')}`;

    return `${level}//${compartment}//${control}//20XX0101`;
  }).join('\n');
};

// ============================================
// ZULU TIME (MILITARY TIME)
// ============================================

/**
 * Encode as Zulu time (UTC military time format)
 */
export const encodeZuluTime = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const hours = String(code % 24).padStart(2, '0');
    const minutes = String((code * 7) % 60).padStart(2, '0');
    const seconds = String((code * 13) % 60).padStart(2, '0');
    const day = String((code + idx) % 31 + 1).padStart(2, '0');
    const month = String((code % 12) + 1).padStart(2, '0');

    return `${day}${hours}${minutes}${seconds}Z ${month}`;
  }).join(' ');
};

/**
 * Decode Zulu time
 */
export const decodeZuluTime = (text) => {
  try {
    return text.split(' ').filter(t => t.includes('Z')).map(time => {
      const hours = parseInt(time.slice(2, 4));
      // Reverse lookup - find character that produces this hour
      for (let i = 0; i < 256; i++) {
        if (i % 24 === hours) {
          return String.fromCharCode(i);
        }
      }
      return '?';
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// MILITARY OPERATIONS CODE NAMES
// ============================================

/**
 * Generate military operation-style code names
 */
export const encodeOperationCode = (text) => {
  const adjectives = [
    'ABSOLUTE', 'BLACK', 'CRIMSON', 'DESERT', 'ETERNAL', 'FROZEN',
    'GOLDEN', 'HAMMER', 'IRON', 'JUST', 'KING', 'LIGHTNING',
    'NOBLE', 'OVERLORD', 'PHANTOM', 'QUICK', 'ROLLING', 'STEEL',
    'THUNDER', 'URGENT', 'VALIANT', 'WINTER', 'YANKEE', 'ZEALOT'
  ];

  const nouns = [
    'ARROW', 'BLADE', 'COBRA', 'DRAGON', 'EAGLE', 'FALCON',
    'GUARDIAN', 'HAMMER', 'INFERNO', 'JUSTICE', 'KNIGHT', 'LANCE',
    'MONGOOSE', 'NORTHERN', 'ORCHID', 'PHOENIX', 'QUEST', 'RAGE',
    'SHIELD', 'TORCH', 'UNITY', 'VICTORY', 'WARRIOR', 'ZENITH'
  ];

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const adj = adjectives[code % adjectives.length];
    const noun = nouns[(code + idx) % nouns.length];
    const year = 1940 + (code % 80);

    return `OPERATION ${adj} ${noun} (${year})`;
  }).join('\n');
};

// ============================================
// TACTICAL CALL SIGNS
// ============================================

/**
 * Generate tactical military call signs
 */
export const encodeTacticalCallSign = (text) => {
  const units = [
    'ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO', 'FOXTROT',
    'GOLF', 'HOTEL', 'INDIA', 'JULIET', 'KILO', 'LIMA',
    'MIKE', 'NOVEMBER', 'OSCAR', 'PAPA', 'QUEBEC', 'ROMEO',
    'SIERRA', 'TANGO', 'UNIFORM', 'VICTOR', 'WHISKEY', 'XRAY',
    'YANKEE', 'ZULU'
  ];

  const roles = [
    'ACTUAL', 'SIX', 'SEVEN', 'NINER', 'ELEMENT', 'LEADER',
    'TWO', 'THREE', 'FOUR', 'FIVE'
  ];

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const unit = units[code % units.length];
    const role = roles[(code + idx) % roles.length];
    const number = (code % 9) + 1;

    return `${unit}-${number}-${role}`;
  }).join(' ');
};

/**
 * Decode tactical call signs
 */
export const decodeTacticalCallSign = (text) => {
  const units = [
    'ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO', 'FOXTROT',
    'GOLF', 'HOTEL', 'INDIA', 'JULIET', 'KILO', 'LIMA',
    'MIKE', 'NOVEMBER', 'OSCAR', 'PAPA', 'QUEBEC', 'ROMEO',
    'SIERRA', 'TANGO', 'UNIFORM', 'VICTOR', 'WHISKEY', 'XRAY',
    'YANKEE', 'ZULU'
  ];

  try {
    return text.split(' ').map(callSign => {
      const parts = callSign.split('-');
      if (parts.length >= 1) {
        const unitIdx = units.indexOf(parts[0]);
        if (unitIdx >= 0) {
          // Find first char code that maps to this unit
          for (let i = 0; i < 256; i++) {
            if (i % units.length === unitIdx) {
              return String.fromCharCode(i);
            }
          }
        }
      }
      return '?';
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// BREVITY CODES (MULTI-SERVICE TACTICAL)
// ============================================

/**
 * NATO brevity codes used in air combat
 */
export const encodeBrevityCode = (text) => {
  const brevityCodes = {
    'A': 'ANGELS', 'B': 'BANDIT', 'C': 'CHERUBS', 'D': 'DIRT',
    'E': 'ENGAGED', 'F': 'FOX', 'G': 'GATE', 'H': 'HEADS',
    'I': 'ILLUMINATED', 'J': 'JINK', 'K': 'KILL', 'L': 'LASER',
    'M': 'MERGED', 'N': 'NAKED', 'O': 'OUTLAW', 'P': 'PICTURE',
    'Q': 'QUIVER', 'R': 'RIFLE', 'S': 'SPIKE', 'T': 'TALLY',
    'U': 'UNABLE', 'V': 'VISUAL', 'W': 'WINCHESTER', 'X': 'ABORT',
    'Y': 'YARDSTICK', 'Z': 'ZIPLIP',
    ' ': 'BREAK'
  };

  return text.toUpperCase().split('').map(char =>
    brevityCodes[char] || char
  ).join(' ');
};

/**
 * Decode brevity codes
 */
export const decodeBrevityCode = (text) => {
  const reverse = {
    'ANGELS': 'A', 'BANDIT': 'B', 'CHERUBS': 'C', 'DIRT': 'D',
    'ENGAGED': 'E', 'FOX': 'F', 'GATE': 'G', 'HEADS': 'H',
    'ILLUMINATED': 'I', 'JINK': 'J', 'KILL': 'K', 'LASER': 'L',
    'MERGED': 'M', 'NAKED': 'N', 'OUTLAW': 'O', 'PICTURE': 'P',
    'QUIVER': 'Q', 'RIFLE': 'R', 'SPIKE': 'S', 'TALLY': 'T',
    'UNABLE': 'U', 'VISUAL': 'V', 'WINCHESTER': 'W', 'ABORT': 'X',
    'YARDSTICK': 'Y', 'ZIPLIP': 'Z', 'BREAK': ' '
  };

  try {
    return text.toUpperCase().split(' ').map(word => reverse[word] || word).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// COORDINATE SYSTEMS
// ============================================

/**
 * Encode as GEOREF (World Geographic Reference System)
 * Used by military and aviation
 */
export const encodeGEOREF = (text) => {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // No I or O

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const lon1 = letters[code % 24];
    const lon2 = letters[(code + idx) % 24];
    const lat1 = letters[(code * 2) % 24];
    const lat2 = letters[(code * 3) % 24];
    const lonMin = String(code % 60).padStart(2, '0');
    const latMin = String((code * 2) % 60).padStart(2, '0');

    return `${lon1}${lon2}${lat1}${lat2} ${lonMin}${latMin}`;
  }).join(' ');
};

/**
 * Decode GEOREF
 */
export const decodeGEOREF = (text) => {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';

  try {
    return text.split(' ').filter(g => g.length >= 4).map(georef => {
      const lon1 = letters.indexOf(georef[0]);
      if (lon1 >= 0) {
        // Find character that produces this longitude
        for (let i = 0; i < 256; i++) {
          if (i % 24 === lon1) {
            return String.fromCharCode(i);
          }
        }
      }
      return '?';
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// SIGNALS INTELLIGENCE (SIGINT) FORMATS
// ============================================

/**
 * Encode as SIGINT product identifiers
 */
export const encodeSIGINT = (text) => {
  const agencies = ['NSA', 'GCHQ', 'ASD', 'CSE', 'GCSB'];
  const classifications = ['TS//SI//REL', 'S//SI//NF', 'S//REL', 'C//REL'];

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const agency = agencies[code % agencies.length];
    const year = (new Date().getFullYear() - (code % 10)).toString().slice(-2);
    const serial = String(code * 1000 + idx).padStart(6, '0');
    const classification = classifications[code % classifications.length];

    return `${agency}-${year}-${serial} ${classification}`;
  }).join('\n');
};

// ============================================
// WEAPON SYSTEMS DESIGNATION
// ============================================

/**
 * Encode as US military weapon designation system
 * Based on MDS (Mission Design Series)
 */
export const encodeWeaponDesignation = (text) => {
  const modified = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N'];
  const basicType = ['A', 'B', 'C', 'F', 'H', 'K', 'M', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'];
  const designNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '15', '16', '17', '18', '20', '22', '35', '52'];

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const mod = modified[code % modified.length];
    const type = basicType[(code + idx) % basicType.length];
    const num = designNum[code % designNum.length];
    const variant = String.fromCharCode(65 + (code % 26));

    return `${mod}${type}-${num}${variant}`;
  }).join(' ');
};
