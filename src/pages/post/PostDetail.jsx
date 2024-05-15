import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom';

import useNavigator from "../../hooks/useNavigator";
import useFetch from "../../hooks/useFetch";
import serverAddress from "../../constants/serverAddress";
import Header from "../../components/common/Header";
import Modal from "../../components/common/Modal";
import VerticalPadding from "../../components/common/VerticlaPadding";
import Comment from "../../components/post/Comment";
import "../../styles/pages/post/post-detail.css";


const PostDetail = () => {
    const navigator = useNavigator();

    const {fetchResult: userId, fetchData: fetchUserId} = useFetch();
    const {fetchResult: user, fetchData: fetchUser} = useFetch();
    const {fetchResult: post, fetchData: fetchPost} = useFetch();
    const {fetchResult: postWriter, fetchData: fetchPostWriter} = useFetch();
    const {fetchResult: updateHitsResult, fetchData: fetchUpdateHitsResult} = useFetch();
    const {fetchResult: postCommments, fetchData: fetchPostComments} = useFetch();
    
    const { postId } = useParams();
    const commentInput = useRef("");
    const clickComment = useRef(0);

    const [userProfileImage, setUserProfileImage] = useState("");
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


    useEffect(() => {
        getUserIdFromSession();
    }, []);

    useEffect(() => {
        if (userId == null) {
            return;
        }

        console.log(`인증 유저 아이디: ${userId}`);

        if (parseInt(userId) === 0) {
            alert('로그아웃 되었습니다 !');
            navigator.navigateToSignIn();
        } 

        getUserProfileImageById();
        getPost();
        getComments();
    }, [userId]);

    useEffect(() => {
        if (user == null) {
            return;
        }
  
        setUserProfileImage(user.profileImage);

    }, [user])

    useEffect(() => {
        if (post == null) {
            return;
        }

        setPostDetailTitle(post.title);
        console.log(userId);
        console.log(post.writer);
        if (parseInt(userId) != parseInt(post.writer)) {
            setPostDetailEditBtnVisibility('hidden');
            setPostDetailDeleteBtnVisibility('hidden');
        }

        setPostDetailTime(post.time)
        setPostDetailImage(post.image);
        setPostDetailContent(post.content);

        const newHits = post.hits + 1;
        setPostDetailHits(newHits); // 바로 업데이트 안됨, 다음 렌더링 사이클에서 한꺼번에 됨
        const commentNum = parseInt(post.comments);
        setPostDetailCommentNum(commentNum);
         
        getPostWriter();
        updateHits();
    }, [post])


    useEffect(() => {
        if (postWriter == null) {
            return;
        }

        setWriter(postWriter.nickname);
        setWriterProfileImage(postWriter.profileImage);

    }, [postWriter])

    useEffect(() => {
        if (updateHitsResult === 204) {
            console.log('조회수 업데이트 성공');
        } else {
            console.log('조회수 업데이트 실패');
        }
    }, [updateHitsResult]);

    useEffect(() => {
        if (postCommments == null) {
            return;
        }

        setComments([]);

        postCommments.forEach(async (comment) => {
            const commentData = {
                id: comment.id,
                time: comment.time,
                text: comment.text,
            }
        
            await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${comment.writer}`)
                .then(userData => userData.json())
                .then(userJson => {
                    if (parseInt(userJson.result.id) !== parseInt(userId)) {
                        commentData.editBtnVisibility = 'hidden';
                        commentData.deleteBtnVisibility = 'hidden';
                    }
                
                    commentData.profileImage = userJson.result.profileImage;
                    commentData.nickname = userJson.result.nickname;
                });
            
            setComments(prevComments => [...prevComments, commentData]);
        })
    }, [postCommments]);




    const getUserIdFromSession = async() => {
        await fetchUserId(`${serverAddress.BACKEND_IP_PORT}/users/session`, {credentials: 'include'});
    }

    const getUserProfileImageById = async () => {
        await fetchUser(`${serverAddress.BACKEND_IP_PORT}/users/${userId}`, {method: 'GET'})
    }

    const getPost = async () => {
        await fetchPost(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}`, {mehtod: 'GET'});
    }

    const getPostWriter = async () => {
        await fetchPostWriter(`${serverAddress.BACKEND_IP_PORT}/users/${post.writer}`, {mehtod: 'GET'});
    }

    const getComments = async () => {
        await fetchPostComments(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}/comments`, {mehtod: 'GET'});
    }

    const updateHits = async () => {
        const obj = {
            title: post.title,
            content: post.content,
            imageName: post.imageName,
            image: post.image,
            hits: post.hits + 1,
        }
                    
        const data = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(obj)
        }

        await fetchUpdateHitsResult(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}`, data);
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
            await fetch(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}`, {method: 'DELETE'});
            alert('해당 게시글이 삭제되었습니다!');
            document.body.style.overflow = 'auto';
            setModalVisibility('hidden');
            navigator.navigateToPosts();
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






    




    const addComment = async () => {
        if(addCommentBtnText === '댓글 등록') {
            const obj = {
                postId : postId,
                writer : userId,
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
                navigateToPreviousPage={navigator.navigateToPosts}
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
                        onClick={() => navigator.navigateToEditPost(postId)}
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