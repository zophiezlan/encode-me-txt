/**
 * Share Manager
 * Handle shareable links and URL encoding
 */

export class ShareManager {
  /**
   * Create a shareable URL with encoded message
   * @param {string} text - Text to share
   * @param {string} encoderId - Encoder ID
   * @param {string} mode - 'encode' or 'decode'
   * @returns {string} - Shareable URL
   */
  static createShareableLink(text, encoderId, mode = 'encode') {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams({
      t: this.compressText(text),
      e: encoderId,
      m: mode
    });

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Parse shared link parameters
   * @returns {Object|null} - Parsed parameters or null
   */
  static parseSharedLink() {
    const params = new URLSearchParams(window.location.search);
    const text = params.get('t');
    const encoderId = params.get('e');
    const mode = params.get('m');

    if (text && encoderId) {
      return {
        text: this.decompressText(text),
        encoderId,
        mode: mode || 'encode'
      };
    }

    return null;
  }

  /**
   * Simple text compression using Base64
   * @param {string} text - Text to compress
   * @returns {string} - Compressed text
   */
  static compressText(text) {
    try {
      return btoa(encodeURIComponent(text));
    } catch {
      return text;
    }
  }

  /**
   * Decompress text from Base64
   * @param {string} compressed - Compressed text
   * @returns {string} - Decompressed text
   */
  static decompressText(compressed) {
    try {
      return decodeURIComponent(atob(compressed));
    } catch {
      return compressed;
    }
  }

  /**
   * Copy shareable link to clipboard
   * @param {string} url - URL to copy
   * @returns {Promise<boolean>} - Success status
   */
  static async copyShareLink(url) {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Share using Web Share API if available
   * @param {string} url - URL to share
   * @param {string} title - Share title
   * @returns {Promise<boolean>} - Success status
   */
  static async shareNative(url, title = 'Check out this encoded message!') {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url
        });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}
