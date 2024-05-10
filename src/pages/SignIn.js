import React from "react";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import VerticalPadding from "../components/VerticlaPadding";
import TextInput from "../components/TextInput";
import HelperText from "../components/HelperText";

import "../styles/pages/sign-in.css";



const SignIn = () => {
    return (
        <>
            <Header backBtnVisibility="hidden" profileImageVisibility="hidden"></Header>
            <VerticalPadding marginTop="24.66vh"></VerticalPadding>
            <PageTitle text="로그인"></PageTitle>

            <div id="sign-in-form">
                <div id="sign-in-input-box">
                    <TextInput type="email"></TextInput>
                    <TextInput type="password"></TextInput>
                    <HelperText></HelperText>
                </div>
                <button id="sign-in-btn" type="submit">로그인</button>
            </div>

            <button id="move-sign-up-btn" onclick="location.href='/users/sign-up'">회원가입</button>
        </>
    );
  }
  
  export default SignIn;