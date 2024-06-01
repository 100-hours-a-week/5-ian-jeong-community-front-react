import { useNavigate } from 'react-router-dom';

const useNavigator = () => {
    const navigate = useNavigate();
    
    const navigateToSignIn = () => {
        navigate("/users/sign-in");
    };
    
    const navigateToSignUp = () => {
        window.open('/users/sign-up', 'sign-up', "width=620,height=900,top=0,left=0");
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
        window.open(`/users/${userId}`, "계정 업데이트", "width=620,height=600,top=0,left=0");
    };
    
    const navigateToEditPassword = (userId) => {
        window.open(`/users/${userId}/password`, "비밀번호 수정", "width=620,height=600,top=0,left=0");
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