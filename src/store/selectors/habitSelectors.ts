import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { Habit } from '../slices/habitSlice';

const selectHabits = (state: RootState) => state.habit.habits;

export const selectToday = (_state: RootState) =>
  new Date().toISOString().split('T')[0];

export const selectStats = createSelector(
  [selectHabits, selectToday],
  (habits, today) => {
    const totalCount = habits.length;
    const completedCount = habits.filter((h: Habit) =>
      h.completedDates.includes(today)
    ).length;
    const progress =
      totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    return { totalCount, completedCount, progress };
  }
);

export const selectIncompleteHabits = createSelector(
  [selectHabits, selectToday],
  (habits, today) =>
    habits.filter((h: Habit) => !h.completedDates.includes(today))
);

export const selectActivityData = createSelector([selectHabits], (habits) => {
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  return last7Days.map((date) => ({
    day: new Date(date).toLocaleDateString('ru-RU', { weekday: 'short' }),
    count: habits.filter((h: Habit) => h.completedDates.includes(date)).length,
    date,
  }));
});

export const getStreak = (dates: string[]): number => {
  if (dates.length === 0) return 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  if (!dates.includes(today) && !dates.includes(yesterdayStr)) return 0;
  let streak = 0;
  let curr = new Date();
  if (!dates.includes(today)) curr.setDate(curr.getDate() - 1);
  while (true) {
    const s = curr.toISOString().split('T')[0];
    if (dates.includes(s)) {
      streak++;
      curr.setDate(curr.getDate() - 1);
    } else break;
  }
  return streak;
};
