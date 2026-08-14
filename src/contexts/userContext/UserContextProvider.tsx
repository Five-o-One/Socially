import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { SetUserContext, UserContext, type UserState } from "./fixture";

type UserContextProviderProps = {
  user: UserState;
  children: ReactNode;
};

const UserContextProvider = ({ user, children }: UserContextProviderProps) => {
  const [userState, setUserState] = useState(user);

  const memoizedUser = useMemo(() => userState, [userState]);

  return (
    <SetUserContext value={setUserState}>
      <UserContext value={memoizedUser}>{children}</UserContext>
    </SetUserContext>
  );
};

export default UserContextProvider;
