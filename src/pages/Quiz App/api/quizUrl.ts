export const BASE_URL = 'https://opentdb.com/api.php';

export interface QuizParams {
  amount?: number;
  category?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'multiple' | 'boolean';
}

export const ENDPOINTS = {
  questions: ({
    amount = 10,
    category = 18,
    difficulty = 'medium',
    type = 'multiple',
  }: QuizParams = {}): string =>
    `${BASE_URL}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`,
};
