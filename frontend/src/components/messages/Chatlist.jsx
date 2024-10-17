import React from "react";
import "./Chatlist.css";

const Chatlist = () => {
    return (
        <div id="chatlist">
            <h1 id="messages-tag">Messages</h1>
            <div>
                <h2 className="sender-name">Jane Aggabao</h2>
                <p>Huy, agpagatangnak man tallo kilo nga karne ti baboy.</p>  
            </div>
            <div>
                <h2>Bryan Graganta</h2>
                <p>Ayanna kan, nangrugi kami agpartin.</p>
            </div>
        </div>
    );
};

export default Chatlist;