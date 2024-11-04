import React, { useEffect } from "react";
import "./Chatlist.css";
import { useSelector, useDispatch } from "react-redux";
import { useGetMessagesMutation, useGetChatlistMutation } from "../../services/messageApiSlice";
import { storeChatlist, storeMessages, clickChatlist } from "../../features/messages/messagesSlice";
import { manageToken } from "../../features/auth/authSlice"; // Import the manageToken thunk
import socket from "../../socket/clientSocket";
import { useMenu } from "../../contexts/MenuContext";

const Chatlist = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const user = useSelector((state) => state.auth.user);
    const chatlist = useSelector((state) => state.messages.chatlist);
    const dispatch = useDispatch();

    const [getChatlist] = useGetChatlistMutation();
    const [getMessages] = useGetMessagesMutation();

    const { handleMenuBtn } = useMenu();

    const getChats = async () => {
        if (accessToken && user?.id) {
            const response = await getChatlist(user.id);
            dispatch(storeChatlist(response.data));
        }
    };

    // socket connections
    socket.emit("joinUserRoom", { userId: user.id });
    socket.on("getSocketChatlist", (data) => {
        dispatch(storeChatlist(data));
    });

    useEffect(() => {
        const fetchChats = async () => {
            await dispatch(manageToken()); // Ensure token is valid before fetching chats
            if (accessToken) {
                await getChats();
            }
        };
        fetchChats();
    }, [accessToken, dispatch]); // Include dispatch in the dependency array

    const handleGetMessages = async (index) => {
        handleMenuBtn(); // Here we open the mainPanel
        try {
            await dispatch(manageToken()); // Ensure token is valid before getting messages
            const conversation_id = chatlist[index].id;
            const name = chatlist[index].member_one_id === user.id ? chatlist[index].member_two : chatlist[index].member_one;
            
            const response = await getMessages(conversation_id);
            dispatch(storeMessages(response.data));
            dispatch(clickChatlist({ index, name }));
        } catch (err) {
            console.log("ERRORRRRR", err);
        }
    };

    return (
        <div id="chatlist">
            <h1 id="messages-tag">Messages</h1>
            {chatlist && (
                chatlist.map((msg, index) => (
                    <div key={index} onClick={(e) => handleGetMessages(index)}>
                        <img src="/images/user.jpg" alt="User Photo" className="chatlist-photo" />
                        <h2 className="sender-name">{msg.member_one_id === user.id ? msg.member_two : msg.member_one}</h2>
                        <p className="chat-preview">{msg.content}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Chatlist;
