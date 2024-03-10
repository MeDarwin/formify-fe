import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { app } from "../../config/config";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: app.apiUrl,
    headers: {},
  }),
  tagTypes: ["auth"],
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) =>
        response?.message ? response.message : "Succes doing action",
      transformErrorResponse: (response) => {
        return {
          message: response.data?.message ? response.data.message : "Failed doing action",
          errors: response.data?.errors,
        };
      },
      invalidatesTags: ["auth"],
    }),
    login: build.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return { message: response?.message ?? "Succes doing action", ...response?.user };
      },
      transformErrorResponse: (response) => {
        return {
          message: response.data?.message ?? "Failed doing action",
          errors: response.data?.errors,
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
