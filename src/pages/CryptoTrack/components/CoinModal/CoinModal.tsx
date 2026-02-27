import { Line, LineChart, ResponsiveContainer } from 'recharts';
import type { Coin } from '../../types/crypto';
import { formatMarketCap, formatPrice } from '../../utils';

interface CoinModalProps {
  coin: Coin;
  onClose: () => void;
}

export const CoinModal = ({ coin, onClose }: CoinModalProps) => {
  const positive = coin.price_change_percentage_24h >= 0;
  const sparklineData =
    coin.sparkline_in_7d?.price?.map((v, i) => ({ v, i })) ?? [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        /* Добавлено flex flex-col и min-w, чтобы модалка не схлопывалась */
        className="bg-card/50 flex w-full max-w-lg min-w-88 shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-700/50 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              className="h-12 w-12 rounded-full border border-gray-700/50"
              src={coin.image}
              alt={coin.name}
            />
            <div>
              <p className="text-xl leading-none font-bold text-white">
                {coin.name}
              </p>
              <p className="mt-1 text-xs font-medium text-gray-500 uppercase">
                {coin.symbol}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-lg border border-gray-700/30 bg-gray-800/50 px-2 py-1 text-[10px] font-bold text-gray-400">
              #{coin.market_cap_rank}
            </span>
            {/* Улучшенная кнопка закрыть */}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-all hover:bg-gray-800 hover:text-white active:scale-95"
              aria-label="Закрыть"
            >
              <svg
                xmlns="http://www.w3.org"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* График (высота зафиксирована) */}
        <div className="mb-6 h-32 w-full">
          {sparklineData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke={positive ? '#22C55E' : '#EF4444'}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              График недоступен
            </div>
          )}
        </div>

        {/* Цена и суточное изменение */}
        <div className="mb-6 flex items-end justify-between border-b border-gray-700/50 pb-6">
          <div>
            <p className="text-sm text-gray-400">Текущая цена</p>
            <p className="text-4xl font-black tracking-tight text-white">
              {formatPrice(coin.current_price)}
            </p>
          </div>
          <div className="text-right">
            <span
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-lg font-bold ${
                positive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {positive ? '▲' : '▼'}{' '}
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </span>
            <p className="mt-1 text-xs text-gray-500">за 24ч</p>
          </div>
        </div>

        {/* Сетка характеристик */}
        <div className="grid grid-cols-2 gap-4">
          <StatItem
            label="Рын. капитализация"
            value={formatMarketCap(coin.market_cap)}
          />
          <StatItem
            label="Объём 24ч"
            value={formatMarketCap(coin.total_volume)}
          />
          <StatItem
            label="Мин / Макс 24ч"
            value={`${formatPrice(coin.low_24h)} / ${formatPrice(coin.high_24h)}`}
          />
          <StatItem
            label="В обращении"
            value={
              coin.circulating_supply
                ? `${(coin.circulating_supply / 1e6).toFixed(2)}M`
                : 'N/A'
            }
          />
        </div>
      </div>
    </div>
  );
};

/* Вспомогательный компонент для ячеек сетки */
const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl border border-transparent bg-gray-800/40 p-3 transition-colors hover:border-gray-700">
    <p className="mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
      {label}
    </p>
    <p className="text-sm font-semibold text-gray-200">{value}</p>
  </div>
);
