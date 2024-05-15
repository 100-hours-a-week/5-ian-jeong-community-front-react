import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/common/Welcome";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import EditUser from "./pages/user/EditUser";
import EditPassword from "./pages/user/EditPassword";
import Posts from "./pages/post/Posts";
import AddPost from "./pages/post/AddPost";
import PostDetail from "./pages/post/PostDetail";
import EditPost from "./pages/post/EditPost";



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/users/sign-in" element={<SignIn />} />
          <Route path="/users/sign-up" element={<SignUp />} />

          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/new" element={<AddPost />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/posts/:postId/edit" element={<EditPost />} />
          <Route path="/users/:userId" element={<EditUser />} />
          <Route path="/users/:userId/password" element={<EditPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
