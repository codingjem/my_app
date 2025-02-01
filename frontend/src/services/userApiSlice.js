import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_BASE_URL;

// getState in Redux Toolkit Query (RTK Query) and useSelector from React-Redux both serve the purpose of accessing the current state, but they are used in different contexts and have slightly different structures.

export const userApiSlice = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: "include", // This ensure cookies are sent
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
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
        logoutUser: builder.mutation({
            query: ({ userId }) => ({
                url: "/logoutUser",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: { id: userId },
            }),
        }),
        editUser: builder.mutation({
            query: ({ userId, firstname, lastname }) => ({
                url: "/editUser",
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: { id: userId, firstname, lastname },
            }),
        }),
        // testing "/home" route if it's protected
        getToken: builder.mutation({
            query: () => ({
                url: "/getToken",
                method: "POST",
            }),
        }),
        // for tokens, you don't need to put headers since you already have preparedHeaders
        checkToken: builder.mutation({
            query: () => ({
                url: "/checkToken",
                method: "POST",
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useEditUserMutation,
    useGetTokenMutation,
    useCheckTokenMutation,
    useLogoutUserMutation,
} = userApiSlice;
