import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom';

import withAuth from "../../hoc/withAuth";
import useNavigator from "../../hooks/useNavigator";
import useRefCapsule from "../../hooks/useRefCapsule";
import useFetch from "../../hooks/useFetch";
import serverAddress from "../../constants/serverAddress";
import Header from "../../components/common/Header";
import HelperText from "../../components/common/HelperText";
import VerticalPadding from "../../components/common/VerticlaPadding";
import PageTitle from "../../components/common/PageTitle";
import TitleInput from "../../components/post/TitleInput";
import ContentInput from "../../components/post/ContentInput";
import PostImageInput from "../../components/post/PostImageInput";
import "../../styles/pages/post/edit-post.css";



const EditPost = (props) => {
    const {userId} = props;
    const navigator = useNavigator();
    
    const {fetchResult: user, fetchData: fetchUser} = useFetch();
    const {fetchResult: post, fetchData: fetchPost} = useFetch();
    
    const { postId } = useParams();

    const {get: getTitle, set: setTitle} = useRefCapsule("");
    const {get: getContent, set: setContent} = useRefCapsule("");
    const {get: getHits, set: setHits} = useRefCapsule("");
    const {get: getPostImageInput, set: setPostImageInput} = useRefCapsule("");

    const [userProfileImage, setUserProfileImage] = useState("");
    const [postHelperTextVisibility, setPostHelperTextVisibility] = useState('hidden');
    const [postHelperText, setPostHelperText] = useState('*helper-text');
    const [editCompleteBtnColor, setEditCompleteBtnColor] = useState('#ACA0EB');
    const [postImageInputName, setPostImageInputName] = useState("");



    useEffect(() => {
        console.log(`인증 유저 아이디: ${userId}`);

        getUserProfileImageById();

    }, [userId]);

    useEffect(() => {
        if (user == null) {
            return;
        }
  
        setUserProfileImage(user.profileImage);

        getPost();

    }, [user])

    useEffect(() => {
        if (post == null) {
            return;
        }


        
        setTitle(post.title);
        setContent(post.content);
        setHits(post.hits);
        setPostImageInputName(post.imageName);
        setEditCompleteBtnColor('#7F6AEE');

        document.getElementById("title-input").value = post.title;
        document.getElementById("content-input").value = post.content;
        document.getElementById("post-image-preview").src = post.image;
    }, [post])


    const getUserProfileImageById = async () => {
        await fetchUser(`${serverAddress.BACKEND_IP_PORT}/users/${userId}`, {method: 'GET'})
    }

    
    const getPost = async () => {
        await fetchPost(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}`, {method: 'GET'});
    }

    const validateTitle = (e) => {
        setTitle(e.target.value);
        const titleCurrentValue = getTitle();
        const contentCurrentValue = getContent();

        if (titleCurrentValue && contentCurrentValue) {
            setEditCompleteBtnColor('#7F6AEE');
            setPostHelperTextVisibility("hidden");
        } else {
            setEditCompleteBtnColor('#ACA0EB');
        }
    }

    const validateContent = (e) => {
        setContent(e.target.value);
        const titleCurrentValue = getTitle();
        const contentCurrentValue = getContent();

        if (titleCurrentValue && contentCurrentValue) {
            setEditCompleteBtnColor('#7F6AEE');
            setPostHelperTextVisibility("hidden");
        } else {
            setEditCompleteBtnColor('#ACA0EB');   
        }
    }

    
    const addImage = (event) => {
        const file = event.target.files[0];
        setPostImageInputName(event.target.value.split('\\').pop());

        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) { 
                setPostImageInput(e.target.result);
            }
            reader.readAsDataURL(file); 
            
            return;
        } 
        
        setPostImageInput("");
    }
    
    const validatePost = async (e) => {
        const titleCurrentValue = getTitle();
        const contentCurrentValue = getContent();

        if (!titleCurrentValue || !contentCurrentValue) {
            setPostHelperText("*제목, 내용을 모두 작성해주세요.");
            setPostHelperTextVisibility("visible");

        } else { 
            const obj = {
                title: getTitle(),
                content: getContent(),
                imageName: postImageInputName,
                image: getPostImageInput(),
                hits: getHits(),
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
                } else {
                    alert('게시글 수정 실패!');
                }
                setPostHelperTextVisibility("hidden");
                navigator.navigateToPostDetail(postId);
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
                navigateToPreviousPage={() => navigator.navigateToPostDetail(postId)}
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
                        postImageInput={getPostImageInput()}
                        addImageFunc={addImage}
                        postImageInputName={postImageInputName}>
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
  
  export default withAuth(EditPost);