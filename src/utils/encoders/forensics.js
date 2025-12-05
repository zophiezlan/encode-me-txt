/**
 * Forensic & Security Encoders
 * Digital forensics, steganography, and security-themed encodings
 */

/**
 * Timestamp encoding - encodes as Unix timestamps
 * @param {string} text - The text to encode
 * @returns {string} - Timestamp encoded text
 */
export const encodeTimestamp = (text) => {
  const baseTime = 1000000000; // Base timestamp
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return (baseTime + code * 86400).toString();
  }).join(' ');
};

/**
 * Decode Timestamp encoding
 */
export const decodeTimestamp = (text) => {
  try {
    const baseTime = 1000000000;
    return text.split(' ').map(ts => {
      const code = Math.round((parseInt(ts) - baseTime) / 86400);
      return String.fromCharCode(code);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * MAC address encoding
 * @param {string} text - The text to encode
 * @returns {string} - MAC address format
 */
export const encodeMACAddress = (text) => {
  const result = [];
  for (let i = 0; i < text.length; i += 3) {
    const chunk = text.slice(i, i + 3);
    const bytes = chunk.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0'));
    while (bytes.length < 6) bytes.push('00');
    result.push(bytes.slice(0, 6).join(':').toUpperCase());
  }
  return result.join(' | ');
};

/**
 * IP address encoding
 * @param {string} text - The text to encode
 * @returns {string} - IP address format
 */
export const encodeIPAddress = (text) => {
  const result = [];
  for (let i = 0; i < text.length; i += 4) {
    const chunk = text.slice(i, i + 4);
    const octets = chunk.split('').map(c => c.charCodeAt(0) % 256);
    while (octets.length < 4) octets.push(0);
    result.push(octets.join('.'));
  }
  return result.join(' ');
};

/**
 * UUID-style encoding
 * @param {string} text - The text to encode
 * @returns {string} - UUID format
 */
export const encodeUUID = (text) => {
  const result = [];
  for (let i = 0; i < text.length; i += 8) {
    const chunk = text.slice(i, i + 8).padEnd(8, '\0');
    const hex = chunk.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    // Format: 8-4-4-4-12
    const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}`;
    result.push(uuid);
  }
  return result.join(' ');
};

/**
 * SHA-like visual hash encoding
 * @param {string} text - The text to encode
 * @returns {string} - Visual hash pattern
 */
export const encodeVisualHash = (text) => {
  const hashChars = '█▓▒░○●◐◑◒◓▪▫';
  let hash = 0;
  for (const char of text) {
    hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
  }
  
  const result = [];
  let h = Math.abs(hash);
  for (let i = 0; i < 32; i++) {
    result.push(hashChars[h % hashChars.length]);
    h = Math.floor(h / hashChars.length) || (h + i + 1);
  }
  return result.join('');
};

/**
 * File signature (magic bytes) encoding
 * @param {string} text - The text to encode
 * @returns {string} - Magic bytes format
 */
export const encodeMagicBytes = (text) => {
  const magicHeaders = {
    '0': '‰PNG', '1': 'PK\x03\x04', '2': '%PDF', '3': 'GIF89a',
    '4': '\xFF\xD8\xFF', '5': 'RIFF', '6': 'MZ', '7': '\x7FELF',
    '8': 'BM', '9': 'ID3'
  };
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const idx = code % 10;
    const header = magicHeaders[idx.toString()];
    const hex = code.toString(16).padStart(2, '0').toUpperCase();
    return `[${header}:${hex}]`;
  }).join('');
};

/**
 * Registry path encoding
 * @param {string} text - The text to encode
 * @returns {string} - Windows registry format
 */
export const encodeRegistryPath = (text) => {
  const hives = ['HKEY_CURRENT_USER', 'HKEY_LOCAL_MACHINE', 'HKEY_CLASSES_ROOT', 'HKEY_USERS'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hive = hives[code % hives.length];
    const path = code.toString(16).toUpperCase();
    return `${hive}\\Software\\${path}`;
  }).join('\n');
};

/**
 * Hex dump forensic encoding
 * @param {string} text - The text to encode
 * @returns {string} - Hex dump format
 */
export const encodeHexDump = (text) => {
  const lines = [];
  for (let i = 0; i < text.length; i += 16) {
    const chunk = text.slice(i, i + 16);
    const offset = i.toString(16).padStart(8, '0').toUpperCase();
    const hex = chunk.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
    const ascii = chunk.split('').map(c => {
      const code = c.charCodeAt(0);
      return (code >= 32 && code < 127) ? c : '.';
    }).join('');
    lines.push(`${offset}  ${hex.padEnd(48)}  |${ascii}|`);
  }
  return lines.join('\n');
};

/**
 * Base58 (Bitcoin-style) encoding
 * @param {string} text - The text to encode
 * @returns {string} - Base58 encoded text
 */
export const encodeBase58 = (text) => {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = '';
  
  for (const char of text) {
    let num = char.charCodeAt(0);
    let encoded = '';
    while (num > 0) {
      encoded = alphabet[num % 58] + encoded;
      num = Math.floor(num / 58);
    }
    result += encoded || alphabet[0];
    result += '.';
  }
  
  return result.slice(0, -1);
};

/**
 * Decode Base58
 */
export const decodeBase58 = (text) => {
  try {
    const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    return text.split('.').map(part => {
      let num = 0;
      for (const char of part) {
        num = num * 58 + alphabet.indexOf(char);
      }
      return String.fromCharCode(num);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Stealth text encoding using homoglyphs
 * @param {string} text - The text to encode
 * @returns {string} - Homoglyph encoded text
 */
export const encodeHomoglyph = (text) => {
  const homoglyphs = {
    'a': 'а', 'e': 'е', 'i': 'і', 'o': 'о', 'p': 'р', 'c': 'с', 'y': 'у',
    'A': 'А', 'E': 'Е', 'I': 'І', 'O': 'О', 'P': 'Р', 'C': 'С', 'T': 'Т',
    'B': 'В', 'H': 'Н', 'K': 'К', 'M': 'М', 'X': 'Х'
  };
  
  return text.split('').map(char => homoglyphs[char] || char).join('');
};

/**
 * Decode Homoglyph
 */
export const decodeHomoglyph = (text) => {
  const reverseMap = {
    'а': 'a', 'е': 'e', 'і': 'i', 'о': 'o', 'р': 'p', 'с': 'c', 'у': 'y',
    'А': 'A', 'Е': 'E', 'І': 'I', 'О': 'O', 'Р': 'P', 'С': 'C', 'Т': 'T',
    'В': 'B', 'Н': 'H', 'К': 'K', 'М': 'M', 'Х': 'X'
  };
  
  return text.split('').map(char => reverseMap[char] || char).join('');
};

/**
 * Unicode tag steganography (invisible tags)
 * @param {string} text - The text to encode
 * @returns {string} - Unicode tag encoded
 */
export const encodeUnicodeTag = (text) => {
  // Unicode tag characters U+E0000 - U+E007F (invisible in most fonts)
  const TAG_BASE = 0xE0000;
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code < 128) {
      return String.fromCodePoint(TAG_BASE + code);
    }
    return char;
  }).join('');
};

/**
 * Decode Unicode tag steganography
 */
export const decodeUnicodeTag = (text) => {
  try {
    const TAG_BASE = 0xE0000;
    let result = '';
    for (const char of text) {
      const code = char.codePointAt(0);
      if (code >= TAG_BASE && code < TAG_BASE + 128) {
        result += String.fromCharCode(code - TAG_BASE);
      } else {
        result += char;
      }
    }
    return result;
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Variation selector steganography
 * @param {string} text - The text to encode
 * @returns {string} - Variation selector encoded
 */
export const encodeVariationSelector = (text) => {
  const VS_BASE = 0xFE00; // Variation selectors U+FE00-U+FE0F
  const carrier = '★'; // Carrier character
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const nibble1 = (code >> 4) & 0xF;
    const nibble2 = code & 0xF;
    return carrier + String.fromCharCode(VS_BASE + nibble1) + 
           carrier + String.fromCharCode(VS_BASE + nibble2);
  }).join('');
};

/**
 * Metadata-style encoding
 * @param {string} text - The text to encode
 * @returns {string} - EXIF-like metadata format
 */
export const encodeMetadata = (text) => {
  const tags = ['Artist', 'Copyright', 'DateTime', 'Description', 'Software', 'Title'];
  return text.split('').map((char, i) => {
    const tag = tags[i % tags.length];
    const code = char.charCodeAt(0);
    return `<${tag}>0x${code.toString(16).toUpperCase()}</${tag}>`;
  }).join('\n');
};

/**
 * Null byte injection pattern
 * @param {string} text - The text to encode
 * @returns {string} - Null byte pattern
 */
export const encodeNullByte = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hex = code.toString(16).padStart(2, '0');
    return `%00${hex}`;
  }).join('');
};

/**
 * Decode Null byte pattern
 */
export const decodeNullByte = (text) => {
  try {
    const matches = text.match(/%00([0-9a-fA-F]{2})/g);
    if (!matches) return '[Invalid format]';
    return matches.map(m => String.fromCharCode(parseInt(m.slice(3), 16))).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * SSL/TLS certificate field encoding
 * @param {string} text - The text to encode
 * @returns {string} - Certificate-like format
 */
export const encodeCertificate = (text) => {
  const lines = ['-----BEGIN ENCODED MESSAGE-----'];
  const encoded = text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
  
  for (let i = 0; i < encoded.length; i += 64) {
    lines.push(encoded.slice(i, i + 64));
  }
  
  lines.push('-----END ENCODED MESSAGE-----');
  return lines.join('\n');
};

/**
 * DNS TXT record encoding
 * @param {string} text - The text to encode
 * @returns {string} - DNS TXT format
 */
export const encodeDNSTXT = (text) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += 20) {
    const chunk = text.slice(i, i + 20);
    const encoded = chunk.split('').map(c => c.charCodeAt(0).toString(16)).join('');
    chunks.push(`"v=encoded1; p=${encoded}"`);
  }
  return `TXT @ IN (\n${chunks.join('\n')}\n)`;
};

/**
 * JWT-style encoding (header.payload.signature)
 * @param {string} text - The text to encode
 * @returns {string} - JWT-like format
 */
export const encodeJWTStyle = (text) => {
  const toBase64 = (s) => btoa(s).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const header = toBase64(JSON.stringify({ alg: 'ENC', typ: 'TXT' }));
  const payload = toBase64(text);
  const signature = toBase64(text.split('').reduce((a, c) => a + c.charCodeAt(0), 0).toString(16));
  
  return `${header}.${payload}.${signature}`;
};

/**
 * Decode JWT-style
 */
export const decodeJWTStyle = (text) => {
  try {
    const fromBase64 = (s) => {
      s = s.replace(/-/g, '+').replace(/_/g, '/');
      while (s.length % 4) s += '=';
      return atob(s);
    };
    
    const parts = text.split('.');
    if (parts.length !== 3) return '[Invalid JWT format]';
    return fromBase64(parts[1]);
  } catch {
    return '[Decode failed]';
  }
};

/**
 * HTTP header encoding
 * @param {string} text - The text to encode
 * @returns {string} - HTTP header format
 */
export const encodeHTTPHeader = (text) => {
  const headers = [];
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    headers.push(`X-Encoded-${i}: ${code.toString(16).toUpperCase()}`);
  }
  return headers.join('\n');
};

/**
 * SQL injection-style encoding (educational)
 * @param {string} text - The text to encode
 * @returns {string} - SQL-escaped format
 */
export const encodeSQLEscape = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return `CHAR(${code})`;
  }).join('||');
};

/**
 * Regex pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - Regex pattern
 */
export const encodeRegexPattern = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return `\\x${code.toString(16).padStart(2, '0')}`;
  }).join('');
};

/**
 * Decode Regex pattern
 */
export const decodeRegexPattern = (text) => {
  try {
    const matches = text.match(/\\x([0-9a-fA-F]{2})/g);
    if (!matches) return '[Invalid format]';
    return matches.map(m => String.fromCharCode(parseInt(m.slice(2), 16))).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Assembly-style encoding
 * @param {string} text - The text to encode
 * @returns {string} - Assembly format
 */
export const encodeAssembly = (text) => {
  return text.split('').map((char, i) => {
    const code = char.charCodeAt(0);
    return `MOV BYTE PTR [${i.toString(16).toUpperCase()}h], ${code.toString(16).toUpperCase()}h`;
  }).join('\n');
};
