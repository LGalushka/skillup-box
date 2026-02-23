import { memo, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

interface HabitFormProps {
  onAdd: (name: string) => void;
}

export const HabitForm = memo(({ onAdd }: HabitFormProps) => {
  const [text, setText] = useState<string>('');
  const handelAdd = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  };
  return (
    <div className="mb-8 flex gap-2">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новая привычка..."
        className="flex-1"
        onKeyDown={(e) => e.key === 'Enter' && handelAdd()}
      />
      <Button onClick={handelAdd} disabled={!text.trim()}>
        Добавить
      </Button>
    </div>
  );
});

HabitForm.displayName = 'HabitForm';
