import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movie: {},
  isLoading: false,
  error: null,
};

const singleMovieSlice = createSlice({
  name: "singleMovie",
  initialState,
  reducers: {
    fetchSingleMovieStart: (state) => {
      state.isLoading = true;
    },
    fetchSingleMovieSuccess: (state, action) => {
      state.movie = action.payload;
      state.isLoading = false;
    },
    fetchSingleMovieFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchSingleMovieStart,
  fetchSingleMovieSuccess,
  fetchSingleMovieFailure,
} = singleMovieSlice.actions;

export const singleMovieReducer = singleMovieSlice.reducer;
