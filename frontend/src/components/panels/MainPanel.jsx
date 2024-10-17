import React from "react";
import "./MainPanel.css";
import MessageHeader from "../messages/MessageHeader";
import MessageList from "../messages/MessageList";
import MessageInput from "../messages/MessageInput";

const MainPanel = () => {
    return (
        <div id="main-panel">
            <h1>Messages</h1>
            <MessageHeader />
            <MessageList />
            <MessageInput />
        </div>
    );
};

export default MainPanel;