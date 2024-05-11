import React from "react";
import "./../styles/components/helper-text.css";

const HelperText = (props) => {
    const visibility = props.visibility;
    const helperText = props.helperText;

    return (
        <>
            <div 
                className="helper-text"
                style={{visibility: visibility}}
            >
                {helperText}
            </div>
        </>
    );
}

export default HelperText;