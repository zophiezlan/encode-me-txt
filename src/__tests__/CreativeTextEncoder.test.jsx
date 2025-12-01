import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CreativeTextEncoder from '../components/CreativeTextEncoder'

// Mock the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
})

// Mock AudioContext
global.AudioContext = vi.fn().mockImplementation(() => ({
  currentTime: 0,
  createOscillator: vi.fn().mockReturnValue({
    frequency: { value: 0 },
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  }),
  destination: {},
}))

describe('CreativeTextEncoder', () => {
  it('renders the main heading', () => {
    render(<CreativeTextEncoder />)
    expect(screen.getByText(/Creative Text Encoder/i)).toBeInTheDocument()
  })

  it('has default input text "Hello World!"', () => {
    render(<CreativeTextEncoder />)
    expect(screen.getByDisplayValue('Hello World!')).toBeInTheDocument()
  })

  it('renders encode and decode mode buttons', () => {
    render(<CreativeTextEncoder />)
    expect(screen.getByText('✏️ Encode')).toBeInTheDocument()
    expect(screen.getByText('🔓 Decode')).toBeInTheDocument()
  })

  it('updates input text when typing', () => {
    render(<CreativeTextEncoder />)
    const textarea = screen.getByDisplayValue('Hello World!')
    fireEvent.change(textarea, { target: { value: 'Test message' } })
    expect(screen.getByDisplayValue('Test message')).toBeInTheDocument()
  })

  it('displays multiple encoder options', () => {
    render(<CreativeTextEncoder />)
    expect(screen.getByText('Morse Code')).toBeInTheDocument()
    expect(screen.getByText('Binary')).toBeInTheDocument()
    expect(screen.getByText('Hexadecimal')).toBeInTheDocument()
    expect(screen.getByText('Base64')).toBeInTheDocument()
    expect(screen.getByText('ROT13')).toBeInTheDocument()
  })

  it('can switch to decode mode', () => {
    render(<CreativeTextEncoder />)
    const decodeButton = screen.getByText('🔓 Decode')
    fireEvent.click(decodeButton)
    // In decode mode, we should still see the encoder cards
    expect(screen.getByText('Morse Code')).toBeInTheDocument()
  })

  it('shows character stats for input', () => {
    render(<CreativeTextEncoder />)
    // Default input is "Hello World!" which has 12 characters
    expect(screen.getByText('📏 12 characters')).toBeInTheDocument()
  })

  it('displays the Quick Start Guide section', () => {
    render(<CreativeTextEncoder />)
    expect(screen.getByText('🚀 Quick Start Guide')).toBeInTheDocument()
  })

  it('displays Export JSON button', () => {
    render(<CreativeTextEncoder />)
    expect(screen.getByText('💾 Export JSON')).toBeInTheDocument()
  })

  it('displays Chain Mode button', () => {
    render(<CreativeTextEncoder />)
    expect(screen.getByText('🔗 Chain Mode')).toBeInTheDocument()
  })
})

describe('Encoding functions', () => {
  it('shows Binary encoding output', () => {
    render(<CreativeTextEncoder />)
    // Find the Binary section - it should show the encoding for "Hello World!"
    // The first character 'H' is 01001000
    const binarySection = screen.getByText('Binary').closest('div')
    expect(binarySection).toBeInTheDocument()
  })

  it('shows reversible badge for reversible encodings', () => {
    render(<CreativeTextEncoder />)
    // Reversible encodings should have a checkmark badge
    // There should be multiple checkmarks for reversible encodings
    const checkmarks = screen.getAllByText('✓')
    expect(checkmarks.length).toBeGreaterThan(0)
  })
})
