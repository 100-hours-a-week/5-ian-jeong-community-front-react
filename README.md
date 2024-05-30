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
props를 통해서 렌더링할 데이터를 전달받습니다.
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
props로 검증하는 함수를 전달받아서 onInput의 속성으로 할당함으로써 즉시 헬퍼텍스트가 표시되도록 구현되어 있습니다.
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
props를 통해서 게시글 카드마다 렌더링할 데이터를 전달받습니다.
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

##### ProfileImageInputBox.jsx

```javascript
const ProfileImageInputBox = (props) => {
    const {type, profileHelperTextVisibility, profileHelperText, profileImage, profileOpacity, addImageFunc} = props;

    if (type == 'new') {
        return (
            <>
                <label id="profile-image-input-text" for="profile-image-input">프로필 사진</label>
                <HelperText visibility={profileHelperTextVisibility} text={profileHelperText} color={"#FF0000"}></HelperText>
                            
                    <div id="profile-image-input-box">
                        <input 
                            type="file" 
                            id="profile-image-input" 
                            accept="image/*" 
                            onChange={addImageFunc}    
                            >

                        </input>
                        <div id="cross-col" style={{opacity: profileOpacity}}></div>
                        <div id="cross-row" style={{opacity: profileOpacity}}></div>
                        <img id="profile-image-preview" src={profileImage} alt=""></img>
                    </div>
            </>
        )
    } else {
        return (
            <>
                <label id="profile-image-input-text" for="profile-image-input">프로필 사진</label>
                        
                    <div id="profile-image-input-box">
                        <input 
                            type="file" 
                            id="profile-image-input" 
                            accept="image/*"
                            onChange={addImageFunc}>
                        </input>
                        <label id="image-edit-btn" for="profile-image-input">변경</label>
                        <img id="profile-image-preview" src={profileImage} style={{opacity: 0.55, backgroundColor: "#464646"}} alt=""></img>
                    </div>
            </>
        );
    }

}

export default ProfileImageInputBox;
```

```
유저의 프로필 사진을 입력받는 컴포넌트 입니다.
회원가입과 유저정보수정에서의 컴포넌트 형태가 다른 부분이 많기 때문에 분기 처리했습니다.
컴포넌트로 만들지 않아도 괜찮을 수 있지만 어느정도 공통된 부분이 있고 현 시점이 개발이 끝이 아니기
떄문에 컴포넌트로 작성했습니다.
```

<br>

##### TextInput.jsx

```javascript
const TextInput = (props) => {
    let type = props.type;
    const {validateInput, flag} = props;

    let id;
    let labelText;
    let placeholder;
    
    if (type == 'email') {
        type = 'text';
        id = 'email-input';

        if (flag) {
            labelText = '이메일*';    
        } else {
            labelText = '이메일';
        }

        placeholder = placeholderMessage.EMAIL_INPUT;

    } else if(type == 'password') {
        type = 'password';
        id = 'password-input';

        if (flag) {
            labelText = '비밀번호*';    
        } else {
            labelText = '비밀번호';
        }

        placeholder = placeholderMessage.PASSWORD_INPUT;

    } else if(type == 'repassword') {
        type = 'password';
        id = 'repassword-input';
        
        if (flag) {
            labelText = '비밀번호 확인*';    
        } else {
            labelText = '비밀번호 확인';
        }

        placeholder = placeholderMessage.REPASSWORD_INPUT;
    } else {
        type = 'text';
        id = 'nickname-input';
        
        if (flag) {
            labelText = '닉네임*';    
        } else {
            labelText = '닉네임';
        }

        placeholder = placeholderMessage.NICKNAME_INPUT;
    }


    return (
        <>
            <label for={id} className="input-label-text">{labelText}</label>
            <input 
                type={type} 
                id={id} 
                className="text-input" 
                placeholder={placeholder}
                onInput={(e) => validateInput(e.target.value)}
            >

            </input>
        </>
    );
}

export default TextInput;
```

```
텍스트 입력 컴포넌트입니다.
레이블과 플레이스홀더 이외에 공통적인 요소가 많고 텍스트 입력은 한 페이지에서도
여러 개 사용되기 떄문에 컴포넌트로 작성했습니다.
```



<br><br><br><br><br>




## 🔪 Custom Hooks

---

##### useNavigator.jsx

```javascript
const useNavigator = () => {
    const navigate = useNavigate();
    
    const navigateToSignIn = () => {
        navigate("/users/sign-in");
    };
    
    const navigateToSignUp = () => {
        navigate("/users/sign-up");
    };
    
    const navigateToPosts = () => {
        navigate("/posts");
    };
    
    const navigateToAddPost = () => {
        navigate(`/posts/new`);
    };
    
    const navigateToEditPost = (postId) => {
        navigate(`/posts/${postId}/edit`);
    };
    
    const navigateToPostDetail = (postId) => {
        navigate(`/posts/${postId}`);
    };
    
    const navigateToEditUser = (userId) => {
        navigate(`/users/${userId}`);
    };
    
    const navigateToEditPassword = (userId) => {
        navigate(`/users/${userId}/password`);
    };

    return {
        navigateToSignIn,
        navigateToSignUp,
        navigateToPosts,
        navigateToAddPost,
        navigateToEditPost,
        navigateToPostDetail,
        navigateToEditUser,
        navigateToEditPassword,
    }
}

export default useNavigator;
```

