/**
 * Unique Encoders
 * Creative and novel encoding methods not found in typical encoder apps
 */

/**
 * DNA Sequence Encoding
 * Encode text as DNA base pairs (A, T, G, C)
 * Uses a 2-bit encoding where each DNA base represents 2 bits
 */
export const encodeDNA = (text) => {
  const dnaMap = {
    '00': 'A',
    '01': 'T',
    '10': 'G',
    '11': 'C'
  };

  let result = '';
  for (let char of text) {
    const binary = char.charCodeAt(0).toString(2).padStart(8, '0');
    for (let i = 0; i < binary.length; i += 2) {
      const pair = binary.substr(i, 2);
      result += dnaMap[pair];
    }
  }
  return result;
};

export const decodeDNA = (text) => {
  try {
    const reverseDNA = {
      'A': '00',
      'T': '01',
      'G': '10',
      'C': '11'
    };

    let binary = '';
    for (let base of text.toUpperCase()) {
      if (reverseDNA[base]) {
        binary += reverseDNA[base];
      }
    }

    let result = '';
    for (let i = 0; i < binary.length; i += 8) {
      const byte = binary.substring(i, i + 8);
      if (byte.length === 8) {
        result += String.fromCharCode(parseInt(byte, 2));
      }
    }
    return result || '[Invalid DNA sequence]';
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Playing Cards Encoding
 * Encode text using playing card representations
 */
export const encodePlayingCards = (text) => {
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  let result = '';
  for (let char of text) {
    const code = char.charCodeAt(0);
    const suit = suits[code % suits.length];
    const rank = ranks[Math.floor(code / suits.length) % ranks.length];
    result += rank + suit + ' ';
  }
  return result.trim();
};

export const decodePlayingCards = (text) => {
  try {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    // Split by spaces and parse each card
    const cards = text.trim().split(/\s+/);
    let result = '';

    for (let card of cards) {
      // Extract rank and suit
      let suit, rank;
      for (let s of suits) {
        if (card.includes(s)) {
          suit = s;
          rank = card.replace(s, '');
          break;
        }
      }

      if (suit && rank) {
        const suitIdx = suits.indexOf(suit);
        const rankIdx = ranks.indexOf(rank);
        if (suitIdx !== -1 && rankIdx !== -1) {
          const code = (rankIdx * suits.length) + suitIdx;
          result += String.fromCharCode(code);
        }
      }
    }
    return result || '[Invalid card sequence]';
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Chemistry Elements Encoding
 * Encode text using periodic table element symbols
 */
export const encodeChemistry = (text) => {
  const elements = [
    'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
    'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca',
    'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn',
    'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr'
  ];

  let result = '';
  for (let char of text) {
    const code = char.charCodeAt(0);
    result += elements[code % elements.length] + '-';
  }
  return result.slice(0, -1); // Remove trailing dash
};

/**
 * Geographic Coordinates Encoding
 * Encode text as lat/long coordinates
 */
export const encodeCoordinates = (text) => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    // Map to reasonable coordinate ranges
    const lat = ((code % 180) - 90).toFixed(4);
    const lng = ((code % 360) - 180).toFixed(4);
    result += `${lat}°, ${lng}°\n`;
  }
  return result.trim();
};

export const decodeCoordinates = (text) => {
  try {
    const lines = text.trim().split('\n');
    let result = '';

    for (let line of lines) {
      // Parse coordinates
      const match = line.match(/([-\d.]+)°,\s*([-\d.]+)°/);
      if (match) {
        const lat = parseFloat(match[1]);
        const lng = parseFloat(match[2]);
        // Reverse the mapping
        const code = Math.round(((lat + 90) + (lng + 180)) / 2);
        result += String.fromCharCode(code);
      }
    }
    return result || '[Invalid coordinates]';
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Zodiac Signs Encoding
 * Encode text using astrological symbols
 */
export const encodeZodiac = (text) => {
  const zodiac = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

  let result = '';
  for (let char of text) {
    const code = char.charCodeAt(0);
    const sign1 = zodiac[Math.floor(code / zodiac.length) % zodiac.length];
    const sign2 = zodiac[code % zodiac.length];
    result += sign1 + sign2 + ' ';
  }
  return result.trim();
};

export const decodeZodiac = (text) => {
  try {
    const zodiac = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
    const signs = [...text.replace(/\s/g, '')];
    let result = '';

    for (let i = 0; i < signs.length; i += 2) {
      if (i + 1 < signs.length) {
        const idx1 = zodiac.indexOf(signs[i]);
        const idx2 = zodiac.indexOf(signs[i + 1]);
        if (idx1 !== -1 && idx2 !== -1) {
          const code = (idx1 * zodiac.length) + idx2;
          result += String.fromCharCode(code);
        }
      }
    }
    return result || '[Invalid zodiac sequence]';
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Barcode Encoding
 * Encode text as visual barcode-style bars
 */
export const encodeBarcode = (text) => {
  const bars = ['▏', '▎', '▍', '▌', '▋', '▊', '▉', '█'];

  let result = '';
  for (let char of text) {
    const binary = char.charCodeAt(0).toString(2).padStart(8, '0');
    for (let bit of binary) {
      result += bit === '1' ? bars[7] : bars[0];
    }
    result += ' ';
  }
  return result.trim();
};

/**
 * Minecraft Block Encoding
 * Encode text using Minecraft block emojis
 */
export const encodeMinecraft = (text) => {
  const blocks = [
    '⛏️', '🟫', '🟩', '🟦', '🟥', '🟨', '⬜', '⬛',
    '🔥', '💎', '⛰️', '🌳', '💧', '🔆', '🌙', '⭐'
  ];

  let result = '';
  for (let char of text) {
    const code = char.charCodeAt(0);
    result += blocks[code % blocks.length];
  }
  return result;
};

/**
 * Recipe Cipher Encoding
 * Encode text as cooking ingredients and measurements
 */
export const encodeRecipe = (text) => {
  const ingredients = [
    '1 cup flour', '2 eggs', '1 tsp salt', '3 tbsp sugar', '1/2 cup milk',
    '2 oz butter', '1 pinch pepper', '3 cloves garlic', '1 lb meat', '2 cups water',
    '1 tbsp oil', '4 oz cheese', '1 tsp vanilla', '2 cups rice', '3 carrots',
    '1 onion', '2 potatoes', '1 can tomatoes', '3 tbsp honey', '1 lemon'
  ];

  let result = '';
  for (let char of text) {
    const code = char.charCodeAt(0);
    result += ingredients[code % ingredients.length] + '\n';
  }
  return result.trim();
};

/**
 * Clock Time Encoding
 * Encode text as clock times (12-hour format)
 */
export const encodeClockTime = (text) => {
  const clocks = [
    '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'
  ];

  let result = '';
  for (let char of text) {
    const code = char.charCodeAt(0);
    const hour = (code % 12) + 1;
    const minute = Math.floor((code / 12) % 60);
    result += `${clocks[hour - 1]} ${hour}:${minute.toString().padStart(2, '0')} `;
  }
  return result.trim();
};

/**
 * Weather Encoding
 * Encode text using weather emoji symbols
 */
export const encodeWeather = (text) => {
  const weather = [
    '☀️', '🌤️', '⛅', '🌥️', '☁️', '🌦️', '🌧️', '⛈️',
    '🌩️', '❄️', '🌨️', '💨', '🌪️', '🌫️', '🌈', '⚡'
  ];

  let result = '';
  for (let char of text) {
    const code = char.charCodeAt(0);
    result += weather[code % weather.length];
  }
  return result;
};

/**
 * Domino Encoding
 * Encode text using domino tile patterns
 */
export const encodeDomino = (text) => {
  const dominoes = [
    '🁣', '🁤', '🁥', '🁦', '🁧', '🁨', '🁩', '🁪',
    '🁫', '🁬', '🁭', '🁮', '🁯', '🁰', '🁱', '🁲'
  ];

  let result = '';
  for (let char of text) {
    const code = char.charCodeAt(0);
    result += dominoes[code % dominoes.length];
  }
  return result;
};

/**
 * Traffic Signs Encoding
 * Encode text using traffic sign emojis
 */
export const encodeTrafficSigns = (text) => {
  const signs = [
    '🛑', '⚠️', '🚸', '🚫', '🚳', '🚭', '🚯', '🚱',
    '🚷', '📵', '🔞', '⛔', '✋', '☢️', '☣️', '⬆️'
  ];

  let result = '';
  for (let char of text) {
    const code = char.charCodeAt(0);
    result += signs[code % signs.length];
  }
  return result;
};
