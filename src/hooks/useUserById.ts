/** @file User profile query keyed by user ID. */
import { useQuery } from "@tanstack/react-query";
import { GetUserById } from "@/api";

/**
 * @hook useUserById
 * @description Loads one user by ID.
 * @param {string} id - User ID
 * @returns User query result
 */
export function useUserById(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await GetUserById(id);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },
    enabled: Boolean(id),
    retry: false,
  });
}
