import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { app } from "../../config/config";
import { setAlert } from "../slices/alertMessageSlice";
import { resetUser, setToken, setUser } from "../slices/authSlice";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: app.apiUrl,
    prepareHeaders: (headers, { endpoint, getState }) => {
      return ["getMe", "logout"].includes(endpoint)
        ? headers.set("Authorization", `Bearer ${getState().authenticated.accessToken}`)
        : headers;
    },
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
          .then(({ data: { accessToken } }) => {
            dispatch(setToken(accessToken));
          })
          .catch(() => {
            dispatch(resetUser());
          });
      },
      invalidatesTags: ["auth"],
    }),
    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      transformResponse: (response) => {
        return { message: response?.message ?? "Succes doing action" };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(() => {
            dispatch(setAlert({ type: "success", message: "Successfully logged out" }));
          })
          .catch(() => {
            dispatch(
              setAlert({
                type: "warning",
                message: "Failed to delete token, logged out without deleting token",
              })
            );
          })
          .finally(() => dispatch(resetUser()));
      },
      invalidatesTags: ["auth"],
    }),
    getMe: build.query({
      query: () => {
        return { url: "auth/me" };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        queryFulfilled
          .then(({ data: { user } }) => dispatch(setUser(user)))
          .catch(() => dispatch(resetUser()));
      },
      providesTags: ["auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useLogoutMutation,
} = authApi;
