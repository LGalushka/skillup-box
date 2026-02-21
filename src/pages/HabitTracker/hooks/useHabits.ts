import { useState } from 'react';
import { useLocalStorageHabit } from './useLocalStorageHabit';

useState;
interface Habit {
  id: string;
  name: string;
  completedDates: string[];
}

export const useHabits = () => {
  const [habits, setHabits] = useLocalStorageHabit<Habit[]>(
    'habit',
    []
  );

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
    setHabits((prev) =>
      prev.filter((habit) => habit.id !== id)
    );
  };

  //переключение
  const toggleHabit = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;
        const hasToday =
          habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: hasToday
            ? habit.completedDates.filter(
                (d) => d !== today
              )
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

    const yesterdayStr = yesterday
      .toISOString()
      .split('T')[0];
    if (
      !dates.includes(today) &&
      !dates.includes(yesterdayStr)
    )
      return 0;

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

  return {
    habits,
    addHabit,
    deleteHabit,
    toggleHabit,
    getStreak,
  };
};
