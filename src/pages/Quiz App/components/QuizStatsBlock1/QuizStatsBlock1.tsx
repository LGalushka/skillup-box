import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { QuizStats } from '../../types/quiz';

interface QuizStatsBlock1Props {
  stats: QuizStats;
}

// Круговая диаграмма для одного уровня
function DifficultyCircle({
  label,
  played,
  correct,
  color,
}: {
  label: string;
  played: number;
  correct: number;
  color: string;
}) {
  const pct = played > 0 ? Math.round((correct / played) * 100) : 0;

  const pieData = [
    { value: pct }, // заполненная часть
    { value: 100 - pct }, // пустая часть
  ];

  return (
    <div className="flex items-center gap-3">
      {/* Круговая диаграмма */}
      <div className="relative h-16 w-16 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={22}
              outerRadius={30}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={color} />
              <Cell fill="#334155" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Процент в центре */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{pct}%</span>
        </div>
      </div>

      {/* Текст справа */}
      <div className="flex flex-col gap-1">
        <p className="text-text-secondary text-xs tracking-widest uppercase">
          {label}
        </p>
        <p className="text-sm font-semibold text-white">
          {correct}/{played} правильно
        </p>
        {/* Прогресс-бар */}
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-gray-700">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: color }}
          />
        </div>
      </div>
    </div>
  );
}

export function QuizStatsBlock1({ stats }: QuizStatsBlock1Props) {
  return (
    <div className="border-border-color bg-card/50 mx-auto mt-6 max-w-2xl rounded-xl border p-4">
      <p className="text-text-secondary mb-4 text-xs font-bold tracking-widest uppercase">
        Статистика по уровням
      </p>

      <div className="grid grid-cols-3 gap-4">
        <DifficultyCircle
          label="Лёгкий"
          played={stats.byDifficulty.easy.played}
          correct={stats.byDifficulty.easy.correct}
          color="#22c55e"
        />
        <DifficultyCircle
          label="Средний"
          played={stats.byDifficulty.medium.played}
          correct={stats.byDifficulty.medium.correct}
          color="#f97316"
        />
        <DifficultyCircle
          label="Сложный"
          played={stats.byDifficulty.hard.played}
          correct={stats.byDifficulty.hard.correct}
          color="#ef4444"
        />
      </div>
    </div>
  );
}
