import React, { useEffect, useRef } from "react";
import "./MessageList.css";
import { useSelector } from "react-redux";

const MessageList = () => {
    const messages = useSelector((state) => state.messages.messageslist);
    const userId = useSelector((state) => state.auth.user.id);

    const chatBoxRef = useRef(null);

    useEffect(() => {
        // Instantly set the scroll position to the bottom
        const chatBox = chatBoxRef.current;
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [messages]);

    let lastDate = "";

    return (
        <div id="message-list" ref={chatBoxRef}>
            {messages && messages.map((message, index) => {
                const messageDateObj = new Date(message.create_time);

                // Get the current date and time
                const currentDate = new Date();

                // Calculate the difference in time (in milliseconds) and convert to days
                const timeDifference = currentDate - messageDateObj;
                const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                let messageDate, formattedTime;

                // If the message is within the last 4 days, show the day of the week and time
                if (daysDifference <= 2) {
                    messageDate = messageDateObj.toLocaleDateString("en-US", {
                        weekday: "short", // Mon, Tue, Wed, etc.
                    });

                    formattedTime = messageDateObj.toLocaleTimeString("en-US", {
                        weekday: "short",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    });
                } else {
                    // If the message is older than 4 days, show the full date and time
                    messageDate = messageDateObj.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    });

                    formattedTime = messageDateObj.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }) + ", " + messageDateObj.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true
                    });
                }
                
                // Update lastDate for the next iteration
                const showDateHeader = lastDate !== messageDate;
                lastDate = messageDate;
                
                return (
                    <React.Fragment key={index}>
                        {showDateHeader && <div className="date-header">{messageDate}</div>}   
                        <div className={message.sender_id === userId ? "message-div me-div" : "message-div"}>
                            <p className={message.sender_id === userId ? "me" : "notme"}>
                                <span className="msg-sent-time">{formattedTime}</span>
                                <span className="msg">{message.content}</span>
                            </p>                            
                        </div>               
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default MessageList;
