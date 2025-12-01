/**
 * Theme System
 * Provides multiple color themes for the application
 */

export const themes = {
  dark: {
    id: 'dark',
    name: 'Dark Purple',
    gradient: 'from-purple-900 via-blue-900 to-indigo-900',
    cardBg: 'bg-white/10',
    cardBorder: 'border-white/20',
    cardHover: 'hover:border-white/40',
    textPrimary: 'text-white',
    textSecondary: 'text-purple-200',
    buttonPrimary: 'from-pink-500 to-purple-500',
    buttonSecondary: 'from-blue-500 to-indigo-500',
    accent: 'purple-400'
  },
  light: {
    id: 'light',
    name: 'Light',
    gradient: 'from-blue-50 via-indigo-50 to-purple-50',
    cardBg: 'bg-white/80',
    cardBorder: 'border-gray-300',
    cardHover: 'hover:border-gray-400',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    buttonPrimary: 'from-pink-500 to-purple-500',
    buttonSecondary: 'from-blue-500 to-indigo-500',
    accent: 'purple-500'
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    gradient: 'from-pink-900 via-purple-900 to-cyan-900',
    cardBg: 'bg-black/40',
    cardBorder: 'border-cyan-500/50',
    cardHover: 'hover:border-pink-500/70',
    textPrimary: 'text-cyan-300',
    textSecondary: 'text-pink-300',
    buttonPrimary: 'from-cyan-500 to-pink-500',
    buttonSecondary: 'from-purple-500 to-cyan-500',
    accent: 'cyan-400'
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    gradient: 'from-blue-900 via-teal-800 to-green-900',
    cardBg: 'bg-teal-900/30',
    cardBorder: 'border-teal-400/30',
    cardHover: 'hover:border-teal-300/50',
    textPrimary: 'text-teal-50',
    textSecondary: 'text-teal-200',
    buttonPrimary: 'from-teal-500 to-blue-500',
    buttonSecondary: 'from-green-500 to-teal-500',
    accent: 'teal-400'
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    gradient: 'from-orange-900 via-red-800 to-pink-900',
    cardBg: 'bg-orange-900/20',
    cardBorder: 'border-orange-400/30',
    cardHover: 'hover:border-pink-400/50',
    textPrimary: 'text-orange-50',
    textSecondary: 'text-orange-200',
    buttonPrimary: 'from-orange-500 to-pink-500',
    buttonSecondary: 'from-red-500 to-orange-500',
    accent: 'orange-400'
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix',
    gradient: 'from-black via-green-950 to-black',
    cardBg: 'bg-green-950/20',
    cardBorder: 'border-green-500/50',
    cardHover: 'hover:border-green-400/70',
    textPrimary: 'text-green-400',
    textSecondary: 'text-green-300',
    buttonPrimary: 'from-green-600 to-green-400',
    buttonSecondary: 'from-lime-600 to-green-500',
    accent: 'green-400'
  }
};

export const getTheme = (themeId) => {
  return themes[themeId] || themes.dark;
};

export const saveTheme = (themeId) => {
  localStorage.setItem('encoder-theme', themeId);
};

export const loadTheme = () => {
  return localStorage.getItem('encoder-theme') || 'dark';
};
