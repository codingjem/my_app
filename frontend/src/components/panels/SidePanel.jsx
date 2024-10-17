import React from "react";
import "./SidePanel.css";
import Profile from "../Profile";
import Chatlist from "../messages/Chatlist";
import LogoutBtn from "../buttons/LogoutBtn";

const SidePanel = () => {
    return (
        <section id="side-panel">
            <Profile />
            <Chatlist />
            <LogoutBtn />
        </section>
    );
};

export default SidePanel;