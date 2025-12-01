/**
 * Audio Player Utility
 * Plays Morse code as audio beeps
 */

/**
 * Plays Morse code as audio
 * @param {string} morseCode - Morse code string with • (dot) and − (dash)
 * @returns {Promise<void>}
 */
export const playMorseSound = async (morseCode) => {
  if (!window.AudioContext && !window.webkitAudioContext) {
    console.warn('Web Audio API not supported');
    return;
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  const dotDuration = 0.08; // seconds
  const dashDuration = dotDuration * 3;
  const gapDuration = dotDuration;
  const frequency = 600; // Hz

  let currentTime = audioContext.currentTime;

  for (let char of morseCode) {
    if (char === '•') {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.frequency.value = frequency;
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Add envelope for smoother sound
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, currentTime + dotDuration);

      oscillator.start(currentTime);
      oscillator.stop(currentTime + dotDuration);
      currentTime += dotDuration + gapDuration;
    } else if (char === '−') {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.frequency.value = frequency;
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Add envelope for smoother sound
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, currentTime + dashDuration);

      oscillator.start(currentTime);
      oscillator.stop(currentTime + dashDuration);
      currentTime += dashDuration + gapDuration;
    } else if (char === ' ') {
      currentTime += gapDuration * 3;
    } else if (char === '/') {
      currentTime += gapDuration * 7; // Word separator
    }
  }

  return new Promise(resolve => {
    setTimeout(resolve, (currentTime - audioContext.currentTime) * 1000);
  });
};
