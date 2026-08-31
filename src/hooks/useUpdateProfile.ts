/** @file Profile update mutation with optimistic session and profile synchronization. */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProfile } from "@/api";
import type { CachedSession, UpdateProfileRequest, User } from "@/types";
import toast from "react-hot-toast";
import { assertApiSuccess, getErrorMessage } from "@/lib/error";

/** Minimal cached session shape used during profile updates. */
/**
 * @hook useUpdateProfile
 * @description Updates profile fields and synchronizes every relevant
 * user/profile cache so changes appear immediately across the application.
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

      assertApiSuccess(response.data, "Failed to update profile");

      return response.data.data;
    },

    onMutate: async ({ userId, data }) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: ["user-profile"],
        }),
        queryClient.cancelQueries({
          queryKey: ["user", userId],
        }),
        queryClient.cancelQueries({
          queryKey: ["session"],
        }),
      ]);

      /*
       * Keep the previous state of every profile query so the whole
       * optimistic update can be rolled back if the request fails.
       */
      const previousProfiles = queryClient.getQueriesData<User>({
        queryKey: ["user-profile"],
      });

      const previousUser = queryClient.getQueryData<User>(["user", userId]);

      const previousSession = queryClient.getQueryData<CachedSession>([
        "session",
      ]);

      const updateUser = (user: User | undefined): User | undefined => {
        if (!user || user.id !== userId) {
          return user;
        }

        return {
          ...user,
          ...data,
        };
      };

      /*
       * Optimistically update EVERY cached profile query belonging
       * to this user.
       *
       * This fixes the main issue:
       *
       * ["user-profile", id, username]
       *
       * is different from:
       *
       * ["user-profile", userId]
       */
      for (const [queryKey, profile] of previousProfiles) {
        if (!profile || profile.id !== userId) continue;

        queryClient.setQueryData<User>(queryKey, updateUser(profile));
      }

      /*
       * Update the user's direct cache used by the sidebar.
       */
      queryClient.setQueryData<User>(
        ["user", userId],
        updateUser(previousUser),
      );

      /*
       * Update the authenticated session cache.
       */
      queryClient.setQueryData<CachedSession>(["session"], (session) => {
        if (!session?.user || session.user.id !== userId) {
          return session;
        }

        return {
          ...session,
          user: {
            ...session.user,
            ...data,
          },
        };
      });

      return {
        previousProfiles,
        previousUser,
        previousSession,
      };
    },

    onError: (error, { userId }, context) => {
      if (!context) return;

      /*
       * Restore every profile query exactly as it was before
       * the optimistic update.
       */
      for (const [queryKey, profile] of context.previousProfiles) {
        queryClient.setQueryData<User | undefined>(queryKey, profile);
      }

      queryClient.setQueryData<User | undefined>(
        ["user", userId],
        context.previousUser,
      );

      queryClient.setQueryData<CachedSession | undefined>(
        ["session"],
        context.previousSession,
      );

      toast.error(getErrorMessage(error, "Failed to update profile"));
    },

    onSuccess: (updatedUser, { userId }) => {
      /*
       * Synchronize EVERY profile cache with the authoritative
       * response from the server.
       */
      const profileQueries = queryClient.getQueriesData<User>({
        queryKey: ["user-profile"],
      });

      for (const [queryKey, profile] of profileQueries) {
        if (!profile || profile.id !== userId) continue;

        queryClient.setQueryData<User>(queryKey, {
          ...profile,
          ...updatedUser,
        });
      }

      /*
       * Synchronize direct user cache.
       */
      queryClient.setQueryData<User>(["user", userId], (currentUser) => {
        if (!currentUser) {
          return updatedUser;
        }

        return {
          ...currentUser,
          ...updatedUser,
        };
      });

      /*
       * Synchronize authenticated session.
       */
      queryClient.setQueryData<CachedSession>(["session"], (session) => {
        if (!session?.user || session.user.id !== userId) {
          return session;
        }

        return {
          ...session,
          user: {
            ...session.user,
            ...updatedUser,
          },
        };
      });

      toast.success("Profile updated successfully");
    },
  });
}
