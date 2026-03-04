import type { Question } from '../../types/quiz';

interface QuizHeaderProps {
  questions: Question[];
  currentIndex: number;
  timeLeft: number;
  score: number;
}

export function QuizHeader({
  questions,
  currentIndex,
  timeLeft,
  score,
}: QuizHeaderProps) {
  const total = questions?.length ?? 0;
  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

  return (
    <div className="mx-auto mb-6 max-w-2xl">
      {/* Заголовок */}
      <header className="border-primary mb-10 flex flex-col gap-1 border-l-4 pl-4">
        <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
          Quiz Game
        </h1>
        <p className="text-text-secondary font-mono text-[10px] tracking-widest uppercase opacity-60">
          REACT JOURNEY • HARD MODE
        </p>
      </header>

      {/* Прогресс в рамке — не на весь экран */}
      <div className="mx-auto max-w-2xl">
        <div className="border-border-color rounded-3xl border bg-gray-800/10 px-4 py-3">
          {/* Прогресс-бар */}
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(to right, #3b82f6, #f97316)',
              }}
            />
          </div>
        </div>
        {/* Текст под баром */}
        <div className="mt-2 flex items-center justify-center">
          <span className="text-text-secondary text-xs tracking-widest uppercase">
            Вопрос {currentIndex + 1} из {total}
          </span>
        </div>
      </div>
    </div>
  );
}
