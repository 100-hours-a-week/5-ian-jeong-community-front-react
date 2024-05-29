import React, { useEffect } from "react";

import useNavigator from "../../hooks/useNavigator";
import clicksplode from "../../utils/fireworks";

import "../../styles/pages/common/welcome.css";


const Welcome = () => {
    const navigator = useNavigator();

    useEffect(() => {
        clicksplode();
    }, []);
    
    return (
        <>
            <div id="welcome-padding"></div>
            <button id="welcome-btn" onClick={navigator.navigateToSignIn}>Let's move out</button>
        </>
    );
}

export default Welcome;