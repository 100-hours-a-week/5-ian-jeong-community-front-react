import React from "react";
import Header from "../components/Header";
import HelperText from "../components/HelperText";
import TitleInput from "../components/TitleInput";
import ContentInput from "../components/ContentInput";
import PostImageInput from "../components/PostImageInput";

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