import { api as index } from "..";
const api = index.injectEndpoints({
  endpoints: (build) => ({
    signUpUser: build.mutation<signUpUserResponce, signUpUserRequest>({
      query: (data) => ({
        method: "POST",
        url: "/sign-up",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    signInUser: build.mutation<signInUserResponce, signInUserRequest>({
      query: (data) => ({
        method: "POST",
        url: "/login",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    getUsers: build.query<getUserResponse, number>({
      query: (userId) => ({
        method: "GET",
        url: `/user/${userId}`,
      }),
      providesTags: ["auth"],
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useGetUsersQuery,
  useSignInUserMutation,
} = api;
