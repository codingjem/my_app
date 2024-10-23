import React, { useEffect } from "react";
import "./LogoutBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../services/userApiSlice";
import { logout } from "../../features/auth/authSlice";
import { clearMessages } from "../../features/messages/messagesSlice";
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