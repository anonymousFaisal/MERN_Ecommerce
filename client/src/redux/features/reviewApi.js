import { baseApi } from "../api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (postBody) => ({
        url: "/CreateReview",
        method: "POST",
        body: postBody,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateReviewMutation } = reviewApi;
