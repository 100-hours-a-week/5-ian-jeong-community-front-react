import React from "react";

import "../../styles/components/common/page-title.css";



const PageTitle = (props) => {
    const {text, fontSize, flag} = props;

    if(flag) {
        return (
            <div id="welcome-text">환영합니다,<br/>
            ODOP <strong>커뮤니티</strong> 입니다.
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