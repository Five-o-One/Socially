import { useSession } from "./useSession";

export function useCurrentUser() {
  const session = useSession();

  return {
    data: session.data?.user ?? null,

    isLoading: session.isLoading,

    isAuthenticated: Boolean(session.data?.user),

    isError: session.isError,
    error: session.error,

    session,
  };
}
