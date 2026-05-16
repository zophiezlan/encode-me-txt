import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import {
  Copy,
  Check,
  Search,
  X,
  History,
  Keyboard,
  Trash2,
  TrendingUp,
  Zap,
  Eye,
  HelpCircle,
  BookOpen,
  Wand2,
  Package,
  Gamepad2,
  Filter,
  SortAsc,
  Tag,
  Settings,
  RotateCcw,
  Loader2,
} from "lucide-react";
import {
  encoderConfig,
  categories,
  searchEncoders,
  getAllTags,
  getEncoderStats,
  filterPresets,
  getFilterPreset,
} from "../utils/encoderConfig.js";
import {
  themes,
  getTheme,
  saveTheme,
  loadTheme,
} from "../utils/themeSystem.js";
import { HistoryManager } from "../utils/historyManager.js";
import { ChainEncoder } from "../utils/chainEncoder.js";
import { EncodingAnalyzer } from "../utils/encodingAnalyzer.js";
import { ShareManager } from "../utils/shareManager.js";
import { KeyboardShortcuts } from "../utils/keyboardShortcuts.js";
import { CustomEncoderManager } from "../utils/customEncoderManager.js";
import { useEncoderResults } from "../hooks/useEncoderResults.js";
import EncoderCard from "./EncoderCard.jsx";

// Lazy load modal components for better initial load performance
const CustomEncoderBuilder = lazy(() => import("./CustomEncoderBuilder.jsx"));
const VisualEncodingFlowViewer = lazy(
  () => import("./VisualEncodingFlowViewer.jsx"),
);
const PresetsBrowser = lazy(() => import("./PresetsBrowser.jsx"));
const DailyPuzzle = lazy(() => import("./DailyPuzzle.jsx"));
const ParticlesBackground = lazy(() => import("./ParticlesBackground.jsx"));

// Loading spinner component for lazy-loaded modals
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
    <span className="ml-2 text-white/70">Loading...</span>
  </div>
);

// Configuration constants
const MAX_DISPLAYED_TAGS = 50;
const DEFAULT_SHUFFLE_ENCODERS = [
  "binary-pro",
  "morse-pro",
  "caesar",
  "emoji",
  "braille",
];

