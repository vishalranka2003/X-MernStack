import { Flex, Image, useColorMode } from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
    <Flex justifyContent={"Center"} mt={6} mb={12}>
      <Image
        src={colorMode === "dark" ? "/light-logo.svg" : "dark-logo.svg"}
        onClick={toggleColorMode}
        w={6}
      />
    </Flex>
    </>
  );
};

export default Header;
