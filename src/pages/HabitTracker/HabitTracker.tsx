import { useState } from 'react';
import {
  HabitActivityChart,
  HabitForm,
  HabitHeader,
  HabitList,
  HabitStats,
} from './components';
import { useHabits } from './hooks';

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
      <HabitList
        habits={habits}
        last7Days={last7Days}
        today={today}
        editingID={editingID}
        onToggle={toggleHabit}
        onDelete={deleteHabit}
        onStartEdit={startEditing}
        onSaveEdit={(id, name) => {
          renameHabit(id, name);
          setEditingID(null);
        }}
        onCancelEdit={() => setEditingID(null)}
        getStreak={getStreak}
      />
    </div>
  );
};
