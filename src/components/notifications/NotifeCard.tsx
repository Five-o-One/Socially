// components/notifications/NotifeCard.tsx
import { AppImage } from "../AppImage";
import AppIcon from "../AppIcon/AppIcon";
import {
  ICON_BY_TYPE,
  NOTIFICATION_MESSAGES,
} from "../../constants/Notifiction";

type NotificationType = "follow" | "like" | "comment";

interface NotifeCardProps {
  type: NotificationType;
  isRead: boolean;
  name: string;
  avatarSrc: string;
  time: string;
  postText?: string;
  commentText?: string;
}

export default function NotifeCard({
  type,
  isRead,
  name,
  avatarSrc,
  time,
  postText,
  commentText,
}: NotifeCardProps) {
  const message = NOTIFICATION_MESSAGES[type](name);
  const { icon, className } = ICON_BY_TYPE[type];

  return (
    <div className="w-full flex items-start gap-4 border-b border-border pt-4 pb-4.25 px-4">
      <AppImage src={avatarSrc} alt={name} variant="circle" size="sm" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <AppIcon nameIcon={icon} size={16} className={className} />
          <p className="text-text text-sm">{message}</p>
        </div>

        {postText && (
          <div className="w-full mt-2 bg-border/40 rounded-md p-2 text-text-secondary text-sm">
            {postText}
          </div>
        )}

        {type === "comment" && commentText && (
          <div className="w-full mt-2 bg-border/80 rounded-md p-2 text-text text-sm">
            {commentText}
          </div>
        )}

        <p className="text-text-tertiary text-xs mt-1">{time}</p>
      </div>

      {!isRead && <span className="size-2 rounded-full bg-brand mt-1" />}
    </div>
  );
}
