import { useEffect } from 'react';
import { QuestionsList } from './components/QuestionsList/QuestionsList';
import { QuizHeader } from './components/QuizHeader/QuizHeader';
import { useQuiz } from './hooks/useQuiz';
import { useQuizStats } from './hooks/useQuizStats';

export const QuizApp = () => {
  const {
    questions,
    currentIndex,
    selectedAnswer,
    status,
    score,
    timeLeft,
    correctAnswers,
    loading,
    error,
    dispatch,
    startGame,
  } = useQuiz();

  const currentQuestion = questions[currentIndex];

  const { stats, saveResult } = useQuizStats();

  const handleAnswer = (answer: string) => {
    dispatch({ type: 'ANSWER', payload: answer });
    setTimeout(() => {
      dispatch({ type: 'NEXT' });
    }, 1500);
  };

  useEffect(() => {
    if (status === 'finished') {
      saveResult(score, 'medium', correctAnswers, questions.length);
    }
  }, [status]);

  return (
    <div className="bg-main min-h-screen p-6">
      <QuizHeader
        questions={questions ?? []}
        currentIndex={currentIndex}
        timeLeft={timeLeft}
        score={score}
      />

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
          <button
            className="bg-primary hover:bg-primary-hover rounded-lg px-8 py-3 font-bold text-white transition-colors"
            onClick={startGame}
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
          onAnswer={handleAnswer}
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
            onClick={startGame}
          >
            Играть снова
          </button>
        </div>
      )}
    </div>
  );
};
