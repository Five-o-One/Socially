import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletePost } from "@/api";
import type { Post } from "@/types";

interface DeletePostMutationContext {
  previousQueries: Array<[readonly unknown[], Post[] | undefined]>;
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await DeletePost(postId);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

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

    onError: (_error, _postId, context) => {
      if (!context) return;

      for (const [queryKey, data] of context.previousQueries) {
        queryClient.setQueryData(queryKey, data);
      }
    },
  });
}
