import type { WeatherResponse } from '../types/weather';
import { ENDPOINTS } from './weatherUrl';

export const fetchWeatherData = async (
  city: string
): Promise<WeatherResponse> => {
  const response = await fetch(ENDPOINTS.forecact(city));
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Ошибка загрузки погоды');
  }
  return response.json();
};
