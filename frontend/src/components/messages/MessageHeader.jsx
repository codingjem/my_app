import React from "react";
import "./MessageHeader.css";
import { FaPhone } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { FaVideoSlash } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";

const MessageHeader = () => {
    return (
        <div id="message-header">
            <a className="current-user">
                Jerremy <span className="unread-messages">(1)</span>
            </a>
            <div className="inline-block">
                <FaPhone className="chat-icon" />
                <FaVideo className="chat-icon" />
                <FaEllipsisVertical className="chat-icon" />
            </div>
        </div>
    );
};

export default MessageHeader;
