import { useNavigate, useParams } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { Button } from '../../../../components/ui/Button';
import { Heart, MoveLeftIcon } from 'lucide-react';
import { useLocalStorageMovie } from '../../hooks/useLocalStorageMovies';
import type { OmdbMovieBase } from '../../types';

export const MovieDetails = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useMovieDetails(imdbID ?? '');
  const [favorites, setFavorites] = useLocalStorageMovie<OmdbMovieBase[]>(
    'movie-favorites',
    []
  );

  const isFavorite = favorites.some((f) => f.imdbID === data?.imdbID);

  function toggleFavorite() {
    if (!data) return;
    setFavorites((prev) =>
      isFavorite
        ? prev.filter((f) => f.imdbID !== data.imdbID)
        : [...prev, data]
    );
  }

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-blue-500" />
          <p className="text-sm text-gray-400">Загружаем...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="mb-3 text-4xl">😕</p>
          <p className="font-medium text-red-400">Ошибка загрузки</p>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <Button
            onClick={() => navigate(-1)}
            className="mt-4 text-sm text-blue-400 transition-colors hover:text-blue-300"
          >
            ← Вернуться назад
          </Button>
        </div>
      </div>
    );

  if (!data) return null;

  const rating = parseFloat(data.imdbRating);
  const ratingColor =
    rating >= 8
      ? 'text-green-400'
      : rating >= 6
        ? 'text-yellow-400'
        : 'text-red-400';

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Кнопка назад */}
      <Button
        onClick={() => navigate(-1)}
        className="group mb-6 flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
      >
        <span className="transition-transform group-hover:-translate-x-1">
          <MoveLeftIcon size={20} />
        </span>
        Назад к поиску
      </Button>

      {/* Основной блок */}
      <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50">
        {/* Верхняя часть — постер + основная инфо */}
        <div className="flex gap-6 p-6">
          {/* Постер */}
          <div className="flex shrink-0">
            {data.Poster !== 'N/A' ? (
              <img
                src={data.Poster}
                alt={data.Title}
                className="w-52 rounded-lg object-cover shadow-2xl"
              />
            ) : (
              <div className="flex h-64 w-52 items-center justify-center rounded-lg bg-gray-700 text-sm text-gray-500">
                Нет постера
              </div>
            )}
          </div>

          {/* Инфо справа */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {/* Заголовок */}
            <div>
              <div className="flex">
                <h1 className="text-2xl leading-tight font-bold text-white">
                  {data.Title}
                </h1>
                <button onClick={toggleFavorite} className="ml-10">
                  <Heart
                    size={22}
                    className={
                      isFavorite
                        ? 'fill-red-500 text-red-500'
                        : 'fill-none text-white'
                    }
                  />
                </button>
              </div>

              <p className="mt-1 text-sm text-gray-400">
                {data.Year} · {data.Runtime} · {data.Country}
              </p>
            </div>
            {/* Рейтинг IMDb */}
            <div className="flex w-fit items-center gap-2 rounded-lg bg-gray-700/50 px-3 py-2">
              <span className="text-lg text-yellow-400">⭐</span>
              <span className={`text-xl font-bold ${ratingColor}`}>
                {data.imdbRating}
              </span>
              <span className="text-sm text-gray-500">/ 10</span>
              <span className="ml-1 text-xs text-gray-600">
                ({data.imdbVotes} голосов)
              </span>
            </div>
            {/* Жанры — теги */}
            <div className="flex flex-wrap gap-2">
              {data.Genre.split(', ').map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-blue-500/30 bg-blue-500/20 px-2 py-1 text-xs text-blue-300"
                >
                  {genre}
                </span>
              ))}
            </div>
            {/* Режиссёр и актёры */}
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="flex shrink-0 text-gray-500">Режиссёр</span>
                <span className="text-gray-200">{data.Director}</span>
              </div>
              <div className="flex gap-2">
                <span className="flex shrink-0 text-gray-500">Актёры</span>
                <span className="line-clamp-2 text-gray-200">
                  {data.Actors}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="flex shrink-0 text-gray-500">Язык</span>
                <span className="text-gray-200">{data.Language}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="mx-6 border-t border-gray-700" />

        {/* Сюжет */}
        <div className="p-6">
          <h2 className="mb-3 text-sm font-semibold tracking-wider text-gray-400 uppercase">
            Сюжет
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">{data.Plot}</p>
        </div>

        {/* Нижняя полоска — доп инфо */}
        {(data.BoxOffice || data.Awards) && (
          <>
            <div className="mx-6 border-t border-gray-700" />
            <div className="grid grid-cols-2 gap-4 p-6">
              {data.BoxOffice && data.BoxOffice !== 'N/A' && (
                <div>
                  <p className="mb-1 text-xs tracking-wider text-gray-500 uppercase">
                    Сборы
                  </p>
                  <p className="font-medium text-white">{data.BoxOffice}</p>
                </div>
              )}
              {data.Awards && data.Awards !== 'N/A' && (
                <div>
                  <p className="mb-1 text-xs tracking-wider text-gray-500 uppercase">
                    Награды
                  </p>
                  <p className="text-sm font-medium text-white">
                    {data.Awards}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
