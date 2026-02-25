import { fetchMovieDetails } from '../api/movieApi';
import type { OmdbMovieDetails } from '../types';
import { useAsyncResource } from './useAsyncResource';

export function useMovieDetails(imdbID: string) {
  return useAsyncResource<OmdbMovieDetails>(
    (signal) => fetchMovieDetails(imdbID, { signal }),
    [imdbID],
    Boolean(imdbID)
  );
}
