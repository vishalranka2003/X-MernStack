import { Box, Avatar, Text, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { useState } from "react";

const UserPost = ({ likes, replies, postTitle, postImg }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={"/vishal/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name="Vishal Ranka" src="/zuck-avatar.png"></Avatar>
          <Box w="1px" h={"full"} bg="gray.light" my={"2"}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="John Doe"
              src="https://bit.ly/code-beast"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="John Doe"
              src="https://bit.ly/code-beast"
              position={"absolute"}
              bottom={"0px"}
              right="-5px"
              padding={"2px"}
            />{" "}
            <Avatar
              size={"xs"}
              name="John Doe"
              src="https://bit.ly/code-beast"
              position={"absolute"}
              bottom={"0px"}
              left={"0px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w="full">
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                vishal
              </Text>
              <Image src={"/verified.png"} w="4" h="4" ml={"1"}></Image>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                1d
              </Text>
              <bsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{postTitle}</Text>
          {postImg && (
            <Box
              borderRadius={"6"}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}>
              <Image src={postImg}></Image>
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={"2"} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {replies} replies
            </Text>
            <Box
              w={"1"}
              h={"1"}
              borderRadius={"50%"}
              background={"gray.light"}
            />
            <Text color={"gray.light"} fontSize={"sm"}>
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
