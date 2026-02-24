import React, { useEffect, useState } from 'react';
import type { WeatherResponse } from './types/weather';
import { fetchWeatherData } from './api';
import {
  WeaherWelcomeScreen,
  WeatherContent,
  WeatherHeader,
  WeatherSearch,
} from './components';

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

  return (
    <div className="p-lg mx-auto flex max-w-2xl flex-col gap-10">
      <WeatherHeader />
      {/**Секция заголовок с текущей датой */}
      <WeatherSearch
        search={searchQuery}
        onSearch={setSearchQuery}
        onSubmit={handleSearch}
      />

      {loading && (
        <div className="text-text-secondary p-4">Загрузка прогноза...</div>
      )}
      {error && <div className="p-4 text-red-500">Ошибка: {error}</div>}
      {data && !loading && <WeatherContent data={data} />}

      {!data && !loading && <WeaherWelcomeScreen />}
    </div>
  );
};
