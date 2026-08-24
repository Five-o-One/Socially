import { useQuery } from "@tanstack/react-query";
import { GetAllPosts } from "@/api";

/**
 * @hook usePosts
 * @description Queries the complete post feed and exposes TanStack Query state.
 * @returns Query result containing posts, loading state, and errors
 */
export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await GetAllPosts();

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    retry: false,
  });
}
