import React, { useState, useRef, useEffect } from "react";

import useNavigator from "../../hooks/useNavigator";
import useRefCapsule from "../../hooks/useRefCapsule";
import useFetch from "../../hooks/useFetch";
import serverAddress from "../../constants/serverAddress";
import Header from "../../components/common/Header";
import PageTitle from "../../components/common/PageTitle";
import HelperText from "../../components/common/HelperText";
import Modal from "../../components/common/Modal";
import VerticalPadding from "../../components/common/VerticlaPadding";
import TextInput from "../../components/user/TextInput";
import ProfileImageInputBox from "../../components/user/ProfileImageInputBox";
import "../../styles/pages/user/edit-user.css";



const EditUser = () => {
    const navigator = useNavigator();
    
    const {fetchResult: userId, fetchData: fetchUserId} = useFetch();
    const {fetchResult: user, fetchData: fetchUser} = useFetch();
    
    const {get: getNickname, set: setNickname} = useRefCapsule("");
    const {get: isCorrectNickname, set: setCorrectNickname} = useRefCapsule(false);
    
    const [userProfileImage, setUserProfileImage] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [email, setEmail] = useState("");
    
    const [nicknameHelperTextVisibility, setNicknameHelperTextVisibility] = useState('hidden');
    const [nicknameHelperText, setNicknameHelperText] = useState('*helper text');
    const [nicknameHelperTextColor, setNicknameHelperTextColor] = useState("#FF0000");
    const [toastMessageMarginTop, setToastMessageMarginTop] = useState("calc(5.9vh + 30vh)");
    const [modalVisibility, setModalVisibility] = useState('hidden');
    const [userEditBtnDisabled, setUserEditBtnDisabled] = useState(false);
    const [userEditBtnColor, setUserEditBtnColor] = useState('#ACA0EB');


    
    useEffect(() => {
        getUserIdFromSession();
        
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
        setProfileImage(user.profileImage);
        setEmail(user.email);
        setNickname(user.nickname);
        document.getElementById("nickname-input").value = user.nickname;
    }, [user])

    const getUserIdFromSession = async() => {
        await fetchUserId(`${serverAddress.BACKEND_IP_PORT}/users/session`, {credentials: 'include'});
    }

    const getUserProfileImageById = async () => {
        await fetchUser(`${serverAddress.BACKEND_IP_PORT}/users/${userId}`, {method: 'GET'})
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
        setNickname(e.target.value);
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
            const flag = {'flag' : false};
                
            await validateDuplicateNickname(flag);
        
            if(getNickname() === user.nickname) {
                flag['flag'] = true;
            }

            console.log(`닉네임 중복 검사결과: ${flag['flag']}`);
            if (flag['flag']) {
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
        }
        
    }

    const editUser = async () => {
        if (isCorrectNickname) {
            setUserEditBtnDisabled(true);
            setUserEditBtnColor('#7F6AEE');
            
            const obj = {
                nickname : getNickname,
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
                
                await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${userId}`, data)
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
                    navigator.navigateToEditUser(userId);
                })
                .catch(error => {
                    console.error('update fetch error:', error);
                });
            }, 2000);        

            

        }
    }

    const executeToast = () => {
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
        await fetch(`${serverAddress.BACKEND_IP_PORT}/users/nickname?nickname=${getNickname()}`)
            .then(isDuplicated => isDuplicated.json())
            .then(isDuplicatedJson => {
                if(isDuplicatedJson.result === "true") {
                    flag['flag'] = true;
                }
           });
    }

    const deleteUser = async () => {
        await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${userId}`, {method: 'DELETE'});

        alert('회원탈퇴 되었습니다 !');
        navigator.navigateToSignIn();
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
            <PageTitle fontSize="32px" text="회원정보 수정"></PageTitle>
            <VerticalPadding marginTop="2.1vh"></VerticalPadding>


            <div id="edit-user-box">
                    
                <ProfileImageInputBox
                    profileImage={profileImage}
                    addImageFunc={addImage}>
                </ProfileImageInputBox>
                    
                <div id="email-text">이메일</div>
                <div id="email">{email}</div>

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