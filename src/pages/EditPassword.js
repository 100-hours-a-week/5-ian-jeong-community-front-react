import React from "react";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import HelperText from "../components/HelperText";


import "../styles/pages/edit-password.css";

const EditPassword = () => {
    return (
        <>
            <Header backBtnVisibility="visible" profileImageVisibility="visible"></Header>

            <div id="password-edit-text">비밀번호 수정</div>

            <div id="edit-password-form">
        
                <TextInput type="password"></TextInput>
                <HelperText></HelperText>

                <TextInput type="repassword"></TextInput>
                <HelperText></HelperText>
            
                <button id="edit-password-btn" type="submit" disabled="true">수정하기</button>
                <button id="edit-complete-btn" disabled="true">수정완료</button>
            </div> 
        </>
    );
  }
  
  export default EditPassword;