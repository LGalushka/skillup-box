import { useState } from 'react';
import {
  HabitActivityChart,
  HabitForm,
  HabitHeader,
  HabitStats,
} from './components';
import { useHabits } from './hooks';
import { HabitCard } from './components/HabitCart';

export const HabitTracker = () => {
  const {
    habits,
    last7Days,
    stats,
    activityData,
    today,
    addHabit,
    deleteHabit,
    toggleHabit,
    getStreak,
    renameHabit,
  } = useHabits();

  const [editingID, setEditingID] = useState<string | null>(null);

  const startEditing = (id: string) => {
    setEditingID(id);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-8">
      <HabitHeader />

      <HabitStats
        total={stats.totalCount}
        completed={stats.completedCount}
        progress={stats.progress}
      />

      {/**График */}
      <HabitActivityChart data={activityData} />

      {/* Форма добавления */}
      <HabitForm onAdd={addHabit} />

      {/* Список привычек */}
      <div className="space-y-3">
        {habits.map((item) => (
          <HabitCard
            key={item.id}
            habit={item}
            last7Days={last7Days}
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
