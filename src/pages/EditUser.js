import React from "react";
import Header from "../components/Header.js";
import HelperText from "../components/HelperText.js";
import TextInput from "../components/TextInput.js";
import Modal from "../components/Modal.js";
import ProfileImageInputBox from "../components/ProfileImageInputBox.js";

import "../styles/pages/edit-user.css";

const EditUser = () => {
    return (
        <>
            <Header backBtnVisibility="visible" profileImageVisibility="visible"></Header>

            <div id="edit-user-title">회원정보 수정</div>
            <form action="" method="POST" id="edit-user-form">
                    
                <ProfileImageInputBox></ProfileImageInputBox>
                    
                <div id="email-text">이메일</div>
                <div id="email">jms3847@gmail.com</div>

                <TextInput type='nickname'></TextInput>
                <HelperText></HelperText>
        

                <button id="user-edit-btn" type="submit">수정하기</button>

            </form>
            <button id="user-delete-btn">회원 탈퇴</button>
            <div id="edit-complete-btn" disabled="true">수정완료</div>

            <Modal></Modal>
        </>
    );
  }
  
  export default EditUser;