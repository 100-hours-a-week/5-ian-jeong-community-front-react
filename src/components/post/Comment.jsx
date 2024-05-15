import React from "react";

import "../../styles/components/post/comment.css";



const Comment = (props) => {
    const {data, showModal, editCommentMode, clickComment} = props;

    return (
        <>
              <div className="comment" data-id={data.id}>
                <div className="comment-writer-box">
                    <div className="comment-writer">
                        <img className="comment-writer-img" src={data.profileImage}></img>
                        <div className="comment-writer-nickname">{data.nickname}</div>
                        <div className="comment-writer-time">{data.time}</div>
                    </div>
                    <div className="comment-content">{data.text}</div>
                </div>

                <div className="comment-btn-box">
                    <button 
                        className="comment-edit-btn"
                        style={{visibility: data.editBtnVisibility}} 
                        onClick={() => editCommentMode(data.text, data.id)}>
                        수정
                    </button>
                    <button 
                        className="comment-delete-btn" 
                        style={{visibility: data.deleteBtnVisibility}} 
                        onClick={(e) => {
                            clickComment.current = data.id;
                            showModal(e)}}>
                        삭제
                    </button>
                </div>
            </div>
        </>
    );
  }
  
  export default Comment;