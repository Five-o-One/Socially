/** @file User search query hook. */
import { useQuery } from "@tanstack/react-query";
import { SearchUsers } from "@/api";
import { assertApiSuccess } from "@/lib/error";

/**
 * @hook useUserSearch
 * @description Searches users by a query string.
 */
export function useUserSearch(query: string) {
  return useQuery({
    queryKey: ["user-search", query],

    queryFn: async () => {
      const response = await SearchUsers(query);

      assertApiSuccess(response.data, "Failed to search users");

      return response.data.data;
    },

    enabled: Boolean(query),
    retry: false,
  });
}
