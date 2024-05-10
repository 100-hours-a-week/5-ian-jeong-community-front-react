import React from "react";
import placeholderMessage from "../constants/placeholder";
import "../styles/components/title-input.css";

const TitleInput = (props) => {

    return (
        <>
            <div id="title-input-text">제목*</div>
            <input type="text" name="title" placeholder={placeholderMessage.TitleInput} id="title-input"></input>
        </>
    );
}

export default TitleInput;