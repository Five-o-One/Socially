import { useQuery } from "@tanstack/react-query";
import { GetUserById } from "@/api";

export function useUserById(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await GetUserById(id);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    enabled: Boolean(id),
    retry: false,
  });
}
