import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
  },
});

export const { addFriend } = friendsSlice.actions;

export default friendsSlice.reducer;
