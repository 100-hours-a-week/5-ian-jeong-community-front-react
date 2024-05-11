import React from "react";
import { useNavigate } from 'react-router-dom';
import elephant from "../assets/elephant.png";
import "./../styles/components/post-card.css";

const PostCard = (props) => {
    const postId = 1;
    const navigate = useNavigate();
    
    const navigateToPostDetail = () => {
        navigate(`/posts/${postId}`);
    }
    
    
    return (
        <>
           <div className="post-box" id="1" onClick={navigateToPostDetail}>
                <div className="up-post">
                    <div className="post-title">Sample Post Title 1</div>

                    <div className="post-log-box">
                        <div className="like">좋아요 10</div>
                        <div className="comment-num">댓글 50</div>
                        <div className="hits">조회수 20</div>
                        <div className="time">2024-05-01 00:00:00</div>
                    </div>
                </div>

                <hr className="line1"></hr>

                <div className="down-post">
                    <img src={elephant} alt="Profile Image" className="profile-image"></img>
                    <div className="writer">Sample Writer 1</div>
                </div>
            </div>
        </>
    );
}

export default PostCard;