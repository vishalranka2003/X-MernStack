import { Flex, Avatar, Text } from "@chakra-ui/react";
import Actions from "./Actions";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
const Comment = ({ username, comment, avatar, likes, createdBefore }) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex
        my={2}
        py={2}
        width={"full"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}>
        <Flex gap={3}>
          <Avatar name="markZuckerberg" src={avatar} size={"sm"} />
          <Flex direction={"column"} gap={1}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {username}
            </Text>
            <Text fontSize={"sm"} color={"gray.light"}>
              {comment}
            </Text>
            <Actions liked={liked} setLiked={setLiked}></Actions>
            <Text color={"gray.light"} fontSize={"sm"}>
              {likes + (liked ? 1 : 0)} likes
            </Text>
          </Flex>
        </Flex>
        <Flex gap={3} alignItems={"center"}>
          <Text color={"gray.light"} fontSize={"sm"}>
            {createdBefore} d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
    </>
  );
};

export default Comment;
