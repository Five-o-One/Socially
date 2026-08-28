/** @file Follow/unfollow mutation with optimistic profile and recommendation updates. */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToggleFollow } from "@/api";
import type { User } from "@/types";
import { useAppStore } from "@/store";
import toast from "react-hot-toast";

/** Previous relationship state retained for optimistic follow rollback. */
interface FollowMutationContext {
  previousRecommendedUsers?: User[];
  previousProfiles: Array<[readonly unknown[], User | undefined]>;
  previousCurrentUser?: User;
}

/**
 * @hook useToggleFollow
 * @description Follows or unfollows a user and refreshes relationship data.
 * @returns Follow mutation result
 */
export function useToggleFollow() {
  const queryClient = useQueryClient();

  const followUser = useAppStore((state) => state.followUser);
  const unfollowUser = useAppStore((state) => state.unfollowUser);
  const isFollowingUser = useAppStore((state) => state.isFollowingUser);

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await ToggleFollow(userId);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

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

      const targetRecommendedUser = previousRecommendedUsers?.find(
        (user) => user.id === userId,
      );

      const targetProfile = previousProfiles
        .map(([, profile]) => profile)
        .find((profile) => profile?.id === userId);

      const currentFollowing =
        targetProfile?.isFollowing ??
        targetRecommendedUser?.isFollowing ??
        isFollowingUser(userId);

      const nextFollowing = !currentFollowing;

      /*
       * Optimistically update the target user's profile.
       *
       * The target profile represents the person being followed/unfollowed,
       * so only their followers count changes.
       */
      for (const [queryKey, profile] of previousProfiles) {
        if (!profile || profile.id !== userId) continue;

        const followers =
          profile._count?.followers ?? profile.count?.followers ?? 0;

        const nextFollowers = Math.max(0, followers + (nextFollowing ? 1 : -1));

        queryClient.setQueryData<User>(queryKey, {
          ...profile,
          isFollowing: nextFollowing,
          _count: {
            ...profile._count,
            followers: nextFollowers,
          },
          count: {
            ...profile.count,
            followers: nextFollowers,
          },
        });
      }

      /*
       * Optimistically update the current user's profile.
       *
       * When we are viewing our own profile, this is the cache used by
       * useUserProfile, so the Following count changes immediately.
       */
      if (currentUserId) {
        const updateCurrentUserProfile = (
          profile: User | undefined,
        ): User | undefined => {
          if (!profile || profile.id !== currentUserId) {
            return profile;
          }

          const following =
            profile._count?.following ??
            profile._count?.followings ??
            profile.count?.following ??
            profile.count?.followings ??
            0;

          const nextFollowingCount = Math.max(
            0,
            following + (nextFollowing ? 1 : -1),
          );

          return {
            ...profile,
            _count: {
              ...profile._count,
              followers:
                profile._count?.followers ?? profile.count?.followers ?? 0,
              following: nextFollowingCount,
              followings: nextFollowingCount,
            },
            count: {
              ...profile.count,
              followers:
                profile.count?.followers ?? profile._count?.followers ?? 0,
              following: nextFollowingCount,
              followings: nextFollowingCount,
            },
          };
        };

        for (const [queryKey, profile] of previousProfiles) {
          queryClient.setQueryData<User>(queryKey, updateCurrentUserProfile);
        }
      }

      /*
       * Optimistically update recommendation list.
       */
      queryClient.setQueryData<User[]>(["recommended-users"], (users) => {
        if (!users) return users;

        return users.map((user) => {
          if (user.id !== userId) return user;

          const followers =
            user._count?.followers ?? user.count?.followers ?? 0;

          const nextFollowers = Math.max(
            0,
            followers + (nextFollowing ? 1 : -1),
          );

          return {
            ...user,
            isFollowing: nextFollowing,
            _count: {
              ...user._count,
              followers: nextFollowers,
            },
            count: {
              ...user.count,
              followers: nextFollowers,
            },
          };
        });
      });

      /*
       * Optimistically update the logged-in user's user cache.
       *
       * This is what the sidebar reads through useUserById().
       */
      if (currentUserId) {
        const updateCurrentUser = (user: User | undefined) => {
          if (!user) return user;

          const following =
            user._count?.following ??
            user._count?.followings ??
            user.count?.following ??
            user.count?.followings ??
            0;

          const nextFollowingCount = Math.max(
            0,
            following + (nextFollowing ? 1 : -1),
          );

          return {
            ...user,
            _count: {
              ...user._count,
              followers: user._count?.followers ?? user.count?.followers ?? 0,
              following: nextFollowingCount,
              followings: nextFollowingCount,
            },
            count: {
              ...user.count,
              followers: user.count?.followers ?? user._count?.followers ?? 0,
              following: nextFollowingCount,
              followings: nextFollowingCount,
            },
          };
        };

        queryClient.setQueryData<User>(
          ["user", currentUserId],
          updateCurrentUser,
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

      if (context.previousRecommendedUsers) {
        queryClient.setQueryData(
          ["recommended-users"],
          context.previousRecommendedUsers,
        );
      }

      for (const [queryKey, data] of context.previousProfiles) {
        queryClient.setQueryData(queryKey, data);
      }

      const session = queryClient.getQueryData<{
        user?: User;
      }>(["session"]);

      const currentUserId = session?.user?.id;

      if (currentUserId && context.previousCurrentUser) {
        queryClient.setQueryData(
          ["user", currentUserId],
          context.previousCurrentUser,
        );
      }

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update follow status",
      );
    },

    onSuccess: (data, userId) => {
      const isFollowing = data.data.isFollowing;

      toast.success(
        isFollowing
          ? "User followed successfully"
          : "User unfollowed successfully",
      );

      if (isFollowing) {
        followUser(userId);
      } else {
        unfollowUser(userId);
      }

      /*
       * Sync relationship state after the server confirms the mutation.
       */
      const profileQueries = queryClient.getQueriesData<User>({
        queryKey: ["user-profile"],
      });

      for (const [queryKey, profile] of profileQueries) {
        if (!profile) continue;

        /*
         * Target user's relationship state.
         */
        if (profile.id === userId) {
          queryClient.setQueryData<User>(queryKey, {
            ...profile,
            isFollowing,
          });
        }
      }

      queryClient.setQueryData<User[]>(["recommended-users"], (users) => {
        if (!users) return users;

        return users.map((user) =>
          user.id === userId
            ? {
                ...user,
                isFollowing,
              }
            : user,
        );
      });
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

      /*
       * Re-fetch all profile queries so the optimistic count is eventually
       * replaced by the authoritative server value.
       */
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
