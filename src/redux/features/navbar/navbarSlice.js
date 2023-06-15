import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navbar: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    expandNavbar: (state) => {
      state.navbar = true;
    },
    minimizeNavbar: (state) => {
      state.navbar = false;
    },
  },
});

export const { expandNavbar, minimizeNavbar } = navbarSlice.actions;

export const selectNavbar = (state) => state.navbar.navbar;

export default navbarSlice.reducer;
