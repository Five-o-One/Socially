import { useQuery } from "@tanstack/react-query";
import { GetUserPosts } from "@/api";

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
