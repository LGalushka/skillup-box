import type { WeatherResponse } from '../types/weather';
import { ENDPOINTS } from './weatherUrl';

export const fetchWeatherData = async (
  city: string,
  days: number = 3,
  options: RequestInit = {}
): Promise<WeatherResponse> => {
  const url = ENDPOINTS.forecast(city, days);

  const response = await fetch(url, options);

  if (!response.ok) {
    let errorMessage = 'Ошибка загрузки погоды';
    try {
      const errorData = await response.json();
      errorMessage = errorData.error?.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  return response.json();
};
