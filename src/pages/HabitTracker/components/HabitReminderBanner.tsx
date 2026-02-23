import { Clock, X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface HabitReminderBannerProps {
  count: number;
  onDismiss: () => void;
}

export const HabitReminderBanner = ({
  count,
  onDismiss,
}: HabitReminderBannerProps) => {
  if (count === 0) return null;
  return (
    <div className="bg-card/50 border-card flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <Clock size={24} className="text-primary" />
        <span className="text-text-secondary font-medium">
          У вас {count} невыполненных превычек сегодня!
        </span>
      </div>
      <Button
        onClick={onDismiss}
        variant="secondary"
        className="rounded-full p-2 transition-colors hover:bg-white/10"
      >
        <X size={20} />
      </Button>
    </div>
  );
};
