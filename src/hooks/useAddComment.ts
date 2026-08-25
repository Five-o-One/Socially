import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddComment } from "@/api";
import toast from "react-hot-toast";

/**
 * @hook useAddComment
 * @description Adds a comment to a post and refetches the active posts query.
 * @returns TanStack Query mutation result for adding a comment.
 */
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

    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["posts"],
        type: "active",
      });

      toast.success("Comment added successfully");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to add comment",
      );
    },
  });
}
