import { baseApi } from "../api/baseApi";

export const featureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturesList: builder.query({
      query: () => "/FeaturesList",
      providesTags: ["Feature"],
      transformResponse: (response) => response.data,
    }),
    getLegalDetails: builder.query({
      query: (type) => `/LegalDetails/${type}`,
      providesTags: ["Feature"],
      transformResponse: (response) => response?.data?.[0] ?? null,
    }),
  }),
});

export const { useGetFeaturesListQuery, useGetLegalDetailsQuery } = featureApi;
