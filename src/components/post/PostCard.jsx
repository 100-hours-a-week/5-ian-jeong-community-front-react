import React from "react";
import { useNavigate } from 'react-router-dom';

import "../../styles/components/post/post-card.css";



const PostCard = (props) => {
    const {data} = props;

    const navigate = useNavigate();
    
    const navigateToPostDetail = () => {
        navigate(`/posts/${data.id}`);
    }
    
    
    return (
        <>
           <div className="post-box" data-id={data.id} onClick={navigateToPostDetail}>
                <div className="up-post">
                    <div className="post-title">{data.title}</div>

                    <div className="post-log-box">
                        <div className="like">좋아요 {data.likes}</div>
                        <div className="comment-num">댓글 {data.comments}</div>
                        <div className="hits">조회수 {data.hits}</div>
                        <div className="time">{data.time}</div>
                    </div>
                </div>

                <hr className="line1"></hr>

                <div className="down-post">
                    <img src={data.profileImage} alt="Profile Image" className="profile-image"></img>
                    <div className="writer">{data.nickname}</div>
                </div>
            </div>
        </>
    );
}

export default PostCard;