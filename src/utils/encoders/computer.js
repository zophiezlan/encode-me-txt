/**
 * Computer Science Encoders
 * Binary, Hexadecimal, Base64, and other technical encodings
 */

/**
 * Encodes text to binary (8-bit)
 * @param {string} text - The text to encode
 * @returns {string} - Binary representation
 */
export const encodeBinary = (text) => {
  return text.split('').map(char =>
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join(' ');
};

/**
 * Decodes binary back to text
 * @param {string} text - The binary to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeBinary = (text) => {
  try {
    return text.split(' ').map(binary =>
      String.fromCharCode(parseInt(binary, 2))
    ).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to hexadecimal
 * @param {string} text - The text to encode
 * @returns {string} - Hexadecimal representation
 */
export const encodeHex = (text) => {
  return text.split('').map(char =>
    char.charCodeAt(0).toString(16).padStart(2, '0')
  ).join(' ');
};

/**
 * Decodes hexadecimal back to text
 * @param {string} text - The hexadecimal to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeHex = (text) => {
  try {
    return text.split(' ').map(hex =>
      String.fromCharCode(parseInt(hex, 16))
    ).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to Base64
 * @param {string} text - The text to encode
 * @returns {string} - Base64 representation
 */
export const encodeBase64 = (text) => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    let binary = '';
    data.forEach(byte => binary += String.fromCharCode(byte));
    return btoa(binary);
  } catch {
    return '[Encode failed]';
  }
};

/**
 * Decodes Base64 back to text
 * @param {string} text - The Base64 to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeBase64 = (text) => {
  try {
    const binary = atob(text);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to Base32 (RFC 4648)
 * @param {string} text - The text to encode
 * @returns {string} - Base32 representation
 */
export const encodeBase32 = (text) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const bytes = new TextEncoder().encode(text);
  let bits = '';
  bytes.forEach(byte => bits += byte.toString(2).padStart(8, '0'));
  
  // Pad to multiple of 5
  while (bits.length % 5 !== 0) bits += '0';
  
  let result = '';
  for (let i = 0; i < bits.length; i += 5) {
    result += alphabet[parseInt(bits.slice(i, i + 5), 2)];
  }
  
  // Add padding
  const padding = [0, 6, 4, 3, 1][bytes.length % 5];
  return result + '='.repeat(padding);
};

/**
 * Decodes Base32 back to text
 * @param {string} text - The Base32 to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeBase32 = (text) => {
  try {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const cleaned = text.toUpperCase().replace(/=+$/, '');
    let bits = '';
    
    for (const char of cleaned) {
      const idx = alphabet.indexOf(char);
      if (idx >= 0) bits += idx.toString(2).padStart(5, '0');
    }
    
    const bytes = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) {
      bytes.push(parseInt(bits.slice(i, i + 8), 2));
    }
    
    return new TextDecoder().decode(new Uint8Array(bytes));
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to Octal (Base-8)
 * @param {string} text - The text to encode
 * @returns {string} - Octal representation
 */
export const encodeOctal = (text) => {
  return text.split('').map(char =>
    char.charCodeAt(0).toString(8).padStart(3, '0')
  ).join(' ');
};

/**
 * Decodes Octal back to text
 * @param {string} text - The Octal to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeOctal = (text) => {
  try {
    return text.split(' ').map(octal =>
      String.fromCharCode(parseInt(octal, 8))
    ).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to ASCII85 (Base85)
 * @param {string} text - The text to encode
 * @returns {string} - ASCII85 representation
 */
export const encodeAscii85 = (text) => {
  const bytes = new TextEncoder().encode(text);
  let result = '<~';
  
  for (let i = 0; i < bytes.length; i += 4) {
    let value = 0;
    let count = 0;
    for (let j = 0; j < 4 && i + j < bytes.length; j++) {
      value = value * 256 + bytes[i + j];
      count++;
    }
    // Pad with zeros
    for (let j = count; j < 4; j++) value *= 256;
    
    if (value === 0 && count === 4) {
      result += 'z';
    } else {
      const encoded = [];
      for (let j = 0; j < 5; j++) {
        encoded.unshift(String.fromCharCode((value % 85) + 33));
        value = Math.floor(value / 85);
      }
      result += encoded.slice(0, count + 1).join('');
    }
  }
  
  return result + '~>';
};

