export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const BASE_URL = 'https://api.weatherapi.com/v1';

export const ENDPOINTS = {
  current: (city: string) =>
    `${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`,
  forecact: (city: string) =>
    `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=5&aqi=no`,
};
