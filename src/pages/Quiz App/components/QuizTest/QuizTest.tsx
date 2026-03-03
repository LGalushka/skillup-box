import { useQuiz } from '../../hooks/useQuiz';

export function QuizTest() {
  const {
    status,
    questions,
    currentIndex,
    score,
    timeLeft,
    selectedAnswer,
    loading,
    error,
    dispatch,
  } = useQuiz({ amount: 5 }); // возьмем 5 вопросов для теста

  // Логи прямо в консоль
  console.log('🎮 Статус:', status);
  console.log('📊 Вопросы:', questions);
  console.log('📍 Текущий индекс:', currentIndex);

  if (loading) return <div>⏳ Загрузка...</div>;
  if (error) return <div>❌ Ошибка: {error}</div>;
  if (status === 'idle') return <div>🔄 Ожидание...</div>;
  if (status === 'finished') {
    return (
      <div>
        <h2>✅ Игра окончена!</h2>
        <p>Счет: {score}</p>
        <button onClick={() => dispatch({ type: 'RESTART' })}>
          🔄 Сначала
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      {/* Заголовок */}
      <h2>
        🎯 Вопрос {currentIndex + 1} из {questions.length}
      </h2>
      <p>
        ⭐ Счет: {score} | ⏱️ Время: {timeLeft}с
      </p>

      {/* Вопрос */}
      <div dangerouslySetInnerHTML={{ __html: currentQ.question }} />

      {/* Ответы */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {[...currentQ.incorrect_answers, currentQ.correct_answer]
          .sort(() => Math.random() - 0.5)
          .map((answer, idx) => (
            <button
              key={idx}
              onClick={() => dispatch({ type: 'ANSWER', payload: answer })}
              disabled={selectedAnswer !== null}
              style={{
                padding: '10px',
                background:
                  selectedAnswer === answer
                    ? answer === currentQ.correct_answer
                      ? 'green'
                      : 'red'
                    : '#f0f0f0',
                color: selectedAnswer === answer ? 'white' : 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          ))}
      </div>

      {/* Кнопка далее */}
      {selectedAnswer && (
        <button
          onClick={() => dispatch({ type: 'NEXT' })}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {currentIndex === questions.length - 1 ? 'Завершить' : 'Далее →'}
        </button>
      )}
    </div>
  );
}
