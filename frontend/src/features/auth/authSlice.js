import { createSlice } from "@reduxjs/toolkit";
import { userApiSlice } from "../../services/userApiSlice";
import { clearMessages } from "../messages/messagesSlice";

const initialState = {
    isAuthenticated: localStorage.getItem("auth") === "true",
    user: JSON.parse(localStorage.getItem("currentUser")),
    accessToken: null,
    // Access token must not be saved to storages, should only be in memory for security
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;

            // Save to local storage
            localStorage.setItem("auth", "true"); 
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

// Thunk for logging out the user
export const logoutUserThunk = () => async (dispatch, getState) => {
    const state = getState();
    const user = state.auth.user;

    try {
        await dispatch(userApiSlice.endpoints.logoutUser.initiate({ userId: user?.id })).unwrap(); // Log out from backend
        dispatch(logout()); // Clear Redux state
        dispatch(clearMessages()); // Clear messages
    } catch (err) {
        console.error("Error logging out:", err);
    }
};

// Thunk for token management
export const manageToken = () => async (dispatch, getState) => {
    const state = getState();
    const accessToken = state.auth.accessToken;

    // Dispatching actions directly without destructuring
    const checkToken = () => dispatch(userApiSlice.endpoints.checkToken.initiate());
    const getToken = () => dispatch(userApiSlice.endpoints.getToken.initiate());

    // Helper function to refresh the access token
    const handleGetToken = async () => {
        try {
            const result = await getToken().unwrap();
            dispatch(setAccessToken({ accessToken: result.accessToken }));
        } catch (err) {
            console.error("Error getting token:", err);
            await dispatch(logoutUserThunk()); // Logout if unable to refresh the token
        }
    };

    // Helper function to check the validity of the token
    const handleCheckToken = async () => {
        try {
            await checkToken().unwrap();
        } catch (err) {
            if (err?.data?.code === "ACCESS_TOKEN_EXPIRED") {
                await handleGetToken(); // Refresh token if expired
            }
        }
    };

    // Main token management logic
    try {
        if (!accessToken) {
            await handleGetToken(); // Get token if not available
        } else {
            await handleCheckToken(); // Check if token is valid
        }
    } catch (err) {
        console.error("Error managing token:", err);
        await dispatch(logoutUserThunk()); // Call the new logout thunk
    }
};

export default authSlice.reducer;
