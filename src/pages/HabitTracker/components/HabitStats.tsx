import { memo } from 'react';

interface HabitStatsProps {
  total: number;
  completed: number;
  progress: number;
}

export const HabitStats = memo(
  ({ total, completed, progress }: HabitStatsProps) => {
    return (
      <div className="bg-card border-border-color mb-8 rounded-2xl border p-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-text-primary text-xl font-bold">
              Твой прогресс
            </h2>
            <p className="text-text-secondary py-3 text-sm">
              Выполнено {completed} из {total} привычек
            </p>
          </div>
          <span className="text-text-primary text-2xl font-black">
            {progress}%
          </span>
        </div>
        {/**ПОлоса */}
        <div className="bg-secondary/30 h-3 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  }
);

HabitStats.displayName = 'HabitStats';
