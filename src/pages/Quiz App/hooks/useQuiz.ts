import { useEffect, useReducer, useState } from 'react';
import { initialState, quizReducer } from './quizReducer';
import type { QuizParams } from '../api/quizUrl';
import { useAsyncResource } from '../../MovieSearch/hooks';
import type { Question, QuizQuestion } from '../types/quiz';
import { fetchQuizData } from '../api/quizAPI';

export function useQuiz(params: QuizParams = { amount: 10 }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [shouldLoad, setShouldLoad] = useState<boolean>(false);

  const {
    data: apiQuestions,
    loading,
    error,
  } = useAsyncResource<QuizQuestion[]>(
    (signal) => fetchQuizData(params, { signal }),
    [params.amount],
    shouldLoad
  );

  function startGame() {
    setShouldLoad(true);
  }

  useEffect(() => {
    if (!apiQuestions || apiQuestions.length === 0) return;

    const questions: Question[] = apiQuestions.map((q) => ({
      question: q.question,
      correct_answer: q.correct_answer,
      answers: [...q.incorrect_answers, q.correct_answer].sort(
        () => Math.random() - 0.5
      ),
      isAnswered: false,
      selectedAnswer: null,
    }));
    dispatch({ type: 'START', payload: questions });
  }, [apiQuestions]);

  useEffect(() => {
    if (state.status !== 'playing') return;
    if (state.selectedAnswer !== null) return;
    const timer = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);
    return () => clearInterval(timer);
  }, [state.status, state.selectedAnswer, state.currentIndex]);
  return {
    ...state,
    loading,
    error,
    dispatch,
    startGame,
  };
}
