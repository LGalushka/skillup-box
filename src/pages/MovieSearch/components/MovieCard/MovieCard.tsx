import { Heart } from 'lucide-react';

import type { OmdbMovieBase } from '../../types';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: OmdbMovieBase;
  isFavorite: boolean;
  onToggleFavorite: (movie: OmdbMovieBase) => void;
}

export const MovieCard = ({
  movie,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) => {
  return (
    <div className="bg-card hover:border-primary relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-700 transition-colors">
      {/* Кнопка избранного */}
      <button
        onClick={() => onToggleFavorite(movie)}
        className="absolute top-2 right-2 z-10 rounded-md bg-black/50 p-1.5 transition-colors hover:bg-black/70"
      >
        <Heart
          size={18}
          className={
            isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-white'
          }
        />
      </button>

      {/* Клик → детали */}
      <Link to={`/movies/${movie.imdbID}`} className="flex h-full flex-col">
        {/* Постер — ВСЕГДА h-64, и картинка и заглушка */}
        {movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="h-64 w-full object-cover" // ← фиксированная высота
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center bg-gray-700 text-sm text-gray-500">
            {/* ↑ h-64 здесь тоже — совпадает с картинкой! */}
            Нет постера
          </div>
        )}

        {/* Текст — фиксированная высота */}
        <div className="flex h-16 flex-col justify-between p-3">
          <p className="text-text-primary line-clamp-2 text-sm leading-tight font-medium">
            {movie.Title}
          </p>
          <p className="text-text-secondary text-xs">{movie.Year}</p>
        </div>
      </Link>
    </div>
  );
};
