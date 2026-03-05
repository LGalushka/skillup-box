import { useState } from 'react';
import {
  addTodo,
  toggleTodo,
  setFilter,
  requestDelete,
  confirmDelete,
  updateTodo,
  cancelDelete,
} from '../../store/slices/todoSlice';

import {
  selectFilter,
  selectDeleteConfirmation,
  selectStats,
  selectFilteredTodos,
} from '../../store/slices/todoSlice';

import {
  TodoFilter,
  TodoStats,
  TodoForm,
  TodoList,
  TodoHeader,
  TodoConfirmModal,
} from './components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const TodoApp = () => {
  const dispatch = useAppDispatch();

  const filter = useAppSelector(selectFilter);
  const filteredTodos = useAppSelector(selectFilteredTodos);
  const stats = useAppSelector(selectStats);
  const deleteConfirmation = useAppSelector(selectDeleteConfirmation);

  const [newTask, setNewTask] = useState<string>('');
  const [editId, setEditId] = useState<string | null>(null);

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
            dispatch(addTodo(newTask));
            setNewTask('');
          }}
        />

        {/* Фильтры*/}
        <TodoFilter
          currentFilter={filter}
          onFilterChange={(f) => dispatch(setFilter(f))}
        />
        {/* Список задач */}
        <TodoList
          todos={filteredTodos}
          filter={filter}
          editId={editId}
          onToggle={(id) => dispatch(toggleTodo(id))}
          onDelete={(todo) => dispatch(requestDelete(todo))}
          onEdit={setEditId}
          onUpdate={(id, title) => dispatch(updateTodo({ id, title }))}
          onCancel={() => setEditId(null)}
          onSave={() => setEditId(null)}
        />
        {/**модальное окно */}
        <TodoConfirmModal
          isOpen={deleteConfirmation.isOpen}
          title={deleteConfirmation.todoTitle}
          onConfirm={() => dispatch(confirmDelete())}
          onCancel={() => dispatch(cancelDelete())}
        />
      </div>
    </div>
  );
};
