import React from "react";
import "./../styles/components/page-title.css";

const PageTitle = (props) => {
    const {text, fontSize, flag} = props;

    if(flag) {
        return (
            <div id="welcome-text">안녕하세요,<br/>
            아무말 대잔치 <strong>게시판</strong> 입니다.
            </div>
        )
    }

    return (
        <>
           <div id="page-title" style={{fontSize: fontSize}}>{text}</div>
        </>
    );
}

export default PageTitle;