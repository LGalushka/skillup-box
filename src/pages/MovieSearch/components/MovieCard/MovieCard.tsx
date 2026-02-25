import { Heart } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
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
    <div className="bg-card hover:border-primary relative overflow-hidden rounded-lg border border-gray-700 transition-colors">
      {/**Кнопка избранного -поверх постера */}
      <Button
        onClick={() => onToggleFavorite(movie)}
        className="bg-card/50 hover:border-s-card/50 absolute top-2 right-2 z-10 rounded-md p-1.5 transition-colors"
      />
      {isFavorite ? (
        <Heart size={20} className="fill-black text-red-500" />
      ) : (
        <Heart size={20} className="fill-black text-white" />
      )}

      {/**Клик по карточке */}
      <Link to={`/movies/${movie.imdbID}`} className="block">
        {movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="h-52 w-full object-cover"
          />
        ) : (
          <div className="bg-card text-secondary flex h-52 w-full items-center justify-center text-sm">
            Нет постера
          </div>
        )}

        <div className="p-3">
          <p className="text-text-primary line-clamp-2 text-sm leading-tight font-medium">
            {movie.Title}
          </p>
          <p className="text-text-secondary text-xs">{movie.Year}</p>
        </div>
      </Link>
    </div>
  );
};
