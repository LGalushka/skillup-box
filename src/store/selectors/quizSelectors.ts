import type { RootState } from '..';

export const selectQuizStatus = (state: RootState) => state.quiz.status;
export const selectQuestions = (state: RootState) => state.quiz.questions;
export const selectSelectedAnswer = (state: RootState) =>
  state.quiz.selectedAnswer;
export const selectQuizLoading = (state: RootState) => state.quiz.loading;
export const selectQuizError = (state: RootState) => state.quiz.error;
export const selectCurrentIndex = (state: RootState) => state.quiz.currentIndex;
export const selectScore = (state: RootState) => state.quiz.score;
export const selectTimeLeft = (state: RootState) => state.quiz.timeLeft;
export const selectCorrectAnswers = (state: RootState) =>
  state.quiz.correctAnswers;
export const selectDifficulty = (state: RootState) => state.quiz.difficulty;
export const selectQuizStats = (state: RootState) => state.quiz.stats;
export const selectCurrentQuestion = (state: RootState) =>
  state.quiz.questions[state.quiz.currentIndex] ?? null;
