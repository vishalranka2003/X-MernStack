import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Link to={"/vishal"}>
      <Flex w={"full"} justifyContent={"center"}>
        <Button>Profile Page</Button>
      </Flex>
    </Link>
  );
};

export default HomePage;
