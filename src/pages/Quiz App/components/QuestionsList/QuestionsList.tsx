import type { Question } from '../../types/quiz';

interface QuestionsListProps {
  currentQuestion: Question;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
}

export function QuestionsList({
  currentQuestion,
  selectedAnswer,
  onAnswer,
}: QuestionsListProps) {
  return (
    <div className="bg-card/50 rounded-box-md p-lg mx-auto max-w-2xl shadow-md">
      <h2
        className="text-text-primary mb-xl text-center text-xl font-bold tracking-wide uppercase"
        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
      />

      {/**Ответы */}
      <div className="gap-spacing-md grid grid-cols-2">
        {currentQuestion.answers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          const isCorrect = answer === currentQuestion.correct_answer;
          const hasAnswered = selectedAnswer !== null;

          let borderStyle = 'border-border-color';
          let shadowStyle = 'hover:border-primary/50';

          if (hasAnswered) {
            if (isCorrect) {
              borderStyle = 'border-green-500';
              shadowStyle = 'shadow-[0_0_10px_rgba(34,197,94,0.5)]';
            } else if (isSelected && !isCorrect) {
              borderStyle = 'border-danger';
            }
          } else if (isSelected) {
            borderStyle = 'border-primary';
            shadowStyle = 'shadow-neon-blue';
          }

          return (
            <button
              key={index}
              onClick={() => !hasAnswered && onAnswer(answer)}
              disabled={hasAnswered}
              className={`p-md bg-main rounded-box-md text-text-primary relative flex items-center justify-between border-2 text-left font-medium transition-all duration-200 ${borderStyle} ${shadowStyle} ${!hasAnswered ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'} `}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />

              {/**Иконка галоки, если отвт верный и вопрос завершен */}
              {hasAnswered && isCorrect && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
