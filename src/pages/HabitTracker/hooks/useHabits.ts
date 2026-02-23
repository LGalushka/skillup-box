import { useMemo } from 'react';
import { useLocalStorageHabit } from './useLocalStorageHabit';

export interface Habit {
  id: string;
  name: string;
  completedDates: string[];
}

export const useHabits = () => {
  const [habits, setHabits] = useLocalStorageHabit<Habit[]>('habit', []);

  //добавление
  const addHabit = (name: string) => {
    if (!name.trim()) return;
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      completedDates: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  // Удаление
  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  //переключение
  const toggleHabit = (habitId: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;
        const hasToday = habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: hasToday
            ? habit.completedDates.filter((d) => d !== today)
            : [...habit.completedDates, today],
        };
      })
    );
  };

  const getStreak = (dates: string[]): number => {
    if (dates.length === 0) return 0;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayStr = yesterday.toISOString().split('T')[0];
    if (!dates.includes(today) && !dates.includes(yesterdayStr)) return 0;

    let streak = 0;

    let curr = new Date();

    if (!dates.includes(today)) {
      curr.setDate(curr.getDate() - 1);
    }
    while (true) {
      const s = curr.toISOString().split('T')[0];
      if (dates.includes(s)) {
        streak++;
        curr.setDate(curr.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  //редактирование
  const renameHabit = (id: string, newName: string) => {
    if (!newName.trim()) return;
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, name: newName } : habit
      )
    );
  };

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  //статистика
  const stats = useMemo(() => {
    const totalCount = habits.length;
    const completedCount = habits.filter((h) =>
      h.completedDates.includes(today)
    ).length;
    const progress =
      totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    return { totalCount, completedCount, progress };
  }, [habits, today]);

  //массив дат за последние 7 дней
  const last7Days = useMemo(() => {
    return [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });
  }, []);
  //Считаем активность для графика
  const activityData = useMemo(() => {
    return [...last7Days].map((date) => {
      const count = habits.filter((h) =>
        h.completedDates.includes(date)
      ).length;
      const dayName = new Date(date).toLocaleDateString('ru-RU', {
        weekday: 'short',
      });
      return { day: dayName, count, date };
    });
  }, [habits, last7Days]);

  return {
    habits,
    stats,
    activityData,
    last7Days,
    today,
    addHabit,
    deleteHabit,
    toggleHabit,
    getStreak,
    renameHabit,
  };
};
