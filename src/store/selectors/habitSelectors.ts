import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { Habit } from '../slices/habitSlice';

const selectHabits = (state: RootState) => state.habit.habits;

export const selectToday = () => new Date().toISOString().split('T')[0];

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
