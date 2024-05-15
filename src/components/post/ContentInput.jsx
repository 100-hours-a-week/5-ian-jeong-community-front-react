import React from "react";

import placeholderMessage from "../../constants/placeholder";
import "../../styles/components/post/content-input.css";

const ContentInput = (props) => {
    const {validateInput} = props;

    return (
        <>
            <div id="content-input-text">내용*</div>
            <textarea 
                id="content-input" 
                type="text" 
                placeholder={placeholderMessage.CONTENT_INPUT} 
                onInput={(e) => validateInput(e)}>
            </textarea>
        </>
    );
}

export default ContentInput;