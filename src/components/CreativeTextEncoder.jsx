import { useState } from 'react';
import { Sparkles, Shuffle, Check, Copy } from 'lucide-react';

const CreativeTextEncoder = () => {
  const [inputText, setInputText] = useState('Hello World!');
  const [copiedId, setCopiedId] = useState(null);
  const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
  const [favorites, setFavorites] = useState(new Set());
  const [showChainMode, setShowChainMode] = useState(false);
  const [_chainSequence, _setChainSequence] = useState([]);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [caesarShift, setCaesarShift] = useState(13);
  const [_playMorse, _setPlayMorse] = useState(false);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const exportResults = () => {
    const results = {};
    encoders.forEach(encoder => {
      if (inputText) {
        const result = mode === 'encode' 
          ? encoder.encode(inputText)
          : (encoder.reversible ? encoder.decode(inputText) : null);
        if (result) {
          results[encoder.name] = result;
        }
      }
    });
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `encoded-text-${Date.now()}.json`;
    link.click();
  };

  const playMorseSound = async (morseCode) => {
    if (!window.AudioContext) return;
    
    const audioContext = new AudioContext();
    const dotDuration = 0.08;
    const dashDuration = dotDuration * 3;
    const gapDuration = dotDuration;
    
    let currentTime = audioContext.currentTime;
    
    for (let char of morseCode) {
      if (char === '•') {
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.value = 600;
        oscillator.connect(audioContext.destination);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + dotDuration);
        currentTime += dotDuration + gapDuration;
      } else if (char === '−') {
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.value = 600;
        oscillator.connect(audioContext.destination);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + dashDuration);
        currentTime += dashDuration + gapDuration;
      } else if (char === ' ') {
        currentTime += gapDuration * 3;
      }
    }
  };

  // Zero-Width Steganography (reversible!)
  const encodeZeroWidth = (text) => {
    const zeroWidth = {
      '0': '\u200B', // Zero-width space
      '1': '\u200C', // Zero-width non-joiner
    };
    
    let encoded = '';
    for (let char of text) {
      const binary = char.charCodeAt(0).toString(2).padStart(16, '0');
      encoded += binary.split('').map(bit => zeroWidth[bit]).join('');
    }
    return encoded + '\u200D'; // Terminator
  };

  const decodeZeroWidth = (text) => {
    try {
      const reverseMap = {
        '\u200B': '0',
        '\u200C': '1',
      };
      
      const binary = text.replace('\u200D', '').split('').map(c => reverseMap[c] || '').join('');
      let decoded = '';
      
      for (let i = 0; i < binary.length; i += 16) {
        const byte = binary.substring(i, i + 16);
        if (byte.length === 16) {
          decoded += String.fromCharCode(parseInt(byte, 2));
        }
      }
      return decoded || '[Invalid zero-width encoding]';
    } catch {
      return '[Decode failed]';
    }
  };

  // Emoji Encoding (reversible!)
  const encodeEmoji = (text) => {
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', 
                    '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
                    '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫'];
    
    let encoded = '';
    for (let char of text) {
      const code = char.charCodeAt(0);
      const emoji1 = emojis[Math.floor(code / emojis.length)];
      const emoji2 = emojis[code % emojis.length];
      encoded += emoji1 + emoji2;
    }
    return encoded;
  };

  const decodeEmoji = (text) => {
    try {
      const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', 
                      '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
                      '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫'];
      
      const emojiArray = [...text];
      let decoded = '';
      
      for (let i = 0; i < emojiArray.length; i += 2) {
        if (i + 1 < emojiArray.length) {
          const idx1 = emojis.indexOf(emojiArray[i]);
          const idx2 = emojis.indexOf(emojiArray[i + 1]);
          if (idx1 !== -1 && idx2 !== -1) {
            decoded += String.fromCharCode(idx1 * emojis.length + idx2);
          }
        }
      }
      return decoded || '[Invalid emoji encoding]';
    } catch {
      return '[Decode failed]';
    }
  };

  // Morse Code (reversible!)
  const encodeMorse = (text) => {
    const morseCode = {
      'a': '•−', 'b': '−•••', 'c': '−•−•', 'd': '−••', 'e': '•', 'f': '••−•',
      'g': '−−•', 'h': '••••', 'i': '••', 'j': '•−−−', 'k': '−•−', 'l': '•−••',
      'm': '−−', 'n': '−•', 'o': '−−−', 'p': '•−−•', 'q': '−−•−', 'r': '•−•',
      's': '•••', 't': '−', 'u': '••−', 'v': '•••−', 'w': '•−−', 'x': '−••−',
      'y': '−•−−', 'z': '−−••', '0': '−−−−−', '1': '•−−−−', '2': '••−−−',
      '3': '•••−−', '4': '••••−', '5': '•••••', '6': '−••••', '7': '−−•••',
      '8': '−−−••', '9': '−−−−•', '.': '•−•−•−', ',': '−−••−−', '?': '••−−••',
      '!': '−•−•−−', '/': '−••−•', ':': '−−−•••', ' ': '/'
    };
    
    return text.toLowerCase().split('').map(char => morseCode[char] || char).join(' ');
  };

  const decodeMorse = (text) => {
    try {
      const reverseMorse = {
        '•−': 'a', '−•••': 'b', '−•−•': 'c', '−••': 'd', '•': 'e', '••−•': 'f',
        '−−•': 'g', '••••': 'h', '••': 'i', '•−−−': 'j', '−•−': 'k', '•−••': 'l',
        '−−': 'm', '−•': 'n', '−−−': 'o', '•−−•': 'p', '−−•−': 'q', '•−•': 'r',
        '•••': 's', '−': 't', '••−': 'u', '•••−': 'v', '•−−': 'w', '−••−': 'x',
        '−•−−': 'y', '−−••': 'z', '−−−−−': '0', '•−−−−': '1', '••−−−': '2',
        '•••−−': '3', '••••−': '4', '•••••': '5', '−••••': '6', '−−•••': '7',
        '−−−••': '8', '−−−−•': '9', '•−•−•−': '.', '−−••−−': ',', '••−−••': '?',
        '−•−•−−': '!', '−••−•': '/', '−−−•••': ':', '/': ' '
      };
      
      return text.split(' ').map(code => reverseMorse[code] || '').join('');
    } catch {
      return '[Decode failed]';
    }
  };

  // Braille (reversible!)
  const encodeBraille = (text) => {
    const brailleMap = {
      'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛',
      'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝',
      'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥',
      'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵', ' ': '⠀',
      '0': '⠚', '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
      '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '.': '⠲', ',': '⠂',
      '!': '⠖', '?': '⠦'
    };
    
    return text.toLowerCase().split('').map(char => brailleMap[char] || char).join('');
  };

  const decodeBraille = (text) => {
    try {
      const reverseBraille = {
        '⠁': 'a', '⠃': 'b', '⠉': 'c', '⠙': 'd', '⠑': 'e', '⠋': 'f', '⠛': 'g',
        '⠓': 'h', '⠊': 'i', '⠚': 'j', '⠅': 'k', '⠇': 'l', '⠍': 'm', '⠝': 'n',
        '⠕': 'o', '⠏': 'p', '⠟': 'q', '⠗': 'r', '⠎': 's', '⠞': 't', '⠥': 'u',
        '⠧': 'v', '⠺': 'w', '⠭': 'x', '⠽': 'y', '⠵': 'z', '⠀': ' ',
        '⠲': '.', '⠂': ',', '⠖': '!', '⠦': '?'
      };
      
      return text.split('').map(char => reverseBraille[char] || '').join('');
    } catch {
      return '[Decode failed]';
    }
  };

  // Block Drawing (artistic - not reversible)
  const encodeBoxDrawing = (text) => {
    const blocks = ['█', '▓', '▒', '░', '▀', '▄', '▌', '▐', '■', '▪', '▫', '◾', '◽', '▪️', '▫️'];
    return text.split('').map(char => 
      blocks[char.charCodeAt(0) % blocks.length]
    ).join('');
  };

  // Musical Notation (artistic - not reversible)
  const encodeMusical = (text) => {
    const notes = ['♪', '♫', '♬', '♩', '♭', '♮', '♯', '𝄞', '𝄢'];
    return text.split('').map(char => 
      notes[char.charCodeAt(0) % notes.length]
    ).join('');
  };

  // Zalgo Text (artistic - not reversible)
  const encodeZalgo = (text) => {
    const combining = [
      '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307',
      '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F',
      '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u0315', '\u0316', '\u0317',
      '\u0318', '\u0319', '\u031A', '\u031B', '\u031C', '\u031D', '\u031E', '\u031F'
    ];
    
    return text.split('').map(char => {
      const numMarks = Math.floor(Math.random() * 4) + 2;
      let zalgoChar = char;
      for (let i = 0; i < numMarks; i++) {
        zalgoChar += combining[Math.floor(Math.random() * combining.length)];
      }
      return zalgoChar;
    }).join('');
  };

  // Color Blocks (artistic - not reversible)
  const encodeColorBlocks = (text) => {
    const colors = ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '🟫', '⬛', '⬜'];
    return text.split('').map(char => 
      colors[char.charCodeAt(0) % colors.length]
    ).join('');
  };

  // Ancient Runes (artistic - not reversible)
  const encodeRunes = (text) => {
    const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 
                  'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];
    return text.split('').map(char => 
      runes[char.charCodeAt(0) % runes.length]
    ).join('');
  };

  // Bubble Text (fun aesthetic!)
  const encodeBubble = (text) => {
    const bubbleMap = {
      'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ',
      'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ',
      'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ',
      'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
      '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤',
      '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨'
    };
    
    return text.toLowerCase().split('').map(char => bubbleMap[char] || char).join('');
  };

  // Upside Down (fun aesthetic!)
  const encodeUpsideDown = (text) => {
    const upsideMap = {
      'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ',
      'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'ʃ', 'm': 'ɯ', 'n': 'u',
      'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n',
      'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
      '!': '¡', '?': '¿', '.': '˙', ',': '\'', '(': ')', ')': '('
    };
    
    return text.toLowerCase().split('').reverse().map(char => upsideMap[char] || char).join('');
  };

  // Binary (reversible!)
  const encodeBinary = (text) => {
    return text.split('').map(char => 
      char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join(' ');
  };

  const decodeBinary = (text) => {
    try {
      return text.split(' ').map(binary => 
        String.fromCharCode(parseInt(binary, 2))
      ).join('');
    } catch {
      return '[Decode failed]';
    }
  };

  // Hexadecimal (reversible!)
  const encodeHex = (text) => {
    return text.split('').map(char => 
      char.charCodeAt(0).toString(16).padStart(2, '0')
    ).join(' ');
  };

  const decodeHex = (text) => {
    try {
      return text.split(' ').map(hex => 
        String.fromCharCode(parseInt(hex, 16))
      ).join('');
    } catch {
      return '[Decode failed]';
    }
  };

  // Base64 (reversible!)
  const encodeBase64 = (text) => {
    try {
      // Modern approach for UTF-8 to Base64
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      let binary = '';
      data.forEach(byte => binary += String.fromCharCode(byte));
      return btoa(binary);
    } catch {
      return '[Encode failed]';
    }
  };

  const decodeBase64 = (text) => {
    try {
      // Modern approach for Base64 to UTF-8
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

  // ROT13 (reversible!)
  const encodeROT13 = (text) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  };

  const decodeROT13 = encodeROT13; // ROT13 is its own inverse

  // Caesar Cipher (reversible with shift)
  const encodeCaesar = (text, shift = caesarShift) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
    });
  };

  const decodeCaesar = (text, shift = caesarShift) => {
    return encodeCaesar(text, 26 - shift);
  };

  // Leetspeak (artistic)
  const encodeLeetspeak = (text) => {
    const leetMap = {
      'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7', 'l': '1',
      'A': '4', 'E': '3', 'I': '1', 'O': '0', 'S': '5', 'T': '7', 'L': '1'
    };
    return text.split('').map(char => leetMap[char] || char).join('');
  };

  // Pig Latin (artistic)
  const encodePigLatin = (text) => {
    return text.split(' ').map(word => {
      if (word.length === 0) return word;
      const vowels = 'aeiouAEIOU';
      if (vowels.includes(word[0])) {
        return word + 'way';
      } else {
        const firstVowelIndex = word.split('').findIndex(char => vowels.includes(char));
        if (firstVowelIndex === -1) return word + 'ay';
        return word.slice(firstVowelIndex) + word.slice(0, firstVowelIndex) + 'ay';
      }
    }).join(' ');
  };

  // NATO Phonetic (artistic)
  const encodeNATO = (text) => {
    const natoMap = {
      'a': 'Alpha', 'b': 'Bravo', 'c': 'Charlie', 'd': 'Delta', 'e': 'Echo',
      'f': 'Foxtrot', 'g': 'Golf', 'h': 'Hotel', 'i': 'India', 'j': 'Juliett',
      'k': 'Kilo', 'l': 'Lima', 'm': 'Mike', 'n': 'November', 'o': 'Oscar',
      'p': 'Papa', 'q': 'Quebec', 'r': 'Romeo', 's': 'Sierra', 't': 'Tango',
      'u': 'Uniform', 'v': 'Victor', 'w': 'Whiskey', 'x': 'X-ray', 'y': 'Yankee',
      'z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
      '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
    };
    return text.toLowerCase().split('').map(char => natoMap[char] || char).join('-');
  };

  // Reverse Text (reversible!)
  const encodeReverse = (text) => {
    return text.split('').reverse().join('');
  };

  const decodeReverse = encodeReverse; // Reversing is its own inverse

  const encoders = [
    // Steganography & Secrets
    {
      id: 'zero-width',
      name: 'Zero-Width Steganography',
      description: 'Hide messages in invisible characters',
      emoji: '👻',
      category: 'secret',
      encode: encodeZeroWidth,
      decode: decodeZeroWidth,
      reversible: true,
      special: true
    },
    
    // Classic Codes
    {
      id: 'morse',
      name: 'Morse Code',
      description: 'Classic dit-dah communication',
      emoji: '📡',
      category: 'classic',
      encode: encodeMorse,
      decode: decodeMorse,
      reversible: true,
      hasSound: true
    },
    {
      id: 'braille',
      name: 'Braille Patterns',
      description: 'Touch-readable text encoding',
      emoji: '🤚',
      category: 'classic',
      encode: encodeBraille,
      decode: decodeBraille,
      reversible: true
    },
    {
      id: 'nato',
      name: 'NATO Phonetic',
      description: 'Alpha-Bravo-Charlie spelling',
      emoji: '🎖️',
      category: 'classic',
      encode: encodeNATO,
      reversible: false
    },
    
    // Computer Science
    {
      id: 'binary',
      name: 'Binary',
      description: 'Classic 0s and 1s',
      emoji: '💻',
      category: 'computer',
      encode: encodeBinary,
      decode: decodeBinary,
      reversible: true
    },
    {
      id: 'hex',
      name: 'Hexadecimal',
      description: 'Base-16 number system',
      emoji: '🔢',
      category: 'computer',
      encode: encodeHex,
      decode: decodeHex,
      reversible: true
    },
    {
      id: 'base64',
      name: 'Base64',
      description: 'Standard encoding for data transfer',
      emoji: '📦',
      category: 'computer',
      encode: encodeBase64,
      decode: decodeBase64,
      reversible: true
    },
    
    // Ciphers
    {
      id: 'caesar',
      name: 'Caesar Cipher',
      description: 'Shift alphabet by N positions',
      emoji: '🏛️',
      category: 'cipher',
      encode: encodeCaesar,
      decode: decodeCaesar,
      reversible: true,
      hasSettings: true
    },
    {
      id: 'rot13',
      name: 'ROT13',
      description: 'Caesar cipher with 13-letter shift',
      emoji: '🔄',
      category: 'cipher',
      encode: encodeROT13,
      decode: decodeROT13,
      reversible: true
    },
    {
      id: 'reverse',
      name: 'Reverse Text',
      description: 'Simply backwards',
      emoji: '↩️',
      category: 'cipher',
      encode: encodeReverse,
      decode: decodeReverse,
      reversible: true
    },
    
    // Fun & Emoji
    {
      id: 'emoji',
      name: 'Emoji Encoding',
      description: 'Express text through emoji pairs',
      emoji: '😎',
      category: 'fun',
      encode: encodeEmoji,
      decode: decodeEmoji,
      reversible: true
    },
    {
      id: 'bubble',
      name: 'Bubble Text',
      description: 'Cute circled characters',
      emoji: '⭕',
      category: 'fun',
      encode: encodeBubble,
      reversible: false
    },
    {
      id: 'upside-down',
      name: 'Upside Down',
      description: 'Australian mode activated',
      emoji: '🙃',
      category: 'fun',
      encode: encodeUpsideDown,
      reversible: false
    },
    {
      id: 'leetspeak',
      name: 'Leetspeak',
      description: 'H4ck3r 5p34k',
      emoji: '🤓',
      category: 'fun',
      encode: encodeLeetspeak,
      reversible: false
    },
    {
      id: 'pig-latin',
      name: 'Pig Latin',
      description: 'Ixnay on the ormalfay',
      emoji: '🐷',
      category: 'fun',
      encode: encodePigLatin,
      reversible: false
    },
    
    // Artistic
    {
      id: 'blocks',
      name: 'Block Art',
      description: 'Geometric pattern encoding',
      emoji: '◼️',
      category: 'artistic',
      encode: encodeBoxDrawing,
      reversible: false
    },
    {
      id: 'musical',
      name: 'Musical Notes',
      description: 'Your text as a symphony',
      emoji: '🎵',
      category: 'artistic',
      encode: encodeMusical,
      reversible: false
    },
    {
      id: 'zalgo',
      name: 'Zalgo Chaos',
      description: 'Ḩ̷̛e̶͝ ̸̕c̷̀o̶̎m̸̂e̵̊s̶̄',
      emoji: '😈',
      category: 'artistic',
      encode: encodeZalgo,
      reversible: false
    },
    {
      id: 'colors',
      name: 'Color Blocks',
      description: 'Rainbow data encoding',
      emoji: '🌈',
      category: 'artistic',
      encode: encodeColorBlocks,
      reversible: false
    },
    {
      id: 'runes',
      name: 'Ancient Runes',
      description: 'Elder Futhark mysticism',
      emoji: '⚔️',
      category: 'artistic',
      encode: encodeRunes,
      reversible: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
            ✨ Creative Text Encoder
          </h1>
          <p className="text-xl text-purple-200 mb-4">
            Transform your messages into 20+ creative encodings
          </p>
          
          {/* Stats Bar */}
          {inputText && (
            <div className="flex justify-center gap-6 text-sm text-purple-300">
              <span>📏 {inputText.length} characters</span>
              <span>📊 {new Blob([inputText]).size} bytes</span>
              <span>🔤 {inputText.split(/\s+/).filter(w => w).length} words</span>
            </div>
          )}
        </div>

        {/* Mode Toggle & Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-full p-1 border border-white/20">
            <button
              onClick={() => setMode('encode')}
              className={`px-8 py-3 rounded-full transition-all font-semibold ${
                mode === 'encode'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              ✏️ Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-8 py-3 rounded-full transition-all font-semibold ${
                mode === 'decode'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              🔓 Decode
            </button>
          </div>

          <button
            onClick={() => setExpandedCards(new Set(encoders.map(e => e.id)))}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-full border border-white/20 transition-all font-semibold"
          >
            📋 {mode === 'encode' ? 'Encode' : 'Decode'} All
          </button>

          <button
            onClick={exportResults}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-full border border-white/20 transition-all font-semibold"
            disabled={!inputText}
          >
            💾 Export JSON
          </button>

          <button
            onClick={() => setShowChainMode(!showChainMode)}
            className={`px-6 py-3 backdrop-blur-lg rounded-full border transition-all font-semibold ${
              showChainMode 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-400' 
                : 'bg-white/10 hover:bg-white/20 border-white/20'
            }`}
          >
            🔗 Chain Mode
          </button>
        </div>

        {/* Input Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20">
          <label className="block text-lg font-semibold mb-3 flex items-center gap-2">
            <Sparkles size={20} />
            {mode === 'encode' ? 'Enter your message:' : 'Enter encoded text:'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-6 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-white/50 text-lg focus:outline-none focus:border-purple-400 transition-all min-h-[120px] resize-y"
            placeholder={mode === 'encode' ? 'Type your secret message here...' : 'Paste encoded text here...'}
          />
          
          {/* Caesar Cipher Controls */}
          {(expandedCards.has('caesar') || mode === 'decode') && (
            <div className="mt-4 p-4 bg-white/10 rounded-lg">
              <label className="text-sm font-semibold mb-2 block">
                🏛️ Caesar Cipher Shift: {caesarShift}
              </label>
              <input
                type="range"
                min="1"
                max="25"
                value={caesarShift}
                onChange={(e) => setCaesarShift(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-purple-200 mt-1">
                <span>1</span>
                <span>13 (ROT13)</span>
                <span>25</span>
              </div>
            </div>
          )}
          
          <div className="mt-3 text-sm text-purple-200 flex items-center gap-2">
            <Shuffle size={16} />
            {mode === 'encode' 
              ? 'Choose encoding styles below or use "Encode All" for quick comparison'
              : 'Select reversible encodings to decode (marked with ✓)'}
          </div>
        </div>

        {/* Chain Mode Panel */}
        {showChainMode && (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-green-400/30">
            <h3 className="text-xl font-bold mb-3">🔗 Chain Encoding</h3>
            <p className="text-sm text-green-100 mb-4">
              Apply multiple encodings in sequence. Great for creating complex encrypted messages!
            </p>
            <div className="text-sm text-green-200">
              Coming soon: Select multiple encoders and apply them in order!
            </div>
          </div>
        )}

        {/* Category Legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[
            { cat: 'secret', emoji: '🔐', name: 'Secret' },
            { cat: 'classic', emoji: '📻', name: 'Classic' },
            { cat: 'computer', emoji: '💾', name: 'Computer' },
            { cat: 'cipher', emoji: '🔑', name: 'Ciphers' },
            { cat: 'fun', emoji: '🎉', name: 'Fun' },
            { cat: 'artistic', emoji: '🎨', name: 'Artistic' }
          ].map(({ cat, emoji, name }) => (
            <div key={cat} className="text-sm text-purple-200 flex items-center gap-1">
              <span>{emoji}</span>
              <span>{name}</span>
            </div>
          ))}
        </div>

        {/* Encoders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {encoders.map((encoder) => {
            const isDecodeMode = mode === 'decode';
            const canDecode = encoder.reversible;
            const result = inputText 
              ? (isDecodeMode 
                  ? (canDecode ? encoder.decode(inputText) : '[Not reversible]')
                  : encoder.encode(inputText))
              : '';
            
            const displayText = encoder.special && !isDecodeMode
              ? `[${result.length} invisible characters]`
              : result;
            
            const isDisabled = isDecodeMode && !canDecode;
            const isFavorite = favorites.has(encoder.id);
            const _isExpanded = expandedCards.has(encoder.id);

            const categoryEmoji = {
              secret: '🔐',
              classic: '📻',
              computer: '💾',
              cipher: '🔑',
              fun: '🎉',
              artistic: '🎨'
            };
            
            return (
              <div
                key={encoder.id}
                className={`bg-white/10 backdrop-blur-lg rounded-xl p-5 border transition-all ${
                  isDisabled 
                    ? 'border-white/10 opacity-50' 
                    : isFavorite
                    ? 'border-yellow-400/50 shadow-lg shadow-yellow-500/20'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-2 flex-1">
                    <span className="text-2xl">{encoder.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold">{encoder.name}</h3>
                        <span className="text-xs opacity-70">{categoryEmoji[encoder.category]}</span>
                        {encoder.reversible && (
                          <span className="text-xs bg-green-500/30 text-green-300 px-2 py-0.5 rounded-full border border-green-400/50">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-purple-200 mt-1">{encoder.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleFavorite(encoder.id)}
                      className={`p-1.5 rounded-lg transition-all ${
                        isFavorite 
                          ? 'bg-yellow-500/30 text-yellow-300' 
                          : 'hover:bg-white/20 text-white/50'
                      }`}
                      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      {isFavorite ? '⭐' : '☆'}
                    </button>
                    {encoder.hasSound && !isDecodeMode && result && (
                      <button
                        onClick={() => playMorseSound(result)}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-all text-sm"
                        title="Play sound"
                      >
                        🔊
                      </button>
                    )}
                    {!isDisabled && result && (
                      <button
                        onClick={() => copyToClipboard(result, encoder.id)}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-all"
                        title="Copy to clipboard"
                      >
                        {copiedId === encoder.id ? (
                          <Check size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
                <div className={`
                  bg-black/30 rounded-lg p-3 font-mono text-xs break-all min-h-[50px] flex items-center
                  ${encoder.id === 'zalgo' ? 'overflow-hidden leading-relaxed' : ''}
                  ${encoder.special && !isDecodeMode ? 'bg-yellow-500/20 border border-yellow-400/50' : ''}
                  ${isDisabled ? 'justify-center' : ''}
                `}>
                  {isDisabled ? (
                    <span className="text-white/50 italic text-center">
                      Decode unavailable
                    </span>
                  ) : displayText ? (
                    displayText
                  ) : (
                    <span className="text-white/50 italic">
                      {isDecodeMode ? 'Paste encoded text...' : 'Enter text...'}
                    </span>
                  )}
                </div>

                {encoder.special && result && !isDecodeMode && (
                  <div className="mt-2 text-xs text-yellow-300 flex items-center gap-1">
                    👻 Hidden characters - try pasting!
                  </div>
                )}

                {result && !isDisabled && (
                  <div className="mt-2 text-xs text-purple-300">
                    {result.length} chars • {new Blob([result]).size} bytes
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Enhanced Info Section */}
        <div className="mt-12 space-y-6">
          {/* Quick Guide */}
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-8 border border-blue-400/30">
            <h2 className="text-2xl font-bold mb-4">🚀 Quick Start Guide</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-blue-200 mb-2 flex items-center gap-2">
                  <span>1️⃣</span> Type Your Message
                </h3>
                <p className="text-sm text-blue-100">
                  Enter any text you want to encode in the text box above
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-200 mb-2 flex items-center gap-2">
                  <span>2️⃣</span> Pick an Encoder
                </h3>
                <p className="text-sm text-blue-100">
                  Choose from 20+ creative encoding methods - or use "Encode All" to see them all at once
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-200 mb-2 flex items-center gap-2">
                  <span>3️⃣</span> Copy & Share
                </h3>
                <p className="text-sm text-blue-100">
                  Click the copy button and share your encoded message. Friends can decode using the same method!
                </p>
              </div>
            </div>
          </div>

          {/* Features & Fun Facts */}
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-8 border border-purple-400/30">
            <h2 className="text-2xl font-bold mb-6">💡 Features & Fun Facts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
                  <span>✓</span> Reversible Encodings (10)
                </h3>
                <ul className="space-y-2 text-purple-100 text-sm">
                  <li>• <strong>Zero-Width:</strong> Invisible steganography used in real security research</li>
                  <li>• <strong>Morse Code:</strong> Been around since 1830s, still used today!</li>
                  <li>• <strong>Binary & Hex:</strong> The language computers speak</li>
                  <li>• <strong>Base64:</strong> Standard for encoding data on the web</li>
                  <li>• <strong>Caesar Cipher:</strong> Used by Julius Caesar 2000 years ago</li>
                  <li>• <strong>ROT13:</strong> Internet's favorite simple cipher</li>
                  <li>• <strong>Braille:</strong> Makes text accessible for everyone</li>
                  <li>• <strong>Emoji:</strong> Modern hieroglyphics!</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
                  <span>🎨</span> Artistic Encodings (10)
                </h3>
                <ul className="space-y-2 text-purple-100 text-sm">
                  <li>• <strong>Bubble Text:</strong> Perfect for social media bios</li>
                  <li>• <strong>Upside Down:</strong> Confuse your friends!</li>
                  <li>• <strong>Leetspeak:</strong> H4ck3r culture from the 90s</li>
                  <li>• <strong>Pig Latin:</strong> Classic playground language</li>
                  <li>• <strong>NATO Phonetic:</strong> How pilots spell on radio</li>
                  <li>• <strong>Zalgo:</strong> Internet horror meme phenomenon</li>
                  <li>• <strong>Musical Notes:</strong> Turn text into a symphony</li>
                  <li>• <strong>Runes:</strong> Ancient Viking alphabet mysticism</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-purple-400/30 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-purple-200 mb-2">🌟 Pro Tips</h3>
                <ul className="space-y-1 text-sm text-purple-100">
                  <li>• Star your favorites for quick access</li>
                  <li>• Click 🔊 on Morse code to hear it!</li>
                  <li>• Use Caesar cipher slider for custom shifts</li>
                  <li>• Export to JSON for batch processing</li>
                  <li>• Zero-width text looks empty but isn't!</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-purple-200 mb-2">🎯 Use Cases</h3>
                <ul className="space-y-1 text-sm text-purple-100">
                  <li>• Secret messages with friends</li>
                  <li>• Creative social media posts</li>
                  <li>• Learning about cryptography</li>
                  <li>• Data encoding education</li>
                  <li>• Just having fun with Unicode!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Info */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-8 border border-green-400/30">
            <h2 className="text-2xl font-bold mb-4">🔬 Technical Details</h2>
            <div className="text-sm text-green-100 space-y-2">
              <p>• Unicode contains 143,859 characters across multiple writing systems</p>
              <p>• Zero-width characters (U+200B, U+200C, U+200D) are actually used for text shaping in many languages</p>
              <p>• Base64 increases data size by ~33% but makes binary data text-safe</p>
              <p>• Morse code can be transmitted visually, audibly, or even through touch</p>
              <p>• All reversible encodings preserve the original information perfectly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTextEncoder;
