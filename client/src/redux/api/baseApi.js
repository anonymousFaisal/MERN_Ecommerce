import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    // We can handle global headers here like Authorization token if needed
  }),
  tagTypes: ["Product", "User", "Cart"], // Tags for caching and invalidation
  endpoints: () => ({}),
});
