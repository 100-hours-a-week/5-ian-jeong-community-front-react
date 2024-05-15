import React from "react";

import useNavigator from "../../hooks/useNavigator";

import "../../styles/pages/common/welcome.css";


const Welcome = () => {
    const navigator = useNavigator();
    
    return (
        <>
            <div id="welcome-padding"></div>
            <button id="welcome-btn" onClick={navigator.navigateToSignIn}>Let's move out</button>
        </>
    );
}

export default Welcome;