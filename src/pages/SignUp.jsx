import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import HelperText from "../components/HelperText";
import ProfileImageInputBox from "../components/ProfileImageInputBox";
import PageTitle from "../components/PageTitle";
import VerticalPadding from "../components/VerticlaPadding";

import "../styles/pages/sign-up.css";



const SignUp = () => {
    const [profileHelperTextVisibility, setProfileHelperTextVisibility] = useState('visible')
    const [profileHelperText, setProfileHelperText] = useState("*프로필 사진을 추가해주세요");
    const [profileImage, setProfileImage] = useState("");
    const [profileOpacity, setProfileOpacity] = useState(1);

    const email = useRef("");
    const [emailHelperTextVisibility, setEmailHelperTextVisibility] = useState('hidden');
    const [emailHelperText, setEmailHelperText] = useState('*helper text');
    const [emailHelperTextColor, setEmailHelperTextColor] = useState("#FF0000");

    const password = useRef("");
    const [passwordHelperTextVisibility, setPasswordHelperTextVisibility] = useState('hidden');
    const [passwordHelperText, setPasswordHelperText] = useState('*helper text');
    const [passwordHelperTextColor, setPasswordHelperTextColor] = useState("#FF0000");

    const rePassword = useRef("");
    const [rePasswordHelperTextVisibility, setRePasswordHelperTextVisibility] = useState('hidden');
    const [rePasswordHelperText, setRePasswordHelperText] = useState('*helper text');
    const [rePasswordHelperTextColor, setRePasswordHelperTextColor] = useState("#FF0000");

    const nickname = useRef("");
    const [nicknameHelperTextVisibility, setNicknameHelperTextVisibility] = useState('hidden');
    const [nicknameHelperText, setNicknameHelperText] = useState('*helper text');
    const [nicknameHelperTextColor, setNicknameHelperTextColor] = useState("#FF0000");





    const isCorrectEmail = useRef(false);
    const isCorrectPassword = useRef(false);
    const isCorrectRePassword = useRef(false);;
    const isCorrectNickname = useRef(false);;



    const navigate = useNavigate();
 
    const navigateToSignIn = () => {
        navigate("/users/sign-in");
    };

    const navigateToPreviousPage = () => {
        navigate("/users/sign-in");
    };

    const addImage = (event) => {
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
    
            reader.onload = function(e) { 
                setProfileImage(e.target.result);
            }
            reader.readAsDataURL(file); 
            
            setProfileOpacity(0);
            setProfileHelperTextVisibility("hidden");
    
            return;
        } 
        
        setProfileOpacity(1);
        setProfileImage("");
        setProfileHelperTextVisibility("visible");
    }
    
    const validateEmailInput = (e) => {
        email.current = e.target.value;
        const emailCurrentValue = email.current;
    
        if (!emailCurrentValue) {
            setEmailHelperTextVisibility('visible');
            setEmailHelperTextColor('#FF0000');
            setEmailHelperText("*이메일을 입력해주세요");
            isCorrectEmail.current = false;
    
        } else if (!validateEmailFormat(emailCurrentValue)) { 
            setEmailHelperTextVisibility('visible');
            setEmailHelperTextColor('#FF0000');
            setEmailHelperText("*올바른 이메일 주소 형식을 입력해주세요. (예:example@example.com)");
            isCorrectEmail.current = false;
    
        } else {
            // const flag = {'flag' : false};
    
            // await validateDuplicateEmail(value, flag);
            // console.log(`이메일 중복 검사결과: ${flag['flag']}`);
    
            // if (flag['flag']) {
            //     emailHelper.style.visibility = "visible";
            //     emailHelper.style.color = "#0040FF";
            //     emailHelper.textContent = "*사용가능한 이메일입니다.";
        
            //     isCorrectEmail = true;
            // } else {
            //     emailHelper.style.visibility = "visible";
            //     emailHelper.style.color = "#FF0000";
            //     emailHelper.textContent = "*중복된 이메일입니다.";
            //     isCorrectEmail = false;
            // }
        }
    
        // validateAll();
    }

    const validateEmailFormat = (emailCurrentValue) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(emailCurrentValue);
    }

    const validatePasswordInput = (e) => {
        password.current = e.target.value;
        const passwordCurrentValue = password.current;
    
    
        if (!passwordCurrentValue) {
            setPasswordHelperTextVisibility('visible');
            setPasswordHelperTextColor("#FF0000");
            setPasswordHelperText("*비밀번호를 입력해주세요");
            isCorrectPassword.current = false;
    
        } else if(!validatePasswordFormat(passwordCurrentValue)) {
            setPasswordHelperTextVisibility('visible');
            setPasswordHelperTextColor("#FF0000");
            setPasswordHelperText("*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포합해야 합니다.");
            isCorrectPassword.current = false;
            
        } else {
            setPasswordHelperTextVisibility('visible');
            setPasswordHelperTextColor("#0040FF");
            setPasswordHelperText("*사용가능한 비밀번호입니다.");
            isCorrectPassword.current = true; 
        }
    
        // validateAll();
    }
    
    function validatePasswordFormat(password) {
        const passwordRegax = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
        return passwordRegax.test(password);
    }

    const validateRePasswordInput = (e) => {
        rePassword.current = e.target.value;
        const rePasswordCurrentValue = rePassword.current;
    
    
        if (!rePasswordCurrentValue) {
            setRePasswordHelperTextVisibility('visible');
            setRePasswordHelperTextColor("#FF0000");
            setRePasswordHelperText("*비밀번호를 한번 더 입력해주세요");
            isCorrectRePassword.current = false;
    
        } else if(!validatePasswordDouble(rePasswordCurrentValue)) {
            setRePasswordHelperTextVisibility('visible');
            setRePasswordHelperTextColor("#FF0000");
            setRePasswordHelperText("*비밀번호가 다릅니다.");
            isCorrectRePassword.current = false;
            
        } else {
            setRePasswordHelperTextVisibility('visible');
            setRePasswordHelperTextColor("#0040FF");
            setRePasswordHelperText("*비밀번호가 일치합니다.");
            isCorrectRePassword.current = true; 
        }
    
        // validateAll();
    }

    function validatePasswordDouble(rePasswordCurrentValue) {
        return password.current === rePasswordCurrentValue;
    }

    const validateNicknameInput = (e) => {
        nickname.current = e.target.value;
        const nicknameCurrentValue = nickname.current;

        if (!nicknameCurrentValue) {
            setNicknameHelperTextVisibility('visible');
            setNicknameHelperTextColor("#FF0000");
            setNicknameHelperText("*닉네임을 입력해주세요.");
            isCorrectNickname.current = false;   
    
        } else if (nicknameCurrentValue.search(/\s/) != -1) {
            setNicknameHelperTextVisibility('visible');
            setNicknameHelperTextColor("#FF0000");
            setNicknameHelperText("*띄어쓰기를 없애주세요.");
            isCorrectNickname.current = false;   
    
    
        } else if (nicknameCurrentValue.length > 11) {
            setNicknameHelperTextVisibility('visible');
            setNicknameHelperTextColor("#FF0000");
            setNicknameHelperText("*닉네임은 최대 10자 까지 작성 가능합니다.");
            isCorrectNickname.current = false;   
    
        } else {
            // const flag = {'flag' : false};
                
            // await validateDuplicateNickname(value, flag);
            // console.log(`닉네임 중복 검사결과: ${flag['flag']}`);
            // if (flag['flag']) {
            //     nicknameHelper.style.visibility = "visible";
            //     nicknameHelper.style.color = "#0040FF";
            //     nicknameHelper.textContent = "*사용가능한 닉네임입니다.";
            //     isCorrectNickname = true;
        
            // } else {
            //     nicknameHelper.style.visibility = "visible";
            //     nicknameHelper.style.color = "#FF0000";
            //     nicknameHelper.textContent = "*중복된 닉네임 입니다.";
            //     isCorrectNickname = false;
            // }
        }
        
        // validateAll();
    }
    


    return (
        <>
            <Header
                backBtnVisibility="visible" 
                profileImageVisibility="hidden" 
                navigateToPreviousPage={navigateToPreviousPage}>
            </Header>

            <VerticalPadding marginTop="10.9vh"></VerticalPadding>
            <PageTitle text="회원가입"></PageTitle>

            <div id="sign-up-input-box">
                <ProfileImageInputBox 
                    type='new' 
                    profileHelperTextVisibility={profileHelperTextVisibility} 
                    profileHelperText={profileHelperText}
                    profileImage={profileImage}
                    profileOpacity={profileOpacity}
                    addImageFunc={addImage}>
                </ProfileImageInputBox>

                <VerticalPadding marginTop='2.8vh'></VerticalPadding>

                <TextInput type='email' validateInput={validateEmailInput} flag={true}></TextInput>
                <HelperText
                    visibility={emailHelperTextVisibility}
                    text={emailHelperText}
                    color={emailHelperTextColor}
                >
                </HelperText>




                <TextInput type='password' validateInput={validatePasswordInput} flag={true}></TextInput>
                <HelperText
                    visibility={passwordHelperTextVisibility}
                    text={passwordHelperText}
                    color={passwordHelperTextColor}
                >
                </HelperText>



                <TextInput type='repassword' validateInput={validateRePasswordInput} flag={true}></TextInput>
                <HelperText
                    visibility={rePasswordHelperTextVisibility}
                    text={rePasswordHelperText}
                    color={rePasswordHelperTextColor}
                >
                </HelperText>

                <TextInput type='nickname' validateInput={validateNicknameInput} flag={true}></TextInput>
                <HelperText
                    visibility={nicknameHelperTextVisibility}
                    text={nicknameHelperText}
                    color={nicknameHelperTextColor}
                >
                </HelperText>

                
                <button id="sign-up-btn" disabled="true">회원가입</button>
            </div>

            <button id="move-sign-in-btn" onClick={navigateToSignIn}>로그인하러 가기</button>
        </>
    );
  }
  
  export default SignUp;