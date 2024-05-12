import React from "react";

import "./../styles/components/modal.css";

const Modal = (props) => {
    const {type, visibility, showModal} = props;
    

    return (
        <>
             <div id="modal" style={{visibility: visibility}}>
                <div id="modal-text1">{type}을 삭제하시겠습니까?</div>
                <div id="modal-text2">삭제한 내용은 복구할 수 없습니다.</div>
                <div id="modal-btn-box">
                    <button id="modal-cancel" onClick={showModal}>취소</button>
                    <button id="modal-delete">확인</button>
                </div>
            </div>

            <div id="modal-background" style={{visibility: visibility}}></div>
        </>
    );
  }
  
  export default Modal;