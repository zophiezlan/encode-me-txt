import { useState, useEffect } from "react";
import { X, Plus, Trash2, Save, Check, Sparkles, Upload } from "lucide-react";
import { CustomEncoderManager } from "../utils/customEncoderManager.js";

const clearCustomEncoderParam = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete("customEncoder");
  window.history.replaceState({}, document.title, url.pathname + url.search);
};

const CustomEncoderBuilder = ({ theme, onClose, onSave }) => {
  const [encoderName, setEncoderName] = useState("");
  const [encoderEmoji, setEncoderEmoji] = useState("🎨");
  const [encoderDescription, setEncoderDescription] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [mapping, setMapping] = useState({});
  const [inputChar, setInputChar] = useState("");
  const [outputChar, setOutputChar] = useState("");
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [showTemplates, setShowTemplates] = useState(true);
  const [savedEncoders, setSavedEncoders] = useState(
    CustomEncoderManager.getEncoders(),
  );
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [importPreview, setImportPreview] = useState(null);
  const [importError, setImportError] = useState(null);
  const [toast, setToast] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addMapping = () => {
    if (inputChar && outputChar) {
      setMapping({
        ...mapping,
        [inputChar.toLowerCase()]: outputChar,
      });
      setInputChar("");
      setOutputChar("");
    }
  };

  const removeMapping = (key) => {
    const newMapping = { ...mapping };
    delete newMapping[key];
    setMapping(newMapping);
  };

  const testEncoder = () => {
    if (testInput && Object.keys(mapping).length > 0) {
      const { encode } = CustomEncoderManager.createEncoderFunctions(
        mapping,
        caseSensitive,
      );
      setTestOutput(encode(testInput));
    }
  };

  const saveEncoder = () => {
    try {
      const encoder = {
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        name: encoderName || "Custom Encoder",
        emoji: encoderEmoji,
        description: encoderDescription || "User-created encoder",
        mapping,
        caseSensitive,
        createdAt: Date.now(),
        tags: ["custom"],
      };

      CustomEncoderManager.saveEncoder(encoder);
      setSavedEncoders(CustomEncoderManager.getEncoders());

      if (onSave) {
        onSave(encoder);
      }

      // Reset form
      setEncoderName("");
      setEncoderDescription("");
      setMapping({});
      setTestInput("");
      setTestOutput("");
      showToast("✅ Custom encoder saved", "success");
    } catch (error) {
      showToast("❌ Error saving encoder: " + error.message, "error");
    }
  };

  const loadTemplate = (template) => {
    setEncoderName(template.name);
    setEncoderEmoji(template.emoji);
    setEncoderDescription(template.description);
    setMapping(template.mapping);
    setCaseSensitive(template.caseSensitive);
    setSelectedTemplate(template.id);
    setShowTemplates(false);
  };

  // Stage delete: the confirmation modal is rendered when pendingDeleteId is set.
  const deleteEncoder = (id) => setPendingDeleteId(id);

  const confirmDelete = () => {
    if (!pendingDeleteId) return;
    CustomEncoderManager.deleteEncoder(pendingDeleteId);
    setSavedEncoders(CustomEncoderManager.getEncoders());
    setPendingDeleteId(null);
    showToast("🗑️ Encoder deleted", "info");
  };

  const exportEncoder = (encoder) => {
    const encoded = CustomEncoderManager.exportEncoder(encoder);
    const url = `${window.location.origin}${window.location.pathname}?customEncoder=${encoded}`;

    navigator.clipboard.writeText(url);
    showToast("🔗 Shareable link copied to clipboard", "success");
  };

  // Build a preview (no save) when the URL contains a shared encoder. The user
  // must confirm via the modal before anything is persisted to localStorage.
  const stageImportFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("customEncoder");
    if (!encodedData) return;

    try {
      const candidate = CustomEncoderManager.decodeEncoderPayload(encodedData);
      setImportPreview(candidate);
      setImportError(null);
    } catch (error) {
      setImportPreview(null);
      setImportError(error.message);
    }
  };

  const confirmImport = () => {
    if (!importPreview) return;
    try {
      CustomEncoderManager.saveEncoder(importPreview);
      setSavedEncoders(CustomEncoderManager.getEncoders());
      setImportPreview(null);
      setImportError(null);
      clearCustomEncoderParam();
      if (onSave) onSave(importPreview);
    } catch (error) {
      setImportError(error.message);
    }
  };

  const cancelImport = () => {
    setImportPreview(null);
    setImportError(null);
    clearCustomEncoderParam();
  };

  useEffect(() => {
    stageImportFromUrl();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-md">
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[70] px-4 py-2 rounded-lg shadow-2xl text-sm font-semibold backdrop-blur-lg border-2 ${
            toast.type === "success"
              ? "bg-green-500/30 border-green-400/50 text-green-100"
              : toast.type === "error"
                ? "bg-red-500/30 border-red-400/50 text-red-100"
                : "bg-white/20 border-white/40 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
      {pendingDeleteId && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-confirm-title"
        >
          <div
            className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-5 md:p-6 max-w-md w-full border-2 ${theme.cardBorder} shadow-2xl`}
          >
            <h3
              id="delete-confirm-title"
              className="mb-3 text-lg font-bold md:text-xl"
            >
              🗑️ Delete this custom encoder?
            </h3>
            <p className="mb-4 text-sm opacity-80">
              This action cannot be undone. The encoder will be removed from
              local storage.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPendingDeleteId(null)}
                className="flex-1 px-4 py-2 font-semibold rounded-lg bg-white/10 hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 font-semibold rounded-lg bg-red-500/30 hover:bg-red-500/40 border-2 border-red-400/50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {(importPreview || importError) && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="import-preview-title"
        >
          <div
            className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-5 md:p-6 max-w-md w-full border-2 ${theme.cardBorder} shadow-2xl`}
          >
            <h3
              id="import-preview-title"
              className="mb-3 text-lg font-bold md:text-xl"
            >
              {importPreview ? "🔗 Import shared encoder?" : "⚠️ Import failed"}
            </h3>
            {importPreview ? (
              <>
                <p className="mb-4 text-sm opacity-80">
                  Someone shared a custom encoder with you via this URL. Review
                  it before adding to your saved encoders.
                </p>
                <div className="p-4 mb-4 space-y-2 rounded-lg bg-black/30">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {importPreview.emoji || "🎨"}
                    </span>
                    <span className="font-semibold">{importPreview.name}</span>
                  </div>
                  {importPreview.description && (
                    <p className="text-xs opacity-80">
                      {importPreview.description}
                    </p>
                  )}
                  <div className="text-xs opacity-70">
                    {Object.keys(importPreview.mapping || {}).length} character
                    mapping(s) · case-
                    {importPreview.caseSensitive ? "sensitive" : "insensitive"}
                  </div>
                  <div className="font-mono text-xs break-all opacity-70 max-h-24 overflow-y-auto">
                    {Object.entries(importPreview.mapping || {})
                      .slice(0, 10)
                      .map(([k, v]) => `'${k}' → '${v}'`)
                      .join(", ")}
                    {Object.keys(importPreview.mapping || {}).length > 10 &&
                      " …"}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={cancelImport}
                    className="flex-1 px-4 py-2 font-semibold rounded-lg bg-white/10 hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmImport}
                    className="flex-1 px-4 py-2 font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  >
                    Import
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-4 text-sm opacity-80">{importError}</p>
                <button
                  onClick={cancelImport}
                  className="w-full px-4 py-2 font-semibold rounded-lg bg-white/10 hover:bg-white/20"
                >
                  Dismiss
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <div
        className={`${theme.cardBg} backdrop-blur-lg rounded-3xl p-4 md:p-6 max-w-4xl w-full border-2 ${theme.cardBorder} shadow-2xl my-4 max-h-[90vh] overflow-y-auto overflow-x-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-xl font-bold md:text-3xl">
            🔧 Custom Encoder Builder
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/20"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Builder Form */}
          <div className="space-y-4">
            <h3 className="mb-4 text-xl font-bold">Create Your Encoder</h3>

            {/* Name and Emoji */}
            <div>
              <label className="block mb-2 text-sm font-semibold">
                Encoder Name
              </label>
              <input
                type="text"
                value={encoderName}
                onChange={(e) => setEncoderName(e.target.value)}
                placeholder="My Awesome Encoder"
                className={`w-full px-4 py-2 bg-white/20 border-2 border-white/30 rounded-lg ${theme.textPrimary} placeholder-white/50 focus:outline-none focus:border-purple-400`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Emoji
                </label>
                <input
                  type="text"
                  value={encoderEmoji}
                  onChange={(e) => setEncoderEmoji(e.target.value)}
                  placeholder="🎨"
                  className={`w-full px-4 py-2 bg-white/20 border-2 border-white/30 rounded-lg ${theme.textPrimary} text-center text-2xl`}
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Case Sensitive
                </label>
                <button
                  onClick={() => setCaseSensitive(!caseSensitive)}
                  className={`w-full px-4 py-2 rounded-lg font-semibold ${
                    caseSensitive
                      ? "bg-green-500/30 border-2 border-green-400"
                      : "bg-white/20 border-2 border-white/30"
                  }`}
                >
                  {caseSensitive ? "Yes" : "No"}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">
                Description
              </label>
              <textarea
                value={encoderDescription}
                onChange={(e) => setEncoderDescription(e.target.value)}
                placeholder="Describe what your encoder does..."
                className={`w-full px-4 py-2 bg-white/20 border-2 border-white/30 rounded-lg ${theme.textPrimary} placeholder-white/50 focus:outline-none focus:border-purple-400`}
                rows={2}
              />
            </div>

            {/* Character Mapping */}
            <div className="w-full overflow-hidden">
              <label className="block mb-2 text-sm font-semibold">
                Character Mappings
              </label>
              <div className="flex flex-col gap-2 mb-2">
                <div className="grid grid-cols-[1fr_auto_1fr_auto] sm:flex sm:flex-nowrap items-center gap-2">
                  <input
                    type="text"
                    value={inputChar}
                    onChange={(e) => setInputChar(e.target.value)}
                    placeholder="In"
                    className={`w-full sm:flex-1 sm:min-w-[60px] px-3 py-2 bg-white/20 border-2 border-white/30 rounded-lg ${theme.textPrimary} placeholder-white/50 text-sm`}
                    maxLength={1}
                  />
                  <span className="flex items-center justify-center text-lg sm:text-2xl">
                    →
                  </span>
                  <input
                    type="text"
                    value={outputChar}
                    onChange={(e) => setOutputChar(e.target.value)}
                    placeholder="Out"
                    className={`w-full sm:flex-1 sm:min-w-[60px] px-3 py-2 bg-white/20 border-2 border-white/30 rounded-lg ${theme.textPrimary} placeholder-white/50 text-sm`}
                  />
                  <button
                    onClick={addMapping}
                    className="flex-shrink-0 px-3 py-2 rounded-lg bg-green-500/30 hover:bg-green-500/50"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Mapping List */}
              <div className="p-3 overflow-x-hidden overflow-y-auto rounded-lg bg-black/30 max-h-40">
                {Object.keys(mapping).length === 0 ? (
                  <p className="py-2 text-sm text-center text-white/50">
                    No mappings yet
                  </p>
                ) : (
                  <div className="space-y-1">
                    {Object.entries(mapping).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded bg-white/10"
                      >
                        <span className="flex-1 min-w-0 font-mono text-sm truncate">
                          '{key}' → '{value}'
                        </span>
                        <button
                          onClick={() => removeMapping(key)}
                          className="flex-shrink-0 text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Test Section */}
            <div>
              <label className="block mb-2 text-sm font-semibold">
                Test Your Encoder
              </label>
              <input
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Type test text..."
                className={`w-full px-4 py-2 bg-white/20 border-2 border-white/30 rounded-lg ${theme.textPrimary} placeholder-white/50 mb-2`}
              />
              <button
                onClick={testEncoder}
                className="w-full px-4 py-2 mb-2 font-semibold rounded-lg bg-blue-500/30 hover:bg-blue-500/50"
              >
                Test Encoding
              </button>
              {testOutput && (
                <div className="p-3 font-mono text-sm break-all rounded-lg bg-black/30">
                  {testOutput}
                </div>
              )}
            </div>

            {/* Save Button */}
            <button
              onClick={saveEncoder}
              disabled={!encoderName || Object.keys(mapping).length === 0}
              className="flex items-center justify-center w-full gap-2 px-6 py-3 font-bold transition-all rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              Save Custom Encoder
            </button>
          </div>

          {/* Templates & Saved Encoders */}
          <div className="space-y-4">
            {/* Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowTemplates(true)}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold ${
                  showTemplates
                    ? "bg-purple-500/30 border-2 border-purple-400"
                    : "bg-white/10"
                }`}
              >
                <Sparkles size={16} className="inline mr-2" />
                Templates
              </button>
              <button
                onClick={() => setShowTemplates(false)}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold ${
                  !showTemplates
                    ? "bg-purple-500/30 border-2 border-purple-400"
                    : "bg-white/10"
                }`}
              >
                <Save size={16} className="inline mr-2" />
                My Encoders ({savedEncoders.length})
              </button>
            </div>

            {/* Content */}
            <div className="bg-black/20 rounded-lg p-4 max-h-[500px] overflow-y-auto">
              {showTemplates ? (
                <div className="space-y-2">
                  <h3 className="mb-3 text-lg font-bold">Pre-made Templates</h3>
                  {CustomEncoderManager.getTemplates().map((template) => (
                    <div
                      key={template.id}
                      className={`bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-all ${
                        selectedTemplate === template.id
                          ? "border-2 border-purple-400"
                          : ""
                      }`}
                      onClick={() => loadTemplate(template)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{template.emoji}</span>
                        <span className="text-sm font-semibold">
                          {template.name}
                        </span>
                        {selectedTemplate === template.id && (
                          <Check size={16} className="ml-auto text-green-400" />
                        )}
                      </div>
                      <p className="text-xs text-white/70">
                        {template.description}
                      </p>
                      <div className="flex gap-1 mt-2">
                        {template.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-purple-500/30 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="mb-3 text-lg font-bold">
                    Your Custom Encoders
                  </h3>
                  {savedEncoders.length === 0 ? (
                    <p className="py-4 text-sm text-center text-white/50">
                      No custom encoders yet. Create one!
                    </p>
                  ) : (
                    savedEncoders.map((encoder) => (
                      <div
                        key={encoder.id}
                        className="p-3 rounded-lg bg-white/10"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{encoder.emoji}</span>
                            <div>
                              <span className="block text-sm font-semibold">
                                {encoder.name}
                              </span>
                              <span className="text-xs text-white/60">
                                {Object.keys(encoder.mapping).length} mappings
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => exportEncoder(encoder)}
                              className="p-1 rounded hover:bg-white/20"
                              title="Share"
                            >
                              <Upload size={16} />
                            </button>
                            <button
                              onClick={() => deleteEncoder(encoder.id)}
                              className="p-1 text-red-400 rounded hover:bg-red-500/30"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-white/70">
                          {encoder.description}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomEncoderBuilder;
