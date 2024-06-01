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
    
    const { postId } = useParams();

    const {get: getTitle, set: setTitle} = useRefCapsule("");
    const {get: getContent, set: setContent} = useRefCapsule("");
    const {get: getPostImageInput, set: setPostImageInput} = useRefCapsule("");

    const [previewTitle, setPreviewTitle] = useState("");
    const [previewContent, setPreviewContent] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const [userProfileImage, setUserProfileImage] = useState("");
    const [postHelperTextVisibility, setPostHelperTextVisibility] = useState('hidden');
    const [postHelperText, setPostHelperText] = useState('*helper-text');
    const [editCompleteBtnColor, setEditCompleteBtnColor] = useState('#a3fcb8');
    const [postImageInputName, setPostImageInputName] = useState("");
    const [result, setResult] = useState(null); 



    useEffect(() => {
        console.log(`인증 유저 아이디: ${userId}`);

        getUserProfileImageById();

    }, [userId]);

    useEffect(() => {
        if (user == null) {
            return;
        }
  
        setUserProfileImage(user.image);

        getPost();

    }, [user])

    useEffect(() => {
        if (result == null) {
            return;
        }


        
        setTitle(result.post.title);
        setContent(result.post.content);
        setPostImageInputName(result.post.imageName);
        setEditCompleteBtnColor('#409344');

        document.getElementById("title-input").value = result.post.title;
        document.getElementById("content-input").value = result.post.content;
        document.getElementById("post-image-preview").src = result.post.image;

        setPreviewTitle(result.post.title);
        setPreviewContent(result.post.content);
        setPreviewImage(result.post.image);
    }, [result])


    const getUserProfileImageById = async () => {
        await fetchUser(`${serverAddress.BACKEND_IP_PORT}/users/${userId}`, {method: 'GET'})
    }

    
    const getPost = async () => {
        await fetch(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}`)
                .then(postData => postData.json())
                .then(postJson => {
                    setResult(postJson);
                });
    }

    const validateTitle = (e) => {
        setTitle(e.target.value);
        setPreviewTitle(e.target.value);
        const titleCurrentValue = getTitle();
        const contentCurrentValue = getContent();

        if (titleCurrentValue.length > 26) {
            setTitle(titleCurrentValue.slice(0, 26));
            setPreviewTitle(getTitle());
        }

        if (titleCurrentValue && contentCurrentValue) {
            setEditCompleteBtnColor('#a3fcb8');
            setPostHelperTextVisibility("hidden");
        } else {
            setEditCompleteBtnColor('#8a9f8f');
        }
    }

    const validateContent = (e) => {
        setContent(e.target.value);
        setPreviewContent(e.target.value);
        const titleCurrentValue = getTitle();
        const contentCurrentValue = getContent();

        if (titleCurrentValue && contentCurrentValue) {
            setEditCompleteBtnColor('#a3fcb8');
            setPostHelperTextVisibility("hidden");
        } else {
            setEditCompleteBtnColor('#8a9f8f');   
        }
    }

    
    const addImage = (event) => {
        const file = event.target.files[0];
        setPostImageInputName(event.target.value.split('\\').pop());

        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) { 
                setPostImageInput(e.target.result);
                setPreviewImage(e.target.result);
            }
            reader.readAsDataURL(file); 
            
            return;
        } 
        
        setPreviewImage("");
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

            <div id="edit-post-box">

                <div id="edit-post-form">
                    <VerticalPadding marginTop="4.2vh"></VerticalPadding>
                    <PageTitle text="게시글 수정" fontSize="34px"></PageTitle>
                    <VerticalPadding marginTop="4.7vh"></VerticalPadding>   

                    <div id="edit-post-title-input-box">
                        <TitleInput validateInput={validateTitle}></TitleInput>          
                    </div>
                    <VerticalPadding marginTop="2.4vh"></VerticalPadding>

                    <div id="edit-post-content-input-box">
                        <ContentInput validateInput={validateContent}></ContentInput>
                    </div>

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
                    <VerticalPadding marginTop="2.5vh"></VerticalPadding>
                    <button 
                        id="edit-post-complete-btn"
                        onClick={validatePost}
                        style={{backgroundColor: editCompleteBtnColor}}>
                        수정하기
                    </button>
                </div>  

                <div id="preview-box">

                    <div id="preview-box-title-box">
                        <div id="preview-box-title">미리보기</div>
                    </div>


                    <div id="post-preview">
                        <div id="post-preview-title">{previewTitle}</div> 
                        <img id="post-preview-image" src={previewImage} alt=" 이미지없음"></img>
                        <div id="post-preview-content">{previewContent}</div>  
                    </div>

                </div>
            </div>
        </>
    );
  }
  
  export default withAuth(EditPost);