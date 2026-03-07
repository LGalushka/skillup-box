import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  type CoinDetails,
  type CoinBase,
  type Coin,
} from '../../pages/CryptoTrack/types/crypto';

import {
  fetchCoins,
  fetchCryptoDetails,
} from '../../pages/CryptoTrack/api/cryptoApi';

export const fetchCoinsThunk = createAsyncThunk<
  Coin[],
  void,
  { rejectValue: string }
>('crypto/fetchCoins', async (_NEVER, { rejectWithValue, signal }) => {
  try {
    return await fetchCoins({ signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    return rejectWithValue(
      err instanceof Error ? err.message : 'Ошибка загрузки'
    );
  }
});

export const fetchCoinDetails = createAsyncThunk<
  CoinDetails,
  string,
  { rejectValue: string }
>('crypto/fetchDetails', async (id, { rejectWithValue, signal }) => {
  try {
    return await fetchCryptoDetails(id, { signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    return rejectWithValue(
      err instanceof Error ? err.message : 'Ошибка загрузки'
    );
  }
});

interface CryptoState {
  coins: Coin[];
  favorites: CoinBase[];
  selectedCoin: CoinDetails | null;
  loading: boolean;
  detailsLoading: boolean;
  error: string | null;
  detailsError: string | null;
  lastUpdated: string | null;
  search: string;
}

const initialState: CryptoState = {
  coins: [],
  favorites: [],
  selectedCoin: null,
  loading: false,
  detailsLoading: false,
  error: null,
  detailsError: null,
  lastUpdated: null,
  search: '',
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<CoinBase>) => {
      const exist = state.favorites.find((f) => f.id === action.payload.id);
      if (exist) {
        state.favorites = state.favorites.filter(
          (f) => f.id !== action.payload.id
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload.slice(0, 100); // ✅ здесь правильно
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCoinsThunk.rejected, (state, action) => {
        state.loading = false;
        if (action.error.name !== 'AbortError') {
          state.error = action.payload ?? 'Ошибка загрузки';
        }
      })
      .addCase(fetchCoinDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
        state.selectedCoin = null;
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedCoin = action.payload;
      })
      .addCase(fetchCoinDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        if (action.error.name !== 'AbortError') {
          state.detailsError = action.payload ?? 'Ошибка загрузки';
        }
      });
  },
});

export const { setSearch, toggleFavorite } = cryptoSlice.actions;
export default cryptoSlice.reducer;
