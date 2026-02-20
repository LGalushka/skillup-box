import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TodoFilter } from './components/TodoFilter';
import { TodoStats } from './components/TodoStats';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type Filter = 'all' | 'active' | 'completed';

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todoApp');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todoApp', JSON.stringify(todos));
  }, [todos]);

  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');
  const [editId, setEditId] = useState<string | null>(null);

  const addTodo = () => {
    if (!newTask.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setTodos([...todos, newTodo]);
    setNewTask('');
  };

  const deleteTask = useCallback((id: string) => {
    const todoDelete = todos.find((t) => t.id === id);
    if (todoDelete) {
      const isConfirmed = window.confirm(
        `Вы уверены, что хотите удалить задачу "${todoDelete.title}"?`
      );
      if (isConfirmed) {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    }
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);

  const updateTodo = <K extends keyof Todo>(
    id: string,
    key: K,
    value: Todo[K]
  ) => {
    const update = todos.map((todo) =>
      todo.id === id ? { ...todo, [key]: value } : todo
    );
    setTodos(update);
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((item) => !item.completed);
      case 'completed':
        return todos.filter((item) => item.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleFilterChange = useCallback(
    (newFilter: Filter) => {
      setFilter(newFilter);
    },
    []
  );

  const handleSave = () => {
    setEditId(null);
  };

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(
      (item) => item.completed
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

  console.log(stats);

  return (
    <div className="p-lg mx-auto flex max-w-2xl flex-col gap-10">
      {' '}
      <header className="border-primary flex flex-col gap-1 border-l-4 pl-4">
        <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
          MY TASKS
        </h1>
        <p className="text-text-secondary font-mono text-[10px] tracking-widest uppercase opacity-60">
          REACT JOURNEY • УПРАВЛЕНИЕ ЗАДАЧАМИ
        </p>
      </header>
      {/* Статистика */}
      <TodoStats stats={stats} />
      {/* Поле ввода: УБИРАЕМ лишний фон-карточку, оставляем только Gap */}
      <div className="flex flex-col gap-6">
        <TodoForm
          newTodo={newTask}
          onTodoChange={setNewTask}
          onAdd={addTodo}
        />

        {/* Фильтры*/}
        <TodoFilter
          currentFilter={filter}
          onFilterChange={handleFilterChange}
        />
        {/* Список задач */}
        <TodoList
          todos={filteredTodos}
          filter={filter}
          editId={editId}
          onToggle={toggleTodo}
          onDelete={deleteTask}
          onEdit={setEditId}
          onUpdate={(id, title) =>
            updateTodo(id, 'title', title)
          }
          onCancel={() => setEditId(null)}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};
