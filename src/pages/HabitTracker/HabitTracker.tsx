import { useState } from 'react';
import {
  HabitActivityChart,
  HabitForm,
  HabitHeader,
  HabitList,
  HabitReminderBanner,
  HabitStats,
} from './components';
import { useHabits } from './hooks';
import { motion, AnimatePresence } from 'framer-motion';

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
    incompleteHabits,
  } = useHabits();

  const [editingID, setEditingID] = useState<string | null>(null);
  const [showReminder, setShowReminder] = useState<boolean>(true);

  const startEditing = (id: string) => {
    setEditingID(id);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-8">
      <HabitHeader />

      <AnimatePresence>
        {showReminder && incompleteHabits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <HabitReminderBanner
              count={incompleteHabits.length}
              onDismiss={() => setShowReminder(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
