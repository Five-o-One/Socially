import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToggleLikePost } from "@/api";
import type { Post } from "@/types";

/** Previous post state retained for optimistic like rollback. */
interface LikeMutationContext {
  previousPosts?: Post[];
  previousUserPosts: Array<[readonly unknown[], Post[] | undefined]>;
  previousLikedPosts: Array<[readonly unknown[], Post[] | undefined]>;
}

/**
 * @hook useToggleLike
 * @description Toggles a post like and updates the affected post cache.
 * @param {string} currentUserId - Current user ID used for optimistic like state
 * @returns Like mutation result
 */
export function useToggleLike(currentUserId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await ToggleLikePost(postId);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    },

    onMutate: async (postId): Promise<LikeMutationContext> => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      await queryClient.cancelQueries({
        queryKey: ["user-posts"],
      });

      await queryClient.cancelQueries({
        queryKey: ["user-liked-posts"],
      });

      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      const previousUserPosts = queryClient.getQueriesData<Post[]>({
        queryKey: ["user-posts"],
      });

      const previousLikedPosts = queryClient.getQueriesData<Post[]>({
        queryKey: ["user-liked-posts"],
      });

      const updatePost = (post: Post): Post => {
        if (post.id !== postId) return post;

        const isLiked = post.likes?.some(
          (like) => like.userId === currentUserId,
        );

        const likesCount = post._count?.likes ?? post.likes?.length ?? 0;

        return {
          ...post,
          likes: isLiked
            ? post.likes.filter((like) => like.userId !== currentUserId)
            : [...post.likes, { userId: currentUserId }],
          _count: {
            ...(post._count ?? {
              likes: likesCount,
              comments: post.comments?.length ?? 0,
            }),
            likes: likesCount + (isLiked ? -1 : 1),
          },
        };
      };

      queryClient.setQueryData<Post[]>(["posts"], (posts) =>
        posts?.map(updatePost),
      );

      queryClient.setQueriesData<Post[]>(
        { queryKey: ["user-posts"] },
        (posts) => posts?.map(updatePost),
      );

      return {
        previousPosts,
        previousUserPosts,
        previousLikedPosts,
      };
    },

    onError: (_error, _postId, context) => {
      if (!context) return;

      if (context.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }

      context.previousUserPosts.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      context.previousLikedPosts.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-liked-posts"],
      });
    },
  });
}
