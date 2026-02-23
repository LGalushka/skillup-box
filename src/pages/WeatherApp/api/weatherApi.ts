import { ENDPOINTS } from './weatherUrl';

export const fetchCurrentWeather = async (city: string) => {
  const response = await fetch(ENDPOINTS.current(city));
  if (!response.ok) throw new Error('Город не найден');
  return response.json();
};

export const fetchForecast = async (city: string) => {
  const response = await fetch(ENDPOINTS.forecact(city));
  if (!response.ok) throw new Error('Не удалось загрузить прогноз');
  return response.json();
};
