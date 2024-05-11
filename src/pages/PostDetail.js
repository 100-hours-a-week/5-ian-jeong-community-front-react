import React from "react";
import Header from "../components/Header";
import Comment from "../components/Comment";
import Modal from "../components/Modal";
import elephant from "../assets/elephant.png";


import "../styles/pages/post-detail.css";

const PostDetail = () => {
    return (
        <>
            <Header backBtnVisibility="visible" profileImageVisibility="visible"></Header>

            <div id="post-title-box">
                <div id="post-title">제목 1</div>

                <div id="down">
                    <img id="post-profile-image" src={elephant}></img>
                    <div id="writer"></div>
                    <div id="time"></div>
                    <button id="post-edit-btn">수정</button>
                    <button id="post-delete-btn">삭제</button>
                </div>
            </div>
    
            <img id="post-image" src=""></img>

            <div id="post-content">아무말</div>

            <div id="count-box">
                <div id="hits">
                    <div className="num" id="hits-num"></div>
                    <div className="text1">조회수</div>100
                </div>

                <div id="coments">
                    <div className="num" id="comments-num"></div>
                    <div className="text2">댓글</div>100
                </div>
            </div>

            <hr id="line1"/>

            <textarea id="comment-input" placeholder="댓글을 남겨주세요!"></textarea>

            <div id="add-comment-box">
                <button id="add-comment-btn" disabled="false">댓글 등록</button>
            </div>

            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
            <Comment></Comment>
                
            <div id="post-datail-padding"></div>

            
            <Modal type='게시글'></Modal>
        </>
    );
  }
  
  export default PostDetail;