import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import serverAddress from './../constants/serverAddress';
import Header from "../components/Header";
import VerticalPadding from "../components/VerticlaPadding";
import PageTitle from "../components/PageTitle";
import HelperText from "../components/HelperText";
import TitleInput from "../components/TitleInput";
import ContentInput from "../components/ContentInput";
import PostImageInput from "../components/PostImageInput";

import "../styles/pages/add-post.css";


const AddPost = () => {
    const userId = useRef(0);
    const [userProfileImage, setUserProfileImage] = useState("");

    const title = useRef("");
    const content = useRef("");
    const [postHelperTextVisibility, setPostHelperTextVisibility] = useState('hidden');
    const [postHelperText, setPostHelperText] = useState('*helper-text');

    const filePath = useRef("");
    const postImageInput = useRef(""); 
    const [completeBtnColor, setCompleteBtnColor] = useState('#ACA0EB');

    const navigate = useNavigate();
 
    const navigateToPosts = () => {
        navigate("/posts");
    };

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


    const validateTitle = (e) => {
        title.current = e.target.value;
        const titleCurrentValue = title.current;
        const contentCurrentValue = content.current;

        if (titleCurrentValue && contentCurrentValue) {
            setCompleteBtnColor('#7F6AEE');
            setPostHelperTextVisibility("hidden");
        } else {
            setCompleteBtnColor('#ACA0EB');
        }
    }

    const validateContent = (e) => {
        content.current = e.target.value;
        const titleCurrentValue = title.current;
        const contentCurrentValue = content.current;

        if (titleCurrentValue && contentCurrentValue) {
            setCompleteBtnColor('#7F6AEE');
            setPostHelperTextVisibility("hidden");
        } else {
            setCompleteBtnColor('#ACA0EB');   
        }
    }

    
    const addImage = (event) => {
        filePath.current = event.target.files[0].name;
        const file = event.target.files[0]; 
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) { 
                postImageInput.current = e.target.result;
            }
            reader.readAsDataURL(file); 
            
            
            return;
        } 
        
        postImageInput.current = "";
    }
    
    const validatePost = (e) => {
        const titleCurrentValue = title.current;
        const contentCurrentValue = content.current;

        if (!titleCurrentValue || !contentCurrentValue) {
            setPostHelperText("*제목, 내용을 모두 작성해주세요.");
            setPostHelperTextVisibility("visible");

        } else { 
            addPost()
        }
    }

    const addPost = async () => {
        console.log(filePath.current);

        const obj = {
            writer : userId.current,
            title: title.current,
            content: content.current,
            imageName: filePath.current.split('\\').pop(),
            image: postImageInput.current,
        }
                
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }
        
        await fetch(`${serverAddress.BACKEND_IP_PORT}/posts`, data)
            .then(response => {
                if (response.status === 201) {
                    alert('게시글이 생성되었습니다!');
                } else {
                    alert('게시글 작성 실패!');
                }

                navigate('/posts');
            })
            .catch(error => {
            console.error('add psot fetch error:', error);
            });
        }
    
    

    return (
        <>
            <Header 
                backBtnVisibility="visible" 
                profileImageVisibility="visible"
                navigateToPreviousPage={navigateToPosts}
                userProfileImage={userProfileImage}>
            </Header>
            <VerticalPadding marginTop="4.2vh"></VerticalPadding>
            <PageTitle text="게시글 작성" fontSize="24px"></PageTitle>
            <VerticalPadding marginTop="4.7vh"></VerticalPadding>
            
            <div id="add-post-box">
                <TitleInput validateInput={validateTitle}></TitleInput>                
                <VerticalPadding marginTop="2.4vh"></VerticalPadding>
                <ContentInput validateInput={validateContent}></ContentInput>

                <div id="add-post-padding-box">
                    <HelperText
                        visibility={postHelperTextVisibility}
                        text={postHelperText}
                        color={'#FF0000'}
                    ></HelperText>
                    <PostImageInput 
                        postImageInput={postImageInput.current}
                        addImageFunc={addImage}>
                    </PostImageInput>
                </div>
            </div>

            <VerticalPadding marginTop="2.5vh"></VerticalPadding>
            <button 
                id="complete-btn" 
                onClick={validatePost}
                style={{backgroundColor: completeBtnColor}}>
                완료
            </button>
        </>
    );
  }
  
  export default AddPost;