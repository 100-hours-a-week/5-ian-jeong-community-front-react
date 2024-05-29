import React, {useState} from "react";

import useNavigator from "../../hooks/useNavigator";
import arrow from "../../assets/navi.png";
import "../../styles/components/common/header.css";



const Header = (props) => {
    const navigator = useNavigator();
    const {backBtnVisibility, profileImageVisibility, navigateToPreviousPage, userId, userProfileImage} = props;
    const [dropBoxVisibility, setDropBoxVisibility] = useState('hidden');



    const showDropBox = () => {
        setDropBoxVisibility('visible');
    }

    document.addEventListener("click", (e) => {
        const clickedElement = e.target;
            
        if (clickedElement !== document.getElementById("profile-image-btn")) {
            setDropBoxVisibility('hidden');
        }
    });


    
    return (
        <>
            <header>
                <div id="header-title-text">One Day One Post</div>
                <div id="header-box">

                    <img 
                        id="back-btn" 
                        src={arrow} 
                        alt="back" 
                        style={{visibility: backBtnVisibility}} 
                        onClick={navigateToPreviousPage}>
                    </img>
                    <img 
                        id="profile-image-btn" 
                        src={userProfileImage} 
                        alt="profile-image" 
                        style={{visibility: profileImageVisibility}} 
                        onClick={showDropBox}>
                    </img>

                    <div id="drop-down-box" style={{visibility: dropBoxVisibility}}>

                        <button id="move-user-edit-btn" className="drop-down" onClick={() => navigator.navigateToEditUser(userId)}>회원정보 수정</button>
                        <button id="move-password-edit-btn" className="drop-down" onClick={() => navigator.navigateToEditPassword(userId)}>비밀번호 수정</button>
                        <button id="logout-btn" className="drop-down" onClick={navigator.navigateToSignIn}>로그아웃</button>

                    </div>
                </div>
            </header>  
        </>
    );
}

export default Header;