import { LineChart, Line, ResponsiveContainer } from 'recharts';
import type { Coin } from '../../types/crypto';
import { formatMarketCap, formatPrice } from '../../utils';

interface CoinCardProps {
  crypto: Coin;
}

// Форматирование цены

export const CoinCard = ({ crypto }: CoinCardProps) => {
  const positive = crypto.price_change_percentage_24h >= 0;
  const sparklineData =
    crypto.sparkline_in_7d?.price?.map((v, i) => ({ v, i })) ?? [];

  return (
    <div className="bg-card/50 relative flex h-full flex-col gap-3 rounded-lg border border-gray-700/50 p-4 transition-colors hover:border-gray-600">
      {/* Шапка — лого + название + ранг */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="h-10 w-10 rounded-full"
            src={crypto.image}
            alt={crypto.name}
          />
          <div>
            <p className="font-bold text-white">{crypto.name}</p>
            <p className="text-text-secondary text-xs uppercase">
              {crypto.symbol}
            </p>
          </div>
        </div>
        {/* Ранг */}
        <span className="text-text-secondary bg-card rounded-full px-2 py-0.5 text-xs font-bold">
          #{crypto.market_cap_rank}
        </span>
      </div>

      {/* Мини-график */}
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

      {/* Цена + изменение за 24ч */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-lg font-bold text-white">
            {formatPrice(crypto.current_price)}
          </p>
          <p className="text-text-secondary text-xs">
            {formatMarketCap(crypto.market_cap)}
          </p>
        </div>

        <span
          className={`text-sm font-semibold ${positive ? 'text-green-400' : 'text-red-400'}`}
        >
          {positive ? '▲' : '▼'}{' '}
          {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};
