import React from "react";
import Header from "../components/Header.js";
import TextInput from "../components/TextInput.js";
import HelperText from "../components/HelperText.js";

import "../styles/pages/sign-in.css";

const SignIn = () => {
    return (
        <>
            <Header backBtnVisibility="hidden" profileImageVisibility="hidden"></Header>


            <form id="sign-in-form" action="/posts" method="get">
                <div id="sign-in-form-title">로그인</div>
        
                <div id="sign-in-input-box">

                    <TextInput type="email"></TextInput>
                    <TextInput type="password"></TextInput>
                    <HelperText></HelperText>

                </div>

                <button id="sign-in-btn" type="submit">로그인</button>
            </form>


            <button id="move-sign-up-btn" onclick="location.href='/users/sign-up'">회원가입</button>

        </>
    );
  }
  
  export default SignIn;