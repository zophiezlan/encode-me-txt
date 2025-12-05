import { useState, useEffect } from 'react';
import { X, Lightbulb, Check, Trophy, TrendingUp, Award, Flame } from 'lucide-react';
import { DailyPuzzleSystem } from '../utils/dailyPuzzles.js';

const DailyPuzzle = ({ theme, onClose }) => {
  const [puzzle, setPuzzle] = useState(null);
  const [stats, setStats] = useState(DailyPuzzleSystem.getStats());
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [startTime] = useState(Date.now());
  const [completed, setCompleted] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [achievements, setAchievements] = useState(DailyPuzzleSystem.getAllAchievements());

  useEffect(() => {
    const dailyPuzzle = DailyPuzzleSystem.getCurrentPuzzle();
    setPuzzle(dailyPuzzle);
    setCompleted(DailyPuzzleSystem.isTodayCompleted());
  }, []);

  const checkAnswer = () => {
    if (!puzzle || !userAnswer) return;

    setAttempts(prev => prev + 1);

    // For now, simple check (would need actual encoding/decoding logic)
    const isCorrect = userAnswer.toLowerCase().trim() === puzzle.message.toLowerCase().trim();

    if (isCorrect) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const newStats = DailyPuzzleSystem.savePuzzleCompletion(puzzle.id, true, timeSpent, attempts + 1);

      setStats(newStats);
      setCompleted(true);

      // Check for new achievements
      const newAchievements = DailyPuzzleSystem.checkAchievements(newStats);
      if (newAchievements.length > 0) {
        alert(`🎉 New Achievement${newAchievements.length > 1 ? 's' : ''} Unlocked!\n${newAchievements.map(a => `${a.icon} ${a.name}`).join('\n')}`);
      }

      setAchievements(DailyPuzzleSystem.getAllAchievements());
    } else {
      alert('❌ Not quite right. Try again!');
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/30 border-green-400';
      case 'medium': return 'bg-yellow-500/30 border-yellow-400';
      case 'hard': return 'bg-orange-500/30 border-orange-400';
      case 'expert': return 'bg-red-500/30 border-red-400';
      default: return 'bg-white/20 border-white/30';
    }
  };

  const rank = DailyPuzzleSystem.getLeaderboardPosition(stats);

  if (!puzzle) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className={`${theme.cardBg} backdrop-blur-lg rounded-3xl p-6 max-w-md w-full border-2 ${theme.cardBorder}`}>
          <p className="text-center">Loading puzzle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`${theme.cardBg} backdrop-blur-lg rounded-3xl p-6 max-w-3xl w-full border-2 ${theme.cardBorder} shadow-2xl my-4 max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              🎮 Daily Encoding Puzzle
            </h2>
            <p className={`text-sm ${theme.textSecondary} mt-1`}>
              {new Date(puzzle.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
            <X size={24} />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-black/30 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.totalPoints}</div>
            <div className="text-xs text-white/60">Total Points</div>
          </div>
          <div className="bg-black/30 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.solvedCount}</div>
            <div className="text-xs text-white/60">Solved</div>
          </div>
          <div className="bg-black/30 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-orange-400 flex items-center justify-center gap-1">
              <Flame size={20} />
              {stats.currentStreak}
            </div>
            <div className="text-xs text-white/60">Day Streak</div>
          </div>
          <div className="bg-black/30 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-purple-400">{rank.rank}</div>
            <div className="text-xs text-white/60">Rank</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setShowStats(false)}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold ${
              !showStats ? 'bg-purple-500/30 border-2 border-purple-400' : 'bg-white/10'
            }`}
          >
            Today's Puzzle
          </button>
          <button
            onClick={() => setShowStats(true)}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold ${
              showStats ? 'bg-purple-500/30 border-2 border-purple-400' : 'bg-white/10'
            }`}
          >
            Achievements
          </button>
        </div>

        {!showStats ? (
          <>
            {/* Puzzle Content */}
            {completed ? (
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border-2 border-green-400/50 text-center mb-6">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold mb-2">Puzzle Complete!</h3>
                <p className="text-white/70 mb-4">
                  You've already solved today's puzzle. Come back tomorrow for a new challenge!
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <div>
                    <span className="text-green-400 font-bold">+{puzzle.points}</span> points earned
                  </div>
                  <div>•</div>
                  <div>
                    Solved in <span className="text-green-400 font-bold">{attempts}</span> attempt{attempts !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Puzzle Info */}
                <div className="bg-black/30 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{puzzle.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getDifficultyBg(puzzle.difficulty)}`}>
                        {puzzle.difficulty.toUpperCase()}
                      </span>
                      <span className="text-sm text-white/60">+{puzzle.points} pts</span>
                    </div>
                  </div>

                  <p className="text-white/80 mb-4">{puzzle.description}</p>

                  {/* Encoded Message */}
                  <div className="bg-white/10 rounded-lg p-4 mb-4">
                    <div className="text-sm font-semibold mb-2 text-white/60">Encoded Message:</div>
                    <div className="font-mono text-lg bg-black/30 p-3 rounded break-all">
                      {/* This would show the actual encoded message */}
                      <span className="text-purple-400">[Encoded message would appear here based on encoder]</span>
                    </div>
                  </div>

                  {/* Answer Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Your Answer:</label>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your decoded message..."
                      className={`w-full px-4 py-3 bg-white/20 border-2 border-white/30 rounded-lg ${theme.textPrimary} placeholder-white/50 focus:outline-none focus:border-purple-400`}
                      onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                    />
                  </div>

                  <button
                    onClick={checkAnswer}
                    disabled={!userAnswer}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Submit Answer
                  </button>

                  {attempts > 0 && (
                    <div className="mt-3 text-center text-sm text-white/60">
                      Attempts: {attempts}
                    </div>
                  )}
                </div>

                {/* Hints */}
                <div className="bg-black/30 rounded-xl p-4">
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="w-full flex items-center justify-between font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <Lightbulb size={20} className="text-yellow-400" />
                      Hints ({puzzle.hints.length})
                    </span>
                    <span>{showHints ? '▲' : '▼'}</span>
                  </button>

                  {showHints && (
                    <div className="mt-3 space-y-2">
                      {puzzle.hints.map((hint, i) => (
                        <div key={i} className="bg-white/10 rounded-lg p-3 text-sm">
                          <span className="text-yellow-400 font-bold mr-2">💡 Hint {i + 1}:</span>
                          {hint}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          /* Achievements */
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Trophy size={24} className="text-yellow-400" />
              Your Achievements
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`rounded-xl p-4 border-2 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/50'
                      : 'bg-black/30 border-white/20 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold">{achievement.name}</h4>
                      <p className="text-xs text-white/70">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Check size={20} className="text-green-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="bg-black/30 rounded-xl p-6 mt-6">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={20} />
                Your Progress
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Points Progress</span>
                    <span className="text-yellow-400 font-bold">{stats.totalPoints} / 1000</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all"
                      style={{ width: `${Math.min((stats.totalPoints / 1000) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Puzzles Solved</span>
                    <span className="text-green-400 font-bold">{stats.solvedCount} / 50</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
                      style={{ width: `${Math.min((stats.solvedCount / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <div className="text-2xl font-bold text-orange-400 flex items-center gap-2">
                      <Flame size={24} />
                      {stats.longestStreak}
                    </div>
                    <div className="text-xs text-white/60">Longest Streak</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400 flex items-center gap-2">
                      <Award size={24} />
                      {achievements.filter(a => a.unlocked).length}
                    </div>
                    <div className="text-xs text-white/60">Achievements</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyPuzzle;
