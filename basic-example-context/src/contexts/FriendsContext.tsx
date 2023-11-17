import React from "react";

const initialState = {
  friends: [],
  addFriend: (friend: any) => {},
};

export const FriendsContext = React.createContext(initialState);
