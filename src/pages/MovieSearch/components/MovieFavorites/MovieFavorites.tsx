import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom'; // ← добавь импорт
import type { OmdbMovieBase } from '../../types';
import { Button } from '../../../../components/ui/Button';

interface MovieFavoritesProps {
  favorites: OmdbMovieBase[];
  onRemove: (imdbID: string) => void;
}

export const MovieFavorites = ({
  favorites,
  onRemove,
}: MovieFavoritesProps) => {
  return (
    <aside className="bg-card/50 border-border-color sticky top-4 w-60 shrink-0 self-start rounded-lg p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-text-primary flex items-center gap-1 text-sm font-bold">
          <Heart size={16} className="fill-red-500 text-red-500" />
          Избранное
        </h3>
        <span className="bg-card/85 text-text-primary rounded-full px-2 py-0.5 text-xs">
          {favorites.length}
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="py-6 text-center">
          <p className="mb-2 text-2xl">🎬</p>
          <p className="text-text-secondary text-xs leading-relaxed">
            Нажми ♥ на карточке чтобы добавить фильм
          </p>
        </div>
      ) : (
        <ul className="max-h-500px flex flex-col gap-2 overflow-y-auto">
          {favorites.map((movie) => (
            <li
              key={movie.imdbID}
              className="bg-card flex items-center gap-2 rounded-lg p-2"
            >
              {/* ↓ Link оборачивает только постер и текст */}
              <Link
                to={`/movies/${movie.imdbID}`}
                className="flex min-w-0 flex-1 items-center gap-2 transition-opacity hover:opacity-80"
              >
                {movie.Poster !== 'N/A' ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="h-11 w-8 shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="h-11 w-8 shrink-0 rounded bg-gray-700" />
                )}
                <div className="min-w-0">
                  <p className="text-text-primary truncate text-xs font-medium">
                    {movie.Title}
                  </p>
                  <p className="text-text-secondary text-xs">{movie.Year}</p>
                </div>
              </Link>

              {/* Кнопка удаления — отдельно от Link */}
              <Button
                onClick={() => onRemove(movie.imdbID)}
                className="text-text-secondary shrink-0 text-lg leading-none transition-colors hover:text-red-400"
                title="Убрать"
                variant="secondary"
              >
                ×
              </Button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};
