/** @file Comment creation mutation with optimistic updates across post queries. */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddComment } from "@/api";
import type { Comment, Post, User } from "@/types";

/** Previous post state retained for optimistic comment rollback. */
interface CommentMutationContext {
  previousQueries: Array<[readonly unknown[], Post[] | undefined]>;
}

/**
 * @hook useAddComment
 * @description Adds a comment to a post and refreshes the related cached data.
 * @returns Comment creation mutation result
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

    onMutate: async ({ postId, content }): Promise<CommentMutationContext> => {
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

      const session = queryClient.getQueryData<{
        user?: User;
      }>(["session"]);

      const currentUser = session?.user;

      const optimisticComment: Comment = {
        id: `optimistic-comment-${Date.now()}-${Math.random()}`,
        content,
        createdAt: new Date().toISOString(),
        author: {
          id: currentUser?.id,
          name: currentUser?.name ?? "You",
          username: currentUser?.username,
          email: currentUser?.email,
          image: currentUser?.image ?? null,
        },
      };

      const updatePosts = (posts: Post[] | undefined) => {
        if (!posts) return posts;

        return posts.map((post) => {
          if (post.id !== postId) return post;

          const comments = post.comments ?? [];
          const currentCommentsCount =
            post._count?.comments ?? post.count?.comments ?? comments.length;

          return {
            ...post,
            comments: [...comments, optimisticComment],
            _count: {
              ...(post._count ?? {
                likes: post.likes?.length ?? 0,
              }),
              comments: currentCommentsCount + 1,
            },
            count: {
              ...(post.count ?? {
                likes: post.likes?.length ?? 0,
              }),
              comments: currentCommentsCount + 1,
            },
          };
        });
      };

      queryClient.setQueriesData<Post[]>({ queryKey: ["posts"] }, updatePosts);

      queryClient.setQueriesData<Post[]>(
        { queryKey: ["user-posts"] },
        updatePosts,
      );

      queryClient.setQueriesData<Post[]>(
        { queryKey: ["user-liked-posts"] },
        updatePosts,
      );

      return {
        previousQueries,
      };
    },

    onError: (_error, _variables, context) => {
      if (!context) return;

      for (const [queryKey, data] of context.previousQueries) {
        queryClient.setQueryData(queryKey, data);
      }
    },
  });
}
