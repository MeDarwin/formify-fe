import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { app } from "../config/config";

export const fetchWithToken = fetchBaseQuery({
  baseUrl: app.apiUrl,
  prepareHeaders: (headers, { getState }) => {
    return headers.set("Authorization", `Bearer ${getState().authenticated.accessToken}`);
  },
});
