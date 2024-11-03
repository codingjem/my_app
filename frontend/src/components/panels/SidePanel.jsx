import React from "react";
import { useSelector } from "react-redux";
import "./SidePanel.css";
import Profile from "../Profile";
import Chatlist from "../messages/Chatlist";
import BottomLinks from "../BottomLinks";
import { useMenu } from "../../contexts/MenuContext";

const SidePanel = () => {
    const messages = useSelector((state) => state.messages.messageslist);
    const { openMenu } = useMenu();

    return (
        <section className={openMenu || !messages ? "side-panel open-menu" : "side-panel close-menu"}>
            <Profile />
            <Chatlist />
            <BottomLinks />
        </section>
    );
};

export default SidePanel;