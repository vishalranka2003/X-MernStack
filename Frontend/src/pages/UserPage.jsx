import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import CreatePost from "../components/CreatePost";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

const Userpage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  // console.log(username);
  const showToast = useShowToast();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
        console.log("Hi");
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getUser();
    console.log(user);
  }, [username, showToast]);
  if (!user) return null;

  return (
    <>
      <UserHeader user={user} />
      <CreatePost></CreatePost>
      <UserPost
        likes={"1200"}
        replies={"2000"}
        postTitle={"This is my post 1"}
        postImg={"/post1.png"}
      />
      <UserPost
        likes={"23"}
        replies={"23"}
        postTitle={"This is my post 2"}
        postImg={"/post2.png"}
      />
      <UserPost
        likes={"213"}
        replies={"2000"}
        postTitle={"This is my post 3"}
        postImg={"/post3.png"}
      />
      <UserPost
        likes={"1345"}
        replies={"205"}
        postTitle={"This is my post 4"}
      />
    </>
  );
};

export default Userpage;
