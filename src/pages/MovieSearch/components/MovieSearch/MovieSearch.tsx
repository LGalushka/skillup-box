import { useState } from 'react';
import { useDebounce, useMovieSearch } from '../../hooks';
import type { OmdbMovieBase } from '../../types';
import { useLocalStorageMovie } from '../../hooks/useLocalStorageMovies';

import {
  MovieSearchBar,
  MovieHeader,
  MovieFavorites,
  MovieGrid,
  MovieCardSkeleton,
  FilterGroup,
  type SearchType,
} from '../index';

export const MovieSearch = () => {
  const [query, setQuery] = useState<string>('inception');
  const [favorites, setFavorites] = useLocalStorageMovie<OmdbMovieBase[]>(
    'movie-favorites',
    []
  );

  const debouncedQuery = useDebounce(query.trim(), 400);
  const { data, loading, error } = useMovieSearch(debouncedQuery);
  const [typeFilter, setTypeFilter] = useState<SearchType>('all');

  function toggleFavorite(movie: OmdbMovieBase) {
    setFavorites((prev) =>
      prev.find((f) => f.imdbID === movie.imdbID)
        ? prev.filter((f) => f.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  }

  function removeFavorite(id: string) {
    setFavorites((prev) => prev.filter((f) => f.imdbID !== id));
  }

  const allMovies = data?.Search ?? [];
  const filteredMovies =
    typeFilter === 'all'
      ? allMovies
      : allMovies.filter((m) => m.Type === typeFilter);

  return (
    <div className="m-6 flex flex-col">
      <MovieHeader />
      <MovieSearchBar value={query} onChange={setQuery} />

      <FilterGroup currentFilter={typeFilter} onFilterChange={setTypeFilter} />

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
                {data?.Response === 'False'
                  ? `Ничего не найдено по запросу "${debouncedQuery}"`
                  : `Нет результатов типа "${typeFilter}" - попробуй другой фильтр`}
              </p>
            )}

          {filteredMovies.length > 0 && (
            <MovieGrid
              movies={filteredMovies}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </div>
        {/**Садебар для избранного */}
        <MovieFavorites favorites={favorites} onRemove={removeFavorite} />
      </div>
    </div>
  );
};
