import { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { HabitHeader } from './components';
import {
  CheckCircle,
  Circle,
  Flame,
  Trash2,
} from 'lucide-react';
import { useHabits } from './hooks';

export const HabitTracker = () => {
  const {
    habits,
    addHabit,
    deleteHabit,
    toggleHabit,
    getStreak,
  } = useHabits();
  const [newHabitName, setNewHabitName] =
    useState<string>('');

  const handleAdd = () => {
    if (!newHabitName.trim()) return;
    addHabit(newHabitName);
    setNewHabitName('');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-8">
      <HabitHeader />

      {/* Форма добавления */}
      <div className="mb-8 flex gap-2">
        <Input
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="Новая привычка..."
          className="flex-1"
          onKeyDown={(e) =>
            e.key === 'Enter' && handleAdd()
          }
        />
        <Button
          onClick={handleAdd}
          disabled={!newHabitName.trim()}
        >
          Добавить
        </Button>
      </div>

      {/* Список привычек */}
      <div className="space-y-3">
        {habits.map((habit) => {
          const isDoneToday =
            habit.completedDates.includes(today);
          const streak = getStreak(habit.completedDates);

          return (
            <div
              key={habit.id}
              className="bg-card border-border-color hover:border-primary/30 flex items-center gap-4 rounded-xl border p-4 transition-colors"
            >
              <span className="text-textPrimary flex-1 font-medium">
                {habit.name}
              </span>

              {/*Индикатор стрика */}
              <div className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1">
                <Flame
                  size={16}
                  className={`${streak > 0 ? 'animate-pulse text-orange-400' : 'text-textSecondary opacity-40'}`}
                  fill={
                    streak > 0 ? 'currentColor' : 'none'
                  }
                />
                <span
                  className={`text-sm font-semibold ${streak > 0 ? 'text-orange-400' : 'text-textSecondary'}`}
                >
                  {streak} {streak === 1 ? 'день' : 'дней'}
                </span>
              </div>

              <Button
                variant={
                  isDoneToday ? 'primary' : 'secondary'
                }
                onClick={() => toggleHabit(habit.id)}
                className="min-w-120px flex items-center justify-center gap-2 transition-all"
              >
                {isDoneToday ? (
                  <>
                    <CheckCircle
                      size={20}
                      fill="currentColor"
                      fillOpacity={0.2}
                    />
                    <span className="font-medium">
                      Отменить
                    </span>
                  </>
                ) : (
                  <>
                    {/* Делаем круг чуть жирнее или используем точку */}
                    <Circle
                      size={20}
                      strokeWidth={3}
                      className="opacity-50"
                    />
                    <span className="font-medium">
                      Готово
                    </span>
                  </>
                )}
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (confirm('Удалить эту привычку?')) {
                    deleteHabit(habit.id);
                  }
                }}
                className="text-text-secondary transition-colors hover:text-red-500"
              >
                <Trash2 size={20} />
              </Button>
            </div>
          );
        })}

        {habits.length === 0 && (
          <p className="text-textSecondary text-center">
            Добавь первую привычку! ✨
          </p>
        )}
      </div>
    </div>
  );
};
