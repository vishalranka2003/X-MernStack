import {
  VStack,
  Box,
  Flex,
  Text,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  useToast,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import React, { useState } from "react";
import {  useRecoilValue } from "recoil";

import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserHeader = ({ user }) => {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );
  const [updating, setUpdating] = useState(false);

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      if (following) {
        showToast("Success", "Unfollowed successfully", "success");
        user.followers.pop();
      } else {
        showToast("Success", "Followed successfully", "success");
        user.followers.push(currentUser._id);
      }
      setFollowing(!following);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toastIdRef.current = toast({
        duration: "3000",
        description: "URL copied to clipboard",
        position: "top-right",
        status: "success",
      });
    });
  };
  return (
    <>
      <VStack gap={4} alignItems={"start"}>
        <Flex w={"full"} justifyContent={"space-between"}>
          <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {user.name}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"}>{user.username}</Text>
              <Text
                fontSize={"xs"}
                bg={"gray.dark"}
                color={"gray.light"}
                p={1}
                borderRadius={"full"}>
                threads.net
              </Text>
            </Flex>
          </Box>
          <Box>
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{
                base: "md",
                md: "xl",
              }}></Avatar>
          </Box>
        </Flex>
        <Text>{user.bio}</Text>

        {currentUser?._id === user._id && (
          <Link as={RouterLink} to="/update">
            <Button size={"sm"}>Update Profile</Button>
          </Link>
        )}
        {currentUser?._id !== user._id && (
          <Button
            size={"sm"}
            onClick={handleFollowUnfollow}
            isLoading={updating}>
            {following ? "Unfollow" : "Follow"}
          </Button>
        )}
        <Flex w={"full"} justifyContent={"space-between"}>
          <Flex alignItems={"center"} gap={2}>
            <Text color={"gray.light"}>{user.followers.length} followers</Text>
            <Text color={"gray.light"}>{user.following.length} following</Text>
            <Box borderRadius={"50%"} w="1" h="1" bg={"gray.light"}></Box>
            <Link src href="https://instagram.com/mzuck" color={"gray.light"}>
              instagram.com
            </Link>
          </Flex>
          <Flex>
            <Box className="icon-container">
              <BsInstagram size={24} cursor={"pointer"} />
            </Box>
            <Box className="icon-container">
              <Menu>
                <MenuButton>
                  <CgMoreO size={24} cursor={"pointer"} />
                </MenuButton>
                <Portal>
                  <MenuList bg={"gray.dark"}>
                    {/* MenuItems are not rendered unless Menu is open */}
                    <MenuItem bg={"gray.dark"} onClick={copyURL}>
                      Copy Link
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>
        </Flex>
        <Flex w={"full"} justifyContent={"space-around"}>
          <Flex
            flex={1}
            justifyContent={"center"}
            borderBottom={"2px solid white"}
            pb="3">
            Threads
          </Flex>
          <Flex
            flex={1}
            justifyContent={"center"}
            borderBottom={"2px solid #616161"}
            color={"gray.light"}
            pb="3">
            Replies
          </Flex>
        </Flex>
      </VStack>
    </>
  );
};

export default UserHeader;
