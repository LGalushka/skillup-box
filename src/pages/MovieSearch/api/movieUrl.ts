export const MOVIE_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

if (!MOVIE_API_KEY) {
  throw new Error('VITE_OMDB_API_KEY не задан в .env файле');
}

export const BASE_URL = 'https://www.omdbapi.com';

export const ENDPOINTS = {
  search: (query: string, page: number = 1) =>
    `${BASE_URL}?&apikey=${MOVIE_API_KEY}&s=${encodeURIComponent(query)}&page=${page}`,

  details: (imdbID: string) =>
    `${BASE_URL}?i=${imdbID}&plot=full&apikey=${MOVIE_API_KEY}`,
};
