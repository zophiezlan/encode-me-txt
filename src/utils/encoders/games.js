/**
 * Game & Entertainment Encoders
 * Gaming, puzzles, and entertainment themed encodings
 */

/**
 * Tetris block encoding
 * @param {string} text - The text to encode
 * @returns {string} - Tetris block pattern
 */
export const encodeTetris = (text) => {
  const blocks = ['🟦I', '🟨O', '🟩S', '🟥Z', '🟪T', '🟧L', '🟫J'];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const block = blocks[code % blocks.length];
    const rotation = code % 4;
    return `${block}↻${rotation}`;
  }).join(' ');
};

/**
 * Poker hand encoding
 * @param {string} text - The text to encode
 * @returns {string} - Poker hand pattern
 */
export const encodePokerHand = (text) => {
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const suit = suits[code % suits.length];
    const rank = ranks[Math.floor(code / suits.length) % ranks.length];
    return `${rank}${suit}`;
  }).join(' ');
};

/**
 * Decode Poker hand
 */
export const decodePokerHand = (text) => {
  try {
    const suits = { '♠': 0, '♥': 1, '♦': 2, '♣': 3 };
    const ranks = { 'A': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7, '9': 8, '10': 9, 'J': 10, 'Q': 11, 'K': 12 };
    
    return text.split(' ').map(card => {
      const match = card.match(/^(10|[A2-9JQK])([♠♥♦♣])$/);
      if (!match) return '?';
      const suitVal = suits[match[2]];
      const rankVal = ranks[match[1]];
      return String.fromCharCode(suitVal + rankVal * 4);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * RPG stats encoding
 * @param {string} text - The text to encode
 * @returns {string} - RPG character stats
 */
export const encodeRPGStats = (text) => {
  const stats = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const stat = stats[code % stats.length];
    const value = (code % 20) + 1;
    return `${stat}:${value}`;
  }).join(' | ');
};

/**
 * Level/XP encoding
 * @param {string} text - The text to encode
 * @returns {string} - Level and XP format
 */
export const encodeLevelXP = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const level = (code % 100) + 1;
    const xp = code * 100;
    return `Lv.${level}(${xp}XP)`;
  }).join(' ');
};

/**
 * Achievement badge encoding
 * @param {string} text - The text to encode
 * @returns {string} - Achievement badges
 */
export const encodeAchievement = (text) => {
  const badges = ['🏆', '🥇', '🥈', '🥉', '🎖️', '🏅', '⭐', '💫'];
  const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const badge = badges[code % badges.length];
    const tier = tiers[Math.floor(code / badges.length) % tiers.length];
    return `${badge}${tier}`;
  }).join(' ');
};

/**
 * Health bar encoding
 * @param {string} text - The text to encode
 * @returns {string} - Health bar pattern
 */
export const encodeHealthBar = (text) => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const hp = code % 100;
    const maxHp = 100;
    const filled = Math.floor(hp / 10);
    const empty = 10 - filled;
    return `❤️[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${hp}/${maxHp}`;
  }).join('\n');
};

/**
 * Slot machine encoding
 * @param {string} text - The text to encode
 * @returns {string} - Slot machine pattern
 */
export const encodeSlotMachine = (text) => {
  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '7️⃣', '💎'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const s1 = symbols[code % symbols.length];
    const s2 = symbols[(code + 1) % symbols.length];
    const s3 = symbols[(code + 2) % symbols.length];
    return `[${s1}|${s2}|${s3}]`;
  }).join(' ');
};

/**
 * Crossword clue encoding
 * @param {string} text - The text to encode
 * @returns {string} - Crossword format
 */
export const encodeCrossword = (text) => {
  const directions = ['Across', 'Down'];
  return text.split('').map((char, i) => {
    const code = char.charCodeAt(0);
    const dir = directions[i % 2];
    return `${i + 1} ${dir}: Character ${code} (_)`;
  }).join('\n');
};

/**
 * Sudoku grid encoding
 * @param {string} text - The text to encode
 * @returns {string} - Sudoku-like grid
 */
