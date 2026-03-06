import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';
import type { OmdbMovieBase } from '../../pages/MovieSearch/types';
import type { SearchType } from '../../pages/MovieSearch/components';

const selectMovies = (state: RootState) => state.movie.movies;

export const selectTypeFilter = (state: RootState): SearchType =>
  state.movie.typeFilter as SearchType;

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
export const selectCurrentMovie = (state: RootState) =>
  state.movie.currentMovie;
export const selectDetailsLoading = (state: RootState) =>
  state.movie.detailsLoading;
export const selectDetailsError = (state: RootState) =>
  state.movie.detailsError;
