import { useQuery } from "@tanstack/react-query";
import { GetUserById, GetUserByUsername } from "@/api";

interface UseUserProfileOptions {
  id?: string;
  username?: string;
}

export function useUserProfile({ id, username }: UseUserProfileOptions) {
  return useQuery({
    queryKey: ["user-profile", id, username],

    queryFn: async () => {
      console.log("🔥 GETTING USER PROFILE:", { id, username });

      const response = id
        ? await GetUserById(id)
        : await GetUserByUsername(username!);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },

    enabled: Boolean(id || username),
    retry: false,
  });
}
