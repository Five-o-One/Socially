import { useQuery } from "@tanstack/react-query";
import { GetSession } from "@/api";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await GetSession();
      return response.data.data;
    },
    retry: false,
  });
}
