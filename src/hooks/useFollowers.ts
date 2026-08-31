/** @file Followers query that normalizes relationship API responses. */
import { useQuery } from "@tanstack/react-query";
import { GetFollowers } from "@/api";
import type { User } from "@/types";
import { assertApiSuccess } from "@/lib/error";

/**
 * @hook useFollowers
 * @description Loads followers of a specific user.
 * @param {string} userId - User ID
 * @param {boolean} [enabled=true] - Enables or disables the query
 * @returns Followers query result
 */
export function useFollowers(userId: string, enabled = true) {
  return useQuery({
    queryKey: ["followers", userId],

    queryFn: async () => {
      const response = await GetFollowers(userId);

      assertApiSuccess(response.data, "Failed to fetch followers");

      const rawList = response.data.data ?? [];

      return rawList.map((item: unknown) => {
        const record = item as Record<string, unknown>;

        if (record.follower && typeof record.follower === "object") {
          return record.follower as User;
        }

        if (record.user && typeof record.user === "object") {
          return record.user as User;
        }

        return record as unknown as User;
      });
    },

    enabled: Boolean(userId) && enabled,
    retry: false,
  });
}
