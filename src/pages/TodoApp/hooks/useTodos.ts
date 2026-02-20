// чтобы Todo был доступен везде

import { useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Todo } from '../types';

export const useTodos = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>(
    'todoApp',
    []
  );

  //состояние для модалки удаления внутри хука
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<{
      isOpen: boolean;
      todoId: string | null;
      todoTitle: string;
    }>({
      isOpen: false,
      todoId: null,
      todoTitle: '',
    });

  // функция которую вызовет кнопка удалить
  const requestDelete = useCallback(
    (id: string, title: string) => {
      setDeleteConfirmation({
        isOpen: true,
        todoId: id,
        todoTitle: title,
      });
    },
    []
  );

  const cancelDelete = useCallback(() => {
    setDeleteConfirmation({
      isOpen: false,
      todoId: null,
      todoTitle: '',
    });
  }, []);

  //финальное удаление
  const confirmDelete = useCallback(() => {
    setDeleteConfirmation((prev) => {
      if (!prev.todoId) return prev;
      setTodos((current) =>
        current.filter((t) => t.id !== prev.todoId)
      );
      return {
        isOpen: false,
        todoId: null,
        todoTitle: '',
      };
    });
  }, [setTodos]);

  const addTodo = useCallback(
    (title: string) => {
      if (!title.trim()) return;
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
      const trimmed = title.trim();
      if (!trimmed) return;

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? { ...todo, title: trimmed }
            : todo
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
    toggleTodo,
    updateTodo,
    deleteConfirmation,
    requestDelete,
    confirmDelete,
    cancelDelete,
  };
};
