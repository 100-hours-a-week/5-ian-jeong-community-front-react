import React from "react";
import "./../styles/components/post-image-input.css";

const PostImageInput = (props) => {
    const {postImageInput, addImageFunc} = props;

    return (
        <>
            <div id="post-image-input-text">이미지</div>
            <input type="file" id="post-image-input" accept="image/*" onChange={addImageFunc}></input>
            <img id="post-image-preview" src={postImageInput}></img>
        </>
    );
}

export default PostImageInput;