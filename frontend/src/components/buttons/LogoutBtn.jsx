import React from "react";
import "./LogoutBtn.css";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../../features/auth/authSlice";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    
    const handleLogoutUser = (e) => {
        dispatch(logoutUserThunk());
    };

    return (
        <a className="logout-btn" onClick={handleLogoutUser} >Log Out</a>
    );
};

export default LogoutBtn;