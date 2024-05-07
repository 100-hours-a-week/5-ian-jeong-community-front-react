import React from "react";
import "../styles/components/content-input.css";

const ContentInput = (props) => {

    return (
        <>
            <div id="content-input-text">내용*</div>
            <textarea id="content-input" type="text" name="post" placeholder="내용을 입력해주세요."></textarea>
        </>
    );
}

export default ContentInput;