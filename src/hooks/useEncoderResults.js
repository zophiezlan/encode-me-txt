import { useMemo } from "react";

/**
 * Computes the encode/decode result for every encoder, memoized on the inputs
 * that can change the output. Encoders that declare `paramsResolver` on their
 * config entry get their args resolved via the descriptor branch; `shuffle` is
 * the one remaining special case (it needs `allEncoders` to resolve IDs →
 * objects, since shuffle.js itself is now free of any encoderConfig import).
 */
export const useEncoderResults = ({
  inputText,
  mode,
  encoderParams,
  shuffleEncoders,
  allEncoders,
}) =>
  useMemo(() => {
    if (!inputText) return {};

    const results = {};

    allEncoders.forEach((encoder) => {
      try {
        if (encoder.paramsResolver) {
          const args = encoder.paramsResolver(encoderParams);
          if (mode === "decode") {
            results[encoder.id] = encoder.reversible
              ? encoder.decode(inputText, ...args)
              : "[Not reversible]";
          } else {
            results[encoder.id] = encoder.encode(inputText, ...args);
          }
          return;
        }

        if (mode === "decode") {
          results[encoder.id] = encoder.reversible
            ? encoder.decode(inputText)
            : "[Not reversible]";
          return;
        }

        if (encoder.id === "shuffle") {
          const shuffleTargets = shuffleEncoders
            .map((id) => allEncoders.find((e) => e.id === id))
            .filter((e) => e && e.id !== "shuffle");
          results[encoder.id] = encoder.encode(inputText, shuffleTargets);
          return;
        }

        results[encoder.id] = encoder.encode(inputText);
      } catch {
        results[encoder.id] = "[Error]";
      }
    });

    return results;
  }, [inputText, mode, encoderParams, shuffleEncoders, allEncoders]);
