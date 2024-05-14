import React from "react";
import "./../styles/components/post-image-input.css";

const PostImageInput = (props) => {
    const {postImageInput, addImageFunc, fileName} = props;

    return (
        <>
            <div id="post-image-input-text">이미지</div>
            <div id="post-image-input-label-box">
                <label id="post-image-input-label" for="post-image-input">파일 선택</label>{" " + fileName}
            </div>
            <input type="file" id="post-image-input" accept="image/*" onChange={addImageFunc}></input>
            <img id="post-image-preview" src={postImageInput}></img>
        </>
    );
}

export default PostImageInput;