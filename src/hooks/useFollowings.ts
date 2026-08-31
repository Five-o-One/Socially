/** @file Followings query that normalizes relationship API responses. */
import { useQuery } from "@tanstack/react-query";
import { GetFollowings } from "@/api";
import type { User } from "@/types";
import { assertApiSuccess } from "@/lib/error";

/**
 * @hook useFollowings
 * @description Loads users followed by a specific user.
 * @param {string} userId - User ID
 * @param {boolean} [enabled=true] - Enables or disables the query
 * @returns Followings query result
 */
export function useFollowings(userId: string, enabled = true) {
  return useQuery({
    queryKey: ["followings", userId],

    queryFn: async () => {
      const response = await GetFollowings(userId);

      assertApiSuccess(response.data, "Failed to fetch followings");

      const rawList = response.data.data ?? [];

      return rawList.map((item: unknown) => {
        const record = item as Record<string, unknown>;

        if (record.following && typeof record.following === "object") {
          return record.following as User;
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
