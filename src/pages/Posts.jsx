import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import serverAddress from './../constants/serverAddress';
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import VerticalPadding from "../components/VerticlaPadding";
import PostCard from "../components/PostCard";

import "../styles/pages/posts.css";

const Posts = () => {
    const userId = useRef(0);
    const [userProfileImage, setUserProfileImage] = useState("");
    const [postCards, setPostCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = {
                id: 0
            }
            await getUserIdFromSession(result);
            userId.current = result.id;
            await getUserProfileImageById();
            await getPosts();
        }

        fetchData();
    }, []);


    const navigate = useNavigate();
 
    const navigateToAddPost = () => {
        navigate("/posts/new");
    };

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

    const getPosts = async () => {
        setPostCards([]);
        await fetch(`${serverAddress.BACKEND_IP_PORT}/posts`)
            .then(postsData => postsData.json())
            .then(postsJson => {
                postsJson.reverse().forEach(async(post) => {    
                    const postData = {
                        id: post.id,
                        title: post.title,
                        likes: makeShortNumber(post.likes),
                        comments: makeShortNumber(post.comments),
                        hits: makeShortNumber(post.hits),
                        time: post.time,
                    }

                    await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${post.writer}}`)
                        .then(userData => userData.json())
                        .then(userJson => {
                                postData.profileImage = userJson.profileImage;    
                                postData.nickname = userJson.nickname;
                            })

                    setPostCards(prevPostCards => [...prevPostCards, postData]); 
                });
            });
    }


    const makeShortNumber = (number) => {
        if (number >= 1000) {
            return (number / 1000).toFixed(0) + 'K';
            
        } else {
            return number.toString();
        }
    }

    return (
        <>
            <Header 
                backBtnVisibility="hidden" 
                profileImageVisibility="visible"
                userId={userId}
                userProfileImage={userProfileImage}>
            </Header>
            <VerticalPadding marginTop={"3.7vh"}></VerticalPadding>
            <PageTitle flag={true}></PageTitle>

            <div id="add-btn-box">
                <button id="add-btn" onClick={navigateToAddPost}>게시글 작성</button>
            </div>

            {postCards.map(postData => (
                <PostCard  
                    data={postData}>
                </PostCard>
            ))}
        </>
    );
  }
  
  export default Posts;