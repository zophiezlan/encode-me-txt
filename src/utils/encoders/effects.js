/**
 * Creative Text Effects Encoders
 * Various creative text transformation effects
 */

// ============================================
// TEXT DECORATION EFFECTS
// ============================================

/**
 * Encode with hearts between chars
 */
export const encodeHeartsBetween = (text) => {
  return text.split('').join('♥');
};

/**
 * Encode with stars between chars
 */
export const encodeStarsBetween = (text) => {
  return text.split('').join('★');
};

/**
 * Encode with dots between chars
 */
export const encodeDotsBetween = (text) => {
  return text.split('').join('•');
};

/**
 * Encode with sparkles between chars
 */
export const encodeSparklesBetween = (text) => {
  return text.split('').join('✨');
};

/**
 * Encode with double spacing
 */
export const encodeDoubleSpace = (text) => {
  return text.split('').join(' ');
};

/**
 * Encode with underscores between
 */
export const encodeUnderscoreBetween = (text) => {
  return text.split('').join('_');
};

/**
 * Encode with brackets around each char
 */
export const encodeBracketed = (text) => {
  return text.split('').map(c => `[${c}]`).join('');
};

/**
 * Encode with parentheses around each char
 */
export const encodeParensWrapped = (text) => {
  return text.split('').map(c => `(${c})`).join('');
};

/**
 * Encode with angle brackets
 */
export const encodeAngleBracketed = (text) => {
  return text.split('').map(c => `<${c}>`).join('');
};

/**
 * Encode with curly braces
 */
export const encodeCurlyBracketed = (text) => {
  return text.split('').map(c => `{${c}}`).join('');
};

// ============================================
// TEXT BORDERING
// ============================================

/**
 * Encode with ASCII box
 */
export const encodeASCIIBox = (text) => {
  const len = text.length + 4;
  const top = '+' + '-'.repeat(len) + '+';
  const middle = `|  ${text}  |`;
  return `${top}\n${middle}\n${top}`;
};

/**
 * Encode with fancy box
 */
export const encodeFancyBox = (text) => {
  const len = text.length + 4;
  const top = '╔' + '═'.repeat(len) + '╗';
  const middle = `║  ${text}  ║`;
  const bottom = '╚' + '═'.repeat(len) + '╝';
  return `${top}\n${middle}\n${bottom}`;
};

/**
 * Encode with double box
 */
export const encodeDoubleBox = (text) => {
  const len = text.length + 4;
  const top = '╔' + '═'.repeat(len) + '╗';
  const line = '║' + ' '.repeat(len) + '║';
  const middle = `║  ${text}  ║`;
  const bottom = '╚' + '═'.repeat(len) + '╝';
  return `${top}\n${line}\n${middle}\n${line}\n${bottom}`;
};

/**
 * Encode with rounded box
 */
export const encodeRoundedBox = (text) => {
  const len = text.length + 4;
  const top = '╭' + '─'.repeat(len) + '╮';
  const middle = `│  ${text}  │`;
  const bottom = '╰' + '─'.repeat(len) + '╯';
  return `${top}\n${middle}\n${bottom}`;
};

/**
 * Encode with emoji border
 */
export const encodeEmojiBorder = (text) => {
  const border = '🌟'.repeat(text.length + 4);
  const middle = `🌟 ${text} 🌟`;
  return `${border}\n${middle}\n${border}`;
};

/**
 * Encode with star border
 */
export const encodeStarBorder = (text) => {
  const len = text.length + 4;
  const border = '★'.repeat(len);
  const middle = `★ ${text} ★`;
  return `${border}\n${middle}\n${border}`;
};

// ============================================
// TEXT ALIGNMENT EFFECTS
// ============================================

/**
 * Encode as staircase
 */
export const encodeStaircase = (text) => {
  return text.split('').map((char, i) => ' '.repeat(i) + char).join('\n');
};

/**
 * Encode as reverse staircase
 */
export const encodeReverseStaircase = (text) => {
  const len = text.length - 1;
  return text.split('').map((char, i) => ' '.repeat(len - i) + char).join('\n');
};

