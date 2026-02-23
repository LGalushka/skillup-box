import { Stars } from 'lucide-react';
import type { Habit } from '../hooks/useHabits';
import { HabitCard } from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  last7Days: string[];
  today: string;
  editingID: string | null;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string) => void;
  onSaveEdit: (id: string, name: string) => void;
  onCancelEdit: () => void;
  getStreak: (completedDates: string[]) => number;
}

export const HabitList = ({
  habits,
  last7Days,
  today,
  editingID,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  getStreak,
}: HabitListProps) => {
  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          last7Days={last7Days}
          isDoneToday={habit.completedDates.includes(today)}
          streak={getStreak(habit.completedDates)}
          editingID={editingID}
          onToggle={onToggle}
          onDelete={(id) => confirm('Удалить,') && onDelete(id)}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}

      {habits.length === 0 && (
        <p className="text-text-secondary text-center">
          Добавь первую привычку! <Stars size={24} />
        </p>
      )}
    </div>
  );
};
