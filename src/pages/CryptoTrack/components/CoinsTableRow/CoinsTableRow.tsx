import { Star } from 'lucide-react';
import type { Coin } from '../../types/crypto';
import { formatMarketCap, formatPrice } from '../../utils';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

interface CoinsTableRowProps {
  coins: Coin;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const CoinsTableRow = ({
  coins,
  favorites,
  onToggleFavorite,
}: CoinsTableRowProps) => {
  const positive = coins.price_change_percentage_24h >= 0;

  const sparklineData =
    coins.sparkline_in_7d?.price?.map((v, i) => ({ v, i })) ?? [];
  return (
    <div className="grid grid-cols-[40px_40px_1fr_120px_120px_120px_120px] items-center gap-2 px-8 py-3">
      {/**Кнопка */}
      <div>
        <button
          onClick={() => onToggleFavorite(coins.id)}
          className="rounded-md p-1.5 transition-colors hover:bg-black/20"
        >
          <Star
            size={18}
            className={
              favorites.includes(coins.id)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-none text-gray-500'
            }
          />
        </button>
      </div>

      {/**РАнг */}
      <div>
        <span className="text-text-secondary text-xs font-bold">
          {coins.market_cap_rank}
        </span>
      </div>

      {/**Лого название символ */}
      <div className="flex items-center gap-6">
        <img
          src={coins.image}
          alt={coins.name}
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="font-bold text-white">{coins.name}</p>
          <p className="text-text-secondary text-xs uppercase">
            {coins.symbol}
          </p>
        </div>
      </div>

      {/**Цена */}
      <div>
        <p className="font-bold text-white">
          {formatPrice(coins?.current_price)}
        </p>
      </div>

      {/* 24ч% */}
      <div>
        <span
          className={`text-sm font-semibold ${positive ? 'text-green-400' : 'text-red-400'}`}
        >
          {positive ? '▲' : '▼'}{' '}
          {Math.abs(coins.price_change_percentage_24h).toFixed(2)}%
        </span>
      </div>

      {/* капитализация */}
      <div>
        <p className="text-text-secondary text-xs">
          {formatMarketCap(coins.market_cap)}
        </p>
      </div>
      {/* мини-график */}
      <div>
        {sparklineData.length > 0 && (
          <div className="h-12 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke={positive ? '#22C55E' : '#EF4444'}
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
