# Changelog

## [3.5.0] - 2025-12-15

### 🎖️ Military, Cryptographic & Signature Standards

#### New encoder modules (48 encoders)

- **`military.js`** (11) - MGRS Coordinates, STANAG 4439, ACP 125 Prowords, US Classification Markings, Zulu Time, Operation Code Names, Tactical Call Signs, NATO Brevity Codes, GEOREF, SIGINT Format, Weapon Designation
- **`crypto.js`** (17) - Bech32-style, Z-Base-32-style, Crockford Base32, SHA-256 Style, Argon2 Format, BCrypt Format, PEM Key Format, SSH Public Key, TOTP (2FA), API Key Format, ULID, Snowflake ID, X.509 Serial Number, Ethereum/Bitcoin Address, Crypto Strength Indicator, Multibase
- **`signatures.js`** (20) - PGP Signature, PGP Clearsigned, JWT Token, OAuth Bearer/Response, WebAuthn Credential, FIDO2 Assertion, Ethereum/Bitcoin Signature, Multisig, XML DSig, SAML Assertion, HMAC, AWS Signature V4, Stripe Webhook, Authenticode, Apple Code Signature, RFC 3161 Timestamp, Signed Cookie, Kerberos Ticket

> Note: Bech32 and Z-Base-32 are character-mapping approximations only; they do not implement the real algorithms (no BCH checksum, no bitstream packing).

---

## [3.4.0] - 2025-12-08

### ✨ Creative Text Effects

- **`effects.js`** (61) - Stylized text effects, decorative encoders, and creative typography transformations.

---

## [3.3.0] - 2025-12-07

### 📡 Communication & Signaling

- **`communication.js`** (45) - Communication protocol and signaling-style encodings (radio, semaphore-adjacent, telegraphy).

---

## [3.2.0] - 2025-12-07

### 🌍 Cultural & Script Encoders

- **`cultural.js`** (59) - Additional cultural scripts and writing-system transliterations.

---

## [3.1.0] - 2025-12-05

### 🎛️ Parameterized Encoders

- **`parameterized.js`** (55) - Encoders that accept user parameters (keys, shifts, modes) for richer configuration.
- Per-encoder settings panels in the UI for parameterized methods.

---

## [3.0.0] - 2025-12-05

### 🚀 Massive Encoder Library Expansion (158 new encoders)

#### New encoder modules

- **`patterns.js`** (18) - Fibonacci, Prime, Golden Ratio, Triangle/Pascal numbers, Binary Tree, Gray Code, Manchester, Hamming (7,4), Rule 30, and more
- **`forensics.js`** (21) - Unix Timestamp, MAC/IP Address, UUID, Hex Dump, Base58 (Bitcoin), Homoglyph/Unicode Tag Steganography, JWT Style, Regex Pattern, and more
- **`scientific.js`** (32) - Scientific Notation, Physics Constants, Chemical Formula, Electron Configuration, Quantum State, Vector/Matrix/Tensor Notation, Calculus, Complex Numbers, and more
- **`modern.js`** (26) - Code128/DataMatrix, Hashtag, Git Commit Hash, CSS Color, SemVer, Docker Tags, Kubernetes Labels, Progress Bar, Star Rating, and more
- **`nature.js`** (38) - RNA, Amino Acids, Codons, Plant/Animal Taxonomy, Constellation, Minerals, Cloud Types, Ocean Depth Zones, Cell Organelle, and more
- **`games.js`** (23) - Tetris, Poker Hand, RPG Stats, Rubik's Cube, Pokemon Types, Health Bar, Dungeon Map, Trading Card, Skill Tree, Combo Move, and more

#### Architecture

- Modular encoder structure under `src/utils/encoders/` (one file per category)
- Centralized export aggregator at `encoders/index.js`
- Shared utility helpers in `encoders/shared.js`

#### Breaking changes

- `package.json` major version bumped to 3.0
- Some encoder IDs in `encoderConfig.js` were renamed for consistency

---

## [2.1.0] - 2025-12-01

### 🔀 Shuffle Encoding & Next-Gen Features

#### New Features

##### 🔀 Shuffle Encoding (v2.1.0)

- **Shuffle Encoding Mode** - Select multiple encoders and have each character randomly encoded with one of them
- Interactive encoder selection panel with visual feedback
- Encoding map showing which encoder was used for each character
- Fully reversible with detailed decoding information
- Persistent selection stored in localStorage
- Purple/pink themed UI elements
- Prevents circular dependencies (shuffle encoder cannot be selected for shuffle)

##### 🎨 Visual Enhancements (v2.1.0)

- **Animated Particle Background** - Beautiful tsParticles integration with glassmorphic UI
- Smooth transitions and modern visual effects
- Performance-optimized rendering

##### 🛠️ Next Evolution Features (v2.1.0)

- **Custom Encoder Builder** - Create and save your own encoding schemes with custom character mappings
- **Visual Encoding Flow** - Watch character-by-character transformations animate in real-time
- **Preset System** - Save and load encoder combinations and configurations
- **Daily Puzzles** - Interactive encoding challenges with hints and solutions

##### 🚀 Performance & UX Improvements (v2.1.0)

- Optimized encoding performance with better state management
- Fixed infinite re-encoding loop
- Improved history saving reliability
- Enhanced mobile experience with better modal handling
- Cleaner UX with encoder parameters moved to cards

---

## [2.0.0] - 2025-12-01

### 🎉 Major Redesign - Market-Differentiating Features

