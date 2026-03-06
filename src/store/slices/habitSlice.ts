import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Habit {
  id: string;
  name: string;
  completedDates: string[];
}

interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: 'habit',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<string>) => {
      const name = action.payload.trim();
      if (!name) return;
      state.habits.push({
        id: crypto.randomUUID(),
        name,
        completedDates: [],
      });
    },
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter((h) => h.id !== action.payload);
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (!habit) return;

      const { date } = action.payload;
      const index = habit.completedDates.indexOf(date);

      if (index >= 0) {
        habit.completedDates.splice(index, 1);
      } else {
        habit.completedDates.push(date);
      }
    },
    renameHabit: (
      state,
      action: PayloadAction<{ id: string; newName: string }>
    ) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (habit && action.payload.newName.trim()) {
        habit.name = action.payload.newName;
      }
    },
  },
});

export const { addHabit, deleteHabit, toggleHabit, renameHabit } =
  habitSlice.actions;
export default habitSlice.reducer;
