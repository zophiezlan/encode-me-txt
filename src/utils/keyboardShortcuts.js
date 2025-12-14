/**
 * Keyboard Shortcuts
 * Global keyboard shortcut system
 */

export class KeyboardShortcuts {
  constructor() {
    this.shortcuts = new Map();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  /**
   * Register a keyboard shortcut
   * @param {string} key - Key combination (e.g., 'ctrl+s', 'cmd+k')
   * @param {Function} callback - Function to call
   * @param {string} description - Human-readable description
   */
  register(key, callback, description = "") {
    this.shortcuts.set(key.toLowerCase(), { callback, description });
  }

  /**
   * Unregister a keyboard shortcut
   * @param {string} key - Key combination
   */
  unregister(key) {
    this.shortcuts.delete(key.toLowerCase());
  }

  /**
   * Handle key press event
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeyPress(event) {
    const key = this.getKeyString(event);
    const shortcut = this.shortcuts.get(key);

    if (shortcut) {
      // Don't trigger if user is typing in an input/textarea
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      ) {
        // Allow only non-text shortcuts in inputs
        if (!event.ctrlKey && !event.metaKey && !event.altKey) {
          return;
        }
      }

      event.preventDefault();
      shortcut.callback(event);
    }
  }

  /**
   * Convert keyboard event to key string
   * @param {KeyboardEvent} event - Keyboard event
   * @returns {string} - Key string (e.g., 'ctrl+s')
   */
  getKeyString(event) {
    const parts = [];

    if (event.ctrlKey) parts.push("ctrl");
    if (event.altKey) parts.push("alt");
    if (event.shiftKey) parts.push("shift");
    if (event.metaKey) parts.push("cmd");

    // Add the main key
    if (
      event.key &&
      event.key !== "Control" &&
      event.key !== "Alt" &&
      event.key !== "Shift" &&
      event.key !== "Meta"
    ) {
      parts.push(event.key.toLowerCase());
    }

    return parts.join("+");
  }

  /**
   * Start listening for keyboard events
   */
  start() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  /**
   * Stop listening for keyboard events
   */
  stop() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  /**
   * Get all registered shortcuts
   * @returns {Array} - Array of shortcuts with descriptions
   */
  getAllShortcuts() {
    return Array.from(this.shortcuts.entries()).map(
      ([key, { description }]) => ({
        key,
        description,
      })
    );
  }
}

// Default shortcuts configuration
export const DEFAULT_SHORTCUTS = {
  "ctrl+k": "Focus search",
  "ctrl+shift+e": "Toggle encode/decode mode",
  "ctrl+shift+a": "Encode all",
  "ctrl+shift+c": "Toggle chain mode",
  "ctrl+shift+h": "Toggle history panel",
  "ctrl+shift+t": "Cycle theme",
  "ctrl+shift+?": "Show keyboard shortcuts help",
  escape: "Close modals/panels",
  "ctrl+/": "Toggle favorites panel",
};