/**
 * Encode as pyramid
 */
export const encodePyramid = (text) => {
  const lines = [];
  const len = text.length;
  for (let i = 0; i < len; i++) {
    lines.push(' '.repeat(len - i - 1) + text.slice(0, i + 1));
  }
  return lines.join('\n');
};

/**
 * Encode as diamond shape
 */
export const encodeDiamond = (text) => {
  const len = text.length;
  const lines = [];
  // Top half
  for (let i = 0; i < len; i++) {
    lines.push(' '.repeat(len - i - 1) + text.slice(0, i + 1));
  }
  // Bottom half (reverse)
  for (let i = len - 2; i >= 0; i--) {
    lines.push(' '.repeat(len - i - 1) + text.slice(0, i + 1));
  }
  return lines.join('\n');
};

/**
 * Encode as wave layout pattern (vertical)
 */
export const encodeWaveLayout = (text) => {
  return text.split('').map((char, i) => {
    const offset = Math.round(Math.sin(i * 0.5) * 3 + 3);
    return ' '.repeat(offset) + char;
  }).join('\n');
};

/**
 * Encode as zigzag
 */
export const encodeZigzag = (text) => {
  let direction = 1;
  let position = 0;
  return text.split('').map(char => {
    const result = ' '.repeat(position) + char;
    position += direction;
    if (position >= 5 || position <= 0) direction *= -1;
    return result;
  }).join('\n');
};

// ============================================
// TEXT MANIPULATION
// ============================================

/**
 * Encode with first letter of each word capitalized
 */
