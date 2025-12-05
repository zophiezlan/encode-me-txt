/**
 * Pattern-Based Encoders
 * Mathematical patterns, sequences, and forensic-style encodings
 */

/**
 * Fibonacci encoding - maps characters to Fibonacci sequence positions
 * @param {string} text - The text to encode
 * @returns {string} - Fibonacci encoded text
 */
export const encodeFibonacci = (text) => {
  // Generate Fibonacci sequence
  const fib = [1, 1];
  for (let i = 2; i < 100; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const idx = code % fib.length;
    return fib[idx].toString();
  }).join('-');
};

/**
 * Decode Fibonacci encoding
 */
export const decodeFibonacci = (text) => {
  try {
    const fib = [1, 1];
    for (let i = 2; i < 100; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    
    const fibMap = {};
    for (let i = 0; i < 256; i++) {
      fibMap[fib[i % fib.length].toString()] = String.fromCharCode(i);
    }
    
    return text.split('-').map(num => fibMap[num] || '?').join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Prime number encoding - uses prime numbers for character positions
 * @param {string} text - The text to encode
 * @returns {string} - Prime encoded text
 */
export const encodePrime = (text) => {
  const primes = [];
  for (let i = 2; primes.length < 256; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return primes[code % primes.length].toString();
  }).join(' ');
};

/**
 * Decode Prime encoding
 */
export const decodePrime = (text) => {
  try {
    const primes = [];
    for (let i = 2; primes.length < 256; i++) {
      let isPrime = true;
      for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) primes.push(i);
    }
    
    const primeMap = {};
    for (let i = 0; i < 256; i++) {
      primeMap[primes[i % primes.length].toString()] = String.fromCharCode(i);
    }
    
    return text.split(' ').map(num => primeMap[num] || '?').join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Golden Ratio encoding - uses phi-based positions
 * @param {string} text - The text to encode
 * @returns {string} - Golden ratio encoded text
 */
export const encodeGoldenRatio = (text) => {
  const phi = 1.618033988749895;
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const golden = Math.floor(code * phi);
    return 'φ' + golden.toString();
  }).join('·');
};

/**
 * Decode Golden Ratio encoding
 */
export const decodeGoldenRatio = (text) => {
  try {
    const phi = 1.618033988749895;
    return text.split('·').map(part => {
      const num = parseInt(part.replace('φ', ''));
      const code = Math.round(num / phi);
      return String.fromCharCode(code);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Triangle number encoding
 * @param {string} text - The text to encode
 * @returns {string} - Triangle number encoded text
 */
export const encodeTriangle = (text) => {
  const triangles = [];
  for (let i = 1; triangles.length < 256; i++) {
    triangles.push((i * (i + 1)) / 2);
  }
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return '△' + triangles[code % triangles.length];
  }).join(' ');
};

/**
 * Square number encoding
 * @param {string} text - The text to encode
 * @returns {string} - Square number encoded text
 */
export const encodeSquareNumber = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return '□' + (code * code);
  }).join(' ');
};

/**
 * Hexagram I-Ching pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - Hexagram pattern
 */
export const encodeHexagramPattern = (text) => {
  const hexagrams = [
    '⚊⚊⚊', '⚋⚊⚊', '⚊⚋⚊', '⚋⚋⚊', '⚊⚊⚋', '⚋⚊⚋', '⚊⚋⚋', '⚋⚋⚋'
  ];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const bin = code.toString(2).padStart(8, '0');
    // Use first 3 bits for one hexagram, next 3 for another
    const h1 = parseInt(bin.slice(0, 3), 2);
    const h2 = parseInt(bin.slice(3, 6), 2);
    return hexagrams[h1] + hexagrams[h2];
  }).join(' ');
};

/**
 * Binary tree path encoding
 * @param {string} text - The text to encode
 * @returns {string} - Tree path representation
 */
export const encodeBinaryTree = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const binary = code.toString(2).padStart(8, '0');
    return binary.replace(/0/g, '←').replace(/1/g, '→');
  }).join(' ');
};

/**
 * Decode Binary tree path
 */
export const decodeBinaryTree = (text) => {
  try {
    return text.split(' ').map(path => {
      const binary = path.replace(/←/g, '0').replace(/→/g, '1');
      return String.fromCharCode(parseInt(binary, 2));
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Matrix coordinate encoding (row, col)
 * @param {string} text - The text to encode
 * @returns {string} - Matrix coordinates
 */
export const encodeMatrixCoord = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const row = Math.floor(code / 16);
    const col = code % 16;
    return `[${row.toString(16).toUpperCase()},${col.toString(16).toUpperCase()}]`;
  }).join('');
};

/**
 * Decode Matrix coordinates
 */
export const decodeMatrixCoord = (text) => {
  try {
    const matches = text.match(/\[([0-9A-Fa-f]),([0-9A-Fa-f])\]/g);
    if (!matches) return '[Invalid format]';
    
    return matches.map(coord => {
      const match = coord.match(/\[([0-9A-Fa-f]),([0-9A-Fa-f])\]/);
      const row = parseInt(match[1], 16);
      const col = parseInt(match[2], 16);
      return String.fromCharCode(row * 16 + col);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Spiral pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - Spiral pattern
 */
export const encodeSpiral = (text) => {
  const spiralChars = ['↻', '↺', '⟳', '⟲', '🌀'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const spiralIdx = code % spiralChars.length;
    const count = Math.floor(code / spiralChars.length);
    return spiralChars[spiralIdx] + count.toString(16);
  }).join(' ');
};

/**
 * Wave pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - Wave pattern
 */
export const encodeWavePattern = (text) => {
  const waves = ['∿', '≋', '〰️', '～', '∾'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    let wave = '';
    const amplitude = (code % 5) + 1;
    const frequency = Math.floor(code / 5) % 5;
    wave += waves[frequency].repeat(amplitude);
    return wave;
  }).join('·');
};

/**
 * Fractal pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - Fractal-like pattern
 */
export const encodeFractal = (text) => {
  const patterns = ['◢', '◣', '◤', '◥', '▲', '▼', '◆', '◇'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const binary = code.toString(2).padStart(8, '0');
    return binary.split('').map((bit, idx) => 
      patterns[(parseInt(bit) * 4 + idx) % patterns.length]
    ).join('');
  }).join(' ');
};

/**
 * Pascal triangle row encoding
 * @param {string} text - The text to encode
 * @returns {string} - Pascal triangle positions
 */
export const encodePascal = (text) => {
  // Generate Pascal's triangle rows
  const pascal = [[1]];
  for (let i = 1; i < 15; i++) {
    pascal[i] = [1];
    for (let j = 1; j < i; j++) {
      pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
    }
    pascal[i].push(1);
  }
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const row = code % 15;
    const col = code % pascal[row].length;
    return `P(${row},${col})=${pascal[row][col]}`;
  }).join(' ');
};

