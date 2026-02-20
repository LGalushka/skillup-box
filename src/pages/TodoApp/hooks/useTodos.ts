// чтобы Todo был доступен везде

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export const useTodos = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>(
    'todoApp',
    []
  );

  const addTodo = useCallback(
    (title: string) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setTodos((prev) => [...prev, newTodo]);
    },
    [setTodos]
  );

  // удаление с подтверждением
  const deleteTask = useCallback(
    (id: string) => {
      const todoToDelete = todos.find((t) => t.id === id);
      if (!todoToDelete) return;

      const isConfirmed = window.confirm(
        `Удалить задачу "${todoToDelete.title}"?`
      );
      if (isConfirmed) {
        setTodos((currentTodos) =>
          currentTodos.filter((todo) => todo.id !== id)
        );
      }
    },
    [todos, setTodos]
  );

  // переключение статуса
  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      );
    },
    [setTodos]
  );

  // обновление (универсальное)
  const updateTodo = useCallback(
    (id: string, title: string) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, title } : todo
        )
      );
    },
    [setTodos]
  );

  // статистика (вычисляется только при изменении todos)
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(
      (t) => t.completed
    ).length;
    const active = total - completed;

    return {
      total,
      completed,
      active,
      percentCompleted: total
        ? Math.round((completed / total) * 100)
        : 0,
      percentActive: total
        ? Math.round((active / total) * 100)
        : 0,
    };
  }, [todos]);

  return {
    todos,
    stats,
    addTodo,
    deleteTask,
    toggleTodo,
    updateTodo,
  };
};
