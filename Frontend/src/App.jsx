import { Container } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/Userpage";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import LogOutButton from "./components/LogOutButton";

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW={"600px"}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
      {user && <LogOutButton />}
    </Container>
  );
}

export default App;
