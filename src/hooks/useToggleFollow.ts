import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToggleFollow } from "@/api";

export function useToggleFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await ToggleFollow(userId);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },

    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["recommended-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["session"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts", userId],
      });
    },
  });
}
