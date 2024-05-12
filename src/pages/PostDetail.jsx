import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Comment from "../components/Comment";
import Modal from "../components/Modal";
import elephant from "../assets/elephant.png";
import patric2 from "../assets/patric2.png";


import "../styles/pages/post-detail.css";
import VerticalPadding from "../components/VerticlaPadding";

const PostDetail = () => {
    const postId = 1; // 임시
    const commentInput = useRef("");
    const [modalVisibility, setModalVisibility] = useState('hidden');
    const [addCommnetBtnColor, setAddCommentBtnColor] = useState('#ACA0EB');
    const [addCommentBtnDisabled, setAddCommentBtnDisabled] = useState('true')
    const [modalType, setModalType] = useState('게시글');
    const [addCommentBtnText, setAddCommentBtnText] = useState('댓글 등록');

    


    const navigate = useNavigate();
 
    const navigateToPosts = () => {
        navigate("/posts");
    };

    const navigateToEditPost = () => {
        navigate(`/posts/${postId}/edit`);
    }

    const showModal = (e) => {
        if(e.target.id === 'post-detail-delete-btn') {
            setModalType('게시글');
        } else {
            setModalType('댓글');
        }
    
        if (modalVisibility === 'hidden') {
            setModalVisibility("visible");

            return;
        }
    
        setModalVisibility("hidden");
    }

    const updateCommentInput = (e) => {
        commentInput.current = e.target.value;

        if (commentInput.current) {
            setAddCommentBtnColor('#7F6AEE');
            setAddCommentBtnDisabled('false');

            return;
        }

        setAddCommentBtnDisabled('true');
        setAddCommentBtnColor('#ACA0EB');
    }

    const editCommentMode = (comment) => {
        setAddCommentBtnText("댓글 수정");
        setAddCommentBtnColor('#7F6AEE');
        setAddCommentBtnDisabled('false');
        document.getElementById("comment-input").value=comment;
    }

    


    return (
        <>
            <Header 
                backBtnVisibility="visible" 
                profileImageVisibility="visible"
                navigateToPreviousPage={navigateToPosts}>
            </Header>


            <div id="post-detail-title-box">
                <div id="post-detail-title">제목 1</div>

                <div id="post-detail-info-box">
                    <img id="post-detail-profile-image" src={elephant}></img>
                    <div id="post-detail-writer">elephant</div>
                    <div id="post-detail-time">2021-01-01 00:00:00</div>
                    <button id="post-detail-edit-btn" onClick={navigateToEditPost}>수정</button>
                    <button id="post-detail-delete-btn" onClick={showModal}>삭제</button>
                </div>
            </div>
    


            <img id="post-detail-image" src={patric2}></img>
            <div id="post-detail-content">아무말</div>


            <div id="count-box">
                <div id="post-detail-hits">
                    <div className="num" id="hits-num"></div>
                    <div className="text1">조회수</div>100
                </div>

                <div id="post-detail-coments">
                    <div className="num" id="comments-num"></div>
                    <div className="text2">댓글</div>100
                </div>
            </div>

            <hr id="line1"/>





            <textarea 
                id="comment-input" 
                placeholder="댓글을 남겨주세요!" 
                onInput={updateCommentInput}
                ></textarea>
                
            <div id="add-comment-box">
                <button 
                    id="add-comment-btn" 
                    disabled={addCommentBtnDisabled}
                    style={{backgroundColor: addCommnetBtnColor}}
                    >
                    {addCommentBtnText}
                </button>
            </div>





            <Comment 
                showModal={showModal} 
                editCommentMode={editCommentMode}>
            </Comment>
            <Comment 
                showModal={showModal} 
                editCommentMode={editCommentMode}>
            </Comment>
            <Comment 
                showModal={showModal} 
                editCommentMode={editCommentMode}>
            </Comment>
            <Comment 
                showModal={showModal} 
                editCommentMode={editCommentMode}>
            </Comment>
                            
            <VerticalPadding marginTop="5vh"></VerticalPadding>

            <Modal 
                type={modalType}
                visibility={modalVisibility} 
                showModal={showModal}
                >
            </Modal>
        </>
    );
  }
  
  export default PostDetail;