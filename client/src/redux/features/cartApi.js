import { baseApi } from "../api/baseApi";
import { unauthorized } from "../../utility/utility";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartList: builder.query({
      query: () => "/CartList",
      providesTags: ["Cart"],
      transformErrorResponse: (response) => {
        if (response?.status === 401) return null;
        unauthorized(response?.status);
        return response;
      },
    }),
    createCartItem: builder.mutation({
      query: (postBody) => ({
        url: "/SaveCartList",
        method: "POST",
        body: postBody,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: builder.mutation({
      query: (postBody) => ({
        url: "/RemoveCartList",
        method: "POST",
        body: postBody,
      }),
      invalidatesTags: ["Cart"],
    }),
    createInvoice: builder.mutation({
      query: () => ({
        url: "/CreateInvoice",
        method: "POST",
      }),
      invalidatesTags: ["Cart", "Invoice"],
    }),
    getInvoiceList: builder.query({
      query: () => "/InvoiceList",
      providesTags: ["Invoice"],
    }),
    getInvoiceDetails: builder.query({
      query: (invoiceID) => `/InvoiceProductList/${invoiceID}`,
      providesTags: (result, error, id) => [{ type: "Invoice", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartListQuery,
  useCreateCartItemMutation,
  useRemoveCartItemMutation,
  useCreateInvoiceMutation,
  useGetInvoiceListQuery,
  useGetInvoiceDetailsQuery,
} = cartApi;
