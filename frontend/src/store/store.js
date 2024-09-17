import { configureStore } from "@reduxjs/toolkit";
import { userApiSlice } from "../services/userApiSlice";
import themeReducer from "../features/theme/themeSlice";

export default configureStore({
    reducer: {
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApiSlice.middleware),
});

// if you add another rtk query for example for posts, just add this on the end of the concat ---> .concat(postSlice.middleware)
