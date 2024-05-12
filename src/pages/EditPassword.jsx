import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import VerticalPadding from "../components/VerticlaPadding";
import TextInput from "../components/TextInput";
import HelperText from "../components/HelperText";


import "../styles/pages/edit-password.css";

const EditPassword = () => {
    const [toastMessageMarginTop, setToastMessageMarginTop] = useState("calc(5.9vh + 30vh)");
    const [editPasswordBtnColor, setEditPasswordBtnColor] = useState("##ACA0EB");

    const password = useRef("");
    const [passwordHelperTextVisibility, setPasswordHelperTextVisibility] = useState('hidden');
    const [passwordHelperText, setPasswordHelperText] = useState('*helper text');
    const [passwordHelperTextColor, setPasswordHelperTextColor] = useState("#FF0000");

    const rePassword = useRef("");
    const [rePasswordHelperTextVisibility, setRePasswordHelperTextVisibility] = useState('hidden');
    const [rePasswordHelperText, setRePasswordHelperText] = useState('*helper text');
    const [rePasswordHelperTextColor, setRePasswordHelperTextColor] = useState("#FF0000");

    const isCorrectPassword = useRef(false);
    const isCorrectRePassword = useRef(false);

    const navigate = useNavigate();
 
    const navigateToPosts = () => {
        navigate(`/posts`);
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
    
    const validatePasswordFormat = (password) => {
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
            setEditPasswordBtnColor("#ACA0EB");
            isCorrectRePassword.current = false;
    
        } else if(!validatePasswordDouble(rePasswordCurrentValue)) {
            setRePasswordHelperTextVisibility('visible');
            setRePasswordHelperTextColor("#FF0000");
            setRePasswordHelperText("*비밀번호가 다릅니다.");
            setEditPasswordBtnColor("#ACA0EB");
            isCorrectRePassword.current = false;
            
        } else {
            setRePasswordHelperTextVisibility('visible');
            setRePasswordHelperTextColor("#0040FF");
            setRePasswordHelperText("*비밀번호가 일치합니다.");

            setEditPasswordBtnColor("#7F6AEE");
            isCorrectRePassword.current = true; 
        }
    
        // validateAll();
    }

    const validatePasswordDouble = (rePasswordCurrentValue) => {
        return password.current === rePasswordCurrentValue;
    }

    const EditPassword = () => {
        if (isCorrectPassword.current && isCorrectRePassword) {
            // 수정완료하고 토스트메시지 보여주고 리다이렉트 ㄱㄱ
            executeToast();

            return;
        }

    }

    const executeToast= () => {
        setToastMessageMarginTop("5.9vh");
    }


    return (
        <>
            <Header 
                backBtnVisibility="visible" 
                profileImageVisibility="visible"
                navigateToPreviousPage={navigateToPosts}>
            </Header>
            
            <VerticalPadding marginTop="14.9vh"></VerticalPadding>
            <PageTitle text="비밀번호 수정"></PageTitle>
            <VerticalPadding marginTop="8.7vh"></VerticalPadding>

            <div id="edit-password-box">
        
                <TextInput 
                    type='password' 
                    validateInput={validatePasswordInput}>
                </TextInput>
                <HelperText
                    visibility={passwordHelperTextVisibility}
                    text={passwordHelperText}
                    color={passwordHelperTextColor}>
                </HelperText>

                <TextInput 
                    type='repassword' 
                    validateInput={validateRePasswordInput}>
                </TextInput>
                <HelperText
                    visibility={rePasswordHelperTextVisibility}
                    text={rePasswordHelperText}
                    color={rePasswordHelperTextColor}>
                </HelperText>
            
                <button id="edit-password-btn" onClick={EditPassword} style={{backgroundColor: editPasswordBtnColor}}>수정하기</button>
                <div id="edit-complete-btn" style={{marginTop: toastMessageMarginTop}}>수정완료</div>
            </div> 
        </>
    );
  }
  
  export default EditPassword;