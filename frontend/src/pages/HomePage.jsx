import React, { useEffect } from "react";
import "./HomePage.css";
import Header from "../components/Header";
import SidePanel from "../components/panels/SidePanel";
import MainPanel from "../components/panels/MainPanel";
import { useDispatch } from "react-redux";
import { manageToken } from "../features/auth/authSlice";

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(manageToken()); // Check and refresh token on component mount
    }, [dispatch]);

    return (
        <div id="home">
            <Header />
            <SidePanel />
            <MainPanel />
        </div>
    );
};

export default HomePage;