This release transforms Creative Text Encoder from a simple encoding tool into an **interactive encoding playground** with features that set it apart from all competitors.

### ✨ New Features

#### 🌟 12 Unique Encoders (Not Found in Competitor Apps)

- **DNA Sequence** 🧬 - Encode text as genetic base pairs (ATGC) - Reversible!
- **Playing Cards** 🃏 - Express text through card deck symbols - Reversible!
- **Chemistry Elements** ⚗️ - Periodic table element encoding
- **GPS Coordinates** 🗺️ - Text as latitude/longitude - Reversible!
- **Zodiac Signs** ♈ - Astrological symbol encoding - Reversible!
- **Barcode** 📊 - Visual barcode-style bars
- **Minecraft Blocks** ⛏️ - Gaming block emojis
- **Recipe Cipher** 🍳 - Cooking ingredients encoding
- **Clock Time** 🕐 - Encode as clock times
- **Weather Symbols** ⛅ - Meteorological encoding
- **Domino Tiles** 🁣 - Game piece patterns
- **Traffic Signs** 🛑 - Road sign symbols

#### 🔗 Functional Chain Encoding

- Apply multiple encoders in sequence (finally implemented!)
- See step-by-step transformation process
- Check if chain is reversible
- Visual feedback for chain sequences

#### 🎨 6 Stunning Themes

- **Dark Purple** - Original elegant theme
- **Light** - Clean and bright
- **Cyberpunk** - Neon pink and cyan
- **Ocean** - Calming teal and blue
- **Sunset** - Warm orange and pink
- **Matrix** - Iconic green on black

#### 📜 Persistent History System

- Automatically saves your encoding history
- View up to 50 recent encodings
- Timestamp tracking
- Quick access to previous work
- Clear individual entries or all history

#### 🔗 Shareable Links

- Generate shareable URLs with encoded messages
- Share via native share API or copy link
- Automatically load shared encodings
- Perfect for sending puzzles to friends

#### 📊 Encoding Strength Analyzer

- Real-time complexity analysis (0-100 score)
- Visual strength meter
- Detailed factor breakdown
- Security level classification
- Character frequency analysis

#### ⌨️ Keyboard Shortcuts

- `Ctrl+K` - Focus search
- `Ctrl+Shift+E` - Toggle encode/decode mode
- `Ctrl+Shift+C` - Toggle chain mode
- `Ctrl+Shift+H` - Toggle history panel
- `Ctrl+Shift+T` - Cycle themes
- `Ctrl+Shift+?` - Show shortcuts help
- `Esc` - Close modals/panels

#### 🔍 Advanced Search & Filter

- Instant search across all encoders
- Filter by category
- Filter by favorites
- Real-time results count
- Smart tag-based search

#### 👁️ Comparison Mode

- Compare up to 4 encodings side-by-side
- Visual side-by-side comparison
- Quick add/remove encoders
- Perfect for choosing the best encoding

#### 📱 Enhanced Mobile Experience

- Fully responsive design
- Touch-optimized controls
- Collapsible panels
- Mobile-friendly shortcuts

#### 💡 Smart UI Improvements

- Visual feedback for favorites
- Chain sequence visualization
- Category badges
- Reversible encoding indicators
- Real-time stats (chars, bytes, words)
- Recent encoder tracking
- Analysis badges on results

### 🚀 Performance Improvements

- Modular utility system
- Optimized rendering
- Efficient state management
- Lazy loading for modals
- Reduced bundle size through code splitting

### 🎯 User Experience Enhancements

- Cleaner, more organized interface
- Better visual hierarchy
- Improved color coding
- Enhanced feedback mechanisms
- More intuitive controls
- Professional glassmorphism design

### 🏗️ Architecture Improvements

- Separated utilities into modules:
  - `themeSystem.js` - Theme management
  - `historyManager.js` - History persistence
  - `chainEncoder.js` - Chain encoding logic
  - `encodingAnalyzer.js` - Strength analysis
  - `shareManager.js` - URL sharing
  - `keyboardShortcuts.js` - Keyboard controls
- Cleaner component structure
- Better separation of concerns
- More maintainable codebase

### 📈 Statistics

- **Total Encoders**: 37 (up from 25)
- **Unique Encoders**: 12 (brand new!)
- **Reversible Encoders**: 17 (up from 13)
- **Themes**: 6 (up from 1)
- **Keyboard Shortcuts**: 7
- **New Features**: 10 major features

### 🎨 Design Philosophy

This update transforms the app from a simple utility to a **creative playground for encoding enthusiasts**. Every feature was designed to either:

1. **Differentiate** from existing encoding tools
2. **Delight** users with unexpected functionality
3. **Empower** users with professional-grade features

### 🌟 What Makes This Version Unique

Unlike other text encoders that simply list encoding methods, Creative Text Encoder v2.0 offers:

- **Unique encoders** you won't find anywhere else (DNA, Playing Cards, Coordinates, etc.)
- **Chain encoding** to create complex multi-step transformations
- **Analysis tools** to understand encoding strength
- **History system** to track and reuse your work
- **Shareable links** to send encoded puzzles
- **Multiple themes** for personalization
- **Keyboard shortcuts** for power users
- **Comparison mode** to choose the best encoding

### 🔮 Future Enhancements

- Visual encoding animations
- Interactive tutorials for each encoder
- Custom encoder builder
- Batch file processing
- Browser extension
- Mobile app version

### 🙏 Credits

Massive redesign focused on market differentiation and user delight.
All processing remains 100% client-side - your data never leaves your device!
