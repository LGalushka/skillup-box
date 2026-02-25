export interface OmdbSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}

export interface OmdbSearchResponse {
  Search: OmdbSearchResult[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface OmdbMovie extends OmdbSearchResult {
  Plot: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Genre: string;
  Runtime: string;
}

export interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
  type: 'movie' | 'series' | 'episode';
  rating?: string;
}
