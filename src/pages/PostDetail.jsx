import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import serverAddress from "../constants/serverAddress";
import Header from "../components/Header";
import Comment from "../components/Comment";
import Modal from "../components/Modal";
import VerticalPadding from "../components/VerticlaPadding";

import "../styles/pages/post-detail.css";


const PostDetail = () => {
    const userId = useRef(0);
    const clickComment = useRef(0);
    const [userProfileImage, setUserProfileImage] = useState("");
    const { postId } = useParams();
    const commentInput = useRef("");
    const [modalVisibility, setModalVisibility] = useState('hidden');
    const [addCommnetBtnColor, setAddCommentBtnColor] = useState('#ACA0EB');
    const [addCommentBtnDisabled, setAddCommentBtnDisabled] = useState(true)
    const [modalType, setModalType] = useState('게시글');
    const [addCommentBtnText, setAddCommentBtnText] = useState('댓글 등록');
    const [postDetailTitle, setPostDetailTitle] = useState("");
    const [postDetailEditBtnVisibility, setPostDetailEditBtnVisibility] = useState("visible");
    const [postDetailDeleteBtnVisibility, setPostDetailDeleteBtnVisibility] = useState("visible");
    const [writer, setWriter] = useState("");
    const [writerProfileImage, setWriterProfileImage] = useState("");
    const [postDetailTime, setPostDetailTime] = useState("");
    const [postDetailImage, setPostDetailImage] = useState("");
    const [postDetailContent, setPostDetailContent] = useState("");
    const [postDetailHits, setPostDetailHits] = useState(0);
    const [postDetailCommentNum, setPostDetailCommentNum] = useState(0);
    const [comments, setComments] = useState([]);

    const navigate = useNavigate();
 
    const navigateToPosts = () => {
        navigate("/posts");
    };

    const navigateToEditPost = () => {
        navigate(`/posts/${postId}/edit`);
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = {
                id: 0
            }
            await getUserIdFromSession(result);
            userId.current = result.id;
            await getUserProfileImageById();
            await getPost();
            await getComments();
        }

        fetchData();
    }, []);

    const getUserIdFromSession = async(result) => {
        await fetch(`${serverAddress.BACKEND_IP_PORT}/users/session`, {credentials: 'include'})
            .then(response => response.json())
            .then(user => {
                if (parseInt(user.id) !== 0) {
                    result.id = user.id;
                } else {
                    alert('로그아웃 되었습니다 !');
                    navigate(`/users/sign-in`);
                }
            });
    }

    const getUserProfileImageById = async () => {
        await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${userId.current}`) 
            .then(userData => userData.json())
            .then(userJson => {
                setUserProfileImage(userJson.profileImage);
            })
            .catch(error => {
                console.error('profile image fetch error:', error);
            });
    }



    const showModal = (e) => {
        if(e.target.id === 'post-detail-delete-btn') {
            setModalType('post-del');
        } else {
            setModalType('comment-del');
        }
    
        if (modalVisibility === 'hidden') {
            document.body.style.overflow = "hidden";
            setModalVisibility("visible");

            return;
        }
        document.body.style.overflow = "auto";
        setModalVisibility("hidden");
    }

    const deleteModal = async (e) => {
        if(e.target.id === 'post-del') {
            await fetch(`${serverAddress.serverAddress.BACKEND_IP_PORT}/posts/${postId}`, {method: 'DELETE'});
            alert('해당 게시글이 삭제되었습니다!');
            navigate('/posts');
        }
        
        if(e.target.id === 'comment-del') {    
            await fetch(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}/comments/${clickComment.current}`, {method: 'DELETE'});
            alert('해당 댓글이 삭제되었습니다!');
            setModalVisibility('hidden');
            document.body.style.overflow = 'auto';
            setPostDetailCommentNum(postDetailCommentNum - 1);
            await getComments();
        }
    }

    const updateCommentInput = (e) => {
        commentInput.current = e.target.value;

        if (commentInput.current) {
            setAddCommentBtnColor('#7F6AEE');
            setAddCommentBtnDisabled(false);

            return;
        }

        setAddCommentBtnDisabled(true);
        setAddCommentBtnColor('#ACA0EB');
    }

    const editCommentMode = (comment, commentId) => {
        clickComment.current = commentId;
        setAddCommentBtnText("댓글 수정");
        setAddCommentBtnColor('#7F6AEE');
        setAddCommentBtnDisabled(false);
        document.getElementById("comment-input").value=comment;
        commentInput.current = comment;
    }

    const getPost = async () => {
        await fetch(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}`) 
            .then(postData => postData.json()) 
            .then(async (postJson) => {
                setPostDetailTitle(postJson.title);
                
                if (parseInt(userId.current) != parseInt(postJson.writer)) {
                    console.log('hi');
                    setPostDetailEditBtnVisibility('hidden');
                    setPostDetailDeleteBtnVisibility('hidden');
                }
                        
                await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${postJson.writer}`) 
                    .then(userData => userData.json())
                    .then(userJson => {
                        
                        setWriter(userJson.nickname);
                        setWriterProfileImage(userJson.profileImage);
                    });
                
                setPostDetailTime(postJson.time)
                setPostDetailImage(postJson.image);
                setPostDetailContent(postJson.content);
                const newHits = postJson.hits + 1;
                console.log(postJson.hits + 1);
                setPostDetailHits(newHits); // 바로 업데이트 안됨, 다음 렌더링 사이클에서 한꺼번에 됨
                const commentNum = parseInt(postJson.comments);
                setPostDetailCommentNum(commentNum);
    
                const obj = {
                    title: postJson.title,
                    content: postJson.content,
                    imageName: postJson.imageName,
                    image: postJson.image,
                    hits: postJson.hits + 1,
                }
                    
                const data = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }
            
                await fetch(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}`, data)
                    .then(response => {
                    if (response.status === 204) {
                        console.log('조회수 업데이트 성공');
                    } else {
                        console.log('조회수 업데이트 실패');
                    }
                  })
                  .catch(error => {
                    console.error('fetch error:', error);
                  });
            });
    }


    const getComments = async () => {
        setComments([]);
        await fetch(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}/comments`) 
            .then(commentsData => commentsData.json())
            .then(commentsJson => {
                commentsJson.forEach(async (comment) => {
                    const commentData = {
                        id: comment.id,
                        time: comment.time,
                        text: comment.text,
                    }
                
                
                    await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${comment.writer}`)
                        .then(userData => userData.json())
                        .then(userJson => {
                            if (parseInt(userJson.id) !== parseInt(userId.current)) {
                                commentData.editBtnVisibility = 'hidden';
                                commentData.deleteBtnVisibility = 'hidden';
                            }
                        
                            commentData.profileImage = userJson.profileImage;
                            commentData.nickname = userJson.nickname;
                        });
                    
                    setComments(prevComments => [...prevComments, commentData]);
            })
        });
    }

    const addComment = async () => {
        if(addCommentBtnText === '댓글 등록') {
            const obj = {
                postId : postId,
                writer : userId.current,
                text : commentInput.current,
            }
        
            const data = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }
        
            await fetch(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}/comments`, data)
                .then(async (response) => {
                    if (response.status !== 201) {
                        alert('댓글 작성 실패!');
                    }
                    setPostDetailCommentNum(postDetailCommentNum + 1);
                    await getComments();
                })
                .catch(error => {
                    console.error('add comment fetch error:', error);
                });
            
            document.getElementById("comment-input").value = "";
            setAddCommentBtnColor('#ACA0EB');
            setAddCommentBtnDisabled(true);
        } else {

            const obj = {
                text : commentInput.current,
            }
        
            const data = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }
        
            await fetch(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}/comments/${clickComment.current}`, data)
                .then(async (response) => {
                    if (response.status !== 204) {
                        alert('댓글 수정 실패!');
                    }
                    
                    await getComments();
                })
                .catch(error => {
                    console.error('comment update fetch error:', error);
                });
            
            
            document.getElementById("comment-input").value = "";
            setAddCommentBtnText("댓글 등록");
            setAddCommentBtnColor('#ACA0EB');
            setAddCommentBtnDisabled(true);

        }
    }

    



    return (
        <>
            <Header 
                backBtnVisibility="visible" 
                profileImageVisibility="visible"
                navigateToPreviousPage={navigateToPosts}
                userProfileImage={userProfileImage}>
            </Header>


            <div id="post-detail-title-box">
                <div id="post-detail-title">{postDetailTitle}</div>

                <div id="post-detail-info-box">
                    <img id="post-detail-profile-image" src={writerProfileImage}></img>
                    <div id="post-detail-writer">{writer}</div>
                    <div id="post-detail-time">{postDetailTime}</div>
                    <button 
                        id="post-detail-edit-btn" 
                        onClick={navigateToEditPost}
                        style={{visibility: postDetailEditBtnVisibility}}>
                        수정
                    </button>
                    <button 
                        id="post-detail-delete-btn" 
                        onClick={showModal}
                        style={{visibility: postDetailDeleteBtnVisibility}}>
                        삭제
                    </button>
                </div>
            </div>
    


            <img id="post-detail-image" src={postDetailImage}></img>
            <div id="post-detail-content">{postDetailContent}</div>


            <div id="count-box">
                <div id="post-detail-hits">
                    <div className="num" id="hits-num"></div>
                    <div className="text1">조회수</div>{postDetailHits}
                </div>

                <div id="post-detail-coments">
                    <div className="num" id="comments-num"></div>
                    <div className="text2">댓글</div>{postDetailCommentNum}
                </div>
            </div>

            <hr id="line1"/>





            <textarea 
                id="comment-input" 
                placeholder="댓글을 남겨주세요!" 
                onInput={updateCommentInput}
                ></textarea>
                
            <div id="add-comment-box">
                <button 
                    id="add-comment-btn" 
                    disabled={addCommentBtnDisabled}
                    style={{backgroundColor: addCommnetBtnColor}}
                    onClick={addComment} // 댓글아이디 어케넣지
                    >
                    {addCommentBtnText}
                </button>
            </div>



            {comments.map(commentData => (
                <Comment  
                    data={commentData}
                    showModal={showModal} 
                    editCommentMode={editCommentMode}
                    clickComment={clickComment}>
                </Comment>
            ))}
                            
            <VerticalPadding marginTop="5vh"></VerticalPadding>

            <Modal 
                type={modalType}
                visibility={modalVisibility} 
                showModal={showModal}
                deleteModal={deleteModal}
                >
            </Modal>
        </>
    );
  }
  
  export default PostDetail;