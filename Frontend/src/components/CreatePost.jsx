import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Textarea,
  Input,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useColorModeValue, useDisclosure } from "@chakra-ui/react";
import usePreviewImg from "../hooks/usePreviewImg";
import { useRef } from "react";
import { BsFileImageFill } from "react-icons/bs";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { postText, setPostText } = useState("");
  const { handleImageChange, imgUrl } = usePreviewImg();
  const imageRef = useRef(null);

  const handleTextChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.3000", "gray.dark")}
        onClick={onOpen}>
        Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here...."
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                pt={2}
                fontSize={"xs"}
                fontWeight={"bold"}
                textAlign={"right"}
                color={"gray"}>
                500/500
              </Text>
              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />
              <BsFileImageFill
                style={{
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  imageRef.current.click();
                }}
                size={16}
                width={16}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
