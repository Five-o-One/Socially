/** @file Recommended-user query used by the authenticated sidebar. */
import { useQuery } from "@tanstack/react-query";
import { GetRecommendedUsers } from "@/api";
import { assertApiSuccess } from "@/lib/error";

/**
 * @hook useRecommendedUsers
 * @description Loads suggested users for the sidebar.
 * @param {boolean} [enabled=true] - Enables or disables the query
 * @returns Recommended-users query result
 */
export function useRecommendedUsers(enabled = true) {
  return useQuery({
    queryKey: ["recommended-users"],

    queryFn: async () => {
      const response = await GetRecommendedUsers();

      assertApiSuccess(response.data, "Failed to fetch recommended users");

      return response.data.data;
    },

    enabled,

    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
