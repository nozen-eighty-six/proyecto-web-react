import { createSlice } from "@reduxjs/toolkit";

const responsiveOpSlice = createSlice({
  name: "menu",
  initialState: {
    menuresponsive: false,
  },
  reducers: {
    activarMenu: (state) => {
      state.menuresponsive = true;
    },
    desactivarMenu: (state) => {
      state.menuresponsive = false;
    },
    activarDesacMenu: (state) => {
      state.menuresponsive = !state.menuresponsive;
    },
  },
});

export const { activarMenu, desactivarMenu, activarDesacMenu } =
  responsiveOpSlice.actions;
export default responsiveOpSlice.reducer;
