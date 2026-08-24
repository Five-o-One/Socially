import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToggleFollow } from "@/api";
import type { User } from "@/types";
import { useAppStore } from "@/store";

interface FollowMutationContext {
  previousRecommendedUsers?: User[];
  previousProfiles: Array<[readonly unknown[], User | undefined]>;
  previousCurrentUser?: User;
}

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
       * Optimistically update the logged-in user's following count
       * exactly once.
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

    onError: (_error, _userId, context) => {
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
    },

    onSuccess: (data, userId) => {
      const isFollowing = data.message === "User followed successfully";

      if (isFollowing) {
        followUser(userId);
      } else {
        unfollowUser(userId);
      }

      const profileQueries = queryClient.getQueriesData<User>({
        queryKey: ["user-profile"],
      });

      for (const [queryKey, profile] of profileQueries) {
        if (!profile || profile.id !== userId) continue;

        queryClient.setQueryData<User>(queryKey, {
          ...profile,
          isFollowing,
        });
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
      /*
       * Do not invalidate user-profile here.
       *
       * The GET /api/users/:id response does not contain
       * isFollowing, so refetching it would overwrite our
       * local isFollowing state with undefined.
       */

      queryClient.invalidateQueries({
        queryKey: ["recommended-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["session"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });
    },
  });
}
