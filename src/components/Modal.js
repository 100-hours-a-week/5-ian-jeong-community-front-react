import React from "react";

import "./../styles/components/modal.css";

const Modal = (props) => {
    const type = props.type;

    return (
        <>
             <div id="modal">
                <div id="modal-text1">{type}을 삭제하시겠습니까?</div>
                <div id="modal-text2">삭제한 내용은 복구할 수 없습니다.</div>
                <div id="modal-btn-box">
                    <button id="modal-cancel">취소</button>
                    <button id="modal-delete">확인</button>
                </div>
            </div>

            <div id="modal-background"></div>
        </>
    );
  }
  
  export default Modal;