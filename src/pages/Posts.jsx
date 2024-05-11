import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import VerticalPadding from "../components/VerticlaPadding";
import PostCard from "../components/PostCard";

import "../styles/pages/posts.css";

const Posts = () => {
    const navigate = useNavigate();
 
    const navigateToAddPost = () => {
        navigate("/posts/new");
    };

    return (
        <>
            <Header backBtnVisibility="hidden" profileImageVisibility="visible"></Header>
            <VerticalPadding marginTop={"3.7vh"}></VerticalPadding>
            <PageTitle flag={true}></PageTitle>


            <div id="add-btn-box">
                <button id="add-btn" onClick={navigateToAddPost}>게시글 작성</button>
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