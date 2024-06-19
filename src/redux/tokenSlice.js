import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenUser: localStorage.getItem("token") || null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.tokenUser = action.payload;
    },
    removeToken: (state) => {
      state.tokenUser = null;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
