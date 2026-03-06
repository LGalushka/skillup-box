import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type {
  OmdbMovieBase,
  OmdbSearchResponse,
} from '../../pages/MovieSearch/types';
import { fetchMovieData } from '../../pages/MovieSearch/api/movieApi';

export const searchMovies = createAsyncThunk<
  OmdbSearchResponse,
  { query: string; page?: number },
  { rejectValue: string }
>('movie/search', async ({ query, page = 1 }, { rejectWithValue, signal }) => {
  try {
    // ✅ signal передаём напрямую — RTK сам создаёт AbortController
    return await fetchMovieData(query, page, { signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    return rejectWithValue(
      err instanceof Error ? err.message : 'Ошибка загрузки'
    );
  }
});

interface MovieState {
  movies: OmdbMovieBase[];
  favorites: OmdbMovieBase[];
  loading: boolean;
  error: string | null;
  query: string;
  typeFilter: 'all' | 'movie' | 'series' | 'episode';
  totalResults: number;
}

const initialState: MovieState = {
  movies: [],
  favorites: [],
  loading: false,
  error: null,
  query: 'inception', // ✅ дефолтный запрос как было
  typeFilter: 'all',
  totalResults: 0,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<MovieState['typeFilter']>) => {
      state.typeFilter = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<OmdbMovieBase>) => {
      const exists = state.favorites.find(
        (f) => f.imdbID === action.payload.imdbID
      );
      if (exists) {
        state.favorites = state.favorites.filter(
          (f) => f.imdbID !== action.payload.imdbID
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (f) => f.imdbID !== action.payload
      );
    },
  },
  // ✅ обработка async статусов
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search ?? [];
        state.totalResults = Number(action.payload.totalResults ?? 0);
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        // ✅ AbortError не показываем как ошибку
        if (action.error.name !== 'AbortError') {
          state.error = action.payload ?? 'Ошибка загрузки';
          state.movies = [];
        }
      });
  },
});

export const { setQuery, setTypeFilter, toggleFavorite, removeFavorite } =
  movieSlice.actions;
export default movieSlice.reducer;
