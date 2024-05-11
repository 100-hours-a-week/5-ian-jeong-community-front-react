import React from "react";
import { useNavigate } from 'react-router-dom';

import "./../styles/pages/welcome.css";

const Welcome = () => {
    const navigate = useNavigate();
 
    const navigateToSignIn = () => {
        navigate("/users/sign-in");
    };
    
    return (
        <>
            <div id="welcome-padding"></div>
            <button id="welcome-btn" onClick={navigateToSignIn}>Let's move out</button>
        </>
    );
}



  
  export default Welcome;