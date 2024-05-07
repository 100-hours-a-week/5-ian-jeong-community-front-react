import React from "react";
import Header from "../components/Header.js";
import TextInput from "../components/TextInput.js";
import HelperText from "../components/HelperText.js";

import "../styles/pages/sign-up.css";
import ProfileImageInputBox from "../components/ProfileImageInputBox.js";

const SignUp = () => {
    return (
        <>
            <Header backBtnVisibility="visible" profileImageVisibility="hidden"></Header>

            <div id="sign-up-form-title">회원가입</div>
            <form id="sign-up-form" action="/users/sign-in" method="get">

                <ProfileImageInputBox type='new'></ProfileImageInputBox>

                <div id="sign-up-padding"></div>

                <TextInput type='email' flag={true}></TextInput>
                <HelperText></HelperText>

                <TextInput type='password' flag={true}></TextInput>
                <HelperText></HelperText>

                <TextInput type='repassword' flag={true}></TextInput>
                <HelperText></HelperText>

                <TextInput type='nickname' flag={true}></TextInput>
                <HelperText></HelperText>

                
                <button id="sign-up-btn" disabled="true" type="submit">회원가입</button>

            </form>

            <button id="move-sign-in-btn" onClick="location.href='sign-in'">로그인하러 가기</button>
            <div id="padding"></div>
        </>
    );
  }
  
  export default SignUp;