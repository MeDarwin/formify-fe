import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: null,
    email: null,
    accessToken: localStorage.getItem("accessToken") ?? null,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    resetUser: (state) => {
      state.name = null;
      state.email = null;
      state.accessToken = null;
    },
  },
});

export const { resetUser, setUser } = authSlice.actions;
