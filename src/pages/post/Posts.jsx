import React, { useRef, useState, useEffect } from "react";

import useNavigator from "../../hooks/useNavigator";
import useFetch from "../../hooks/useFetch";
import utility from "../../utils/utility";
import serverAddress from '../../constants/serverAddress';
import Header from "../../components/common/Header";
import PageTitle from "../../components/common/PageTitle";
import VerticalPadding from "../../components/common/VerticlaPadding";
import PostCard from "../../components/post/PostCard";

import "../../styles/pages/post/posts.css";



const Posts = () => {
    const navigator = useNavigator();

    const {fetchResult: userId, fetchData: fetchUserId} = useFetch();
    const {fetchResult: user, fetchData: fetchUser} = useFetch();
    const {fetchResult: posts, fetchData: fetchPosts} = useFetch();

    const [userProfileImage, setUserProfileImage] = useState();
    const [postCards, setPostCards] = useState([]);

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
        getPosts();

    }, [userId]);

    useEffect(() => {
        if (user == null) {
            return;
        }
  
        setUserProfileImage(user.profileImage);

    }, [user])



    useEffect(() => {
        if (posts == null) {
            return;
        }

        setPostCards([]);

        posts.reverse().forEach(async(post) => {    
            const postData = {
                id: post.id,
                title: post.title,
                likes: utility.makeShortNumber(post.likes),
                comments: utility.makeShortNumber(post.comments),
                hits: utility.makeShortNumber(post.hits),
                time: post.time,
            }

            await fetch(`${serverAddress.BACKEND_IP_PORT}/users/${post.writer}}`)
                .then(userData => userData.json())
                .then(userJson => {
                        postData.profileImage = userJson.result.profileImage;    
                        postData.nickname = userJson.result.nickname;
                    })

            setPostCards(prevPostCards => [...prevPostCards, postData]); 
        });


    }, [posts])





    const getUserIdFromSession = async() => {
        await fetchUserId(`${serverAddress.BACKEND_IP_PORT}/users/session`, {credentials: 'include'});
    }

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
            <VerticalPadding marginTop={"3.7vh"}></VerticalPadding>
            <PageTitle flag={true}></PageTitle>

            <div id="add-btn-box">
                <button id="add-btn" onClick={navigator.navigateToAddPost}>게시글 작성</button>
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