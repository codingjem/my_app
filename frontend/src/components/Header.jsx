import React from "react";
import "./Header.css";
import DarkModeBtn from "./buttons/DarkModeBtn";

const Header = () => {
    return (
        <header>
            <h1 id="logo">ChatApp</h1>
            <DarkModeBtn />
        </header>
    );
};

export default Header;
