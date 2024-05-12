import React from "react";
import patric from "../assets/patric.jpg";

import "../styles/components/comment.css";

const Comment = (props) => {
    const {showModal, editCommentMode} = props;

    return (
        <>
              <div className="comment" data-id="">
                <div className="comment-writer-box">
                    <div className="comment-writer">
                        <img className="comment-writer-img" src={patric}></img>
                        <div className="comment-writer-nickname">더미 작성자 1</div>
                        <div className="comment-writer-time">2021:01:01 00:00:00</div>
                    </div>
                    <div className="comment-content">댓글 내용</div>
                </div>

                <div className="comment-btn-box">
                    <button className="comment-edit-btn" onClick={() => editCommentMode("댓글 내용")}>수정</button>
                    <button className="comment-delete-btn" onClick={showModal}>삭제</button>
                </div>
            </div>
        </>
    );
  }
  
  export default Comment;