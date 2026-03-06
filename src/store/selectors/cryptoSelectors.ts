import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { CoinBase } from '../../pages/CryptoTrack/types/crypto';

const selectCoins = (state: RootState) => state.crypto.coins;
const selectSearch = (state: RootState) => state.crypto.search;

export const selectFilteredCoins = createSelector(
  [selectCoins, selectSearch],
  (coins, search) => {
    const normalized = search.trim().toLowerCase();
    return normalized
      ? coins.filter(
          (c: CoinBase) =>
            c.name.toLowerCase().includes(normalized) ||
            c.symbol.toLowerCase().includes(normalized)
        )
      : coins.slice(0, 10);
  }
);

export const selectFavorites = (state: RootState) => state.crypto.favorites;
export const selectSelectedCoin = (state: RootState) =>
  state.crypto.selectedCoin;
export const selectCryptoLoading = (state: RootState) => state.crypto.loading;
export const selectCryptoError = (state: RootState) => state.crypto.error;
export const selectLastUpdated = (state: RootState) => state.crypto.lastUpdated;
export const selectDetailsLoading = (state: RootState) =>
  state.crypto.detailsLoading;
export const selectDetailsError = (state: RootState) =>
  state.crypto.detailsError;
