/** @file User search query hook. */
import { useQuery } from "@tanstack/react-query";
import { SearchUsers } from "@/api";

/**
 * @hook useUserSearch
 * @description Searches users by a query string.
 */
export function useUserSearch(query: string) {
  return useQuery({
    queryKey: ["user-search", query],

    queryFn: async () => {
      const response = await SearchUsers(query);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },

    enabled: Boolean(query),
    retry: false,
  });
}
