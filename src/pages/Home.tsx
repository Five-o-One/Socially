/** @file Home feed page with post creation and feed states. */
import { useState } from "react";
import {
  AppCard,
  AppImage,
  AppButton,
  PostCard,
  AppPageSpinner,
} from "@/components";
import { usePosts } from "@/hooks/usePosts";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCreatePost } from "@/hooks/useCreatePost";
import toast from "react-hot-toast";

/**
 * @component Home
 * @description Feed page with post loading, error handling, and optional post creation.
 * @prop {boolean} [isAuth=true] - Shows authenticated controls when true
 */
interface HomeProps {
  isAuth?: boolean;
}

export default function Home({ isAuth = true }: HomeProps) {
  const [postContent, setPostContent] = useState("");

  const { data: posts = [], isLoading, isError, error } = usePosts();
  const { data: currentUser } = useCurrentUser();

  const createPost = useCreatePost();

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    const content = postContent.trim();

    if (!content || createPost.isPending) return;

    try {
      await createPost.mutateAsync(content);

      setPostContent("");

      toast.success("Post created successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create post",
      );
    }
  };

  if (isLoading) {
    return <AppPageSpinner message="Loading posts..." />;
  }

  if (isError) {
    return (
      <AppCard>
        <p className="text-center text-red-500">
          {error instanceof Error ? error.message : "Failed to load posts."}
        </p>
      </AppCard>
    );
  }

  return (
    <div className="space-y-4">
      {isAuth && (
        <AppCard>
          <form onSubmit={handleCreatePost} className="space-y-3">
            <div className="flex items-start gap-3">
              <AppImage
                src={currentUser?.image ?? ""}
                alt={currentUser?.name ?? "Current user"}
                variant="circle"
                size="md"
              />

              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's on your mind?"
                rows={3}
                className="flex-1 resize-none bg-transparent pt-1 text-sm text-text placeholder:text-text-secondary focus:outline-none"
              />
            </div>

            <div className="flex justify-end border-t border-border pt-3">
              <AppButton
                type="submit"
                variant="primary"
                size="md"
                icon="Send"
                disabled={!postContent.trim() || createPost.isPending}
              >
                {createPost.isPending ? "Posting..." : "Post"}
              </AppButton>
            </div>
          </form>
        </AppCard>
      )}

      <section className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUserId={isAuth ? currentUser?.id : undefined}
          />
        ))}
      </section>
    </div>
  );
}
