import { baseApi } from "../api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandList: builder.query({
      query: () => "/ProductBrandList",
      providesTags: ["Product"],
      transformResponse: (response) => response.data,
    }),
    getCategoryList: builder.query({
      query: () => "/ProductCategoryList",
      providesTags: ["Product"],
      transformResponse: (response) => response.data,
    }),
    getSliderList: builder.query({
      query: () => "/ProductSliderList",
      providesTags: ["Product"],
      transformResponse: (response) => response.data,
    }),
    getProductListByRemark: builder.query({
      query: (remark) => `/ProductListByRemark/${remark}`,
      providesTags: ["Product"],
      transformResponse: (response) => response.data,
    }),
    getProductListByBrand: builder.query({
      query: (brandID) => `/ProductListByBrand/${brandID}`,
      providesTags: ["Product"],
      transformResponse: (response) => response.data,
    }),
    getProductListByCategory: builder.query({
      query: (categoryID) => `/ProductListByCategory/${categoryID}`,
      providesTags: ["Product"],
      transformResponse: (response) => response.data,
    }),
    getProductListBySimilar: builder.query({
      query: (productID) => `/ProductListBySimilar/${productID}`,
      providesTags: ["Product"],
      transformResponse: (response) => response.data,
    }),
    getProductListBySearch: builder.query({
      query: (keyword) => `/ProductListBySearch/${encodeURIComponent(keyword)}`,
      providesTags: ["Product"],
      transformResponse: (response) => response.data,
    }),
    getProductDetails: builder.query({
      query: (productID) => `/ProductDetails/${productID}`,
      providesTags: ["Product"],
      // The API returns an array, so we pick the first object if available
      transformResponse: (response) => response?.data?.[0] ?? null,
    }),
    getProductReviewList: builder.query({
      query: (productID) => `/ProductReviewList/${productID}`,
      providesTags: ["Product"],
      transformResponse: (response) => response.data,
    }),
    getProductListByFilter: builder.mutation({
      query: (data) => ({
        url: "/ProductListByFilter",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetBrandListQuery,
  useGetCategoryListQuery,
  useGetSliderListQuery,
  useGetProductListByRemarkQuery,
  useGetProductListByBrandQuery,
  useGetProductListByCategoryQuery,
  useGetProductListBySimilarQuery,
  useGetProductListBySearchQuery,
  useGetProductDetailsQuery,
  useGetProductReviewListQuery,
  useGetProductListByFilterMutation,
} = productApi;
