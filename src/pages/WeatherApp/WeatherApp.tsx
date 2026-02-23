import React, { useEffect, useState } from 'react';
import type { WeatherResponse } from './types/weather';
import { fetchWeatherData } from './api';
import { WeatherHeader } from './components';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const WeatherApp = () => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('Krasnodon');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchWeatherData(city);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [city]);

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCity(searchQuery);
      setSearchQuery('');
    }
  };

  if (loading)
    return <div className="text-text-secondary p-4">Загрузка прогноза...</div>;
  if (error) return <div className="p-4 text-red-500">Ошибка: {error}</div>;
  if (!data) return null;

  return (
    <div className="p-lg mx-auto flex max-w-2xl flex-col gap-10">
      <WeatherHeader />
      {/**Секция заголовок с текущей датой */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Введите город..."
          className="bg-card border-card focus:border-primary rounded-lg border px-4 py-2 transition-colors focus:outline-none"
        />
        <Button
          type="submit"
          className="bg-primary hover:bg-primary-hover rounded-lg px-4 py-2 transition-all"
          disabled={!searchQuery.trim()}
        >
          Найти
        </Button>
      </form>
      <section className="bg-card/50 border-card w-115 rounded-xl border p-6">
        <h1 className="text-text-primary mb-2 text-2xl font-bold">
          {data.location.name}, {data.location.country}
        </h1>

        <div className="flex items-center gap-4">
          <img
            src={`https:${data.current.condition.icon}`}
            alt={data.current.condition.text}
            className="h-16 w-16"
          />
          <div>
            <p className="text-text-primary text-4xl font-bold">
              {Math.round(data.current.temp_c)}°C
            </p>
            <p className="text-text-secondary">{data.current.condition.text}</p>
          </div>
        </div>
      </section>

      {/**Прогноз на несколько дней */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.forecast.forecastday.map((item) => (
          <div
            key={item.date}
            className="bg-card/30 border-card rounded-xl border p-4 text-center"
          >
            <p className="text-text-secondary mb-2 text-sm">
              {new Date(item.date).toLocaleDateString('ru-RU', {
                weekday: 'long',
                day: 'numeric',
              })}
            </p>
            <img
              src={`https:${item.day.condition.icon}`}
              className="mx-auto h-10 w-10"
              alt="weather icon"
            />
            <p className="text-text-primary font-semibold">
              {Math.round(item.day.maxtemp_c)}°
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};
