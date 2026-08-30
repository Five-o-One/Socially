import { useQuery } from "@tanstack/react-query";
import { SearchUsers } from "@/api";

export function useUserByEmail(email?: string) {
  return useQuery({
    queryKey: ["user-by-email", email],
    queryFn: async () => {
      const response = await SearchUsers(email!);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data.find((user) => user.email === email) ?? null;
    },
    enabled: Boolean(email),
    retry: false,
  });
}
