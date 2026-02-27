import { Input } from '../../../../components/ui/Input';

interface CryptoHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  lastUpdated: Date | null;
}

export const CryptoHeader = ({
  search,
  onSearchChange,
  lastUpdated,
}: CryptoHeaderProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <header className="border-primary mb-6 flex flex-col gap-1 border-l-4 pl-4">
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
            📈 Crypto Track
          </h1>
          <p className="text-text-secondary font-mono text-[10px] tracking-widest uppercase opacity-60">
            React Journey · мониторинг криптовалют
          </p>
          {lastUpdated && (
            <p className="text-text-secondary text-xs">
              Обновлено: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </header>
      </div>
      <div className="text-lg">
        <Input
          type="text"
          value={search}
          placeholder="Поиск монеты..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CryptoHeader;
