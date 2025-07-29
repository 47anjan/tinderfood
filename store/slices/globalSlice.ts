import { createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  isSidebarOpen: boolean;
  isNavbarOpen: boolean;
}

const initialState: GlobalState = {
  isNavbarOpen: false,
  isSidebarOpen: false,
};

const globalSlice = createSlice({
  name: "globals",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    openNavbar: (state) => {
      state.isNavbarOpen = true;
    },
    closeNavbar: (state) => {
      state.isNavbarOpen = false;
    },
  },
});

export const { openNavbar, openSidebar, closeNavbar, closeSidebar } =
  globalSlice.actions;

export default globalSlice.reducer;
