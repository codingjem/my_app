import React, { useState } from "react";
import "./MessageInput.css";
import { FaFileCirclePlus } from "react-icons/fa6";
import { FaFaceSmile } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";

const MessageInput = () => {
    const [input, setInput] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        setInput("");
    };

    return (
        <div id="message-input">
            <form action="">
                <textarea
                    name="create-message"
                    id="create-message"
                    value={input}
                    placeholder="Enter a message"
                    onChange={(e) => setInput(e.target.value)}
                ></textarea>
                <button onClick={sendMessage}>
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