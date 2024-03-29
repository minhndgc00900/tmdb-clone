export type Resource = {
  id: string;
};

export interface Movies {
  id: string;
  rank?: string;
  title: string;
  overview: string;
  year?: string;
  poster_path: string;
  vote_average: number;
  vote_count: string;
  crew?: string;
}

export interface genre {
  id: number;
  name: string;
}

export interface Movie extends Movies {
  duration?: number;
  plot?: string;
  genres: genre[];
  release_date: string;
  runtime: number;
}

export interface MovieList {
  results: Movies[];
}
