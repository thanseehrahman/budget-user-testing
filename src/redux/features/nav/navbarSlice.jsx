import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navbar: true,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    activateNavbar: (state) => {
      state.navbar = true;
    },
    deactivateNavbar: (state) => {
      state.navbar = false;
    },
  },
});

export const { activateNavbar, deactivateNavbar } = navbarSlice.actions;

export const selectNavbar = (state) => state.navbar.navbar;

export default navbarSlice.reducer;
