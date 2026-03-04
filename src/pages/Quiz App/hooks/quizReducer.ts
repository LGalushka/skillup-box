import type { Question } from '../types/quiz';

// Состояние
type STATUS = 'idle' | 'playing' | 'finished';

interface QuizState {
  status: STATUS;
  questions: Question[];
  currentIndex: number;
  score: number;
  timeLeft: number;
  selectedAnswer: string | null;
  correctAnswers: number;
}

//Действия
type QuizAction =
  | { type: 'START'; payload: Question[] }
  | { type: 'ANSWER'; payload: string }
  | { type: 'NEXT' }
  | { type: 'TICK' }
  | { type: 'FINISH' }
  | { type: 'RESTART' };

export const initialState: QuizState = {
  status: 'idle',
  questions: [],
  currentIndex: 0,
  score: 0,
  timeLeft: 30,
  selectedAnswer: null,
  correctAnswers: 0,
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        status: 'playing',
        questions: action.payload,
        currentIndex: 0,
        score: 0,
        timeLeft: 30,
        selectedAnswer: null,
        correctAnswers: 0,
      };
    case 'ANSWER':
      if (state.selectedAnswer !== null) return state;
      const isCorrect =
        action.payload === state.questions[state.currentIndex].correct_answer;
      return {
        ...state,
        selectedAnswer: action.payload,
        score: isCorrect ? state.score + 100 : state.score,
        correctAnswers: isCorrect
          ? state.correctAnswers + 1
          : state.correctAnswers,
      };

    case 'NEXT':
      const isLast = state.currentIndex === state.questions.length - 1;
      if (isLast) {
        return { ...state, status: 'finished' };
      }
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        selectedAnswer: null,
        timeLeft: 30,
      };

    case 'TICK':
      if (state.status !== 'playing') return state;
      if (state.timeLeft <= 1) {
        const isLast = state.currentIndex === state.questions.length - 1;
        return isLast
          ? { ...state, status: 'finished' }
          : {
              ...state,
              currentIndex: state.currentIndex + 1,
              selectedAnswer: null,
              timeLeft: 30,
            };
      }
      return { ...state, timeLeft: state.timeLeft - 1 };

    case 'FINISH':
      return { ...state, status: 'finished' };

    case 'RESTART':
      return initialState;

    default:
      return state;
  }
}
