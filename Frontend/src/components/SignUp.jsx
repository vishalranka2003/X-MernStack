import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const setAuthScreen = useSetRecoilState(authScreenAtom);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center">
        <Heading color="shreya.400">Signup</Heading>
        <Box w={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="shreya.100"
              boxShadow="md">
              <FormControl>
                <Flex gap={3}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="shreya.light" />
                    </InputLeftElement>
                    <Input type="text" placeholder="First Name" />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="shreya.light" />
                    </InputLeftElement>
                    <Input type="text" placeholder="Last Name" />
                  </InputGroup>
                </Flex>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="shreya.light" />
                  </InputLeftElement>
                  <Input type="email" placeholder="Email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaLock color="shreya.light" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                width="full">
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link
          color="shreya.light"
          href="#"
          onClick={() => setAuthScreen("login")}>
          Login
        </Link>
      </Box>
    </Flex>
  );
};

export default SignUp;
