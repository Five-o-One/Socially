import { useQuery } from "@tanstack/react-query";
import { GetRecommendedUsers } from "@/api";

export function useRecommendedUsers(enabled = true) {
  return useQuery({
    queryKey: ["recommended-users"],

    queryFn: async () => {
      const response = await GetRecommendedUsers();

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to fetch recommended users",
        );
      }

      return response.data.data;
    },

    enabled,

    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
