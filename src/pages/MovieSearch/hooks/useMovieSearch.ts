import { fetchMovieData } from '../api/movieApi';
import type { OmdbSearchResponse } from '../types';
import { useAsyncResource } from './useAsyncResource';

export function useMovieSearch(query: string, page: number = 1) {
  return useAsyncResource<OmdbSearchResponse>(
    (signal) => fetchMovieData(query, page, { signal }),
    [query, page],
    Boolean(query.trim())
  );
}
