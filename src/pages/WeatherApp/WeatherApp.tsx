import { useEffect, useState } from 'react';
import { fetchCurrentWeather, fetchForecast } from './api';

export const WeatherApp = () => {
  const [current, setCurrent] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [curr, forec] = await Promise.all([
          fetchCurrentWeather('Krasnodon'),
          fetchForecast('Krasnodon'),
        ]);
        setCurrent(curr);
        setForecast(forec);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: </div>;
  return (
    <div>
      <h1 className="text-textPrimary text-2xl font-bold">
        Погода в {current?.location?.name}
      </h1>
      {/**Текущая погода */}
      {current && (
        <div>
          <p>Температура: {current.current.temp_c}°C</p>
          <p>Описание: {current.current.condition.text}</p>
          <img src={`https:${current.current.condition.icon}`} alt="" />
        </div>
      )}

      {/**Прогноз */}
      {forecast &&
        forecast.forecast?.forecastday?.map((day: any) => (
          <div key={day.date}>
            <p>
              {day.date}: {day.day.maxtemp_c}°C
            </p>
          </div>
        ))}
    </div>
  );
};
