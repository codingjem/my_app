import React, { useEffect } from "react";
import "./MessageList.css";
import { useSelector } from "react-redux";

const MessageList = () => {
    const messages = useSelector((state) => state.messages.messageslist);
    const userId = useSelector((state) => state.auth.user.id);

    // Dispatch message everytime a message is sent
    // socket.on("receiveMessage", (message) => {
    //     dispatch(addMessage(message));
    // });


    return (
        <div>
            {messages && (
                messages.map((message, index) => (
                    <p key={index} className={message.sender_id === userId ? "me" : "notme"}>
                        {message.content}
                    </p>
                ))
            )}
        </div>
    );
};

export default MessageList;