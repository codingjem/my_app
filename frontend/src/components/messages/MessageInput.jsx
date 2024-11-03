import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MessageInput.css";
import { FaFileCirclePlus } from "react-icons/fa6";
import { FaFaceSmile } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa6";
import { storeMessages } from "../../features/messages/messagesSlice";
import socket from "../../socket/clientSocket";

const MessageInput = () => {
    const [input, setInput] = useState("");

    const userId = useSelector((state) => state.auth.user.id);
    const conversation = useSelector((state) => state.messages.messageslist[0]);
    const chatlist = useSelector((state) => state.messages.chatlist);

    const dispatch = useDispatch();

    if (conversation) {
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

        // constantly update the chatlist so we can see the new messages
        const obj = chatlist.find(chat => chat.id === conversation.id); // get the receiverId
        const receiverId = obj.member_one_id === userId ? obj.member_two_id : obj.member_one_id;
        socket.emit("updateChatlist", { senderId: userId, receiverId });
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