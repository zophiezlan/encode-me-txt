import { useState, useEffect } from "react";
import {
  X,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Eye,
  BarChart3,
} from "lucide-react";
import { VisualEncodingFlow } from "../utils/visualEncodingFlow.js";

const VisualEncodingFlowViewer = ({
  theme,
  inputText,
  encoder,
  caesarShift,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(500); // ms per step
  const [showStats, setShowStats] = useState(true);
  const [flow, setFlow] = useState([]);

  useEffect(() => {
    if (inputText && encoder) {
      const generatedFlow = VisualEncodingFlow.generateFlow(
        inputText,
        encoder,
        caesarShift
      );
      setFlow(generatedFlow);
      setCurrentStep(0);
    }
  }, [inputText, encoder, caesarShift]);

  useEffect(() => {
    if (isPlaying && currentStep < flow.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 1, flow.length));
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentStep >= flow.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, flow.length, speed]);

  const togglePlay = () => {
    if (currentStep >= flow.length) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, flow.length));
    setIsPlaying(false);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setIsPlaying(false);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const frequencyData =
    flow.length > 0 ? VisualEncodingFlow.getTransformationFrequency(flow) : [];
  const groups = flow.length > 0 ? VisualEncodingFlow.groupByType(flow) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-md">
      <div
        className={`${theme.cardBg} backdrop-blur-lg rounded-3xl p-6 max-w-5xl w-full border-2 ${theme.cardBorder} shadow-2xl my-4 max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
              🎬 Visual Encoding Flow
            </h2>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>
              Watch how "{inputText}" transforms with{" "}
              <span className="font-semibold">{encoder?.name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/20"
          >
            <X size={24} />
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 mb-6 bg-black/30 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                title="Reset"
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={prevStep}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                title="Previous"
              >
                ←
              </button>
              <button
                onClick={togglePlay}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  isPlaying
                    ? "bg-yellow-500/30 border-2 border-yellow-400"
                    : "bg-green-500/30 border-2 border-green-400"
                }`}
              >
                {isPlaying ? (
                  <Pause size={20} className="inline" />
                ) : (
                  <Play size={20} className="inline" />
                )}
                {isPlaying ? " Pause" : " Play"}
              </button>
              <button
                onClick={nextStep}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                title="Next"
              >
                →
              </button>
              <button
                onClick={() => setCurrentStep(flow.length)}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                title="End"
              >
                <SkipForward size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowStats(!showStats)}
                className={`px-3 py-2 rounded-lg ${
                  showStats ? "bg-purple-500/30" : "bg-white/10"
                }`}
              >
                <BarChart3 size={20} />
              </button>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="px-3 py-2 text-sm border-2 rounded-lg bg-white/20 border-white/30"
              >
                <option value={1000}>Slow</option>
                <option value={500}>Normal</option>
                <option value={250}>Fast</option>
                <option value={100}>Very Fast</option>
              </select>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="w-full h-2 rounded-full bg-white/20">
              <div
                className="h-2 transition-all rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${(currentStep / flow.length) * 100}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-center text-white/60">
              Step {currentStep} / {flow.length}
              {currentStep === flow.length && " - Complete! ✨"}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Visualization */}
          <div>
            <h3 className="flex items-center gap-2 mb-3 text-lg font-bold">
              <Eye size={20} />
              Character Transformations
            </h3>

            <div className="p-4 overflow-y-auto bg-black/30 rounded-xl max-h-96">
              <div className="space-y-2">
                {flow.slice(0, currentStep).map((step, index) => {
                  const bgColor = VisualEncodingFlow.getCharTypeColor(step);

                  return (
                    <div
                      key={index}
                      className={`${bgColor} rounded-lg p-3 animate-fadeIn`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-white/60">
                            #{index + 1}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 font-mono text-lg rounded bg-black/30">
                              {step.original === " " ? "␣" : step.original}
                            </span>
                            <span className="text-xl">→</span>
                            <span className="px-3 py-1 font-mono text-lg rounded bg-black/30">
                              {step.encoded === " " ? "␣" : step.encoded}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {step.isLetter && (
                            <span className="text-xs bg-green-500/30 px-2 py-0.5 rounded-full">
                              Letter
                            </span>
                          )}
                          {step.isNumber && (
                            <span className="text-xs bg-blue-500/30 px-2 py-0.5 rounded-full">
                              Number
                            </span>
                          )}
                          {step.isPunctuation && (
                            <span className="text-xs bg-purple-500/30 px-2 py-0.5 rounded-full">
                              Punct
                            </span>
                          )}
                          {step.isSpace && (
                            <span className="text-xs bg-gray-500/30 px-2 py-0.5 rounded-full">
                              Space
                            </span>
                          )}
                        </div>
                      </div>

                      {step.encoded.length > 1 && (
                        <div className="mt-1 text-xs text-white/60">
                          Expanded: {step.original.length} →{" "}
                          {step.encoded.length} chars
                        </div>
                      )}
                    </div>
                  );
                })}

                {currentStep === 0 && (
                  <div className="py-8 text-center text-white/50">
                    <Play size={48} className="mx-auto mb-3 opacity-50" />
                    <p>Press Play to start the animation</p>
                  </div>
                )}
              </div>
            </div>

            {/* Final Result */}
            {currentStep === flow.length && (
              <div className="p-4 mt-4 border-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border-green-400/50">
                <div className="mb-2 text-sm font-semibold">
                  Final Encoded Result:
                </div>
                <div className="p-3 font-mono text-sm break-all rounded-lg bg-black/30">
                  {flow.map((step) => step.encoded).join("")}
                </div>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div>
            <h3 className="flex items-center gap-2 mb-3 text-lg font-bold">
              <BarChart3 size={20} />
              Statistics & Analysis
            </h3>

            {showStats && groups && (
              <div className="space-y-4">
                {/* Character Type Breakdown */}
                <div className="p-4 bg-black/30 rounded-xl">
                  <h4 className="mb-3 text-sm font-semibold">
                    Character Type Breakdown
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Letters</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-white/20">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{
                              width: `${
                                (groups.letters.length / flow.length) * 100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="w-8 text-xs text-white/60">
                          {groups.letters.length}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Numbers</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-white/20">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{
                              width: `${
                                (groups.numbers.length / flow.length) * 100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="w-8 text-xs text-white/60">
                          {groups.numbers.length}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Punctuation</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-white/20">
                          <div
                            className="h-2 bg-purple-500 rounded-full"
                            style={{
                              width: `${
                                (groups.punctuation.length / flow.length) * 100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="w-8 text-xs text-white/60">
                          {groups.punctuation.length}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Spaces</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-white/20">
                          <div
                            className="h-2 bg-gray-500 rounded-full"
                            style={{
                              width: `${
                                (groups.spaces.length / flow.length) * 100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="w-8 text-xs text-white/60">
                          {groups.spaces.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transformation Frequency */}
                <div className="p-4 bg-black/30 rounded-xl">
                  <h4 className="mb-3 text-sm font-semibold">
                    Most Common Transformations
                  </h4>
                  <div className="space-y-1 overflow-y-auto max-h-48">
                    {frequencyData.slice(0, 10).map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-2 py-1 text-xs rounded bg-white/10"
                      >
                        <span className="font-mono">{item.transform}</span>
                        <span className="text-white/60">×{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Size Analysis */}
                <div className="p-4 bg-black/30 rounded-xl">
                  <h4 className="mb-3 text-sm font-semibold">Size Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Input Length:</span>
                      <span className="font-mono">
                        {inputText.length} chars
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Output Length:</span>
                      <span className="font-mono">
                        {flow.reduce(
                          (sum, step) => sum + step.encoded.length,
                          0
                        )}{" "}
                        chars
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size Change:</span>
                      <span
                        className={`font-mono ${
                          flow.reduce(
                            (sum, step) => sum + step.encoded.length,
                            0
                          ) > inputText.length
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {flow.reduce(
                          (sum, step) => sum + step.encoded.length,
                          0
                        ) > inputText.length
                          ? "+"
                          : ""}
                        {flow.reduce(
                          (sum, step) => sum + step.encoded.length,
                          0
                        ) - inputText.length}{" "}
                        chars
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ratio:</span>
                      <span className="font-mono">
                        {(
                          flow.reduce(
                            (sum, step) => sum + step.encoded.length,
                            0
                          ) / inputText.length
                        ).toFixed(2)}
                        x
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualEncodingFlowViewer;
