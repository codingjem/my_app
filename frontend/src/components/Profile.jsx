import React, { useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import EditBtn from "./buttons/EditBtn";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <>
            <div id="profile">
                <span>
                    <img src="/images/user.jpg" alt="Profile Photo" id="profile-photo"/>
                    <h1 id="profile-name">{`${user.firstname} ${user.lastname}`}</h1>
                </span>
                <EditBtn />
            </div>
        </>
    );
};

export default Profile;