import React, { useRef, useState, useEffect } from "react";

import withAuth from "../../hoc/withAuth";
import useNavigator from "../../hooks/useNavigator";
import useFetch from "../../hooks/useFetch";
import utility from "../../utils/utility";
import serverAddress from '../../constants/serverAddress';
import Header from "../../components/common/Header";
import PageTitle from "../../components/common/PageTitle";
import VerticalPadding from "../../components/common/VerticlaPadding";
import PostCard from "../../components/post/PostCard";

import "../../styles/pages/post/posts.css";



const Posts = (props) => {
    const {userId} = props;

    const navigator = useNavigator();

    const {fetchResult: user, fetchData: fetchUser} = useFetch();
    const {fetchResult: posts, fetchData: fetchPosts} = useFetch();

    const [userProfileImage, setUserProfileImage] = useState();
    const [postCards, setPostCards] = useState([]);
    const [topPostCards, setTopPostCards] = useState([]);



    useEffect(() => {
        if (userId == null) {
            return;
        }

        console.log(`인증 유저 아이디: ${userId}`);

        getUserProfileImageById();
        getPosts();

    }, [userId]);

    useEffect(() => {
        if (user == null) {
            return;
        }
  
        setUserProfileImage(user.image);

    }, [user])



    useEffect(() => {
        if (posts == null) {
            return;
        }

        setPostCards([]);
        setTopPostCards([]);
        let topPosts = [];

        posts.forEach(async(post) => {    
            const postData = {
                id: post.id,
                title: post.title,
                likes: utility.makeShortNumber(post.like_count),
                comments: utility.makeShortNumber(post.comment_count),
                hits: utility.makeShortNumber(post.view_count),
                time: post.created_at,
            }

            await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${post.user_id}}`)
                .then(userData => userData.json())
                .then(userJson => {
                        postData.image = userJson.result.image;    
                        postData.nickname = userJson.result.nickname;
                    })

            if (topPosts.length < 3) {
                topPosts.push(postData);
            } else {
                topPosts = topPosts.sort((a, b) => b.hits - a.hits).slice(0, 3);
            }
                    
            setPostCards(prevPostCards => [...prevPostCards, postData]); 
        });



        setTopPostCards(topPosts);
    }, [posts])


    const getUserProfileImageById = async () => {
        await fetchUser(`${serverAddress.BACKEND_IP_PORT}/users/${userId}`, {method: 'GET'})
    }

    const getPosts = async () => {
        await fetchPosts(`${serverAddress.BACKEND_IP_PORT}/posts`,  {method: 'GET'});               
    }


    return (
        <>
            <Header 
                backBtnVisibility="hidden" 
                profileImageVisibility="visible"
                userId={userId}
                userProfileImage={userProfileImage}>
            </Header>
            
            <div id="welcome-text-box">
                <div id="posts-welcome-text">환영합니다,<br/>
                    ODOP <strong>커뮤니티</strong> 입니다.
                </div>

                <div id="noti-box">
                    <div id="noti-text">
                        📢 공지사항
                    </div>
                </div>
            </div>





            <div id="posts-box">
        
        
                <div id="left-post-box">
                    <div id="left-post-box-bar">
                        <button id="add-btn" onClick={navigator.navigateToAddPost}>게시글 작성</button>
                    </div>

                    <div id="left-post-box-content"> 
                        {postCards.map(postData => (
                            <PostCard  
                                data={postData}>
                            </PostCard>
                        ))}
                    </div>
                </div>



                <div id="right-post-box">
                    <div id="right-post-box-bar">
                        <div id="right-post-box-bar-title">🔥 인기 게시글 🔥</div>
                    </div>
                    <div id="right-post-box-content">
                        {topPostCards.map(postData => (
                            <PostCard  
                                data={postData}>
                            </PostCard>
                        ))}

                    </div>
                </div>
            </div>

            
        </>
    );
  }
  
  export default withAuth(Posts);