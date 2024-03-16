import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchWithToken } from "../fetchWithToken";

const createFormReplacer = (key, value) => {
  // change from string to array on limit_one_response
  if (key == "allowed_domains" && typeof value === "string")
    return value.split(", ").filter((val) => val !== "");
  // change from string to boolean
  if (key == "limit_one_response" && typeof value === "string") return value === "true";
  //return other values
  return value;
};

const createQuestionReplacer = (key, value) => {
  // change from string 'true' or 'false' to absolute boolean
  if (key == "is_required" && typeof value === "string") return value === "true";
  //change from unserialized string to array (will match all insisde parantheses)
  if (key == "choices" && typeof value === "string" && value !== "")
    return value
      .match(/\(([^)]+)\)/gm)
      ?.map((val) => val.substring(1, val.length - 1))
      .filter((val) => val !== "");
  //return other values
  return value;
};

export const formApi = createApi({
  reducerPath: "form",
  baseQuery: fetchWithToken,
  tagTypes: ["form"],
  keepUnusedDataFor: 3600, // 1 hour
  endpoints: (build) => ({
    /* -------------------------------------------------------------------------- */
    /*                               FORM ENDPOINTS                               */
    /* -------------------------------------------------------------------------- */
    getAllForms: build.query({
      query: () => ({
        url: "forms",
        method: "GET",
      }),
      providesTags: [{ type: "form", id: "LIST" }],
    }),
    getBySlug: build.query({
      query: (slug) => ({
        url: `forms/${slug}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "form", id: result?.form?.slug }],
    }),
    createForm: build.mutation({
      query: (data) => ({
        url: "forms",
        method: "POST",
        body: JSON.parse(JSON.stringify(data, createFormReplacer)),
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
      invalidatesTags: (_, error) => (error ? [] : [{ type: "form", id: "LIST" }]),
    }),
    /* -------------------------------------------------------------------------- */
    /*                              QUESTION ENDPOINT                             */
    /* -------------------------------------------------------------------------- */
    createQuestion: build.mutation({
      query: ({ data, slug }) => ({
        url: `forms/${slug}/questions`,
        method: "POST",
        body: JSON.parse(JSON.stringify(data, createQuestionReplacer)),
      }),
      invalidatesTags: (_, error, { slug }) => (error ? [] : [{ type: "form", id: slug }]),
    }),
    deleteQuestion: build.mutation({
      query: ({ slug, id }) => ({
        url: `forms/${slug}/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error, { slug }) => (error ? [] : [{ type: "form", id: slug }]),
    }),
  }),
});

export const {
  useGetAllFormsQuery,
  useLazyGetAllFormsQuery,
  useGetBySlugQuery,
  useLazyGetBySlugQuery,
  useCreateFormMutation,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
} = formApi;
