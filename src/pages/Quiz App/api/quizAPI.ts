import type { QuizQuestion, QuizResponse } from '../types/quiz';
import { ENDPOINTS, type QuizParams } from './quizUrl';

export const fetchQuizData = async (
  params: QuizParams = {},
  options: RequestInit = {}
): Promise<QuizQuestion[]> => {
  const url = ENDPOINTS.questions(params);

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status}`);
  }
  const data: QuizResponse = await response.json();
  if (data.response_code !== 0) {
    throw new Error('Вопросы не найдены');
  }

  return data.results;
};
