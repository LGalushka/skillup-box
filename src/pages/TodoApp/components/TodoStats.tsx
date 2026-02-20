import { memo } from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  colorClass?: string;
}

const StatCard = ({
  label,
  value,
  colorClass = '',
}: StatCardProps) => (
  <div className="bg-card border-border-color p-md rounded-xl border shadow-sm">
    <p className="text-text-secondary text-[10px] font-bold tracking-widest uppercase">
      {label}
    </p>
    <p className={`text-2xl font-black ${colorClass}`}>
      {value}
    </p>
  </div>
);

interface TodoStatsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
    percentActive: number;
    percentCompleted: number;
  };
}

export const TodoStats = memo(
  ({ stats }: TodoStatsProps) => {
    return (
      <section className="grid grid-cols-3 gap-4">
        <StatCard label="Всего" value={stats.total} />
        <StatCard
          label="В работе"
          value={`${stats.active} (${stats.percentActive}%)`}
          colorClass={
            stats.active === 0
              ? 'text-text-light'
              : 'text-primary'
          }
        />
        <StatCard
          label="Готово"
          value={`${stats.completed} (${stats.percentCompleted}%)`}
          colorClass={
            stats.completed === 0
              ? 'text-text-light'
              : 'text-primary'
          }
        />
      </section>
    );
  }
);

TodoStats.displayName = 'TodoStats';
