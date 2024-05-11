import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import arrow from "./../assets/navi.png";
import patric from "../assets/patric.jpg";

import "../styles/components/header.css";

const Header = (props) => {
    const {backBtnVisibility, profileImageVisibility, navigateToPreviousPage} = props;
    const [dropBoxVisibility, setDropBoxVisibility] = useState('hidden');

    const navigate = useNavigate();
    const userId = 1; // 이후에 상위 컴포넌트인 페이지 렌더링 될 때 서버를 통해 인증받고 유저아이디를 props으로 받아와야함


    const showDropBox = () => {
        setDropBoxVisibility('visible');
    }

    document.addEventListener("click", (e) => {
        const clickedElement = e.target;
            
        if (clickedElement !== document.getElementById("profile-image-btn")) {
            setDropBoxVisibility('hidden');
        }
    });

    const navigateToEditUser = () => {
        navigate(`/users/${userId}`);
    }

    const navigateToEditPassword = () => {
        navigate(`/users/${userId}/password`);
    }

    const navigateToSignIn = () => {
        navigate("/users/sign-in");
    }

    

    return (
        <>
            <header>
                <div id="header-title-text">아무 말 대잔치</div>
                <div id="header-box">

                    <img id="back-btn" src={arrow} alt="back" style={{visibility: backBtnVisibility}} onClick={navigateToPreviousPage}></img>
                    <img id="profile-image-btn" src={patric} alt="profile-image" style={{visibility: profileImageVisibility}} onClick={showDropBox}></img>

                    <div id="drop-down-box" style={{visibility: dropBoxVisibility}}>

                        <button id="move-user-edit-btn" className="drop-down" onClick={navigateToEditUser}>회원정보 수정</button>
                        <button id="move-password-edit-btn" className="drop-down" onClick={navigateToEditPassword}>비밀번호 수정</button>
                        <button id="logout-btn" className="drop-down" onClick={navigateToSignIn}>로그아웃</button>

                    </div>
                </div>
            </header>  
        </>
    );
}

export default Header;