import type { Coin } from '../../types/crypto';
import { PieChart, Cell, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import { formatMarketCap } from '../../utils';

interface MarketCapChartProps {
  coins: Coin[];
}

const COLORS = [
  '#F7931A',
  '#627EEA',
  '#F3BA2F',
  '#9945FF',
  '#00AAE4',
  '#6B7280',
];

export const MarketCapChart = ({ coins }: MarketCapChartProps) => {
  // Общая капитализация
  const totalCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0);

  // Топ-5 + остальные
  const top5 = coins.slice(0, 5);
  const othersCap = coins
    .slice(5)
    .reduce((sum, coin) => sum + coin.market_cap, 0);

  const pieData = [
    ...top5.map((coin) => ({
      name: coin.symbol.toUpperCase(),
      value: coin.market_cap,
      pct: ((coin.market_cap / totalCap) * 100).toFixed(1),
    })),
    {
      name: 'Остальные',
      value: othersCap,
      pct: ((othersCap / totalCap) * 100).toFixed(1),
    },
  ];

  return (
    <div className="bg-card/50 mb-6 rounded-lg border border-gray-700/50 p-4">
      <p className="text-text-secondary mb-4 text-xs font-bold tracking-widest uppercase">
        Распределение рыночной капитализации
      </p>

      <div className="flex items-center gap-6">
        {/* Диаграмма */}
        <div style={{ width: '200px', height: '200px', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={false}
              >
                {pieData.map((_, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={COLORS[i % COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="bg-card rounded-lg border border-gray-700 p-2 text-xs">
                      <p className="font-bold text-white">{payload[0].name}</p>
                      <p className="text-text-secondary">
                        {formatMarketCap(payload[0].value as number)}
                      </p>
                      <p
                        className="font-bold"
                        style={{ color: payload[0].payload.fill }}
                      >
                        {payload[0].payload.pct}%
                      </p>
                    </div>
                  ) : null
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Легенда с прогресс-барами */}
        <div className="flex flex-1 flex-col gap-3">
          {pieData.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              {/* Цвет + название */}
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: COLORS[i] }}
                />
                <span className="text-text-secondary text-sm">{item.name}</span>
              </div>

              {/* Капитализация + % + прогресс-бар */}
              <div className="flex items-center gap-3">
                <span className="text-text-secondary text-xs">
                  {formatMarketCap(item.value)}
                </span>
                <span
                  className="min-w-36px text-right text-xs font-bold"
                  style={{ color: COLORS[i] }}
                >
                  {item.pct}%
                </span>
                <div className="bg-card h-1 w-20 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.pct}%`, background: COLORS[i] }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
