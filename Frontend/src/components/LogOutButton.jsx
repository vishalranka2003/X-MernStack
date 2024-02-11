import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { HiLogout } from "react-icons/hi";

const LogOutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("user-threads");
      setUser(null);
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        showToast("LiError", data.error, "error");
      }
    } catch (err) {
      showToast("Error", err, "error");
    }
  };
  return (
    <Button
      position={"fixed"}
      right={"30px"}
      top={"30px"}
      size={"sm"}
      onClick={handleLogout}>
      <HiLogout />
    </Button>
  );
};

export default LogOutButton;
