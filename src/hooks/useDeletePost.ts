/** @file Post deletion mutation with optimistic removal and rollback. */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletePost } from "@/api";
import type { Post } from "@/types";
import toast from "react-hot-toast";

/** Previous feed state retained for optimistic deletion rollback. */
interface DeletePostMutationContext {
  previousQueries: Array<[readonly unknown[], Post[] | undefined]>;
}

/**
 * @hook useDeletePost
 * @description Deletes a post and invalidates feed and profile post queries.
 * @returns Post deletion mutation result
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      try {
        const response = await DeletePost(postId);

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        return response.data;
      } catch (error) {
        throw error instanceof Error
          ? error
          : new Error("Failed to delete post");
      }
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

      toast.error(
        error instanceof Error ? error.message : "Failed to delete post",
      );
    },

    onSuccess: () => {
      toast.success("Post deleted successfully");
    },
  });
}
