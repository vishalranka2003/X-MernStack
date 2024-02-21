import {
  // Button,
  Flex,
  // useColorModeValue,
  // Link,
  Spinner,
} from "@chakra-ui/react";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

const HomePage = () => {
  const user = useRecoilValue(userAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      try {
        // Assuming userId is a parameter to be passed to the API
        const res = await fetch(`/api/posts/feed/${user._id}`);

        const data = await res.json();
        console.log(data);
        setPosts(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, [user, showToast]);

  return (
    <>
      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size="xl" />
        </Flex>
      )}
      {!loading && posts.length === 0 && (
        <Flex justifyContent={"center"}>
          <h1>Follow some users to get their posts</h1>
        </Flex>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
      <CreatePost />
    </>
  );
};

export default HomePage;
