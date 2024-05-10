import React from "react";
import arrow from "./../assets/navi.png";
import patric from "../assets/patric.jpg";

import "../styles/components/header.css";

const Header = (props) => {
    const { backBtnVisibility, profileImageVisibility } = props;

    return (
        <>
            <header>
                <div id="header-title-text">아무 말 대잔치</div>
                <div id="header-box">

                    <img id="back-btn" src={arrow} alt="back" style={{visibility: backBtnVisibility}}></img>
                    <img id="profile-image-btn" src={patric} alt="profile-image" style={{visibility: profileImageVisibility}}></img>

                    <div id="drop-down-box">

                        <button id="move-user-edit-btn" className="drop-down">회원정보 수정</button>
                        <button id="move-password-edit-btn" className="drop-down">비밀번호 수정</button>
                        <button id="logout-btn" className="drop-down" onClick="">로그아웃</button>

                    </div>
                </div>
            </header>  
        </>
    );
}

export default Header;