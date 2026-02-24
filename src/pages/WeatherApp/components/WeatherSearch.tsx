import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import type React from 'react';
import { Loader2, Search } from 'lucide-react';

interface WeatherSearchProps {
  search: string;
  onSearch: (value: string) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

export const WeatherSearch = ({
  search,
  onSearch,
  onSubmit,
  isLoading,
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
        disabled={!search.trim() || isLoading}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            <Search size={20} className="mr-2" />
            Найти
          </>
        )}
      </Button>
    </form>
  );
};

export default WeatherSearch;
