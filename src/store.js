import { configureStore } from "@reduxjs/toolkit";
import { resetMessageAfterError } from "./reducer/middleware/resetMessageAfterError";
import { authApi } from "./reducer/services/authApi";
import { alertMessageSlice } from "./reducer/slices/alertMessageSlice";

export const store = configureStore({
  reducer: {
    // Slices
    alertMessage: alertMessageSlice.reducer,
    // Api Services
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (gDM) => gDM().concat(authApi.middleware).concat(resetMessageAfterError),
});
