import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddComment } from "@/api";

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
      console.log("COMMENT POST SUCCESS");

      await queryClient.refetchQueries({
        queryKey: ["posts"],
        type: "active",
      });

      console.log("POSTS REFETCHED");
    },
  });
}
