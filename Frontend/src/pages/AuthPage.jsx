import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import authScreenAtom from "../atoms/authAtom";
import { useSetRecoilState, useRecoilValue } from "recoil";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  console.log(authScreenState);
  useSetRecoilState(authScreenAtom);
  return <>{authScreenState === "login" ? <LogIn /> : <SignUp />}</>;
};

export default AuthPage;
