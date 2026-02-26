import type { OmdbMovieBase } from '../../types';
import { MovieCard } from '../MovieCard/MovieCard';

interface MovieGridProps {
  movies: OmdbMovieBase[];
  favorites: OmdbMovieBase[];
  onToggleFavorite: (movie: OmdbMovieBase) => void;
}

export const MovieGrid = ({
  movies,
  favorites,
  onToggleFavorite,
}: MovieGridProps) => {
  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <li key={movie.imdbID} className="h-full">
          <MovieCard
            movie={movie}
            isFavorite={favorites.some((f) => f.imdbID === movie.imdbID)}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  );
};
