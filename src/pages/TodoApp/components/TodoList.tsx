import { memo } from 'react';
import { type Filter } from '../TodoApp';
import type { Todo } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';
interface TodoListProps {
  todos: Todo[];
  filter: Filter;
  editId: string | null;
  onToggle: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  onEdit: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export const TodoList = memo(
  ({
    todos,
    filter,
    editId,
    onToggle,
    onDelete,
    onEdit,
    onUpdate,
    onCancel,
    onSave,
  }: TodoListProps) => {
    return (
      <ul className="flex flex-col gap-3 pb-20">
        {todos.length === 0 ? (
          <div className="border-border-color flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-12 opacity-50">
            <p className="text-sm font-medium">
              {filter === 'all'
                ? 'Ваш список дел пуст'
                : filter === 'active'
                  ? 'Нет активных задач'
                  : 'У вас нет завершенных дел'}
            </p>
            <span className="text-[10px] tracking-widest uppercase">
              Отличная работа!!!
            </span>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              item={todo}
              isEditing={editId === todo.id}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              onUpdate={onUpdate}
              onCancel={onCancel}
              onSave={onSave}
            />
          ))
        )}
      </ul>
    );
  }
);

TodoList.displayName = 'TodoList';
