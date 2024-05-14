import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import serverAddress from "../constants/serverAddress";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import VerticalPadding from "../components/VerticlaPadding";
import TitleInput from "../components/TitleInput";
import ContentInput from "../components/ContentInput";
import HelperText from "../components/HelperText";
import PostImageInput from "../components/PostImageInput";

import "../styles/pages/edit-post.css";

const EditPost = () => {
    const userId = useRef(0);
    const [userProfileImage, setUserProfileImage] = useState("");
    const { postId } = useParams();
    const title = useRef("");
    const content = useRef("");
    const hits = useRef("");
    const [postHelperTextVisibility, setPostHelperTextVisibility] = useState('hidden');
    const [postHelperText, setPostHelperText] = useState('*helper-text');

    const postImageInput = useRef(""); 
    const [editCompleteBtnColor, setEditCompleteBtnColor] = useState('#ACA0EB');

    const [fileName, setFileName] = useState("");



    const navigate = useNavigate();
 
    const navigateToPostDetail = () => {
        navigate(`/posts/${postId}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = {
                id: 0
            }
            await getUserIdFromSession(result);
            userId.current = result.id;
            await getUserProfileImageById();
            await getPost();
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

    const getPost = async () => {
        await fetch(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}`)
            .then(postData => postData.json())
            .then(postJson => {
                title.current = postJson.title;
                content.current = postJson.content;
                hits.current = postJson.hits;
                document.getElementById("title-input").value = postJson.title;
                document.getElementById("content-input").value = postJson.content;
                setFileName(postJson.imageName);
                
                document.getElementById("post-image-preview").src = postJson.image;
                setEditCompleteBtnColor('#7F6AEE');
        });

    }

    const validateTitle = (e) => {
        title.current = e.target.value;
        const titleCurrentValue = title.current;
        const contentCurrentValue = content.current;

        if (titleCurrentValue && contentCurrentValue) {
            setEditCompleteBtnColor('#7F6AEE');
            setPostHelperTextVisibility("hidden");
        } else {
            setEditCompleteBtnColor('#ACA0EB');
        }
    }

    const validateContent = (e) => {
        content.current = e.target.value;
        const titleCurrentValue = title.current;
        const contentCurrentValue = content.current;

        if (titleCurrentValue && contentCurrentValue) {
            setEditCompleteBtnColor('#7F6AEE');
            setPostHelperTextVisibility("hidden");
        } else {
            setEditCompleteBtnColor('#ACA0EB');   
        }
    }

    
    const addImage = (event) => {
        const file = event.target.files[0];
        setFileName(event.target.value.split('\\').pop());

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
    
    const validatePost = async (e) => {
        const titleCurrentValue = title.current;
        const contentCurrentValue = content.current;

        if (!titleCurrentValue || !contentCurrentValue) {
            setPostHelperText("*제목, 내용을 모두 작성해주세요.");
            setPostHelperTextVisibility("visible");

        } else { 
            const obj = {
                title: title.current,
                content: content.current,
                imageName: fileName,
                image: postImageInput.current,
                hits: hits.current,
            }
                
            const data = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }
        
            await fetch(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}`, data)
                .then(response => {
                if (response.status === 204) {
                    alert('게시글이 수정되었습니다!');
                    setPostHelperTextVisibility("hidden");
                    navigate(`/posts/${postId}`);
                } else {
                    alert('게시글 수정 실패!');
                    setPostHelperTextVisibility("hidden");
                    navigate(`/posts/${postId}`);
                }
              })
              .catch(error => {
                console.error('fetch error:', error);
              });


            
        }
    }



    return (
        <>
            <Header 
                backBtnVisibility="visible" 
                profileImageVisibility="visible"
                navigateToPreviousPage={navigateToPostDetail}
                userProfileImage={userProfileImage}>
            </Header>

            <VerticalPadding marginTop="4.2vh"></VerticalPadding>
            <PageTitle text="게시글 수정" fontSize="24px"></PageTitle>
            <VerticalPadding marginTop="4.7vh"></VerticalPadding>

            <div id="edit-post-box">
                <TitleInput validateInput={validateTitle}></TitleInput>          
                <VerticalPadding marginTop="2.4vh"></VerticalPadding>
                <ContentInput validateInput={validateContent}></ContentInput>

                <div id="edit-post-padding-box">                
                    <HelperText
                        visibility={postHelperTextVisibility}
                        text={postHelperText}
                        color={'#FF0000'}>

                    </HelperText>
                    <PostImageInput 
                        postImageInput={postImageInput.current}
                        addImageFunc={addImage}
                        fileName={fileName}>
                    </PostImageInput>
                </div>
            </div>  
            <VerticalPadding marginTop="2.5vh"></VerticalPadding>
            <button 
                id="edit-post-complete-btn"
                onClick={validatePost}
                style={{backgroundColor: editCompleteBtnColor}}>
                수정하기
            </button>
        </>
    );
  }
  
  export default EditPost;