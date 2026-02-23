import { CheckCircle, Flame, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { useEffect, useMemo, useState } from 'react';
import type { Habit } from '../../hooks/useHabits';

interface HabitCardProps {
  habit: Habit;
  isDoneToday: boolean;
  streak: number;
  editingID: string | null;

  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string, name: string) => void;
  onSaveEdit: (id: string, name: string) => void;
  onCancelEdit: () => void;
}

export const HabitCard = ({
  habit,
  isDoneToday,
  streak,
  editingID,

  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}: HabitCardProps) => {
  const [localName, setLocalName] = useState(habit.name);

  const today = new Date().toISOString().split('T')[0];

  const last7Days = useMemo(
    () =>
      [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
      }),
    []
  );

  useEffect(() => {
    if (editingID === habit.id) setLocalName(habit.name);
  }, [editingID, habit.id, habit.name]);

  return (
    <div className="hover:border-primary/30 group rounded-2xl border border-white/5 bg-[#1e2533] p-5 shadow-lg transition-all">
      {/* Верхняя часть: Название и Управление */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {editingID === habit.id ? (
            <div className="flex items-center gap-2">
              <Input
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="h-8 w-48 border-white/10 bg-[#161b26]"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSaveEdit(habit.id, localName);
                  if (e.key === 'Escape') onCancelEdit();
                }}
              />
              <Button
                onClick={() => onSaveEdit(habit.id, localName)}
                className="h-8 px-3 text-xs"
              >
                Ок
              </Button>
            </div>
          ) : (
            <h3 className="text-lg font-semibold text-white/90">
              {habit.name}
            </h3>
          )}
        </div>

        <div className="flex items-center gap-2 opacity-40 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onStartEdit(habit.id, habit.name)}
            className="rounded-lg p-2 text-white/60 hover:bg-white/5"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="rounded-lg p-2 text-red-400/60 hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Нижняя часть: Календарь и Круговой Прогресс */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {last7Days.map((date) => {
            const isCompleted = habit.completedDates.includes(date);
            const dayName = new Date(date).toLocaleDateString('ru-RU', {
              weekday: 'short',
            });
            const isCurrent = date === today;

            return (
              <div key={date} className="flex flex-col items-center gap-2">
                <span
                  className={`text-[10px] font-bold tracking-wider uppercase ${isCurrent ? 'text-primary' : 'text-white/30'}`}
                >
                  {dayName}
                </span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isCompleted
                      ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                      : 'border-white/5 bg-[#161b26] text-white/10'
                  } ${isCurrent && !isCompleted ? 'border-primary/40 animate-pulse' : ''} `}
                >
                  {isCompleted ? (
                    <CheckCircle size={16} />
                  ) : (
                    <div className="h-1 w-1 rounded-full bg-current" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="ml-4 flex flex-col items-center gap-2">
          <button
            onClick={() => onToggle(habit.id)}
            className="group/btn relative flex h-14 w-14 items-center justify-center transition-transform active:scale-90"
          >
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-white/5"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={150.7}
                strokeDashoffset={isDoneToday ? 0 : 150.7}
                className="text-primary transition-all duration-500 ease-in-out"
              />
            </svg>

            <div
              className={`relative z-10 flex flex-col items-center transition-colors ${isDoneToday ? 'text-primary' : 'text-white/40'}`}
            >
              <Flame
                size={20}
                fill={isDoneToday ? 'currentColor' : 'none'}
                className={streak > 0 && isDoneToday ? 'animate-pulse' : ''}
              />
              <span className="text-[10px] font-bold">{streak}д.</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
