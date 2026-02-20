import {
  CheckCircle2,
  Circle,
  EditIcon,
  Trash2Icon,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import type { Todo } from '../hooks/useTodos';
import { memo } from 'react';

interface TodoItemProps {
  item: Todo;
  isEditing: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export const TodoItem = memo(
  ({
    item,
    isEditing,
    onToggle,
    onDelete,
    onEdit,
    onUpdate,
    onCancel,
    onSave,
  }: TodoItemProps) => {
    console.log(`Рендер задачи: ${item.title}`);

    return (
      <li
        key={item.id}
        className="group border-border-color bg-card hover:border-primary/30 flex items-center gap-4 rounded-xl border p-4 transition-all hover:shadow-sm"
      >
        {isEditing ? (
          <>
            <Input
              type="text"
              value={item.title}
              onChange={(e) =>
                onUpdate(item.id, e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSave();
                if (e.key === 'Escape') onCancel();
              }}
            />
            <div className="flex gap-2">
              <Button onClick={onSave}>Сохранить</Button>
              <Button onClick={onCancel}>Отмена</Button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => onToggle(item.id)}
              className="text-primary transition-transform active:scale-90"
            >
              {item.completed ? (
                <CheckCircle2
                  size={22}
                  className="opacity-100"
                />
              ) : (
                <Circle size={22} className="opacity-30" />
              )}
            </button>

            <span
              className={`flex-1 text-sm font-medium transition-all ${
                item.completed
                  ? 'text-text-secondary line-through opacity-40'
                  : 'text-white'
              }`}
            >
              {item.title}
            </span>
            <Button
              variant="secondary"
              onClick={() => onEdit(item.id)}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            >
              <EditIcon
                size={16}
                className="stroke-[1.5px]"
              />
            </Button>
            <Button
              variant="secondary"
              onClick={() => onDelete(item.id)}
              className="hover:bg-destructive opacity-0 transition-all group-hover:opacity-100 hover:text-white"
            >
              <Trash2Icon size={16} />
            </Button>
          </>
        )}
      </li>
    );
  }
);

TodoItem.displayName = 'TodoItem';
