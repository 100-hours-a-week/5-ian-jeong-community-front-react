import React, { useState, useRef, useEffect } from "react";

import useNavigator from "../../hooks/useNavigator";
import useRefCapsule from "../../hooks/useRefCapsule";
import useFetch from "../../hooks/useFetch";
import utility from "../../utils/utility";
import serverAddress from '../../constants/serverAddress';
import Header from "../../components/common/Header";
import PageTitle from "../../components/common/PageTitle";
import VerticalPadding from "../../components/common/VerticlaPadding";
import HelperText from "../../components/common/HelperText";
import TextInput from "../../components/user/TextInput";
import "../../styles/pages/user/edit-password.css";



const EditPassword = () => {
    const navigator = useNavigator();

    const {fetchResult: userId, fetchData: fetchUserId} = useFetch();
    const {fetchResult: user, fetchData: fetchUser} = useFetch();

    const {get: getPassword, set: setPassword} = useRefCapsule("");
    const {get: isCorrectPassword, set: setCorrectPassword} = useRefCapsule("");

    const {get: getRePassword, set: setRePassword} = useRefCapsule("");
    const {get: isCorrectRePassword, set: setCorrectRePassword} = useRefCapsule("");

    const [userProfileImage, setUserProfileImage] = useState("");

    const [toastMessageMarginTop, setToastMessageMarginTop] = useState("calc(5.9vh + 40vh)");
    const [editPasswordBtnColor, setEditPasswordBtnColor] = useState("##ACA0EB");
    const [editPasswordDisabled, setEditPasswordDisabled] = useState(false);

    const [passwordHelperTextVisibility, setPasswordHelperTextVisibility] = useState('hidden');
    const [passwordHelperText, setPasswordHelperText] = useState('*helper text');
    const [passwordHelperTextColor, setPasswordHelperTextColor] = useState("#FF0000");

    const [rePasswordHelperTextVisibility, setRePasswordHelperTextVisibility] = useState('hidden');
    const [rePasswordHelperText, setRePasswordHelperText] = useState('*helper text');
    const [rePasswordHelperTextColor, setRePasswordHelperTextColor] = useState("#FF0000");




    useEffect(() => {
        getUserIdFromSession();
        document.body.style.overflow = 'hidden';
    }, []);

    useEffect(() => {
        if (userId == null) {
            return;
        }

        console.log(`인증 유저 아이디: ${userId}`);

        if (parseInt(userId) === 0) {
            alert('로그아웃 되었습니다 !');
            navigator.navigateToSignIn();
        } 

        getUserProfileImageById();

    }, [userId]);

    useEffect(() => {
        if (user == null) {
            return;
        }
  
        setUserProfileImage(user.profileImage);
    }, [user])

    const getUserIdFromSession = async() => {
        await fetchUserId(`${serverAddress.BACKEND_IP_PORT}/users/session`, {credentials: 'include'});
    }

    const getUserProfileImageById = async () => {
        await fetchUser(`${serverAddress.BACKEND_IP_PORT}/users/${userId}`, {method: 'GET'})
    }

    const validatePasswordInput = (e) => {
        setPassword(e.target.value);
        const passwordCurrentValue = getPassword();
    
        if (!passwordCurrentValue) {
            setPasswordHelperTextVisibility('visible');
            setPasswordHelperTextColor("#FF0000");
            setPasswordHelperText("*비밀번호를 입력해주세요");
            setCorrectPassword(false);
    
        } else if(!utility.validatePasswordFormat(passwordCurrentValue)) {
            setPasswordHelperTextVisibility('visible');
            setPasswordHelperTextColor("#FF0000");
            setPasswordHelperText("*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포합해야 합니다.");
            setCorrectPassword(false);
            
        } else {
            setPasswordHelperTextVisibility('visible');
            setPasswordHelperTextColor("#0040FF");
            setPasswordHelperText("*사용가능한 비밀번호입니다.");
            setCorrectPassword(true);

        }
    }

    const validateRePasswordInput = (e) => {
        setRePassword(e.target.value);
        const rePasswordCurrentValue = getRePassword();
    
        if (!rePasswordCurrentValue) {
            setRePasswordHelperTextVisibility('visible');
            setRePasswordHelperTextColor("#FF0000");
            setRePasswordHelperText("*비밀번호를 한번 더 입력해주세요");
            setEditPasswordBtnColor("#ACA0EB");
            setCorrectRePassword(false);
    
        } else if(!utility.validatePasswordDouble(getPassword(), getRePassword())) {
            setRePasswordHelperTextVisibility('visible');
            setRePasswordHelperTextColor("#FF0000");
            setRePasswordHelperText("*비밀번호가 다릅니다.");
            setEditPasswordBtnColor("#ACA0EB");
            setCorrectRePassword(false);
            
        } else {
            setRePasswordHelperTextVisibility('visible');
            setRePasswordHelperTextColor("#0040FF");
            setRePasswordHelperText("*비밀번호가 일치합니다.");
            setEditPasswordBtnColor("#7F6AEE");
            setCorrectRePassword(true);

        }
    }



    const EditPassword = () => {
        if (isCorrectPassword.current && isCorrectRePassword) {
            setEditPasswordDisabled(true);
            executeToast();

            setTimeout(async () => {
                const obj = {
                    password : getPassword(),
                }
                    
                const data = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }
            
                await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${userId}/password`, data)
                    .then(response => {
                        if (response.status !== 204) {
                            alert('비밀번호 수정 실패');
                            
                        }

                        navigator.navigateToEditPassword(userId);
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
                navigateToPreviousPage={navigator.navigateToPosts}
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