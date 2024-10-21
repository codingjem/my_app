import React, { useEffect } from "react";
import "./Chatlist.css";
import { useSelector } from "react-redux";
import { useGetMessagesMutation, useGetChatlistMutation } from "../../services/messageApiSlice";

const Chatlist = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const user = useSelector((state) => state.auth.user);

    // const { data, error } = useGetMessagesQuery(undefined, { skip: !accessToken }); // it waits for the token to be created before getting messages
    const [getChatlist, { data, error }] = useGetChatlistMutation();
    // console.log("USER", user);
    console.log("MESSAGES FROM DB", data);
    if (data) {
        console.log("Here", data.messages);
    } else {
        console.log("none");
    }

    const getChats = async () => {
        if (accessToken && user?.id) {
            await getChatlist(user.id);
        }
    };

    useEffect(() => {
        if (accessToken) {
            getChats();
        }
    }, [accessToken]);

    console.log("Error", error);
    console.log("Data", data);
    
    return (
        <div id="chatlist">
            <h1 id="messages-tag">Messages</h1>
            {data && data.messages && (
                data.messages.map((msg, index) => (  // Use map instead of forEach for rendering
                    <div key={index}>
                        <h2 className="sender-name">{msg.sender_id === user.id ? msg.receiver_name : msg.sender_name}</h2>
                        <p>{msg.content}</p>
                        {/* <p>{new Date(message.create_time).toLocaleString()}</p> Format the date */}
                    </div>
                ))
            )}
        </div>
    );
};

export default Chatlist;