/**
 * Decodes ASCII85 back to text
 * @param {string} text - The ASCII85 to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeAscii85 = (text) => {
  try {
    let data = text.replace(/^<~|~>$/g, '').replace(/\s/g, '');
    const bytes = [];
    let i = 0;
    
    while (i < data.length) {
      if (data[i] === 'z') {
        bytes.push(0, 0, 0, 0);
        i++;
      } else {
        let value = 0;
        let count = Math.min(5, data.length - i);
        for (let j = 0; j < count; j++) {
          value = value * 85 + (data.charCodeAt(i + j) - 33);
        }
        for (let j = count; j < 5; j++) value = value * 85 + 84;
        
        const decoded = [];
        for (let j = 0; j < 4; j++) {
          decoded.unshift(value & 0xFF);
          value = Math.floor(value / 256);
        }
        bytes.push(...decoded.slice(0, count - 1));
        i += count;
      }
    }
    
    return new TextDecoder().decode(new Uint8Array(bytes));
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to Quoted-Printable (email encoding)
 * @param {string} text - The text to encode
 * @returns {string} - Quoted-Printable representation
 */
export const encodeQuotedPrintable = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if ((code >= 33 && code <= 60) || (code >= 62 && code <= 126)) {
      return char;
    }
    return '=' + code.toString(16).toUpperCase().padStart(2, '0');
  }).join('');
};

/**
 * Decodes Quoted-Printable back to text
 * @param {string} text - The Quoted-Printable to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeQuotedPrintable = (text) => {
  try {
    return text.replace(/=([0-9A-F]{2})/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to A1Z26 (letter to number: A=1, B=2, etc.)
 * @param {string} text - The text to encode
 * @returns {string} - A1Z26 representation
 */
export const encodeA1Z26 = (text) => {
  return text.toLowerCase().split('').map(char => {
    if (/[a-z]/.test(char)) {
      return (char.charCodeAt(0) - 96).toString();
    }
    if (char === ' ') return '/';
    return char;
  }).join('-').replace(/-\/-/g, ' / ');
};

/**
 * Decodes A1Z26 back to text
 * @param {string} text - The A1Z26 to decode
 * @returns {string} - Decoded text or error message
 */
export const decodeA1Z26 = (text) => {
  try {
    return text.replace(/ \/ /g, '-/-').split('-').map(code => {
      if (code === '/') return ' ';
      const num = parseInt(code);
      if (num >= 1 && num <= 26) {
        return String.fromCharCode(num + 96);
      }
      return code;
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Encodes text to Brainfuck programming language
 * @param {string} text - The text to encode
 * @returns {string} - Brainfuck representation
 */
export const encodeBrainfuck = (text) => {
  let result = '';
  let currentValue = 0;
  
  for (const char of text) {
    const target = char.charCodeAt(0);
    const diff = target - currentValue;
    
    if (diff > 0) {
      result += '+'.repeat(diff);
    } else if (diff < 0) {
      result += '-'.repeat(-diff);
    }
    
    result += '.';
    currentValue = target;
  }
  
  return result;
};

/**
 * Decodes Brainfuck back to text (executes the program)
 * @param {string} code - The Brainfuck code
 * @returns {string} - Output text
 */
export const decodeBrainfuck = (code) => {
  try {
    const memory = new Array(30000).fill(0);
    let pointer = 0;
    let output = '';
    let i = 0;
    let iterations = 0;
    const maxIterations = 100000;
    
    while (i < code.length && iterations < maxIterations) {
      iterations++;
      switch (code[i]) {
        case '>': pointer++; break;
        case '<': pointer--; break;
        case '+': memory[pointer] = (memory[pointer] + 1) % 256; break;
        case '-': memory[pointer] = (memory[pointer] - 1 + 256) % 256; break;
        case '.': output += String.fromCharCode(memory[pointer]); break;
        case '[':
          if (memory[pointer] === 0) {
            let depth = 1;
            while (depth > 0) { i++; if (code[i] === '[') depth++; if (code[i] === ']') depth--; }
          }
          break;
        case ']':
          if (memory[pointer] !== 0) {
            let depth = 1;
            while (depth > 0) { i--; if (code[i] === ']') depth++; if (code[i] === '[') depth--; }
          }
          break;
      }
      i++;
    }
    
    return output || '[No output]';
  } catch {
    return '[Decode failed]';
  }
};
