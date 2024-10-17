import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: "messages",
    initialState: [],
    reducers: {
        addMessage: (state, action) => {
            return action.payload;
        },
    },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
