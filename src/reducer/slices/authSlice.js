import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: null,
    email: null,
    id: null,
    accessToken: localStorage.getItem("accessToken") ?? null,
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;

      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("id", action.payload.id);
    },
    resetUser: (state) => {
      state.name = null;
      state.email = null;
      state.accessToken = null;
      state.id = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
    },
  },
});

export const { resetUser, setUser, setToken } = authSlice.actions;
