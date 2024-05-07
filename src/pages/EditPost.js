import React from "react";
import Header from "../components/Header.js";
import TitleInput from "../components/TitleInput.js";
import ContentInput from "../components/ContentInput.js";
import HelperText from "../components/HelperText.js";
import PostImageInput from "../components/PostImageInput.js";

import "../styles/pages/edit-post.css";

const EditPost = () => {
    return (
        <>
            <Header backBtnVisibility="visible" profileImageVisibility="visible"></Header>

            <div id="edit-post-title">게시글 수정</div>

            <form action="" method="POST" id="edit-post-form">

                <TitleInput></TitleInput>

                <div id="edit-post-padding"></div>

                <ContentInput></ContentInput>

                <div id="edit-post-padding-box">                
                    <HelperText></HelperText>
                    <PostImageInput></PostImageInput>
                </div>
            </form>  

                <button id="edit-post-btn">수정하기</button>
        </>
    );
  }
  
  export default EditPost;