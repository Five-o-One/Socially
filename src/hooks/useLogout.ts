import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout } from "@/api";

/**
 * @hook useLogout
 * @description Ends the current session and removes the cached session query.
 * @returns Logout mutation result
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await Logout();

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["session"] });
    },
  });
}
