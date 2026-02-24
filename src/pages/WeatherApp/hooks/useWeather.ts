import { useEffect, useState } from 'react';
import type { WeatherResponse } from '../types/weather';
import { fetchWeatherData } from '../api';

interface UseWeatherReturn {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  setCity: (city: string) => void;
}

export const useWeather = (): UseWeatherReturn => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    if (!city) {
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
      const timer = setTimeout(() => setError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return { data, loading, error, setCity };
};
