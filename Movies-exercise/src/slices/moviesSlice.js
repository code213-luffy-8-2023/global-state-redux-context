import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    fetchMoviesStart: (state) => {
      state.isLoading = true;
    },
    fetchMoviesSuccess: (state, action) => {
      state.movies = action.payload;
      state.isLoading = false;
    },
    fetchMoviesFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } =
  moviesSlice.actions;

export const moviesReducer = moviesSlice.reducer;
