import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://k2taxi-backend.vercel.app/api/",
  prepareHeaders: async (headers) => {
    const token = await SecureStore.getItemAsync("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryExtands: BaseQueryFn = async (arg, api, extraOptions) => {
  const result = baseQuery(arg, api, extraOptions);

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtands,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["auth"],
  endpoints: () => ({}),
}); 

