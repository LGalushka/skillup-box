import { useReducer } from 'react';
import { QuestionsList } from './components/QuestionsList/QuestionsList';
import { QuizHeader } from './components/QuizHeader/QuizHeader';
import { initialState, quizReducer } from './hooks';

export const QuizApp = () => {
  // 1. Инициализируем состояние через редьюсер
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Извлекаем нужные данные из state для удобства
  const { questions, currentIndex, selectedAnswer, status } = state;
  const currentQuestion = questions[currentIndex];

  // 2. Функция-обработчик для выбора ответа
  const handleAnswer = (answer: string) => {
    dispatch({ type: 'ANSWER', payload: answer });

    // Опционально: через 1.5 секунды переключаем на следующий вопрос
    setTimeout(() => {
      dispatch({ type: 'NEXT' });
    }, 1500);
  };

  // Если вопросы еще не загружены (статус idle)
  if (status === 'idle') {
    return (
      <div className="flex justify-center p-10">
        <button
          className="bg-primary p-md rounded-box-md text-white"
          onClick={() =>
            dispatch({
              type: 'START',
              payload: [] /* Сюда передайте массив Question[] */,
            })
          }
        >
          Начать тест
        </button>
      </div>
    );
  }

  return (
    <div className="bg-main p-spacing-md min-h-screen">
      {/* Передаем прогресс в хедер (например, номер вопроса) */}
      <QuizHeader />

      <main className="mt-lg">
        {currentQuestion && (
          <QuestionsList
            currentQuestion={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
          />
        )}
      </main>

      {/* Если тест окончен, можно показать результат */}
      {status === 'finished' && (
        <div className="text-text-light mt-xl text-center">
          <h2 className="text-xl">Тест завершен!</h2>
          <p>Ваш счет: {state.score}</p>
          <button onClick={() => dispatch({ type: 'RESTART' })}>
            Повторить
          </button>
        </div>
      )}
    </div>
  );
};
