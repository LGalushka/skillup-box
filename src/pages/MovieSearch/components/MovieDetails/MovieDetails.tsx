import { useNavigate, useParams } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { Button } from '../../../../components/ui/Button';

export const MovieDetails = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useMovieDetails(imdbID ?? '');

  if (loading)
    return (
      <div className="text-text-secondary flex h-64 items-center justify-center">
        Загружаем...
      </div>
    );

  if (error) return <div className="p-4 text-red-500">Ошибка: {error}</div>;

  if (!data) return null;

  return (
    <div className="mx-auto max-w-3xl p-6">
      {/**Назад */}
      <Button
        onClick={() => navigate(-1)}
        className="text-text-secondary mb-6 flex items-center gap-2 text-sm transition-colors hover:text-white"
      >
        ← Назад к поиску
      </Button>

      <div className="flex gap-6">
        {/**Постер */}
        {data.Poster !== 'N/A' && (
          <img
            src={data.Poster}
            alt={data.Title}
            className="w-48 shrink-0 rounded-lg object-cover"
          />
        )}

        {/**Инфо */}
        <div className="flex flex-col gap-3">
          <h1 className="text-text-primary text-2xl font-bold">{data.Title}</h1>
          <div className="text-text-secondary flex gap-3 text-sm">
            <span>{data.Year}</span>
            <span>·</span>
            <span>{data.Runtime}</span>
            <span>·</span>
            <span>{data.Genre}</span>
          </div>

          {/**Рейтинг */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⭐</span>
            <span className="font-bold text-white">{data.imdbRating}</span>
            <span className="text-sm text-gray-500">/ 10 IMDb</span>
          </div>

          <p className="text-sm leading-relaxed text-gray-300">{data.Plot}</p>

          <div className="space-y-1 text-sm text-gray-400">
            <p>
              <span className="text-gray-500">Режиссёр:</span> {data.Director}
            </p>
            <p>
              <span className="text-gray-500">Актёры:</span> {data.Actors}
            </p>
          </div>
        </div>
      </div>
      <p>Детили фильма: {imdbID}</p>
    </div>
  );
};
