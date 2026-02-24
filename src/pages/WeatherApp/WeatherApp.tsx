import React, { useState } from 'react';

import {
  WeatherWelcomeScreen,
  WeatherContent,
  WeatherHeader,
  WeatherSearch,
  WeatherErrorAnimate,
} from './components';
import { useWeather } from './hooks/useWeather';

export const WeatherApp = () => {
  const { data, loading, error, setCity } = useWeather();
  const [searchQuery, setSearchQuery] = useState<string>('');

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

      {data && !loading && !error && <WeatherContent data={data} />}

      {!data && !loading && !error && <WeatherWelcomeScreen />}
    </div>
  );
};
