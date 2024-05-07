import React from "react";
import "./../styles/components/post-image-input.css";

const PostImageInput = (props) => {

    return (
        <>
                <div id="image-input-text">이미지</div>
                <input type="file" id="post-image-input" accept="image/*"></input>
                <img id="post-image-preview" src=""></img>
        </>
    );
}

export default PostImageInput;