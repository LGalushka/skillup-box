import React, { useEffect, useState } from 'react';
import type { WeatherResponse } from './types/weather';
import { fetchWeatherData } from './api';
import {
  WeatherWelcomeScreen,
  WeatherContent,
  WeatherHeader,
  WeatherSearch,
  WeatherErrorAnimate,
} from './components';

export const WeatherApp = () => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (!city) {
      setLoading(false);
      setData(null);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        setData(null);
        const result = await fetchWeatherData(city);
        setData(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error &&
          err.message.includes('No matching location found')
            ? 'Упс! Город не найден. Проверьте название.'
            : 'Произошла ошибка при загрузке данных.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [city]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCity(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <div className="p-lg mx-auto flex max-w-2xl flex-col gap-10">
      <WeatherHeader />
      {/**Секция заголовок с текущей датой */}
      <WeatherSearch
        search={searchQuery}
        onSearch={setSearchQuery}
        onSubmit={handleSearch}
      />
      <WeatherErrorAnimate error={error} />

      {loading && (
        <div className="text-text-secondary p-4">Загрузка прогноза...</div>
      )}

      {data && !loading && <WeatherContent data={data} />}

      {!data && !loading && !error && <WeatherWelcomeScreen />}
    </div>
  );
};
