import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const Userpage = () => {
  return (
    <>
      <UserHeader />
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
