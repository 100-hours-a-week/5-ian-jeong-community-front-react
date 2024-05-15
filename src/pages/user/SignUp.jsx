import React, { useState, useEffect } from "react";

import useRefCapsule from "../../hooks/useRefCapsule";
import useNavigator from "../../hooks/useNavigator";
import useFetch from "../../hooks/useFetch";
import utility from "../../utils/utility";
import serverAddress from '../../constants/serverAddress';
import Header from "../../components/common/Header";
import HelperText from "../../components/common/HelperText";
import PageTitle from "../../components/common/PageTitle";
import VerticalPadding from "../../components/common/VerticlaPadding";
import TextInput from "../../components/user/TextInput";
import ProfileImageInputBox from "../../components/user/ProfileImageInputBox";

import "../../styles/pages/user/sign-up.css";



const SignUp = () => {
    const navigator = useNavigator();

    const {get: getEmail, set: setEmail} = useRefCapsule("");
    const {get: isCorrectEmail, set: setCorrectEmail} = useRefCapsule(false);

    const {get: getPassword, set: setPassword} = useRefCapsule("");
    const {get: isCorrectPassword, set: setCorrectPassword} = useRefCapsule(false);

    const {get: getRepassword, set: setRepassword} = useRefCapsule("");
    const {get: isCorrectRePassword, set: setCorrectRePassword} = useRefCapsule(false);

    const {get: getNickname, set: setNickname} = useRefCapsule("");
    const {get: isCorrectNickname, set: setCorrectNickname} = useRefCapsule(false);
    
    const {fetchResult: emailDuplicateResult, fetchData: fetchEmailDuplicateResult} = useFetch();
    const {fetchResult: nicknameDuplicateResult, fetchData: fetchNicknameDuplicateResult} = useFetch();
    const {fetchResult: signUpResult, fetchData: fetchSignUpResult} = useFetch();
    


    const [profileHelperTextVisibility, setProfileHelperTextVisibility] = useState('visible');
    const [profileHelperText, setProfileHelperText] = useState("*프로필 사진을 추가해주세요");
    const [profileImage, setProfileImage] = useState("");
    const [profileOpacity, setProfileOpacity] = useState(1);


    const [emailHelperTextVisibility, setEmailHelperTextVisibility] = useState('hidden');
    const [emailHelperText, setEmailHelperText] = useState('*helper text');
    const [emailHelperTextColor, setEmailHelperTextColor] = useState("#FF0000");


    const [passwordHelperTextVisibility, setPasswordHelperTextVisibility] = useState('hidden');
    const [passwordHelperText, setPasswordHelperText] = useState('*helper text');
    const [passwordHelperTextColor, setPasswordHelperTextColor] = useState("#FF0000");


    const [rePasswordHelperTextVisibility, setRePasswordHelperTextVisibility] = useState('hidden');
    const [rePasswordHelperText, setRePasswordHelperText] = useState('*helper text');
    const [rePasswordHelperTextColor, setRePasswordHelperTextColor] = useState("#FF0000");

    const [nicknameHelperTextVisibility, setNicknameHelperTextVisibility] = useState('hidden');
    const [nicknameHelperText, setNicknameHelperText] = useState('*helper text');
    const [nicknameHelperTextColor, setNicknameHelperTextColor] = useState("#FF0000");

    const [signUpBtnColor, setSignUpBtnColor] = useState('#ACA0EB');
    const [signUpBtnDisabled, setSignUpBtnDisabled] = useState(true);

    // 이후에 커스텀 훅으로 빼자
    // 내부 로직은 callback 함수로 전달하면 될듯
    useEffect(() => {
        if (emailDuplicateResult == null) {
            return;
        }

        console.log(`이메일 중복 검사결과: ${emailDuplicateResult}`);

    
        if (emailDuplicateResult === 'true') {
            setEmailHelperTextVisibility('visible');
            setEmailHelperTextColor('#0040FF');
            setEmailHelperText('*사용가능한 이메일입니다.');
            setCorrectEmail(true);

        } else {
            setEmailHelperTextVisibility('visible');
            setEmailHelperTextColor('#FF0000');
            setEmailHelperText('*중복된 이메일입니다.');
            setCorrectEmail(false);
        }

        validateAll();

    }, [emailDuplicateResult]);

    useEffect(() => {
        if (nicknameDuplicateResult == null) {
            return;
        }
        console.log(`닉네임 중복 검사결과: ${nicknameDuplicateResult}`);

        if (nicknameDuplicateResult === 'true') {
            setNicknameHelperTextVisibility('visible');
            setNicknameHelperTextColor("#0040FF");
            setNicknameHelperText("*사용가능한 닉네임입니다.");
            setCorrectNickname(true);
        
        } else {
            setNicknameHelperTextVisibility('visible');
            setNicknameHelperTextColor("#FF0000");
            setNicknameHelperText("*중복된 닉네임 입니다.");
            setCorrectNickname(false);
        }

        validateAll();

    }, [nicknameDuplicateResult]);

    useEffect(() => {
        if (signUpResult === null) {
            return;
        }

        if (signUpResult === 201) {
            alert('회원가입이 완료되었습니다!');
            navigator.navigateToSignIn();

        } else {
            alert('회원가입에 실패하였습니다!');
            navigator.navigateToSignUp();

        }

    }, [signUpResult]);



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
    
    const validateEmailInput = async (value) => {
        console.log(value);
        setEmail(value);
        const emailCurrentValue = getEmail();
    
        if (!emailCurrentValue) {
            setEmailHelperTextVisibility('visible');
            setEmailHelperTextColor('#FF0000');
            setEmailHelperText("*이메일을 입력해주세요");
            setCorrectEmail(false);
    
        } else if (!utility.validateEmailFormat(emailCurrentValue)) { 
            setEmailHelperTextVisibility('visible');
            setEmailHelperTextColor('#FF0000');
            setEmailHelperText("*올바른 이메일 주소 형식을 입력해주세요. (예:example@example.com)");
            setCorrectEmail(false);
    
        } else {
            await validateDuplicateEmail();
        }

        validateAll();
    }

    const validateDuplicateEmail = async () => {
        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        await fetchEmailDuplicateResult(`${serverAddress.BACKEND_IP_PORT}/users/email?email=${getEmail()}`, data);
    }

    const validatePasswordInput = (newValue) => {
        setPassword(newValue);
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
    
        validateAll();
    }


    const validateRePasswordInput = (newValue) => {
        setRepassword(newValue);
        const rePasswordCurrentValue = getRepassword();
    
        if (!rePasswordCurrentValue) {
            setRePasswordHelperTextVisibility('visible');
            setRePasswordHelperTextColor("#FF0000");
            setRePasswordHelperText("*비밀번호를 한번 더 입력해주세요");
            setCorrectRePassword(false);
    
        } else if(!utility.validatePasswordDouble(getPassword(), getRepassword())) {
            setRePasswordHelperTextVisibility('visible');
            setRePasswordHelperTextColor("#FF0000");
            setRePasswordHelperText("*비밀번호가 다릅니다.");
            setCorrectRePassword(false);
            
        } else {
            setRePasswordHelperTextVisibility('visible');
            setRePasswordHelperTextColor("#0040FF");
            setRePasswordHelperText("*비밀번호가 일치합니다.");
            setCorrectRePassword(true);
        }
    
        validateAll();
    }


    const validateNicknameInput = async (newValue) => {
        setNickname(newValue);
        const nicknameCurrentValue = getNickname();

        if (!nicknameCurrentValue) {
            setNicknameHelperTextVisibility('visible');
            setNicknameHelperTextColor("#FF0000");
            setNicknameHelperText("*닉네임을 입력해주세요.");
            setCorrectNickname(false);
    
        } else if (nicknameCurrentValue.search(/\s/) != -1) {
            setNicknameHelperTextVisibility('visible');
            setNicknameHelperTextColor("#FF0000");
            setNicknameHelperText("*띄어쓰기를 없애주세요.");
            setCorrectNickname(false);
    
        } else if (nicknameCurrentValue.length > 11) {
            setNicknameHelperTextVisibility('visible');
            setNicknameHelperTextColor("#FF0000");
            setNicknameHelperText("*닉네임은 최대 10자 까지 작성 가능합니다.");
            setCorrectNickname(false);
    
        } else {     
            await validateDuplicateNickname();
            
        }
        
        validateAll();
    }

    const validateDuplicateNickname = async () => {
        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        await fetchNicknameDuplicateResult(`${serverAddress.BACKEND_IP_PORT}/users/nickname?nickname=${getNickname()}`, data);
    }

    const validateAll = () => {
        if (isCorrectEmail() && isCorrectPassword() && isCorrectRePassword() && isCorrectNickname()) {
            setSignUpBtnColor('#7F6AEE');
            setSignUpBtnDisabled(false);
        } else {
            setSignUpBtnColor('#ACA0EB');
            setSignUpBtnDisabled(true);
        }
    }

    const signUp = async () => {
        const obj = {
            email : `${getEmail()}`,
            password: `${getPassword()}`,
            nickname: `${getNickname()}`,
            profileImage: `${profileImage}`
        }
            
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }
        
        await fetchSignUpResult(`${serverAddress.BACKEND_IP_PORT}/users`, data);
    }
    


    return (
        <>
            <Header
                backBtnVisibility="visible" 
                profileImageVisibility="hidden" 
                navigateToPreviousPage={navigator.navigateToSignIn}>
            </Header>

            <VerticalPadding marginTop="10.9vh"></VerticalPadding>
            <PageTitle text="회원가입" fontSize="32px"></PageTitle>

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

                
                <button 
                    id="sign-up-btn" 
                    disabled={signUpBtnDisabled}
                    style={{backgroundColor: signUpBtnColor}}
                    onClick={signUp}>
                        회원가입
                </button>
            </div>

            <button id="move-sign-in-btn" onClick={navigator.navigateToSignIn}>로그인하러 가기</button>
        </>
    );
  }
  
  export default SignUp;