import React from "react";
import "./MainPanel.css";
import MessageHeader from "../messages/MessageHeader";
import MessageList from "../messages/MessageList";
import MessageInput from "../messages/MessageInput";
import { useSelector } from "react-redux";

const MainPanel = () => {
    const messages = useSelector((state) => state.messages.messageslist);
    return (
        <div className="main-panel">
            { messages.length > 0 && 
                <>
                    <MessageHeader />
                    <MessageList />
                    <MessageInput />
                </>
            }
        </div>
    );
};

export default MainPanel;