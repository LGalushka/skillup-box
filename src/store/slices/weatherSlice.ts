import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { WeatherResponse } from '../../pages/WeatherApp/types/weather';

import { fetchWeatherData } from '../../pages/WeatherApp/api';
import { REHYDRATE } from 'redux-persist';

export const searchWeather = createAsyncThunk<
  WeatherResponse,
  { city: string; days?: number },
  { rejectValue: string }
>('weather/search', async ({ city, days = 3 }, { rejectWithValue, signal }) => {
  try {
    return await fetchWeatherData(city, days, { signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    return rejectWithValue(
      err instanceof Error ? err.message : 'Ошибка загрузки'
    );
  }
});

interface WeatherState {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  city: string;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  city: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    claerError: (state) => {
      state.error = null;
    },
    clearWeather: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(searchWeather.rejected, (state, action) => {
        state.loading = false;
        if (action.error.name !== 'AbortError') {
          state.error = action.payload ?? 'Ошибка загрузки';
          state.data = null;
        }
      })
      .addCase(REHYDRATE, (state) => {
        state.error = null;
      });
  },
});

export const { setCity, claerError, clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
