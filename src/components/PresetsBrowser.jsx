import { useState } from 'react';
import { EncodingPresetsManager } from '../utils/encodingPresets.js';

const PresetsBrowser = ({ theme, onClose, onLoadPreset }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('builtin'); // 'builtin' or 'custom'
  const [presets, setPresets] = useState(EncodingPresetsManager.getPresets());
  const builtinPresets = EncodingPresetsManager.getBuiltInPresets();
  const mostUsed = EncodingPresetsManager.getMostUsed();

  const deletePreset = (id) => {
    if (confirm('Delete this preset?')) {
      EncodingPresetsManager.deletePreset(id);
      setPresets(EncodingPresetsManager.getPresets());
    }
  };

  const loadPreset = (preset) => {
    EncodingPresetsManager.trackUsage(preset.id);
    if (onLoadPreset) {
      onLoadPreset(preset);
    }
  };

  const exportPreset = (preset) => {
    const encoded = EncodingPresetsManager.exportPreset(preset);
    const url = `${window.location.origin}${window.location.pathname}?preset=${encoded}`;

    navigator.clipboard.writeText(url);
    alert('🔗 Preset link copied to clipboard!');
  };

  const allPresets = selectedTab === 'builtin' ? builtinPresets : presets;
  const filteredPresets = searchQuery
    ? EncodingPresetsManager.searchPresets(searchQuery).filter(p =>
        selectedTab === 'builtin' ? p.builtin : !p.builtin
      )
    : allPresets;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`${theme.cardBg} backdrop-blur-lg rounded-3xl p-6 max-w-4xl w-full border-2 ${theme.cardBorder} shadow-2xl my-4 max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              📦 Encoding Presets
            </h2>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>
              Save and load your favorite encoder configurations
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search presets..."
              className={`w-full pl-10 pr-4 py-3 bg-white/20 border-2 border-white/30 rounded-xl ${theme.textPrimary} placeholder-white/50 focus:outline-none focus:border-purple-400`}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedTab('builtin')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedTab === 'builtin'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Sparkles size={18} className="inline mr-2" />
            Built-in ({builtinPresets.length})
          </button>
          <button
            onClick={() => setSelectedTab('custom')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedTab === 'custom'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Star size={18} className="inline mr-2" />
            My Presets ({presets.length})
          </button>
        </div>

        {/* Most Used */}
        {selectedTab === 'custom' && mostUsed.length > 0 && (
          <div className="mb-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border-2 border-yellow-400/50">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <TrendingUp size={18} />
              Most Used
            </h3>
            <div className="flex gap-2 flex-wrap">
              {mostUsed.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => loadPreset(preset)}
                  className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-sm transition-all"
                >
                  {preset.name} ({preset.usageCount}×)
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Presets Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredPresets.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-white/50">
                {searchQuery ? `No presets found for "${searchQuery}"` : 'No presets yet'}
              </p>
              {selectedTab === 'custom' && !searchQuery && (
                <p className="text-white/40 text-sm mt-2">
                  Create a preset by using Chain Mode and saving your favorite encoder sequences
                </p>
              )}
            </div>
          ) : (
            filteredPresets.map(preset => (
              <div
                key={preset.id}
                className="bg-white/10 hover:bg-white/15 rounded-xl p-4 transition-all border-2 border-transparent hover:border-purple-400/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{preset.name}</h3>
                    <p className="text-sm text-white/70 mb-2">{preset.description}</p>

                    {/* Encoder Chain Preview */}
                    <div className="flex gap-1 flex-wrap mb-2">
                      {preset.encoderIds.map((id, i) => (
                        <React.Fragment key={id}>
                          <span className="text-xs bg-purple-500/30 px-2 py-1 rounded-full font-mono">
                            {id}
                          </span>
                          {i < preset.encoderIds.length - 1 && (
                            <span className="text-white/50">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Tags */}
                    {preset.tags && preset.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {preset.tags.map(tag => (
                          <span key={tag} className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Metadata */}
                {!preset.builtin && (
                  <div className="text-xs text-white/50 mb-3 flex gap-3">
                    {preset.usageCount > 0 && (
                      <span>Used {preset.usageCount}×</span>
                    )}
                    {preset.createdAt && (
                      <span>Created {new Date(preset.createdAt).toLocaleDateString()}</span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => loadPreset(preset)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Play size={16} />
                    Load Preset
                  </button>

                  {!preset.builtin && (
                    <>
                      <button
                        onClick={() => exportPreset(preset)}
                        className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
                        title="Share"
                      >
                        <Upload size={16} />
                      </button>
                      <button
                        onClick={() => deletePreset(preset.id)}
                        className="px-3 py-2 bg-red-500/30 hover:bg-red-500/50 rounded-lg text-red-300"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Help Text */}
        {selectedTab === 'custom' && (
          <div className="mt-6 bg-blue-500/20 rounded-xl p-4 border-2 border-blue-400/50">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              💡 How to Create Presets
            </h4>
            <ul className="text-sm text-white/80 space-y-1">
              <li>• Use <strong>Chain Mode</strong> to combine multiple encoders</li>
              <li>• Configure your favorite encoder sequence</li>
              <li>• Click "Save as Preset" to store it (coming soon!)</li>
              <li>• Share presets with friends using the export button</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresetsBrowser;
