import React from "react";
import "./Profile.css";
import { useSelector } from "react-redux";

const Profile = () => {
const user = useSelector((state) => state.auth.user);
    return (
        <div id="profile">
            <div>
                <img src="/images/user.jpg" alt="Profile Photo" id="profile-photo"/>
                <h1 id="profile-name">{`${user.firstname} ${user.lastname}`}</h1>
            </div>
        </div>
    );
};

export default Profile;