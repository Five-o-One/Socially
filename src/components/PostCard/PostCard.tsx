import { useState } from "react";
import { Link } from "react-router";
import { AppCard } from "@/components/AppCard";
import { AppImage } from "@/components/AppImage";
import { AppButton } from "@/components/AppButton";
import { AppSpinner } from "@/components";
import AppIcon from "@/components/AppIcon/AppIcon";
import { ConfirmModal } from "@/components/AppModal/ConfirmModal";
import type { Post } from "@/types";
import { useToggleLike } from "@/hooks/useToggleLike";
import { useAddComment } from "@/hooks/useAddComment";
import { useDeletePost } from "@/hooks/useDeletePost";
import { useDeleteComment } from "@/hooks/useDeleteComment";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  className?: string;
}

export function PostCard({
  post,
  currentUserId = "current-user-id",
  className = "",
}: PostCardProps) {
  const { data: currentUser } = useCurrentUser();

  const isAuthor = post.authorId === currentUserId;

  const isLiked =
    post.likes?.some((like) => like.userId === currentUserId) ?? false;

  const likesCount = post._count?.likes ?? post.likes?.length ?? 0;

  const toggleLike = useToggleLike(currentUserId);
  const addComment = useAddComment();
  const deletePost = useDeletePost();
  const deleteComment = useDeleteComment();

  const isLikeLoading =
    toggleLike.isPending && toggleLike.variables === post.id;

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDeleteId, setCommentToDeleteId] = useState<string | null>(
    null,
  );

  const authorUsername = (
    post.author.username || post.author.name.toLowerCase().replace(/\s+/g, "")
  ).replace(/^@/, "");

  const handleLikeToggle = async () => {
    if (toggleLike.isPending) return;

    try {
      await toggleLike.mutateAsync(post.id);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const content = commentText.trim();

    if (!content || addComment.isPending) return;

    try {
      await addComment.mutateAsync({
        postId: post.id,
        content,
      });

      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletePost.isPending) return;

    try {
      await deletePost.mutateAsync(post.id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleConfirmDeleteComment = async () => {
    if (!commentToDeleteId || deleteComment.isPending) return;

    try {
      await deleteComment.mutateAsync(commentToDeleteId);
      setCommentToDeleteId(null);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <>
      <AppCard className={`transition-shadow duration-200 ${className}`}>
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <Link
              to={`/profile/id/${post.authorId}`}
              className="flex items-center gap-3 min-w-0 group cursor-pointer"
            >
              <AppImage
                src={post.author.image || ""}
                alt={post.author.name}
                variant="circle"
                size="md"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-text text-sm truncate group-hover:underline">
                    {post.author.name}
                  </span>
                  <span className="text-text-secondary text-xs truncate">
                    @{authorUsername}
                  </span>
                  <span className="text-text-tertiary text-xs">
                    • {post.createdAt}
                  </span>
                </div>
              </div>
            </Link>

            {isAuthor && (
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="rounded-lg p-1.5 text-text-tertiary hover:bg-danger/10 hover:text-danger transition-colors cursor-pointer"
                aria-label="Delete Post"
              >
                <AppIcon nameIcon="Trash" size={18} />
              </button>
            )}
          </div>

          <p className="text-text text-sm sm:text-base leading-relaxed wrap-break-word whitespace-pre-line">
            {post.content}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleLikeToggle}
              disabled={isLikeLoading}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed ${
                isLiked
                  ? "bg-danger/10 text-danger"
                  : "text-text-secondary hover:bg-border/30 hover:text-text"
              }`}
            >
              {isLikeLoading ? (
                <AppSpinner size={16} />
              ) : (
                <AppIcon nameIcon="Heart" size={16} isFilled={isLiked} />
              )}
              <span>{likesCount}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                showComments
                  ? "bg-brand/10 text-brand"
                  : "text-text-secondary hover:bg-border/30 hover:text-text"
              }`}
            >
              <AppIcon nameIcon="Chat" size={16} isFilled={showComments} />
              <span>{post._count?.comments ?? post.comments?.length ?? 0}</span>
            </button>
          </div>

          {showComments && (
            <div className="space-y-4 pt-3 border-t border-border">
              {post.comments.length > 0 ? (
                <div className="space-y-3">
                  {post.comments.map((comment) => {
                    const commentUsername = (
                      comment.author.username ||
                      comment.author.name.toLowerCase().replace(/\s+/g, "")
                    ).replace(/^@/, "");

                    const isCommentAuthor =
                      comment.author.id === currentUserId ||
                      comment.author.id === currentUser?.id;

                    return (
                      <div
                        key={comment.id}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Link to={`/profile/id/${comment.author.id}`}>
                          <AppImage
                            src={comment.author.image || ""}
                            alt={comment.author.name}
                            variant="circle"
                            size="sm"
                          />
                        </Link>
                        <div className="flex-1 rounded-xl bg-border/20 p-3">
                          <div className="flex items-center justify-between gap-2">
                            <Link
                              to={`/profile/id/${comment.author.id}`}
                              className="flex items-center gap-2 group cursor-pointer"
                            >
                              <span className="font-semibold text-text text-xs group-hover:underline">
                                {comment.author.name}
                              </span>
                              <span className="text-text-tertiary text-xs">
                                @{commentUsername}
                              </span>
                              <span className="text-text-tertiary text-xs">
                                • {comment.createdAt}
                              </span>
                            </Link>

                            {isCommentAuthor && (
                              <button
                                type="button"
                                onClick={() => setCommentToDeleteId(comment.id)}
                                className="rounded p-1 text-text-tertiary hover:bg-danger/10 hover:text-danger transition-colors cursor-pointer"
                                aria-label="Delete Comment"
                              >
                                <AppIcon nameIcon="Trash" size={14} />
                              </button>
                            )}
                          </div>
                          <p className="mt-1 text-text text-sm wrap-break-word">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <form onSubmit={handleCommentSubmit} className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <AppImage
                    src={currentUser?.image ?? ""}
                    alt={currentUser?.name ?? "Current User"}
                    variant="circle"
                    size="sm"
                  />
                  <div className="flex-1 rounded-xl border border-border bg-card p-2.5 focus-within:border-brand">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      rows={2}
                      className="w-full resize-none bg-transparent text-sm text-text placeholder:text-text-tertiary outline-none"
                    />
                    <div className="flex justify-end pt-1">
                      <AppButton
                        type="submit"
                        variant="primary"
                        size="sm"
                        icon="Send"
                        disabled={!commentText.trim() || addComment.isPending}
                      >
                        {addComment.isPending ? "Commenting..." : "Comment"}
                      </AppButton>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </AppCard>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Post"
        description="This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        onClose={() => setIsDeleteModalOpen(false)}
      />

      <ConfirmModal
        isOpen={Boolean(commentToDeleteId)}
        title="Delete Comment"
        description="Are you sure you want to delete this comment?"
        confirmText="Delete"
        onConfirm={handleConfirmDeleteComment}
        onClose={() => setCommentToDeleteId(null)}
      />
    </>
  );
}

export default PostCard;
