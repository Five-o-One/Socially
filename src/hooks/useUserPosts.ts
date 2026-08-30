/** @file Query that loads posts authored by a user. */
import { useQuery } from "@tanstack/react-query";
import { GetUserPosts } from "@/api";

/**
 * @hook useUserPosts
 * @description Loads posts authored by a user.
 * @param {string} userId - User ID
 * @returns User-posts query result
 */
export function useUserPosts(userId: string) {
  return useQuery({
    queryKey: ["user-posts", userId],

    queryFn: async () => {
      const response = await GetUserPosts(userId);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },

    enabled: Boolean(userId),
    retry: false,
  });
}
