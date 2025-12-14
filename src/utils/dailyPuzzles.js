/**
 * Daily Puzzles System
 * Gamification with daily encoding challenges
 */

const STATS_KEY = "puzzle-stats";

export class DailyPuzzleSystem {
  /**
   * Generate a deterministic puzzle based on date
   */
  static getDailyPuzzle(date = new Date()) {
    const dateStr = date.toISOString().split("T")[0];
    const seed = this.hashCode(dateStr);

    // Use seed to select puzzle difficulty and encoder
    const difficulty = ["easy", "medium", "hard", "expert"][seed % 4];
    const puzzleTypes = this.getPuzzleTypes();
    const puzzleType = puzzleTypes[seed % puzzleTypes.length];

    return {
      id: `daily-${dateStr}`,
      date: dateStr,
      difficulty,
      type: puzzleType.type,
      title: puzzleType.title,
      description: puzzleType.description,
      encoderId: puzzleType.encoderId,
      encoderChain: puzzleType.encoderChain,
      message: this.selectMessage(seed, difficulty),
      hints: puzzleType.hints,
      points: this.getPoints(difficulty),
      timeLimit: puzzleType.timeLimit || null,
    };
  }

  /**
   * Get puzzle types
   */
  static getPuzzleTypes() {
    return [
      {
        type: "decode",
        title: "Decode the Secret",
        description: "Decode the given message",
        encoderId: "morse",
        hints: ["Look for dots and dashes", "Each letter has a unique pattern"],
      },
      {
        type: "identify",
        title: "Identify the Encoder",
        description: "Figure out which encoder was used",
        encoderId: null, // Random
        hints: ["Check the character patterns", "Look at the output format"],
      },
      {
        type: "chain",
        title: "Unravel the Chain",
        description: "Decode a message encoded with multiple encoders",
        encoderChain: ["binary", "base64"],
        hints: ["Work backwards", "Try reversible encoders"],
      },
      {
        type: "match",
        title: "Perfect Match",
        description: "Match the original message by encoding",
        encoderId: "caesar",
        hints: ["Try different parameters", "The shift value matters"],
      },
      {
        type: "speed",
        title: "Speed Challenge",
        description: "Encode as many messages as possible in 60 seconds",
        encoderId: null,
        timeLimit: 60,
        hints: ["Use keyboard shortcuts", "Copy quickly"],
      },
    ];
  }

  /**
   * Select message based on seed and difficulty
   */
  static selectMessage(seed, difficulty) {
    const messages = {
      easy: ["Hello", "Welcome", "Good day", "Thanks", "Goodbye"],
      medium: [
        "The quick brown fox",
        "Meet me at noon",
        "Secret message",
        "Password is secure",
        "Encryption works",
      ],
      hard: [
        "The treasure is buried beneath the old oak tree",
        "Agent Smith will arrive at midnight coordinates provided",
        "Decode this message to unlock the next level",
        "Only the wise can decipher ancient scripts",
      ],
      expert: [
        "In cryptography we trust but verify all transformations carefully",
        "The complexity of modern encoding ensures data security across networks",
        "Ancient ciphers meet cutting edge technology in this puzzle",
      ],
    };

    const pool = messages[difficulty] || messages.medium;
    return pool[seed % pool.length];
  }

  /**
   * Get points for difficulty
   */
  static getPoints(difficulty) {
    const pointsMap = {
      easy: 10,
      medium: 25,
      hard: 50,
      expert: 100,
    };

    return pointsMap[difficulty] || 25;
  }

  /**
   * Simple hash function for seeding
   */
  static hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  /**
   * Save puzzle completion
   */
  static savePuzzleCompletion(puzzleId, success, timeSpent, attempts) {
    const stats = this.getStats();

    const completion = {
      puzzleId,
      success,
      timeSpent,
      attempts,
      completedAt: Date.now(),
    };

    stats.completions.push(completion);

    if (success) {
      stats.totalPoints += this.getCurrentPuzzle().points;
      stats.solvedCount++;

      // Update streak
      this.updateStreak(stats);
    }

    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    return stats;
  }

