import { atom } from "recoil";

const authScreenAtom = atom({
  key: "authScreenAtom", // unique ID (with respect to other atoms/selectors)
  default: "login", // default value (aka initial value)
});
export default authScreenAtom;
