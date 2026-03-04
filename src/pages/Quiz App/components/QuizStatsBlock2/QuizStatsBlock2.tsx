import type { QuizStats } from '../../types/quiz';

interface QuizStatsBlock2Props {
  stats: QuizStats;
  totalQuestions: number;
}

export function QuizStatsBlock2({ stats }: QuizStatsBlock2Props) {
  return (
    <div className="border-border-color bg-card/50 mx-auto mt-4 max-w-2xl rounded-xl border p-4">
      <div className="grid grid-cols-3 gap-6">
        {/* Колонка 1 — Общий счёт */}
        <div className="flex flex-col gap-2">
          <p className="text-primary text-xs font-bold tracking-widest uppercase">
            Ваш прогресс
          </p>
          <p className="text-text-secondary text-xs tracking-widest uppercase">
            Общий счёт
          </p>
          <p className="text-4xl font-black text-white">
            {stats.totalScore.toLocaleString()}
          </p>
          <p className="text-text-secondary text-xs">
            Игр сыграно: {stats.totalGames}
          </p>
          <p className="text-text-secondary text-xs">
            Лучший результат: {stats.bestScore}
          </p>
        </div>

        {/* Колонка 2 — Прогресс по уровням */}
        <div className="flex flex-col gap-3">
          {[
            {
              label: 'Лёгкий',
              data: stats.byDifficulty.easy,
              color: '#22c55e',
            },
            {
              label: 'Средний',
              data: stats.byDifficulty.medium,
              color: '#f97316',
            },
            {
              label: 'Сложный',
              data: stats.byDifficulty.hard,
              color: '#ef4444',
            },
          ].map(({ label, data, color }) => {
            const pct =
              data.played > 0
                ? Math.round((data.correct / data.played) * 100)
                : 0;

            return (
              <div key={label} className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-text-secondary text-xs tracking-widest uppercase">
                    {label}
                  </span>
                  <span className="text-xs font-bold" style={{ color }}>
                    {data.correct}/{data.played}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
                <span className="text-text-secondary text-xs">
                  {pct}% правильно
                </span>
              </div>
            );
          })}
        </div>

        {/* Колонка 3 — Достижения */}
        <div className="flex flex-col gap-3">
          <p className="text-primary text-xs font-bold tracking-widest uppercase">
            Достижения
          </p>

          {/* Лёгкий — разблокировано если играл */}
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl ${
                stats.byDifficulty.easy.played > 0
                  ? 'border-green-500 bg-green-500/20'
                  : 'border-gray-600 bg-gray-700/50'
              }`}
            >
              {stats.byDifficulty.easy.played > 0 ? '🏆' : '🔒'}
            </div>
            <div>
              <p className="text-xs font-bold text-white">Лёгкий</p>
              <p className="text-text-secondary text-xs">
                {stats.byDifficulty.easy.played > 0
                  ? 'Пройден!'
                  : 'Заблокировано'}
              </p>
            </div>
          </div>

          {/* Средний */}
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl ${
                stats.byDifficulty.medium.played > 0
                  ? 'border-orange-500 bg-orange-500/20'
                  : 'border-gray-600 bg-gray-700/50'
              }`}
            >
              {stats.byDifficulty.medium.played > 0 ? '⚡' : '🔒'}
            </div>
            <div>
              <p className="text-xs font-bold text-white">Средний</p>
              <p className="text-text-secondary text-xs">
                {stats.byDifficulty.medium.played > 0
                  ? 'Пройден!'
                  : 'Заблокировано'}
              </p>
            </div>
          </div>

          {/* Сложный */}
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl ${
                stats.byDifficulty.hard.played > 0
                  ? 'border-red-500 bg-red-500/20'
                  : 'border-gray-600 bg-gray-700/50'
              }`}
            >
              {stats.byDifficulty.hard.played > 0 ? '💀' : '🔒'}
            </div>
            <div>
              <p className="text-xs font-bold text-white">Сложный</p>
              <p className="text-text-secondary text-xs">
                {stats.byDifficulty.hard.played > 0
                  ? 'Пройден!'
                  : 'Заблокировано'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
