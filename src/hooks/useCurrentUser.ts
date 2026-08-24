/** @file Derived current-user and authentication state from the session query. */
import { useSession } from "./useSession";

/**
 * @hook useCurrentUser
 * @description Selects the current user and authentication state from the session query.
 * @returns Current-user data and authentication status
 */
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
