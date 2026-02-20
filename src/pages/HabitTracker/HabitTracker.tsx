import { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { HabitHeader } from './components';
import { CheckCircle, Circle, Flame } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  completedDates: string[];
}

export const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState<string>('');

  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits([
      ...habits,
      {
        id: crypto.randomUUID(),
        name: newHabit,
        completedDates: [],
      },
    ]);
    setNewHabit('');
  };

  const toggleHabit = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];

    setHabits(
      habits.map((item) => {
        if (item.id !== habitId) return item;
        const hasToday =
          item.completedDates.includes(today);
        return {
          ...item,
          completedDates: hasToday
            ? item.completedDates.filter((d) => d !== today)
            : [...item.completedDates, today],
        };
      })
    );
  };

  {
    /** Считаем streak сколько дней подряд */
  }
  const getStreak = (dates: string[]): number => {
    if (dates.length === 0) return 0;
    const sorted = [...dates].sort().reverse();
    const today = new Date().toISOString().split('T')[0];

    //если сегодня не отметила - streak  = 0
    if (!sorted.includes(today)) return 0;

    let streak = 1;
    let currentDate = new Date(today);

    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(currentDate);
      prevDate.setDate(prevDate.getDate() - 1);
      const prevDateStr = prevDate
        .toISOString()
        .split('T')[0];
      if (sorted.includes(prevDateStr)) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-8">
      <HabitHeader />

      {/* Форма добавления */}
      <div className="mb-8 flex gap-2">
        <Input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Новая привычка (например: Читать)"
          className="flex-1"
          onKeyDown={(e) => e.key === 'Enter' && addHabit()}
        />
        <Button
          onClick={addHabit}
          disabled={!newHabit.trim()}
        >
          Добавить
        </Button>
      </div>

      {/* Список привычек */}
      <div className="space-y-3">
        {habits.map((habit) => {
          const today = new Date()
            .toISOString()
            .split('T')[0];
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
                // Добавляем flex и gap для выравнивания
                className="min-w-120px flex items-center justify-center gap-2 transition-all"
              >
                {isDoneToday ? (
                  <>
                    {/* Используем CheckCircle вместо CheckCircle2 для более жирных линий */}
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
