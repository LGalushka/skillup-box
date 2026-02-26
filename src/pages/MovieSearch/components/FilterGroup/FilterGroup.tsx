import { Button } from '../../../../components/ui/Button';

export type SearchType = 'all' | 'movie' | 'series' | 'episode';

interface FilterGroupProps {
  currentFilter: SearchType;
  onFilterChange: (type: SearchType) => void;
}

const filterOptions: { label: string; value: SearchType }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Фильмы', value: 'movie' },
  { label: 'Сериалы', value: 'series' },
];

export const FilterGroup = ({
  currentFilter,
  onFilterChange,
}: FilterGroupProps) => {
  return (
    <div className="mb-6 flex gap-2">
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={`px-6 py-2 text-sm transition-all ${
            currentFilter === option.value
              ? 'bg-primary text-text-primary shadow-lg shadow-blue-900/20'
              : 'bg-secondary hover:bg-secondary-hover text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
