/**
 * Modern Cryptographic Encoders
 * Modern cryptographic standards and encoding formats
 * Note: These are REPRESENTATIONS of crypto formats, not actual encryption
 */

// ============================================
// MODERN BASE ENCODINGS
// ============================================

/**
 * Bech32 encoding (Bitcoin SegWit addresses)
 * Used in cryptocurrency for human-readable addresses
 */
export const encodeBech32 = (text) => {
  const charset = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

  const encoded = text.split('').map(char => {
    const code = char.charCodeAt(0);
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += charset[(code >> (i * 5)) % 32];
    }
    return result;
  }).join('');

  // Bech32 format: hrp1 + encoded data
  return `bc1${encoded}`;
};

/**
 * Decode Bech32
 */
export const decodeBech32 = (text) => {
  const charset = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

  try {
    // Remove the 'bc1' prefix
    const data = text.startsWith('bc1') ? text.slice(3) : text;

    const result = [];
    for (let i = 0; i < data.length; i += 6) {
      const chunk = data.slice(i, i + 6);
      let code = 0;
      for (let j = 0; j < chunk.length; j++) {
        const val = charset.indexOf(chunk[j]);
        if (val >= 0) {
          code |= (val << (j * 5));
        }
      }
      result.push(String.fromCharCode(code % 256));
    }
    return result.join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Z-Base-32 encoding
 * Human-oriented base-32 encoding by Zooko
 */
export const encodeZBase32 = (text) => {
  const alphabet = 'ybndrfg8ejkmcpqxot1uwisza345h769';

  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    let result = '';
    let val = code;
    for (let i = 0; i < 2; i++) {
      result += alphabet[val % 32];
      val = Math.floor(val / 32);
    }
    return result;
  }).join('');
};

/**
 * Decode Z-Base-32
 */
export const decodeZBase32 = (text) => {
  const alphabet = 'ybndrfg8ejkmcpqxot1uwisza345h769';

  try {
    const result = [];
    for (let i = 0; i < text.length; i += 2) {
      const chunk = text.slice(i, i + 2);
      let code = 0;
      for (let j = 0; j < chunk.length; j++) {
        const val = alphabet.indexOf(chunk[j]);
        if (val >= 0) {
          code += val * Math.pow(32, j);
        }
      }
      result.push(String.fromCharCode(code));
    }
    return result.join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Crockford's Base32
 * Human-oriented base-32 encoding designed to be easier to use
 */
export const encodeCrockfordBase32 = (text) => {
  const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    let result = '';
    let val = code;
    for (let i = 0; i < 2; i++) {
      result += alphabet[val % 32];
      val = Math.floor(val / 32);
    }
    return result;
  }).join('-');
};

/**
 * Decode Crockford's Base32
 */
export const decodeCrockfordBase32 = (text) => {
  const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

  try {
    const chunks = text.split('-');
    return chunks.map(chunk => {
      let code = 0;
      for (let j = 0; j < chunk.length; j++) {
        const val = alphabet.indexOf(chunk[j].toUpperCase());
        if (val >= 0) {
          code += val * Math.pow(32, j);
        }
      }
      return String.fromCharCode(code);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// CRYPTOGRAPHIC HASH REPRESENTATIONS
// ============================================

/**
 * SHA-256 style representation (visual, not actual SHA-256)
 * Represents text as hex digest format
 */
export const encodeSHA256Style = (text) => {
  const hashes = [];
  for (const char of text) {
    const code = char.charCodeAt(0);
    // Generate pseudo-hash by mixing character codes
    let hash = '';
    for (let i = 0; i < 64; i++) {
      const byte = (code * (i + 1) * 2654435761) % 16;
      hash += byte.toString(16);
    }
    hashes.push(hash);
  }
  return hashes.join('\n');
};

/**
 * Argon2 style representation
 * Modern password hashing format
 */
export const encodeArgon2Style = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const version = 19;
    const memory = 4096 + (code % 1024);
    const iterations = 3 + (code % 10);
    const parallelism = 1 + (code % 4);

    // Generate fake salt and hash
    const salt = btoa(String.fromCharCode(code, idx, code + idx)).slice(0, 22);
    const hash = btoa(String.fromCharCode(...Array.from({length: 32}, (_, i) =>
      (code * (i + 1) * 997) % 256
    ))).slice(0, 43);

    return `$argon2id$v=${version}$m=${memory},t=${iterations},p=${parallelism}$${salt}$${hash}`;
  }).join('\n');
};

/**
 * BCrypt style representation
 * Popular password hashing format
 */
export const encodeBCryptStyle = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const cost = 10 + (code % 6); // Work factor 10-15

    // Generate fake salt
    const salt = btoa(String.fromCharCode(code, idx, code + idx)).slice(0, 22);
    const hash = btoa(String.fromCharCode(...Array.from({length: 31}, (_, i) =>
      (code * (i + 1) * 991) % 256
    ))).slice(0, 31);

    return `$2b$${cost.toString().padStart(2, '0')}$${salt}${hash}`;
  }).join('\n');
};

