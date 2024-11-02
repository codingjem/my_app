import React from "react";
import "./MessageHeader.css";
import { FaPhone } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { FaVideoSlash } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useSelector } from "react-redux";

const MessageHeader = () => {
    const name = useSelector((state) => state.messages.clickedTab.name);
    return (
        <div id="message-header">
            <a className="current-user">
                <img src="/images/user.jpg" alt="Current User Photo" className="current-user-photo" />
                <span className="current-user-name">{name}</span>
                <span className="unread-messages"></span>
                <span className="online-icon">Online</span>
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
