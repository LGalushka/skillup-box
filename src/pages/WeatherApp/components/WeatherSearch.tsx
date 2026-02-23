import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import type React from 'react';

interface WeatherSearchProps {
  search: string;
  onSearch: (value: string) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

export const WeatherSearch = ({
  search,
  onSearch,
  onSubmit,
}: WeatherSearchProps) => {
  return (
    <form onSubmit={onSubmit} className="mb-6 flex gap-2">
      <Input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Введите город..."
        className="bg-card border-card focus:border-primary rounded-lg border px-4 py-2 transition-colors focus:outline-none"
      />
      <Button
        type="submit"
        className="bg-primary hover:bg-primary-hover rounded-lg px-4 py-2 transition-all"
        disabled={!search.trim()}
      >
        Найти
      </Button>
    </form>
  );
};

export default WeatherSearch;
