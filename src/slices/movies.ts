import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie, Movies } from '../shared/interfaces/common';
import MoviesService from '../shared/services/MoviesService';

export type MoviesState = {
  movies: Movies[];
  topRatedMovies: Movies[];
  movieDetail: Movie | null;
  searchResult: Movies[];
};

interface requestData {
  offset: number;
  query?: string;
}

const initialState: MoviesState = {
  movies: [],
  topRatedMovies: [],
  movieDetail: null,
  searchResult: [],
};

export const retrieveMovies = createAsyncThunk(
  'movies/retrieve',
  async ({ offset }: requestData) => {
    const res: any = await MoviesService.getAll(offset);
    return res.results;
  }
);

export const retrieveTopRatedMovies = createAsyncThunk(
  'topRated/retrieve',
  async ({ offset }: requestData) => {
    const res = await MoviesService.getTopRated(offset);
    return res.results;
  }
);

export const retrieveMovieDetail = createAsyncThunk(
  'movieDetail/retrieve',
  async (id: string) => {
    const res = await MoviesService.getMovie(id);
    return res;
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async ({ offset, query }: requestData) => {
    const res: any = await MoviesService.getSearchMovies(offset, query);
    return res.results;
  }
);

const MovieSlice = createSlice({
  name: 'Movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveMovies.fulfilled, (state, action) => {
      state.movies.push(...action.payload);
    }),
      builder.addCase(retrieveTopRatedMovies.fulfilled, (state, action) => {
        state.topRatedMovies.push(...action.payload);
      }),
      builder.addCase(retrieveMovieDetail.fulfilled, (state, action) => {
        state.movieDetail = { ...action.payload };
      }),
      builder.addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      });
  },
});

const { reducer } = MovieSlice;
export default reducer;
