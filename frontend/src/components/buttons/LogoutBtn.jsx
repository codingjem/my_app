import React, { useEffect } from "react";
import "./LogoutBtn.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../services/userApiSlice";
import { logout } from "../../features/auth/authSlice";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    
    const [logoutUser, {
        data: logoutUserData,
        error: logoutUserError,
        isLoading: isLogoutUserLoading,
        isSucces: isLogoutUserSuccess }] = useLogoutUserMutation();

    const handleLogoutUser = async (e) => {
        e?.preventDefault();
        try {
            await logoutUser({ userId: user.id }).unwrap();
            dispatch(logout());
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <a className="logout-btn" onClick={handleLogoutUser} disabled={isLogoutUserLoading}>Log Out</a>
    );
};

export default LogoutBtn;