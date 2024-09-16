import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({ baseUrl: "" }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/registerUser",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: newUser,
            }),
        }),
        loginUser: builder.mutation({
            query: ({ email, password }) => ({
                url: "/loginUser",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: { email, password },
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApiSlice;
