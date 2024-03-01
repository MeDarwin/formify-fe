import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./reducer/slices/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
