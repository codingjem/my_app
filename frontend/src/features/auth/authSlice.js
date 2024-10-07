import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAuthenticated: localStorage.getItem("auth") === "true",
    user: JSON.parse(localStorage.getItem("currentUser")),
    accessToken: null,
    // access token must not be saved to storages, should only be in memory for security
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            // ---> when page reloads, accessToken will be null so you need to get new token when you interact with the backend

            // Save to local storage
            localStorage.setItem("auth", "true"); // you can only store string on local storage
            localStorage.setItem("currentUser", JSON.stringify(state.user));
        },
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;

            // Remove from local storage
            localStorage.removeItem("auth");
            localStorage.removeItem("currentUser");
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
        }
    },
});

export const { login, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;