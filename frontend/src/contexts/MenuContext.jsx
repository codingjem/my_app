import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const [openMenu, setOpenMenu] = useState(false);

    const handleMenuBtn = () => {
        console.log("Menu Button Clicked", openMenu);
        setOpenMenu((prev) => !prev);
    };

    return (
        <MenuContext.Provider value={{ openMenu, handleMenuBtn }}>
            {children}
        </MenuContext.Provider>
    );
};