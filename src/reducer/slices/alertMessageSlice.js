import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "info",
  errors: null,
  message: null,
  timeoutId: null,
};

export const alertMessageSlice = createSlice({
  name: "alertMessage",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.errors = action.payload.errors;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    resetAlert: (state) => {
      state.errors = null;
      state.message = null;
      state.type = "info";
    },
    setTimeoutId: (state, action) => {
      state.timeoutId = action.payload;
    },
  },
});

export const { setAlert, resetAlert, setTimeoutId } = alertMessageSlice.actions;
