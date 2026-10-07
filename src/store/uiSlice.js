import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false, // Sidebar open/closed status
  theme: 'dark',        // Default UI theme
  modal: {
    isOpen: false,
    type: null,         // Modal type (e.g., 'delete', 'edit')
    data: null,         // Extra payload passed to the modal
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Toggle sidebar status (open/close)
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    // Set active theme
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    // Open modal and set its type and data
    openModal: (state, action) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload.type;
      state.modal.data = action.payload.data || null;
    },
    // Close modal and reset state
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.type = null;
      state.modal.data = null;
    },
  },
});

export const { toggleSidebar, setTheme, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;