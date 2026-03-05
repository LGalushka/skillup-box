import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Filter, Todo } from '../../pages/TodoApp/types';

interface TodoState {
  todos: Todo[];
  filter: Filter;
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: {
      prepare: (title: string) => {
        return {
          payload: {
            id: Date.now().toString(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      },
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TodoState['filter']>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
