//место
export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

//как выглядит погода иконка+текст
export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

//сейчас
export interface CurrentWeather {
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  condition: WeatherCondition;
  is_day: 0 | 1;
}

//один день
export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: WeatherCondition;
  };
}

export interface WeatherResponse {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}
