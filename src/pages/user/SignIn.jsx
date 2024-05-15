import React, { useState, useEffect } from "react";

import utility from "../../utils/utility";
import useNavigator from "../../hooks/useNavigator";
import useRefCapsule from "../../hooks/useRefCapsule";
import useFetch from "../../hooks/useFetch";
import serverAddress from "../../constants/serverAddress";
import Header from "../../components/common/Header";
import PageTitle from "../../components/common/PageTitle";
import VerticalPadding from "../../components/common/VerticlaPadding";
import HelperText from "../../components/common/HelperText";
import TextInput from "../../components/user/TextInput";

import "../../styles/pages/user/sign-in.css";



const SignIn = () => {
    const navigator = useNavigator();

    const {get: getEmail, set: setEmail} = useRefCapsule("");
    const {get: getPassword, set: setPassword} = useRefCapsule("");
    const {fetchResult: signInResult, fetchData: fetchSignInResult} = useFetch();

    const [signInHelperTextvisibility, setSignInHelperTextVisibility] = useState('hidden')
    const [signInHelperText, setSignInHelperText] = useState("*helper text");

    const [signInBtnColor, setSignInBtnColor] = useState('#ACA0EB');
    const [signInBtnDisabled, setSignInBtnDisabled] = useState(false);

    useEffect((() => {
        /* 
        useEffect를 사용하지 않으면 아래 set함수 때문에 
        signInResult의 set이 다른 set들이 다 호출될때까지 호출이 되지 않아서
        최신화가 안되기 때문에 useEffect의 실행 조건에 signInResult값 수정을 넣어주고 돌려줘야 함
        */

        console.log(`게정 검증결과: ${signInResult}`);
        if (signInResult == null) {
            return;
        }
        
        if (signInResult === 'true') {
            setSignInBtnColor('#7F6AEE');
            setSignInHelperTextVisibility('hidden');
            setSignInBtnDisabled(true);

            setTimeout(() => {
                setSignInBtnColor('#ACA0EB');
                setSignInBtnDisabled(false);
                navigator.navigateToPosts();
            }, 3000);        
            
            return;
        }
    
        setSignInHelperTextVisibility('visible')
        setSignInHelperText('*비밀번호가 다릅니다.');        
    }), [signInResult]);

    const validateSignIn = async () => {
        if (!utility.validateEmailFormat(getEmail())) {
            setSignInHelperTextVisibility('visible');
            setSignInHelperText("*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)");
    
            return;
        }
    
        if (!getPassword()) {
            setSignInHelperTextVisibility('visible');
            setSignInHelperText("*비밀번호를 입력해주세요.");
    
            return;
        }
    
        if (!utility.validatePasswordFormat(getPassword())) {
            setSignInHelperTextVisibility('visible');
            setSignInHelperText("*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포합해야 합니다.");
    
            return;
        }

        await validateAccount();
    }

    const validateAccount = async () => {
        const obj = {
            email : `${getEmail()}`,
            password : `${getPassword()}`
        }
    
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
            credentials: 'include'
        }

        await fetchSignInResult(`${serverAddress.BACKEND_IP_PORT}/users/sign-in`, data);
    }
    


    return (
        <>
            <Header backBtnVisibility="hidden" profileImageVisibility="hidden"></Header>
            <VerticalPadding marginTop="24.66vh"></VerticalPadding>
            <PageTitle text="로그인" fontSize="32px"></PageTitle>

            <div id="sign-in-input-box">
                <TextInput type="email" validateInput={setEmail}></TextInput>
                <TextInput type="password" validateInput={setPassword}></TextInput>
                <HelperText visibility={signInHelperTextvisibility} text={signInHelperText} color={"#FF0000"}></HelperText>
            </div>


            <button 
                id="sign-in-btn" 
                onClick={validateSignIn}
                style={{backgroundColor: signInBtnColor}}
                disabled={signInBtnDisabled}>
                로그인
            </button>
            <button id="move-sign-up-btn" onClick={navigator.navigateToSignUp}>회원가입</button>
        </>
    );
  }
  
  export default SignIn;