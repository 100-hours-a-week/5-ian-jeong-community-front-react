import React from "react";

import "../../styles/components/common/page-title.css";



const PageTitle = (props) => {
    const {text, fontSize} = props;

    return (
        <>
           <div id="page-title" style={{fontSize: fontSize}}>{text}</div>
        </>
    );
}

export default PageTitle;