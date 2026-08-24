/** @file Profile query that selects an ID or username lookup. */
import { useQuery } from "@tanstack/react-query";
import { GetUserById, GetUserByUsername } from "@/api";

/** Optional route identifiers used to locate a profile. */
interface UseUserProfileOptions {
  id?: string;
  username?: string;
}

/**
 * @hook useUserProfile
 * @description Loads a user profile by ID or username.
 * @param {UseUserProfileOptions} options - Optional profile route identifiers
 * @returns User profile query result
 */
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
