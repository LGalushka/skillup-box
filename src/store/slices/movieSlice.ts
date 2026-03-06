import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  type OmdbMovieDetails,
  type OmdbMovieBase,
  type OmdbSearchResponse,
} from '../../pages/MovieSearch/types';
import {
  fetchMovieData,
  fetchMovieDetails,
} from '../../pages/MovieSearch/api/movieApi';

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

export const fetchDetails = createAsyncThunk<
  OmdbMovieDetails,
  string,
  { rejectValue: string }
>('movie/fetchDetails', async (imdbID, { rejectWithValue, signal }) => {
  try {
    return await fetchMovieDetails(imdbID, { signal });
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
  currentMovie: OmdbMovieDetails | null;
  detailsLoading: boolean;
  detailsError: string | null;
  loading: boolean;
  error: string | null;
  query: string;
  typeFilter: 'all' | 'movie' | 'series' | 'episode';
  totalResults: number;
}

const initialState: MovieState = {
  movies: [],
  favorites: [],
  currentMovie: null,
  detailsLoading: false,
  detailsError: null,
  loading: false,
  error: null,
  query: 'inception',
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
      })
      .addCase(fetchDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
        state.currentMovie = null;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        if (action.error.name !== 'AbortError') {
          state.detailsError = action.payload ?? 'Ошибка загрузки';
        }
      });
  },
});

export const { setQuery, setTypeFilter, toggleFavorite, removeFavorite } =
  movieSlice.actions;
export default movieSlice.reducer;
