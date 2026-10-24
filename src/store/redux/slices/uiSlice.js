import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  theme: "dark",
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    openModal: (state, action) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload.type;
      state.modal.data = action.payload.data || null;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.type = null;
      state.modal.data = null;
    },
  },
});

export const { toggleSidebar, setTheme, openModal, closeModal } =
  uiSlice.actions;
export default uiSlice.reducer;
