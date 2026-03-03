import type { Question } from '../../types/quiz';

interface QuizHeaderProps {
  questions: Question[];
  currentIndex: number;
}
export function QuizHeader({ questions, currentIndex }: QuizHeaderProps) {
  const total = questions.length ?? 0;
  const progress = ((currentIndex + 1) / total) * 100;
  return (
    <>
      <header className="border-primary flex flex-col gap-1 border-l-4 pl-4">
        <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
          Quiz Game
        </h1>
        <p className="text-text-secondary mt-2 font-mono text-[10px] tracking-widest uppercase opacity-60">
          REACT JOURNEY • HARD MODE
        </p>
      </header>
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(to right, #3b82f6, #f97316)',
          }}
        />
      </div>
      <p className="text-text-secondary mt-2 text-center text-xs tracking-widest uppercase">
        Вопрос {currentIndex + 1} из {total}
      </p>
    </>
  );
}
