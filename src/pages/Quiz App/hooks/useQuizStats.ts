import { useLocalStorageCoin } from '../../CryptoTrack/hooks/useLocalStorageCoin';
import { initialStats, type QuizStats } from '../types/quiz';

export function useQuizStats() {
  // useLocalStorageCoin уже читает и пишет в localStorage!
  const [stats, setStats] = useLocalStorageCoin<QuizStats>(
    'quiz-stats',
    initialStats
  );

  function saveResult(
    score: number,
    difficulty: 'easy' | 'medium' | 'hard',
    correct: number,
    total: number
  ) {
    setStats((prev) => ({
      totalGames: prev.totalGames + 1,
      totalScore: prev.totalScore + score,
      bestScore: Math.max(prev.bestScore, score),
      byDifficulty: {
        ...prev.byDifficulty,
        [difficulty]: {
          played: prev.byDifficulty[difficulty].played + total,
          correct: prev.byDifficulty[difficulty].correct + correct,
        },
      },
    }));
  }

  return { stats, saveResult };
}
