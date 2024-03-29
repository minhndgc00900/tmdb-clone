import { makeApiRequest } from '../apis/axiosClient';
import { ApiMethods } from '../enums/api';
import { Movie, MovieList } from '../interfaces/common';

const getAll = (offset: number, limit = 28) =>
  makeApiRequest<MovieList>(ApiMethods.get, 'discover/movie', {
    params: {
      page: offset,
      include_video: false,
      language: 'en-US',
    },
  });

const getTopRated = (offset: number) =>
  makeApiRequest<MovieList>(ApiMethods.get, 'movie/top_rated', {
    params: {
      page: offset,
      include_video: false,
      language: 'en-US',
    },
  });

const getMovie = (movieId: string) =>
  makeApiRequest<Movie>(ApiMethods.get, `movie/${movieId}`, {});

const getSearchMovies = (offset: number, query?: string) =>
  makeApiRequest<Movie>(ApiMethods.get, `search/movie`, {
    params: {
      page: offset,
      query,
      include_video: false,
      language: 'en-US',
    },
  });

const MoviesService = {
  getAll,
  getMovie,
  getTopRated,
  getSearchMovies,
};

export default MoviesService;
