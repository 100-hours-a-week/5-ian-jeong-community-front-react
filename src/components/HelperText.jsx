import React from "react";
import "./../styles/components/helper-text.css";

const HelperText = (props) => {
    const {visibility, text, color} = props;
    const style = {
        visibility: visibility,
        color: color,
    }

    return (
        <>
            <div 
                className="helper-text"
                style={style}
            >
                {text}
            </div>
        </>
    );
}

export default HelperText;