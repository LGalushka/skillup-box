import { useEffect } from 'react';
import { useDebounce } from '../../hooks';

import {
  setQuery,
  setTypeFilter,
  toggleFavorite,
  removeFavorite,
  searchMovies,
} from '../../../../store/slices/movieSlice';

import {
  selectQuery,
  selectTypeFilter,
  selectFilteredMovies,
  selectFavorites,
  selectMovieLoading,
  selectMovieError,
} from '../../../../store/selectors/movieSelectors';

import {
  MovieSearchBar,
  MovieHeader,
  MovieFavorites,
  MovieGrid,
  MovieCardSkeleton,
  FilterGroup,
} from '../index';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

export const MovieSearch = () => {
  const dispatch = useAppDispatch();

  const query = useAppSelector(selectQuery);
  const typeFilter = useAppSelector(selectTypeFilter);
  const filteredMovies = useAppSelector(selectFilteredMovies);
  const favorites = useAppSelector(selectFavorites);
  const loading = useAppSelector(selectMovieLoading);
  const error = useAppSelector(selectMovieError);

  const debouncedQuery = useDebounce(query.trim(), 400);

  useEffect(() => {
    if (!debouncedQuery.trim()) return;
    dispatch(searchMovies({ query: debouncedQuery }));
  }, [debouncedQuery, dispatch]);

  return (
    <div className="m-6 flex flex-col">
      <MovieHeader />
      <MovieSearchBar
        value={query}
        onChange={(val) => dispatch(setQuery(val))}
      />

      <FilterGroup
        currentFilter={typeFilter}
        onFilterChange={(f) => dispatch(setTypeFilter(f))}
      />

      <div className="flex items-center gap-6">
        <div className="min-w-0 flex-1">
          {loading && (
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <li key={i}>
                  <MovieCardSkeleton />
                </li>
              ))}
            </ul>
          )}
          {error && <p className="mt-4 text-red-500">Ошибка: {error}</p>}

          {!loading &&
            !error &&
            filteredMovies.length === 0 &&
            debouncedQuery && (
              <p className="mt-4 text-yellow-500">
                {error
                  ? `Ничего не найдено по запросу "${debouncedQuery}"`
                  : `Нет результатов типа "${typeFilter}" - попробуй другой фильтр`}
              </p>
            )}

          {filteredMovies.length > 0 && (
            <MovieGrid
              movies={filteredMovies}
              favorites={favorites}
              onToggleFavorite={(movie) => dispatch(toggleFavorite(movie))}
            />
          )}
        </div>
        {/**Садебар для избранного */}
        <MovieFavorites
          favorites={favorites}
          onRemove={(id) => dispatch(removeFavorite(id))}
        />
      </div>
    </div>
  );
};
