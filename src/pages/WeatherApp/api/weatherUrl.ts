export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const BASE_URL = 'https://api.weatherapi.com/v1';

export const ENDPOINTS = {
  forecact: (city: string, days = 5) =>
    `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=${days}&aqi=no&lang=ru`,
};
