import { useState } from 'react';
import { useDebounce, useMovieSearch } from '../../hooks';
import { MovieSearchBar } from '../MovieSearchBar';
import { MovieHeader } from '../MovieHeader';
import type { OmdbMovieBase } from '../../types';
import { MovieFavorites } from '../MovieFavorites';
import { useLocalStorageMovie } from '../../hooks/useLocalStorageMovies';
import { MovieGrid } from '../MovieGrid';
import { MovieCardSkeleton } from '../MovieCardSkeleton';

export const MovieSearch = () => {
  const [query, setQuery] = useState<string>('inception');
  const [favorites, setFavorites] = useLocalStorageMovie<OmdbMovieBase[]>(
    'movie-favorites',
    []
  );

  const debouncedQuery = useDebounce(query.trim(), 400);
  const { data, loading, error } = useMovieSearch(debouncedQuery);

  function toggleFovorite(movie: OmdbMovieBase) {
    setFavorites((prev) =>
      prev.find((f) => f.imdbID === movie.imdbID)
        ? prev.filter((f) => f.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  }

  function removeFavorite(id: string) {
    setFavorites((prev) => prev.filter((f) => f.imdbID !== id));
  }

  return (
    <div className="m-6 flex flex-col">
      <MovieHeader />
      <MovieSearchBar value={query} onChange={setQuery} />

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
          {!loading && !error && data?.Response === 'False' && (
            <p className="mt-4 text-yellow-500">
              Ничего не найдено по запросу "{debouncedQuery}"
            </p>
          )}

          {data?.Search?.length ? (
            <MovieGrid
              movies={data.Search}
              favorites={favorites}
              onToggleFavorite={toggleFovorite}
            />
          ) : null}
        </div>
        {/**Садебар для избранного */}
        <MovieFavorites favorites={favorites} onRemove={removeFavorite} />
      </div>
    </div>
  );
};
