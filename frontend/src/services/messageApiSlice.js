import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const messageApiSlice = createApi({
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getMessages: builder.mutation({
            query: (id) => ({
                url: "/getMessages",
                method: "POST",
                body: { id },
            }),
        }),
        getChatlist: builder.mutation({
            query: (id) => ({
                url: "/getChatlist",
                method: "POST",
                body: { id },
            }),
        }),
    }),
});

export const { useGetMessagesMutation, useGetChatlistMutation } = messageApiSlice;