import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EnhancedTextEncoder from '../components/EnhancedTextEncoder'

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

// Mock localStorage with onboarded set to true to skip welcome modal
const localStorageMock = {
  getItem: vi.fn((key) => {
    if (key === 'encoder-onboarded') return 'true'
    return null
  }),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('EnhancedTextEncoder', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Keep onboarded to skip welcome modal
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'encoder-onboarded') return 'true'
      return null
    })
  })

  it('renders the main heading', () => {
    render(<EnhancedTextEncoder />)
    expect(screen.getByText(/Creative Text Encoder/i)).toBeInTheDocument()
  })

  it('has default input text "Hello World!"', () => {
    render(<EnhancedTextEncoder />)
    expect(screen.getByDisplayValue('Hello World!')).toBeInTheDocument()
  })

  it('renders encode and decode mode buttons', () => {
    render(<EnhancedTextEncoder />)
    expect(screen.getByText('✏️ Encode')).toBeInTheDocument()
    expect(screen.getByText('🔓 Decode')).toBeInTheDocument()
  })

  it('updates input text when typing', () => {
    render(<EnhancedTextEncoder />)
    const textarea = screen.getByDisplayValue('Hello World!')
    fireEvent.change(textarea, { target: { value: 'Test message' } })
    expect(screen.getByDisplayValue('Test message')).toBeInTheDocument()
  })

  it('displays the main description', async () => {
    render(<EnhancedTextEncoder />)
    // Check for the main description text
    expect(screen.getByText(/Transform your messages into 120\+ creative encodings/i)).toBeInTheDocument()
  })

  it('can switch to decode mode', () => {
    render(<EnhancedTextEncoder />)
    const decodeButton = screen.getByText('🔓 Decode')
    fireEvent.click(decodeButton)
    // In decode mode, the button should be selected (has different styling)
    expect(decodeButton).toBeInTheDocument()
  })

  it('displays stats section for input', () => {
    render(<EnhancedTextEncoder />)
    // Default input is "Hello World!" which has 12 characters and 2 words
    // Check that the stats section exists with "chars" text
    const statsElements = screen.getAllByText(/chars/)
    expect(statsElements.length).toBeGreaterThan(0)
  })

  it('displays Help button', () => {
    render(<EnhancedTextEncoder />)
    // Help is in a span that's hidden on mobile, just check the button exists
    const helpButton = screen.getByTitle('Help & Guide')
    expect(helpButton).toBeInTheDocument()
  })

  it('displays Chain mode button', () => {
    render(<EnhancedTextEncoder />)
    expect(screen.getByText(/Chain/i)).toBeInTheDocument()
  })

  it('displays History button', () => {
    render(<EnhancedTextEncoder />)
    expect(screen.getByText('History')).toBeInTheDocument()
  })

  it('displays Compare button', () => {
    render(<EnhancedTextEncoder />)
    expect(screen.getByText(/Compare/i)).toBeInTheDocument()
  })

  it('has a search input for filtering encoders', () => {
    render(<EnhancedTextEncoder />)
    expect(screen.getByPlaceholderText(/Search encoders/i)).toBeInTheDocument()
  })
})

describe('EnhancedTextEncoder - Theme functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'encoder-onboarded') return 'true'
      return null
    })
  })

  it('displays theme switcher buttons', () => {
    render(<EnhancedTextEncoder />)
    // Check for actual theme names
    expect(screen.getByText('Dark Purple')).toBeInTheDocument()
    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Cyberpunk')).toBeInTheDocument()
  })
})

describe('EnhancedTextEncoder - Encoder cards', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'encoder-onboarded') return 'true'
      return null
    })
  })

  it('shows reversible badge for reversible encodings', () => {
    render(<EnhancedTextEncoder />)
    // Reversible encodings should have a checkmark badge
    const checkmarks = screen.getAllByText('✓')
    expect(checkmarks.length).toBeGreaterThan(0)
  })

  it('displays encoder count', () => {
    render(<EnhancedTextEncoder />)
    // Should show "X / Y" format for encoder count
    const counts = screen.getAllByText(/\d+ \/ \d+/)
    expect(counts.length).toBeGreaterThan(0)
  })
})
