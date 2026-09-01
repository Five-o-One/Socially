/** @file Post deletion mutation with optimistic removal and rollback. */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletePost } from "@/api";
import type { Post } from "@/types";
import toast from "react-hot-toast";
import { assertApiSuccess, getErrorMessage } from "@/lib/error";
import type { DeletePostMutationContext } from "@/types";

/** Previous feed state retained for optimistic deletion rollback. */
/**
 * @hook useDeletePost
 * @description Deletes a post and invalidates feed and profile post queries.
 * @returns Post deletion mutation result
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await DeletePost(postId);

      assertApiSuccess(response.data, "Failed to delete post");

      return response.data;
    },

    onMutate: async (postId): Promise<DeletePostMutationContext> => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: ["posts"],
        }),
        queryClient.cancelQueries({
          queryKey: ["user-posts"],
        }),
        queryClient.cancelQueries({
          queryKey: ["user-liked-posts"],
        }),
      ]);

      const previousQueries = [
        ...queryClient.getQueriesData<Post[]>({
          queryKey: ["posts"],
        }),
        ...queryClient.getQueriesData<Post[]>({
          queryKey: ["user-posts"],
        }),
        ...queryClient.getQueriesData<Post[]>({
          queryKey: ["user-liked-posts"],
        }),
      ];

      const removePost = (posts: Post[] | undefined) => {
        if (!posts) return posts;

        return posts.filter((post) => post.id !== postId);
      };

      queryClient.setQueriesData<Post[]>({ queryKey: ["posts"] }, removePost);

      queryClient.setQueriesData<Post[]>(
        { queryKey: ["user-posts"] },
        removePost,
      );

      queryClient.setQueriesData<Post[]>(
        { queryKey: ["user-liked-posts"] },
        removePost,
      );

      return {
        previousQueries,
      };
    },

    onError: (error, _postId, context) => {
      if (context) {
        for (const [queryKey, data] of context.previousQueries) {
          queryClient.setQueryData(queryKey, data);
        }
      }

      toast.error(getErrorMessage(error, "Failed to delete post"));
    },

    onSuccess: () => {
      toast.success("Post deleted successfully");
    },
  });
}
