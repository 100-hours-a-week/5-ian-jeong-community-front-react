import React from "react";
import placeholderMessage from "../constants/placeholder";
import "../styles/components/content-input.css";

const ContentInput = (props) => {

    return (
        <>
            <div id="content-input-text">내용*</div>
            <textarea id="content-input" type="text" name="post" placeholder={placeholderMessage.CONTENT_INPUT}></textarea>
        </>
    );
}

export default ContentInput;