import { useState } from "react";
import { Link } from "react-router";
import { AppCard } from "@/components/AppCard";
import { AppImage } from "@/components/AppImage";
import { AppButton } from "@/components/AppButton";
import AppIcon from "@/components/AppIcon/AppIcon";
import { ConfirmModal } from "@/components/AppModal/ConfirmModal";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, content: string) => void;
  onDeletePost?: (postId: string) => void;
  className?: string;
}

export function PostCard({
  post,
  currentUserId = "current-user-id",
  onLike,
  onComment,
  onDeletePost,
  className = "",
}: PostCardProps) {
  const isLikedInitial =
    post.likes?.some((like) => like.userId === currentUserId) || false;
  const isAuthor = post.authorId === currentUserId;

  const [isLiked, setIsLiked] = useState(isLikedInitial);
  const [likesCount, setLikesCount] = useState(
    post._count?.likes || post.likes?.length || 0,
  );
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const authorUsername = (
    post.author.username || post.author.name.toLowerCase().replace(/\s+/g, "")
  ).replace(/^@/, "");

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikesCount((prev) => Math.max(0, prev - 1));
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
    onLike?.(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      content: commentText.trim(),
      createdAt: "Just now",
      author: {
        id: currentUserId,
        name: "Seyed Ali Mousavi",
        username: "samb.1376",
        image: null,
      },
    };

    setComments((prev) => [...prev, newComment]);
    onComment?.(post.id, commentText.trim());
    setCommentText("");
  };

  const handleConfirmDelete = () => {
    onDeletePost?.(post.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <AppCard className={`transition-shadow duration-200 ${className}`}>
        <div className="space-y-3">
          {/* Header: Author info (Clickable Link) & Delete action */}
          <div className="flex items-start justify-between gap-3">
            <Link
              to={`/profile/${authorUsername}`}
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

            {/* Trash icon for post author */}
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

          {/* Post Content */}
          <p className="text-text text-sm sm:text-base leading-relaxed wrap-break-word whitespace-pre-line">
            {post.content}
          </p>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleLikeToggle}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                isLiked
                  ? "bg-danger/10 text-danger"
                  : "text-text-secondary hover:bg-border/30 hover:text-text"
              }`}
            >
              <AppIcon nameIcon="Heart" size={16} isFilled={isLiked} />
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
              <span>{comments.length}</span>
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="space-y-4 pt-3 border-t border-border">
              {/* Comments List */}
              {comments.length > 0 ? (
                <div className="space-y-3">
                  {comments.map((comment) => {
                    const commentUsername = (
                      comment.author.username ||
                      comment.author.name.toLowerCase().replace(/\s+/g, "")
                    ).replace(/^@/, "");

                    return (
                      <div
                        key={comment.id}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Link to={`/profile/${commentUsername}`}>
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
                              to={`/profile/${commentUsername}`}
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

              {/* Create Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <AppImage
                    src=""
                    alt="Current User"
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
                        disabled={!commentText.trim()}
                      >
                        Comment
                      </AppButton>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </AppCard>

      {/* Post Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Post"
        description="This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}

export default PostCard;
