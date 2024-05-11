import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import VerticalPadding from "../components/VerticlaPadding";
import TextInput from "../components/TextInput";
import HelperText from "../components/HelperText";

import "../styles/pages/sign-in.css";



const SignIn = () => {
    const email = useRef("");
    const password = useRef("");
    const [visibility, setVisibility] = useState('hidden')
    const [helperText, setHelperText] = useState("*helper text");

    const navigate = useNavigate();
 
    const navigateToSignUp = () => {
        navigate("/users/sign-up");
    };

    const updateEmailInput = (e) => {
        email.current = e.target.value;
    }

    const updatePasswordInput = (e) => {
        password.current = e.target.value;
    }

    const validateEmailFormat = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }
    
    const validatePasswordFormat = (password) => {
        const passwordRegax = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
        return passwordRegax.test(password);
    }

    const validateSignIn = () => {
        if (!validateEmailFormat(email.current)) {
            setVisibility('visible');
            setHelperText("*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)");
    
            return;
        }
    
        if (!password.current) {
            setVisibility('visible');
            setHelperText("*비밀번호를 입력해주세요.");
    
            return;
        }
    
        if(!validatePasswordFormat(password.current)) {
            setVisibility('visible');
            setHelperText("*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포합해야 합니다.");
    
            return;
        }
        
        // const flag = {'flag' : false};

        // await validateAccount(flag, email, password);

        // if (flag['flag']) {
        //     document.getElementById('sign-in-btn').style.backgroundColor = '#7F6AEE';
        //     helperText.style.visibility = 'hidden';
        
        //     return flag['flag'];
        // }
    
        // helperText.style.visibility = 'visible';
        // helperText.textContent = "*비밀번호가 다릅니다.";
        
        // return flag['flag'];
    }









    return (
        <>
            <Header backBtnVisibility="hidden" profileImageVisibility="hidden"></Header>
            <VerticalPadding marginTop="24.66vh"></VerticalPadding>
            <PageTitle text="로그인"></PageTitle>

            <div id="sign-in-input-box">
                <TextInput type="email" inputValue={email} validateInput={updateEmailInput}></TextInput>
                <TextInput type="password" inputValue={password} validateInput={updatePasswordInput}></TextInput>
                <HelperText visibility={visibility} text={helperText} color={"#FF0000"}></HelperText>
            </div>


            <button id="sign-in-btn" onClick={validateSignIn}>로그인</button>
            <button id="move-sign-up-btn" onClick={navigateToSignUp}>회원가입</button>
        </>
    );
  }
  
  export default SignIn;