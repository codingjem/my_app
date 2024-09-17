import React from "react";
import "./DarkModeBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeBtn = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <div id="darkmode-button">
            <div>
                <FaSun className={darkMode ? "icon" : "icon icon-active"} />
            </div>
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    id="toggle"
                    checked={darkMode}
                    onChange={() => {
                        dispatch(toggleTheme());
                    }}
                />
                <label htmlFor="toggle" className="slider"></label>
            </div>
            <div>
                <FaMoon className={darkMode ? "icon icon-active" : "icon"} />
            </div>
        </div>
    );
};

export default DarkModeBtn;