  /**
   * Get player statistics
   */
  static getStats() {
    try {
      const data = localStorage.getItem(STATS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error("Failed to load puzzle stats:", error);
    }

    return {
      totalPoints: 0,
      solvedCount: 0,
      currentStreak: 0,
      longestStreak: 0,
      completions: [],
      achievements: [],
    };
  }

  /**
   * Update daily streak
   */
  static updateStreak(stats) {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    // Get last completion date
    const lastCompletion = stats.completions
      .filter((c) => c.success)
      .sort((a, b) => b.completedAt - a.completedAt)[1]; // Second to last (we just added one)

    if (lastCompletion) {
      const lastDate = new Date(lastCompletion.completedAt)
        .toISOString()
        .split("T")[0];

      if (lastDate === yesterday) {
        stats.currentStreak++;
      } else if (lastDate !== today) {
        stats.currentStreak = 1;
      }
    } else {
      stats.currentStreak = 1;
    }

    stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
  }

  /**
   * Check if today's puzzle is completed
   */
  static isTodayCompleted() {
    const stats = this.getStats();
    const today = new Date().toISOString().split("T")[0];
    const todayPuzzleId = `daily-${today}`;

    return stats.completions.some(
      (c) => c.puzzleId === todayPuzzleId && c.success
    );
  }

  /**
   * Get current puzzle
   */
  static getCurrentPuzzle() {
    return this.getDailyPuzzle();
  }

  /**
   * Check achievements
   */
  static checkAchievements(stats) {
    const achievements = [
      {
        id: "first-solve",
        name: "First Victory",
        description: "Solve your first puzzle",
        icon: "🏆",
        condition: () => stats.solvedCount >= 1,
      },
      {
        id: "streak-7",
        name: "Week Warrior",
        description: "Maintain a 7-day streak",
        icon: "🔥",
        condition: () => stats.currentStreak >= 7,
      },
      {
        id: "streak-30",
        name: "Monthly Master",
        description: "Maintain a 30-day streak",
        icon: "⭐",
        condition: () => stats.currentStreak >= 30,
      },
      {
        id: "points-100",
        name: "Century Club",
        description: "Earn 100 total points",
        icon: "💯",
        condition: () => stats.totalPoints >= 100,
      },
      {
        id: "points-500",
        name: "Point Master",
        description: "Earn 500 total points",
        icon: "💎",
        condition: () => stats.totalPoints >= 500,
      },
      {
        id: "solved-10",
        name: "Decoder",
        description: "Solve 10 puzzles",
        icon: "🔓",
        condition: () => stats.solvedCount >= 10,
      },
      {
        id: "solved-50",
        name: "Cryptographer",
        description: "Solve 50 puzzles",
        icon: "🎓",
        condition: () => stats.solvedCount >= 50,
      },
    ];

    const newAchievements = [];

    achievements.forEach((achievement) => {
      if (
        !stats.achievements.includes(achievement.id) &&
        achievement.condition()
      ) {
        stats.achievements.push(achievement.id);
        newAchievements.push(achievement);
      }
    });

    if (newAchievements.length > 0) {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    }

    return newAchievements;
  }

  /**
   * Get all achievements with locked/unlocked status
   */
  static getAllAchievements() {
    const stats = this.getStats();

    return [
      {
        id: "first-solve",
        name: "First Victory",
        description: "Solve your first puzzle",
        icon: "🏆",
        unlocked: stats.achievements.includes("first-solve"),
      },
      {
        id: "streak-7",
        name: "Week Warrior",
        description: "Maintain a 7-day streak",
        icon: "🔥",
        unlocked: stats.achievements.includes("streak-7"),
      },
      {
        id: "streak-30",
        name: "Monthly Master",
        description: "Maintain a 30-day streak",
        icon: "⭐",
        unlocked: stats.achievements.includes("streak-30"),
      },
      {
        id: "points-100",
        name: "Century Club",
        description: "Earn 100 total points",
        icon: "💯",
        unlocked: stats.achievements.includes("points-100"),
      },
      {
        id: "points-500",
        name: "Point Master",
        description: "Earn 500 total points",
        icon: "💎",
        unlocked: stats.achievements.includes("points-500"),
      },
      {
        id: "solved-10",
        name: "Decoder",
        description: "Solve 10 puzzles",
        icon: "🔓",
        unlocked: stats.achievements.includes("solved-10"),
      },
      {
        id: "solved-50",
        name: "Cryptographer",
        description: "Solve 50 puzzles",
        icon: "🎓",
        unlocked: stats.achievements.includes("solved-50"),
      },
    ];
  }

  /**
   * Get leaderboard position (percentile based on points)
   */
  static getLeaderboardPosition(stats) {
    // Since this is client-side only, we'll provide milestone-based rankings
    const milestones = [
      { points: 0, rank: "Beginner", percentile: 0 },
      { points: 50, rank: "Novice", percentile: 25 },
      { points: 100, rank: "Apprentice", percentile: 50 },
      { points: 250, rank: "Expert", percentile: 75 },
      { points: 500, rank: "Master", percentile: 90 },
      { points: 1000, rank: "Grand Master", percentile: 95 },
    ];

    for (let i = milestones.length - 1; i >= 0; i--) {
      if (stats.totalPoints >= milestones[i].points) {
        return milestones[i];
      }
    }

    return milestones[0];
  }
}
