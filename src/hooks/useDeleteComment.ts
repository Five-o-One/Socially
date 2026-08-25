/** @file Comment deletion mutation and related query invalidation. */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteComment } from "@/api";
import type { Post } from "@/types";
import toast from "react-hot-toast";

/**
 * @hook useDeleteComment
 * @description Deletes a comment from a post.
 * @returns Comment deletion mutation result
 */
export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      const response = await DeleteComment(commentId);

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete comment");
      }

      return response.data;
    },

    onMutate: async (commentId: string) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["posts"] }),
        queryClient.cancelQueries({ queryKey: ["user-posts"] }),
        queryClient.cancelQueries({ queryKey: ["user-liked-posts"] }),
      ]);

      const removeCommentFromPosts = (posts: Post[] | undefined) => {
        if (!posts) return posts;

        return posts.map((post) => {
          const hasComment = post.comments?.some((c) => c.id === commentId);
          if (!hasComment) return post;

          return {
            ...post,
            comments: post.comments.filter((c) => c.id !== commentId),
            _count: post._count
              ? {
                  ...post._count,
                  comments: Math.max(0, (post._count.comments ?? 1) - 1),
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
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete comment",
      );
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
