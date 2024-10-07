import React, { useEffect } from "react";
import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { useCheckTokenMutation,useGetTokenMutation, useLogoutUserMutation } from "../services/userApiSlice";
import { setAccessToken, logout } from "../features/auth/authSlice";

const HomePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const accessToken = useSelector((state) => state.auth.accessToken);
    
    const [checkToken, { 
        data: checkTokenData, 
        error: checkTokenError, 
        isLoading: isCheckTokenLoading, 
        isSuccess: isCheckTokenSuccess, 
        isError: isCheckTokenError }] = useCheckTokenMutation();
    const [getToken, { 
        data: getTokenData, 
        error: getTokenError, 
        isLoading: isGetTokenLoading, 
        isSuccess: isGetTokenSuccess, 
        isError: isGetTokenError }] = useGetTokenMutation();
    const [logoutUser, {
        data: logoutUserData,
        error: logoutUserError,
        isLoading: isLogoutUserLoading,
        isSucces: isLogoutUserSuccess }] = useLogoutUserMutation();

    if (logoutUserData) {
        console.log("LOGGED OUT!", logoutUserData);
    }
    if (logoutUserError) {
        console.log("LOGOUT ERROR", logoutUserError);
    }

    const handleGetToken = async () => {
        try {
            const result = await getToken().unwrap();
            // Store the new token in Redux
            console.log("New Access Token:", result.accessToken);
            dispatch(setAccessToken({ accessToken: result.accessToken }));
        } catch (err) {
            console.error("Error getting token:", err);
            const code = err?.data?.code;
            if (code === "REFRESH_TOKEN_COOKIE_CLEARED" || code === "USER_NOT_FOUND" || code === "REFRESH_TOKEN_NOT_MATCHED" || code === "REFRESH_TOKEN_EXPIRED") {
                handleLogoutUser();
            }
        }
    };

    const handleCheckToken = async (e) => {
        e.preventDefault();
        try {
            await checkToken().unwrap(); // Unwrap resolves promises
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogoutUser = async (e) => {
        e?.preventDefault();
        try {
            await logoutUser({ userId: user.id }).unwrap();
            dispatch(logout());
        } catch (err) {
            console.log(err);
        }
    }

    // When page reloads, get new access token. 
    // if TOKEN_EXPIRED error detected, send message to get new access token.
    useEffect(() => {
        if (!accessToken) {
            handleGetToken();
        }
    }, [accessToken]);

    useEffect(() => {
        if (checkTokenError?.data && checkTokenError.data.code === "ACCESS_TOKEN_EXPIRED") {
            handleGetToken(); // Get new token if expired
        }
    }, [checkTokenError]);
    

  return (
    <div id="home">
        {/* Create Panels here  */}
        {/* Create a button to test if access and refresh tokens are working */}
        <button onClick={handleCheckToken} disabled={isCheckTokenLoading}>
            {(isCheckTokenLoading || isGetTokenLoading) ? "Loading..." : "Check Token"}
        </button>
        {(isCheckTokenSuccess || isGetTokenSuccess) && <p>Token is valid</p>}
        {isCheckTokenError && <p>{`${checkTokenError.data.code} ---> ${checkTokenError.data.message}`}</p>}
        {isGetTokenError && <p>{`${getTokenError.data.code} ---> ${getTokenError.data.message}`}</p>}
        
        <button onClick={handleLogoutUser} disabled={isLogoutUserLoading}>
            Log Out
        </button>
    </div>
  )
}

export default HomePage;