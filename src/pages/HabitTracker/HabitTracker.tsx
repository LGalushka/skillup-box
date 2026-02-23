import { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { HabitHeader } from './components';
import { CheckCircle, Circle, Flame, Pencil, Trash2 } from 'lucide-react';
import { useHabits } from './hooks';
import { HabitCard } from './components/HabitCart';

export const HabitTracker = () => {
  const { habits, addHabit, deleteHabit, toggleHabit, getStreak, renameHabit } =
    useHabits();
  const [newHabitName, setNewHabitName] = useState<string>('');

  const [editingID, setEditingID] = useState<string | null>(null);
  const [tempName, setTempName] = useState<string>('');

  const startEditing = (id: string, currentName: string) => {
    setEditingID(id);
    setTempName(currentName);
  };

  const handleAdd = () => {
    if (!newHabitName.trim()) return;
    addHabit(newHabitName);
    setNewHabitName('');
  };

  const handelSave = (id: string) => {
    if (!tempName.trim()) {
      alert('Название не может быть пустым');
      return;
    }
    renameHabit(id, tempName);
    setEditingID(null);
  };

  const today = new Date().toISOString().split('T')[0];

  //статистика
  const totalCount = habits.length;
  const completedCount = habits.filter((h) =>
    h.completedDates.includes(today)
  ).length;
  const progress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getLast7Days = () => {
    return [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-8">
      <HabitHeader />

      <div className="bg-card border-border-color mb-8 rounded-2xl border p-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-text-primary text-xl font-bold">
              Твой прогресс
            </h2>
            <p className="text-text-secondary py-3 text-sm">
              Выполнено {completedCount} из {totalCount} привычек
            </p>
          </div>
          <span className="text-text-primary text-2xl font-black">
            {progress}%
          </span>
        </div>
        {/**ПОлоса */}
        <div className="bg-secondary/30 h-3 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Форма добавления */}
      <div className="mb-8 flex gap-2">
        <Input
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="Новая привычка..."
          className="flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd} disabled={!newHabitName.trim()}>
          Добавить
        </Button>
      </div>

      {/* Список привычек */}
      <div className="space-y-3">
        {habits.map((item) => (
          <HabitCard
            key={item.id}
            habit={item}
            isDoneToday={item.completedDates.includes(today)}
            streak={getStreak(item.completedDates)}
            editingID={editingID}
            tempName={tempName}
            setTempName={setTempName}
            onToggle={toggleHabit}
            onDelete={(id) => confirm('Удалить?') && deleteHabit(id)}
            onStartEdit={startEditing}
            onSaveEdit={(id, name) => {
              renameHabit(id, name);
              setEditingID(null);
            }}
            onCancelEdit={() => setEditingID(null)}
          />
        ))}

        {habits.length === 0 && (
          <p className="text-textSecondary text-center">
            Добавь первую привычку! ✨
          </p>
        )}
      </div>
    </div>
  );
};
