import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuario: localStorage.getItem("usuario") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.usuario = action.payload;
    },
    removeUser(state) {
      state.usuario = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
