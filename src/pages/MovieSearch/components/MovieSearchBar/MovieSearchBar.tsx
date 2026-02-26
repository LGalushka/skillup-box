import { Input } from '../../../../components/ui/Input';

interface MovieSearchBarProps {
  value: string;
  onChange: (vakue: string) => void;
}

export const MovieSearchBar = ({ value, onChange }: MovieSearchBarProps) => {
  return (
    <div className="mb-6">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Поиск фильма..."
      />
    </div>
  );
};
