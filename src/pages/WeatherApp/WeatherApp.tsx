import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setCity,
  claerError,
  searchWeather,
} from '../../store/slices/weatherSlice';
import {
  selectWeatherData,
  selectWeatherLoading,
  selectWeatherError,
  selectCity,
} from '../../store/selectors/weatherSelectors';

import {
  WeatherWelcomeScreen,
  WeatherContent,
  WeatherHeader,
  WeatherSearch,
  WeatherErrorAnimate,
} from './components';

export const WeatherApp = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(selectWeatherData);
  const loading = useAppSelector(selectWeatherLoading);
  const error = useAppSelector(selectWeatherError);
  const city = useAppSelector(selectCity);

  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (!city.trim()) return;
    dispatch(searchWeather({ city }));
  }, [city, dispatch]);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => dispatch(claerError()), 4000);
    return () => clearTimeout(timer);
  }, [error, dispatch]);

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(setCity(searchQuery));
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
        isLoading={loading}
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