// ============================================
// KEY REPRESENTATIONS
// ============================================

/**
 * PEM format representation (RSA key style)
 * Standard format for cryptographic keys
 */
export const encodePEMStyle = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const keyData = btoa(String.fromCharCode(...Array.from({length: 48}, (_, i) =>
      (code * (i + 1) * 1009 + idx) % 256
    )));

    // Format in 64-char lines
    const lines = [];
    for (let i = 0; i < keyData.length; i += 64) {
      lines.push(keyData.slice(i, i + 64));
    }

    return `-----BEGIN RSA PRIVATE KEY-----\n${lines.join('\n')}\n-----END RSA PRIVATE KEY-----`;
  }).join('\n\n');
};

/**
 * SSH public key format
 */
export const encodeSSHKeyStyle = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const keyType = ['ssh-rsa', 'ssh-ed25519', 'ecdsa-sha2-nistp256'][code % 3];
    const keyData = btoa(String.fromCharCode(...Array.from({length: 32}, (_, i) =>
      (code * (i + 1) * 1013 + idx) % 256
    )));

    const comment = `user@host-${code}`;
    return `${keyType} ${keyData} ${comment}`;
  }).join('\n');
};

// ============================================
// MODERN AUTHENTICATION TOKENS
// ============================================

/**
 * TOTP (Time-based One-Time Password) style
 * Used in 2FA systems
 */
export const encodeTOTP = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    // Generate 6-digit TOTP-style code
    const otp = String((code * 997) % 1000000).padStart(6, '0');
    const timeRemaining = 30 - (code % 30);

    return `${otp} (${timeRemaining}s)`;
  }).join(' ');
};

/**
 * Decode TOTP
 */
export const decodeTOTP = (text) => {
  try {
    return text.split(' ').filter(t => t.match(/^\d{6}$/)).map(otp => {
      const num = parseInt(otp);
      // Reverse lookup
      for (let i = 0; i < 256; i++) {
        if ((i * 997) % 1000000 === num) {
          return String.fromCharCode(i);
        }
      }
      return '?';
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * API Key format
 * Modern API authentication key style
 */
export const encodeAPIKey = (text) => {
  const prefixes = ['sk_live', 'pk_test', 'rk_live', 'ak_prod'];

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const prefix = prefixes[code % prefixes.length];
    const keyData = btoa(String.fromCharCode(...Array.from({length: 24}, (_, i) =>
      (code * (i + 1) * 1019 + idx) % 256
    ))).replace(/[^a-zA-Z0-9]/g, '').slice(0, 48);

    return `${prefix}_${keyData}`;
  }).join('\n');
};

// ============================================
// UNIQUE IDENTIFIERS
// ============================================

/**
 * ULID (Universally Unique Lexicographically Sortable Identifier)
 * Modern alternative to UUID
 */
export const encodeULID = (text) => {
  const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford's Base32

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const timestamp = Date.now() + (code * 1000);

    // Generate ULID format: 10 chars timestamp + 16 chars randomness
    let ulid = '';
    let t = timestamp;
    for (let i = 0; i < 10; i++) {
      ulid = alphabet[t % 32] + ulid;
      t = Math.floor(t / 32);
    }

    for (let i = 0; i < 16; i++) {
      const rand = (code * (i + 1) * 1021 + idx) % 32;
      ulid += alphabet[rand];
    }

    return ulid;
  }).join(' ');
};

/**
 * Decode ULID
 */
