import React, { useState, useRef, useEffect } from "react";

import withAuth from "../../hoc/withAuth";
import useNavigator from "../../hooks/useNavigator";
import useRefCapsule from "../../hooks/useRefCapsule";
import useFetch from "../../hooks/useFetch";
import serverAddress from '../../constants/serverAddress';
import Header from "../../components/common/Header";
import HelperText from "../../components/common/HelperText";
import VerticalPadding from "../../components/common/VerticlaPadding";
import PageTitle from "../../components/common/PageTitle";
import TitleInput from "../../components/post/TitleInput";
import ContentInput from "../../components/post/ContentInput";
import PostImageInput from "../../components/post/PostImageInput";
import "../../styles/pages/post/add-post.css";



const AddPost = (props) => {
    const {userId} = props;
    const navigator = useNavigator();

    const {fetchResult: user, fetchData: fetchUser} = useFetch();
    const {fetchResult: addPostResult, fetchData: fetchAddPostResult} = useFetch();

    const {get: getTitle, set: setTitle} = useRefCapsule("");
    const {get: getContent, set: setContent} = useRefCapsule("");
    const {get: getPostImageInput, set: setPostImageInput} = useRefCapsule("");

    const [previewTitle, setPreviewTitle] = useState("");
    const [previewContent, setPreviewContent] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const [userProfileImage, setUserProfileImage] = useState("");
    const [postHelperTextVisibility, setPostHelperTextVisibility] = useState('hidden');
    const [postHelperText, setPostHelperText] = useState('*helper-text');
    const [postImageInputName, setPostImageInputName] = useState("");
    const [completeBtnColor, setCompleteBtnColor] = useState('#a3fcb8');



    useEffect(() => {
        console.log(`인증 유저 아이디: ${userId}`);

        getUserProfileImageById();

    }, [userId]);

    useEffect(() => {
        if (user == null) {
            return;
        }
  
        setUserProfileImage(user.image);

    }, [user])

    useEffect(() => {
        if (addPostResult == null) {
            return;
        }

        if (addPostResult === 201) {
            alert('게시글이 생성되었습니다!');
        } else {
            alert('게시글 작성 실패!');
        }
        navigator.navigateToPosts();
        
    }, [addPostResult]);



    const getUserProfileImageById = async () => {
        await fetchUser(`${serverAddress.BACKEND_IP_PORT}/users/${userId}`, {method: 'GET'})
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
            setCompleteBtnColor('#a3fcb8');
            setPostHelperTextVisibility("hidden");
        } else {
            setCompleteBtnColor('#8a9f8f');
        }
    }

    const validateContent = (e) => {
        setContent(e.target.value);
        setPreviewContent(e.target.value);
        const titleCurrentValue = getTitle();
        const contentCurrentValue = getContent();


        if (titleCurrentValue && contentCurrentValue) {
            setCompleteBtnColor('#a3fcb8');
            setPostHelperTextVisibility("hidden");
        } else {
            setCompleteBtnColor('#8a9f8f');   
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
    
    const validatePost = (e) => {
        if (!getTitle() || !getContent()) {
            setPostHelperText("*제목, 내용을 모두 작성해주세요.");
            setPostHelperTextVisibility("visible");

        } else { 
            addPost()
        }
    }

    const addPost = async () => {
        const obj = {
            userId : userId,
            title: getTitle(),
            content: getContent(),
            imageName: postImageInputName,
            image: getPostImageInput(),
        }
                
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }
        


        await fetchAddPostResult(`${serverAddress.BACKEND_IP_PORT}/posts`, data);
    }
    
    

    return (
        <>
            <Header 
                backBtnVisibility="visible" 
                profileImageVisibility="visible"
                navigateToPreviousPage={navigator.navigateToPosts}
                userProfileImage={userProfileImage}>
            </Header>



            <div id="add-post-box">
                
                <div id="add-post-form">
                    <VerticalPadding marginTop="4.2vh"></VerticalPadding>
                    <PageTitle text="게시글 작성" fontSize="44px"></PageTitle>
                    <VerticalPadding marginTop="4.7vh"></VerticalPadding>

                    <div id="add-post-title-input-box">
                        <TitleInput validateInput={validateTitle}></TitleInput>                
                    </div>

                    <VerticalPadding marginTop="2.4vh"></VerticalPadding>

                    <div id="add-post-content-input-box">
                        <ContentInput validateInput={validateContent}></ContentInput>
                    </div>

                    <div id="add-post-padding-box">
                        <HelperText
                            visibility={postHelperTextVisibility}
                            text={postHelperText}
                            color={'#FF0000'}
                        ></HelperText>
                        <PostImageInput 
                            postImageInput={getPostImageInput()}
                            addImageFunc={addImage}
                            postImageInputName={postImageInputName}>
                        </PostImageInput>
                    </div>
                    <VerticalPadding marginTop="2.5vh"></VerticalPadding>
                    <button 
                        id="complete-btn" 
                        onClick={validatePost}
                        style={{backgroundColor: completeBtnColor}}>
                        완료
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
  
  export default withAuth(AddPost);