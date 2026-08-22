import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToggleFollow } from "@/api";
import type { User } from "@/types";

interface FollowMutationContext {
  previousRecommendedUsers?: User[];
  previousProfiles: Array<[readonly unknown[], User | undefined]>;
  previousCurrentUser?: User;
}

export function useToggleFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await ToggleFollow(userId);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
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

      const targetFromRecommendations = previousRecommendedUsers?.find(
        (user) => user.id === userId,
      );

      const targetProfile = queryClient.getQueryData<User>([
        "user-profile",
        userId,
      ]);

      const currentFollowing =
        targetProfile?.isFollowing ??
        targetFromRecommendations?.isFollowing ??
        false;

      const nextFollowing = !currentFollowing;

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

      queryClient.setQueryData<User>(["user-profile", userId], (profile) => {
        if (!profile) return profile;

        const followers =
          profile._count?.followers ?? profile.count?.followers ?? 0;

        const nextFollowers = Math.max(0, followers + (nextFollowing ? 1 : -1));

        return {
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
        };
      });

      if (currentUserId) {
        const updateCurrentUser = (profile: User | undefined) => {
          if (!profile) return profile;

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
              following: nextFollowingCount,
              followings: nextFollowingCount,
            },
            count: {
              ...profile.count,
              following: nextFollowingCount,
              followings: nextFollowingCount,
            },
          };
        };

        queryClient.setQueryData<User>(
          ["user-profile", currentUserId],
          updateCurrentUser,
        );

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

    onSettled: (_data, _error, userId) => {
      queryClient.invalidateQueries({
        queryKey: ["recommended-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-profile", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["session"],
      });
    },
  });
}
