import { useQuery } from "@tanstack/react-query";
import { GetAllPosts } from "@/api";
import { assertApiSuccess } from "@/lib/error";

/**
 * @hook usePosts
 * @description Fetches all posts for the home feed.
 * @returns TanStack Query result containing posts, loading state, and errors.
 */
export function usePosts() {
  return useQuery({
    queryKey: ["posts"],

    queryFn: async () => {
      const response = await GetAllPosts();

      assertApiSuccess(response.data, "Failed to fetch posts");

      return response.data.data;
    },

    retry: false,
    staleTime: 0,
  });
}
