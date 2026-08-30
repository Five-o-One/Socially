/** @file Post creation mutation with optimistic feed insertion and rollback. */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePost } from "@/api";
import type { Post, User } from "@/types";
import toast from "react-hot-toast";

/** Previous feed state retained for optimistic post rollback. */
interface CreatePostMutationContext {
  previousPosts: Post[] | undefined;
}

/**
 * @hook useCreatePost
 * @description Creates a post, optimistically inserts it into the feed, and reconciles the cached data after success.
 * @returns Post creation mutation result
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const response = await CreatePost({ content });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    },

    onMutate: async (content): Promise<CreatePostMutationContext> => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      const session = queryClient.getQueryData<{
        user?: User;
      }>(["session"]);

      const currentUser = session?.user;

      if (currentUser) {
        const now = new Date().toISOString();

        const optimisticPost: Post = {
          id: `optimistic-post-${Date.now()}-${Math.random()}`,
          authorId: currentUser.id,
          content,
          createdAt: now,
          updatedAt: now,
          author: {
            id: currentUser.id,
            name: currentUser.name,
            username: currentUser.username,
            email: currentUser.email,
            image: currentUser.image,
          },
          likes: [],
          comments: [],
          _count: {
            likes: 0,
            comments: 0,
          },
        };

        queryClient.setQueryData<Post[]>(["posts"], (posts) => [
          optimisticPost,
          ...(posts ?? []),
        ]);
      }

      return {
        previousPosts,
      };
    },

    onError: (error, _content, context) => {
      if (context) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }

      toast.error(
        error instanceof Error ? error.message : "Failed to create post",
      );
    },

    onSuccess: (createdPost) => {
      queryClient.setQueryData<Post[]>(["posts"], (posts) => {
        if (!posts) return [createdPost];

        return posts.map((post) => {
          if (
            !post.id.startsWith("optimistic-post-") ||
            post.authorId !== createdPost.authorId ||
            post.content !== createdPost.content
          ) {
            return post;
          }

          return {
            ...post,
            ...createdPost,
            author: post.author,
            likes: createdPost.likes ?? post.likes,
            comments: createdPost.comments ?? post.comments,
            _count: createdPost._count ?? post._count,
            count: createdPost.count ?? post.count,
          };
        });
      });

      queryClient.invalidateQueries({
        queryKey: ["user-posts", createdPost.authorId],
      });
      toast.success("Post created successfully");
    },
  });
}
