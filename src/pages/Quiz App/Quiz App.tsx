import { useEffect } from 'react';
import { QuestionsList } from './components/QuestionsList/QuestionsList';
import { QuizHeader } from './components/QuizHeader/QuizHeader';

import { QuizStatsBlock1 } from './components/QuizStatsBlock1/QuizStatsBlock1';
import { QuizStatsBlock2 } from './components/QuizStatsBlock2/QuizStatsBlock2';
import {
  fetchQuizeThunk,
  answerQuestion,
  nextQuestion,
  tick,
  restartGame,
  setDifficulty,
  saveStats,
} from '../../store/slices/quizSlice';

import {
  selectQuizStatus,
  selectQuestions,
  selectSelectedAnswer,
  selectCurrentIndex,
  selectScore,
  selectTimeLeft,
  selectDifficulty,
  selectQuizStats,
  selectCurrentQuestion,
  selectQuizLoading,
  selectQuizError,
} from '../../store/selectors/quizSelectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const QuizApp = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectQuizStatus);
  const questions = useAppSelector(selectQuestions);
  const selectedAnswer = useAppSelector(selectSelectedAnswer);
  const currentIndex = useAppSelector(selectCurrentIndex);
  const score = useAppSelector(selectScore);
  const timeLeft = useAppSelector(selectTimeLeft);

  const difficulty = useAppSelector(selectDifficulty);
  const stats = useAppSelector(selectQuizStats);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const loading = useAppSelector(selectQuizLoading);
  const error = useAppSelector(selectQuizError);

  useEffect(() => {
    if (status !== 'playing') return;
    if (selectedAnswer !== null) return;
    const timer = setInterval(() => {
      dispatch(tick());
    }, 1000);
    return () => clearInterval(timer);
  }, [status, selectedAnswer, currentIndex, dispatch]);

  useEffect(() => {
    if (status === 'finished') {
      dispatch(saveStats());
    }
  }, [status, dispatch]);

  const handelStartGame = () => {
    dispatch(restartGame());
    dispatch(fetchQuizeThunk({ amount: 10, difficulty }));
  };

  const handelAnswer = (answer: string) => {
    dispatch(answerQuestion(answer));
    setTimeout(() => {
      dispatch(nextQuestion());
    }, 1500);
  };

  return (
    <div className="bg-main min-h-screen p-6">
      <QuizHeader questions={questions ?? []} currentIndex={currentIndex} />

      {loading && (
        <div className="mt-20 flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-blue-500" />
          <p className="text-text-secondary text-sm">Загружаем вопросы...</p>
        </div>
      )}

      {!loading && status === 'idle' && (
        <div className="mt-20 flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-white">Готов к тесту?</h2>
          <p className="text-text-secondary text-sm">
            10 вопросов · 30 секунд на вопрос
          </p>

          {/* Выбор сложности */}
          <div className="flex gap-3">
            {(['easy', 'medium', 'hard'] as const).map((d) => (
              <button
                key={d}
                onClick={() => dispatch(setDifficulty(d))}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                  difficulty === d
                    ? d === 'easy'
                      ? 'bg-green-500 text-white'
                      : d === 'medium'
                        ? 'bg-orange-500 text-white'
                        : 'bg-red-500 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                {d === 'easy'
                  ? '😊 Лёгкий'
                  : d === 'medium'
                    ? '😤 Средний'
                    : '💀 Сложный'}
              </button>
            ))}
          </div>
          <button
            className="bg-primary hover:bg-primary-hover rounded-lg px-8 py-3 font-bold text-white transition-colors"
            onClick={handelStartGame}
          >
            Начать игру →
          </button>
        </div>
      )}

      {error && <p className="mt-10 text-center text-red-500">{error}</p>}

      {/* Прогресс */}
      <p className="text-text-secondary mt-6 mb-4 text-center">
        Вопрос {currentIndex + 1} из {questions.length} · ⏱️ {timeLeft}сек · 🏆{' '}
        {score}
      </p>

      {status === 'playing' && currentQuestion && (
        <QuestionsList
          currentQuestion={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswer={handelAnswer}
        />
      )}

      {status === 'finished' && (
        <div className="mt-10 flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-white">Тест завершён!</h2>
          <p className="text-text-secondary">
            Твой счёт: {score} из {questions.length * 100}
          </p>
          <button
            className="bg-primary rounded-lg px-6 py-2 text-white"
            onClick={handelStartGame}
          >
            Играть снова
          </button>
        </div>
      )}

      <QuizStatsBlock1 stats={stats} />

      <QuizStatsBlock2 stats={stats} totalQuestions={questions.length} />
    </div>
  );
};
