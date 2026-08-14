import { useState } from "react";
import { FaHeart, FaRegHeart, FaComment, FaTrashAlt } from "react-icons/fa";
import { AppCard } from "../AppCard";
import { AppImage } from "../AppImage";
import { AppButton } from "../AppButton";
import { AppModal } from "../AppModal";

/**
 * @component PostCard
 * @description Post card component with like and comment functionality
 *
 * @prop {Object} user - User information
 * @prop {string} user.imageURL - Profile image URL
 * @prop {string} user.username - Username
 * @prop {string} user.name - Full name
 * @prop {number} postId - Post ID
 * @prop {string} message - Post text content
 * @prop {string|Date} date - Post date
 * @prop {number} likes - Number of likes
 * @prop {boolean} [isLiked] - Like status
 * @prop {Array} [commentsList] - List of comments
 * @prop {() => void} [onLike] - Like handler
 * @prop {(text: string) => void} [onComment] - Comment handler
 * @prop {(commentId: number) => void} [onDeleteComment] - Delete comment handler
 * @prop {string} [className] - Additional CSS classes
 */
interface PostCardProps {
  user: {
    imageURL: string;
    username: string;
    name: string;
  };
  postId: number;
  message: string;
  date: string | Date;
  likes: number;
  isLiked?: boolean;
  commentsList?: Array<{
    id: number;
    user: {
      imageURL: string;
      username: string;
      name: string;
    };
    message: string;
    date: string | Date;
  }>;
  onLike?: () => void;
  onComment?: (text: string) => void;
  onDeleteComment?: (commentId: number) => void;
  className?: string;
}

export function PostCard({
  user,
  postId: _postId,
  message,
  date,
  likes,
  isLiked = false,
  commentsList = [],
  onLike,
  onComment,
  onDeleteComment,
  className = "",
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState(commentsList);

  // State for delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  const commentCount = localComments.length;

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
    onLike?.();
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && onComment) {
      const newComment = {
        id: Date.now(),
        user: {
          imageURL: "https://i.pravatar.cc/150?img=1",
          username: "current.user",
          name: "Current User",
        },
        message: commentText.trim(),
        date: "Just now",
      };

      setLocalComments([...localComments, newComment]);
      onComment(commentText.trim());
      setCommentText("");
    }
  };

  // Open delete confirmation modal
  const handleDeleteClick = (commentId: number) => {
    setCommentToDelete(commentId);
    setDeleteModalOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (commentToDelete !== null) {
      setLocalComments(
        localComments.filter((comment) => comment.id !== commentToDelete),
      );
      onDeleteComment?.(commentToDelete);
      setCommentToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setCommentToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const formattedDate =
    typeof date === "string" ? date : date.toLocaleDateString("en-US");

  return (
    <>
      <AppCard className={className} hoverable>
        <div className="space-y-3">
          {/* Header: User info */}
          <div className="flex items-start gap-3">
            <AppImage
              src={user.imageURL}
              alt={user.name || user.username}
              variant="circle"
              size="md"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-text truncate">{user.name}</p>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <span>@{user.username}</span>
                <span className="w-1 h-1 rounded-full bg-text-secondary/50" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Post content */}
          <p className="text-text leading-relaxed break-words">{message}</p>

          {/* Interaction buttons */}
          <div className="flex items-center gap-6 pt-2 border-t border-border">
            <button
              onClick={handleLike}
              className={`
                flex items-center gap-2 text-sm transition-colors
                ${liked ? "text-danger" : "text-text-secondary hover:text-danger"}
              `}
              aria-label={liked ? "Unlike" : "Like"}
            >
              {liked ? (
                <FaHeart className="text-lg" />
              ) : (
                <FaRegHeart className="text-lg" />
              )}
              <span>{likeCount}</span>
            </button>

            <button
              onClick={handleToggleComments}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand transition-colors"
              aria-label="Comments"
            >
              <FaComment className="text-lg" />
              <span>{commentCount}</span>
            </button>
          </div>

          {/* Comments section */}
          {showComments && (
            <div className="pt-3 border-t border-border space-y-3">
              {/* Comments list */}
              {localComments.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {localComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start gap-2 group"
                    >
                      <AppImage
                        src={comment.user.imageURL}
                        alt={comment.user.name || comment.user.username}
                        variant="circle"
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-text text-sm">
                            {comment.user.name}
                          </span>
                          <span className="text-text-secondary text-xs">
                            @{comment.user.username}
                          </span>
                          <span className="text-text-tertiary text-xs">
                            ·{" "}
                            {typeof comment.date === "string"
                              ? comment.date
                              : comment.date.toLocaleDateString("en-US")}
                          </span>
                        </div>
                        <p className="text-text text-sm break-words">
                          {comment.message}
                        </p>
                      </div>
                      {/* Delete button - only shows on hover */}
                      <button
                        onClick={() => handleDeleteClick(comment.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-danger/10 text-text-tertiary hover:text-danger"
                        aria-label="Delete comment"
                      >
                        <FaTrashAlt className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary text-sm text-center py-2">
                  No comments yet
                </p>
              )}

              {/* Comment input form */}
              <form
                onSubmit={handleCommentSubmit}
                className="flex items-center gap-2"
              >
                <AppImage
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User"
                  variant="circle"
                  size="sm"
                />
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 bg-border/30 rounded-full px-4 py-2 text-sm text-text placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand/50"
                />
                <AppButton
                  variant="primary"
                  size="sm"
                  disabled={!commentText.trim()}
                >
                  Post
                </AppButton>
              </form>
            </div>
          )}
        </div>
      </AppCard>

      {/* Delete Confirmation Modal */}
      <AppModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        title="Delete Comment"
        footer={
          <>
            <AppButton variant="ghost" onClick={handleCancelDelete}>
              Cancel
            </AppButton>
            <AppButton variant="danger" onClick={handleConfirmDelete}>
              Delete
            </AppButton>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-text">
            Are you sure you want to delete this comment?
          </p>
          <p className="text-text-secondary text-sm">
            This action cannot be undone. The comment will be permanently
            removed.
          </p>
        </div>
      </AppModal>
    </>
  );
}

export default PostCard;
