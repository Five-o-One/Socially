/** @file Comment deletion mutation and related query invalidation. */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteComment } from "@/api";
import type { Post } from "@/types";
import toast from "react-hot-toast";
import { assertApiSuccess, getErrorMessage } from "@/lib/error";

/**
 * @hook useDeleteComment
 * @description Deletes a comment from a post.
 * @returns Comment deletion mutation result
 */
export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) => {
      const response = await DeleteComment(postId, commentId);

      assertApiSuccess(response.data, "Failed to delete comment");

      return response.data;
    },

    onMutate: async ({ commentId }) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["posts"] }),
        queryClient.cancelQueries({ queryKey: ["user-posts"] }),
        queryClient.cancelQueries({ queryKey: ["user-liked-posts"] }),
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

      const removeCommentFromPosts = (posts: Post[] | undefined) => {
        if (!posts) return posts;

        return posts.map((post) => {
          if (!post.comments?.some((comment) => comment.id === commentId)) {
            return post;
          }

          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.id !== commentId,
            ),
            _count: post._count
              ? {
                  ...post._count,
                  comments: Math.max(0, post._count.comments - 1),
                }
              : undefined,
          };
        });
      };

      queryClient.setQueriesData<Post[]>(
        { queryKey: ["posts"] },
        removeCommentFromPosts,
      );

      queryClient.setQueriesData<Post[]>(
        { queryKey: ["user-posts"] },
        removeCommentFromPosts,
      );

      queryClient.setQueriesData<Post[]>(
        { queryKey: ["user-liked-posts"] },
        removeCommentFromPosts,
      );

      return {
        previousQueries,
      };
    },

    onError: (error, _variables, context) => {
      if (context) {
        for (const [queryKey, data] of context.previousQueries) {
          queryClient.setQueryData(queryKey, data);
        }
      }

      toast.error(getErrorMessage(error, "Failed to delete comment"));
    },

    onSuccess: () => {
      toast.success("Comment deleted successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-liked-posts"] });
    },
  });
}
