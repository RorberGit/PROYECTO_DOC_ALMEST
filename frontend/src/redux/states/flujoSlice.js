import { createSlice } from "@reduxjs/toolkit";

export const EmptyFlujoState = [];

export const flujoSlice = createSlice({
  name: "flujo",
  initialState: EmptyFlujoState,
  reducers: {
    createFlujo: (state, action) => {
      return action.payload;
    },
    updateFlujo: (state, action) => {
      const result = { ...state, ...action.payload };
      return result;
    },
    resetFlujo: () => {
      return EmptyFlujoState;
    },
  },
});

export const { createFlujo, updateFlujo, resetFlujo } = flujoSlice.actions;

export default flujoSlice.reducer;
