import React from "react";
import Header from "../components/Header.js";
import PostCard from "../components/PostCard.js";

import "../styles/pages/posts.css";

const Posts = () => {
    return (
        <>
            <Header backBtnVisibility="visible" profileImageVisibility="visible"></Header>
  
            <div id="main">
                <div id="welcome-text">안녕하세요,<br/>
                아무말 대잔치 <strong>게시판</strong> 입니다.
                </div>
            </div>

            <div id="add-btn-box">
                <button id="add-btn">게시글 작성</button>
            </div>

            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
            <PostCard></PostCard>
        </>
    );
  }
  
  export default Posts;