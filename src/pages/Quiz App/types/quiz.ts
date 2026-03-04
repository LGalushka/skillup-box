export interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizResponse {
  response_code: number;
  results: QuizQuestion[];
}

export interface Question {
  question: string;
  correct_answer: string;

  answers: string[];
  isAnswered: boolean;
  selectedAnswer: string | null;
}

export interface DifficultyStats {
  played: number;
  correct: number;
}

export interface QuizStats {
  totalGames: number;
  totalScore: number;
  bestScore: number;
  byDifficulty: {
    easy: DifficultyStats;
    medium: DifficultyStats;
    hard: DifficultyStats;
  };
}

export const initialStats: QuizStats = {
  totalGames: 0,
  totalScore: 0,
  bestScore: 0,
  byDifficulty: {
    easy: { played: 0, correct: 0 },
    medium: { played: 0, correct: 0 },
    hard: { played: 0, correct: 0 },
  },
};