/**
 * Cellular automaton rule 30 encoding
 * @param {string} text - The text to encode
 * @returns {string} - Rule 30 pattern
 */
export const encodeRule30 = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const binary = code.toString(2).padStart(8, '0');
    // Apply Rule 30 transformation
    let next = '';
    for (let i = 0; i < binary.length; i++) {
      const left = binary[i - 1] || '0';
      const center = binary[i];
      const right = binary[i + 1] || '0';
      const pattern = left + center + right;
      // Rule 30: 111->0, 110->0, 101->0, 100->1, 011->1, 010->1, 001->1, 000->0
      const rule30 = { '111': '0', '110': '0', '101': '0', '100': '1', '011': '1', '010': '1', '001': '1', '000': '0' };
      next += rule30[pattern];
    }
    return next.replace(/0/g, '○').replace(/1/g, '●');
  }).join(' ');
};

/**
 * Checksum encoding with parity bits
 * @param {string} text - The text to encode
 * @returns {string} - Text with checksums
 */
export const encodeChecksum = (text) => {
  let checksum = 0;
  const encoded = text.split('').map(char => {
    const code = char.charCodeAt(0);
    checksum ^= code;
    return code.toString(16).padStart(2, '0');
  }).join(':');
  
  return `[${encoded}]✓${checksum.toString(16).padStart(2, '0')}`;
};

/**
 * CRC-like pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - CRC pattern
 */
export const encodeCRC = (text) => {
  const polynomial = 0x1021;
  let crc = 0xFFFF;
  
  for (const char of text) {
    let byte = char.charCodeAt(0);
    for (let i = 0; i < 8; i++) {
      const bit = (byte >> (7 - i)) & 1;
      const c15 = (crc >> 15) & 1;
      crc <<= 1;
      if (c15 ^ bit) crc ^= polynomial;
      crc &= 0xFFFF;
    }
  }
  
  return text.split('').map(c => c.charCodeAt(0).toString(16)).join('.') + 
         `∑${crc.toString(16).toUpperCase().padStart(4, '0')}`;
};

/**
 * Hamming code encoding (7,4)
 * @param {string} text - The text to encode
 * @returns {string} - Hamming encoded text
 */
export const encodeHamming = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    // Encode each nibble with Hamming(7,4)
    const nibble1 = (code >> 4) & 0xF;
    const nibble2 = code & 0xF;
    
    const hammingEncode = (n) => {
      const d1 = (n >> 3) & 1;
      const d2 = (n >> 2) & 1;
      const d3 = (n >> 1) & 1;
      const d4 = n & 1;
      const p1 = d1 ^ d2 ^ d4;
      const p2 = d1 ^ d3 ^ d4;
      const p3 = d2 ^ d3 ^ d4;
      return `${p1}${p2}${d1}${p3}${d2}${d3}${d4}`;
    };
    
    return `H[${hammingEncode(nibble1)}${hammingEncode(nibble2)}]`;
  }).join('');
};

/**
 * Gray code encoding
 * @param {string} text - The text to encode
 * @returns {string} - Gray code
 */
export const encodeGrayCode = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const gray = code ^ (code >> 1);
    return 'G:' + gray.toString(2).padStart(8, '0');
  }).join(' ');
};

/**
 * Decode Gray code
 */
export const decodeGrayCode = (text) => {
  try {
    return text.split(' ').map(part => {
      const binary = part.replace('G:', '');
      let gray = parseInt(binary, 2);
      let value = 0;
      while (gray) {
        value ^= gray;
        gray >>= 1;
      }
      return String.fromCharCode(value);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Manchester encoding (clock + data)
 * @param {string} text - The text to encode
 * @returns {string} - Manchester encoded
 */
export const encodeManchester = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const binary = code.toString(2).padStart(8, '0');
    // Manchester: 0 = low-high (↑), 1 = high-low (↓)
    return binary.split('').map(bit => bit === '0' ? '↑' : '↓').join('');
  }).join('|');
};

/**
 * Decode Manchester encoding
 */
export const decodeManchester = (text) => {
  try {
    return text.split('|').map(part => {
      const binary = part.split('').map(s => s === '↑' ? '0' : '1').join('');
      return String.fromCharCode(parseInt(binary, 2));
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};
