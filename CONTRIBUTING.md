# Contributing to Creative Text Encoder

Thank you for your interest in contributing to Creative Text Encoder! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Coding Guidelines](#coding-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Adding New Encoders](#adding-new-encoders)

> **Note:** For architectural decisions and design rationale, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/encode-me-txt.git
   cd encode-me-txt
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/zophiezlan/encode-me-txt.git
   ```

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Build for production
npm run build
```

## Project Structure

```
encode-me-txt/
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
├── public/
│   ├── favicon.svg
│   ├── manifest.json     # PWA manifest
│   └── sw.js            # Service worker
├── src/
│   ├── components/       # React components
│   ├── utils/
│   │   ├── encoders/    # Encoder functions (modular)
│   │   │   ├── steganography.js
│   │   │   ├── classic.js
│   │   │   ├── computer.js
│   │   │   ├── ciphers.js
│   │   │   ├── fun.js
│   │   │   ├── artistic.js
│   │   │   ├── advanced.js
│   │   │   └── index.js
│   │   ├── encoderConfig.js  # Encoder metadata
│   │   └── audioPlayer.js    # Audio utilities
│   ├── __tests__/       # Test files
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── README.md
├── CONTRIBUTING.md
└── SECURITY.md
```

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/zophiezlan/encode-me-txt/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Browser/OS information

### Suggesting Enhancements

1. Check existing [Issues](https://github.com/zophiezlan/encode-me-txt/issues) and [Pull Requests](https://github.com/zophiezlan/encode-me-txt/pulls)
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach
   - Examples (if applicable)

### Submitting Code

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our [coding guidelines](#coding-guidelines)

3. Write or update tests for your changes

4. Run tests and linting:
   ```bash
   npm run test
   npm run lint
   ```

5. Commit your changes:
   ```bash
   git commit -m "feat: add new encoder for X"
   ```

6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

7. Create a Pull Request

## Coding Guidelines

### JavaScript/React Style

- Use ES6+ features (const, let, arrow functions, etc.)
- Use functional components with hooks
- Follow existing code style and patterns
- Use meaningful variable and function names
- Add JSDoc comments for all exported functions
- Keep functions small and focused (single responsibility)

### Example:

```javascript
/**
 * Encodes text to binary representation
 * @param {string} text - The text to encode
 * @returns {string} - Binary representation (space-separated bytes)
 * @example
 * encodeBinary('Hi') // Returns: '01001000 01101001'
 */
export const encodeBinary = (text) => {
  return text.split('').map(char =>
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join(' ');
};
```

### File Organization

- **One component per file**
- **Group related utilities** in the same directory
- **Use index.js** for barrel exports
- **Keep files under 300 lines** when possible

### Naming Conventions

- **Components**: PascalCase (`CreativeTextEncoder.jsx`)
- **Utilities**: camelCase (`encodeBinary.js`)
- **Constants**: UPPER_SNAKE_CASE (`MORSE_CODE_MAP`)
- **Files**: kebab-case or camelCase

## Testing Guidelines

### Writing Tests

All encoder functions should have corresponding tests:

```javascript
import { describe, it, expect } from 'vitest';
import { encodeBinary, decodeBinary } from '../utils/encoders/computer.js';

describe('Binary Encoder', () => {
  it('should encode text to binary', () => {
    const result = encodeBinary('Hi');
    expect(result).toBe('01001000 01101001');
  });

  it('should decode binary to text', () => {
    const result = decodeBinary('01001000 01101001');
    expect(result).toBe('Hi');
  });

  it('should be reversible', () => {
    const original = 'Hello World!';
    const encoded = encodeBinary(original);
    const decoded = decodeBinary(encoded);
    expect(decoded).toBe(original);
  });
});
```

### Test Coverage

- Aim for **80%+ code coverage**
- Test edge cases and error handling
- Test reversibility for reversible encoders
- Test with special characters and Unicode

## Pull Request Process

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] New code has tests
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] Branch is up to date with main

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(encoder): add QR code generator
fix(morse): correct decoding for special characters
docs(readme): update installation instructions
test(binary): add edge case tests
```

### Review Process

1. At least one maintainer approval required
2. All CI checks must pass
3. Code review feedback must be addressed
4. Squash and merge strategy used

## Adding New Encoders

To add a new encoder:

### 1. Create the Encoder Function

Add to appropriate file in `src/utils/encoders/` or create a new category:

```javascript
/**
 * Encodes text using your new method
 * @param {string} text - The text to encode
 * @returns {string} - Encoded representation
 */
export const encodeYourMethod = (text) => {
  // Implementation
  return encodedText;
};

/**
 * Decodes text (if reversible)
 * @param {string} text - The encoded text
 * @returns {string} - Decoded text or error message
 */
export const decodeYourMethod = (text) => {
  try {
    // Implementation
    return decodedText;
  } catch {
    return '[Decode failed]';
  }
};
```

### 2. Export from Index

Add to `src/utils/encoders/index.js`:

```javascript
export * from './your-category.js';
```

### 3. Add to Encoder Config

Add entry to `src/utils/encoderConfig.js`:

```javascript
{
  id: 'your-encoder',
  name: 'Your Encoder Name',
  description: 'Brief description',
  emoji: '🎯',
  category: 'fun', // secret, classic, computer, cipher, fun, artistic, advanced
  encode: encoders.encodeYourMethod,
  decode: encoders.decodeYourMethod, // Optional
  reversible: true, // true if decode exists
  tags: ['tag1', 'tag2']
}
```

### 4. Write Tests

Create tests in `src/__tests__/`:

```javascript
describe('Your Encoder', () => {
  it('should encode correctly', () => {
    // Test implementation
  });

  it('should decode correctly', () => {
    // Test implementation
  });
});
```

### 5. Update Documentation

- Add to README.md encoder list
- Update count in descriptions (e.g., "25+ encoders" → "26+ encoders")

## Questions?

Feel free to:
- Open an [issue](https://github.com/zophiezlan/encode-me-txt/issues) for questions
- Start a [discussion](https://github.com/zophiezlan/encode-me-txt/discussions)

Thank you for contributing! 🎉
