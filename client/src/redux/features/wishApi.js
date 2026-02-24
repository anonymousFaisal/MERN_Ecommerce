import { baseApi } from "../api/baseApi";
import { unauthorized } from "../../utility/utility";

export const wishApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishList: builder.query({
      query: () => "/Wishlist",
      providesTags: ["Wishlist"],
      transformErrorResponse: (response) => {
        if (response?.status === 401) return null;
        unauthorized(response?.status);
        return response;
      },
    }),
    createWishItem: builder.mutation({
      query: (postBody) => ({
        url: "/SaveWishlist",
        method: "POST",
        body: postBody,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeWishItem: builder.mutation({
      query: (postBody) => ({
        url: "/RemoveWishlist",
        method: "POST",
        body: postBody,
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetWishListQuery, useCreateWishItemMutation, useRemoveWishItemMutation } = wishApi;
