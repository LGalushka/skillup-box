import { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { HabitHeader, HabitStats } from './components';

import { useHabits } from './hooks';
import { HabitCard } from './components/HabitCart';

export const HabitTracker = () => {
  const { habits, addHabit, deleteHabit, toggleHabit, getStreak, renameHabit } =
    useHabits();
  const [newHabitName, setNewHabitName] = useState<string>('');

  const [editingID, setEditingID] = useState<string | null>(null);

  const startEditing = (id: string) => {
    setEditingID(id);
  };

  const handleAdd = () => {
    if (!newHabitName.trim()) return;
    addHabit(newHabitName);
    setNewHabitName('');
  };

  const today = new Date().toISOString().split('T')[0];

  //статистика
  const totalCount = habits.length;
  const completedCount = habits.filter((h) =>
    h.completedDates.includes(today)
  ).length;
  const progress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-8">
      <HabitHeader />

      <HabitStats
        total={totalCount}
        completed={completedCount}
        progress={progress}
      />

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
