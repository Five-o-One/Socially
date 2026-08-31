/** @file Profile query that selects an ID or username lookup. */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUserById, GetUserByUsername, GetFollowers } from "@/api";
import { assertApiSuccess } from "@/lib/error";
import type { User } from "@/types";
import type { UseUserProfileOptions } from "@/types";

/**
 * @hook useUserProfile
 * @description Loads a user profile by ID or username and derives
 * the current user's follow relationship from the target user's
 * followers list.
 */
export function useUserProfile({ id, username }: UseUserProfileOptions) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["user-profile", id, username],

    queryFn: async () => {
      const response = id
        ? await GetUserById(id)
        : await GetUserByUsername(username!);

      assertApiSuccess(response.data, "Failed to fetch user profile");

      const user = response.data.data;

      /*
       * The profile endpoint currently does not return isFollowing,
       * so we derive it from the target user's followers.
       */
      const session = queryClient.getQueryData<{
        user?: User;
      }>(["session"]);

      const currentUserId = session?.user?.id;

      /*
       * No relationship needs to be calculated when:
       * - the user is not authenticated
       * - the profile belongs to the current user
       */
      if (!currentUserId || currentUserId === user.id) {
        return user;
      }

      const followersResponse = await GetFollowers(user.id);

      assertApiSuccess(followersResponse.data, "Failed to fetch followers");

      const followers = followersResponse.data.data ?? [];

      const isFollowing = followers.some((item: unknown) => {
        const record = item as Record<string, unknown>;

        /*
         * Primary API shape:
         *
         * {
         *   followerId: "current-user-id"
         * }
         */
        if (typeof record.followerId === "string") {
          return record.followerId === currentUserId;
        }

        /*
         * Support APIs that return:
         *
         * {
         *   follower: {
         *     id: "current-user-id"
         *   }
         * }
         */
        if (record.follower && typeof record.follower === "object") {
          const follower = record.follower as Record<string, unknown>;

          return follower.id === currentUserId;
        }

        /*
         * Support APIs that return:
         *
         * {
         *   user: {
         *     id: "current-user-id"
         *   }
         * }
         */
        if (record.user && typeof record.user === "object") {
          const follower = record.user as Record<string, unknown>;

          return follower.id === currentUserId;
        }

        /*
         * Fallback for a direct User object.
         */
        return record.id === currentUserId;
      });

      return {
        ...user,
        isFollowing,
      };
    },

    enabled: Boolean(id || username),
    retry: false,
    refetchOnMount: "always",
  });
}