export const encodeSudoku = (text) => {
  const result = [];
  for (let i = 0; i < text.length; i += 9) {
    const chunk = text.slice(i, i + 9).padEnd(9, ' ');
    const nums = chunk.split('').map(c => (c.charCodeAt(0) % 9) + 1);
    const row = nums.slice(0, 3).join(' ') + ' | ' + 
                nums.slice(3, 6).join(' ') + ' | ' + 
                nums.slice(6, 9).join(' ');
    result.push(row);
  }
  return result.join('\n');
};

/**
 * Pacman encoding
 * @param {string} text - The text to encode
 * @returns {string} - Pacman pattern
 */
export const encodePacman = (text) => {
  const items = ['ᗧ', '·', '●', '👻', '🍒', '🍓', '🍊', '🍎'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const item = items[code % items.length];
    return item;
  }).join('');
};

/**
 * Mario block encoding
 * @param {string} text - The text to encode
 * @returns {string} - Mario block pattern
 */
export const encodeMarioBlock = (text) => {
  const blocks = ['❓', '🟫', '🟨', '🟩', '🍄', '⭐', '🔥', '🪙'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const block = blocks[code % blocks.length];
    const coins = code % 10;
    return `${block}×${coins}`;
  }).join(' ');
};

/**
 * Rubik's cube encoding
 * @param {string} text - The text to encode
 * @returns {string} - Rubik's cube notation
 */
export const encodeRubiksCube = (text) => {
  const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
  const modifiers = ['', "'", '2'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const move = moves[code % moves.length];
    const mod = modifiers[Math.floor(code / moves.length) % modifiers.length];
    return `${move}${mod}`;
  }).join(' ');
};

/**
 * Decode Rubik's cube
 */
