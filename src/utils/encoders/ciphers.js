/**
 * Cipher Encoders
 * Caesar, ROT13, Atbash, Vigenère, and other substitution ciphers
 */

/**
 * Encodes text using Caesar cipher with specified shift
 * @param {string} text - The text to encode
 * @param {number} shift - The number of positions to shift (1-25)
 * @returns {string} - Encoded text
 */
export const encodeCaesar = (text, shift = 13) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
  });
};

/**
 * Decodes Caesar cipher with specified shift
 * @param {string} text - The text to decode
 * @param {number} shift - The shift used for encoding
 * @returns {string} - Decoded text
 */
export const decodeCaesar = (text, shift = 13) => {
  return encodeCaesar(text, 26 - shift);
};

/**
 * Encodes/decodes text using ROT13 (Caesar cipher with shift 13)
 * ROT13 is its own inverse
 * @param {string} text - The text to encode/decode
 * @returns {string} - Encoded/decoded text
 */
export const encodeROT13 = (text) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
  });
};

/**
 * ROT13 decoder (same as encoder since it's symmetric)
 */
export const decodeROT13 = encodeROT13;

/**
 * Reverses text (simple cipher)
 * @param {string} text - The text to reverse
 * @returns {string} - Reversed text
 */
export const encodeReverse = (text) => {
  return text.split('').reverse().join('');
};

/**
 * Reverse decoder (same as encoder since reversing is symmetric)
 */
export const decodeReverse = encodeReverse;

/**
 * Atbash Cipher - Reverses the alphabet (A=Z, B=Y, C=X, etc.)
 * This is a symmetric cipher, so encoding and decoding are the same
 * @param {string} text - The text to encode
 * @returns {string} - Encoded text
 */
export const encodeAtbash = (text) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const position = char.charCodeAt(0) - start;
    const reversedPosition = 25 - position;
    return String.fromCharCode(reversedPosition + start);
  });
};

/**
 * Atbash decoder (same as encoder since it's symmetric)
 */
export const decodeAtbash = encodeAtbash;

/**
 * Vigenère Cipher - Uses a keyword to shift each letter
 * @param {string} text - The text to encode
 * @param {string} keyword - The keyword for the cipher (default: 'SECRET')
 * @returns {string} - Encoded text
 */
export const encodeVigenere = (text, keyword = 'SECRET') => {
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '') || 'SECRET';
  let keyIndex = 0;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const charPosition = char.toUpperCase().charCodeAt(0) - 65;
    const keyPosition = key.charCodeAt(keyIndex % key.length) - 65;
    const newPosition = (charPosition + keyPosition) % 26;
    keyIndex++;
    return String.fromCharCode(newPosition + start);
  });
};

/**
 * Vigenère decoder
 * @param {string} text - The text to decode
 * @param {string} keyword - The keyword used for encoding
 * @returns {string} - Decoded text
 */
export const decodeVigenere = (text, keyword = 'SECRET') => {
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '') || 'SECRET';
  let keyIndex = 0;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const charPosition = char.toUpperCase().charCodeAt(0) - 65;
    const keyPosition = key.charCodeAt(keyIndex % key.length) - 65;
    const newPosition = (charPosition - keyPosition + 26) % 26;
    keyIndex++;
    return String.fromCharCode(newPosition + start);
  });
};

/**
 * Rail Fence Cipher - Transposition cipher using zigzag pattern
 * @param {string} text - The text to encode
 * @param {number} rails - Number of rails (default: 3)
 * @returns {string} - Encoded text
 */
export const encodeRailFence = (text, rails = 3) => {
  if (rails < 2) rails = 2;
  const fence = Array(rails).fill('').map(() => []);
  let rail = 0;
  let direction = 1;
  
  for (const char of text) {
    fence[rail].push(char);
    rail += direction;
    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }
  
  return fence.flat().join('');
};

/**
 * Rail Fence decoder
 */
