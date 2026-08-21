import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePost } from "@/api";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const response = await CreatePost({ content });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}
