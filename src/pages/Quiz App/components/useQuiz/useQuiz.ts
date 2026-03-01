import { useReducer, useState } from 'react';
import { initialState, quizReducer } from '../../hooks';

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //загрузка вопросов
}
