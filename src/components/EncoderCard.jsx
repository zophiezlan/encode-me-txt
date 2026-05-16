import {
  Copy,
  Check,
  Share2,
  TrendingUp,
  Zap,
  Eye,
  Film,
} from "lucide-react";
import { categories } from "../utils/encoderConfig.js";
import { playMorseSound } from "../utils/audioPlayer.js";

const EncoderCard = ({
  // Data
  encoder,
  // State slices
  mode,
  encoderResults,
  encoderParams,
  copiedId,
  favorites,
  chainSequence,
  comparisonEncoders,
  shuffleEncoders,
  showChainMode,
  showShuffleMode,
  showComparison,
  theme,
  // Refs
  shuffleEncoderRef,
  // Handlers
  toggleFavorite,
  addToChain,
  removeFromChain,
  toggleShuffleEncoder,
  toggleComparison,
  handleShare,
  copyToClipboard,
  setSelectedAnalysis,
  setShowAnalysis,
  setVisualFlowEncoder,
  setShowVisualFlow,
  updateEncoderParam,
  analyzeEncoding,
}) => {
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
                    encoder.id,
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
        bg-black/30 rounded-lg p-2 md:p-3 font-mono text-xs min-h-[50px] flex items-center w-full overflow-x-auto
        ${
          encoder.id === "qr-code"
            ? "whitespace-pre leading-none text-[8px] md:text-[10px] justify-center"
            : "break-all"
        }
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
                parseInt(e.target.value),
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
                  "SECRET",
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
                parseInt(e.target.value),
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
                parseInt(e.target.value),
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
                  "SECRET",
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
                  "KEY",
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
                  "SECRET",
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
                  "KEYWORD",
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
                parseInt(e.target.value),
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
                parseInt(e.target.value),
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
                parseInt(e.target.value),
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
                parseInt(e.target.value),
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
                parseInt(e.target.value),
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
                parseInt(e.target.value),
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
                parseInt(e.target.value),
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
                parseInt(e.target.value),
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
                parseInt(e.target.value),
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
                parseInt(e.target.value),
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
                parseInt(e.target.value),
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
                  "KEYWORD",
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
                  "THEQUICKBROWNFOX",
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
                e.target.value.replace(/[^0-9]/g, "") || "31415",
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
                parseInt(e.target.value),
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
                  "SECRET",
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
                  "ZEBRA",
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
                parseInt(e.target.value),
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
                  "GERMAN",
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
                e.target.value || "The quick brown fox",
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
                  .slice(0, 8) || "ESTONAI",
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
                parseInt(e.target.value),
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
};

export default EncoderCard;
