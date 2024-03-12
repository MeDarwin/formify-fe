import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchWithToken } from "../fetchWithToken";

const replacer = (key, value) => {
  // change from string to array on limit_one_response
  if (key == "allowed_domains" && typeof value === "string")
    return value.split(", ").filter((val) => val !== "");
  // change from string to boolean
  if (key == "limit_one_response" && typeof value === "string") return value === "true";
  //return other values
  return value;
};

//TODO: Implement more advance tags
export const formApi = createApi({
  reducerPath: "form",
  baseQuery: fetchWithToken,
  tagTypes: ["form"],
  keepUnusedDataFor: 3600, // 1 hour
  endpoints: (build) => ({
    getAllForms: build.query({
      query: () => ({
        url: "forms",
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [...result.forms.map(({ slug }) => ({ type: "form", slug }))] : ["form"],
    }),
    getBySlug: build.query({
      query: (slug) => ({
        url: `forms/${slug}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "form", slug: result?.form?.slug }],
    }),
    createForm: build.mutation({
      query: (data) => ({
        url: "forms",
        method: "POST",
        body: JSON.parse(JSON.stringify(data, replacer)),
      }),
      transformResponse: (response) => {
        return { message: response?.message ?? "Succes doing action", ...response?.form };
      },
      transformErrorResponse: (response) => {
        return {
          message: response.data?.message ?? "Failed doing action",
          errors: response.data?.errors,
        };
      },
      invalidatesTags: ["form"],
    }),
  }),
});

export const {
  useGetAllFormsQuery,
  useLazyGetAllFormsQuery,
  useGetBySlugQuery,
  useLazyGetBySlugQuery,
  useCreateFormMutation,
} = formApi;
