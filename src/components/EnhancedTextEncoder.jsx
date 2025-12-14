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
  Share2,
  Keyboard,
  Trash2,
  TrendingUp,
  Zap,
  Eye,
  HelpCircle,
  BookOpen,
  Wand2,
  Film,
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

// Lazy load modal components for better initial load performance
const CustomEncoderBuilder = lazy(() => import("./CustomEncoderBuilder.jsx"));
const VisualEncodingFlowViewer = lazy(() =>
  import("./VisualEncodingFlowViewer.jsx")
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
      "Focus search"
    );
    ks.register(
      "ctrl+shift+e",
      () => setMode((m) => (m === "encode" ? "decode" : "encode")),
      "Toggle mode"
    );
    ks.register(
      "ctrl+shift+h",
      () => setShowHistory((h) => !h),
      "Toggle history"
    );
    ks.register(
      "ctrl+shift+c",
      () => setShowChainMode((c) => !c),
      "Toggle chain mode"
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
      "Close panels"
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
      CustomEncoderManager.toEncoderConfig(ce)
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
    encoderId = null
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
        comparisonEncoders.filter((id) => id !== encoderId)
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
  const encoderResults = useMemo(() => {
    if (!inputText) return {};

    const results = {};
    const caesarShift = encoderParams.caesar || 13;
    const vigenereKey = encoderParams.vigenere || "SECRET";
    const railFenceRails = encoderParams["rail-fence"] || 3;
    const affineA = encoderParams.affine?.a || 5;
    const affineB = encoderParams.affine?.b || 8;
    const scytaleDiameter = encoderParams.scytale || 4;
    const columnarKey = encoderParams.columnar || "SECRET";
    const autokeyKey = encoderParams.autokey || "KEY";
    const beaufortKey = encoderParams.beaufort || "SECRET";
    const playfairKey = encoderParams.playfair || "KEYWORD";
    const zalgoIntensity = encoderParams.zalgo || 5;
    const redactedPercent = encoderParams.redacted || 40;

    // New parameterized encoder params (v3.1)
    const leetspeakIntensity = encoderParams["leetspeak-pro"] || 1;
    const uwuIntensity = encoderParams["uwu-pro"] || 5;
    const spongebobRandomness = encoderParams["spongebob-pro"] || 0;
    const emojiDensity = encoderParams["emojipasta-pro"] || 2;
    const binaryGrouping = encoderParams["binary-pro"] || 8;
    const morseStyle = encoderParams["morse-pro"] || 1;
    const rotN = encoderParams["rot-n"] || 13;
    const rot5Shift = encoderParams["rot5"] || 5;
    const tapCodeStyle = encoderParams["tap-code-pro"] || 1;
    const keywordCipherKey = encoderParams["keyword-cipher"] || "KEYWORD";
    const runningKeyText =
      encoderParams["running-key"] || "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG";
    const gronsfeldKey = encoderParams["gronsfeld"] || "31415";
    const trithemiusStart = encoderParams["trithemius"] || 0;
    const portaKey = encoderParams["porta"] || "SECRET";
    const nihilistKey = encoderParams["nihilist"] || "ZEBRA";
    const polybiusSize = encoderParams["polybius-pro"] || 5;
    const adfgvxKey = encoderParams["adfgvx"] || "GERMAN";
    const bookCipherText =
      encoderParams["book-cipher"] ||
      "The quick brown fox jumps over the lazy dog";
    const doubleTransKey1 =
      encoderParams["double-transposition"]?.key1 || "FIRST";
    const doubleTransKey2 =
      encoderParams["double-transposition"]?.key2 || "SECOND";
    const fourSquareKey1 = encoderParams["four-square"]?.key1 || "EXAMPLE";
    const fourSquareKey2 = encoderParams["four-square"]?.key2 || "KEYWORD";
    const straddlingKey = encoderParams["straddling-checkerboard"] || "ESTONAI";
    const homophonicComplexity = encoderParams["homophonic"] || 3;

    allEncoders.forEach((encoder) => {
      try {
        if (mode === "decode") {
          if (encoder.reversible) {
            switch (encoder.id) {
              case "caesar":
                results[encoder.id] = encoder.decode(inputText, caesarShift);
                break;
              case "vigenere":
                results[encoder.id] = encoder.decode(inputText, vigenereKey);
                break;
              case "rail-fence":
                results[encoder.id] = encoder.decode(inputText, railFenceRails);
                break;
              case "affine":
                results[encoder.id] = encoder.decode(
                  inputText,
                  affineA,
                  affineB
                );
                break;
              case "scytale":
                results[encoder.id] = encoder.decode(
                  inputText,
                  scytaleDiameter
                );
                break;
              case "columnar":
                results[encoder.id] = encoder.decode(inputText, columnarKey);
                break;
              case "autokey":
                results[encoder.id] = encoder.decode(inputText, autokeyKey);
                break;
              case "beaufort":
                results[encoder.id] = encoder.decode(inputText, beaufortKey);
                break;
              case "playfair":
                results[encoder.id] = encoder.decode(inputText, playfairKey);
                break;
              case "shuffle":
                results[encoder.id] = encoder.decode(inputText);
                break;
              // New parameterized decoders (v3.1)
              case "binary-pro":
                results[encoder.id] = encoder.decode(inputText);
                break;
              case "morse-pro":
                results[encoder.id] = encoder.decode(inputText);
                break;
              case "rot-n":
                results[encoder.id] = encoder.decode(inputText, rotN);
                break;
              case "rot5":
                results[encoder.id] = encoder.decode(inputText, rot5Shift);
                break;
              case "tap-code-pro":
                results[encoder.id] = encoder.decode(inputText);
                break;
              case "keyword-cipher":
                results[encoder.id] = encoder.decode(
                  inputText,
                  keywordCipherKey
                );
                break;
              case "running-key":
                results[encoder.id] = encoder.decode(inputText, runningKeyText);
                break;
              case "gronsfeld":
                results[encoder.id] = encoder.decode(inputText, gronsfeldKey);
                break;
              case "trithemius":
                results[encoder.id] = encoder.decode(
                  inputText,
                  trithemiusStart
                );
                break;
              case "porta":
                results[encoder.id] = encoder.decode(inputText, portaKey);
                break;
              case "nihilist":
                results[encoder.id] = encoder.decode(inputText, nihilistKey);
                break;
              case "polybius-pro":
                results[encoder.id] = encoder.decode(inputText, polybiusSize);
                break;
              case "adfgvx":
                results[encoder.id] = encoder.decode(inputText, adfgvxKey);
                break;
              case "book-cipher":
                results[encoder.id] = encoder.decode(inputText, bookCipherText);
                break;
              case "double-transposition":
                results[encoder.id] = encoder.decode(
                  inputText,
                  doubleTransKey1,
                  doubleTransKey2
                );
                break;
              case "four-square":
                results[encoder.id] = encoder.decode(
                  inputText,
                  fourSquareKey1,
                  fourSquareKey2
                );
                break;
              case "straddling-checkerboard":
                results[encoder.id] = encoder.decode(inputText, straddlingKey);
                break;
              case "homophonic":
                results[encoder.id] = encoder.decode(
                  inputText,
                  homophonicComplexity
                );
                break;
              default:
                results[encoder.id] = encoder.decode(inputText);
            }
          } else {
            results[encoder.id] = "[Not reversible]";
          }
        } else {
          switch (encoder.id) {
            case "caesar":
              results[encoder.id] = encoder.encode(inputText, caesarShift);
              break;
            case "vigenere":
              results[encoder.id] = encoder.encode(inputText, vigenereKey);
              break;
            case "rail-fence":
              results[encoder.id] = encoder.encode(inputText, railFenceRails);
              break;
            case "affine":
              results[encoder.id] = encoder.encode(inputText, affineA, affineB);
              break;
            case "scytale":
              results[encoder.id] = encoder.encode(inputText, scytaleDiameter);
              break;
            case "columnar":
              results[encoder.id] = encoder.encode(inputText, columnarKey);
              break;
            case "autokey":
              results[encoder.id] = encoder.encode(inputText, autokeyKey);
              break;
            case "beaufort":
              results[encoder.id] = encoder.encode(inputText, beaufortKey);
              break;
            case "playfair":
              results[encoder.id] = encoder.encode(inputText, playfairKey);
              break;
            case "zalgo":
              results[encoder.id] = encoder.encode(inputText, zalgoIntensity);
              break;
            case "redacted":
              results[encoder.id] = encoder.encode(inputText, redactedPercent);
              break;
            case "shuffle":
              results[encoder.id] = encoder.encode(inputText, shuffleEncoders);
              break;
            // New parameterized encoders (v3.1)
            case "leetspeak-pro":
              results[encoder.id] = encoder.encode(
                inputText,
                leetspeakIntensity
              );
              break;
            case "uwu-pro":
              results[encoder.id] = encoder.encode(inputText, uwuIntensity);
              break;
            case "spongebob-pro":
              results[encoder.id] = encoder.encode(
                inputText,
                spongebobRandomness
              );
              break;
            case "emojipasta-pro":
              results[encoder.id] = encoder.encode(inputText, emojiDensity);
              break;
            case "binary-pro":
              results[encoder.id] = encoder.encode(inputText, binaryGrouping);
              break;
            case "morse-pro":
              results[encoder.id] = encoder.encode(inputText, morseStyle);
              break;
            case "rot-n":
              results[encoder.id] = encoder.encode(inputText, rotN);
              break;
            case "rot5":
              results[encoder.id] = encoder.encode(inputText, rot5Shift);
              break;
            case "rot18":
              results[encoder.id] = encoder.encode(inputText);
              break;
            case "tap-code-pro":
              results[encoder.id] = encoder.encode(inputText, tapCodeStyle);
              break;
            case "keyword-cipher":
              results[encoder.id] = encoder.encode(inputText, keywordCipherKey);
              break;
            case "running-key":
              results[encoder.id] = encoder.encode(inputText, runningKeyText);
              break;
            case "gronsfeld":
              results[encoder.id] = encoder.encode(inputText, gronsfeldKey);
              break;
            case "trithemius":
              results[encoder.id] = encoder.encode(inputText, trithemiusStart);
              break;
            case "porta":
              results[encoder.id] = encoder.encode(inputText, portaKey);
              break;
            case "nihilist":
              results[encoder.id] = encoder.encode(inputText, nihilistKey);
              break;
            case "polybius-pro":
              results[encoder.id] = encoder.encode(inputText, polybiusSize);
              break;
            case "adfgvx":
              results[encoder.id] = encoder.encode(inputText, adfgvxKey);
              break;
            case "book-cipher":
              results[encoder.id] = encoder.encode(inputText, bookCipherText);
              break;
            case "double-transposition":
              results[encoder.id] = encoder.encode(
                inputText,
                doubleTransKey1,
                doubleTransKey2
              );
              break;
            case "four-square":
              results[encoder.id] = encoder.encode(
                inputText,
                fourSquareKey1,
                fourSquareKey2
              );
              break;
            case "straddling-checkerboard":
              results[encoder.id] = encoder.encode(inputText, straddlingKey);
              break;
            case "homophonic":
              results[encoder.id] = encoder.encode(
                inputText,
                homophonicComplexity
              );
              break;
            default:
              results[encoder.id] = encoder.encode(inputText);
          }
        }
      } catch {
        results[encoder.id] = "[Error]";
      }
    });

    return results;
  }, [inputText, mode, encoderParams, shuffleEncoders, allEncoders]);

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
      preset.categories?.length > 0 ? preset.categories[0] : "all"
    );
    setSelectedTags(preset.tags || []);
    setExcludedTags(preset.excludeTags || []);
    setFilterReversible(
      preset.reversible === true
        ? "reversible"
        : preset.reversible === false
        ? "non-reversible"
        : "all"
    );
    setFilterHasSettings(
      preset.hasSettings === true
        ? "with-settings"
        : preset.hasSettings === false
        ? "without-settings"
        : "all"
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

  const playMorseSound = async (morseCode) => {
    if (!window.AudioContext) return;

    const audioContext = new AudioContext();
    const dotDuration = 0.08;
    const dashDuration = dotDuration * 3;
    const gapDuration = dotDuration;

    let currentTime = audioContext.currentTime;

    for (let char of morseCode) {
      if (char === "•") {
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.value = 600;
        oscillator.connect(audioContext.destination);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + dotDuration);
        currentTime += dotDuration + gapDuration;
      } else if (char === "−") {
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.value = 600;
        oscillator.connect(audioContext.destination);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + dashDuration);
        currentTime += dashDuration + gapDuration;
      } else if (char === " ") {
        currentTime += gapDuration * 3;
      }
    }
  };

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
                            selectedTags.filter((t) => t !== tag)
                          );
                        } else {
                          setSelectedTags([...selectedTags, tag]);
                          // Remove from excluded if present
                          setExcludedTags(
                            excludedTags.filter((t) => t !== tag)
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
                            excludedTags.filter((t) => t !== tag)
                          );
                        } else {
                          setExcludedTags([...excludedTags, tag]);
                          // Remove from included if present
                          setSelectedTags(
                            selectedTags.filter((t) => t !== tag)
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
                      encoderConfig.find((e) => e.id === id)
                    )
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
                                  "chain-final"
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
          {filteredEncoders.map((encoder) => {
            const isDecodeMode = mode === "decode";
            const canDecode = encoder.reversible;

            // Get memoized result instead of computing on every render
            const result = encoderResults[encoder.id] || "";

            const displayText =
              encoder.special && !isDecodeMode
                ? `[${result.length} invisible characters]`
                : result;

            const isDisabled = isDecodeMode && !canDecode;
            const isFavorite = favorites.has(encoder.id);
            const isInChain = chainSequence.includes(encoder.id);
            const isInComparison = comparisonEncoders.includes(encoder.id);
            const isInShuffle = shuffleEncoders.includes(encoder.id);
            const analysis =
              !isDisabled && result ? analyzeEncoding(encoder, result) : null;

            const categoryEmoji = categories[encoder.category]?.emoji || "📦";

            return (
              <div
                key={encoder.id}
                ref={encoder.id === "shuffle" ? shuffleEncoderRef : null}
                className={`backdrop-blur-xl bg-white/5 rounded-2xl p-4 md:p-5 border transition-all w-full shadow-2xl hover:shadow-purple-500/10 hover:bg-white/10 ${
                  isDisabled
                    ? "border-white/10 opacity-50"
                    : isFavorite
                    ? "border-yellow-400/40 shadow-lg shadow-yellow-500/20 bg-yellow-500/5"
                    : isInChain
                    ? "border-green-400/40 shadow-lg shadow-green-500/20 bg-green-500/5"
                    : isInComparison
                    ? "border-blue-400/40 shadow-lg shadow-blue-500/20 bg-blue-500/5"
                    : "border-white/20 hover:border-purple-400/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-start flex-1 min-w-0 gap-2">
                    <span className="flex-shrink-0 text-xl md:text-2xl">
                      {encoder.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold md:text-lg">
                          {encoder.name}
                        </h3>
                        <span className="text-xs opacity-70">
                          {categoryEmoji}
                        </span>
                        {encoder.reversible && (
                          <span className="text-xs bg-green-500/30 text-green-300 px-2 py-0.5 rounded-full border border-green-400/50">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className={`text-xs ${theme.textSecondary} mt-1`}>
                        {encoder.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap flex-shrink-0 gap-1">
                    <button
                      onClick={() => toggleFavorite(encoder.id)}
                      className={`p-1.5 rounded-lg transition-all ${
                        isFavorite
                          ? "bg-yellow-500/30 text-yellow-300"
                          : "hover:bg-white/20 text-white/50"
                      }`}
                      title={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      {isFavorite ? "⭐" : "☆"}
                    </button>

                    {showChainMode && !isDisabled && (
                      <button
                        onClick={() =>
                          isInChain
                            ? removeFromChain(encoder.id)
                            : addToChain(encoder.id)
                        }
                        className={`p-1.5 rounded-lg transition-all text-sm ${
                          isInChain
                            ? "bg-green-500/30 text-green-300"
                            : "hover:bg-white/20 text-white/50"
                        }`}
                        title={isInChain ? "Remove from chain" : "Add to chain"}
                      >
                        🔗
                      </button>
                    )}

                    {showShuffleMode &&
                      !isDisabled &&
                      encoder.id !== "shuffle" && (
                        <button
                          onClick={() => toggleShuffleEncoder(encoder.id)}
                          className={`p-1.5 rounded-lg transition-all text-sm ${
                            isInShuffle
                              ? "bg-purple-500/30 text-purple-300"
                              : "hover:bg-white/20 text-white/50"
                          }`}
                          title={
                            isInShuffle
                              ? "Remove from shuffle"
                              : "Add to shuffle"
                          }
                        >
                          🔀
                        </button>
                      )}

                    {showComparison && !isDisabled && (
                      <button
                        onClick={() => toggleComparison(encoder.id)}
                        disabled={
                          !isInComparison && comparisonEncoders.length >= 4
                        }
                        className={`p-1.5 rounded-lg transition-all ${
                          isInComparison
                            ? "bg-blue-500/30 text-blue-300"
                            : "hover:bg-white/20 text-white/50 disabled:opacity-30"
                        }`}
                        title={
                          isInComparison
                            ? "Remove from comparison"
                            : "Add to comparison (max 4)"
                        }
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
                          onClick={() =>
                            handleShare(encoder.id, encoder.name, result)
                          }
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
                          onClick={() =>
                            copyToClipboard(
                              result,
                              encoder.id,
                              encoder.name,
                              encoder.id
                            )
                          }
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

                <div
                  className={`
                  bg-black/30 rounded-lg p-2 md:p-3 font-mono text-xs break-all min-h-[50px] flex items-center w-full overflow-x-auto
                  ${
                    encoder.id === "zalgo"
                      ? "overflow-hidden leading-relaxed"
                      : ""
                  }
                  ${
                    encoder.special && !isDecodeMode
                      ? "bg-yellow-500/20 border border-yellow-400/50"
                      : ""
                  }
                  ${isDisabled ? "justify-center" : ""}
                `}
                >
                  {isDisabled ? (
                    <span className="italic text-center text-white/50">
                      Decode unavailable
                    </span>
                  ) : displayText ? (
                    displayText
                  ) : (
                    <span className="italic text-white/50">
                      {isDecodeMode ? "Paste encoded text..." : "Enter text..."}
                    </span>
                  )}
                </div>

                {/* Caesar Cipher Controls */}
                {encoder.id === "caesar" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Shift: {encoderParams.caesar || 13}
                      </label>
                      <span className="text-xs text-white/60">
                        ROT-{encoderParams.caesar || 13}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      value={encoderParams.caesar || 13}
                      onChange={(e) =>
                        updateEncoderParam(
                          "caesar",
                          "shift",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      {(encoderParams.caesar || 13) === 13
                        ? "ROT13 (classic)"
                        : `Shift ${encoderParams.caesar || 13} positions`}
                    </p>
                  </div>
                )}

                {/* Vigenère Cipher Controls */}
                {encoder.id === "vigenere" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Keyword: {encoderParams.vigenere || "SECRET"}
                    </label>
                    <input
                      type="text"
                      value={encoderParams.vigenere || "SECRET"}
                      onChange={(e) =>
                        updateEncoderParam(
                          "vigenere",
                          "keyword",
                          e.target.value.toUpperCase().replace(/[^A-Z]/g, "") ||
                            "SECRET"
                        )
                      }
                      placeholder="Enter keyword"
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Letters only. Key repeats for longer messages.
                    </p>
                  </div>
                )}

                {/* Rail Fence Cipher Controls */}
                {encoder.id === "rail-fence" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Rails: {encoderParams["rail-fence"] || 3}
                      </label>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      value={encoderParams["rail-fence"] || 3}
                      onChange={(e) =>
                        updateEncoderParam(
                          "rail-fence",
                          "rails",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Text zigzags across {encoderParams["rail-fence"] || 3}{" "}
                      rows
                    </p>
                  </div>
                )}

                {/* Affine Cipher Controls */}
                {encoder.id === "affine" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <label className="block mb-1 text-xs font-semibold">
                          a: {encoderParams.affine?.a || 5}
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="25"
                          step="2"
                          value={encoderParams.affine?.a || 5}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            // a must be coprime with 26 (odd and not 13)
                            const validA = val === 13 ? 15 : val;
                            updateEncoderParam("affine", "a", {
                              ...encoderParams.affine,
                              a: validA,
                            });
                          }}
                          className="w-full h-2"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs font-semibold">
                          b: {encoderParams.affine?.b || 8}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="25"
                          value={encoderParams.affine?.b || 8}
                          onChange={(e) =>
                            updateEncoderParam("affine", "b", {
                              ...encoderParams.affine,
                              b: parseInt(e.target.value),
                            })
                          }
                          className="w-full h-2"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-white/50">
                      E(x) = ({encoderParams.affine?.a || 5}x +{" "}
                      {encoderParams.affine?.b || 8}) mod 26
                    </p>
                  </div>
                )}

                {/* Scytale Cipher Controls */}
                {encoder.id === "scytale" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Diameter: {encoderParams.scytale || 4}
                      </label>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      value={encoderParams.scytale || 4}
                      onChange={(e) =>
                        updateEncoderParam(
                          "scytale",
                          "diameter",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Cylinder wraps text in {encoderParams.scytale || 4}{" "}
                      columns
                    </p>
                  </div>
                )}

                {/* Columnar Transposition Controls */}
                {encoder.id === "columnar" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Keyword: {encoderParams.columnar || "SECRET"}
                    </label>
                    <input
                      type="text"
                      value={encoderParams.columnar || "SECRET"}
                      onChange={(e) =>
                        updateEncoderParam(
                          "columnar",
                          "keyword",
                          e.target.value.toUpperCase().replace(/[^A-Z]/g, "") ||
                            "SECRET"
                        )
                      }
                      placeholder="Enter keyword"
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      {(encoderParams.columnar || "SECRET").length} columns
                    </p>
                  </div>
                )}

                {/* Autokey Cipher Controls */}
                {encoder.id === "autokey" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Primer Key: {encoderParams.autokey || "KEY"}
                    </label>
                    <input
                      type="text"
                      value={encoderParams.autokey || "KEY"}
                      onChange={(e) =>
                        updateEncoderParam(
                          "autokey",
                          "key",
                          e.target.value.toUpperCase().replace(/[^A-Z]/g, "") ||
                            "KEY"
                        )
                      }
                      placeholder="Enter primer key"
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Key extends with plaintext
                    </p>
                  </div>
                )}

                {/* Beaufort Cipher Controls */}
                {encoder.id === "beaufort" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Keyword: {encoderParams.beaufort || "SECRET"}
                    </label>
                    <input
                      type="text"
                      value={encoderParams.beaufort || "SECRET"}
                      onChange={(e) =>
                        updateEncoderParam(
                          "beaufort",
                          "keyword",
                          e.target.value.toUpperCase().replace(/[^A-Z]/g, "") ||
                            "SECRET"
                        )
                      }
                      placeholder="Enter keyword"
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Symmetric variant of Vigenère
                    </p>
                  </div>
                )}

                {/* Playfair Cipher Controls */}
                {encoder.id === "playfair" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Keyword: {encoderParams.playfair || "KEYWORD"}
                    </label>
                    <input
                      type="text"
                      value={encoderParams.playfair || "KEYWORD"}
                      onChange={(e) =>
                        updateEncoderParam(
                          "playfair",
                          "keyword",
                          e.target.value.toUpperCase().replace(/[^A-Z]/g, "") ||
                            "KEYWORD"
                        )
                      }
                      placeholder="Enter keyword"
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      5x5 grid cipher (I/J combined)
                    </p>
                  </div>
                )}

                {/* Zalgo Controls */}
                {encoder.id === "zalgo" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Intensity: {encoderParams.zalgo || 5}
                      </label>
                      <span className="text-xs text-white/60">
                        {(encoderParams.zalgo || 5) <= 3
                          ? "Mild"
                          : (encoderParams.zalgo || 5) <= 6
                          ? "Medium"
                          : "Chaos"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={encoderParams.zalgo || 5}
                      onChange={(e) =>
                        updateEncoderParam(
                          "zalgo",
                          "intensity",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Controls how many combining marks are added
                    </p>
                  </div>
                )}

                {/* Redacted Controls */}
                {encoder.id === "redacted" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Redaction: {encoderParams.redacted || 40}%
                      </label>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={encoderParams.redacted || 40}
                      onChange={(e) =>
                        updateEncoderParam(
                          "redacted",
                          "percentage",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      {(encoderParams.redacted || 40) < 30
                        ? "Lightly classified"
                        : (encoderParams.redacted || 40) < 60
                        ? "Partially classified"
                        : "Heavily classified"}
                    </p>
                  </div>
                )}

                {/* ============================================ */}
                {/* NEW PARAMETERIZED ENCODER CONTROLS (v3.1)    */}
                {/* ============================================ */}

                {/* Leetspeak Pro Controls */}
                {encoder.id === "leetspeak-pro" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Intensity:{" "}
                        {
                          ["Basic", "Medium", "Extreme"][
                            (encoderParams["leetspeak-pro"] || 1) - 1
                          ]
                        }
                      </label>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      value={encoderParams["leetspeak-pro"] || 1}
                      onChange={(e) =>
                        updateEncoderParam(
                          "leetspeak-pro",
                          "intensity",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      {(encoderParams["leetspeak-pro"] || 1) === 1
                        ? "Simple substitutions (a→4, e→3)"
                        : (encoderParams["leetspeak-pro"] || 1) === 2
                        ? "More substitutions (b→8, g→9)"
                        : "Full h4ck3r mode (m→|\\/|)"}
                    </p>
                  </div>
                )}

                {/* UwU Pro Controls */}
                {encoder.id === "uwu-pro" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        UwU Intensity: {encoderParams["uwu-pro"] || 5}
                      </label>
                      <span className="text-xs text-white/60">
                        {(encoderParams["uwu-pro"] || 5) <= 3
                          ? "OwO"
                          : (encoderParams["uwu-pro"] || 5) <= 6
                          ? "UwU"
                          : ">w<"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={encoderParams["uwu-pro"] || 5}
                      onChange={(e) =>
                        updateEncoderParam(
                          "uwu-pro",
                          "intensity",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Higher = more stuttering and faces
                    </p>
                  </div>
                )}

                {/* Spongebob Pro Controls */}
                {encoder.id === "spongebob-pro" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Randomness: {encoderParams["spongebob-pro"] || 0}%
                      </label>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={encoderParams["spongebob-pro"] || 0}
                      onChange={(e) =>
                        updateEncoderParam(
                          "spongebob-pro",
                          "randomness",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      {(encoderParams["spongebob-pro"] || 0) === 0
                        ? "Strict alternating pattern"
                        : (encoderParams["spongebob-pro"] || 0) < 50
                        ? "Some randomness"
                        : "Chaotic mocking"}
                    </p>
                  </div>
                )}

                {/* Emojipasta Pro Controls */}
                {encoder.id === "emojipasta-pro" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Emoji Density: {encoderParams["emojipasta-pro"] || 2}
                      </label>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={encoderParams["emojipasta-pro"] || 2}
                      onChange={(e) =>
                        updateEncoderParam(
                          "emojipasta-pro",
                          "density",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Up to {encoderParams["emojipasta-pro"] || 2} emojis per
                      word 💯🔥
                    </p>
                  </div>
                )}

                {/* Binary Pro Controls */}
                {encoder.id === "binary-pro" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Bit Grouping:{" "}
                        {encoderParams["binary-pro"] === 0
                          ? "None"
                          : encoderParams["binary-pro"] || 8}
                      </label>
                    </div>
                    <select
                      value={encoderParams["binary-pro"] || 8}
                      onChange={(e) =>
                        updateEncoderParam(
                          "binary-pro",
                          "groupSize",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30"
                    >
                      <option value="0">No grouping</option>
                      <option value="4">4-bit (nibbles)</option>
                      <option value="8">8-bit (bytes)</option>
                    </select>
                  </div>
                )}

                {/* Morse Pro Controls */}
                {encoder.id === "morse-pro" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Delimiter Style
                      </label>
                    </div>
                    <select
                      value={encoderParams["morse-pro"] || 1}
                      onChange={(e) =>
                        updateEncoderParam(
                          "morse-pro",
                          "style",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30"
                    >
                      <option value="1">Classic (space / slash)</option>
                      <option value="2">Slash style (/ //)</option>
                      <option value="3">Pipe style (| ||)</option>
                      <option value="4">Emoji style (· 🔹)</option>
                    </select>
                  </div>
                )}

                {/* ROT-N Controls */}
                {encoder.id === "rot-n" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Rotation: {encoderParams["rot-n"] || 13}
                      </label>
                      <span className="text-xs text-white/60">
                        ROT-{encoderParams["rot-n"] || 13}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      value={encoderParams["rot-n"] || 13}
                      onChange={(e) =>
                        updateEncoderParam(
                          "rot-n",
                          "n",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      {(encoderParams["rot-n"] || 13) === 13
                        ? "ROT13 (self-inverse)"
                        : `Shift ${encoderParams["rot-n"] || 13} positions`}
                    </p>
                  </div>
                )}

                {/* ROT5 Controls */}
                {encoder.id === "rot5" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Digit Rotation: {encoderParams["rot5"] || 5}
                      </label>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="9"
                      value={encoderParams["rot5"] || 5}
                      onChange={(e) =>
                        updateEncoderParam(
                          "rot5",
                          "shift",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      {(encoderParams["rot5"] || 5) === 5
                        ? "ROT5 (self-inverse for 0-9)"
                        : `Shift digits by ${encoderParams["rot5"] || 5}`}
                    </p>
                  </div>
                )}

                {/* Tap Code Pro Controls */}
                {encoder.id === "tap-code-pro" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Symbol Style
                      </label>
                    </div>
                    <select
                      value={encoderParams["tap-code-pro"] || 1}
                      onChange={(e) =>
                        updateEncoderParam(
                          "tap-code-pro",
                          "style",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30"
                    >
                      <option value="1">Dots (. . .. ..)</option>
                      <option value="2">Numbers (1-1 1-2)</option>
                      <option value="3">Asterisks (* * ** **)</option>
                      <option value="4">Emoji (👊👊 👊)</option>
                    </select>
                  </div>
                )}

                {/* Keyword Cipher Controls */}
                {encoder.id === "keyword-cipher" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Keyword: {encoderParams["keyword-cipher"] || "KEYWORD"}
                    </label>
                    <input
                      type="text"
                      value={encoderParams["keyword-cipher"] || "KEYWORD"}
                      onChange={(e) =>
                        updateEncoderParam(
                          "keyword-cipher",
                          "keyword",
                          e.target.value.toUpperCase().replace(/[^A-Z]/g, "") ||
                            "KEYWORD"
                        )
                      }
                      placeholder="Enter keyword"
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Alphabet starts with unique letters from keyword
                    </p>
                  </div>
                )}

                {/* Running Key Controls */}
                {encoder.id === "running-key" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Key Text
                    </label>
                    <input
                      type="text"
                      value={
                        encoderParams["running-key"] ||
                        "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG"
                      }
                      onChange={(e) =>
                        updateEncoderParam(
                          "running-key",
                          "key",
                          e.target.value.toUpperCase().replace(/[^A-Z]/g, "") ||
                            "THEQUICKBROWNFOX"
                        )
                      }
                      placeholder="Enter key text"
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Use a passage from a book as the key
                    </p>
                  </div>
                )}

                {/* Gronsfeld Controls */}
                {encoder.id === "gronsfeld" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Numeric Key: {encoderParams["gronsfeld"] || "31415"}
                    </label>
                    <input
                      type="text"
                      value={encoderParams["gronsfeld"] || "31415"}
                      onChange={(e) =>
                        updateEncoderParam(
                          "gronsfeld",
                          "key",
                          e.target.value.replace(/[^0-9]/g, "") || "31415"
                        )
                      }
                      placeholder="Enter numeric key"
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Numbers 0-9 for shift values (like π digits)
                    </p>
                  </div>
                )}

                {/* Trithemius Controls */}
                {encoder.id === "trithemius" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Start Shift: {encoderParams["trithemius"] || 0}
                      </label>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      value={encoderParams["trithemius"] || 0}
                      onChange={(e) =>
                        updateEncoderParam(
                          "trithemius",
                          "start",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Progressive shift: {encoderParams["trithemius"] || 0},{" "}
                      {((encoderParams["trithemius"] || 0) + 1) % 26},{" "}
                      {((encoderParams["trithemius"] || 0) + 2) % 26}...
                    </p>
                  </div>
                )}

                {/* Porta Controls */}
                {encoder.id === "porta" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Keyword: {encoderParams["porta"] || "SECRET"}
                    </label>
                    <input
                      type="text"
                      value={encoderParams["porta"] || "SECRET"}
                      onChange={(e) =>
                        updateEncoderParam(
                          "porta",
                          "keyword",
                          e.target.value.toUpperCase().replace(/[^A-Z]/g, "") ||
                            "SECRET"
                        )
                      }
                      placeholder="Enter keyword"
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Self-inverse (encode = decode)
                    </p>
                  </div>
                )}

                {/* Nihilist Controls */}
                {encoder.id === "nihilist" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Keyword: {encoderParams["nihilist"] || "ZEBRA"}
                    </label>
                    <input
                      type="text"
                      value={encoderParams["nihilist"] || "ZEBRA"}
                      onChange={(e) =>
                        updateEncoderParam(
                          "nihilist",
                          "keyword",
                          e.target.value.toUpperCase().replace(/[^A-Z]/g, "") ||
                            "ZEBRA"
                        )
                      }
                      placeholder="Enter keyword"
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Outputs numeric pairs based on Polybius
                    </p>
                  </div>
                )}

                {/* Polybius Pro Controls */}
                {encoder.id === "polybius-pro" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">Grid Size</label>
                    </div>
                    <select
                      value={encoderParams["polybius-pro"] || 5}
                      onChange={(e) =>
                        updateEncoderParam(
                          "polybius-pro",
                          "size",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30"
                    >
                      <option value="5">5×5 (A-Z, I/J combined)</option>
                      <option value="6">6×6 (A-Z + 0-9)</option>
                    </select>
                  </div>
                )}

                {/* ADFGVX Controls */}
                {encoder.id === "adfgvx" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Transposition Key: {encoderParams["adfgvx"] || "GERMAN"}
                    </label>
                    <input
                      type="text"
                      value={encoderParams["adfgvx"] || "GERMAN"}
                      onChange={(e) =>
                        updateEncoderParam(
                          "adfgvx",
                          "keyword",
                          e.target.value.toUpperCase().replace(/[^A-Z]/g, "") ||
                            "GERMAN"
                        )
                      }
                      placeholder="Enter keyword"
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      WWI German cipher using ADFGVX letters
                    </p>
                  </div>
                )}

                {/* Book Cipher Controls */}
                {encoder.id === "book-cipher" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Reference Text
                    </label>
                    <textarea
                      value={
                        encoderParams["book-cipher"] ||
                        "The quick brown fox jumps over the lazy dog"
                      }
                      onChange={(e) =>
                        updateEncoderParam(
                          "book-cipher",
                          "book",
                          e.target.value || "The quick brown fox"
                        )
                      }
                      placeholder="Enter reference text"
                      rows={2}
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Words encoded as positions in this text
                    </p>
                  </div>
                )}

                {/* Double Transposition Controls */}
                {encoder.id === "double-transposition" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <label className="block mb-1 text-xs font-semibold">
                          Key 1:{" "}
                          {encoderParams["double-transposition"]?.key1 ||
                            "FIRST"}
                        </label>
                        <input
                          type="text"
                          value={
                            encoderParams["double-transposition"]?.key1 ||
                            "FIRST"
                          }
                          onChange={(e) =>
                            updateEncoderParam("double-transposition", "key1", {
                              ...encoderParams["double-transposition"],
                              key1:
                                e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z]/g, "") || "FIRST",
                            })
                          }
                          className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs font-semibold">
                          Key 2:{" "}
                          {encoderParams["double-transposition"]?.key2 ||
                            "SECOND"}
                        </label>
                        <input
                          type="text"
                          value={
                            encoderParams["double-transposition"]?.key2 ||
                            "SECOND"
                          }
                          onChange={(e) =>
                            updateEncoderParam("double-transposition", "key2", {
                              ...encoderParams["double-transposition"],
                              key2:
                                e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z]/g, "") || "SECOND",
                            })
                          }
                          className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-white/50">
                      Two-pass columnar transposition
                    </p>
                  </div>
                )}

                {/* Four-Square Controls */}
                {encoder.id === "four-square" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <label className="block mb-1 text-xs font-semibold">
                          Key 1:{" "}
                          {encoderParams["four-square"]?.key1 || "EXAMPLE"}
                        </label>
                        <input
                          type="text"
                          value={
                            encoderParams["four-square"]?.key1 || "EXAMPLE"
                          }
                          onChange={(e) =>
                            updateEncoderParam("four-square", "key1", {
                              ...encoderParams["four-square"],
                              key1:
                                e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z]/g, "") || "EXAMPLE",
                            })
                          }
                          className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs font-semibold">
                          Key 2:{" "}
                          {encoderParams["four-square"]?.key2 || "KEYWORD"}
                        </label>
                        <input
                          type="text"
                          value={
                            encoderParams["four-square"]?.key2 || "KEYWORD"
                          }
                          onChange={(e) =>
                            updateEncoderParam("four-square", "key2", {
                              ...encoderParams["four-square"],
                              key2:
                                e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z]/g, "") || "KEYWORD",
                            })
                          }
                          className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-white/50">
                      Digraphic cipher with two keywords
                    </p>
                  </div>
                )}

                {/* Straddling Checkerboard Controls */}
                {encoder.id === "straddling-checkerboard" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <label className="block mb-2 text-xs font-semibold">
                      Keyword (8 letters):{" "}
                      {encoderParams["straddling-checkerboard"] || "ESTONAI"}
                    </label>
                    <input
                      type="text"
                      value={
                        encoderParams["straddling-checkerboard"] || "ESTONAI"
                      }
                      onChange={(e) =>
                        updateEncoderParam(
                          "straddling-checkerboard",
                          "keyword",
                          e.target.value
                            .toUpperCase()
                            .replace(/[^A-Z]/g, "")
                            .slice(0, 8) || "ESTONAI"
                        )
                      }
                      placeholder="Enter 8-letter keyword"
                      maxLength={8}
                      className="w-full px-2 py-1 text-xs text-white border rounded bg-white/20 border-white/30 placeholder-white/50"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Variable-length numeric encoding
                    </p>
                  </div>
                )}

                {/* Homophonic Controls */}
                {encoder.id === "homophonic" && (
                  <div className="p-3 mt-3 rounded-lg bg-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold">
                        Complexity: {encoderParams["homophonic"] || 3}
                      </label>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="5"
                      value={encoderParams["homophonic"] || 3}
                      onChange={(e) =>
                        updateEncoderParam(
                          "homophonic",
                          "complexity",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2"
                    />
                    <p className="mt-1 text-xs text-white/50">
                      Up to {encoderParams["homophonic"] || 3} different codes
                      per letter
                    </p>
                  </div>
                )}

                {encoder.special && result && !isDecodeMode && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-yellow-300">
                    👻 Hidden characters - try pasting!
                  </div>
                )}

                {result && !isDisabled && (
                  <div
                    className={`mt-2 text-xs ${theme.textSecondary} flex justify-between items-center`}
                  >
                    <span>
                      {result.length} chars • {new Blob([result]).size} bytes
                    </span>
                    {analysis && (
                      <span
                        className={`text-${analysis.color}-400 font-semibold`}
                      >
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
