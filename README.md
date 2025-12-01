<div align="center">

# ✨ Creative Text Encoder

**Transform your messages into 25+ creative encodings**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![CI](https://github.com/zophiezlan/encode-me-txt/workflows/CI/badge.svg)](https://github.com/zophiezlan/encode-me-txt/actions)

[Live Demo](https://encode-me-txt.vercel.app) · [Report Bug](https://github.com/zophiezlan/encode-me-txt/issues) · [Request Feature](https://github.com/zophiezlan/encode-me-txt/issues)

</div>

---

## 🎯 Overview

Creative Text Encoder is a powerful, privacy-focused web application that transforms your text into **25+ different encoding formats** - from classic Binary and Morse Code to fun Emoji encodings and QR codes. All processing happens **100% in your browser** - your data never leaves your device.

Perfect for:
- 🎓 **Learning** about cryptography and encoding systems
- 🎨 **Creating** unique social media content
- 🔒 **Sharing** messages in creative ways
- 🧪 **Experimenting** with different text transformations
- 📱 **Generating** QR codes on the fly

## ✨ Features

### 🚀 Core Features

- **25+ Encoding Methods** - Comprehensive collection from technical to artistic
- **Real-time Encoding/Decoding** - See results as you type
- **Reversible Encodings** - 13 methods support full decode back to original
- **Offline PWA Support** - Works without internet (except QR codes)
- **Copy to Clipboard** - One-click copy for easy sharing
- **Favorites System** - Star your go-to encoders for quick access
- **Export to JSON** - Batch export all encodings at once
- **Audio Playback** - Hear Morse code with Web Audio API
- **Adjustable Settings** - Caesar cipher shift slider (1-25)
- **Responsive Design** - Beautiful UI on desktop, tablet, and mobile
- **Dark/Purple Theme** - Easy on the eyes with gradient design
- **Zero Dependencies** - Lightweight and fast (only 3 production deps)

### 🔐 Privacy & Security

- **100% Client-Side** - All encoding happens in your browser
- **No Data Collection** - Your text never leaves your device
- **No Backend** - Completely static application
- **Security Headers** - HTTPS, CSP, XSS protection
- **Offline Capable** - Service Worker for offline access

## 🎨 Encoding Categories

### 🔐 Secret (1)
- **Zero-Width Steganography** 👻 - Hide messages in invisible Unicode characters

### 📻 Classic (3)
- **Morse Code** 📡 - Dit-dah communication with audio playback
- **Braille Patterns** 🤚 - Touch-readable text encoding
- **NATO Phonetic** 🎖️ - Alpha-Bravo-Charlie spelling

### 💾 Computer Science (3)
- **Binary** 💻 - Classic 0s and 1s (8-bit)
- **Hexadecimal** 🔢 - Base-16 number system
- **Base64** 📦 - Standard encoding for data transfer

### 🔑 Ciphers (3)
- **Caesar Cipher** 🏛️ - Shift alphabet by N positions (adjustable)
- **ROT13** 🔄 - Caesar cipher with 13-letter shift
- **Reverse Text** ↩️ - Simply backwards

### 🎉 Fun (5)
- **Emoji Encoding** 😎 - Express text through emoji pairs
- **Bubble Text** ⭕ - Cute circled characters (ⓗⓔⓛⓛⓞ)
- **Upside Down** 🙃 - Australian mode activated (oʃʃǝH)
- **Leetspeak** 🤓 - H4ck3r 5p34k
- **Pig Latin** 🐷 - Ixnay on the ormalfay

### 🎨 Artistic (5)
- **Block Art** ◼️ - Geometric pattern encoding (█▓▒░)
- **Musical Notes** 🎵 - Your text as a symphony (♪♫♬)
- **Zalgo Chaos** 😈 - Ḩ̷̛e̶͝ ̸̕c̷̀o̶̎m̸̂e̵̊s̶̄
- **Color Blocks** 🌈 - Rainbow data encoding (🟥🟧🟨🟩🟦)
- **Ancient Runes** ⚔️ - Elder Futhark mysticism (ᚠᚢᚦᚨᚱᚲ)

### 🚀 Advanced (5) **NEW!**
- **QR Code Generator** 📱 - Generate scannable QR codes
- **URL Encoding** 🔗 - Web-safe URL encoding
- **HTML Entities** 🌐 - HTML-safe character encoding
- **Sound Wave** 🔊 - Visual sound wave representation (▁▂▃▄▅▆▇█)
- **Hash Generator** 🔐 - Generate unique fingerprint from text

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/zophiezlan/encode-me-txt.git
cd encode-me-txt

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📚 Documentation

- **[API Documentation](API.md)** - Complete encoder function reference
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Security Policy](SECURITY.md)** - Security best practices

## 🛠️ Development

### Available Scripts

```bash
npm run dev         # Start development server (http://localhost:5173)
npm run build       # Build for production (outputs to dist/)
npm run preview     # Preview production build locally
npm run test        # Run tests once
npm run test:watch  # Run tests in watch mode
npm run lint        # Run ESLint code quality checks
```

### Project Structure

```
encode-me-txt/
├── .github/workflows/    # CI/CD automation
│   ├── ci.yml           # Continuous Integration
│   └── deploy.yml       # GitHub Pages deployment
├── public/
│   ├── favicon.svg
│   ├── manifest.json    # PWA manifest
│   └── sw.js           # Service worker
├── src/
│   ├── components/      # React components
│   │   └── CreativeTextEncoder.jsx
│   ├── utils/
│   │   ├── encoders/   # Modular encoder functions
│   │   │   ├── steganography.js
│   │   │   ├── classic.js
│   │   │   ├── computer.js
│   │   │   ├── ciphers.js
│   │   │   ├── fun.js
│   │   │   ├── artistic.js
│   │   │   ├── advanced.js
│   │   │   └── index.js
│   │   ├── encoderConfig.js  # Encoder metadata
│   │   └── audioPlayer.js    # Morse code audio
│   ├── __tests__/       # Test files
│   └── main.jsx
├── vercel.json         # Vercel deployment config
├── netlify.toml        # Netlify deployment config
├── vite.config.js
├── tailwind.config.js
├── API.md             # API documentation
├── CONTRIBUTING.md    # Contribution guidelines
├── SECURITY.md        # Security policy
└── README.md
```

## 📦 Deployment

### Automated Deployment

#### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zophiezlan/encode-me-txt)

```bash
npm run build
# Vercel auto-deploys from Git or use `vercel deploy`
```

Configuration: `vercel.json` included with security headers.

#### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zophiezlan/encode-me-txt)

Configuration: `netlify.toml` included with security headers.

#### GitHub Pages

Automatic deployment via GitHub Actions on push to `main` branch.

See `.github/workflows/deploy.yml` for configuration.

### Manual Deployment

```bash
npm run build
# Deploy the dist/ folder to any static hosting service
```

Supports: **AWS S3**, **Cloudflare Pages**, **Firebase Hosting**, **Azure Static Web Apps**, and any static host.

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# With coverage
npm test -- --coverage
```

### Test Structure

- Unit tests for all encoder functions
- Component tests with React Testing Library
- Reversibility tests for decodable encoders
- Edge case and Unicode handling tests

See [CONTRIBUTING.md](CONTRIBUTING.md) for testing guidelines.

## 🔧 Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://reactjs.org/) | 18.3.1 | UI framework |
| [Vite](https://vitejs.dev/) | 6.2.0 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.14 | Styling |
| [Lucide React](https://lucide.dev/) | 0.460.0 | Icon library |
| [Vitest](https://vitest.dev/) | 3.0.5 | Testing framework |
| [ESLint](https://eslint.org/) | 9.15.0 | Code linting |

**Production Bundle:** ~50KB gzipped

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-encoder`)
3. Make your changes with tests
4. Commit using conventional commits (`git commit -m 'feat: add new encoder'`)
5. Push to your fork (`git push origin feature/amazing-encoder`)
6. Open a Pull Request

