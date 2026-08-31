/** @file Notification list item with type-specific icon and content. */
import { Link } from "react-router";
import { AppImage } from "@/components/AppImage";
import AppIcon from "@/components/AppIcon/AppIcon";
import type { NameIcon, NotificationCardProps } from "@/types";

/**
 * @component NotificationCard
 * @description Displays one notification with its type-specific icon, message, and read state.
 * @prop {'like' | 'comment' | 'follow'} type - Notification category
 * @prop {boolean} [isRead=false] - Whether the notification has been read
 * @prop {string} userId - ID used for the creator profile link
 * @prop {string} name - Creator display name
 * @prop {string | null} [avatarSrc] - Creator avatar URL
 * @prop {string} time - Formatted notification time
 * @prop {string | null} [postText] - Related post excerpt
 * @prop {string | null} [commentText] - Related comment excerpt
 */


const NOTIFICATION_ICONS: Record<
  string,
  { icon: NameIcon; className: string }
> = {
  LIKE: { icon: "Heart", className: "text-danger" },
  like: { icon: "Heart", className: "text-danger" },
  COMMENT: { icon: "Chat", className: "text-brand" },
  comment: { icon: "Chat", className: "text-brand" },
  FOLLOW: { icon: "Person", className: "text-text" },
  follow: { icon: "Person", className: "text-text" },
};

export function NotificationCard({
  type,
  isRead = false,
  userId,
  name,
  avatarSrc,
  time,
  postText,
  commentText,
}: NotificationCardProps) {
  const config = NOTIFICATION_ICONS[type] || {
    icon: "Bell",
    className: "text-brand",
  };

  const getNotificationText = () => {
    const normalizedType = type.toLowerCase();

    if (normalizedType === "like") return "liked your post";
    if (normalizedType === "comment") return "commented on your post";
    if (normalizedType === "follow") return "started following you";

    return "interacted with your profile";
  };

  return (
    <div className="flex w-full items-center gap-3.5 border-b border-border p-4 transition-colors hover:bg-border/10">
      {" "}
      <Link to={`/profile/id/${userId}`}>
        <AppImage src={avatarSrc || ""} alt={name} variant="circle" size="md" />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <AppIcon
            nameIcon={config.icon}
            size={16}
            className={config.className}
            isFilled={type.toLowerCase() === "like"}
          />

          <p className="text-sm font-medium text-text">
            <Link
              to={`/profile/id/${userId}`}
              className="font-bold hover:underline"
            >
              {name}
            </Link>{" "}
            {getNotificationText()}{" "}
            <span className="text-xs text-text-tertiary">· {time}</span>
          </p>
        </div>

        {postText && (
          <div className="mt-2 rounded-lg bg-border/30 p-2.5 text-xs sm:text-sm text-text-secondary">
            {postText}
          </div>
        )}

        {commentText && (
          <div className="mt-2 rounded-lg bg-border/60 p-2.5 text-xs sm:text-sm text-text">
            {commentText}
          </div>
        )}
      </div>
      {!isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />}
    </div>
  );
}

export default NotificationCard;
