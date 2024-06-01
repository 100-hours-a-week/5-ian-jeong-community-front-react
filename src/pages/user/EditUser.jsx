import React, { useState, useRef, useEffect } from "react";

import withAuth from "../../hoc/withAuth";
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



const EditUser = (props) => {
    const {userId} = props;
    const navigator = useNavigator();
    
    const {fetchResult: user, fetchData: fetchUser} = useFetch();
    
    const {get: getNickname, set: setNickname} = useRefCapsule("");
    const {get: isCorrectNickname, set: setCorrectNickname} = useRefCapsule(false);
    
    const [userProfileImage, setUserProfileImage] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [email, setEmail] = useState("");
    
    const [nicknameHelperTextVisibility, setNicknameHelperTextVisibility] = useState('hidden');
    const [nicknameHelperText, setNicknameHelperText] = useState('*helper text');
    const [nicknameHelperTextColor, setNicknameHelperTextColor] = useState("#FF0000");
    const [toastMessageOpacity, setToastMessageOpacity] = useState("0");
    const [modalVisibility, setModalVisibility] = useState('hidden');
    const [userEditBtnDisabled, setUserEditBtnDisabled] = useState(false);
    const [userEditBtnColor, setUserEditBtnColor] = useState('#8a9f8f');


    
        
    useEffect(() => {    
        document.body.style.overflow = 'hidden';
        console.log(`인증 유저 아이디: ${userId}`);

        getUserProfileImageById();

    }, [userId]);

    useEffect(() => {
        if (user == null) {
            return;
        }
  
        setUserProfileImage(user.image);
        setProfileImage(user.image);
        setEmail(user.email);
        setNickname(user.nickname);
        document.getElementById("nickname-input").value = user.nickname;
    }, [user])


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

    const validateNicknameInput = async (value) => {
        setNickname(value);
        const nicknameCurrentValue = getNickname();

        if (!nicknameCurrentValue) {
            setNicknameHelperTextVisibility('visible');
            setNicknameHelperTextColor("#FF0000");
            setNicknameHelperText("*닉네임을 입력해주세요.");
            setUserEditBtnColor('#8fce92');
            setCorrectNickname(false);
    
        } else if (nicknameCurrentValue.search(/\s/) != -1) {
            setNicknameHelperTextVisibility('visible');
            setNicknameHelperTextColor("#FF0000");
            setNicknameHelperText("*띄어쓰기를 없애주세요.");
            setUserEditBtnColor('#8fce92');
            setCorrectNickname(false);
    
    
        } else if (nicknameCurrentValue.length > 11) {
            setNicknameHelperTextVisibility('visible');
            setNicknameHelperTextColor("#FF0000");
            setNicknameHelperText("*닉네임은 최대 10자 까지 작성 가능합니다.");
            setUserEditBtnColor('#8a9f8f');
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
                setUserEditBtnColor('#748578');
                setCorrectNickname(true);
        
            } else {
                setNicknameHelperTextVisibility('visible');
                setNicknameHelperTextColor("#FF0000");
                setNicknameHelperText("*중복된 닉네임 입니다.");
                setUserEditBtnColor('#8a9f8f');
                setCorrectNickname(false);
            }
        }
        
    }

    const editUser = async () => {
        if (isCorrectNickname) {
            setUserEditBtnDisabled(true);
            setUserEditBtnColor('#748578');
            
            const obj = {
                nickname : getNickname(),
                image: profileImage,
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

                    if (response.status !== 204) {
                        alert('회원정보 수정 실패');
                    } 
                
                    setToastMessageOpacity("0");
                    navigator.navigateToEditUser(userId);
                })
                .catch(error => {
                    console.error('update fetch error:', error);
                });
            }, 2000);        

            

        }
    }

    const executeToast = () => {
        setToastMessageOpacity("1");
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
                if(isDuplicatedJson.result === true) {
                    flag['flag'] = true;
                }
           });
    }

    const deleteUser = async () => {
        await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${userId}`, {method: 'DELETE'})
        .then(response => {
            if (response.status === 204) {
                alert('회원탈퇴 되었습니다 !');
                window.close(); 
                window.opener.location.replace('/users/sign-in');
            } else {
                alert('회원탈퇴 실패!');
                window.location.href = `/users/${userId}`;

            }
        });
    }

    return (
        <>
        <div id="edit-user-whole">
            <VerticalPadding marginTop="8.9vh"></VerticalPadding>
            <PageTitle fontSize="52px" text="회원정보 수정"></PageTitle>
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
            <div id="edit-user-complete-btn" style={{opacity: toastMessageOpacity}}>수정완료</div>

            <Modal
                type="user-del"
                visibility={modalVisibility}
                showModal={showModal}
                deleteModal={deleteUser}
            ></Modal>
        </div>
        </>
    );
  }
  
  export default withAuth(EditUser);