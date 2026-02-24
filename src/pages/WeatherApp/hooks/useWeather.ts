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
      setLoading(false);
      setError(null);
      return;
    }
    const abortController = new AbortController();
    const signal = abortController.signal;

    let isCurrentRequest = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchWeatherData(city, undefined, { signal });
        if (isCurrentRequest && !signal.aborted) {
          setData(result);
        }
      } catch (err: any) {
        if (err.name === 'AbortError' || signal.aborted) {
          return;
        }
        const message =
          err instanceof Error &&
          err.message.includes('No matching location found')
            ? 'Город не найден. Проверьте написание.'
            : err.message || 'Не удалось загрузить погоду';

        if (isCurrentRequest && !signal.aborted) {
          setError(message);
        }
      } finally {
        if (isCurrentRequest && !signal.aborted) {
          setLoading(false);
        }
      }
    };
    load();

    return () => {
      isCurrentRequest = false;
      abortController.abort();
    };
  }, [city]);

  useEffect(() => {
    if (error) return;
    const timer = setTimeout(() => setError(null), 4000);
    return () => clearTimeout(timer);
  }, [error]);

  return { data, loading, error, setCity };
};
