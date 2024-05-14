import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import serverAddress from "../constants/serverAddress";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import HelperText from "../components/HelperText";
import TextInput from "../components/TextInput";
import Modal from "../components/Modal";
import ProfileImageInputBox from "../components/ProfileImageInputBox";
import VerticalPadding from "../components/VerticlaPadding";

import "../styles/pages/edit-user.css";

const EditUser = () => {
    const userId = useRef(0);
    const [userProfileImage, setUserProfileImage] = useState("");
    const [profileImage, setProfileImage] = useState("");

    const nickname = useRef("");
    const originNickname = useRef("");
    const [nicknameHelperTextVisibility, setNicknameHelperTextVisibility] = useState('hidden');
    const [nicknameHelperText, setNicknameHelperText] = useState('*helper text');
    const [nicknameHelperTextColor, setNicknameHelperTextColor] = useState("#FF0000");
    const [toastMessageMarginTop, setToastMessageMarginTop] = useState("calc(5.9vh + 30vh)");
    const [modalVisibility, setModalVisibility] = useState('hidden');
    const [userEditBtnDisabled, setUserEditBtnDisabled] = useState(false);
    const [userEditBtnColor, setUserEditBtnColor] = useState('#ACA0EB');

    const isCorrectNickname = useRef(false);

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
                setProfileImage(userJson.profileImage);
                nickname.current = userJson.nickname;
                originNickname.current = userJson.nickname;
                document.getElementById("nickname-input").value = userJson.nickname;
            })
            .catch(error => {
                console.error('profile image fetch error:', error);
            });
    }


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

    const validateNicknameInput = async (e) => {
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
            const flag = {'flag' : false};
                
            await validateDuplicateNickname(flag);
        
            if(nickname.current === originNickname.current) {
                flag['flag'] = true;
            }

            console.log(`닉네임 중복 검사결과: ${flag['flag']}`);
            if (flag['flag']) {
                setNicknameHelperTextVisibility('visible');
                setNicknameHelperTextColor("#0040FF");
                setNicknameHelperText("*사용가능한 닉네임입니다.");
                isCorrectNickname.current = true;
        
            } else {
                setNicknameHelperTextVisibility('visible');
                setNicknameHelperTextColor("#FF0000");
                setNicknameHelperText("*중복된 닉네임 입니다.");
                isCorrectNickname.current = false;
            }
        }
        
    }

    const editUser = async () => {
        if (isCorrectNickname.current) {
            setUserEditBtnDisabled(true);
            setUserEditBtnColor('#7F6AEE');
            
            const obj = {
                nickname : nickname.current,
                profileImage: profileImage,
            }
                
            const data = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }

            executeToast();
            setTimeout(async () => {    
                
                await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${userId.current}`, data)
                    .then(async (response) => {

                    if (response.status === 204) {
                        setNicknameHelperTextVisibility('hidden');
                        setUserEditBtnDisabled(false);
                        setUserEditBtnColor('#ACA0EB');
                        
                    } else {
                        alert('회원정보 수정 실패');
                        setNicknameHelperTextVisibility('hidden');
                        setUserEditBtnDisabled(false);
                        setUserEditBtnColor('#ACA0EB');
                    }
                    setToastMessageMarginTop("calc(5.9vh + 30vh)");
                    navigate(`/users/${userId.current}`);
                })
                .catch(error => {
                    console.error('update fetch error:', error);
                });
            }, 2000);        

            

        }
    }

    const executeToast= () => {
        console.log('토스트');
        setToastMessageMarginTop("5.9vh");
    }

    const showModal = (e) => {
        if (modalVisibility === 'hidden') {
            setModalVisibility("visible");

            return;
        }
    
        setModalVisibility("hidden");
    }

    const validateDuplicateNickname = async (flag) => {
        await fetch(`${serverAddress.BACKEND_IP_PORT}/users/nickname?nickname=${nickname.current}`)
            .then(isDuplicated => isDuplicated.json())
            .then(isDuplicatedJson => {
                if(isDuplicatedJson.result === "true") {
                    flag['flag'] = true;
                }
           });
    }

    const deleteUser = async () => {
        await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${userId.current}`, {method: 'DELETE'});

        alert('회원탈퇴 되었습니다 !');
        navigate('/users/sign-in');
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
        
                <button id="user-edit-btn" 
                    onClick={editUser}
                    disabled={userEditBtnDisabled}
                    style={{backgroundColor: userEditBtnColor}}>
                    수정하기
                </button>

            </div>
            <button id="user-delete-btn" onClick={showModal}>회원 탈퇴</button>
            <div id="edit-user-complete-btn" style={{marginTop: toastMessageMarginTop}}>수정완료</div>

            <Modal
                type="user-del"
                visibility={modalVisibility}
                showModal={showModal}
                deleteModal={deleteUser}
            ></Modal>
        </>
    );
  }
  
  export default EditUser;