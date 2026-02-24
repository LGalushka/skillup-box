import { Droplets, Thermometer, Wind } from 'lucide-react';
import type { WeatherResponse } from '../types/weather';

interface WeatherContentProps {
  data: WeatherResponse;
}

export const WeatherContent = ({ data }: WeatherContentProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Главная карточка */}
      <section className="bg-card/50 border-card rounded-2xl border p-8 shadow-lg backdrop-blur-md">
        <div className="mb-6">
          <h1 className="text-text-primary text-3xl font-bold">
            {data.location.name}
          </h1>
          <p className="text-text-secondary">{data.location.country}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={`https:${data.current.condition.icon}`}
              alt={data.current.condition.text}
              className="h-24 w-24 object-contain"
            />
            <div>
              <p className="text-text-primary text-6xl font-black">
                {Math.round(data.current.temp_c)}°C
              </p>
              <p className="text-text-secondary text-lg capitalize">
                {data.current.condition.text}
              </p>
            </div>
          </div>

          {/* Блок доп. инфо */}
          <div className="grid grid-cols-2 gap-4 border-l border-white/10 pl-6">
            <div className="flex items-center gap-2">
              <Wind className="text-blue-400" size={20} />
              <div>
                <p className="text-text-secondary text-xs">Ветер</p>
                <p className="text-text-primary font-medium">
                  {data.current.wind_kph} км/ч
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="text-blue-300" size={20} />
              <div>
                <p className="text-text-secondary text-xs">Влажность</p>
                <p className="text-text-primary font-medium">
                  {data.current.humidity}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="text-orange-400" size={20} />
              <div>
                <p className="text-text-secondary text-xs">Ощущается</p>
                <p className="text-text-primary font-medium">
                  {Math.round(data.current.feelslike_c)}°
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция прогноза */}
      <h2 className="text-text-primary px-2 text-xl font-bold">
        Прогноз на 3 дня
      </h2>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.forecast.forecastday.map((item) => (
          <div
            key={item.date}
            className="bg-card/30 border-card group flex flex-col items-center rounded-2xl border p-5 transition-transform hover:scale-105"
          >
            <p className="text-text-secondary mb-2 text-sm capitalize">
              {new Date(item.date).toLocaleDateString('ru-RU', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </p>
            <img
              src={`https:${item.day.condition.icon}`}
              className="h-14 w-14 drop-shadow-md"
              alt="weather icon"
            />
            <div className="mt-2 flex gap-3">
              <span className="text-text-primary font-bold">
                {Math.round(item.day.maxtemp_c)}°
              </span>
              <span className="text-text-secondary opacity-60">
                {Math.round(item.day.mintemp_c)}°
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
