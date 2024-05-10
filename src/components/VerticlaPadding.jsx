import React from "react";



const VerticalPadding = (props) => {
    const marginTop = props.marginTop;
    const style = {
        marginTop: marginTop
      };

    return (
        <>
           <div style={style}></div>
        </>
    );
}

export default VerticalPadding;