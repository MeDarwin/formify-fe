import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { app } from "../../config/config";
import { resetUser, setUser } from "../slices/authSlice";

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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(({ data: { name, email, accessToken } }) => {
            dispatch(setUser({ name, email, accessToken }));
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
          })
          .catch(() => {
            dispatch(resetUser());
            localStorage.removeItem("accessToken");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
          });
      },
      invalidatesTags: ["auth"],
    }),
    getMe: build.query({
      query: (token) => {
        return {
          url: "auth/me",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      onQueryStarted: async (accessToken, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(
            ({
              data: {
                user: { name, email },
              },
            }) => {
              dispatch(setUser({ name, email, accessToken }));
              localStorage.setItem("name", name);
              localStorage.setItem("email", email);
            }
          )
          .catch(() => {
            dispatch(resetUser());
            localStorage.removeItem("accessToken");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
          });
      },
      providesTags: ["auth"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetMeQuery, useLazyGetMeQuery } = authApi;
