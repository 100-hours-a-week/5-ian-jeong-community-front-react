import React from "react";
import "./../styles/components/page-title.css";

const PageTitle = (props) => {
    const text = props.text;

    return (
        <>
           <div id="page-title">{text}</div>
        </>
    );
}

export default PageTitle;