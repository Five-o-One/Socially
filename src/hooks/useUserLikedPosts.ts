/** @file Query that loads and unwraps posts liked by a user. */
import { useQuery } from "@tanstack/react-query";
import { GetUserLikedPosts } from "@/api";
import { assertApiSuccess } from "@/lib/error";

/**
 * @hook useUserLikedPosts
 * @description Loads posts liked by a user.
 * @param {string} userId - User ID
 * @returns Liked-posts query result
 */
export function useUserLikedPosts(userId: string) {
  return useQuery({
    queryKey: ["user-liked-posts", userId],

    queryFn: async () => {
      const response = await GetUserLikedPosts(userId);

      assertApiSuccess(response.data, "Failed to fetch liked posts");

      return response.data.data
        .map((like) => like.post)
        .filter((post) => post != null);
    },

    enabled: Boolean(userId),
    retry: false,
  });
}
