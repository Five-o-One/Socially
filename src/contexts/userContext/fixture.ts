import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { User } from "../../components/modals/UserInfoModal";

export type UserState = User | null;

export const UserContext = createContext<UserState | undefined>(undefined);

export const SetUserContext = createContext<
  Dispatch<SetStateAction<UserState>> | undefined
>(undefined);
