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

  /**
   * Export history as JSON
   * @returns {string} - JSON string of the history
   */
  static exportAsJSON() {
    const history = this.getHistory();
    return JSON.stringify(history, null, 2);
  }

  /**
   * Export history as CSV
   * @returns {string} - CSV string of the history
   */
  static exportAsCSV() {
    const history = this.getHistory();
    if (history.length === 0) return '';

    const headers = ['Date', 'Time', 'Encoder', 'Mode', 'Input', 'Result'];
    const rows = history.map(entry => {
      const date = new Date(entry.timestamp);
      return [
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        entry.encoderName,
        entry.mode,
        `"${(entry.inputText || '').replace(/"/g, '""')}"`,
        `"${(entry.result || '').replace(/"/g, '""')}"`
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }

  /**
   * Download history as a file
   * @param {string} format - 'json' or 'csv'
   */
  static downloadHistory(format = 'json') {
    const content = format === 'csv' ? this.exportAsCSV() : this.exportAsJSON();
    const mimeType = format === 'csv' ? 'text/csv' : 'application/json';
    const filename = `encoding-history-${new Date().toISOString().split('T')[0]}.${format}`;

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Get usage statistics
   * @returns {Object} - Statistics about encoding history
   */
  static getStats() {
    const history = this.getHistory();
    const encoderCounts = {};
    const modeCounts = { encode: 0, decode: 0 };

    history.forEach(entry => {
      encoderCounts[entry.encoderName] = (encoderCounts[entry.encoderName] || 0) + 1;
      modeCounts[entry.mode] = (modeCounts[entry.mode] || 0) + 1;
    });

    const sortedEncoders = Object.entries(encoderCounts)
      .sort((a, b) => b[1] - a[1]);

    return {
      totalEncodings: history.length,
      encodeCount: modeCounts.encode,
      decodeCount: modeCounts.decode,
      topEncoders: sortedEncoders.slice(0, 5),
      uniqueEncoders: sortedEncoders.length
    };
  }
}
