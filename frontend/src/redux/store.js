import { configureStore } from "@reduxjs/toolkit";
import { flujoSliceReducer, userSliceReducer } from "./states";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    flujo: flujoSliceReducer,
  },
});
