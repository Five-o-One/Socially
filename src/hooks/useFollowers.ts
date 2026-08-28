import { useQuery } from "@tanstack/react-query";
import { GetFollowers } from "@/api";
import type { User } from "@/types";

export function useFollowers(userId: string, enabled = true) {
  return useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => {
      const response = await GetFollowers(userId);

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch followers");
      }

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