export const encodeTitleCase = (text) => {
  return text.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

/**
 * Encode with alternating word case
 */
export const encodeAlternatingWordCase = (text) => {
  return text.split(' ').map((word, i) => 
    i % 2 === 0 ? word.toUpperCase() : word.toLowerCase()
  ).join(' ');
};

/**
 * Encode with first letter lowercase
 */
export const encodeInvertedTitleCase = (text) => {
  return text.split(' ').map(word => 
    word.charAt(0).toLowerCase() + word.slice(1).toUpperCase()
  ).join(' ');
};

/**
 * Encode with random case
 */
export const encodeRandomCase = (text) => {
  return text.split('').map(char => 
    Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
  ).join('');
};

/**
 * Encode with word reversal
 */
export const encodeWordReversal = (text) => {
  return text.split(' ').map(word => word.split('').reverse().join('')).join(' ');
};

/**
 * Encode with word order reversal
 */
export const encodeWordOrderReversal = (text) => {
  return text.split(' ').reverse().join(' ');
};

/**
 * Encode with sentence case
 */
export const encodeSentenceCase = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Encode as toggle case (opposite of current)
 */
export const encodeToggleCase = (text) => {
  return text.split('').map(char => {
    if (char >= 'a' && char <= 'z') return char.toUpperCase();
    if (char >= 'A' && char <= 'Z') return char.toLowerCase();
    return char;
  }).join('');
};

// ============================================
// ARTISTIC TRANSFORMATIONS
// ============================================

/**
 * Encode as ASCII art banner
 */
export const encodeASCIIBanner = (text) => {
  const font = {
    'A': ['  ▄▄  ', ' █  █ ', ' ████ ', ' █  █ ', ' ▀  ▀ '],
    'B': [' ███▄ ', ' █  █ ', ' ███▄ ', ' █  █ ', ' ███▀ '],
    'C': [' ▄███ ', ' █    ', ' █    ', ' █    ', ' ▀███ '],
    'D': [' ███▄ ', ' █  █ ', ' █  █ ', ' █  █ ', ' ███▀ '],
    'E': [' ████ ', ' █    ', ' ███  ', ' █    ', ' ████ '],
    'F': [' ████ ', ' █    ', ' ███  ', ' █    ', ' █    '],
    'G': [' ▄███ ', ' █    ', ' █ ██ ', ' █  █ ', ' ▀███ '],
    'H': [' █  █ ', ' █  █ ', ' ████ ', ' █  █ ', ' █  █ '],
    'I': [' ███ ', '  █  ', '  █  ', '  █  ', ' ███ '],
    'J': ['   ██ ', '    █ ', '    █ ', ' █  █ ', ' ▀██▀ '],
    'K': [' █  █ ', ' █ █  ', ' ██   ', ' █ █  ', ' █  █ '],
    'L': [' █    ', ' █    ', ' █    ', ' █    ', ' ████ '],
    'M': [' █▄▄█ ', ' █ ▀█ ', ' █  █ ', ' █  █ ', ' █  █ '],
    'N': [' █▄ █ ', ' █ ▀█ ', ' █  █ ', ' █  █ ', ' █  █ '],
    'O': [' ▄██▄ ', ' █  █ ', ' █  █ ', ' █  █ ', ' ▀██▀ '],
    'P': [' ███▄ ', ' █  █ ', ' ███▀ ', ' █    ', ' █    '],
    'Q': [' ▄██▄ ', ' █  █ ', ' █  █ ', ' █ █  ', ' ▀█▀█ '],
    'R': [' ███▄ ', ' █  █ ', ' ███▀ ', ' █ █  ', ' █  █ '],
    'S': [' ▄███ ', ' █    ', ' ▀██▄ ', '    █ ', ' ███▀ '],
    'T': [' ████ ', '  █   ', '  █   ', '  █   ', '  █   '],
    'U': [' █  █ ', ' █  █ ', ' █  █ ', ' █  █ ', ' ▀██▀ '],
    'V': [' █  █ ', ' █  █ ', ' █  █ ', '  ██  ', '  ▀   '],
    'W': [' █  █ ', ' █  █ ', ' █  █ ', ' █▄▀█ ', ' █▀▀█ '],
    'X': [' █  █ ', '  ██  ', '  ▀▀  ', '  ██  ', ' █  █ '],
    'Y': [' █  █ ', '  ██  ', '  █   ', '  █   ', '  █   '],
    'Z': [' ████ ', '   █  ', '  █   ', ' █    ', ' ████ '],
    ' ': ['     ', '     ', '     ', '     ', '     ']
  };
  
  const chars = text.toUpperCase().split('').map(c => font[c] || font[' ']);
  const lines = [];
  for (let i = 0; i < 5; i++) {
    lines.push(chars.map(c => c[i]).join(''));
  }
  return lines.join('\n');
};

/**
 * Encode as block letters
 */
export const encodeBlockLetters = (text) => {
  const blocks = {
    'A': '🇦', 'B': '🇧', 'C': '🇨', 'D': '🇩', 'E': '🇪', 'F': '🇫', 'G': '🇬',
    'H': '🇭', 'I': '🇮', 'J': '🇯', 'K': '🇰', 'L': '🇱', 'M': '🇲', 'N': '🇳',
    'O': '🇴', 'P': '🇵', 'Q': '🇶', 'R': '🇷', 'S': '🇸', 'T': '🇹', 'U': '🇺',
    'V': '🇻', 'W': '🇼', 'X': '🇽', 'Y': '🇾', 'Z': '🇿'
  };
  
  return text.toUpperCase().split('').map(c => blocks[c] || c).join(' ');
};

/**
 * Encode as dotted outline
 */
export const encodeDottedOutline = (text) => {
  const line = '·' + '·'.repeat(text.length + 2) + '·';
  const middle = `· ${text} ·`;
  return `${line}\n${middle}\n${line}`;
};

/**
 * Encode with shadow effect
 */
export const encodeShadowEffect = (text) => {
  const shadow = text.split('').map(() => '░').join('');
  return `${text}\n ${shadow}`;
};

/**
 * Encode with 3D effect
 */
export const encode3DEffect = (text) => {
  return `${text}\n  ╲${text}╲\n   ╲${text}╲`;
};

/**
 * Encode with glitch effect
 */
export const encodeGlitchEffect = (text) => {
  const glitchChars = ['̷', '̸', '̵', '̶'];
  return text.split('').map(char => 
    char + glitchChars[Math.floor(Math.random() * glitchChars.length)]
  ).join('');
};

/**
 * Encode as mirrored text
 */
export const encodeMirroredText = (text) => {
  const mirror = text.split('').reverse().join('');
  return `${text} | ${mirror}`;
};

/**
 * Encode with repeating pattern
 */
export const encodeRepeatingPattern = (text) => {
  return `${text} · ${text} · ${text}`;
};

// ============================================
// SPECIAL CHARACTERS
// ============================================

/**
 * Encode with box drawing line characters
 */
export const encodeBoxDrawingLines = (text) => {
  const chars = {
    'a': '┌', 'b': '├', 'c': '┼', 'd': '┤', 'e': '┐', 'f': '└', 'g': '┴',
    'h': '┬', 'i': '│', 'j': '─', 'k': '┘', 'l': '╔', 'm': '╗', 'n': '╚',
    'o': '╝', 'p': '║', 'q': '═', 'r': '╬', 's': '╠', 't': '╣', 'u': '╦',
    'v': '╩', 'w': '▀', 'x': '▄', 'y': '█', 'z': '░'
  };

  return text.toLowerCase().split('').map(c => chars[c] || c).join('');
};

/**
 * Encode with currency symbols
 */
export const encodeCurrencySymbols = (text) => {
  const currencies = ['$', '€', '£', '¥', '₹', '₽', '₿', '₩', '฿', '₫', '₴', '₦', '₡', '₱', '₪', '₨', '₵', '₲', '₮', '₸', '₺', '₼', '₾', '֏', '₢', '₯'];
  
  return text.toLowerCase().split('').map(c => {
    if (c >= 'a' && c <= 'z') {
      return currencies[(c.charCodeAt(0) - 97) % currencies.length];
    }
    return c;
  }).join('');
};

/**
 * Encode with chess pieces
 */
export const encodeChessPieces = (text) => {
  const pieces = ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'];
  
  return text.toLowerCase().split('').map(c => {
    if (c >= 'a' && c <= 'z') {
      return pieces[(c.charCodeAt(0) - 97) % pieces.length];
    }
    return c;
  }).join('');
};

/**
 * Encode with card suits
 */
export const encodeCardSuits = (text) => {
  const suits = ['♠', '♣', '♥', '♦', '♤', '♧', '♡', '♢'];
  
  return text.toLowerCase().split('').map(c => {
    if (c >= 'a' && c <= 'z') {
      return suits[(c.charCodeAt(0) - 97) % suits.length];
    }
    return c;
  }).join('');
};

/**
 * Encode with music notes
 */
export const encodeMusicNotes = (text) => {
  const notes = ['♩', '♪', '♫', '♬', '𝄞', '𝄢', '♭', '♮', '♯'];
  
  return text.toLowerCase().split('').map(c => {
    if (c >= 'a' && c <= 'z') {
      return notes[(c.charCodeAt(0) - 97) % notes.length];
    }
    return c;
  }).join('');
};

/**
 * Encode with weather symbols
 */
export const encodeWeatherSymbols = (text) => {
  const weather = ['☀', '☁', '☂', '☃', '☄', '★', '☆', '☇', '☈', '☉', '☊', '☋', '⚡', '❄', '❅', '❆', '🌤', '🌥', '🌦', '🌧', '🌨', '🌩', '🌪', '🌫', '🌬', '☔'];
  
  return text.toLowerCase().split('').map(c => {
    if (c >= 'a' && c <= 'z') {
      return weather[(c.charCodeAt(0) - 97) % weather.length];
    }
    return c;
  }).join('');
};

/**
 * Encode with zodiac signs
 */
export const encodeZodiacSigns = (text) => {
  const zodiac = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  
  return text.toLowerCase().split('').map(c => {
    if (c >= 'a' && c <= 'z') {
      return zodiac[(c.charCodeAt(0) - 97) % zodiac.length];
    }
    return c;
  }).join('');
};

/**
 * Encode with planets
 */
export const encodePlanetSymbols = (text) => {
  const planets = ['☿', '♀', '♁', '♂', '♃', '♄', '♅', '♆', '♇', '⚳', '⚴', '⚵'];
  
  return text.toLowerCase().split('').map(c => {
    if (c >= 'a' && c <= 'z') {
      return planets[(c.charCodeAt(0) - 97) % planets.length];
    }
    return c;
  }).join('');
};

/**
 * Encode with arrows
 */
export const encodeArrowSymbols = (text) => {
  const arrows = ['←', '↑', '→', '↓', '↔', '↕', '↖', '↗', '↘', '↙', '↚', '↛', '↜', '↝', '↞', '↟', '↠', '↡', '↢', '↣', '↤', '↥', '↦', '↧', '↨', '↩'];
  
  return text.toLowerCase().split('').map(c => {
    if (c >= 'a' && c <= 'z') {
      return arrows[(c.charCodeAt(0) - 97) % arrows.length];
    }
    return c;
  }).join('');
};

/**
 * Encode with geometric shapes
 */
export const encodeGeometricShapes = (text) => {
  const shapes = ['●', '○', '◐', '◑', '◒', '◓', '◔', '◕', '◖', '◗', '◘', '◙', '◚', '◛', '◜', '◝', '◞', '◟', '◠', '◡', '◢', '◣', '◤', '◥', '◦', '◧'];
  
  return text.toLowerCase().split('').map(c => {
    if (c >= 'a' && c <= 'z') {
      return shapes[(c.charCodeAt(0) - 97) % shapes.length];
    }
    return c;
  }).join('');
};

/**
 * Encode with dingbats
 */
export const encodeDingbats = (text) => {
  const dingbats = ['✁', '✂', '✃', '✄', '✆', '✇', '✈', '✉', '✌', '✍', '✎', '✏', '✐', '✑', '✒', '✓', '✔', '✕', '✖', '✗', '✘', '✙', '✚', '✛', '✜', '✝'];
  
  return text.toLowerCase().split('').map(c => {
    if (c >= 'a' && c <= 'z') {
      return dingbats[(c.charCodeAt(0) - 97) % dingbats.length];
    }
    return c;
  }).join('');
};

// ============================================
// TEXT WRAPPERS
// ============================================

/**
 * Encode with quote marks
 */
export const encodeQuoteMark = (text) => {
  return `"${text}"`;
};

/**
 * Encode with fancy quotes
 */
export const encodeFancyQuotes = (text) => {
  return `"${text}"`;
};

/**
 * Encode with guillemets
 */
export const encodeGuillemets = (text) => {
  return `«${text}»`;
};

/**
 * Encode with Japanese quotes
 */
export const encodeJapaneseQuotes = (text) => {
  return `「${text}」`;
};

/**
 * Encode with parenthetical note
 */
export const encodeParenthetical = (text) => {
  return `(${text})`;
};

/**
 * Encode as aside
 */
export const encodeAside = (text) => {
  return `— ${text} —`;
};

/**
 * Encode with ellipsis wrapper
 */
export const encodeEllipsisWrap = (text) => {
  return `...${text}...`;
};

/**
 * Encode with action asterisks
 */
export const encodeActionAsterisks = (text) => {
  return `*${text}*`;
};

/**
 * Encode with emphasis markers
 */
export const encodeEmphasisMarkers = (text) => {
  return `***${text}***`;
};

// ============================================
// WORD EFFECTS
// ============================================

/**
 * Encode with word first letter emphasized
 */
export const encodeDropCap = (text) => {
  return text.split(' ').map(word => 
    `『${word[0]}』${word.slice(1)}`
  ).join(' ');
};

/**
 * Encode with word wrapping in symbols
 */
export const encodeWordWrapping = (text) => {
  return text.split(' ').map(word => `✿${word}✿`).join(' ');
};

/**
 * Encode with word decoration
 */
export const encodeWordDecoration = (text) => {
  return text.split(' ').map(word => `❀${word}❀`).join(' ');
};

/**
 * Encode words with alternating decorations
 */
export const encodeAlternatingDecorations = (text) => {
  const decorations = ['★', '♥', '✦', '✿'];
  return text.split(' ').map((word, i) => {
    const d = decorations[i % decorations.length];
    return `${d}${word}${d}`;
  }).join(' ');
};
