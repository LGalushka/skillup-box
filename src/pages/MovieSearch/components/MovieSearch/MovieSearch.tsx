import { useState } from 'react';
import { useDebounce, useMovieSearch } from '../../hooks';
import { Input } from '../../../../components/ui/Input';

export const MovieSearch = () => {
  const [query, setQuery] = useState('inception');

  // Вот здесь главное исправление ↓
  const debouncedQuery = useDebounce(query.trim(), 400);

  // Передаём debouncedQuery, а не query!
  const { data, loading, error } = useMovieSearch(debouncedQuery);

  return (
    <>
      <div>
        <h1 className="text-textPrimary text-2xl font-bold">Movie Search</h1>
        <p className="text-textSecondary mt-4">Страница в разработке</p>
      </div>

      <div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск фильма..."
        />

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
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.Search.map((movie) => (
              <li
                key={movie.imdbID}
                className="flex items-center gap-4 rounded-lg border border-gray-700 bg-gray-800/50 p-4"
              >
                {movie.Poster !== 'N/A' ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="h-24 w-16 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-16 items-center justify-center rounded bg-gray-700 text-gray-500">
                    Нет фото
                  </div>
                )}
                <div>
                  <p className="font-medium">{movie.Title}</p>
                  <p className="text-sm text-gray-400">{movie.Year}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading &&
          !error &&
          debouncedQuery && (
            <p className="mt-6 text-gray-400">Ничего не найдено</p>
          )
        )}
      </div>
    </>
  );
};
