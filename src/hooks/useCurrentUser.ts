import { useSession } from "./useSession";

export function useCurrentUser() {
  const session = useSession();

  return {
    data: session.data?.user ?? null,
    isLoading: session.isLoading,
    isAuthenticated: !!session.data?.user,
    session,
  };
}
