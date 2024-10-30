import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MessageInput.css";
import { FaFileCirclePlus } from "react-icons/fa6";
import { FaFaceSmile } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";
import { io } from "socket.io-client";
import { storeMessages } from "../../features/messages/messagesSlice";

const socket = io(import.meta.env.VITE_BASE_URL);

const MessageInput = () => {
    const [input, setInput] = useState("");
    const userId = useSelector((state) => state.auth.user.id);
    const conversation = useSelector((state) => state.messages.messageslist[0])

    const dispatch = useDispatch();
    if (conversation) {
        console.log("CONVO ID", conversation.id);
        socket.emit("joinChatroom", { chatId: conversation.id, userId });
    }

    // receive messages right away
    socket.on("receiveMessages", (data) => {
        dispatch(storeMessages(data));
    });

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim() === "") return; // prevent empty messages

        // get the conversation id, sender, content
        socket.emit("sendMessage", {
            conversation_id: conversation.id,
            sender_id: userId,
            content: input,
        });
    
        setInput("");
    };

    return (
        <div id="message-input">
            <form onSubmit={sendMessage}>
                <textarea
                    name="create-message"
                    id="create-message"
                    value={input}
                    placeholder="Enter a message"
                    onChange={(e) => setInput(e.target.value)}
                ></textarea>
                <button type="submit" disabled={!input.trim()}>
                    <FaPaperPlane className="chat-icon" />
                </button>
            </form>
            <FaFileCirclePlus className="chat-icon" />
            <FaImage className="chat-icon" />
            <FaFaceSmile className="chat-icon" />
        </div>
    );
};

export default MessageInput;