export const decodeULID = (text) => {
  const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

  try {
    return text.split(' ').map(ulid => {
      if (ulid.length >= 16) {
        // Extract randomness part
        const rand = ulid.slice(10, 11);
        const idx = alphabet.indexOf(rand);
        // Reverse lookup
        for (let i = 0; i < 256; i++) {
          if ((i * 1021) % 32 === idx) {
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

/**
 * Snowflake ID (Twitter/Discord style)
 * Distributed unique ID generation
 */
export const encodeSnowflake = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const timestamp = Date.now() - 1288834974657; // Epoch offset
    const workerId = code % 32;
    const processId = (code * 2) % 32;
    const sequence = (code * 3 + idx) % 4096;

    // Snowflake: 42 bits timestamp + 5 bits worker + 5 bits process + 12 bits sequence
    const snowflake = (timestamp << 22) | (workerId << 17) | (processId << 12) | sequence;

    return snowflake.toString();
  }).join(' ');
};

/**
 * Decode Snowflake
 */
export const decodeSnowflake = (text) => {
  try {
    return text.split(' ').map(id => {
      const snowflake = BigInt(id);
      const workerId = Number((snowflake >> 17n) & 0x1Fn);
      // Reverse lookup
      for (let i = 0; i < 256; i++) {
        if (i % 32 === workerId) {
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
// CERTIFICATE & X.509 FORMATS
// ============================================

/**
 * X.509 Certificate Serial Number style
 */
export const encodeX509Serial = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const serial = [];
    for (let i = 0; i < 16; i++) {
      const byte = (code * (i + 1) * 1031 + idx) % 256;
      serial.push(byte.toString(16).padStart(2, '0').toUpperCase());
    }
    return serial.join(':');
  }).join('\n');
};

/**
 * Decode X.509 Serial
 */
export const decodeX509Serial = (text) => {
  try {
    return text.split('\n').map(serial => {
      const bytes = serial.split(':');
      if (bytes.length > 0) {
        const firstByte = parseInt(bytes[0], 16);
        // Reverse lookup
        for (let i = 0; i < 256; i++) {
          if ((i * 1031) % 256 === firstByte) {
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
// BLOCKCHAIN & CRYPTOCURRENCY
// ============================================

/**
 * Ethereum address style
 */
export const encodeEthereumAddress = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const address = '0x';
    let addr = address;
    for (let i = 0; i < 40; i++) {
      const nibble = (code * (i + 1) * 1033 + idx) % 16;
      addr += nibble.toString(16);
    }
    return addr;
  }).join('\n');
};

/**
 * Bitcoin address style (Base58Check)
 */
export const encodeBitcoinAddress = (text) => {
  const base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    let address = code % 2 === 0 ? '1' : '3'; // P2PKH or P2SH

    let val = code * 1000 + idx;
    for (let i = 0; i < 32; i++) {
      address += base58[val % 58];
      val = Math.floor(val / 58) || (val + i + 1);
    }

    return address;
  }).join('\n');
};

// ============================================
// ENCODING STRENGTH INDICATORS
// ============================================

/**
 * Encode with cryptographic strength indicators
 */
export const encodeWithStrength = (text) => {
  const algorithms = [
    { name: 'AES-256-GCM', bits: 256 },
    { name: 'ChaCha20-Poly1305', bits: 256 },
    { name: 'AES-128-CBC', bits: 128 },
    { name: 'RSA-2048', bits: 2048 },
    { name: 'RSA-4096', bits: 4096 },
    { name: 'Ed25519', bits: 256 },
    { name: 'ECDSA-P-256', bits: 256 }
  ];

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const algo = algorithms[code % algorithms.length];
    const strength = code % 100;
    const indicator = '█'.repeat(Math.floor(strength / 10));

    return `[${algo.name}] ${indicator} ${strength}% (${algo.bits}-bit)`;
  }).join('\n');
};

// ============================================
// MULTIBASE (IPFS/MULTIFORMATS)
// ============================================

/**
 * Multibase encoding (used in IPFS)
 * Self-describing base encoding
 */
export const encodeMultibase = (text) => {
  // Multibase prefixes: f=base16, b=base32, z=base58btc, m=base64
  const bases = [
    { prefix: 'f', name: 'base16', encode: (s) => Buffer.from(s).toString('hex') },
    { prefix: 'b', name: 'base32', encode: (s) => btoa(s).toLowerCase() },
    { prefix: 'z', name: 'base58btc', encode: (s) => btoa(s) },
    { prefix: 'm', name: 'base64', encode: (s) => btoa(s) }
  ];

  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const base = bases[code % bases.length];

    try {
      const encoded = base.encode(char);
      return `${base.prefix}${encoded}`;
    } catch {
      return `${base.prefix}${code.toString(16)}`;
    }
  }).join(' ');
};

/**
 * Decode Multibase
 */
export const decodeMultibase = (text) => {
  try {
    return text.split(' ').map(encoded => {
      const prefix = encoded[0];
      const data = encoded.slice(1);

      switch (prefix) {
        case 'f': // base16
          return String.fromCharCode(parseInt(data.slice(0, 2), 16));
        case 'b': // base32
        case 'z': // base58btc
        case 'm': // base64
          try {
            return atob(data)[0] || '?';
          } catch {
            return '?';
          }
        default:
          return '?';
      }
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};
