import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import serverAddress from './../constants/serverAddress';
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import VerticalPadding from "../components/VerticlaPadding";
import TextInput from "../components/TextInput";
import HelperText from "../components/HelperText";


import "../styles/pages/edit-password.css";

const EditPassword = () => {
    const userId = useRef(0);
    const [userProfileImage, setUserProfileImage] = useState("");

    const [toastMessageMarginTop, setToastMessageMarginTop] = useState("calc(5.9vh + 40vh)");
    const [editPasswordBtnColor, setEditPasswordBtnColor] = useState("##ACA0EB");
    const [editPasswordDisabled, setEditPasswordDisabled] = useState(false);

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

    useEffect(() => {
        const fetchData = async () => {
            const result = {
                id: 0
            }
            await getUserIdFromSession(result);
            userId.current = result.id;
            await getUserProfileImageById();
        }

        fetchData();
        document.body.style.overflow = 'hidden';
    }, []);

    const getUserIdFromSession = async(result) => {
        await fetch(`${serverAddress.BACKEND_IP_PORT}/users/session`, {credentials: 'include'})
            .then(response => response.json())
            .then(user => {
                if (parseInt(user.id) !== 0) {
                    result.id = user.id;
                } else {
                    alert('로그아웃 되었습니다 !');
                    navigate(`/users/sign-in`);
                }
            });
    }

    const getUserProfileImageById = async () => {
        await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${userId.current}`) 
            .then(userData => userData.json())
            .then(userJson => {
                setUserProfileImage(userJson.profileImage);
            })
            .catch(error => {
                console.error('profile image fetch error:', error);
            });
    }

    

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
    }

    const validatePasswordDouble = (rePasswordCurrentValue) => {
        return password.current === rePasswordCurrentValue;
    }

    const EditPassword = () => {
        if (isCorrectPassword.current && isCorrectRePassword) {
            setEditPasswordDisabled(true);
            executeToast();

            setTimeout(async () => {
                const obj = {
                    password : password.current,
                }
                    
                const data = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }
            
                await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${userId.current}/password`, data)
                    .then(response => {
                        if (response.status !== 204) {
                            alert('비밀번호 수정 실패');
                            
                        }

                        navigate(`/users/${userId}/password`);
                        setEditPasswordDisabled(false);
                        setEditPasswordBtnColor('#ACA0EB');
                        setPasswordHelperTextVisibility('hidden');
                        setRePasswordHelperTextVisibility('hidden');
                        setToastMessageMarginTop("calc(5.9vh + 40vh)");
                    })
                    .catch(error => {
                        console.error('update password fetch error:', error);
                    });
            }, 2000);
            return;
        }

    }

    const executeToast = () => {
        setToastMessageMarginTop("5.9vh");
    }


    return (
        <>
            <Header 
                backBtnVisibility="visible" 
                profileImageVisibility="visible"
                navigateToPreviousPage={navigateToPosts}
                userProfileImage={userProfileImage}>
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
            
                <button id="edit-password-btn" 
                    onClick={EditPassword} 
                    disabled={editPasswordDisabled}
                    style={{backgroundColor: editPasswordBtnColor}}>수정하기</button>
            </div> 
                <div id="edit-password-complete-btn" style={{marginTop: toastMessageMarginTop}}>수정완료</div>
        </>
    );
  }
  
  export default EditPassword;