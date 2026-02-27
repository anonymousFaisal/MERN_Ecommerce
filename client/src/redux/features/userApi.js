import { baseApi } from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Queries
    getProfileDetails: builder.query({
      query: () => "/ReadProfile",
      providesTags: ["User"],
      transformResponse: (response) => response.profile ?? null,
    }),

    // Mutations
    userOtp: builder.mutation({
      query: (email) => ({
        url: `/UserOTP/${email}`,
        method: "GET",
      }),
    }),

    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: `/VerifyOTP/${email}/${otp}`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

    userLogout: builder.mutation({
      query: () => ({
        url: `/UserLogout`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (postBody) => ({
        url: `/UpdateProfile`,
        method: "POST",
        body: postBody,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetProfileDetailsQuery, useUserOtpMutation, useVerifyOtpMutation, useUserLogoutMutation, useUpdateProfileMutation } = userApi;
