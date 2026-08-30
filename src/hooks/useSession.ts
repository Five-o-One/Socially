/** @file Current-session query and its cache lifetime configuration. */
import { useQuery } from "@tanstack/react-query";
import { GetSession } from "@/api";
import { assertApiSuccess } from "@/lib/error";

/**
 * @hook useSession
 * @description Queries the current authenticated session.
 * @returns Session query result
 */
export function useSession() {
  return useQuery({
    queryKey: ["session"],

    queryFn: async () => {
      const response = await GetSession();

      assertApiSuccess(response.data, "Failed to fetch session");

      return response.data.data;
    },

    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