export const decodeRailFence = (text, rails = 3) => {
  if (rails < 2) rails = 2;
  const len = text.length;
  const fence = Array(rails).fill('').map(() => []);
  
  // Calculate lengths for each rail
  const pattern = [];
  let rail = 0;
  let direction = 1;
  for (let i = 0; i < len; i++) {
    pattern.push(rail);
    rail += direction;
    if (rail === 0 || rail === rails - 1) direction *= -1;
  }
  
  const counts = Array(rails).fill(0);
  pattern.forEach(r => counts[r]++);
  
  // Fill fence
  let idx = 0;
  for (let r = 0; r < rails; r++) {
    for (let c = 0; c < counts[r]; c++) {
      fence[r].push(text[idx++]);
    }
  }
  
  // Read off
  const indices = Array(rails).fill(0);
  let result = '';
  for (let i = 0; i < len; i++) {
    const r = pattern[i];
    result += fence[r][indices[r]++];
  }
  
  return result;
};

/**
 * Bacon's Cipher - Encodes using two-symbol binary representation
 * Uses 'a' and 'b' to represent each letter
 * @param {string} text - The text to encode
 * @returns {string} - Encoded text
 */
export const encodeBacon = (text) => {
  const baconMap = {
    'A': 'AAAAA', 'B': 'AAAAB', 'C': 'AAABA', 'D': 'AAABB', 'E': 'AABAA',
    'F': 'AABAB', 'G': 'AABBA', 'H': 'AABBB', 'I': 'ABAAA', 'J': 'ABAAB',
    'K': 'ABABA', 'L': 'ABABB', 'M': 'ABBAA', 'N': 'ABBAB', 'O': 'ABBBA',
    'P': 'ABBBB', 'Q': 'BAAAA', 'R': 'BAAAB', 'S': 'BAABA', 'T': 'BAABB',
    'U': 'BABAA', 'V': 'BABAB', 'W': 'BABBA', 'X': 'BABBB', 'Y': 'BBAAA',
    'Z': 'BBAAB'
  };
  
  return text.toUpperCase().split('').map(char => {
    return baconMap[char] || char;
  }).join(' ');
};

/**
 * Bacon's Cipher decoder
 */
export const decodeBacon = (text) => {
  const baconMap = {
    'AAAAA': 'A', 'AAAAB': 'B', 'AAABA': 'C', 'AAABB': 'D', 'AABAA': 'E',
    'AABAB': 'F', 'AABBA': 'G', 'AABBB': 'H', 'ABAAA': 'I', 'ABAAB': 'J',
    'ABABA': 'K', 'ABABB': 'L', 'ABBAA': 'M', 'ABBAB': 'N', 'ABBBA': 'O',
    'ABBBB': 'P', 'BAAAA': 'Q', 'BAAAB': 'R', 'BAABA': 'S', 'BAABB': 'T',
    'BABAA': 'U', 'BABAB': 'V', 'BABBA': 'W', 'BABBB': 'X', 'BBAAA': 'Y',
    'BBAAB': 'Z'
  };
  
  return text.split(' ').map(code => {
    return baconMap[code.toUpperCase()] || code;
  }).join('');
};

/**
 * Polybius Square - Grid-based cipher (5x5 grid, I=J)
 * @param {string} text - The text to encode
 * @returns {string} - Encoded text as coordinate pairs
 */
export const encodePolybius = (text) => {
  const grid = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // I=J
  
  return text.toUpperCase().replace(/J/g, 'I').split('').map(char => {
    const idx = grid.indexOf(char);
    if (idx === -1) return char;
    const row = Math.floor(idx / 5) + 1;
    const col = (idx % 5) + 1;
    return `${row}${col}`;
  }).join(' ');
};

/**
 * Polybius Square decoder
 */
export const decodePolybius = (text) => {
  const grid = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  
  return text.split(' ').map(code => {
    if (code.length === 2 && /^\d\d$/.test(code)) {
      const row = parseInt(code[0]) - 1;
      const col = parseInt(code[1]) - 1;
      const idx = row * 5 + col;
      return grid[idx] || code;
    }
    return code;
  }).join('');
};

/**
 * Affine Cipher - Mathematical cipher using formula: E(x) = (ax + b) mod 26
 * @param {string} text - The text to encode
 * @param {number} a - Multiplicative key (must be coprime with 26)
 * @param {number} b - Additive key
 * @returns {string} - Encoded text
 */
