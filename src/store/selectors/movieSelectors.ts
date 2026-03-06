import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { OmdbMovieBase } from '../../pages/MovieSearch/types';

const selectMovies = (state: RootState) => state.movie.movies;
const selectTypeFilter = (state: RootState) => state.movie.typeFilter;

export const selectFilteredMovies = createSelector(
  [selectMovies, selectTypeFilter],
  (movies, typeFilter) =>
    typeFilter === 'all'
      ? movies
      : movies.filter((m: OmdbMovieBase) => m.Type === typeFilter)
);

export const selectFavorites = (state: RootState) => state.movie.favorites;
export const selectMovieLoading = (state: RootState) => state.movie.loading;
export const selectMovieError = (state: RootState) => state.movie.error;
export const selectQuery = (state: RootState) => state.movie.query;
