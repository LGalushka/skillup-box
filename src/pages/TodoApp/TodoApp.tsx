import { useMemo, useState } from 'react';

import { TodoFilter } from './components/TodoFilter';
import { TodoStats } from './components/TodoStats';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import { useTodos } from './hooks/useTodos';

export type Filter = 'all' | 'active' | 'completed';

export const TodoApp = () => {
  const {
    todos,
    stats,
    addTodo,
    deleteTask,
    toggleTodo,
    updateTodo,
  } = useTodos();

  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');
  const [editId, setEditId] = useState<string | null>(null);

  // фильтруем задачи здесь
  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, filter]);

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
          onAdd={() => {
            addTodo(newTask);
            setNewTask('');
          }}
        />

        {/* Фильтры*/}
        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
        />
        {/* Список задач */}
        <TodoList
          todos={filteredTodos}
          filter={filter}
          editId={editId}
          onToggle={toggleTodo}
          onDelete={deleteTask}
          onEdit={setEditId}
          onUpdate={updateTodo}
          onCancel={() => setEditId(null)}
          onSave={() => setEditId(null)}
        />
      </div>
    </div>
  );
};
