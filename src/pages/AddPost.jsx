import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import VerticalPadding from "../components/VerticlaPadding";
import PageTitle from "../components/PageTitle";
import HelperText from "../components/HelperText";
import TitleInput from "../components/TitleInput";
import ContentInput from "../components/ContentInput";
import PostImageInput from "../components/PostImageInput";

import "../styles/pages/add-post.css";


const AddPost = () => {
    const title = useRef("");
    const content = useRef("");
    const [postHelperTextVisibility, setPostHelperTextVisibility] = useState('hidden');
    const [postHelperText, setPostHelperText] = useState('*helper-text');
    
    const postImageInput = useRef(""); 
    const [completeBtnColor, setCompleteBtnColor] = useState('#ACA0EB');

    const navigate = useNavigate();
 
    const navigateToPosts = () => {
        navigate("/posts");
    };

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
            // 서버 연결하면 게시글 등록 로직 ㄱㄱ
        }
    }

    return (
        <>
            <Header 
                backBtnVisibility="visible" 
                profileImageVisibility="visible"
                navigateToPreviousPage={navigateToPosts}>
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