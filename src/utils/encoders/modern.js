/**
 * Modern Tech Encoders
 * Digital, social media, and technology-themed encodings
 */

/**
 * Barcode Code128 pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - Barcode pattern
 */
export const encodeCode128 = (text) => {
  const bars = ['▌', '▐', '█', '░'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const binary = code.toString(2).padStart(8, '0');
    return binary.split('').map((b, i) => 
      b === '1' ? bars[i % 2] : bars[2 + i % 2]
    ).join('');
  }).join('|');
};

/**
 * DataMatrix pattern encoding
 * @param {string} text - The text to encode
 * @returns {string} - DataMatrix-like pattern
 */
export const encodeDataMatrix = (text) => {
  const blocks = ['⬛', '⬜'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const binary = code.toString(2).padStart(9, '0');
    // Create 3x3 grid from 9 bits
    let grid = '┌───┐\n│';
    for (let i = 0; i < 9; i++) {
      grid += blocks[binary[i] === '1' ? 0 : 1];
    }
    grid += '│\n└───┘';
    return grid;
  }).join('\n');
};

/**
 * PDF417 barcode style encoding
 * @param {string} text - The text to encode
 * @returns {string} - PDF417 pattern
 */
export const encodePDF417 = (text) => {
  const patterns = ['▐▌', '▐█', '█▌', '██', '░▐', '░█', '▐░', '█░'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return `[${patterns[code % patterns.length]}:${code.toString(16)}]`;
  }).join('');
};

/**
 * Hashtag encoding
 * @param {string} text - The text to encode
 * @returns {string} - Hashtag format
 */
export const encodeHashtag = (text) => {
  const words = text.split(/\s+/);
  return words.map(word => {
    if (word.length === 0) return '';
    const code = word.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0);
    return `#${word}${code}`;
  }).join(' ');
};

/**
 * Emoji reaction encoding
 * @param {string} text - The text to encode
 * @returns {string} - Emoji reactions
 */
export const encodeEmojiReaction = (text) => {
  const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '💯', '🔥', '✨', '👀', '🙏', '💪', '🤔', '👏'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const count = (code % 5) + 1;
    const emoji = reactions[code % reactions.length];
    return `${emoji.repeat(count)}`;
  }).join(' ');
};

/**
 * Social media mention encoding
 * @param {string} text - The text to encode
 * @returns {string} - Mention format
 */
export const encodeMention = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return `@user_${code.toString(16)}`;
  }).join(' ');
};

/**
 * URL shortener style encoding
 * @param {string} text - The text to encode
 * @returns {string} - Short URL format
 */
export const encodeShortURL = (text) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return text.split('').map(c => {
    const code = c.charCodeAt(0);
    let short = '';
    let n = code;
    while (n > 0) {
      short = chars[n % chars.length] + short;
      n = Math.floor(n / chars.length);
    }
    return `bit.ly/${short || 'a'}`;
  }).join(' | ');
};

/**
 * Git commit hash encoding
 * @param {string} text - The text to encode
 * @returns {string} - Git commit style
 */
export const encodeGitCommit = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    // Generate 7-char hash-like string
    let hash = '';
    for (let i = 0; i < 7; i++) {
      hash += ((code * (i + 1) * 17) % 16).toString(16);
    }
    return hash;
  }).join(' ');
};

/**
 * Decode Git commit hash
 */
export const decodeGitCommit = (text) => {
  try {
    return text.split(' ').map(hash => {
      // Reverse the first digit
      const code = parseInt(hash[0], 16) * 16 + parseInt(hash[1], 16);
      return String.fromCharCode(code);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * JSON path encoding
 * @param {string} text - The text to encode
 * @returns {string} - JSON path format
 */
export const encodeJSONPath = (text) => {
  return text.split('').map((char, i) => {
    const code = char.charCodeAt(0);
    return `$.data[${i}].char_${code}`;
  }).join('\n');
};

/**
 * CSS color encoding
 * @param {string} text - The text to encode
 * @returns {string} - CSS color format
 */
export const encodeCSSColor = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const r = (code * 2) % 256;
    const g = (code * 3) % 256;
    const b = (code * 5) % 256;
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }).join(' ');
};

/**
 * Decode CSS color
 */
export const decodeCSSColor = (text) => {
  try {
    return text.split(' ').map(color => {
      const hex = color.replace('#', '');
      const r = parseInt(hex.slice(0, 2), 16);
      // Reverse: code = r / 2
      return String.fromCharCode(Math.round(r / 2));
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Pixel coordinate encoding
 * @param {string} text - The text to encode
 * @returns {string} - Pixel coordinates
 */
export const encodePixelCoord = (text) => {
  return text.split('').map((char, i) => {
    const code = char.charCodeAt(0);
    const x = code % 100;
    const y = Math.floor(code / 100) * 10 + i;
    return `px(${x},${y})`;
  }).join(' ');
};

/**
 * API endpoint encoding
 * @param {string} text - The text to encode
 * @returns {string} - API endpoint format
 */
export const encodeAPIEndpoint = (text) => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  return text.split('').map((char, _i) => {
    const code = char.charCodeAt(0);
    const method = methods[code % methods.length];
    return `${method} /api/v1/char/${code}`;
  }).join('\n');
};

/**
 * Cron expression encoding
 * @param {string} text - The text to encode
 * @returns {string} - Cron format
 */
export const encodeCron = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const minute = code % 60;
    const hour = code % 24;
    const day = (code % 28) + 1;
    const month = (code % 12) + 1;
    const dow = code % 7;
    return `${minute} ${hour} ${day} ${month} ${dow}`;
  }).join(' | ');
};

/**
 * Version number encoding
 * @param {string} text - The text to encode
 * @returns {string} - SemVer format
 */
export const encodeVersion = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const major = Math.floor(code / 100);
    const minor = Math.floor((code % 100) / 10);
    const patch = code % 10;
    return `v${major}.${minor}.${patch}`;
  }).join(' ');
};

