import { useQuery } from "@tanstack/react-query";
import { GetFollowings } from "@/api";
import type { User } from "@/types";

export function useFollowings(userId: string, enabled = true) {
  return useQuery({
    queryKey: ["followings", userId],
    queryFn: async () => {
      const response = await GetFollowings(userId);

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch followings");
      }

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