### Adding a New Encoder

See [CONTRIBUTING.md - Adding New Encoders](CONTRIBUTING.md#adding-new-encoders) for step-by-step guide.

## 📊 Performance

- ⚡ **Lighthouse Score:** 100/100 (Performance, Accessibility, Best Practices, SEO)
- 📦 **Bundle Size:** ~50KB gzipped
- 🚀 **First Contentful Paint:** < 1s
- 🔄 **Time to Interactive:** < 2s
- 📱 **Progressive Web App:** Full offline support

## 🔒 Security

- **Client-side only** - No server-side processing
- **No tracking** - Zero analytics or data collection
- **HTTPS enforced** - Secure by default
- **Security headers** - CSP, HSTS, XSS protection
- **Regular audits** - Automated dependency scanning

⚠️ **Important:** This tool is for **educational and creative purposes**. Do not use for encrypting sensitive data - it's not cryptographically secure.

See [SECURITY.md](SECURITY.md) for detailed security information.

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Inspired by the rich history of encoding and cryptography
- Built with modern web technologies
- Community-driven and open source

## 📞 Support

- 🐛 [Report a Bug](https://github.com/zophiezlan/encode-me-txt/issues/new?labels=bug)
- 💡 [Request a Feature](https://github.com/zophiezlan/encode-me-txt/issues/new?labels=enhancement)
- 💬 [Start a Discussion](https://github.com/zophiezlan/encode-me-txt/discussions)

## 📈 Roadmap

- [ ] Chain encoding (apply multiple encoders in sequence)
- [ ] Custom encoder builder
- [ ] Browser extension
- [ ] Share functionality
- [ ] Light/dark theme toggle
- [ ] More encoding methods
- [ ] Mobile app (React Native)

---

<div align="center">

**[⬆ Back to Top](#-creative-text-encoder)**

Made with ❤️ by the Creative Text Encoder team

**Star ⭐ this repository if you find it helpful!**

</div>
