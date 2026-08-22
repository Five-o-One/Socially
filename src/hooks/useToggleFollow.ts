import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToggleFollow } from "@/api";
import type { User } from "@/types";

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

    onMutate: async (userId: string) => {
      await queryClient.cancelQueries({ queryKey: ["recommended-users"] });
      await queryClient.cancelQueries({ queryKey: ["user-profile", userId] });
      await queryClient.cancelQueries({ queryKey: ["user", userId] });

      const previousUsers = queryClient.getQueryData<User[]>([
        "recommended-users",
      ]);
      const previousProfile = queryClient.getQueryData<User>([
        "user-profile",
        userId,
      ]);

      queryClient.setQueryData<User[]>(["recommended-users"], (users) => {
        if (!users) return users;

        return users.map((user) => {
          if (user.id !== userId) return user;

          const currentlyFollowing = user.isFollowing ?? false;
          const currentFollowers =
            user.count?.followers ?? user._count?.followers ?? 0;

          return {
            ...user,
            isFollowing: !currentlyFollowing,
            count: user.count
              ? {
                  ...user.count,
                  followers: currentFollowers + (currentlyFollowing ? -1 : 1),
                }
              : undefined,
          };
        });
      });

      queryClient.setQueryData<User>(["user-profile", userId], (user) => {
        if (!user) return user;

        const currentlyFollowing = user.isFollowing ?? false;
        const currentFollowers =
          user._count?.followers ?? user.count?.followers ?? 0;

        return {
          ...user,
          isFollowing: !currentlyFollowing,
          _count: user._count
            ? {
                ...user._count,
                followers: currentFollowers + (currentlyFollowing ? -1 : 1),
              }
            : undefined,
          count: user.count
            ? {
                ...user.count,
                followers: currentFollowers + (currentlyFollowing ? -1 : 1),
              }
            : undefined,
        };
      });

      return { previousUsers, previousProfile };
    },

    onError: (_error, userId, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["recommended-users"], context.previousUsers);
      }
      if (context?.previousProfile) {
        queryClient.setQueryData(
          ["user-profile", userId],
          context.previousProfile,
        );
      }
    },

    onSettled: (_data, _error, userId) => {
      queryClient.invalidateQueries({ queryKey: ["recommended-users"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
}
