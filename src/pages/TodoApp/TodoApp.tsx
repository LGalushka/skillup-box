import { useMemo, useState } from 'react';

import {
  TodoFilter,
  TodoStats,
  TodoForm,
  TodoList,
  TodoHeader,
} from './components';

import { useTodos } from './hooks';

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
      <TodoHeader />
      {/* Статистика */}
      <TodoStats stats={stats} />
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
