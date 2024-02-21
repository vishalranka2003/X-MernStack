import { Flex, Image, useColorMode, Link } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import userAtom from "../atoms/userAtom";
import { useEffect } from "react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    console.log(user);
  });

  return (
    <>
      <Flex justifyContent="space-between" mt={6} mb={12}>
        {user && (
          <Link href="/">
            <AiFillHome size={24} />
          </Link>
        )}
        <Image
          src={colorMode === "dark" ? "/light-logo.svg" : "dark-logo.svg"}
          onClick={toggleColorMode}
          w={6}
        />
        {user && (
          <Link href={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
        )}
      </Flex>
    </>
  );
};

export default Header;
