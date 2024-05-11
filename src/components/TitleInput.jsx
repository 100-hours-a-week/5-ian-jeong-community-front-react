import React from "react";
import placeholderMessage from "../constants/placeholder";

import "../styles/components/title-input.css";


const TitleInput = (props) => {
    const {validateInput} = props;

    return (
        <>
            <div id="title-input-text">제목*</div>
            <input 
                type="text" 
                id="title-input"
                placeholder={placeholderMessage.TITLE_INPUT}
                onInput={(e) => {
                    e.target.value = e.target.value.substring(0, 26);
                    validateInput(e)
                }}
            ></input>
        </>
    );
}

export default TitleInput;