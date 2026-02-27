import type { Coin } from '../../types/crypto';
import { CoinsTableRow } from '../CoinsTableRow';

interface CoinsTableProps {
  coins: Coin[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const CoinsTable = ({
  coins,
  favorites,
  onToggleFavorite,
}: CoinsTableProps) => {
  return (
    <div className="bg-card/50 items-start overflow-hidden rounded-lg border border-gray-700/50">
      {/* Заголовок */}
      <div className="grid grid-cols-[40px_40px_1fr_120px_100px_120px_80px] items-center gap-2 border-b border-gray-700/50 px-8 py-3">
        <div /> {/* ⭐ */}
        <span className="text-text-secondary text-xs font-bold tracking-widest uppercase">
          #
        </span>
        <span className="text-text-secondary text-xs font-bold tracking-widest uppercase">
          Монета {/* ← без text-right */}
        </span>
        <span className="text-text-secondary text-xs font-bold tracking-widest uppercase">
          Цена {/* ← без text-right */}
        </span>
        <span className="text-text-secondary text-xs font-bold tracking-widest uppercase">
          24Ч %
        </span>
        <span className="text-text-secondary text-xs font-bold tracking-widest uppercase">
          Кап.
        </span>
        <span className="text-text-secondary text-center text-xs font-bold tracking-widest uppercase">
          График
        </span>
      </div>

      {/* Строки с разделителем */}
      {coins.map((coin, index) => (
        <div
          key={coin.id}
          className={
            index < coins.length - 1 ? 'border-b border-gray-700/30' : ''
          }
        >
          <CoinsTableRow
            coins={coin}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      ))}
    </div>
  );
};
