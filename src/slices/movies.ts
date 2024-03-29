import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie, Movies } from '../shared/interfaces/common';
import MoviesService from '../shared/services/MoviesService';

export type MoviesState = {
  movies: Movies[];
  topRatedMovies: Movies[];
  movieDetail: Movie | null;
  searchResult: Movies[];
  error: any;
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
  error: null,
};

export const retrieveMovies = createAsyncThunk(
  'movies/retrieve',
  async ({ offset }: requestData, thunkApi) => {
    try {
      const res: any = await MoviesService.getAll(offset);
      return res.results;
    } catch (error: any) {
      // Use rejectWithValue to return error payload
      return thunkApi.rejectWithValue(error?.message);
    }
  }
);

export const retrieveTopRatedMovies = createAsyncThunk(
  'topRated/retrieve',
  async ({ offset }: requestData, thunkApi) => {
    try {
      const res = await MoviesService.getTopRated(offset);
      return res.results;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
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
  reducers: {
    clearMoviesState: (state) => {
      state.movies = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveMovies.fulfilled, (state, action) => {
      state.movies.push(...action.payload);
      state.error = null; // Clear error on successful fetch
    }),
      builder.addCase(retrieveMovies.pending, (state) => {
        state.error = null; // Clear any previous errors
      }),
      builder.addCase(retrieveTopRatedMovies.pending, (state) => {
        state.error = null; // Clear any previous errors
      });
    builder.addCase(retrieveMovies.rejected, (state, action) => {
      state.error = action.payload; // Set the error message
    }),
      builder.addCase(retrieveTopRatedMovies.rejected, (state, action) => {
        state.error = action.payload; // Set the error message
      }),
      builder.addCase(retrieveTopRatedMovies.fulfilled, (state, action) => {
        state.topRatedMovies.push(...action.payload);
        state.error = null; // Clear error on successful fetch
      }),
      builder.addCase(retrieveMovieDetail.fulfilled, (state, action) => {
        state.movieDetail = { ...action.payload };
        state.error = null; // Clear error on successful fetch
      });
  },
});

const { reducer } = MovieSlice;
export const { clearMoviesState } = MovieSlice.actions;
export default reducer;