export const encodeAffine = (text, a = 5, b = 8) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const x = char.charCodeAt(0) - start;
    const encrypted = (a * x + b) % 26;
    return String.fromCharCode(encrypted + start);
  });
};

/**
 * Affine Cipher decoder
 */
export const decodeAffine = (text, a = 5, b = 8) => {
  // Find modular multiplicative inverse of a
  const modInverse = (a, m) => {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    return 1;
  };
  
  const aInv = modInverse(a, 26);
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const y = char.charCodeAt(0) - start;
    const decrypted = (aInv * (y - b + 26)) % 26;
    return String.fromCharCode(decrypted + start);
  });
};

/**
 * ROT47 - Rotates printable ASCII characters
 * @param {string} text - The text to encode
 * @returns {string} - Encoded text
 */
export const encodeROT47 = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 33 && code <= 126) {
      return String.fromCharCode(33 + ((code - 33 + 47) % 94));
    }
    return char;
  }).join('');
};

/**
 * ROT47 decoder (same as encoder - symmetric)
 */
export const decodeROT47 = encodeROT47;

/**
 * Tap Code (Prison Cipher) - Encodes using Polybius-like tap patterns
 * @param {string} text - The text to encode
 * @returns {string} - Encoded text as tap patterns
 */
export const encodeTapCode = (text) => {
  const grid = 'ABCDEFGHIJLMNOPQRSTUVWXYZ'; // K=C
  
  return text.toUpperCase().replace(/K/g, 'C').split('').map(char => {
    const idx = grid.indexOf(char);
    if (idx === -1) return char === ' ' ? '/' : char;
    const row = Math.floor(idx / 5) + 1;
    const col = (idx % 5) + 1;
    return '•'.repeat(row) + ' ' + '•'.repeat(col);
  }).join(' | ');
};

/**
 * Tap Code decoder
 */
export const decodeTapCode = (text) => {
  const grid = 'ABCDEFGHIJLMNOPQRSTUVWXYZ';
  
  return text.split(' | ').map(code => {
    if (code === '/') return ' ';
    const parts = code.split(' ');
    if (parts.length === 2) {
      const row = parts[0].length - 1;
      const col = parts[1].length - 1;
      const idx = row * 5 + col;
      return grid[idx] || code;
    }
    return code;
  }).join('');
};

/**
 * Substitution Cipher - Custom alphabet substitution
 * @param {string} text - The text to encode
 * @returns {string} - Encoded text
 */
export const encodeSubstitution = (text) => {
  const standard = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const substitution = 'QWERTYUIOPASDFGHJKLZXCVBNM'; // QWERTY-based
  
  return text.split('').map(char => {
    const upper = char.toUpperCase();
    const idx = standard.indexOf(upper);
    if (idx === -1) return char;
    const result = substitution[idx];
    return char === upper ? result : result.toLowerCase();
  }).join('');
};

/**
 * Substitution Cipher decoder
 */
export const decodeSubstitution = (text) => {
  const standard = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const substitution = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  
  return text.split('').map(char => {
    const upper = char.toUpperCase();
    const idx = substitution.indexOf(upper);
    if (idx === -1) return char;
    const result = standard[idx];
    return char === upper ? result : result.toLowerCase();
  }).join('');
};

/**
 * Beaufort Cipher - Variant of Vigenère where decryption is the same as encryption
 * @param {string} text - The text to encode
 * @param {string} keyword - The keyword
 * @returns {string} - Encoded text
 */
export const encodeBeaufort = (text, keyword = 'SECRET') => {
  const key = keyword.toUpperCase().replace(/[^A-Z]/g, '') || 'SECRET';
  let keyIndex = 0;
  
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char <= 'Z';
    const start = isUpper ? 65 : 97;
    const charPosition = char.toUpperCase().charCodeAt(0) - 65;
    const keyPosition = key.charCodeAt(keyIndex % key.length) - 65;
    const newPosition = (keyPosition - charPosition + 26) % 26;
    keyIndex++;
    return String.fromCharCode(newPosition + start);
  });
};

/**
 * Beaufort decoder (same as encoder)
 */
export const decodeBeaufort = encodeBeaufort;
