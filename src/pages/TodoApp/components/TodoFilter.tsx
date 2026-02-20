import { memo } from 'react';
import type { Filter } from '../TodoApp';

interface TodoFilterProps {
  currentFilter: Filter;
  onFilterChange: (Filter: Filter) => void;
}

export const TodoFilter = memo(
  ({ currentFilter, onFilterChange }: TodoFilterProps) => {
    const filters: Filter[] = [
      'all',
      'active',
      'completed',
    ];
    return (
      <div className="flex items-center gap-2">
        <span className="text-text-secondary mr-2 text-[10px] font-bold tracking-widest uppercase">
          Фильтр:
        </span>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`rounded-full border px-5 py-3 text-xs font-bold transition-all ${
              currentFilter === f
                ? 'bg-primary border-primary text-black'
                : 'border-border-color text-text-secondary hover:border-primary/50'
            }`}
          >
            {f === 'all'
              ? 'Все'
              : f === 'active'
                ? 'Активные'
                : 'Завершенные'}
          </button>
        ))}
      </div>
    );
  }
);

TodoFilter.displayName = 'TodoFilter';
