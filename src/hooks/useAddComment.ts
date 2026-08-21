import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddComment } from "@/api";

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: string;
      content: string;
    }) => {
      const response = await AddComment(postId, { content });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}