export const decodeRubiksCube = (text) => {
  try {
    const moveMap = { 'R': 0, 'L': 1, 'U': 2, 'D': 3, 'F': 4, 'B': 5 };
    const modMap = { '': 0, "'": 1, '2': 2 };
    
    return text.split(' ').map(move => {
      const m = move[0];
      const mod = move.slice(1) || '';
      const code = moveMap[m] + modMap[mod] * 6;
      return String.fromCharCode(code);
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Dungeon map encoding
 * @param {string} text - The text to encode
 * @returns {string} - Dungeon map symbols
 */
export const encodeDungeonMap = (text) => {
  const tiles = ['#', '.', '~', '^', '!', '$', '@', 'D', 'T', 'M'];
  const legend = {
    '#': 'wall', '.': 'floor', '~': 'water', '^': 'trap',
    '!': 'item', '$': 'gold', '@': 'hero', 'D': 'door', 'T': 'treasure', 'M': 'monster'
  };
  
  const lines = [];
  for (let i = 0; i < text.length; i += 8) {
    const chunk = text.slice(i, i + 8);
    const row = chunk.split('').map(c => tiles[c.charCodeAt(0) % tiles.length]).join('');
    lines.push(row);
  }
  return lines.join('\n');
};

/**
 * Pokemon type encoding
 * @param {string} text - The text to encode
 * @returns {string} - Pokemon type pattern
 */
export const encodePokemonType = (text) => {
  const types = ['🔥Fire', '💧Water', '🌿Grass', '⚡Electric', '🧊Ice', '👊Fighting',
                 '☠️Poison', '🌍Ground', '🦅Flying', '🔮Psychic', '🐛Bug', '🪨Rock',
                 '👻Ghost', '🐉Dragon', '😈Dark', '⚙️Steel', '🧚Fairy', '⭐Normal'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const type1 = types[code % types.length];
    const type2 = types[(code + 5) % types.length];
    return `${type1}/${type2}`;
  }).join(' ');
};

/**
 * Trading card encoding
 * @param {string} text - The text to encode
 * @returns {string} - Trading card format
 */
export const encodeTradingCard = (text) => {
  const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
  const cardTypes = ['Creature', 'Spell', 'Artifact', 'Enchantment', 'Land'];
  
  return text.split('').map((char, i) => {
    const code = char.charCodeAt(0);
    const rarity = rarities[code % rarities.length];
    const type = cardTypes[Math.floor(code / rarities.length) % cardTypes.length];
    return `[${rarity} ${type} #${code}]`;
  }).join(' ');
};

/**
 * Scoreboard encoding
 * @param {string} text - The text to encode
 * @returns {string} - Scoreboard format
 */
export const encodeScoreboard = (text) => {
  return text.split('').map((char, i) => {
    const code = char.charCodeAt(0);
    const score = code * 100;
    const rank = i + 1;
    return `#${rank}: ${score} pts`;
  }).join('\n');
};

/**
 * Controller input encoding
 * @param {string} text - The text to encode
 * @returns {string} - Controller buttons
 */
export const encodeControllerInput = (text) => {
  const buttons = ['🔼', '🔽', '◀️', '▶️', '🔴', '🔵', '🟢', '🟡', '🅰️', '🅱️', '✖️', '⭕'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    return buttons[code % buttons.length];
  }).join('');
};

/**
 * Inventory slot encoding
 * @param {string} text - The text to encode
 * @returns {string} - Inventory format
 */
export const encodeInventory = (text) => {
  const items = ['🗡️Sword', '🛡️Shield', '🧪Potion', '📜Scroll', '💍Ring', 
                 '🪄Wand', '🗝️Key', '💎Gem', '🪙Gold', '📦Box'];
  
  return text.split('').map((char, i) => {
    const code = char.charCodeAt(0);
    const item = items[code % items.length];
    const qty = (code % 10) + 1;
    return `[${i + 1}]${item}×${qty}`;
  }).join(' ');
};

/**
 * Quest log encoding
 * @param {string} text - The text to encode
 * @returns {string} - Quest format
 */
export const encodeQuestLog = (text) => {
  const types = ['Main', 'Side', 'Daily', 'Event', 'Legendary'];
  const statuses = ['🔴Active', '🟡In Progress', '🟢Complete', '⚫Failed'];
  
  return text.split('').map((char, i) => {
    const code = char.charCodeAt(0);
    const type = types[code % types.length];
    const status = statuses[Math.floor(code / types.length) % statuses.length];
    return `Quest #${i + 1} [${type}] ${status}`;
  }).join('\n');
};

/**
 * Skill tree encoding
 * @param {string} text - The text to encode
 * @returns {string} - Skill tree format
 */
export const encodeSkillTree = (text) => {
  const skills = ['⚔️Combat', '🛡️Defense', '🔥Magic', '🏃Speed', '💚Health', 
                  '🎯Accuracy', '💪Strength', '🧠Intelligence'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const skill = skills[code % skills.length];
    const level = (code % 10) + 1;
    const points = code % 5;
    return `${skill} Lv${level} [${points}/5⭐]`;
  }).join('\n');
};

/**
 * Mini-map encoding
 * @param {string} text - The text to encode
 * @returns {string} - Mini-map pattern
 */
export const encodeMiniMap = (text) => {
  const terrains = ['🟫', '🟩', '🟦', '🟨', '⬛', '⬜', '🟪', '🟥'];
  const markers = ['📍', '⭐', '❗', '❓', '🏠', '⚔️'];
  
  const lines = [];
  for (let i = 0; i < text.length; i += 5) {
    const chunk = text.slice(i, i + 5).padEnd(5, ' ');
    const row = chunk.split('').map(c => {
      const code = c.charCodeAt(0);
      const terrain = terrains[code % terrains.length];
      return terrain;
    }).join('');
    lines.push(row);
  }
  return lines.join('\n');
};

/**
 * Combo move encoding
 * @param {string} text - The text to encode
 * @returns {string} - Combo notation
 */
export const encodeComboMove = (text) => {
  const moves = ['↑', '↓', '←', '→', '↖', '↗', '↘', '↙', 'A', 'B', 'X', 'Y'];
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const move1 = moves[code % moves.length];
    const move2 = moves[(code + 3) % moves.length];
    const move3 = moves[(code + 7) % moves.length];
    return `${move1}+${move2}+${move3}`;
  }).join(' → ');
};

/**
 * Leaderboard encoding
 * @param {string} text - The text to encode
 * @returns {string} - Leaderboard format
 */
export const encodeLeaderboard = (text) => {
  const medals = ['🥇', '🥈', '🥉', '🏅', '🎖️'];
  
  return text.split('').map((char, i) => {
    const code = char.charCodeAt(0);
    const medal = i < 5 ? medals[i] : '  ';
    const score = code * 1000;
    return `${medal} Player_${code}: ${score.toLocaleString()}`;
  }).join('\n');
};
