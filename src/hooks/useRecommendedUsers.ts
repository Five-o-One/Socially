import { useQuery } from "@tanstack/react-query";
import { GetRecommendedUsers } from "@/api";

export function useRecommendedUsers() {
  return useQuery({
    queryKey: ["recommended-users"],
    queryFn: async () => {
      const response = await GetRecommendedUsers();

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    retry: false,
  });
}
