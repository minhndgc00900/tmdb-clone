import { configureStore } from '@reduxjs/toolkit';
import MovieSlice from './slices/movies';

const reducer = {
  movies: MovieSlice,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
