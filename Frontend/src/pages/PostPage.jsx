import {
  Flex,
  Avatar,
  Text,
  Image,
  Box,
  Divider,
  Button,
} from "@chakra-ui/react";
import Actions from "../components/Actions";
import Comment from "../components/Comment";
import { useState } from "react";

import { BsThreeDots } from "react-icons/bs";

const PostPage = ({ postImg, replies, likes }) => {
  const [liked, setLiked] = useState(false);

  postImg = "/post1.png";
  return (
    <>
      <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
        <Flex alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png"></Avatar>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            Mark Zuckerberg
          </Text>
          <Image src={"/verified.png"} w={4} h={4} ml={2} />
        </Flex>
        <Flex alignItems={"center"} gap={3}>
          <Text color={"gray.light"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text fontSize={"sm"} my={4}>
        This is my first post
      </Text>
      {postImg && (
        <Box
          borderRadius={"6"}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"gray.light"}>
          <Image src={"/post1.png"}></Image>
        </Box>
      )}
      <Flex gap={3} mt={2} mb={1}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={"2"} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          134 replies
        </Text>
        <Box w={"1"} h={"1"} borderRadius={"50%"} background={"gray.light"} />
        <Text color={"gray.light"} fontSize={"sm"}>
          {123 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>

      <Divider my={4}></Divider>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"md"}>
          👏 Get the app to like, reply and post
        </Text>

        <Button>Get</Button>
      </Flex>
      <Divider my={4}></Divider>
      <Comment
        username={"shubham"}
        comment={"Dope work "}
        likes={1145}
        avatar={"https://bit.ly/ryan-florence"}
        createdBefore={1}
      />
      <Comment
        username={"gray"}
        comment={"Amazing ! "}
        likes={123}
        avatar={"https://bit.ly/code-beast"}
        createdBefore={2}
      />
      <Comment
        username={"vishal"}
        comment={"Keep up the good works"}
        likes={765}
        avatar={"https://bit.ly/sage-adebayo"}
        createdBefore={3}
      />
    </>
  );
};

export default PostPage;
