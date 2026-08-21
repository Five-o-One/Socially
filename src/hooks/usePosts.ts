import { useQuery } from "@tanstack/react-query";
import { GetAllPosts } from "@/api";

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
