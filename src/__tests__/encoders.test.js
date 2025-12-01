import { describe, it, expect } from 'vitest'

// Re-implement the encoding functions for testing purposes
// These are extracted from the component to test their logic

// Binary encoding
const encodeBinary = (text) => {
  return text.split('').map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join(' ')
}

const decodeBinary = (text) => {
  try {
    return text.split(' ').map(binary => 
      String.fromCharCode(parseInt(binary, 2))
    ).join('')
  } catch {
    return '[Decode failed]'
  }
}

// Hexadecimal encoding
const encodeHex = (text) => {
  return text.split('').map(char => 
    char.charCodeAt(0).toString(16).padStart(2, '0')
  ).join(' ')
}

const decodeHex = (text) => {
  try {
    return text.split(' ').map(hex => 
      String.fromCharCode(parseInt(hex, 16))
    ).join('')
  } catch {
    return '[Decode failed]'
  }
}

// Base64 encoding
const encodeBase64 = (text) => {
  try {
    // Modern approach for UTF-8 to Base64
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    let binary = ''
    data.forEach(byte => binary += String.fromCharCode(byte))
    return btoa(binary)
  } catch {
    return '[Encode failed]'
  }
}

const decodeBase64 = (text) => {
  try {
    // Modern approach for Base64 to UTF-8
    const binary = atob(text)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    const decoder = new TextDecoder()
    return decoder.decode(bytes)
  } catch {
    return '[Decode failed]'
  }
}

// ROT13 encoding
const encodeROT13 = (text) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97
    return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start)
  })
}

// Caesar Cipher
const encodeCaesar = (text, shift) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= 'Z' ? 65 : 97
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start)
  })
}

const decodeCaesar = (text, shift) => {
  return encodeCaesar(text, 26 - shift)
}

// Morse Code
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
  }
  
  return text.toLowerCase().split('').map(char => morseCode[char] || char).join(' ')
}

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
    }
    
    return text.split(' ').map(code => reverseMorse[code] || '').join('')
  } catch {
    return '[Decode failed]'
  }
}

// Reverse Text
const encodeReverse = (text) => {
  return text.split('').reverse().join('')
}

describe('Binary encoding', () => {
  it('encodes text to binary', () => {
    expect(encodeBinary('A')).toBe('01000001')
    expect(encodeBinary('Hi')).toBe('01001000 01101001')
  })

  it('decodes binary to text', () => {
    expect(decodeBinary('01000001')).toBe('A')
    expect(decodeBinary('01001000 01101001')).toBe('Hi')
  })

  it('is reversible', () => {
    const original = 'Hello World!'
    const encoded = encodeBinary(original)
    const decoded = decodeBinary(encoded)
    expect(decoded).toBe(original)
  })
})

describe('Hexadecimal encoding', () => {
  it('encodes text to hex', () => {
    expect(encodeHex('A')).toBe('41')
    expect(encodeHex('Hi')).toBe('48 69')
  })

  it('decodes hex to text', () => {
    expect(decodeHex('41')).toBe('A')
    expect(decodeHex('48 69')).toBe('Hi')
  })

  it('is reversible', () => {
    const original = 'Hello World!'
    const encoded = encodeHex(original)
    const decoded = decodeHex(encoded)
    expect(decoded).toBe(original)
  })
})

describe('Base64 encoding', () => {
  it('encodes text to base64', () => {
    expect(encodeBase64('Hello')).toBe('SGVsbG8=')
  })

  it('decodes base64 to text', () => {
    expect(decodeBase64('SGVsbG8=')).toBe('Hello')
  })

  it('is reversible', () => {
    const original = 'Hello World!'
    const encoded = encodeBase64(original)
    const decoded = decodeBase64(encoded)
    expect(decoded).toBe(original)
  })

  it('handles unicode characters', () => {
    const original = 'Héllo Wörld! 🎉'
    const encoded = encodeBase64(original)
    const decoded = decodeBase64(encoded)
    expect(decoded).toBe(original)
  })
})

describe('ROT13 encoding', () => {
  it('encodes text with ROT13', () => {
    expect(encodeROT13('ABC')).toBe('NOP')
    expect(encodeROT13('Hello')).toBe('Uryyb')
  })

  it('is its own inverse', () => {
    const original = 'Hello World!'
    const encoded = encodeROT13(original)
    const decoded = encodeROT13(encoded)
    expect(decoded).toBe(original)
  })

  it('preserves non-alphabetic characters', () => {
    expect(encodeROT13('123')).toBe('123')
    expect(encodeROT13('!@#')).toBe('!@#')
  })
})

describe('Caesar Cipher encoding', () => {
  it('encodes with shift 3', () => {
    expect(encodeCaesar('ABC', 3)).toBe('DEF')
  })

  it('encodes with shift 13 equals ROT13', () => {
    expect(encodeCaesar('Hello', 13)).toBe(encodeROT13('Hello'))
  })

  it('is reversible with known shift', () => {
    const original = 'Hello World!'
    const shift = 5
    const encoded = encodeCaesar(original, shift)
    const decoded = decodeCaesar(encoded, shift)
    expect(decoded).toBe(original)
  })

  it('handles wrap-around', () => {
    expect(encodeCaesar('XYZ', 3)).toBe('ABC')
  })
})

describe('Morse Code encoding', () => {
  it('encodes letters to morse', () => {
    expect(encodeMorse('sos')).toBe('••• −−− •••')
  })

  it('encodes spaces as /', () => {
    expect(encodeMorse('a b')).toBe('•− / −•••')
  })

  it('is reversible for letters', () => {
    const original = 'hello world'
    const encoded = encodeMorse(original)
    const decoded = decodeMorse(encoded)
    expect(decoded).toBe(original)
  })
})

describe('Reverse Text encoding', () => {
  it('reverses text', () => {
    expect(encodeReverse('hello')).toBe('olleh')
    expect(encodeReverse('ABC')).toBe('CBA')
  })

  it('is its own inverse', () => {
    const original = 'Hello World!'
    const encoded = encodeReverse(original)
    const decoded = encodeReverse(encoded)
    expect(decoded).toBe(original)
  })
})
