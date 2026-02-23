import { baseApi } from "../api/baseApi";

export const featureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturesList: builder.query({
      query: () => "/FeaturesList",
      providesTags: ["Feature"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetFeaturesListQuery } = featureApi;
