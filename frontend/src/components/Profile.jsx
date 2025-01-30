import React, { useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import EditBtn from "./buttons/EditBtn";
import EditProfile from "./EditProfile";

const Profile = () => {
    const [openEditor, setOpenEditor] = useState(false);
    const user = useSelector((state) => state.auth.user);
    return (
        <>
            <div id="profile">
                <span>
                    <img src="/images/user.jpg" alt="Profile Photo" id="profile-photo"/>
                    <h1 id="profile-name">{`${user.firstname} ${user.lastname}`}</h1>
                </span>
                <EditBtn 
                    openEditor={openEditor}
                    setOpenEditor={setOpenEditor}
                />
            </div>
            { openEditor && <EditProfile user={user}/> }
        </>
    );
};

export default Profile;