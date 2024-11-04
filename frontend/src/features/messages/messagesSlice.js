import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    chatlist: [],
    messageslist: [],
    clickedTab: { index: null, name: "" },
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            return action.payload;
        },
        storeChatlist: (state, action) => {
            console.log("PAYLOAD", action.payload);
            state.chatlist = action.payload.chatlist;
        },
        updateChatlist: (state, action) => {
            // Code Here
        },
        storeMessages: (state, action) => {
            state.messageslist = action.payload.messages;
        },
        clickChatlist: (state, action) => {
            state.clickedTab = action.payload;
        },
        clearMessages: (state, action) => {
            state.chatlist = [];
            state.messageslist = [];
            state.clickedTab = { index: null, name: "" };
        },
    },
});

export const { addMessage, storeChatlist, storeMessages, clickChatlist, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
