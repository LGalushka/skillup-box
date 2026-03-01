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
