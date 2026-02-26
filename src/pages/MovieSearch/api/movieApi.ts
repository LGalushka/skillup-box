import type { OmdbMovieDetails, OmdbSearchResponse } from '../types';
import { ENDPOINTS } from './movieUrl';

export const fetchMovieData = async (
  query: string,
  page: number = 1,
  options: RequestInit = {}
): Promise<OmdbSearchResponse> => {
  if (!query.trim()) {
    throw new Error('Запрос не может быть пустым');
  }
  const url = ENDPOINTS.search(query, page);
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }
    const raw = await response.json();
    const data = raw as OmdbSearchResponse;

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Фильмы не найдены');
    }

    if (!Array.isArray(data.Search)) {
      throw new Error('Некорректный формат ответа от сервера');
    }

    return data;
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err;
    }
    console.error(`Ошибка при поиске "${query}":'`, err);
    throw err instanceof Error
      ? err
      : new Error('Неизвестная ошибка при загрузке');
  }
};

//детали одного фильма
export const fetchMovieDetails = async (
  imdbID: string,
  options: RequestInit = {}
): Promise<OmdbMovieDetails> => {
  if (!imdbID.trim()) {
    throw new Error('ID фильма не может быть пустым');
  }

  const url = ENDPOINTS.details(imdbID);
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
    }
    const raw = await response.json();
    const data = raw as OmdbMovieDetails;
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Не удалось загрузить детали фильма');
    }
    return data;
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err;
    }
    console.error(`Ошибка при загрузке деталей imdbID=${imdbID}:`, err);
    throw err instanceof Error ? err : new Error('Неизвестная ошибка');
  }
};
