import { useQuery } from "@tanstack/react-query";
import { GetUserLikedPosts } from "@/api";

export function useUserLikedPosts(userId: string) {
  return useQuery({
    queryKey: ["user-liked-posts", userId],
    queryFn: async () => {
      const response = await GetUserLikedPosts(userId);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    enabled: Boolean(userId),
    retry: false,
  });
}
