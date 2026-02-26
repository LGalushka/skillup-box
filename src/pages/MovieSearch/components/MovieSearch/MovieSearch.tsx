import { useState } from 'react';
import { useDebounce, useMovieSearch } from '../../hooks';

import { MovieSearchBar } from '../MovieSearchBar';
import { MovieHeader } from '../MovieHeader';
import type { OmdbMovieBase } from '../../types';
import { MovieCard } from '../MovieCard/MovieCard';
import { MovieFavorites } from '../MovieFavorites';

export const MovieSearch = () => {
  const [query, setQuery] = useState<string>('inception');
  const [favorites, setFavorites] = useState<OmdbMovieBase[]>([]);

  const debouncedQuery = useDebounce(query.trim(), 400);

  const { data, loading, error } = useMovieSearch(debouncedQuery);

  function toggleFovorite(movie: OmdbMovieBase) {
    setFavorites((prev) =>
      prev.find((f) => f.imdbID === movie.imdbID)
        ? prev.filter((f) => f.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  }

  return (
    <div className="m-6 flex flex-col">
      <MovieHeader />

      {/**Поиск */}
      <MovieSearchBar value={query} onChange={setQuery} />

      {/**Контент */}
      <div className="flex items-center gap-6">
        {/**Основная область */}

        <div className="min-w-0 flex-1">
          {loading && <p className="mt-4 text-gray-400">Загружаем...</p>}

          {error && (
            <p className="mt-4 text-red-500">
              Ошибка: {error}
              {error.includes('Incorrect IMDb ID') &&
                ' (возможно, ошибка в вызове деталей фильма)'}
            </p>
          )}

          {!loading && !error && data?.Response === 'False' && (
            <p className="mt-4 text-yellow-500">
              Ничего не найдено по запросу "{debouncedQuery}"
            </p>
          )}

          {data?.Search?.length ? (
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {data.Search.map((movie) => (
                <li key={movie.imdbID} className="h-full">
                  <MovieCard
                    movie={movie}
                    isFavorite={favorites.some(
                      (f) => f.imdbID === movie.imdbID
                    )}
                    onToggleFavorite={toggleFovorite}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {/**Садебар для избранного */}
        <MovieFavorites
          favorites={favorites}
          onRemove={(id) =>
            setFavorites((prev) => prev.filter((f) => f.imdbID !== id))
          }
        />
      </div>
    </div>
  );
};
