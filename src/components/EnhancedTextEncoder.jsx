import React, { useState, useEffect, useRef } from 'react';
import {
  Copy, Check, Shuffle, Sparkles, Search, X, History,
  Share2, Palette, Keyboard, Info, ChevronDown, ChevronUp,
  Trash2, TrendingUp, Zap, Link2, Eye, Filter
} from 'lucide-react';
import { encoderConfig, categories } from '../utils/encoderConfig.js';
import { themes, getTheme, saveTheme, loadTheme } from '../utils/themeSystem.js';
import { HistoryManager } from '../utils/historyManager.js';
import { ChainEncoder } from '../utils/chainEncoder.js';
import { EncodingAnalyzer } from '../utils/encodingAnalyzer.js';
import { ShareManager } from '../utils/shareManager.js';
import { KeyboardShortcuts } from '../utils/keyboardShortcuts.js';

const EnhancedTextEncoder = () => {
  // Core state
  const [inputText, setInputText] = useState('Hello World!');
  const [mode, setMode] = useState('encode');
  const [caesarShift, setCaesarShift] = useState(13);
  const [copiedId, setCopiedId] = useState(null);

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
  const [chainSequence, setChainSequence] = useState([]);
  const [comparisonEncoders, setComparisonEncoders] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const searchInputRef = useRef(null);
  const keyboardShortcuts = useRef(null);
  const theme = getTheme(currentTheme);

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
  }, []);

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

  // Save favorites
  useEffect(() => {
    localStorage.setItem('encoder-favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const cycleTheme = () => {
    const themeIds = Object.keys(themes);
    const currentIndex = themeIds.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeIds.length;
    const nextTheme = themeIds[nextIndex];
    setCurrentTheme(nextTheme);
    saveTheme(nextTheme);
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

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
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

  const handleShare = async (encoderId) => {
    const url = ShareManager.createShareableLink(inputText, encoderId, mode);
    const shared = await ShareManager.shareNative(url);
    if (!shared) {
      await ShareManager.copyShareLink(url);
      setCopiedId(`share-${encoderId}`);
      setTimeout(() => setCopiedId(null), 2000);
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

  const toggleComparison = (encoderId) => {
    if (comparisonEncoders.includes(encoderId)) {
      setComparisonEncoders(comparisonEncoders.filter(id => id !== encoderId));
    } else if (comparisonEncoders.length < 4) {
      setComparisonEncoders([...comparisonEncoders, encoderId]);
    }
  };

  // Filter encoders
  const filteredEncoders = encoderConfig.filter(encoder => {
    const matchesSearch = searchQuery === '' ||
      encoder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      encoder.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      encoder.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || encoder.category === selectedCategory;
    const matchesFavorites = selectedCategory !== 'favorites' || favorites.has(encoder.id);

    return matchesSearch && matchesCategory && matchesFavorites;
  });

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-pulse">
            ✨ Creative Text Encoder
          </h1>
          <p className={`text-lg md:text-xl ${theme.textSecondary} mb-4`}>
            Transform your messages into 35+ creative encodings
          </p>

          {/* Theme Switcher */}
          <div className="flex justify-center gap-2 mb-4 flex-wrap">
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

          {/* Stats */}
          {inputText && (
            <div className={`flex justify-center gap-4 md:gap-6 text-xs md:text-sm ${theme.textSecondary} flex-wrap`}>
              <span>📏 {inputText.length} chars</span>
              <span>📊 {new Blob([inputText]).size} bytes</span>
              <span>🔤 {inputText.split(/\s+/).filter(w => w).length} words</span>
              <span>⭐ {favorites.size} favorites</span>
            </div>
          )}
        </div>

        {/* Main Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {/* Mode Toggle */}
          <div className={`${theme.cardBg} backdrop-blur-lg rounded-full p-1 border ${theme.cardBorder}`}>
            <button
              onClick={() => setMode('encode')}
              className={`px-4 md:px-8 py-2 md:py-3 rounded-full transition-all font-semibold text-sm md:text-base ${
                mode === 'encode'
                  ? `bg-gradient-to-r ${theme.buttonPrimary} text-white`
                  : `${theme.textSecondary} hover:${theme.textPrimary}`
              }`}
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
            title="Chain multiple encodings (Ctrl+Shift+C)"
          >
            🔗 Chain {chainSequence.length > 0 && `(${chainSequence.length})`}
          </button>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`px-4 md:px-6 py-2 md:py-3 ${theme.cardBg} hover:bg-white/20 backdrop-blur-lg rounded-full border ${theme.cardBorder} transition-all font-semibold text-sm md:text-base`}
            title="View encoding history (Ctrl+Shift+H)"
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
          >
            <Eye size={18} className="inline mr-2" />
            Compare {comparisonEncoders.length > 0 && `(${comparisonEncoders.length})`}
          </button>

          <button
            onClick={() => setShowShortcuts(true)}
            className={`px-4 md:px-6 py-2 md:py-3 ${theme.cardBg} hover:bg-white/20 backdrop-blur-lg rounded-full border ${theme.cardBorder} transition-all font-semibold text-sm md:text-base`}
            title="Keyboard shortcuts (Ctrl+Shift+?)"
          >
            <Keyboard size={18} />
          </button>
        </div>

        {/* Input Section */}
        <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-4 md:p-8 mb-6 border ${theme.cardBorder}`}>
          <label className="block text-base md:text-lg font-semibold mb-3 flex items-center gap-2">
            <Sparkles size={20} />
            {mode === 'encode' ? 'Enter your message:' : 'Enter encoded text:'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={`w-full px-4 md:px-6 py-3 md:py-4 bg-white/20 border-2 border-white/30 rounded-xl ${theme.textPrimary} placeholder-white/50 text-base md:text-lg focus:outline-none focus:border-${theme.accent} transition-all min-h-[100px] md:min-h-[120px] resize-y`}
            placeholder={mode === 'encode' ? 'Type your secret message here...' : 'Paste encoded text here...'}
          />

          {/* Caesar Controls */}
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
          </div>
        </div>

        {/* Search and Filter */}
        <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-4 mb-6 border ${theme.cardBorder}`}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search encoders... (Ctrl+K)"
                className={`w-full pl-10 pr-10 py-3 bg-white/20 border-2 border-white/30 rounded-xl ${theme.textPrimary} placeholder-white/50 focus:outline-none focus:border-${theme.accent} transition-all`}
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
              className={`px-4 py-3 bg-white/20 border-2 border-white/30 rounded-xl ${theme.textPrimary} focus:outline-none focus:border-${theme.accent}`}
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

                const result = mode === 'encode'
                  ? (encoder.id === 'caesar' ? encoder.encode(inputText, caesarShift) : encoder.encode(inputText))
                  : (encoder.reversible ? (encoder.id === 'caesar' ? encoder.decode(inputText, caesarShift) : encoder.decode(inputText)) : '[Not reversible]');

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
        <div className="mb-4">
          <div className={`text-sm ${theme.textSecondary} mb-2`}>
            Showing {filteredEncoders.length} of {encoderConfig.length} encoders
          </div>
        </div>

        {/* Encoders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEncoders.map((encoder) => {
            const isDecodeMode = mode === 'decode';
            const canDecode = encoder.reversible;

            let result = '';
            if (inputText) {
              if (isDecodeMode) {
                if (canDecode) {
                  result = encoder.id === 'caesar'
                    ? encoder.decode(inputText, caesarShift)
                    : encoder.decode(inputText);
                } else {
                  result = '[Not reversible]';
                }
              } else {
                result = encoder.id === 'caesar'
                  ? encoder.encode(inputText, caesarShift)
                  : encoder.encode(inputText);

                // Save to history for successful encodes
                if (result && !result.includes('[')) {
                  // Debounce history saving
                  const timeout = setTimeout(() => saveToHistory(encoder.id, encoder.name, result), 1000);
                  return () => clearTimeout(timeout);
                }
              }
            }

            const displayText = encoder.special && !isDecodeMode
              ? `[${result.length} invisible characters]`
              : result;

            const isDisabled = isDecodeMode && !canDecode;
            const isFavorite = favorites.has(encoder.id);
            const isInChain = chainSequence.includes(encoder.id);
            const isInComparison = comparisonEncoders.includes(encoder.id);
            const analysis = !isDisabled && result ? analyzeEncoding(encoder, result) : null;

            const categoryEmoji = categories[encoder.category]?.emoji || '📦';

            return (
              <div
                key={encoder.id}
                className={`${theme.cardBg} backdrop-blur-lg rounded-xl p-5 border transition-all ${
                  isDisabled
                    ? 'border-white/10 opacity-50'
                    : isFavorite
                    ? 'border-yellow-400/50 shadow-lg shadow-yellow-500/20'
                    : isInChain
                    ? 'border-green-400/50 shadow-lg shadow-green-500/20'
                    : isInComparison
                    ? 'border-blue-400/50 shadow-lg shadow-blue-500/20'
                    : `${theme.cardBorder} ${theme.cardHover}`
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-2 flex-1">
                    <span className="text-2xl">{encoder.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base md:text-lg font-bold">{encoder.name}</h3>
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
                          onClick={() => handleShare(encoder.id)}
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
                      </>
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

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className={`text-sm ${theme.textSecondary}`}>
            <p>✨ All processing happens in your browser - your data never leaves your device</p>
            <p className="mt-2">Made with ❤️ using React, Vite, and Tailwind CSS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTextEncoder;
