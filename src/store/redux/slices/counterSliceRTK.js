import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSliceRTK = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increament: (state) => {
      state.value += 1;
    },
    decreament: (state) => {
      state.value -= 1;
    },
    increamentByAmount: (state, action) => {
      state.value += action.payload;
    },
    decreamentByvalue: (state, action) => {
      state.value -= action.payload;
    },
  },
});

export const {
  increament,
  decreament,
  increamentByAmount,
  decreamentByvalue,
} = counterSliceRTK.actions;

export default counterSliceRTK.reducer;
