import { useQuery } from "@tanstack/react-query";
import { GetSession } from "@/api";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await GetSession();

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch session");
      }

      return response.data.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
