import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Posts from "./pages/Posts";
import AddPost from "./pages/AddPost";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import EditUser from "./pages/EditUser";
import EditPassword from "./pages/EditPassword";

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
