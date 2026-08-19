import { AppImage } from "@/components/AppImage";
import AppIcon from "@/components/AppIcon/AppIcon";
import type { NameIcon, NotificationType } from "@/types";

interface NotificationCardProps {
  type: NotificationType | "like" | "comment" | "follow";
  isRead?: boolean;
  name: string;
  avatarSrc?: string | null;
  time: string;
  postText?: string | null;
  commentText?: string | null;
}

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
    if (normalizedType === "like") return `${name} liked your post`;
    if (normalizedType === "comment") return `${name} commented on your post`;
    if (normalizedType === "follow") return `${name} started following you`;
    return `${name} interacted with your profile`;
  };

  return (
    <div className="flex w-full items-start gap-3.5 border-b border-border p-4 transition-colors hover:bg-border/10">
      <AppImage src={avatarSrc || ""} alt={name} variant="circle" size="md" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <AppIcon
            nameIcon={config.icon}
            size={16}
            className={config.className}
            isFilled={type.toLowerCase() === "like"}
          />
          <p className="text-sm font-medium text-text">
            {getNotificationText()}
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

        <p className="mt-2 text-xs text-text-tertiary">{time}</p>
      </div>

      {!isRead && (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" />
      )}
    </div>
  );
}

export default NotificationCard;
