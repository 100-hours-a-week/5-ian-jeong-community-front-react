import React from "react";
import Header from "../components/Header.js";
import HelperText from "../components/HelperText.js";
import TitleInput from "../components/TitleInput.js";
import ContentInput from "../components/ContentInput.js";
import PostImageInput from "../components/PostImageInput.js";

import "../styles/pages/add-post.css";

const AddPost = () => {
    return (
        <>
            <Header backBtnVisibility="visible" profileImageVisibility="visible"></Header>

            <div id="add-post-title">게시글 작성</div>
            <form id="add-post-form" action="" method="post" >

                <TitleInput></TitleInput>                

                <div id="add-post-padding"></div>

                <ContentInput></ContentInput>

                <div id="add-post-padding-box">
                    <HelperText></HelperText>
                    <PostImageInput></PostImageInput>
                </div>
                
            </form>
                <button id="complete-btn">완료</button>
        </>
    );
  }
  
  export default AddPost;