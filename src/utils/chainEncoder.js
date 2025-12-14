/**
 * Chain Encoder
 * Apply multiple encodings in sequence
 */

export class ChainEncoder {
  /**
   * Apply a sequence of encoders to text
   * @param {string} text - Input text
   * @param {Array} encoders - Array of encoder objects
   * @param {number} caesarShift - Caesar cipher shift value
   * @returns {Object} - Result with intermediate steps
   */
  static encode(text, encoders, caesarShift = 13) {
    const steps = [];
    let current = text;

    for (let encoder of encoders) {
      try {
        // Handle Caesar cipher with custom shift
        if (encoder.id === "caesar") {
          current = encoder.encode(current, caesarShift);
        } else {
          current = encoder.encode(current);
        }

        steps.push({
          encoderId: encoder.id,
          encoderName: encoder.name,
          result: current,
        });
      } catch (error) {
        steps.push({
          encoderId: encoder.id,
          encoderName: encoder.name,
          result: `[Encoding failed: ${error.message}]`,
          error: true,
        });
        break;
      }
    }

    return {
      finalResult: current,
      steps,
    };
  }

  /**
   * Decode a chained encoding (only works with reversible encoders)
   * @param {string} text - Encoded text
   * @param {Array} encoders - Array of encoder objects (in reverse order)
   * @param {number} caesarShift - Caesar cipher shift value
   * @returns {Object} - Result with intermediate steps
   */
  static decode(text, encoders, caesarShift = 13) {
    const steps = [];
    let current = text;

    // Decode in reverse order
    const reverseEncoders = [...encoders].reverse();

    for (let encoder of reverseEncoders) {
      if (!encoder.reversible) {
        steps.push({
          encoderId: encoder.id,
          encoderName: encoder.name,
          result: `[${encoder.name} is not reversible]`,
          error: true,
        });
        break;
      }

      try {
        // Handle Caesar cipher with custom shift
        if (encoder.id === "caesar") {
          current = encoder.decode(current, caesarShift);
        } else {
          current = encoder.decode(current);
        }

        steps.push({
          encoderId: encoder.id,
          encoderName: encoder.name,
          result: current,
        });
      } catch (error) {
        steps.push({
          encoderId: encoder.id,
          encoderName: encoder.name,
          result: `[Decoding failed: ${error.message}]`,
          error: true,
        });
        break;
      }
    }

    return {
      finalResult: current,
      steps,
    };
  }

  /**
   * Check if a chain is reversible
   * @param {Array} encoders - Array of encoder objects
   * @returns {boolean} - True if all encoders are reversible
   */
  static isChainReversible(encoders) {
    return encoders.every((encoder) => encoder.reversible);
  }
}
