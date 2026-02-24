export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
if (!WEATHER_API_KEY) {
  throw new Error('VITE_WEATHER_API_KEY не задан в .env файле');
}

export const BASE_URL = 'https://api.weatherapi.com/v1';

export const ENDPOINTS = {
  /**
   * @param city Город или координаты
   * @param days Кол-во дней прогноза
   */

  forecast: (city: string, days: number = 3): string =>
    `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&days=${days}&aqi=no&lang=ru`,
  current: (city: string): string =>
    `${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&aqi=no&lang=ru`,
};
