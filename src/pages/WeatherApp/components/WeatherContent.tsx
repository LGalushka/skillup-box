import { Droplets, Wind } from 'lucide-react'; // убрал Thermometer, т.к. дублирует
import type { WeatherResponse } from '../types/weather';
import { getWeatherGradient } from '../utils';

interface WeatherContentProps {
  data: WeatherResponse;
}

export const WeatherContent = ({ data }: WeatherContentProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Главная карточка */}
      <section
        className={`bg-linear-to-br ${getWeatherGradient(data.current.condition.code)} rounded-3xl border border-white/15 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl transition-all duration-500 sm:p-8`}
      >
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {data.location.name}
          </h1>
          <p className="text-white/70">{data.location.country}</p>
        </div>

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Левая часть — иконка + температура */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-6">
            <img
              src={`https:${data.current.condition.icon}`}
              alt={data.current.condition.text}
              className="animate-float-slow h-28 w-28 object-contain drop-shadow-2xl sm:h-32 sm:w-32"
            />
            <div className="mt-4 text-center sm:mt-0 sm:text-left">
              <p className="text-6xl font-black tracking-tighter text-white sm:text-7xl">
                {Math.round(data.current.temp_c)}°
              </p>
              <p className="mt-1 text-xl text-white/90 capitalize sm:text-2xl">
                {data.current.condition.text}
              </p>
              <p className="mt-2 text-lg font-medium text-orange-300">
                Ощущается {Math.round(data.current.feelslike_c)}°
              </p>
            </div>
          </div>

          {/* Правая часть — Wind + Humidity */}
          <div className="grid w-full grid-cols-2 gap-6 sm:w-auto sm:border-l sm:border-white/15 sm:pl-6">
            <WeatherStat
              icon={<Wind className="text-blue-400" size={22} />}
              label="Ветер"
              value={`${data.current.wind_kph} км/ч`}
            />
            <WeatherStat
              icon={<Droplets className="text-blue-300" size={22} />}
              label="Влажность"
              value={`${data.current.humidity}%`}
            />
          </div>
        </div>
      </section>

      {/* Прогноз */}
      <h2 className="text-text-primary px-2 text-xl font-bold">
        Прогноз на {data.forecast.forecastday.length}{' '}
        {data.forecast.forecastday.length === 1 ? 'день' : 'дня'}
      </h2>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3">
        {data.forecast.forecastday.map((day) => (
          <div
            key={day.date}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <p className="mb-3 text-sm text-white/70">
              {new Date(day.date).toLocaleDateString('ru-RU', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </p>

            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="mx-auto h-16 w-16 drop-shadow-md transition-transform group-hover:scale-110 sm:h-20 sm:w-20"
            />

            <div className="mt-4 flex justify-center gap-4 text-lg">
              <span className="font-bold text-white">
                {Math.round(day.day.maxtemp_c)}°
              </span>
              <span className="text-white/60">
                {Math.round(day.day.mintemp_c)}°
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

// Маленький вспомогательный компонент для статистики
function WeatherStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-xs text-white/60">{label}</p>
        <p className="font-medium text-white">{value}</p>
      </div>
    </div>
  );
}
