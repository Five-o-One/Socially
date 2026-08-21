import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout } from "@/api";

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
