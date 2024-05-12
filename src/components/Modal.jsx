import React from "react";

import "./../styles/components/modal.css";

const Modal = (props) => {
    const {type, visibility, showModal} = props;
    
    if(type === "유저") {
        return (
            <>
                <div id="modal" style={{visibility: visibility}}>
                    <div id="modal-text1">회원탈퇴 하시겠습니까?</div>
                    <div id="modal-text2">작성된 게시글과 댓글은 삭제됩니다.</div>
                    <div id="modal-btn-box">
                        <button id="modal-cancel" onClick={showModal}>취소</button>
                        <button id="modal-delete">확인</button>
                    </div>
                </div>

                <div id="modal-background" style={{visibility: visibility}}></div>
            </>
        );
    }

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