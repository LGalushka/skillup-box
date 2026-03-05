import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Filter, Todo } from '../../pages/TodoApp/types';
import type { RootState } from '..';

interface TodoState {
  todos: Todo[];
  filter: Filter;
  deleteConfirmation: {
    isOpen: boolean;
    todoId: string | null;
    todoTitle: string;
  };
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  deleteConfirmation: {
    isOpen: false,
    todoId: null,
    todoTitle: '',
  },
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
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer: (state, action: PayloadAction<Todo>) => {
        if (!action.payload.title) return;
        state.todos.push(action.payload);
      },
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },

    setFilter: (state, action: PayloadAction<TodoState['filter']>) => {
      state.filter = action.payload;
    },
    requestDelete: (state, action: PayloadAction<Todo>) => {
      state.deleteConfirmation = {
        isOpen: true,
        todoId: action.payload.id,
        todoTitle: action.payload.title,
      };
    },
    confirmDelete: (state) => {
      state.todos = state.todos.filter(
        (t) => t.id !== state.deleteConfirmation.todoId
      );
      state.deleteConfirmation = initialState.deleteConfirmation;
    },
    cancelDelete: (state) => {
      state.deleteConfirmation = initialState.deleteConfirmation;
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const trimmed = action.payload.title.trim();
      if (!trimmed) return;
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) todo.title = action.payload.title;
    },
  },
});

export const selectTodos = (state: RootState) => state.todo.todos;
export const selectFilter = (state: RootState) => state.todo.filter;
export const selectDeleteConfirmation = (state: RootState) =>
  state.todo.deleteConfirmation;

export const selectStats = createSelector(selectTodos, (todos) => {
  const total = todos.length;
  const completed = todos.filter((t: Todo) => t.completed).length;
  const active = total - completed;
  return {
    total,
    completed,
    active,
    percentCompleted: total ? Math.round((completed / total) * 100) : 0,
    percentActive: total ? Math.round((active / total) * 100) : 0,
  };
});

export const selectFilteredTodos = createSelector(
  selectTodos,
  selectFilter,
  (todos, filter) => {
    switch (filter) {
      case 'active':
        return todos.filter((t: Todo) => !t.completed);
      case 'completed':
        return todos.filter((t: Todo) => t.completed);
      default:
        return todos;
    }
  }
);
export const {
  addTodo,
  toggleTodo,
  setFilter,
  requestDelete,
  confirmDelete,
  cancelDelete,
  updateTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
