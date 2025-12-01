/**
 * History Manager
 * Manages encoding history with localStorage persistence
 */

const HISTORY_KEY = 'encoder-history';
const MAX_HISTORY = 50;

export class HistoryManager {
  static saveEntry(inputText, encoderId, encoderName, result, mode = 'encode') {
    const history = this.getHistory();
    const entry = {
      id: Date.now() + Math.random(),
      timestamp: Date.now(),
      inputText: inputText.substring(0, 100), // Truncate for storage
      encoderId,
      encoderName,
      result: result.substring(0, 200), // Truncate for storage
      mode
    };

    history.unshift(entry);

    // Keep only MAX_HISTORY entries
    if (history.length > MAX_HISTORY) {
      history.splice(MAX_HISTORY);
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return entry;
  }

  static getHistory() {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
  }

  static deleteEntry(entryId) {
    const history = this.getHistory();
    const filtered = history.filter(entry => entry.id !== entryId);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  }

  static getRecentEncoders(limit = 5) {
    const history = this.getHistory();
    const encoderCounts = {};

    history.forEach(entry => {
      encoderCounts[entry.encoderId] = (encoderCounts[entry.encoderId] || 0) + 1;
    });

    return Object.entries(encoderCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => id);
  }
}
