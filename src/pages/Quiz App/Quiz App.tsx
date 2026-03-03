import { QuestionsList } from './components/QuestionsList/QuestionsList';
import { QuizHeader } from './components/QuizHeader/QuizHeader';
import { useQuiz } from './hooks/useQuiz';

export const QuizApp = () => {
  const {
    questions,
    currentIndex,
    selectedAnswer,
    status,
    score,
    timeLeft,
    loading,
    error,
    dispatch,
  } = useQuiz();

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answer: string) => {
    dispatch({ type: 'ANSWER', payload: answer });
    setTimeout(() => {
      dispatch({ type: 'NEXT' });
    }, 1500);
  };

  // Загрузка
  if (loading) return <p className="p-10 text-center">Загружаем вопросы...</p>;

  // Ошибка
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;

  // Игра идёт
  if (status === 'playing' && currentQuestion) {
    return (
      <div className="bg-main min-h-screen p-6">
        <QuizHeader questions={questions ?? []} currentIndex={currentIndex} />
        {/* Прогресс */}
        <p className="text-text-secondary mb-4 text-center">
          Вопрос {currentIndex + 1} из {questions.length} · ⏱️ {timeLeft}сек ·
          🏆 {score}
        </p>

        <QuestionsList
          currentQuestion={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
        />
      </div>
    );
  }

  // Результаты
  if (status === 'finished') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-white">Тест завершён!</h2>
        <p className="text-text-secondary">
          Твой счёт: {score} из {questions.length * 100}
        </p>
        <button
          className="bg-primary rounded-lg px-6 py-2 text-white"
          onClick={() => dispatch({ type: 'RESTART' })}
        >
          Играть снова
        </button>
      </div>
    );
  }

  // idle — вопросы ещё грузятся
  return <p className="p-10 text-center text-gray-500">Подготовка игры...</p>;
};
