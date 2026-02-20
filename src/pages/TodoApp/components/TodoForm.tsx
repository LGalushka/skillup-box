import { memo } from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  newTodo: string;
  onTodoChange: (e: string) => void;
  onAdd: () => void;
}

export const TodoForm = memo(
  ({ newTodo, onTodoChange, onAdd }: TodoFormProps) => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newTodo.trim()) {
            onAdd();
          }
        }}
        className="flex gap-3"
      >
        <Input
          autoFocus
          value={newTodo}
          placeholder="Что нужно сделать?..."
          className="border-border-color bg-card/50 focus:border-primary/50 h-12 flex-1 text-base"
          onChange={(e) => onTodoChange(e.target.value)}
        />
        <Button
          type="submit"
          disabled={!newTodo.trim()}
          className="shadow-primary/10 h-14 shadow-lg"
        >
          <Plus size={20} className="mr-2" /> Добавить
        </Button>
      </form>
    );
  }
);

TodoForm.displayName = 'TodoForm';
