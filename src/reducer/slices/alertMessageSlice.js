import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "info",
  errors: null,
  message: null,
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
  },
});

export const { setAlert } = alertMessageSlice.actions;
