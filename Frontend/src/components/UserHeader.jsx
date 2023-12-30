import {
  VStack,
  Box,
  Flex,
  Text,
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  useToast,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import React from "react";

const UserHeader = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();

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
              MarkZuckerberg
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"}>markzuckerberg</Text>
              <Text
                fontSize={"xs"}
                bg={"shreya.dark"}
                color={"shreya.light"}
                p={1}
                borderRadius={"full"}>
                threads.net
              </Text>
            </Flex>
          </Box>
          <Box>
            <Avatar
              name="markZuckerberg"
              src={"/zuck-avatar.png"}
              size={{
                base: "md",
                md: "xl",
              }}></Avatar>
          </Box>
        </Flex>
        <Text>
          Co-founder, executive chairman and CEO of all Meta platforms
        </Text>
        <Flex w={"full"} justifyContent={"space-between"}>
          <Flex alignItems={"center"} gap={2}>
            <Text color={"shreya.light"}>3.2K followers</Text>
            <Box borderRadius={"50%"} w="1" h="1" bg={"shreya.light"}></Box>
            <Link src href="https://instagram.com/mzuck" color={"shreya.light"}>
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
                  <MenuList bg={"shreya.dark"}>
                    {/* MenuItems are not rendered unless Menu is open */}
                    <MenuItem bg={"shreya.dark"} onClick={copyURL}>
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
            color={"shreya.light"}
            pb="3">
            Replies
          </Flex>
        </Flex>
      </VStack>
    </>
  );
};

export default UserHeader;
