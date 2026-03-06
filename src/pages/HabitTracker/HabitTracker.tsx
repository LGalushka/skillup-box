import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addHabit,
  deleteHabit,
  toggleHabit,
  renameHabit,
} from '../../store/slices/habitSlice';
import {
  selectStats,
  selectActivityData,
  selectIncompleteHabits,
  selectToday,
  getStreak,
} from '../../store/selectors/habitSelectors';
import {
  HabitActivityChart,
  HabitForm,
  HabitHeader,
  HabitList,
  HabitReminderBanner,
  HabitStats,
} from './components';

import { motion, AnimatePresence } from 'framer-motion';

export const HabitTracker = () => {
  const dispatch = useAppDispatch();

  const habits = useAppSelector((state) => state.habit.habits);
  const stats = useAppSelector(selectStats);
  const activityData = useAppSelector(selectActivityData);
  const incompleteHabits = useAppSelector(selectIncompleteHabits);
  const today = useAppSelector(selectToday);

  const last7Days = activityData.map((d) => d.date);

  const [editingID, setEditingID] = useState<string | null>(null);
  const [showReminder, setShowReminder] = useState<boolean>(true);

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
      <HabitForm onAdd={(name) => dispatch(addHabit(name))} />

      {/* Список привычек */}
      <HabitList
        habits={habits}
        last7Days={last7Days}
        today={today}
        editingID={editingID}
        onToggle={(id) => dispatch(toggleHabit({ id, date: today }))}
        onDelete={(id) => dispatch(deleteHabit(id))}
        onStartEdit={setEditingID}
        onSaveEdit={(id, name) => {
          dispatch(renameHabit({ id, newName: name }));
          setEditingID(null);
        }}
        onCancelEdit={() => setEditingID(null)}
        getStreak={getStreak}
      />
    </div>
  );
};
