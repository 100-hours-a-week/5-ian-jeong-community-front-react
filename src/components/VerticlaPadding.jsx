import React from "react";



const VerticalPadding = (props) => {
    const {marginTop} = props;

    return (
        <>
           <div style={{marginTop: marginTop}}></div>
        </>
    );
}

export default VerticalPadding;