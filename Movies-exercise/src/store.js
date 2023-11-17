import { configureStore } from "@reduxjs/toolkit";

import { moviesReducer } from "./slices/moviesSlice";
import { singleMovieReducer } from "./slices/singleMovieSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    singleMovie: singleMovieReducer,
  },
});
