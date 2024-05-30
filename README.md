## 🚀 Intro
---
```
커뮤니티 서비스를 위한 리액트 프론트엔드 서버 프로젝트입니다.
```

<br>

##### Demo

__[🔗 커뮤니티 서비스 데모 영상](https://youtu.be/JTaqMh2IlZ8)__


<br>


##### Servers

__[🔗 Backend Server - Express](https://github.com/100-hours-a-week/5-ian-jeong-community-backend-express)__  
__[🔗 Frontend Server - Vanilla](https://github.com/100-hours-a-week/5-ian-jeong-community-frontend-vanilla)__

<br>

##### Tech Stacks

<img src="https://img.shields.io/badge/React-61DAFB?style=plastic&logo=React&logoColor=black"/>


##### Dev Env

[![MacOS](https://img.shields.io/badge/MacOS-000000?style=plastic&logo=macos&logoColor=black")](https://www.apple.com/macos/big-sur/) [![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-blue?style=plastic&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)




<br><br><br><br><br>

## 🗂️ Directory Structure
---

```
하위 디렉터리와 파일이 너무 많아서 모두 표시하지 않았습니다.
```

```javascript
community-frontend-react
|
| --- public
|       |
|       | --- index.html
|
| --- src
|       | 
|       | --- App.js
|       | --- index.js
|       | --- asset  // 폰트, 이미지
|       | --- component  //  컴포넌트.jsx
|       | --- constants  //  바닐라 코드에서 global.js와 같은 역할을 하는 serverAddress와 placeholder의 상수
|       | --- hoc  // 고차컴포넌트
|       | --- hooks  //  커스텀 훅
|       | --- pages  // App.js 에서 라우트 모듈을 통해 렌더링 될 페이지들
|       | --- styles  // 컴포넌트와 페이지들의 css
|       | --- utils  // 전역으로 사용하는 유틸 함수와 특정 이벤트 (배경 클릭 시 폭죽) 모듈

```





<br><br><br><br><br>


## ⚙️ Components
---

##### Header.jsx
```javascript
const Header = (props) => {
    const navigator = useNavigator();
    const {backBtnVisibility, profileImageVisibility, navigateToPreviousPage, userId, userProfileImage} = props;
    const [dropBoxVisibility, setDropBoxVisibility] = useState('hidden');

    const showDropBox = () => {
        setDropBoxVisibility('visible');
    }

    document.addEventListener("click", (e) => {
        const clickedElement = e.target;
            
        if (clickedElement !== document.getElementById("profile-image-btn")) {
            setDropBoxVisibility('hidden');
        }
    });

    return (
        <>
            <header>
                <div id="header-title-text">One Day One Post</div>
                <div id="header-box">

                    <img 
                        id="back-btn" 
                        src={arrow} 
                        alt="back" 
                        style={{visibility: backBtnVisibility}} 
                        onClick={navigateToPreviousPage}>
                    </img>
                    <img 
                        id="profile-image-btn" 
                        src={userProfileImage} 
                        alt="profile-image" 
                        style={{visibility: profileImageVisibility}} 
                        onClick={showDropBox}>
                    </img>

                    <div id="drop-down-box" style={{visibility: dropBoxVisibility}}>

                        <button id="move-user-edit-btn" className="drop-down" onClick={() => navigator.navigateToEditUser(userId)}>회원정보 수정</button>
                        <button id="move-password-edit-btn" className="drop-down" onClick={() => navigator.navigateToEditPassword(userId)}>비밀번호 수정</button>
                        <button id="logout-btn" className="drop-down" onClick={navigator.navigateToSignIn}>로그아웃</button>

                    </div>
                </div>
            </header>  
        </>
    );
}

export default Header;
```
```
모든 페이지에서 헤더가 공통적으로 사용되므로 컴포넌트로 분리했습니다.
전달받은 props를 통해서 각 페이지에서 필요한 요소만 보이도록 렌더링할 수 있습니다.
```

<br>

##### HelperText.jsx

```javascript
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
```

```
헬퍼텍스트 컴포넌트입니다.
입력이 필요한 페이지에서 헬퍼텍스트가 다수 사용됩니다.
style이나 text는 입력 요소마다 다르기 때문에 props에 의해 결정됩니다.
```

<br>

##### Modal.jsx
```javascript
const Modal = (props) => {
    const {type, visibility, showModal, deleteModal} = props;
    let target;
    
    if(type === "user-del") {
        return (
            <>
                <div id="modal" style={{visibility: visibility}}>
                    <div id="modal-text1">회원탈퇴 하시겠습니까?</div>
                    <div id="modal-text2">작성된 게시글과 댓글은 삭제됩니다.</div>
                    <div id="modal-btn-box">
                        <button className="modal-cancel" onClick={showModal}>취소</button>
                        <button id={type} className="modal-delete" onClick={deleteModal}>확인</button>
                    </div>
                </div>

                <div id="modal-background" style={{visibility: visibility}}></div>
            </>
        );
    }

    if (type === 'post-del') {
        target = '게시글';
    } else {
        target = '댓글';
    }

    return (
        <>
             <div id="modal" style={{visibility: visibility}}>
                <div id="modal-text1">{target}을 삭제하시겠습니까?</div>
                <div id="modal-text2">삭제한 내용은 복구할 수 없습니다.</div>
                <div id="modal-btn-box">
                    <button className="modal-cancel" onClick={showModal}>취소</button>
                    <button id={type} className="modal-delete" onClick={deleteModal}>확인</button>
                </div>
            </div>

            <div id="modal-background" style={{visibility: visibility}}></div>
        </>
    );
  }
  
  export default Modal;
```

```
서비스 사용자에 의한 데이터 삭제를 진행할 때 모달이 사용됩니다.
총 3개의 페이지에서 사용되고 각 페이지마다 props가 다를 수 있습니다.
```

<br>

##### PageTitle.jsx

```javascript
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
```

```
페이지 타이틀 컴포넌트입니다.
헤더 타이틀과는 별개로, 각 페이지 마다 대표되는 타이틀이 있고 공통으로 가지는 특징이 있기 때문에 컴포넌트로 작성했습니다.
```


<br>


##### VerticalPadding.jsx

```javascript
const VerticalPadding = (props) => {
    const {marginTop} = props;

    return (
        <>
           <div style={{marginTop: marginTop}}></div>
        </>
    );
}

export default VerticalPadding;
```

```
수직 패딩 컴포넌트 입니다.
다른 컴포넌트들로 페이지를 구성한다고 했을 때, 여러 개의 컴포넌트들이 같은 속성을 지닌 채로 사용되면서 
레이아웃의 위치 떄문에 margin혹은 padding을 넣어야 하는 것은 좋지 않다고 생각했고
그러한 역할을 하는 패딩 컴포넌트를 작성하면 이미 만들어 놓은 컴포넌트들로 새로운 페이지를 꾸리기 쉬울거라고 생각했습니다.
```

<br>

##### Comment.jsx

```javascript
const Comment = (props) => {
    const {data, showModal, editCommentMode, clickComment} = props;

    return (
        <>
              <div className="comment" data-id={data.id}>
                <div className="comment-writer-box">
                    <div className="comment-writer">
                        <img className="comment-writer-img" src={data.profileImage}></img>
                        <div className="comment-writer-nickname">{data.nickname}</div>
                        <div className="comment-writer-time">{data.time}</div>
                    </div>
                    <div className="comment-content">{data.text}</div>
                </div>

                <div className="comment-btn-box">
                    <button 
                        className="comment-edit-btn"
                        style={{visibility: data.editBtnVisibility}} 
                        onClick={() => editCommentMode(data.text, data.id)}>
                        수정
                    </button>
                    <button 
                        className="comment-delete-btn" 
                        style={{visibility: data.deleteBtnVisibility}} 
                        onClick={(e) => {
                            clickComment.current = data.id;
                            showModal(e)}}>
                        삭제
                    </button>
                </div>
            </div>
        </>
    );
  }
  
  export default Comment;
```

```
댓글 박스 컴포넌트입니다.
게시글 상세페이지에서 여러 개의 댓글이 나타날 수 있기 떄문에 컴포넌트로 작성했습니다.
```


<br>


##### ContentInput.jsx

```javascript
import React from "react";

import placeholderMessage from "../../constants/placeholder";
import "../../styles/components/post/content-input.css";

const ContentInput = (props) => {
    const {validateInput} = props;

    return (
        <>
            <div id="content-input-text">내용*</div>
            <textarea 
                id="content-input" 
                type="text" 
                placeholder={placeholderMessage.CONTENT_INPUT} 
                onInput={(e) => validateInput(e)}>
            </textarea>
        </>
    );
}

export default ContentInput;
```

```
본문 내용 입력 컴포넌트입니다.
게시글 작성 페이지와 게시글 수정 페이지에서 입력 컴포넌트로 사용됩니다.
```

<br>


##### PostCard.jsx

```javascript
const PostCard = (props) => {
    const {data} = props;

    const navigate = useNavigate();
    
    const navigateToPostDetail = () => {
        navigate(`/posts/${data.id}`);
    }
    
    
    return (
        <>
           <div className="post-box" data-id={data.id} onClick={navigateToPostDetail}>
                <div className="up-post">
                    <div className="post-title">{data.title}</div>

                    <div className="post-log-box">
                        <div className="like">좋아요 {data.likes}</div>
                        <div className="comment-num">댓글 {data.comments}</div>
                        <div className="hits">조회수 {data.hits}</div>
                        <div className="time">{data.time}</div>
                    </div>
                </div>

                <hr className="line1"></hr>

                <div className="down-post">
                    <img src={data.image} alt="Profile Image" className="profile-image"></img>
                    <div className="writer">{data.nickname}</div>
                </div>
            </div>
        </>
    );
}

export default PostCard;
```

```
게시글 카드 컴포넌트 입니다.
게시글 목록 페이지에서 여러 개가 나타날 수 있기 때문에 컴포넌트로 작성했습니다.
```


<br>


##### PostImageInput.jsx

```javascript
const PostImageInput = (props) => {
    const {postImageInput, addImageFunc, postImageInputName} = props;

    return (
        <>
            <div id="post-image-input-text">이미지</div>
            <div id="post-image-input-label-box">
                <label id="post-image-input-label" for="post-image-input">파일 선택</label>{" " + postImageInputName}
            </div>
            <input type="file" id="post-image-input" accept="image/*" onChange={addImageFunc}></input>
            <img id="post-image-preview" src={postImageInput}></img>
        </>
    );
}

export default PostImageInput;
```

```
게시글 이미지 입력 컴포넌트 입니다.
ContentInput 과 마찬가지로 게시글 작성과 게시글 수정에서 사용되는 컴포넌트입니다.
```

<br>

##### TitleInput.jsx

```javascript
const TitleInput = (props) => {
    const {validateInput} = props;

    return (
        <>
            <div id="title-input-text">제목*</div>
            <input 
                type="text" 
                id="title-input"
                placeholder={placeholderMessage.TITLE_INPUT}
                onInput={(e) => {
                    e.target.value = e.target.value.substring(0, 26);
                    validateInput(e)
                }}
            ></input>
        </>
    );
}

export default TitleInput;
```

```
제목 입력 컴포넌트 입니다.
게시글 작성과 게시글 수정에서 사용되는 컴포넌트입니다.
```

<br>




<br><br><br><br><br>




## Hooks
---

<br><br><br><br><br>


## Hoc
---

<br><br><br><br><br>

## 🔍 Details
---