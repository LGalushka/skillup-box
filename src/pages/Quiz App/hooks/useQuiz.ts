import { useEffect, useReducer } from 'react';
import { initialState, quizReducer } from './quizReducer';
import type { QuizParams } from '../api/quizUrl';
import { useAsyncResource } from '../../MovieSearch/hooks';
import type { Question, QuizQuestion } from '../types/quiz';
import { fetchQuizData } from '../api/quizAPI';

export function useQuiz(params: QuizParams = { amount: 10 }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const {
    data: apiQuestions,
    loading,
    error,
  } = useAsyncResource<QuizQuestion[]>(
    (signal) => fetchQuizData(params, { signal }),
    [params.amount, params.category, params.difficulty],
    state.status === 'idle'
  );

  useEffect(() => {
    if (apiQuestions && apiQuestions.length > 0) {
      // Берем только нужные поля
      const questions: Question[] = apiQuestions.map((q: any) => ({
        question: q.question,
        correct_answer: q.correct_answer,
        incorrect_answers: q.incorrect_answers,
      }));

      dispatch({ type: 'START', payload: questions });
    }
  }, [apiQuestions]);

  return {
    ...state,
    loading,
    error,
    dispatch,
  };
}
