import { configureStore } from "@reduxjs/toolkit";
import { userApiSlice } from "../services/userApiSlice";
import { messageApiSlice } from "../services/messageApiSlice";
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/auth/authSlice";
import messagesReducer from "../features/messages/messagesSlice";

export default configureStore({
    reducer: {
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [messageApiSlice.reducerPath]: messageApiSlice.reducer,
        theme: themeReducer,
        auth: authReducer,
        messages: messagesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApiSlice.middleware).concat(messageApiSlice.middleware),
});

// if you add another rtk query for example for posts, just add this on the end of the concat ---> .concat(postSlice.middleware)
