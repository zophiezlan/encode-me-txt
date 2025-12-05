import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Copy, Check, Search, X, History,
  Share2, Keyboard, Trash2, TrendingUp, Zap, Eye, HelpCircle,
  BookOpen, Wand2, Film, Package, Gamepad2
} from 'lucide-react';
import { encoderConfig, categories } from '../utils/encoderConfig.js';
import { themes, getTheme, saveTheme, loadTheme } from '../utils/themeSystem.js';
import { HistoryManager } from '../utils/historyManager.js';
import { ChainEncoder } from '../utils/chainEncoder.js';
import { EncodingAnalyzer } from '../utils/encodingAnalyzer.js';
import { ShareManager } from '../utils/shareManager.js';
import { KeyboardShortcuts } from '../utils/keyboardShortcuts.js';
import { CustomEncoderManager } from '../utils/customEncoderManager.js';
import CustomEncoderBuilder from './CustomEncoderBuilder.jsx';
import VisualEncodingFlowViewer from './VisualEncodingFlowViewer.jsx';
import PresetsBrowser from './PresetsBrowser.jsx';
import DailyPuzzle from './DailyPuzzle.jsx';
import ParticlesBackground from './ParticlesBackground.jsx';

const EnhancedTextEncoder = () => {
  // Core state
  const [inputText, setInputText] = useState('Hello World!');
  const [mode, setMode] = useState('encode');
  const [copiedId, setCopiedId] = useState(null);
  const [encoderParams, setEncoderParams] = useState(() => {
    const saved = localStorage.getItem('encoder-params');
    return saved ? JSON.parse(saved) : { caesar: 13 };
  });

  // UI state
  const [currentTheme, setCurrentTheme] = useState(loadTheme());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('encoder-favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Feature states
  const [showHistory, setShowHistory] = useState(false);
  const [showChainMode, setShowChainMode] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showShuffleMode, setShowShuffleMode] = useState(false);
  const [chainSequence, setChainSequence] = useState([]);
  const [comparisonEncoders, setComparisonEncoders] = useState([]);
  const [shuffleEncoders, setShuffleEncoders] = useState(() => {
    const saved = localStorage.getItem('shuffle-encoders');
    return saved ? JSON.parse(saved) : ['binary', 'morse', 'caesar', 'emoji', 'braille'];
  });
  const [history, setHistory] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  // Onboarding & Help states
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('encoder-onboarded');
  });
  const [showGuide, setShowGuide] = useState(false);

  // NEW: Next Evolution Features
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [showVisualFlow, setShowVisualFlow] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [showDailyPuzzle, setShowDailyPuzzle] = useState(false);
  const [visualFlowEncoder, setVisualFlowEncoder] = useState(null);
  const [allEncoders, setAllEncoders] = useState(encoderConfig);

  const searchInputRef = useRef(null);
  const keyboardShortcuts = useRef(null);
  const theme = getTheme(currentTheme);

  // Memoized theme cycler for keyboard shortcuts
  const cycleTheme = useCallback(() => {
    const themeIds = Object.keys(themes);
    setCurrentTheme(prev => {
      const currentIndex = themeIds.indexOf(prev);
      const nextIndex = (currentIndex + 1) % themeIds.length;
      const nextTheme = themeIds[nextIndex];
      saveTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  // Initialize keyboard shortcuts
  useEffect(() => {
    keyboardShortcuts.current = new KeyboardShortcuts();
    const ks = keyboardShortcuts.current;

    ks.register('ctrl+k', () => searchInputRef.current?.focus(), 'Focus search');
    ks.register('ctrl+shift+e', () => setMode(m => m === 'encode' ? 'decode' : 'encode'), 'Toggle mode');
    ks.register('ctrl+shift+h', () => setShowHistory(h => !h), 'Toggle history');
    ks.register('ctrl+shift+c', () => setShowChainMode(c => !c), 'Toggle chain mode');
    ks.register('ctrl+shift+t', cycleTheme, 'Cycle theme');
    ks.register('ctrl+shift+?', () => setShowShortcuts(true), 'Show shortcuts');
    ks.register('escape', () => {
      setShowHistory(false);
      setShowChainMode(false);
      setShowShortcuts(false);
      setShowAnalysis(false);
    }, 'Close panels');

    ks.start();

    return () => ks.stop();
  }, [cycleTheme]);

  // Load history
  useEffect(() => {
    setHistory(HistoryManager.getHistory());
  }, []);

  // Check for shared links
  useEffect(() => {
    const shared = ShareManager.parseSharedLink();
    if (shared) {
      setInputText(shared.text);
      setMode(shared.mode);
      // Clear URL params
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // NEW: Load custom encoders and merge with built-in encoders
  useEffect(() => {
    const customs = CustomEncoderManager.getEncoders();

    // Convert custom encoders to encoder config format
    const customConfigs = customs.map(ce =>
      CustomEncoderManager.toEncoderConfig(ce)
    );

    // Merge with built-in encoders
    setAllEncoders([...encoderConfig, ...customConfigs]);
  }, [showCustomBuilder]); // Reload when custom builder is closed

  // Save favorites
  useEffect(() => {
    localStorage.setItem('encoder-favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  // Save encoder params
  useEffect(() => {
    localStorage.setItem('encoder-params', JSON.stringify(encoderParams));
  }, [encoderParams]);

  // Save shuffle encoders
  useEffect(() => {
    localStorage.setItem('shuffle-encoders', JSON.stringify(shuffleEncoders));
  }, [shuffleEncoders]);

  const updateEncoderParam = (encoderId, _paramName, value) => {
    setEncoderParams(prev => ({
      ...prev,
      [encoderId]: value
    }));
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

  const copyToClipboard = async (text, id, encoderName = null, encoderId = null) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);

      // Save to history when user copies (not for special IDs like 'chain-final')
      if (encoderName && encoderId && text && !text.includes('[')) {
        saveToHistory(encoderId, encoderName, text);
      }
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const saveToHistory = (encoderId, encoderName, result) => {
    if (result && !result.includes('[') && result.length > 0) {
      HistoryManager.saveEntry(inputText, encoderId, encoderName, result, mode);
      setHistory(HistoryManager.getHistory());
    }
  };

  const handleShare = async (encoderId, encoderName, result) => {
    const url = ShareManager.createShareableLink(inputText, encoderId, mode);
    const shared = await ShareManager.shareNative(url);
    if (!shared) {
      await ShareManager.copyShareLink(url);
      setCopiedId(`share-${encoderId}`);
      setTimeout(() => setCopiedId(null), 2000);
    }

    // Save to history when user shares
    if (result && !result.includes('[')) {
      saveToHistory(encoderId, encoderName, result);
    }
  };

  const analyzeEncoding = (encoder, result) => {
    if (!result || result.includes('[')) return null;
    return EncodingAnalyzer.analyzeStrength(inputText, result, encoder);
  };

  const executeChainEncoding = () => {
    if (chainSequence.length === 0) return null;

    const encoders = chainSequence.map(id =>
      encoderConfig.find(e => e.id === id)
    ).filter(Boolean);

    const caesarShift = encoderParams.caesar || 13;

    if (mode === 'encode') {
      return ChainEncoder.encode(inputText, encoders, caesarShift);
    } else {
      return ChainEncoder.decode(inputText, encoders, caesarShift);
    }
  };

  const addToChain = (encoderId) => {
    if (!chainSequence.includes(encoderId)) {
      setChainSequence([...chainSequence, encoderId]);
    }
  };

  const removeFromChain = (encoderId) => {
    setChainSequence(chainSequence.filter(id => id !== encoderId));
  };

  const toggleShuffleEncoder = (encoderId) => {
    if (shuffleEncoders.includes(encoderId)) {
      // Don't allow removing if it's the last one
      if (shuffleEncoders.length > 1) {
        setShuffleEncoders(shuffleEncoders.filter(id => id !== encoderId));
      }
    } else {
      setShuffleEncoders([...shuffleEncoders, encoderId]);
    }
  };

  const toggleComparison = (encoderId) => {
    if (comparisonEncoders.includes(encoderId)) {
      setComparisonEncoders(comparisonEncoders.filter(id => id !== encoderId));
    } else if (comparisonEncoders.length < 4) {
      setComparisonEncoders([...comparisonEncoders, encoderId]);
    }
  };

  // Onboarding functions
  const completeOnboarding = () => {
    localStorage.setItem('encoder-onboarded', 'true');
    setShowWelcome(false);
  };

  const startQuickTour = () => {
    setShowWelcome(false);
    localStorage.setItem('encoder-onboarded', 'true');
    setShowGuide(true);
  };

  const tryExample = (exampleText) => {
    setInputText(exampleText);
    completeOnboarding();
  };

  // Memoize encoder results to avoid re-encoding on every render
  const encoderResults = useMemo(() => {
    if (!inputText) return {};

    const results = {};
    const caesarShift = encoderParams.caesar || 13;

    allEncoders.forEach(encoder => {
      try {
        if (mode === 'decode') {
          if (encoder.reversible) {
            if (encoder.id === 'caesar') {
              results[encoder.id] = encoder.decode(inputText, caesarShift);
            } else if (encoder.id === 'shuffle') {
              results[encoder.id] = encoder.decode(inputText);
            } else {
              results[encoder.id] = encoder.decode(inputText);
            }
          } else {
            results[encoder.id] = '[Not reversible]';
          }
        } else {
          if (encoder.id === 'caesar') {
            results[encoder.id] = encoder.encode(inputText, caesarShift);
          } else if (encoder.id === 'shuffle') {
            results[encoder.id] = encoder.encode(inputText, shuffleEncoders);
          } else {
            results[encoder.id] = encoder.encode(inputText);
          }
        }
      } catch {
        results[encoder.id] = '[Error]';
      }
    });

    return results;
  }, [inputText, mode, encoderParams, shuffleEncoders, allEncoders]);

  // Filter encoders (memoized)
  const filteredEncoders = useMemo(() => {
    return allEncoders.filter(encoder => {
      const matchesSearch = searchQuery === '' ||
        encoder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        encoder.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        encoder.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || encoder.category === selectedCategory || (encoder.custom && selectedCategory === 'custom');
      const matchesFavorites = selectedCategory !== 'favorites' || favorites.has(encoder.id);

      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [searchQuery, selectedCategory, favorites, allEncoders]);

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

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} ${theme.textPrimary} p-4 md:p-8 transition-all duration-500`}>
      <ParticlesBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Welcome Modal - First Time Users */}
        {showWelcome && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto">
            <div className={`${theme.cardBg} backdrop-blur-lg rounded-3xl p-6 md:p-8 max-w-2xl w-full border-2 ${theme.cardBorder} shadow-2xl my-4 max-h-[90vh] overflow-y-auto`}>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">✨</div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Creative Text Encoder
                </h2>
                <p className={`text-sm ${theme.textSecondary}`}>
                  Transform text into 120+ encoding formats
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="bg-white/10 rounded-lg p-3 flex gap-3 items-start">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h3 className="font-semibold text-sm">Instant Encoding</h3>
                    <p className="text-xs text-white/70">See 120+ formats instantly - Binary, Morse, DNA, Emoji & more</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 flex gap-3 items-start">
                  <div className="text-2xl">🔒</div>
                  <div>
                    <h3 className="font-semibold text-sm">100% Private</h3>
                    <p className="text-xs text-white/70">All encoding happens in your browser - no servers, no tracking</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 flex gap-3 items-start">
                  <div className="text-2xl">✓</div>
                  <div>
                    <h3 className="font-semibold text-sm">Reversible</h3>
                    <p className="text-xs text-white/70">50+ encodings can decode back to original (look for ✓ mark)</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 mb-5">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  💡 Try an example:
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => tryExample('Hello World!')}
                    className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-xs transition-all"
                  >
                    Hello World!
                  </button>
                  <button
                    onClick={() => tryExample('Meet me at midnight')}
                    className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-xs transition-all"
                  >
                    Secret message
                  </button>
                  <button
                    onClick={() => tryExample('Happy Birthday! 🎉')}
                    className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-xs transition-all"
                  >
                    Happy Birthday! 🎉
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={startQuickTour}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 rounded-lg transition-all text-sm"
                >
                  Quick Tour
                </button>
                <button
                  onClick={completeOnboarding}
                  className="flex-1 bg-white/10 hover:bg-white/20 font-semibold py-3 rounded-lg transition-all text-sm"
                >
                  Start Exploring
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Guide Modal */}
        {showGuide && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className={`${theme.cardBg} backdrop-blur-lg rounded-3xl p-6 md:p-8 max-w-2xl w-full border-2 ${theme.cardBorder} my-4 max-h-[90vh] overflow-y-auto`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <BookOpen size={28} />
                  How to Use This App
                </h2>
                <button onClick={() => setShowGuide(false)} className="p-2 hover:bg-white/20 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Type Your Message</h3>
                      <p className="text-white/70">Enter any text in the input box below. As you type, you'll see it instantly encoded in 120+ different formats!</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Explore Different Encodings</h3>
                      <p className="text-white/70 mb-2">Scroll through the cards below to see your text in different formats:</p>
                      <ul className="text-sm text-white/70 space-y-1 ml-4">
                        <li>• <strong>Green checkmark (✓)</strong> = Can be decoded back to original</li>
                        <li>• <strong>Star icon (⭐)</strong> = Click to save as favorite</li>
                        <li>• <strong>Copy button</strong> = Copy the encoded text</li>
                        <li>• <strong>Share button</strong> = Share with others</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Switch to Decode Mode</h3>
                      <p className="text-white/70">Click the "🔓 Decode" button at the top to reverse any encoding. Paste encoded text and see the original message (works for 17 encoders with ✓ mark).</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Advanced Features (Optional)</h3>
                      <p className="text-white/70 mb-2">Power user features available:</p>
                      <ul className="text-sm text-white/70 space-y-1 ml-4">
                        <li>• <strong>🔗 Chain</strong> = Apply multiple encodings in sequence</li>
                        <li>• <strong>👁️ Compare</strong> = View up to 4 encodings side-by-side</li>
                        <li>• <strong>History</strong> = Track your past encodings</li>
                        <li>• <strong>Search</strong> = Find specific encoders quickly</li>
                        <li>• <strong>Themes</strong> = Choose from 6 beautiful color themes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Keyboard size={18} />
                    Keyboard Shortcuts
                  </h3>
                  <div className="text-sm text-white/70 grid grid-cols-2 gap-2">
                    <div><kbd className="bg-white/20 px-2 py-1 rounded text-xs">Ctrl+K</kbd> Focus search</div>
                    <div><kbd className="bg-white/20 px-2 py-1 rounded text-xs">Ctrl+Shift+E</kbd> Toggle mode</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowGuide(false)}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all"
              >
                Got It - Let's Start!
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4 gap-3">
            <div className="hidden md:block flex-1"></div>
            <h1 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-pulse flex-1">
              ✨ Creative Text Encoder
            </h1>
            <div className="flex-1 flex justify-center md:justify-end gap-2">
              <button
                onClick={() => setShowGuide(true)}
                className={`px-4 py-2 ${theme.cardBg} hover:bg-white/20 backdrop-blur-lg rounded-full border ${theme.cardBorder} transition-all font-semibold text-sm flex items-center gap-2`}
                title="Help & Guide"
              >
                <HelpCircle size={18} />
                <span className="hidden md:inline">Help</span>
              </button>
            </div>
          </div>
          <p className={`text-lg md:text-xl ${theme.textSecondary} mb-4`}>
            Transform your messages into 120+ creative encodings - instantly see Binary, Morse Code, DNA, Emoji, and more!
          </p>

          {/* Theme Switcher */}
          <div className="flex justify-center gap-1.5 md:gap-2 mb-4 flex-wrap px-2">
            {Object.values(themes).map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setCurrentTheme(t.id);
                  saveTheme(t.id);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  currentTheme === t.id
                    ? `bg-gradient-to-r ${t.buttonPrimary} text-white scale-110`
                    : `${theme.cardBg} ${theme.cardBorder} border hover:scale-105`
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Stats - Simplified */}
          {inputText && (
            <div className={`flex justify-center gap-3 text-xs ${theme.textSecondary}`}>
              <span>{inputText.length} chars</span>
              <span>•</span>
              <span>{inputText.split(/\s+/).filter(w => w).length} words</span>
              {favorites.size > 0 && (
                <>
                  <span>•</span>
                  <span>⭐ {favorites.size}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Info Banner - Simplified */}
        {!showWelcome && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-xl p-3 mb-4 shadow-lg">
            <p className="text-xs md:text-sm text-center">
              {mode === 'encode'
                ? '✨ Type text to see 120+ instant encodings'
                : '🔓 Paste encoded text to decode (works with ✓ marked encoders)'}
            </p>
          </div>
        )}

        {/* Main Controls */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6">
          {/* Mode Toggle */}
          <div className={`${theme.cardBg} backdrop-blur-lg rounded-full p-1 border ${theme.cardBorder}`}>
            <button
              onClick={() => setMode('encode')}
              className={`px-4 md:px-8 py-2 md:py-3 rounded-full transition-all font-semibold text-sm md:text-base ${
                mode === 'encode'
                  ? `bg-gradient-to-r ${theme.buttonPrimary} text-white`
                  : `${theme.textSecondary} hover:${theme.textPrimary}`
              }`}
              title="Convert plain text into encoded formats"
            >
              ✏️ Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 md:px-8 py-2 md:py-3 rounded-full transition-all font-semibold text-sm md:text-base ${
                mode === 'decode'
                  ? `bg-gradient-to-r ${theme.buttonSecondary} text-white`
                  : `${theme.textSecondary} hover:${theme.textPrimary}`
              }`}
              title="Convert encoded text back to original (reversible encoders only)"
            >
              🔓 Decode
            </button>
          </div>

          {/* Feature Toggles */}
          <button
            onClick={() => setShowChainMode(!showChainMode)}
            className={`px-4 md:px-6 py-2 md:py-3 backdrop-blur-lg rounded-full border transition-all font-semibold text-sm md:text-base ${
              showChainMode
                ? `bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 text-white`
                : `${theme.cardBg} ${theme.cardBorder}`
            }`}
            title="Advanced: Apply multiple encodings in sequence (e.g., Binary → Base64 → Morse)"
          >
            🔗 Chain {chainSequence.length > 0 && `(${chainSequence.length})`}
          </button>

          <button
            onClick={() => setShowShuffleMode(!showShuffleMode)}
            className={`px-4 md:px-6 py-2 md:py-3 backdrop-blur-lg rounded-full border transition-all font-semibold text-sm md:text-base ${
              showShuffleMode
                ? `bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white`
                : `${theme.cardBg} ${theme.cardBorder}`
            }`}
            title="Select multiple encoders - each character will be randomly encoded with one of them"
          >
            🔀 Shuffle {shuffleEncoders.length > 0 && `(${shuffleEncoders.length})`}
          </button>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`px-4 md:px-6 py-2 md:py-3 ${theme.cardBg} hover:bg-white/20 backdrop-blur-lg rounded-full border ${theme.cardBorder} transition-all font-semibold text-sm md:text-base`}
            title="View your past encodings (automatically saved)"
          >
            <History size={18} className="inline mr-2" />
            History
          </button>

          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`px-4 md:px-6 py-2 md:py-3 backdrop-blur-lg rounded-full border transition-all font-semibold text-sm md:text-base ${
              showComparison
                ? `bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400 text-white`
                : `${theme.cardBg} ${theme.cardBorder}`
            }`}
            title="Compare up to 4 encodings side-by-side"
          >
            <Eye size={18} className="inline mr-2" />
            Compare {comparisonEncoders.length > 0 && `(${comparisonEncoders.length})`}
          </button>

          <button
            onClick={() => setShowShortcuts(true)}
            className={`px-4 md:px-6 py-2 md:py-3 ${theme.cardBg} hover:bg-white/20 backdrop-blur-lg rounded-full border ${theme.cardBorder} transition-all font-semibold text-sm md:text-base`}
            title="View all keyboard shortcuts for power users"
          >
            <Keyboard size={18} />
          </button>

          {/* NEW: Next Evolution Features */}
          <button
            onClick={() => setShowCustomBuilder(true)}
            className={`px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 backdrop-blur-lg rounded-full border border-purple-400 transition-all font-semibold text-sm md:text-base text-white`}
            title="Create your own custom encoders"
          >
            <Wand2 size={18} className="inline mr-2" />
            Custom
          </button>

          <button
            onClick={() => setShowPresets(true)}
            className={`px-4 md:px-6 py-2 md:py-3 ${theme.cardBg} hover:bg-white/20 backdrop-blur-lg rounded-full border ${theme.cardBorder} transition-all font-semibold text-sm md:text-base`}
            title="Browse and load encoding presets"
          >
            <Package size={18} className="inline mr-2" />
            Presets
          </button>

          <button
            onClick={() => setShowDailyPuzzle(true)}
            className={`px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 backdrop-blur-lg rounded-full border border-yellow-400 transition-all font-semibold text-sm md:text-base text-white`}
            title="Daily encoding puzzle challenge"
          >
            <Gamepad2 size={18} className="inline mr-2" />
            Puzzle
          </button>
        </div>

        {/* Input Section */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4 md:p-6 mb-6 shadow-2xl">
          <label className="block text-sm md:text-base font-semibold mb-3">
            {mode === 'encode' ? '📝 Your Message' : '🔍 Encoded Text'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={`w-full px-4 md:px-6 py-3 md:py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl ${theme.textPrimary} placeholder-white/50 text-base md:text-lg focus:outline-none focus:border-purple-400/60 focus:bg-white/15 transition-all min-h-[100px] md:min-h-[120px] resize-y`}
            placeholder={mode === 'encode'
              ? 'Type anything here... Try "Hello World!" or "Meet me at midnight"'
              : 'Paste encoded text here (e.g., morse code, binary, etc.)'}
          />
        </div>

        {/* Search and Filter */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-3 md:p-4 mb-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search encoders... (Ctrl+K)"
                className={`w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl ${theme.textPrimary} placeholder-white/50 focus:outline-none focus:border-purple-400/60 focus:bg-white/15 transition-all`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl ${theme.textPrimary} focus:outline-none focus:border-purple-400/60 transition-all`}
            >
              <option value="all">All Categories</option>
              <option value="favorites">⭐ Favorites</option>
              {Object.entries(categories).map(([id, cat]) => (
                <option key={id} value={id}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chain Mode Panel */}
        {showChainMode && (
          <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 mb-6 border border-green-400/30`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                🔗 Chain Encoding
                {chainSequence.length > 0 && ChainEncoder.isChainReversible(
                  chainSequence.map(id => encoderConfig.find(e => e.id === id))
                ) && <span className="text-xs bg-green-500/30 px-2 py-1 rounded-full">Reversible</span>}
              </h3>
              <button onClick={() => setShowChainMode(false)} className="p-1 hover:bg-white/20 rounded">
                <X size={20} />
              </button>
            </div>

            {chainSequence.length === 0 ? (
              <p className={`${theme.textSecondary} mb-4`}>
                Click the 🔗 button on any encoder below to add it to the chain. Encodings will be applied in order.
              </p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  {chainSequence.map((id, index) => {
                    const encoder = encoderConfig.find(e => e.id === id);
                    return (
                      <div key={id} className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
                        <span className="text-xs font-bold">{index + 1}</span>
                        <span>{encoder.emoji}</span>
                        <span className="text-sm">{encoder.name}</span>
                        <button
                          onClick={() => removeFromChain(id)}
                          className="ml-2 text-red-400 hover:text-red-300"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {inputText && (() => {
                  const result = executeChainEncoding();
                  return result && (
                    <div className="space-y-2">
                      <div className="bg-black/30 rounded-lg p-4">
                        <div className="text-sm font-semibold mb-2">Final Result:</div>
                        <div className="font-mono text-sm break-all">{result.finalResult}</div>
                        <button
                          onClick={() => copyToClipboard(result.finalResult, 'chain-final')}
                          className="mt-2 px-3 py-1 bg-green-500/30 hover:bg-green-500/50 rounded-lg text-sm"
                        >
                          {copiedId === 'chain-final' ? <Check size={16} className="inline" /> : <Copy size={16} className="inline" />} Copy
                        </button>
                      </div>

                      <details className="bg-black/20 rounded-lg p-4">
                        <summary className="cursor-pointer font-semibold text-sm">View Step-by-Step</summary>
                        <div className="mt-3 space-y-2">
                          {result.steps.map((step, i) => (
                            <div key={i} className="bg-white/10 p-2 rounded text-xs">
                              <div className="font-semibold">{i + 1}. {step.encoderName}</div>
                              <div className="font-mono mt-1">{step.result}</div>
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        )}

        {/* Shuffle Mode Panel */}
        {showShuffleMode && (
          <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 mb-6 border border-purple-400/30`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                🔀 Shuffle Encoding
                <span className="text-xs bg-purple-500/30 px-2 py-1 rounded-full">{shuffleEncoders.length} selected</span>
              </h3>
              <button onClick={() => setShowShuffleMode(false)} className="p-1 hover:bg-white/20 rounded">
                <X size={20} />
              </button>
            </div>

            <p className={`${theme.textSecondary} mb-4 text-sm`}>
              Select multiple encoders below using the 🔀 button. Each character will be randomly encoded with one of your selected encoders, creating a unique mixed encoding!
            </p>

            {shuffleEncoders.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {shuffleEncoders.map((id) => {
                  const encoder = allEncoders.find(e => e.id === id);
                  if (!encoder) return null;
                  return (
                    <div key={id} className="flex items-center gap-2 bg-purple-500/20 px-3 py-2 rounded-lg border border-purple-400/30">
                      <span>{encoder.emoji}</span>
                      <span className="text-sm">{encoder.name}</span>
                      <button
                        onClick={() => toggleShuffleEncoder(id)}
                        className="ml-2 text-red-400 hover:text-red-300"
                        disabled={shuffleEncoders.length === 1}
                        title={shuffleEncoders.length === 1 ? "You need at least one encoder" : "Remove from shuffle"}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <div className={`text-xs ${theme.textSecondary} bg-purple-500/10 rounded-lg p-3 border border-purple-400/20`}>
              💡 <strong>Tip:</strong> The Shuffle encoder will use your selected encoders. View the Shuffle Encoding card below to see the mixed result!
            </div>
          </div>
        )}

        {/* Comparison Mode */}
        {showComparison && comparisonEncoders.length > 0 && (
          <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 mb-6 border border-blue-400/30`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">👁️ Comparison Mode</h3>
              <button onClick={() => setShowComparison(false)} className="p-1 hover:bg-white/20 rounded">
                <X size={20} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {comparisonEncoders.map(id => {
                const encoder = encoderConfig.find(e => e.id === id);
                if (!encoder) return null;

                // Use memoized result
                const result = encoderResults[id] || '';

                return (
                  <div key={id} className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{encoder.emoji}</span>
                        <span className="font-semibold">{encoder.name}</span>
                      </div>
                      <button onClick={() => toggleComparison(id)} className="text-red-400 hover:text-red-300">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="bg-black/30 rounded p-3 font-mono text-xs break-all min-h-[60px]">
                      {result}
                    </div>
                    <div className="mt-2 text-xs ${theme.textSecondary}">
                      {result.length} chars • {new Blob([result]).size} bytes
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* History Panel */}
        {showHistory && (
          <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 mb-6 border ${theme.cardBorder}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold"><History size={24} className="inline mr-2" />Encoding History</h3>
              <div className="flex gap-2">
                {history.length > 0 && (
                  <>
                    <button
                      onClick={() => HistoryManager.downloadHistory('json')}
                      className="px-3 py-1 bg-blue-500/30 hover:bg-blue-500/50 rounded-lg text-sm"
                      title="Export as JSON"
                    >
                      📥 JSON
                    </button>
                    <button
                      onClick={() => HistoryManager.downloadHistory('csv')}
                      className="px-3 py-1 bg-green-500/30 hover:bg-green-500/50 rounded-lg text-sm"
                      title="Export as CSV"
                    >
                      📊 CSV
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    HistoryManager.clearHistory();
                    setHistory([]);
                  }}
                  className="px-3 py-1 bg-red-500/30 hover:bg-red-500/50 rounded-lg text-sm"
                >
                  Clear All
                </button>
                <button onClick={() => setShowHistory(false)} className="p-1 hover:bg-white/20 rounded">
                  <X size={20} />
                </button>
              </div>
            </div>

            {history.length === 0 ? (
              <p className={theme.textSecondary}>No encoding history yet. Start encoding to see your history here!</p>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {history.map((entry) => (
                  <div key={entry.id} className="bg-white/10 rounded-lg p-3 flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{entry.encoderName}</span>
                        <span className="text-xs text-white/50">
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs font-mono truncate">{entry.inputText}</div>
                      <div className="text-xs font-mono truncate text-white/70">{entry.result}</div>
                    </div>
                    <button
                      onClick={() => {
                        HistoryManager.deleteEntry(entry.id);
                        setHistory(HistoryManager.getHistory());
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Keyboard Shortcuts Modal */}
        {showShortcuts && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowShortcuts(false)}>
            <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 max-w-md w-full border ${theme.cardBorder}`} onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold"><Keyboard size={24} className="inline mr-2" />Keyboard Shortcuts</h3>
                <button onClick={() => setShowShortcuts(false)} className="p-1 hover:bg-white/20 rounded">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-sm">Focus search</span>
                  <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Ctrl+K</kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-sm">Toggle encode/decode</span>
                  <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Ctrl+Shift+E</kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-sm">Toggle chain mode</span>
                  <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Ctrl+Shift+C</kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-sm">Toggle history</span>
                  <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Ctrl+Shift+H</kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-sm">Cycle theme</span>
                  <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Ctrl+Shift+T</kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-sm">Close panels</span>
                  <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Esc</kbd>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Modal */}
        {showAnalysis && selectedAnalysis && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAnalysis(false)}>
            <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 max-w-lg w-full border ${theme.cardBorder}`} onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold"><TrendingUp size={24} className="inline mr-2" />Encoding Analysis</h3>
                <button onClick={() => setShowAnalysis(false)} className="p-1 hover:bg-white/20 rounded">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Strength Score</span>
                    <span className="font-bold text-${selectedAnalysis.color}-400">{selectedAnalysis.score}/100</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className={`bg-${selectedAnalysis.color}-500 h-3 rounded-full transition-all`}
                      style={{ width: `${selectedAnalysis.score}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-${selectedAnalysis.color}-400 font-semibold">
                    {selectedAnalysis.level}
                  </div>
                  <p className={`text-sm ${theme.textSecondary} mt-1`}>
                    {selectedAnalysis.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Contributing Factors:</h4>
                  <div className="space-y-2">
                    {selectedAnalysis.factors.map((factor, i) => (
                      <div key={i} className="bg-white/10 rounded p-2">
                        <div className="flex justify-between text-sm">
                          <span>{factor.name}</span>
                          <span className="text-${theme.accent}">+{factor.impact}</span>
                        </div>
                        <div className="text-xs text-white/60 mt-1">{factor.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="mb-4 w-full">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base md:text-xl font-bold">
              ✨ Encodings
            </h2>
            <div className={`text-xs ${theme.textSecondary}`}>
              {filteredEncoders.length} / {encoderConfig.length}
            </div>
          </div>
        </div>

        {/* Encoders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {filteredEncoders.map((encoder) => {
            const isDecodeMode = mode === 'decode';
            const canDecode = encoder.reversible;
            const caesarShift = encoderParams.caesar || 13;

            // Get memoized result instead of computing on every render
            const result = encoderResults[encoder.id] || '';

            const displayText = encoder.special && !isDecodeMode
              ? `[${result.length} invisible characters]`
              : result;

            const isDisabled = isDecodeMode && !canDecode;
            const isFavorite = favorites.has(encoder.id);
            const isInChain = chainSequence.includes(encoder.id);
            const isInComparison = comparisonEncoders.includes(encoder.id);
            const isInShuffle = shuffleEncoders.includes(encoder.id);
            const analysis = !isDisabled && result ? analyzeEncoding(encoder, result) : null;

            const categoryEmoji = categories[encoder.category]?.emoji || '📦';

            return (
              <div
                key={encoder.id}
                className={`backdrop-blur-xl bg-white/5 rounded-2xl p-4 md:p-5 border transition-all w-full shadow-2xl hover:shadow-purple-500/10 hover:bg-white/10 ${
                  isDisabled
                    ? 'border-white/10 opacity-50'
                    : isFavorite
                    ? 'border-yellow-400/40 shadow-lg shadow-yellow-500/20 bg-yellow-500/5'
                    : isInChain
                    ? 'border-green-400/40 shadow-lg shadow-green-500/20 bg-green-500/5'
                    : isInComparison
                    ? 'border-blue-400/40 shadow-lg shadow-blue-500/20 bg-blue-500/5'
                    : 'border-white/20 hover:border-purple-400/30'
                }`}
              >
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <span className="text-xl md:text-2xl flex-shrink-0">{encoder.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm md:text-lg font-bold">{encoder.name}</h3>
                        <span className="text-xs opacity-70">{categoryEmoji}</span>
                        {encoder.reversible && (
                          <span className="text-xs bg-green-500/30 text-green-300 px-2 py-0.5 rounded-full border border-green-400/50">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className={`text-xs ${theme.textSecondary} mt-1`}>{encoder.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 flex-shrink-0 flex-wrap">
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

                    {showChainMode && !isDisabled && (
                      <button
                        onClick={() => isInChain ? removeFromChain(encoder.id) : addToChain(encoder.id)}
                        className={`p-1.5 rounded-lg transition-all text-sm ${
                          isInChain
                            ? 'bg-green-500/30 text-green-300'
                            : 'hover:bg-white/20 text-white/50'
                        }`}
                        title={isInChain ? "Remove from chain" : "Add to chain"}
                      >
                        🔗
                      </button>
                    )}

                    {showShuffleMode && !isDisabled && encoder.id !== 'shuffle' && (
                      <button
                        onClick={() => toggleShuffleEncoder(encoder.id)}
                        className={`p-1.5 rounded-lg transition-all text-sm ${
                          isInShuffle
                            ? 'bg-purple-500/30 text-purple-300'
                            : 'hover:bg-white/20 text-white/50'
                        }`}
                        title={isInShuffle ? "Remove from shuffle" : "Add to shuffle"}
                      >
                        🔀
                      </button>
                    )}

                    {showComparison && !isDisabled && (
                      <button
                        onClick={() => toggleComparison(encoder.id)}
                        disabled={!isInComparison && comparisonEncoders.length >= 4}
                        className={`p-1.5 rounded-lg transition-all ${
                          isInComparison
                            ? 'bg-blue-500/30 text-blue-300'
                            : 'hover:bg-white/20 text-white/50 disabled:opacity-30'
                        }`}
                        title={isInComparison ? "Remove from comparison" : "Add to comparison (max 4)"}
                      >
                        <Eye size={16} />
                      </button>
                    )}

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
                      <>
                        <button
                          onClick={() => handleShare(encoder.id, encoder.name, result)}
                          className="p-1.5 hover:bg-white/20 rounded-lg transition-all"
                          title="Share this encoding"
                        >
                          {copiedId === `share-${encoder.id}` ? (
                            <Check size={16} className="text-green-400" />
                          ) : (
                            <Share2 size={16} />
                          )}
                        </button>

                        <button
                          onClick={() => copyToClipboard(result, encoder.id, encoder.name, encoder.id)}
                          className="p-1.5 hover:bg-white/20 rounded-lg transition-all"
                          title="Copy to clipboard"
                        >
                          {copiedId === encoder.id ? (
                            <Check size={16} className="text-green-400" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>

                        {analysis && (
                          <button
                            onClick={() => {
                              setSelectedAnalysis(analysis);
                              setShowAnalysis(true);
                            }}
                            className="p-1.5 hover:bg-white/20 rounded-lg transition-all"
                            title="View encoding analysis"
                          >
                            <TrendingUp size={16} />
                          </button>
                        )}

                        {/* NEW: Visual Flow Button */}
                        <button
                          onClick={() => {
                            setVisualFlowEncoder(encoder);
                            setShowVisualFlow(true);
                          }}
                          className="p-1.5 hover:bg-white/20 rounded-lg transition-all"
                          title="Watch character-by-character transformation"
                        >
                          <Film size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className={`
                  bg-black/30 rounded-lg p-2 md:p-3 font-mono text-xs break-all min-h-[50px] flex items-center w-full overflow-x-auto
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

                {/* Caesar Cipher Controls */}
                {encoder.id === 'caesar' && (
                  <div className="mt-3 p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Shift: {caesarShift}
                      </label>
                      <span className="text-xs text-white/60">ROT-{caesarShift}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      value={caesarShift}
                      onChange={(e) => updateEncoderParam('caesar', 'shift', parseInt(e.target.value))}
                      className="w-full h-2"
                    />
                    <p className="text-xs text-white/50 mt-1">
                      {caesarShift === 13 ? 'ROT13 (classic)' : `Shift ${caesarShift} positions`}
                    </p>
                  </div>
                )}

                {encoder.special && result && !isDecodeMode && (
                  <div className="mt-2 text-xs text-yellow-300 flex items-center gap-1">
                    👻 Hidden characters - try pasting!
                  </div>
                )}

                {result && !isDisabled && (
                  <div className={`mt-2 text-xs ${theme.textSecondary} flex justify-between items-center`}>
                    <span>{result.length} chars • {new Blob([result]).size} bytes</span>
                    {analysis && (
                      <span className={`text-${analysis.color}-400 font-semibold`}>
                        <Zap size={12} className="inline" /> {analysis.score}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredEncoders.length === 0 && (
          <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-12 text-center border ${theme.cardBorder}`}>
            <p className={`text-xl ${theme.textSecondary}`}>
              No encoders found matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-xs ${theme.textSecondary}`}>
            🔒 All processing happens in your browser • 100% private
          </p>
        </div>

        {/* NEW: Next Evolution Feature Modals */}
        {showCustomBuilder && (
          <CustomEncoderBuilder
            theme={theme}
            onClose={() => setShowCustomBuilder(false)}
            onSave={() => {
              // Reload custom encoders - handled by useEffect watching showCustomBuilder
            }}
          />
        )}

        {showVisualFlow && visualFlowEncoder && (
          <VisualEncodingFlowViewer
            theme={theme}
            inputText={inputText}
            encoder={visualFlowEncoder}
            caesarShift={encoderParams.caesar || 13}
            onClose={() => {
              setShowVisualFlow(false);
              setVisualFlowEncoder(null);
            }}
          />
        )}

        {showPresets && (
          <PresetsBrowser
            theme={theme}
            onClose={() => setShowPresets(false)}
            onLoadPreset={(preset) => {
              // Load the preset's encoder chain
              setChainSequence(preset.encoderIds);
              setEncoderParams({ ...encoderParams, ...preset.params });
              setShowChainMode(true);
              setShowPresets(false);
            }}
          />
        )}

        {showDailyPuzzle && (
          <DailyPuzzle
            theme={theme}
            onClose={() => setShowDailyPuzzle(false)}
          />
        )}
      </div>
    </div>
  );
};

export default EnhancedTextEncoder;
