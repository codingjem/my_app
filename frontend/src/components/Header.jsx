import React from "react";
import { useSelector } from "react-redux";
import "./Header.css";
import DarkModeBtn from "./buttons/DarkModeBtn";
import { FaBars } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { useMenu } from "../contexts/MenuContext";

const Header = () => {
    const { handleMenuBtn, openMenu } = useMenu();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    let menuIcon;
    if (isAuthenticated) {
        menuIcon = !openMenu ? <FaBars className="menu-icon" onClick={handleMenuBtn}/> 
        : <FaXmark className="menu-icon" onClick={handleMenuBtn}/>
    }
    
    return (
        <header>
            {menuIcon}
            <h1 id="logo">ChatApp</h1>
            <DarkModeBtn />
        </header>
    );
};

export default Header;
