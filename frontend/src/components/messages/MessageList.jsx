import React, { useEffect } from "react";
import "./MessageList.css";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../features/messages/messagesSlice";

const MessageList = () => {
    const messages = useSelector((state) => state.messages);
    const dispatch = useDispatch();

    // Dispatch message everytime a message is sent
    // socket.on("receiveMessage", (message) => {
    //     dispatch(addMessage(message));
    // });

    return (
        <div id="message-list">
            <p>Here's my first message</p>
            {messages.map((msg, index) => (
                <p key={index}>{msg}</p>
            ))}
        </div>
    );
};

export default MessageList;