const EnhancedTextEncoder = () => {
  // Core state
  const [inputText, setInputText] = useState("Hello World!");
  const [mode, setMode] = useState("encode");
  const [copiedId, setCopiedId] = useState(null);
  const [encoderParams, setEncoderParams] = useState(() => {
    const saved = localStorage.getItem("encoder-params");
    return saved
      ? JSON.parse(saved)
      : {
          caesar: 13,
          vigenere: "SECRET",
          "rail-fence": 3,
          affine: { a: 5, b: 8 },
          scytale: 4,
          columnar: "SECRET",
          autokey: "KEY",
          beaufort: "SECRET",
          playfair: "KEYWORD",
          zalgo: 5,
          redacted: 40,
          // New parameterized encoders (v3.1)
          "leetspeak-pro": 1, // intensity 1-3
          "uwu-pro": 5, // intensity 1-10
          "spongebob-pro": 0, // randomness 0-100
          "emojipasta-pro": 2, // density 1-5
          "binary-pro": 8, // group size (0, 4, 8)
          "morse-pro": 1, // style 1-4
          "rot-n": 13, // rotation 1-25
          rot5: 5, // rotation 1-9
          "tap-code-pro": 1, // style 1-4
          "keyword-cipher": "KEYWORD",
          "running-key": "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG",
          gronsfeld: "31415",
          trithemius: 0, // start shift 0-25
          porta: "SECRET",
          nihilist: "ZEBRA",
          "polybius-pro": 5, // grid size 5 or 6
          adfgvx: "GERMAN",
          "book-cipher": "The quick brown fox jumps over the lazy dog",
          "double-transposition": { key1: "FIRST", key2: "SECOND" },
          "four-square": { key1: "EXAMPLE", key2: "KEYWORD" },
          "straddling-checkerboard": "ESTONAI",
          homophonic: 3, // complexity 2-5
        };
  });

  // UI state
  const [currentTheme, setCurrentTheme] = useState(loadTheme());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterReversible, setFilterReversible] = useState("all"); // 'all', 'reversible', 'non-reversible'
  const [selectedTags, setSelectedTags] = useState([]);
  const [excludedTags, setExcludedTags] = useState([]);
  const [filterHasSettings, setFilterHasSettings] = useState("all"); // 'all', 'with-settings', 'without-settings'
  const [sortBy, setSortBy] = useState("default"); // 'default', 'name', 'category'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc', 'desc'
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilterPreset, setActiveFilterPreset] = useState("all");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("encoder-favorites");
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
    const saved = localStorage.getItem("shuffle-encoders");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate saved encoders exist in config
      const validIds = new Set(encoderConfig.map((e) => e.id));
      const validSaved = parsed.filter((id) => validIds.has(id));
      return validSaved.length > 0 ? validSaved : DEFAULT_SHUFFLE_ENCODERS;
    }
    return DEFAULT_SHUFFLE_ENCODERS;
  });
  const [history, setHistory] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  // Onboarding & Help states
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem("encoder-onboarded");
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
  const shuffleEncoderRef = useRef(null);
  const theme = getTheme(currentTheme);

  // Memoized theme cycler for keyboard shortcuts
  const cycleTheme = useCallback(() => {
    const themeIds = Object.keys(themes);
    setCurrentTheme((prev) => {
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

    ks.register(
      "ctrl+k",
      () => searchInputRef.current?.focus(),
      "Focus search",
    );
    ks.register(
      "ctrl+shift+e",
      () => setMode((m) => (m === "encode" ? "decode" : "encode")),
      "Toggle mode",
    );
    ks.register(
      "ctrl+shift+h",
      () => setShowHistory((h) => !h),
      "Toggle history",
    );
    ks.register(
      "ctrl+shift+c",
      () => setShowChainMode((c) => !c),
      "Toggle chain mode",
    );
    ks.register("ctrl+shift+t", cycleTheme, "Cycle theme");
    ks.register("ctrl+shift+?", () => setShowShortcuts(true), "Show shortcuts");
    ks.register(
      "escape",
      () => {
        setShowHistory(false);
        setShowChainMode(false);
        setShowShortcuts(false);
        setShowAnalysis(false);
      },
      "Close panels",
    );

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
    const customConfigs = customs.map((ce) =>
      CustomEncoderManager.toEncoderConfig(ce),
    );

    // Merge with built-in encoders
    setAllEncoders([...encoderConfig, ...customConfigs]);
  }, [showCustomBuilder]); // Reload when custom builder is closed

  // Save favorites
  useEffect(() => {
    localStorage.setItem("encoder-favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  // Save encoder params
  useEffect(() => {
    localStorage.setItem("encoder-params", JSON.stringify(encoderParams));
  }, [encoderParams]);

  // Save shuffle encoders
  useEffect(() => {
    localStorage.setItem("shuffle-encoders", JSON.stringify(shuffleEncoders));
  }, [shuffleEncoders]);

  // Scroll to shuffle encoder card when shuffle mode is enabled
  useEffect(() => {
    if (showShuffleMode && shuffleEncoderRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        shuffleEncoderRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [showShuffleMode]);

  const updateEncoderParam = (encoderId, _paramName, value) => {
    setEncoderParams((prev) => ({
      ...prev,
      [encoderId]: value,
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

  const copyToClipboard = async (
    text,
    id,
    encoderName = null,
    encoderId = null,
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);

      // Save to history when user copies (not for special IDs like 'chain-final')
      if (encoderName && encoderId && text && !text.includes("[")) {
        saveToHistory(encoderId, encoderName, text);
      }
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const saveToHistory = (encoderId, encoderName, result) => {
    if (result && !result.includes("[") && result.length > 0) {
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
    if (result && !result.includes("[")) {
      saveToHistory(encoderId, encoderName, result);
    }
  };

  const analyzeEncoding = (encoder, result) => {
    if (!result || result.includes("[")) return null;
    return EncodingAnalyzer.analyzeStrength(inputText, result, encoder);
  };

  const executeChainEncoding = () => {
    if (chainSequence.length === 0) return null;

    const encoders = chainSequence
      .map((id) => encoderConfig.find((e) => e.id === id))
      .filter(Boolean);

    const caesarShift = encoderParams.caesar || 13;

    if (mode === "encode") {
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
    setChainSequence(chainSequence.filter((id) => id !== encoderId));
  };

  const toggleShuffleEncoder = (encoderId) => {
    if (shuffleEncoders.includes(encoderId)) {
      // Don't allow removing if it's the last one
      if (shuffleEncoders.length > 1) {
        setShuffleEncoders(shuffleEncoders.filter((id) => id !== encoderId));
      }
    } else {
      setShuffleEncoders([...shuffleEncoders, encoderId]);
    }
  };

  const toggleComparison = (encoderId) => {
    if (comparisonEncoders.includes(encoderId)) {
      setComparisonEncoders(
        comparisonEncoders.filter((id) => id !== encoderId),
      );
    } else if (comparisonEncoders.length < 4) {
      setComparisonEncoders([...comparisonEncoders, encoderId]);
    }
  };

  // Onboarding functions
  const completeOnboarding = () => {
    localStorage.setItem("encoder-onboarded", "true");
    setShowWelcome(false);
  };

  const startQuickTour = () => {
    setShowWelcome(false);
    localStorage.setItem("encoder-onboarded", "true");
    setShowGuide(true);
  };

  const tryExample = (exampleText) => {
    setInputText(exampleText);
    completeOnboarding();
  };

  // Memoize encoder results to avoid re-encoding on every render
  const encoderResults = useEncoderResults({
    inputText,
    mode,
    encoderParams,
    shuffleEncoders,
    allEncoders,
  });

  // Get all unique tags from encoders using utility
  const allTags = useMemo(() => {
    return getAllTags(allEncoders);
  }, [allEncoders]);

  // Get encoder statistics
  const encoderStats = useMemo(() => {
    return getEncoderStats(allEncoders);
  }, [allEncoders]);

  // Filter encoders using advanced search (memoized)
  const filteredEncoders = useMemo(() => {
    // Handle favorites separately since it's a UI concern
    if (selectedCategory === "favorites") {
      let filtered = allEncoders.filter((encoder) => favorites.has(encoder.id));
      if (sortBy !== "default") {
        const sortOrderMultiplier = sortOrder === "desc" ? -1 : 1;
        filtered = [...filtered].sort((a, b) => {
          if (sortBy === "name")
            return sortOrderMultiplier * a.name.localeCompare(b.name);
          if (sortBy === "category")
            return (
              sortOrderMultiplier *
              (a.category.localeCompare(b.category) ||
                a.name.localeCompare(b.name))
            );
          return 0;
        });
      }
      return filtered;
    }

    // Use advanced search for all other filtering
    const searchOptions = {
      query: searchQuery,
      categories: selectedCategory === "all" ? [] : [selectedCategory],
      tags: selectedTags,
      excludeTags: excludedTags,
      reversible:
        filterReversible === "all" ? null : filterReversible === "reversible",
      hasSettings:
        filterHasSettings === "all"
          ? null
          : filterHasSettings === "with-settings",
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    return searchEncoders(allEncoders, searchOptions);
  }, [
    searchQuery,
    selectedCategory,
    favorites,
    allEncoders,
    filterReversible,
    filterHasSettings,
    selectedTags,
    excludedTags,
    sortBy,
    sortOrder,
  ]);

  // Apply filter preset
  const applyFilterPreset = useCallback((presetId) => {
    const preset = getFilterPreset(presetId);
    setSearchQuery(preset.query || "");
    setSelectedCategory(
      preset.categories?.length > 0 ? preset.categories[0] : "all",
    );
    setSelectedTags(preset.tags || []);
    setExcludedTags(preset.excludeTags || []);
    setFilterReversible(
      preset.reversible === true
        ? "reversible"
        : preset.reversible === false
          ? "non-reversible"
          : "all",
    );
    setFilterHasSettings(
      preset.hasSettings === true
        ? "with-settings"
        : preset.hasSettings === false
          ? "without-settings"
          : "all",
    );
    setSortBy(preset.sortBy || "default");
    setSortOrder(preset.sortOrder || "asc");
    setActiveFilterPreset(presetId);
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTags([]);
    setExcludedTags([]);
    setFilterReversible("all");
    setFilterHasSettings("all");
    setSortBy("default");
    setSortOrder("asc");
    setActiveFilterPreset("all");
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.gradient} ${theme.textPrimary} p-4 md:p-8 transition-all duration-500`}
    >
      <Suspense fallback={null}>
        <ParticlesBackground />
      </Suspense>
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Welcome Modal - First Time Users */}
        {showWelcome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-md animate-fadeIn">
            <div
              className={`${theme.cardBg} backdrop-blur-lg rounded-3xl p-6 md:p-8 max-w-2xl w-full border-2 ${theme.cardBorder} shadow-2xl my-4 max-h-[90vh] overflow-y-auto`}
            >
              <div className="mb-6 text-center">
                <div className="mb-3 text-5xl">✨</div>
                <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                  Creative Text Encoder
                </h2>
                <p className={`text-sm ${theme.textSecondary}`}>
                  Transform text into 500+ encoding formats
                </p>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/10">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h3 className="text-sm font-semibold">Instant Encoding</h3>
                    <p className="text-xs text-white/70">
                      See 500+ formats instantly - Binary, Morse, DNA, Emoji &
                      more
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/10">
                  <div className="text-2xl">🔒</div>
                  <div>
                    <h3 className="text-sm font-semibold">100% Private</h3>
                    <p className="text-xs text-white/70">
                      All encoding happens in your browser - no servers, no
                      tracking
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/10">
                  <div className="text-2xl">✓</div>
                  <div>
                    <h3 className="text-sm font-semibold">Reversible</h3>
                    <p className="text-xs text-white/70">
                      50+ encodings can decode back to original (look for ✓
                      mark)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 mb-5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                <h3 className="flex items-center gap-2 mb-2 text-sm font-semibold">
                  💡 Try an example:
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => tryExample("Hello World!")}
                    className="px-3 py-2 text-xs transition-all rounded-lg bg-white/10 hover:bg-white/20"
                  >
                    Hello World!
                  </button>
                  <button
                    onClick={() => tryExample("Meet me at midnight")}
                    className="px-3 py-2 text-xs transition-all rounded-lg bg-white/10 hover:bg-white/20"
                  >
                    Secret message
                  </button>
                  <button
                    onClick={() => tryExample("Happy Birthday! 🎉")}
                    className="px-3 py-2 text-xs transition-all rounded-lg bg-white/10 hover:bg-white/20"
                  >
                    Happy Birthday! 🎉
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={startQuickTour}
                  className="flex-1 py-3 text-sm font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                >
                  Quick Tour
                </button>
                <button
                  onClick={completeOnboarding}
                  className="flex-1 py-3 text-sm font-semibold transition-all rounded-lg bg-white/10 hover:bg-white/20"
                >
                  Start Exploring
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Guide Modal */}
        {showGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-md">
            <div
              className={`${theme.cardBg} backdrop-blur-lg rounded-3xl p-6 md:p-8 max-w-2xl w-full border-2 ${theme.cardBorder} my-4 max-h-[90vh] overflow-y-auto`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  <BookOpen size={28} />
                  How to Use This App
                </h2>
                <button
                  onClick={() => setShowGuide(false)}
                  className="p-2 rounded-lg hover:bg-white/20"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 font-bold text-white bg-purple-500 rounded-full">
                      1
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold">
                        Type Your Message
                      </h3>
                      <p className="text-white/70">
                        Enter any text in the input box below. As you type,
                        you'll see it instantly encoded in 500+ different
                        formats!
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 font-bold text-white bg-purple-500 rounded-full">
                      2
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold">
                        Explore Different Encodings
                      </h3>
                      <p className="mb-2 text-white/70">
                        Scroll through the cards below to see your text in
                        different formats:
                      </p>
                      <ul className="ml-4 space-y-1 text-sm text-white/70">
                        <li>
                          • <strong>Green checkmark (✓)</strong> = Can be
                          decoded back to original
                        </li>
                        <li>
                          • <strong>Star icon (⭐)</strong> = Click to save as
                          favorite
                        </li>
                        <li>
                          • <strong>Copy button</strong> = Copy the encoded text
                        </li>
                        <li>
                          • <strong>Share button</strong> = Share with others
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 font-bold text-white bg-purple-500 rounded-full">
                      3
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold">
                        Switch to Decode Mode
                      </h3>
                      <p className="text-white/70">
                        Click the "🔓 Decode" button at the top to reverse any
                        encoding. Paste encoded text and see the original
                        message (works for 17 encoders with ✓ mark).
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 font-bold text-white bg-purple-500 rounded-full">
                      4
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold">
                        Advanced Features (Optional)
                      </h3>
                      <p className="mb-2 text-white/70">
                        Power user features available:
                      </p>
                      <ul className="ml-4 space-y-1 text-sm text-white/70">
                        <li>
                          • <strong>🔗 Chain</strong> = Apply multiple encodings
                          in sequence
                        </li>
                        <li>
                          • <strong>👁️ Compare</strong> = View up to 4 encodings
                          side-by-side
                        </li>
                        <li>
                          • <strong>History</strong> = Track your past encodings
                        </li>
                        <li>
                          • <strong>Search</strong> = Find specific encoders
                          quickly
                        </li>
                        <li>
                          • <strong>Themes</strong> = Choose from 6 beautiful
                          color themes
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl">
                  <h3 className="flex items-center gap-2 mb-2 font-bold">
                    <Keyboard size={18} />
                    Keyboard Shortcuts
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-white/70">
                    <div>
                      <kbd className="px-2 py-1 text-xs rounded bg-white/20">
                        Ctrl+K
                      </kbd>{" "}
                      Focus search
                    </div>
                    <div>
                      <kbd className="px-2 py-1 text-xs rounded bg-white/20">
                        Ctrl+Shift+E
                      </kbd>{" "}
                      Toggle mode
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowGuide(false)}
                className="w-full py-4 mt-6 font-bold text-white transition-all bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl"
              >
                Got It - Let's Start!
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex flex-col items-center justify-between gap-3 mb-4 md:flex-row md:items-start">
            <div className="flex-1 hidden md:block"></div>
            <h1 className="flex-1 text-3xl font-bold text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-pulse">
              ✨ Creative Text Encoder
            </h1>
            <div className="flex justify-center flex-1 gap-2 md:justify-end">
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
            Transform your messages into 500+ creative encodings - instantly see
            Binary, Morse Code, DNA, Emoji, and more!
          </p>

          {/* Theme Switcher */}
          <div className="flex justify-center gap-1.5 md:gap-2 mb-4 flex-wrap px-2">
            {Object.values(themes).map((t) => (
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
            <div
              className={`flex justify-center gap-3 text-xs ${theme.textSecondary}`}
            >
              <span>{inputText.length} chars</span>
              <span>•</span>
              <span>
                {inputText.split(/\s+/).filter((w) => w).length} words
              </span>
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
          <div className="p-3 mb-4 border shadow-lg backdrop-blur-xl bg-white/5 border-white/20 rounded-xl">
            <p className="text-xs text-center md:text-sm">
              {mode === "encode"
                ? "✨ Type text to see 500+ instant encodings"
                : "🔓 Paste encoded text to decode (works with ✓ marked encoders)"}
            </p>
          </div>
        )}

        {/* Main Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 md:gap-3">
          {/* Mode Toggle */}
          <div
            className={`${theme.cardBg} backdrop-blur-lg rounded-full p-1 border ${theme.cardBorder}`}
          >
            <button
              onClick={() => setMode("encode")}
              className={`px-4 md:px-8 py-2 md:py-3 rounded-full transition-all font-semibold text-sm md:text-base ${
                mode === "encode"
                  ? `bg-gradient-to-r ${theme.buttonPrimary} text-white`
                  : `${theme.textSecondary} hover:${theme.textPrimary}`
              }`}
              title="Convert plain text into encoded formats"
            >
              ✏️ Encode
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`px-4 md:px-8 py-2 md:py-3 rounded-full transition-all font-semibold text-sm md:text-base ${
                mode === "decode"
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
            🔀 Shuffle{" "}
            {shuffleEncoders.length > 0 && `(${shuffleEncoders.length})`}
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
            Compare{" "}
            {comparisonEncoders.length > 0 && `(${comparisonEncoders.length})`}
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
        <div className="p-4 mb-6 border shadow-2xl backdrop-blur-xl bg-white/5 border-white/20 rounded-2xl md:p-6">
          <label className="block mb-3 text-sm font-semibold md:text-base">
            {mode === "encode" ? "📝 Your Message" : "🔍 Encoded Text"}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={`w-full px-4 md:px-6 py-3 md:py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl ${theme.textPrimary} placeholder-white/50 text-base md:text-lg focus:outline-none focus:border-purple-400/60 focus:bg-white/15 transition-all min-h-[100px] md:min-h-[120px] resize-y`}
            placeholder={
              mode === "encode"
                ? 'Type anything here... Try "Hello World!" or "Meet me at midnight"'
                : "Paste encoded text here (e.g., morse code, binary, etc.)"
            }
          />
        </div>

        {/* Search and Filter */}
        <div className="p-3 mb-6 border shadow-2xl backdrop-blur-xl bg-white/5 border-white/20 rounded-2xl md:p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute transform -translate-y-1/2 left-3 top-1/2 text-white/50"
                size={20}
              />
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
                  onClick={() => setSearchQuery("")}
                  className="absolute transform -translate-y-1/2 right-3 top-1/2 text-white/50 hover:text-white"
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

            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-4 py-3 bg-white/10 backdrop-blur-md border-2 rounded-xl flex items-center gap-2 transition-all ${
                showAdvancedFilters ||
                filterReversible !== "all" ||
                filterHasSettings !== "all" ||
                selectedTags.length > 0 ||
                excludedTags.length > 0 ||
                sortBy !== "default"
                  ? "border-purple-400/60 bg-purple-500/20"
                  : "border-white/20 hover:border-purple-400/40"
              }`}
              title="Advanced Filters"
            >
              <Filter size={18} />
              <span className="hidden sm:inline">Filters</span>
              {(filterReversible !== "all" ||
                filterHasSettings !== "all" ||
                selectedTags.length > 0 ||
                excludedTags.length > 0 ||
                sortBy !== "default") && (
                <span className="bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {(filterReversible !== "all" ? 1 : 0) +
                    (filterHasSettings !== "all" ? 1 : 0) +
                    selectedTags.length +
                    excludedTags.length +
                    (sortBy !== "default" ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="pt-4 mt-4 space-y-4 border-t border-white/20">
              {/* Quick Filter Presets */}
              <div>
                <label className="flex items-center block gap-2 mb-2 text-sm font-medium">
                  ⚡ Quick Filters
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyFilterPreset(preset.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeFilterPreset === preset.id
                          ? "bg-purple-500 text-white"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      {preset.emoji} {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* Reversibility Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="flex items-center block gap-2 mb-2 text-sm font-medium">
                    <Zap size={14} /> Reversibility
                  </label>
                  <select
                    value={filterReversible}
                    onChange={(e) => setFilterReversible(e.target.value)}
                    className={`w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg ${theme.textPrimary} focus:outline-none focus:border-purple-400/60`}
                  >
                    <option value="all">
                      All Encoders ({encoderStats.total})
                    </option>
                    <option value="reversible">
                      ✓ Reversible Only ({encoderStats.reversible})
                    </option>
                    <option value="non-reversible">
                      ✗ Non-Reversible Only ({encoderStats.nonReversible})
                    </option>
                  </select>
                </div>

                {/* Settings Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="flex items-center block gap-2 mb-2 text-sm font-medium">
                    <Settings size={14} /> Settings
                  </label>
                  <select
                    value={filterHasSettings}
                    onChange={(e) => setFilterHasSettings(e.target.value)}
                    className={`w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg ${theme.textPrimary} focus:outline-none focus:border-purple-400/60`}
                  >
                    <option value="all">All Encoders</option>
                    <option value="with-settings">
                      ⚙️ With Settings ({encoderStats.withSettings})
                    </option>
                    <option value="without-settings">
                      📦 Without Settings
                    </option>
                  </select>
                </div>

                {/* Sort Options */}
                <div className="flex-1 min-w-[200px]">
                  <label className="flex items-center block gap-2 mb-2 text-sm font-medium">
                    <SortAsc size={14} /> Sort By
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg ${theme.textPrimary} focus:outline-none focus:border-purple-400/60`}
                    >
                      <option value="default">Default Order</option>
                      <option value="name">Alphabetical</option>
                      <option value="category">By Category</option>
                    </select>
                    {sortBy !== "default" && (
                      <button
                        onClick={() =>
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                        }
                        className="px-3 py-2 border rounded-lg bg-white/10 border-white/20 hover:bg-white/20"
                        title={sortOrder === "asc" ? "Ascending" : "Descending"}
                      >
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Tag Filter (Include) */}
              <div>
                <label className="flex items-center block gap-2 mb-2 text-sm font-medium">
                  <Tag size={14} /> Include Tags (must have all)
                  {selectedTags.length > 0 && (
                    <button
                      onClick={() => setSelectedTags([])}
                      className="ml-2 text-xs text-purple-400 hover:text-purple-300"
                    >
                      Clear
                    </button>
                  )}
                </label>
                <div className="flex flex-wrap gap-2 p-2 overflow-y-auto rounded-lg max-h-24 bg-white/5">
                  {allTags.slice(0, MAX_DISPLAYED_TAGS).map((tag) => (
                    <button
                      key={`include-${tag}`}
                      onClick={() => {
                        if (selectedTags.includes(tag)) {
                          setSelectedTags(
                            selectedTags.filter((t) => t !== tag),
                          );
                        } else {
                          setSelectedTags([...selectedTags, tag]);
                          // Remove from excluded if present
                          setExcludedTags(
                            excludedTags.filter((t) => t !== tag),
                          );
                        }
                      }}
                      className={`px-2 py-1 rounded-full text-xs transition-all ${
                        selectedTags.includes(tag)
                          ? "bg-green-500 text-white"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag Filter (Exclude) */}
              <div>
                <label className="flex items-center block gap-2 mb-2 text-sm font-medium">
                  <X size={14} /> Exclude Tags
                  {excludedTags.length > 0 && (
                    <button
                      onClick={() => setExcludedTags([])}
                      className="ml-2 text-xs text-red-400 hover:text-red-300"
                    >
                      Clear
                    </button>
                  )}
                </label>
                <div className="flex flex-wrap gap-2 p-2 overflow-y-auto rounded-lg max-h-24 bg-white/5">
                  {allTags.slice(0, MAX_DISPLAYED_TAGS).map((tag) => (
                    <button
                      key={`exclude-${tag}`}
                      onClick={() => {
                        if (excludedTags.includes(tag)) {
                          setExcludedTags(
                            excludedTags.filter((t) => t !== tag),
                          );
                        } else {
                          setExcludedTags([...excludedTags, tag]);
                          // Remove from included if present
                          setSelectedTags(
                            selectedTags.filter((t) => t !== tag),
                          );
                        }
                      }}
                      className={`px-2 py-1 rounded-full text-xs transition-all ${
                        excludedTags.includes(tag)
                          ? "bg-red-500 text-white"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters Summary & Reset */}
              {(filterReversible !== "all" ||
                filterHasSettings !== "all" ||
                selectedTags.length > 0 ||
                excludedTags.length > 0 ||
                sortBy !== "default") && (
                <div className="flex items-center justify-between p-3 border rounded-lg bg-purple-500/10 border-purple-400/30">
                  <div className="text-sm">
                    <span className="font-medium">Active filters:</span>
                    {filterReversible !== "all" && (
                      <span className="ml-2 px-2 py-0.5 bg-purple-500/30 rounded text-xs">
                        {filterReversible}
                      </span>
                    )}
                    {filterHasSettings !== "all" && (
                      <span className="ml-2 px-2 py-0.5 bg-purple-500/30 rounded text-xs">
                        {filterHasSettings}
                      </span>
                    )}
                    {selectedTags.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-green-500/30 rounded text-xs">
                        +{selectedTags.length} tags
                      </span>
                    )}
                    {excludedTags.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-red-500/30 rounded text-xs">
                        -{excludedTags.length} tags
                      </span>
                    )}
                    {sortBy !== "default" && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-500/30 rounded text-xs">
                        sorted
                      </span>
                    )}
                  </div>
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 px-3 py-1 text-sm transition-all rounded-lg bg-white/10 hover:bg-white/20"
                  >
                    <RotateCcw size={14} /> Reset all
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chain Mode Panel */}
        {showChainMode && (
          <div
            className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 mb-6 border border-green-400/30`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                🔗 Chain Encoding
                {chainSequence.length > 0 &&
                  ChainEncoder.isChainReversible(
                    chainSequence.map((id) =>
                      encoderConfig.find((e) => e.id === id),
                    ),
                  ) && (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/30">
                      Reversible
                    </span>
                  )}
              </h3>
              <button
                onClick={() => setShowChainMode(false)}
                className="p-1 rounded hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>

            {chainSequence.length === 0 ? (
              <p className={`${theme.textSecondary} mb-4`}>
                Click the 🔗 button on any encoder below to add it to the chain.
                Encodings will be applied in order.
              </p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  {chainSequence.map((id, index) => {
                    const encoder = encoderConfig.find((e) => e.id === id);
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20"
                      >
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

                {inputText &&
                  (() => {
                    const result = executeChainEncoding();
                    return (
                      result && (
                        <div className="space-y-2">
                          <div className="p-4 rounded-lg bg-black/30">
                            <div className="mb-2 text-sm font-semibold">
                              Final Result:
                            </div>
                            <div className="font-mono text-sm break-all">
                              {result.finalResult}
                            </div>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  result.finalResult,
                                  "chain-final",
                                )
                              }
                              className="px-3 py-1 mt-2 text-sm rounded-lg bg-green-500/30 hover:bg-green-500/50"
                            >
                              {copiedId === "chain-final" ? (
                                <Check size={16} className="inline" />
                              ) : (
                                <Copy size={16} className="inline" />
                              )}{" "}
                              Copy
                            </button>
                          </div>

                          <details className="p-4 rounded-lg bg-black/20">
                            <summary className="text-sm font-semibold cursor-pointer">
                              View Step-by-Step
                            </summary>
                            <div className="mt-3 space-y-2">
                              {result.steps.map((step, i) => (
                                <div
                                  key={i}
                                  className="p-2 text-xs rounded bg-white/10"
                                >
                                  <div className="font-semibold">
                                    {i + 1}. {step.encoderName}
                                  </div>
                                  <div className="mt-1 font-mono">
                                    {step.result}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </details>
                        </div>
                      )
                    );
                  })()}
              </>
            )}
          </div>
        )}

        {/* Shuffle Mode Panel */}
        {showShuffleMode && (
          <div
            className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 mb-6 border border-purple-400/30`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                🔀 Shuffle Encoding
                <span className="px-2 py-1 text-xs rounded-full bg-purple-500/30">
                  {shuffleEncoders.length} selected
                </span>
              </h3>
              <button
                onClick={() => setShowShuffleMode(false)}
                className="p-1 rounded hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>

            <p className={`${theme.textSecondary} mb-4 text-sm`}>
              Select multiple encoders below using the 🔀 button. Each character
              will be randomly encoded with one of your selected encoders,
              creating a unique mixed encoding!
            </p>

            {shuffleEncoders.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {shuffleEncoders.map((id) => {
                  const encoder = allEncoders.find((e) => e.id === id);
                  if (!encoder) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-purple-500/20 border-purple-400/30"
                    >
                      <span>{encoder.emoji}</span>
                      <span className="text-sm">{encoder.name}</span>
                      <button
                        onClick={() => toggleShuffleEncoder(id)}
                        className="ml-2 text-red-400 hover:text-red-300"
                        disabled={shuffleEncoders.length === 1}
                        title={
                          shuffleEncoders.length === 1
                            ? "You need at least one encoder"
                            : "Remove from shuffle"
                        }
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <div
              className={`text-xs ${theme.textSecondary} bg-purple-500/10 rounded-lg p-3 border border-purple-400/20`}
            >
              💡 <strong>Tip:</strong> The Shuffle encoder will use your
              selected encoders. View the Shuffle Encoding card below to see the
              mixed result!
            </div>
          </div>
        )}

        {/* Comparison Mode */}
        {showComparison && comparisonEncoders.length > 0 && (
          <div
            className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 mb-6 border border-blue-400/30`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">👁️ Comparison Mode</h3>
              <button
                onClick={() => setShowComparison(false)}
                className="p-1 rounded hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {comparisonEncoders.map((id) => {
                const encoder = encoderConfig.find((e) => e.id === id);
                if (!encoder) return null;

                // Use memoized result
                const result = encoderResults[id] || "";

                return (
                  <div key={id} className="p-4 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{encoder.emoji}</span>
                        <span className="font-semibold">{encoder.name}</span>
                      </div>
                      <button
                        onClick={() => toggleComparison(id)}
                        className="text-red-400 hover:text-red-300"
                      >
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
          <div
            className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 mb-6 border ${theme.cardBorder}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                <History size={24} className="inline mr-2" />
                Encoding History
              </h3>
              <div className="flex gap-2">
                {history.length > 0 && (
                  <>
                    <button
                      onClick={() => HistoryManager.downloadHistory("json")}
                      className="px-3 py-1 text-sm rounded-lg bg-blue-500/30 hover:bg-blue-500/50"
                      title="Export as JSON"
                    >
                      📥 JSON
                    </button>
                    <button
                      onClick={() => HistoryManager.downloadHistory("csv")}
                      className="px-3 py-1 text-sm rounded-lg bg-green-500/30 hover:bg-green-500/50"
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
                  className="px-3 py-1 text-sm rounded-lg bg-red-500/30 hover:bg-red-500/50"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-1 rounded hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {history.length === 0 ? (
              <p className={theme.textSecondary}>
                No encoding history yet. Start encoding to see your history
                here!
              </p>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start justify-between gap-3 p-3 rounded-lg bg-white/10"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold">
                          {entry.encoderName}
                        </span>
                        <span className="text-xs text-white/50">
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="font-mono text-xs truncate">
                        {entry.inputText}
                      </div>
                      <div className="font-mono text-xs truncate text-white/70">
                        {entry.result}
                      </div>
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
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowShortcuts(false)}
          >
            <div
              className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 max-w-md w-full border ${theme.cardBorder}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">
                  <Keyboard size={24} className="inline mr-2" />
                  Keyboard Shortcuts
                </h3>
                <button
                  onClick={() => setShowShortcuts(false)}
                  className="p-1 rounded hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-sm">Focus search</span>
                  <kbd className="px-2 py-1 text-xs rounded bg-white/20">
                    Ctrl+K
                  </kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-sm">Toggle encode/decode</span>
                  <kbd className="px-2 py-1 text-xs rounded bg-white/20">
                    Ctrl+Shift+E
                  </kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-sm">Toggle chain mode</span>
                  <kbd className="px-2 py-1 text-xs rounded bg-white/20">
                    Ctrl+Shift+C
                  </kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-sm">Toggle history</span>
                  <kbd className="px-2 py-1 text-xs rounded bg-white/20">
                    Ctrl+Shift+H
                  </kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-sm">Cycle theme</span>
                  <kbd className="px-2 py-1 text-xs rounded bg-white/20">
                    Ctrl+Shift+T
                  </kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-sm">Close panels</span>
                  <kbd className="px-2 py-1 text-xs rounded bg-white/20">
                    Esc
                  </kbd>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Modal */}
        {showAnalysis && selectedAnalysis && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAnalysis(false)}
          >
            <div
              className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 max-w-lg w-full border ${theme.cardBorder}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">
                  <TrendingUp size={24} className="inline mr-2" />
                  Encoding Analysis
                </h3>
                <button
                  onClick={() => setShowAnalysis(false)}
                  className="p-1 rounded hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Strength Score</span>
                    <span className="font-bold text-${selectedAnalysis.color}-400">
                      {selectedAnalysis.score}/100
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/20">
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
                  <h4 className="mb-2 font-semibold">Contributing Factors:</h4>
                  <div className="space-y-2">
                    {selectedAnalysis.factors.map((factor, i) => (
                      <div key={i} className="p-2 rounded bg-white/10">
                        <div className="flex justify-between text-sm">
                          <span>{factor.name}</span>
                          <span className="text-${theme.accent}">
                            +{factor.impact}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-white/60">
                          {factor.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="w-full mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold md:text-xl">✨ Encodings</h2>
            <div className={`text-xs ${theme.textSecondary}`}>
              {filteredEncoders.length} / {encoderConfig.length}
            </div>
          </div>
        </div>

        {/* Encoders Grid */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEncoders.map((encoder) => (
            <EncoderCard
              key={encoder.id}
              encoder={encoder}
              mode={mode}
              encoderResults={encoderResults}
              encoderParams={encoderParams}
              copiedId={copiedId}
              favorites={favorites}
              chainSequence={chainSequence}
              comparisonEncoders={comparisonEncoders}
              shuffleEncoders={shuffleEncoders}
              showChainMode={showChainMode}
              showShuffleMode={showShuffleMode}
              showComparison={showComparison}
              theme={theme}
              shuffleEncoderRef={shuffleEncoderRef}
              toggleFavorite={toggleFavorite}
              addToChain={addToChain}
              removeFromChain={removeFromChain}
              toggleShuffleEncoder={toggleShuffleEncoder}
              toggleComparison={toggleComparison}
              handleShare={handleShare}
              copyToClipboard={copyToClipboard}
              setSelectedAnalysis={setSelectedAnalysis}
              setShowAnalysis={setShowAnalysis}
              setVisualFlowEncoder={setVisualFlowEncoder}
              setShowVisualFlow={setShowVisualFlow}
              updateEncoderParam={updateEncoderParam}
              analyzeEncoding={analyzeEncoding}
            />
          ))}
        </div>

        {filteredEncoders.length === 0 && (
          <div
            className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-12 text-center border ${theme.cardBorder}`}
          >
            <p className={`text-xl ${theme.textSecondary}`}>
              No encoders found matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-2 mt-4 rounded-lg bg-white/20 hover:bg-white/30"
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

        {/* Lazy-loaded Feature Modals */}
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </div>
    </div>
  );
};

export default EnhancedTextEncoder;
