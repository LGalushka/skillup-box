interface OmdbBaseResponse {
  Response: 'True' | 'False';
  Error?: string;
}

export interface OmdbMovieBase {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}

//результаты поиска
export interface OmdbSearchResponse extends OmdbBaseResponse {
  Search: OmdbMovieBase[];
  totalResults?: string;
}

//детали для одного фильма
export interface OmdbMovieDetails extends OmdbMovieBase, OmdbBaseResponse {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

export interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
  type: 'movie' | 'series' | 'episode';
  rating?: string;
  plot?: string;
  genres?: string[];
  runtime?: string;
}
