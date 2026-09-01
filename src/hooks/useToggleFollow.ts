/** @file Follow/unfollow mutation with optimistic profile and recommendation updates. */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToggleFollow } from "@/api";
import type { User } from "@/types";
import type { FollowMutationContext } from "@/types";
import toast from "react-hot-toast";
import { assertApiSuccess, getErrorMessage } from "@/lib/error";

/**
 * @hook useToggleFollow
 * @description Follows or unfollows a user with optimistic UI updates.
 */
export function useToggleFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await ToggleFollow(userId);

      assertApiSuccess(response.data, "Failed to update follow status");

      return response.data;
    },

    onMutate: async (userId): Promise<FollowMutationContext> => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: ["recommended-users"],
        }),
        queryClient.cancelQueries({
          queryKey: ["user-profile"],
        }),
        queryClient.cancelQueries({
          queryKey: ["user"],
        }),
        queryClient.cancelQueries({
          queryKey: ["followers"],
        }),
        queryClient.cancelQueries({
          queryKey: ["followings"],
        }),
      ]);

      const previousRecommendedUsers = queryClient.getQueryData<User[]>([
        "recommended-users",
      ]);

      const previousProfiles = queryClient.getQueriesData<User>({
        queryKey: ["user-profile"],
      });

      const session = queryClient.getQueryData<{
        user?: User;
      }>(["session"]);

      const currentUserId = session?.user?.id;

      const previousCurrentUser = currentUserId
        ? queryClient.getQueryData<User>(["user", currentUserId])
        : undefined;

      const targetProfile = previousProfiles
        .map(([, profile]) => profile)
        .find((profile) => profile?.id === userId);

      const targetRecommendedUser = previousRecommendedUsers?.find(
        (user) => user.id === userId,
      );

      const currentFollowing =
        targetProfile?.isFollowing ??
        targetRecommendedUser?.isFollowing ??
        false;

      const nextFollowing = !currentFollowing;

      /*
       * Optimistically update the target user's profile.
       */
      for (const [queryKey, profile] of previousProfiles) {
        if (!profile || profile.id !== userId) continue;

        queryClient.setQueryData<User>(queryKey, {
          ...profile,
          isFollowing: nextFollowing,
        });
      }

      /*
       * Optimistically update recommendations.
       */
      queryClient.setQueryData<User[]>(["recommended-users"], (users) =>
        users?.map((user) =>
          user.id === userId
            ? {
                ...user,
                isFollowing: nextFollowing,
              }
            : user,
        ),
      );

      /*
       * Optimistically update the current user's following count.
       */
      if (currentUserId) {
        queryClient.setQueryData<User>(
          ["user", currentUserId],
          (user): User | undefined => {
            if (!user) return user;

            const currentFollowingCount =
              user._count?.following ??
              user._count?.followings ??
              user.count?.following ??
              user.count?.followings ??
              0;

            const nextFollowingCount = Math.max(
              0,
              currentFollowingCount + (nextFollowing ? 1 : -1),
            );

            const followers =
              user._count?.followers ?? user.count?.followers ?? 0;

            const posts = user._count?.posts ?? user.count?.posts;

            return {
              ...user,

              _count: {
                followers,
                following: nextFollowingCount,
                followings: nextFollowingCount,
                ...(posts !== undefined ? { posts } : {}),
              },

              count: {
                followers,
                following: nextFollowingCount,
                followings: nextFollowingCount,
                ...(posts !== undefined ? { posts } : {}),
              },
            };
          },
        );
      }

      return {
        previousRecommendedUsers,
        previousProfiles,
        previousCurrentUser,
      };
    },

    onError: (error, _userId, context) => {
      if (!context) return;

      /*
       * Roll back recommendations.
       */
      if (context.previousRecommendedUsers) {
        queryClient.setQueryData(
          ["recommended-users"],
          context.previousRecommendedUsers,
        );
      }

      /*
       * Roll back profile caches.
       */
      for (const [queryKey, profile] of context.previousProfiles) {
        queryClient.setQueryData(queryKey, profile);
      }

      /*
       * Roll back current user cache.
       */
      if (context.previousCurrentUser) {
        queryClient.setQueryData(
          ["user", context.previousCurrentUser.id],
          context.previousCurrentUser,
        );
      }

      toast.error(getErrorMessage(error, "Failed to update follow status"));
    },

    onSuccess: (_response, userId) => {
      /*
       * The backend currently returns only:
       *
       * {
       *   success: true,
       *   message: "User followed successfully"
       * }
       *
       * Therefore we keep the optimistic isFollowing state instead of
       * reading response.data.isFollowing.
       */
      const profileQueries = queryClient.getQueriesData<User>({
        queryKey: ["user-profile"],
      });

      let isFollowing: boolean | undefined;

      for (const [queryKey, profile] of profileQueries) {
        if (!profile || profile.id !== userId) continue;

        isFollowing = profile.isFollowing;

        queryClient.setQueryData<User>(queryKey, {
          ...profile,
          isFollowing,
        });
      }

      /*
       * Keep recommendation state synchronized.
       */
      if (isFollowing !== undefined) {
        queryClient.setQueryData<User[]>(["recommended-users"], (users) =>
          users?.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  isFollowing,
                }
              : user,
          ),
        );

        toast.success(
          isFollowing
            ? "User followed successfully"
            : "User unfollowed successfully",
        );
      }
    },

    onSettled: (_data, _error, userId) => {
      queryClient.invalidateQueries({
        queryKey: ["recommended-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["session"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["followers"],
      });

      queryClient.invalidateQueries({
        queryKey: ["followings"],
      });
    },
  });
}
