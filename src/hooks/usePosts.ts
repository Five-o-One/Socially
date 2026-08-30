import { useQuery } from "@tanstack/react-query";
import { GetAllPosts } from "@/api";

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

      console.log("GET ALL POSTS RAW RESPONSE:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log("GET ALL POSTS DATA:", response.data.data);

      return response.data.data;
    },

    retry: false,
    staleTime: 0,
  });
}
