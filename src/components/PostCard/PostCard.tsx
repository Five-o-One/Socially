/** @file Post presentation and interaction controls for likes and comments. */
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
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
import { SearchUsers } from "@/api";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

/**
 * @component PostCard
 * @description Displays post content, author details, likes, comments, and owner actions.
 * @prop {Post} post - Post data rendered by the card
 * @prop {string} [currentUserId] - ID used to determine ownership and interaction state
 */
interface PostCardProps {
  post: Post;
  currentUserId?: string;
  className?: string;
}

export function PostCard({
  post,
  currentUserId,
  className = "",
}: PostCardProps) {
  const navigate = useNavigate();

  const { data: currentUser, isAuthenticated } = useCurrentUser();

  const isAuthor = isAuthenticated && post.authorId === currentUser?.id;

  const isLiked =
    isAuthenticated &&
    (post.likes?.some((like) => like.userId === currentUserId) ?? false);

  const likesCount = post._count?.likes ?? post.likes?.length ?? 0;

  const toggleLike = useToggleLike(currentUserId ?? "");
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

  const [commentAuthorIds, setCommentAuthorIds] = useState<
    Record<string, string>
  >({});

  const authorUsername = (
    post.author.username || post.author.name.toLowerCase().replace(/\s+/g, "")
  ).replace(/^@/, "");

  const handleLikeToggle = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to like this post.");
      return;
    }

    if (isAuthor) {
      toast.error("You cannot like your own post.");
      return;
    }

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

    if (!isAuthenticated || !content || addComment.isPending) return;

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

  const handleCommentAuthorClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    email?: string,
  ) => {
    e.preventDefault();

    if (!email) return;

    const normalizedEmail = email.toLowerCase();

    // Use the ID we already resolved for this author.
    const cachedId = commentAuthorIds[normalizedEmail];

    if (cachedId) {
      navigate(`/profile/id/${cachedId}`);
      return;
    }

    try {
      const response = await SearchUsers(email);

      if (!response.data.success) {
        console.error("Failed to find comment author:", response.data.message);
        return;
      }

      const user = response.data.data.find(
        (user) => user.email.toLowerCase() === normalizedEmail,
      );

      if (!user) {
        console.error("Comment author not found:", email);
        return;
      }

      setCommentAuthorIds((previous) => ({
        ...previous,
        [normalizedEmail]: user.id,
      }));

      navigate(`/profile/id/${user.id}`);
    } catch (error) {
      console.error("Failed to resolve comment author:", error);
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
      await deleteComment.mutateAsync({
        postId: post.id,
        commentId: commentToDeleteId,
      });

      setCommentToDeleteId(null);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <>
      <AppCard className={`transition-shadow duration-200 ${className}`}>
        <div className="space-y-3">
          <div className="group flex items-start justify-between gap-3">
            <Link
              to={`/profile/id/${post.authorId}`}
              className="flex min-w-0 cursor-pointer items-center gap-3 group"
            >
              <AppImage
                src={post.author.image || ""}
                alt={post.author.name}
                variant="circle"
                size="md"
              />

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-bold text-text group-hover:underline">
                    {post.author.name}
                  </span>

                  <span className="truncate text-xs text-text-secondary">
                    @{authorUsername}
                  </span>

                  <span className="text-xs text-text-tertiary">
                    • {formatRelativeTime(post.createdAt)}{" "}
                  </span>
                </div>
              </div>
            </Link>

            {isAuthor && (
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="cursor-pointer rounded-lg p-1.5 text-text-tertiary opacity-0 transition-opacity hover:bg-danger/10 hover:text-danger group-hover:opacity-100"
                aria-label="Delete Post"
              >
                <AppIcon nameIcon="Trash" size={18} />
              </button>
            )}
          </div>

          <p className="wrap-break-word whitespace-pre-line text-sm leading-relaxed text-text sm:text-base">
            {post.content}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleLikeToggle}
              disabled={isLikeLoading}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-75 ${
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
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
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
            <div className="space-y-4 border-t border-border pt-3">
              {(post.comments?.length ?? 0) > 0 ? (
                <div className="space-y-3">
                  {(post.comments ?? []).map((comment) => {
                    const commentUsername = (
                      comment.author.username ||
                      comment.author.name.toLowerCase().replace(/\s+/g, "")
                    ).replace(/^@/, "");

                    const isCommentAuthor =
                      isAuthenticated &&
                      Boolean(currentUser?.email) &&
                      comment.author.email === currentUser?.email;

                    const commentEmail = comment.author.email;

                    return (
                      <div
                        key={comment.id}
                        className="group flex items-start gap-3 text-sm"
                      >
                        <a
                          href={
                            commentEmail
                              ? `/profile/${encodeURIComponent(commentEmail)}`
                              : "#"
                          }
                          onClick={(e) =>
                            handleCommentAuthorClick(e, commentEmail)
                          }
                          aria-label={`View ${comment.author.name}'s profile`}
                        >
                          <AppImage
                            src={comment.author.image || ""}
                            alt={comment.author.name}
                            variant="circle"
                            size="sm"
                          />
                        </a>

                        <div className="flex-1 rounded-xl bg-border/20 p-3">
                          <div className="flex items-center justify-between gap-2">
                            <a
                              href={
                                commentEmail
                                  ? `/profile/${encodeURIComponent(
                                      commentEmail,
                                    )}`
                                  : "#"
                              }
                              onClick={(e) =>
                                handleCommentAuthorClick(e, commentEmail)
                              }
                              className="group flex cursor-pointer items-center gap-2"
                            >
                              <span className="text-xs font-semibold text-text group-hover:underline">
                                {comment.author.name}
                              </span>

                              <span className="text-xs text-text-tertiary">
                                @{commentUsername}
                              </span>

                              <span className="text-xs text-text-tertiary">
                                • {formatRelativeTime(comment.createdAt)}{" "}
                              </span>
                            </a>

                            {isCommentAuthor && (
                              <button
                                type="button"
                                onClick={() => setCommentToDeleteId(comment.id)}
                                className="cursor-pointer rounded p-1 text-text-tertiary opacity-0 transition-opacity hover:bg-danger/10 hover:text-danger group-hover:opacity-100"
                                aria-label="Delete Comment"
                              >
                                <AppIcon nameIcon="Trash" size={14} />
                              </button>
                            )}
                          </div>

                          <p className="mt-1 wrap-break-word text-sm text-text">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {isAuthenticated ? (
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
              ) : (
                <div className="rounded-xl border border-border bg-card px-4 py-4 text-center">
                  <p className="text-sm text-text-secondary">
                    Please sign in or register to leave a comment.
                  </p>

                  <div className="mt-3 flex items-center justify-center gap-3">
                    <Link to="/login">
                      <AppButton type="button" variant="secondary" size="sm">
                        Sign in
                      </AppButton>
                    </Link>

                    <Link to="/register">
                      <AppButton type="button" variant="primary" size="sm">
                        Sign Up
                      </AppButton>
                    </Link>
                  </div>
                </div>
              )}
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
