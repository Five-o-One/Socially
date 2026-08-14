import { useContext } from "react";
import { SetUserContext, UserContext } from "./fixture";

export const useUserContext = () => {
  const userState = useContext(UserContext);

  if (userState === undefined) {
    throw new Error("useUserContext must be used withen a provider");
  }

  return userState;
};

export const useSetUserContext = () => {
  const setUserState = useContext(SetUserContext);

  if (setUserState === undefined) {
    throw new Error("useSetUserContext must be used withen a provider");
  }

  return setUserState;
};