/**
 * Decode Version number
 */
export const decodeVersion = (text) => {
  try {
    return text.split(' ').map(ver => {
      const match = ver.match(/v(\d+)\.(\d+)\.(\d+)/);
      if (!match) return '?';
      const code = parseInt(match[1]) * 100 + parseInt(match[2]) * 10 + parseInt(match[3]);
      return String.fromCharCode(code);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Log level encoding
 * @param {string} text - The text to encode
 * @returns {string} - Log format
 */
export const encodeLogLevel = (text) => {
  const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
  return text.split('').map((char, _i) => {
    const code = char.charCodeAt(0);
    const level = levels[code % levels.length];
    const timestamp = new Date(code * 1000000).toISOString();
    return `[${timestamp}] ${level}: 0x${code.toString(16).toUpperCase()}`;
  }).join('\n');
};

/**
 * Environment variable encoding
 * @param {string} text - The text to encode
 * @returns {string} - Env var format
 */
export const encodeEnvVar = (text) => {
  return text.split('').map((char, i) => {
    const code = char.charCodeAt(0);
    return `CHAR_${i}=${code}`;
  }).join('\n');
};

/**
 * Docker tag encoding
 * @param {string} text - The text to encode
 * @returns {string} - Docker tag format
 */
export const encodeDockerTag = (text) => {
  return text.split('').map((char, i) => {
    const code = char.charCodeAt(0);
    return `registry/image:${code}-${i}`;
  }).join(' | ');
};

/**
 * Kubernetes label encoding
 * @param {string} text - The text to encode
 * @returns {string} - K8s label format
 */
export const encodeK8sLabel = (text) => {
  return text.split('').map((char, i) => {
    const code = char.charCodeAt(0);
    return `app.kubernetes.io/char-${i}: "${code}"`;
  }).join('\n');
};

/**
 * WiFi signal encoding
 * @param {string} text - The text to encode
 * @returns {string} - WiFi signal pattern
 */
export const encodeWiFiSignal = (text) => {
  const signals = ['📶', '📡', '🛜', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const strength = Math.floor((code / 256) * signals.length);
    return signals[strength] + code.toString(16);
  }).join(' ');
};

/**
 * Battery level encoding
 * @param {string} text - The text to encode
 * @returns {string} - Battery level pattern
 */
export const encodeBattery = (text) => {
  const levels = ['🪫', '🔋'];
  const bars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const percent = Math.floor((code / 256) * 100);
    const barIdx = Math.floor((code / 256) * bars.length);
    return `${levels[code % 2]}${bars[barIdx]}${percent}%`;
  }).join(' ');
};

/**
 * Progress bar encoding
 * @param {string} text - The text to encode
 * @returns {string} - Progress bar pattern
 */
export const encodeProgressBar = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const percent = Math.floor((code / 256) * 100);
    const filled = Math.floor(percent / 10);
    const empty = 10 - filled;
    return `[${('█').repeat(filled)}${'░'.repeat(empty)}] ${percent}%`;
  }).join('\n');
};

/**
 * Notification badge encoding
 * @param {string} text - The text to encode
 * @returns {string} - Badge notification format
 */
export const encodeNotificationBadge = (text) => {
  const icons = ['📧', '📱', '💬', '🔔', '📢', '⚡', '🎮', '📷'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const icon = icons[code % icons.length];
    const count = code % 100;
    return `${icon}(${count})`;
  }).join(' ');
};

/**
 * Status indicator encoding
 * @param {string} text - The text to encode
 * @returns {string} - Status format
 */
export const encodeStatus = (text) => {
  const statuses = ['🟢 ONLINE', '🟡 IDLE', '🔴 OFFLINE', '⚫ INVISIBLE', '🟣 DND', '🔵 BUSY'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return `[${statuses[code % statuses.length]}:${code}]`;
  }).join(' ');
};

/**
 * File size encoding
 * @param {string} text - The text to encode
 * @returns {string} - File size format
 */
export const encodeFileSize = (text) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const unitIdx = code % units.length;
    const size = ((code * 17) % 1000) + 1;
    return `${size}${units[unitIdx]}`;
  }).join(' ');
};

/**
 * Rating star encoding
 * @param {string} text - The text to encode
 * @returns {string} - Star rating format
 */
export const encodeRating = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const stars = (code % 5) + 1;
    const empty = 5 - stars;
    return `${'★'.repeat(stars)}${'☆'.repeat(empty)}(${code})`;
  }).join(' ');
};

/**
 * Checkbox/Todo encoding
 * @param {string} text - The text to encode
 * @returns {string} - Checkbox format
 */
export const encodeCheckbox = (text) => {
  return text.split('').map((char, _i) => {
    const code = char.charCodeAt(0);
    const checked = code % 2 === 0 ? '☑' : '☐';
    return `${checked} Task_${code}`;
  }).join('\n');
};
