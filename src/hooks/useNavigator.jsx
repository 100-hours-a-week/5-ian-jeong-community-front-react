import { useNavigate } from 'react-router-dom';

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