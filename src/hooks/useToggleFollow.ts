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

    onMutate: async (userId) => {
      await queryClient.cancelQueries({
        queryKey: ["recommended-users"],
      });

      const previousUsers = queryClient.getQueryData<User[]>([
        "recommended-users",
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
            count: {
              ...user.count,
              followers: currentFollowers + (currentlyFollowing ? -1 : 1),
            },
          };
        });
      });

      return { previousUsers };
    },

    onError: (_error, _userId, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["recommended-users"], context.previousUsers);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["session"],
      });
    },
  });
}
