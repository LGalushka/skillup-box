import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { QuizParams } from '../../pages/Quiz App/api/quizUrl';
import { fetchQuizData } from '../../pages/Quiz App/api/quizAPI';
import type {
  QuizStats,
  Question,
  QuizQuestion,
} from '../../pages/Quiz App/types/quiz';

export const fetchQuizeThunk = createAsyncThunk<
  QuizQuestion[],
  QuizParams,
  { rejectValue: string }
>('quiz/fetchQuestions', async (params, { rejectWithValue, signal }) => {
  try {
    return await fetchQuizData(params, { signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    return rejectWithValue(
      err instanceof Error ? err.message : 'Ошибка загрузки'
    );
  }
});

type Status = 'idle' | 'playing' | 'finished';

interface QuizState {
  status: Status;
  questions: Question[];
  currentIndex: number;
  score: number;
  timeLeft: number;
  selectedAnswer: string | null;
  correctAnswers: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  loading: boolean;
  error: string | null;
  stats: QuizStats;
}

const initialState: QuizState = {
  status: 'idle',
  questions: [],
  currentIndex: 0,
  score: 0,
  timeLeft: 30,
  selectedAnswer: null,
  correctAnswers: 0,
  difficulty: 'medium',
  loading: false,
  error: null,
  stats: {
    totalGames: 0,
    totalScore: 0,
    bestScore: 0,
    byDifficulty: {
      easy: { played: 0, correct: 0 },
      medium: { played: 0, correct: 0 },
      hard: { played: 0, correct: 0 },
    },
  },
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<Question[]>) => {
      state.status = 'playing';
      state.questions = action.payload;
      state.currentIndex = 0;
      state.score = 0;
      state.timeLeft = 30;
      state.selectedAnswer = null;
      state.correctAnswers = 0;
    },
    answerQuestion: (state, action: PayloadAction<string>) => {
      if (state.selectedAnswer !== null) return;
      const isCorrect =
        action.payload === state.questions[state.currentIndex].correct_answer;
      state.selectedAnswer = action.payload;
      if (isCorrect) {
        state.score += 100;
        state.correctAnswers += 1;
      }
    },
    nextQuestion: (state) => {
      const isLast = state.currentIndex === state.questions.length - 1;
      if (isLast) {
        state.status = 'finished';
        return;
      }
      state.currentIndex += 1;
      state.selectedAnswer = null;
      state.timeLeft = 30;
    },
    tick: (state) => {
      if (state.status !== 'playing') return;
      if (state.timeLeft <= 1) {
        const isLast = state.currentIndex === state.questions.length - 1;
        if (isLast) {
          state.status = 'finished';
        } else {
          state.currentIndex += 1;
          state.selectedAnswer = null;
          state.timeLeft = 30;
        }
        return;
      }
      state.timeLeft -= 1;
    },
    restartGame: (state) => {
      state.status = 'idle';
      state.questions = [];
      state.currentIndex = 0;
      state.score = 0;
      state.timeLeft = 30;
      state.selectedAnswer = null;
      state.correctAnswers = 0;
      state.error = null;
    },
    setDifficulty: (state, action: PayloadAction<QuizState['difficulty']>) => {
      state.difficulty = action.payload;
    },
    saveStats: (state) => {
      const stats = state.stats;
      const diff = state.difficulty;
      stats.totalGames += 1;
      stats.totalScore += state.score;
      stats.bestScore = Math.max(stats.bestScore, state.score);
      if (diff && diff in stats.byDifficulty) {
        stats.byDifficulty[diff].played += state.questions.length;
        stats.byDifficulty[diff].correct += state.correctAnswers;
      }
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(fetchQuizeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.map((q) => ({
          question: q.question,
          correct_answer: q.correct_answer,
          answers: [...q.incorrect_answers, q.correct_answer].sort(
            () => Math.random() - 0.5
          ),
          isAnswered: false,
          selectedAnswer: null,
        }));
        state.status = 'playing';
      })
      .addCase(fetchQuizeThunk.rejected, (state, action) => {
        state.loading = false;
        if (action.error.name !== 'AbortError') {
          state.error = action.payload ?? 'Ошибка загрузки';
        }
      });
  },
});

export const {
  startGame,
  answerQuestion,
  nextQuestion,
  tick,
  restartGame,
  setDifficulty,
  saveStats,
} = quizSlice.actions;
export default quizSlice.reducer;
