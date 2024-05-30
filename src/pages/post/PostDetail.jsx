import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom';

import withAuth from "../../hoc/withAuth";
import useNavigator from "../../hooks/useNavigator";
import useFetch from "../../hooks/useFetch";
import serverAddress from "../../constants/serverAddress";
import Header from "../../components/common/Header";
import Modal from "../../components/common/Modal";
import VerticalPadding from "../../components/common/VerticlaPadding";
import Comment from "../../components/post/Comment";
import "../../styles/pages/post/post-detail.css";


const PostDetail = (props) => {
    const {userId} = props;
    const navigator = useNavigator();

    const {fetchResult: user, fetchData: fetchUser} = useFetch();
    const {fetchResult: postWriter, fetchData: fetchPostWriter} = useFetch();
    
    const { postId } = useParams();
    const commentInput = useRef("");
    const clickComment = useRef(0);
    
    const [userProfileImage, setUserProfileImage] = useState("");
    const [modalVisibility, setModalVisibility] = useState('hidden');
    const [addCommnetBtnColor, setAddCommentBtnColor] = useState('#8fce92');
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
    const [postDetailCommentNum, setPostDetailCommentNum] = useState(0);
    const [postDetailHits, setPostDetailHits] = useState(0);
    const [comments, setComments] = useState([]);
    const [result, setResult] = useState(null); // 여기에 게시글 댓글 모두 가져옴


    

    useEffect(() => {
        console.log(`인증 유저 아이디: ${userId}`);

        getUserProfileImageById();
        getPost();
    }, [userId]);

    useEffect(() => {
        if (user == null) {
            return;
        }
  
        setUserProfileImage(user.image);

    }, [user])

    useEffect(() => {
        if (result == null) {
            return;
        }

        setPostDetailTitle(result.post.title);

        if (parseInt(userId) != parseInt(result.post.user_id)) {
            setPostDetailEditBtnVisibility('hidden');
            setPostDetailDeleteBtnVisibility('hidden');
        }

        setPostDetailTime(result.post.created_at)
        setPostDetailImage(result.post.image);
        setPostDetailContent(result.post.content);

        const commentNum = parseInt(result.post.comment_count);
        setPostDetailCommentNum(commentNum);
        setPostDetailHits(result.post.view_count);
         
        getPostWriter();

    
        setComments([]);

        result.comments.forEach(async (comment) => {
            const commentData = {
                id: comment.id,
                time: comment.created_at,
                text: comment.content,
            }
        
            await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${comment.user_id}`)
                .then(userData => userData.json())
                .then(userJson => {
                    if (parseInt(userJson.result.id) !== parseInt(userId)) {
                        commentData.editBtnVisibility = 'hidden';
                        commentData.deleteBtnVisibility = 'hidden';
                    }
                
                    commentData.profileImage = userJson.result.image;
                    commentData.nickname = userJson.result.nickname;
                });
            
            setComments(prevComments => [...prevComments, commentData]);
        })
    }, [result])


    useEffect(() => {
        if (postWriter == null) {
            return;
        }

        setWriter(postWriter.nickname);
        setWriterProfileImage(postWriter.image);

    }, [postWriter])


    const getUserProfileImageById = async () => {
        await fetchUser(`${serverAddress.BACKEND_IP_PORT}/users/${userId}`, {method: 'GET'})
    }

    const getPost = async () => {
        await fetch(`${serverAddress.BACKEND_IP_PORT}/posts/${postId}`)
                .then(postData => postData.json())
                .then(postJson => {
                    setResult(postJson);
                });
    }

    const getPostWriter = async () => {
        await fetchPostWriter(`${serverAddress.BACKEND_IP_PORT}/users/${result.post.user_id}`, {mehtod: 'GET'});
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
        }
    }

    const updateCommentInput = (e) => {
        commentInput.current = e.target.value;

        if (commentInput.current) {
            setAddCommentBtnColor('#409344');
            setAddCommentBtnDisabled(false);

            return;
        }

        setAddCommentBtnDisabled(true);
        setAddCommentBtnColor('#8fce92');
    }

    const editCommentMode = (comment, commentId) => {
        clickComment.current = commentId;
        setAddCommentBtnText("댓글 수정");
        setAddCommentBtnColor('#409344');
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
                    <div className="num" id="hits-num">{postDetailHits}</div>
                    <div className="text1">조회수</div>
                </div>

                <div id="post-detail-coments">
                    <div className="num" id="comments-num">{postDetailCommentNum}</div>
                    <div className="text2">댓글</div>
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
                    onClick={addComment}
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
  
  export default withAuth(PostDetail);