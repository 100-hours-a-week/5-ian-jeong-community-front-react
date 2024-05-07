import React from "react";
import "../styles/components/title-input.css";

const TitleInput = (props) => {

    return (
        <>
            <div id="title-input-text">제목*</div>
            <input type="text" name="title" placeholder="제목을 입력해주세요.(최대 26글자)" id="title-input"></input>
        </>
    );
}

export default TitleInput;