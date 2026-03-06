import type { RootState } from '..';

export const selectWeatherData = (state: RootState) => state.weather.data;

export const selectCurrentWeather = (state: RootState) =>
  state.weather.data?.current ?? null;
export const selectForecast = (state: RootState) =>
  state.weather.data?.forecast.forecastday ?? [];
export const selectLocation = (state: RootState) =>
  state.weather.data?.location ?? null;

export const selectCity = (state: RootState) => state.weather.city;
export const selectWeatherLoading = (state: RootState) => state.weather.loading;
export const selectWeatherError = (state: RootState) => state.weather.error;