```
페이지 이동 커스텀 훅입니다.
각 페이지 마다 다른 페이지로 이동해야 하는 이벤트가 필요합니다.
해당 로직을 커스텀 훅으로 작성했습니다.
```

<br>


##### useRefCapsule.jsx

```javascript
const useRefCapsule = (initValue) => {
    const dataRef = useRef(initValue);
    
    const getData = useCallback(() => {
        return dataRef.current;
    }, []);

    const setData = useCallback((newValue) => {
        dataRef.current = newValue;
    }, []);
    
    return {
        get: getData,
        set: setData
    }
}

export default useRefCapsule;
```

```
useRef를 한 번 감싸는 커스텀 훅입니다.
상태관리를 useRef만 사용하는 데이터가 페이지마다 자주 등장합니다.
input의 ref값은 입력마다 바뀔 수 있는 경우가 있기 때문에 데이터 수정을 위한 함수 호출 잦습니다.
해당하는 값들의 상태관리를 커스텀 훅으로 작성한다면 좀 더 수월한 관리가 될 것으로 판단헸습니다.

- 사용할 위치에서 위 커스텀 훅 생성 시 전달받은 초기 값으로 useRef세팅
- get, set을 통해 dataRef을 완전히 캡슐화
- 사용자의 입력하는 값에 따라 자주 수정 되므로, 수정 역할을 하는 함수가 재생성이 계속되면 낭비
→ useCallback 훅을 사용해서 함수 메모화
- 캡슐화된 값을 .current가 아닌 get를 통해 간단하게 꺼냄
- .current를 깜빡하고 사용하지 않아서 객체의 주소값을 그대로 전달하거나 사용할 실수가 없어짐
- set함수를 하위 컴포넌트에 전달해서 이벤트 마다 호출 되도록 함
- useCallback()을 통해 생성된 함수이므로 호출될 때마다 함수를 생성하는 과정이 필요없음
```

<br>


##### useFetch.jsx

```javascript
const useFetch = () => {
    const [fetchResult, setFetchResult] = useState(null);
  
    const fetchData = async (url, reqData) => {
        setFetchResult(null);

        await fetch(url, reqData)
            .then(async (response) => {
                if (response.status !== 200) {
                    setFetchResult(response.status);
                    return;
                } 

                const responseJson = await response.json();
                setFetchResult(responseJson.result);
            })
            .catch(error => {
                console.error(`${url} fetch error:`, error);
            });
    }

    return {
        fetchResult: fetchResult,
        fetchData: fetchData
    };
  }

export default useFetch;
```

```
비동기로 동작하는 fetch를 커스텀훅으로 작성했습니다.
페이지 여러 곳에서 fetch가 이뤄지고 있고 공통 로직을 상태관리와 함께 깔끔하게 처리할 수 있습니다.

- 렌더링 당시에 커스텀 훅을 할당받는데, 결과 데이터와 fetch로 이어지는 함수를 반환 받는 형태
- 반환 받은 함수에는 fetch를 실행하면서 내부에서 set함수 호출을 통해 결과 데이터 갱신
- 내부에서 fetchResult에 fetch 결과 상태를 관리
- fetchData 첫 줄에 setFetchResult(null)이 있는 이유는, 
해당 훅 외부에서 같은 값이 었다가 외부에서 다른 예외처리로 인해 값이 바뀌었다가
다시 훅으로 돌아와서 검증했을 때 같은 결과라면 다른 예외처리로 인해 바뀐 텍스트를
정상으로 돌려야 하는데 같은 state라면 업데이트가 되지 않아서 외부에서 useEffect가 동작을 안해서 문제가 됨
*signUp.jsx, useFetch.jsx 참조 
    
- fetchData를 통해서 fetchResult 의 상태 업데이트
- fetchResult와 fetchData반환
- 키-값 쌍으로 반환한 이유는 외부에서 원하는 네이밍으로 사용하기 위해
```

<br>





<br><br><br><br><br>


## Hoc
---

##### withAuth.jsx

```javascript
const withAuth = (WrappedComponent) => {
    
    const WithAuthUser = () => {
        const [userId, setUserId] = useState(null);
        
        const getUserIdFromSession = async () => {
            await fetch(`${serverAddress.BACKEND_IP_PORT}/users/session`, { credentials: 'include' })
                .then(async(response) => {
                    const responseJson = await response.json();
                    setUserId(responseJson.result);
                })
                .catch(error => {
                    console.error(`auth fetch error:`, error);
                });
        }

        useEffect(() => {
            getUserIdFromSession();
        }, []);

        if (userId === 0) {
            
            alert('인증실패! 로그아웃'); 
            window.location.href = '/users/sign-in';
        
            return;    
        }
        
        return <WrappedComponent userId={userId} />;
    }

    return WithAuthUser;
}

export default withAuth;
```

```
유저 인증 로직을 고차 컴포넌트로 작성해서 적용했습니다.
Welcome, SignIn, SignUp 페이지를 제외한 모든 페이지에서 인증이 필요합니다.
기존의 인증 로직은 모든 컴포넌트 도입부에서 useEffect를 통해 적용했었습니다.

- wiAuth 고차 컴포넌트를 통해서 인증이 필요한 페이지에서는 서버의 세션을 확인
- 인증되었다면 전달받은 컴포넌트를 반환
- 인증에 실패하였다면 다시 로그인 패이지로 이동
```
