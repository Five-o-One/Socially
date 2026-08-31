import { useQuery } from "@tanstack/react-query";
import { SearchUsers } from "@/api";
import { assertApiSuccess } from "@/lib/error";

/**
 * @hook useUserByEmail
 * @description Finds a user by email using the user search endpoint.
 * @param {string} [email] - Email address to search for
 * @returns User query result
 */
export function useUserByEmail(email?: string) {
  return useQuery({
    queryKey: ["user-by-email", email],

    queryFn: async () => {
      const response = await SearchUsers(email!);

      assertApiSuccess(response.data, "Failed to find user by email");

      return response.data.data.find((user) => user.email === email) ?? null;
    },

    enabled: Boolean(email),
    retry: false,
  });
}
