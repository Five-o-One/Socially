/** @file Profile update mutation with optimistic session and profile synchronization. */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProfile } from "@/api";
import type { UpdateProfileRequest, User } from "@/types";

/** Minimal cached session shape used during profile updates. */
interface SessionData {
  user?: User;
}

/**
 * @hook useUpdateProfile
 * @description Updates profile fields and refreshes the current-user cache.
 * @returns Profile update mutation result
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateProfileRequest;
    }) => {
      const response = await UpdateProfile(userId, data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },

    onMutate: async ({ userId, data }) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: ["user-profile", userId],
        }),
        queryClient.cancelQueries({
          queryKey: ["user", userId],
        }),
        queryClient.cancelQueries({
          queryKey: ["session"],
        }),
      ]);

      const previousProfile = queryClient.getQueryData<User>([
        "user-profile",
        userId,
      ]);

      const previousUser = queryClient.getQueryData<User>(["user", userId]);

      const previousSession = queryClient.getQueryData<SessionData>([
        "session",
      ]);

      const updateUser = (user: User | undefined): User | undefined => {
        if (!user) return user;

        return {
          ...user,
          ...data,
        };
      };

      queryClient.setQueryData<User>(
        ["user-profile", userId],
        updateUser(previousProfile),
      );

      queryClient.setQueryData<User>(
        ["user", userId],
        updateUser(previousUser),
      );

      queryClient.setQueryData<SessionData>(["session"], (session) => {
        if (!session?.user) return session;

        return {
          ...session,
          user: {
            ...session.user,
            ...data,
          },
        };
      });

      return {
        previousProfile,
        previousUser,
        previousSession,
      };
    },

    onError: (_error, { userId }, context) => {
      if (!context) return;

      queryClient.setQueryData(
        ["user-profile", userId],
        context.previousProfile,
      );

      queryClient.setQueryData(["user", userId], context.previousUser);

      queryClient.setQueryData(["session"], context.previousSession);
    },

    onSuccess: (updatedUser, { userId }) => {
      queryClient.setQueryData<User>(
        ["user-profile", userId],
        (currentUser) => {
          if (!currentUser) return updatedUser;

          return {
            ...currentUser,
            ...updatedUser,
          };
        },
      );

      queryClient.setQueryData<User>(["user", userId], (currentUser) => {
        if (!currentUser) return updatedUser;

        return {
          ...currentUser,
          ...updatedUser,
        };
      });

      queryClient.setQueryData<SessionData>(["session"], (session) => {
        if (!session?.user) return session;

        return {
          ...session,
          user: {
            ...session.user,
            ...updatedUser,
          },
        };
      });
    },
  });
}
