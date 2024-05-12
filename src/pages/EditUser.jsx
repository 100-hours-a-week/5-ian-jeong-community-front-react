import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import HelperText from "../components/HelperText";
import TextInput from "../components/TextInput";
import Modal from "../components/Modal";
import ProfileImageInputBox from "../components/ProfileImageInputBox";
import VerticalPadding from "../components/VerticlaPadding";

import "../styles/pages/edit-user.css";

const EditUser = () => {
    const [profileImage, setProfileImage] = useState("");

    const nickname = useRef("");
    const [nicknameHelperTextVisibility, setNicknameHelperTextVisibility] = useState('hidden');
    const [nicknameHelperText, setNicknameHelperText] = useState('*helper text');
    const [nicknameHelperTextColor, setNicknameHelperTextColor] = useState("#FF0000");
    const [toastMessageMarginTop, setToastMessageMarginTop] = useState("calc(5.9vh + 30vh)");
    const [modalVisibility, setModalVisibility] = useState('hidden');

    const isCorrectNickname = useRef(false);

    const navigate = useNavigate();
 
    const navigateToPosts = () => {
        navigate(`/posts`);
    }

    const addImage = (event) => {
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
    
            reader.onload = (e) => { 
                setProfileImage(e.target.result);
            }
            reader.readAsDataURL(file); 
            
    
            return;
        } 
        
        setProfileImage("");
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

    const editUser = () => {
        if (isCorrectNickname.current) {
            // 수정완료하고 토스트메시지 보여주고 리다이렉트 ㄱㄱ
            executeToast();

            return;
        }
    }

    const executeToast= () => {
        setToastMessageMarginTop("5.9vh");
    }

    const showModal = (e) => {
        if (modalVisibility === 'hidden') {
            setModalVisibility("visible");

            return;
        }
    
        setModalVisibility("hidden");
    }

    return (
        <>
            <Header 
                backBtnVisibility="visible" 
                profileImageVisibility="visible"
                navigateToPreviousPage={navigateToPosts}>
            </Header>

            <VerticalPadding marginTop="14.9vh"></VerticalPadding>
            <PageTitle fontSize="32px" text="회원정보 수정"></PageTitle>
            <VerticalPadding marginTop="2.1vh"></VerticalPadding>


            <div id="edit-user-box">
                    
                <ProfileImageInputBox
                    profileImage={profileImage}
                    addImageFunc={addImage}>
                </ProfileImageInputBox>
                    


                <div id="email-text">이메일</div>
                <div id="email">jms3847@gmail.com</div>

                <TextInput type='nickname' validateInput={validateNicknameInput}></TextInput>
                <HelperText 
                    visibility={nicknameHelperTextVisibility}
                    text={nicknameHelperText}
                    color={nicknameHelperTextColor}>
                </HelperText>
        
                <button id="user-edit-btn" onClick={editUser}>수정하기</button>

            </div>
            <button id="user-delete-btn" onClick={showModal}>회원 탈퇴</button>
            <div id="edit-complete-btn">수정완료</div>

            <Modal
                type="유저"
                visibility={modalVisibility}
                showModal={showModal}
            ></Modal>
        </>
    );
  }
  
  export default EditUser;