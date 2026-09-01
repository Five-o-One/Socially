import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddComment } from "@/api";
import toast from "react-hot-toast";
import { assertApiSuccess, getErrorMessage } from "@/lib/error";
import type { AddCommentVariables } from "@/types";

/**
 * @hook useAddComment
 * @description Adds a comment to a post and refetches the active posts query.
 * @returns TanStack Query mutation result for adding a comment.
 */
export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, content }: AddCommentVariables) => {
      const response = await AddComment(postId, { content });

      assertApiSuccess(response.data, "Failed to add comment");

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
      toast.error(getErrorMessage(error, "Failed to add comment"));
    },
  });
}
