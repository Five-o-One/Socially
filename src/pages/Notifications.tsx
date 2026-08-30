/** @file Notifications page and unread-notification handling. */
import {
  AppCard,
  AppButton,
  NotificationCard,
  AppPageSpinner,
} from "@/components";
import { useNotifications, useMarkNotificationsAsRead } from "@/hooks";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { getErrorMessage } from "@/lib/error";

/**
 * @component Notifications
 * @description Lists notifications for the authenticated user.
 */
export default function Notifications() {
  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
  } = useNotifications();

  const markAsRead = useMarkNotificationsAsRead();

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read,
  );

  const unreadCount = unreadNotifications.length;

  const handleNotificationClick = (id: string) => {
    const notification = notifications.find((item) => item.id === id);

    if (!notification || notification.read) {
      return;
    }

    markAsRead.mutate([id]);
  };

  const handleMarkAllAsRead = () => {
    if (unreadCount === 0 || markAsRead.isPending) return;

    markAsRead.mutate(
      unreadNotifications.map((notification) => notification.id),
    );
  };

  if (isLoading) {
    return <AppPageSpinner message="Loading notifications..." />;
  }

  if (isError) {
    return (
      <AppCard>
        <div className="p-8 text-center text-sm text-danger">
          {getErrorMessage(error, "Failed to load notifications.")}
        </div>
      </AppCard>
    );
  }

  return (
    <AppCard
      noPadding
      header={
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-text">Notifications</h2>

            {unreadCount > 0 && (
              <span className="text-xs font-medium text-text-tertiary">
                {unreadCount} unread
              </span>
            )}
          </div>

          {unreadCount > 0 && (
            <AppButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={markAsRead.isPending}
            >
              {markAsRead.isPending ? "Marking..." : "Mark all as read"}
            </AppButton>
          )}
        </div>
      }
    >
      <div className="divide-y divide-border">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              className={!notification.read ? "cursor-pointer" : undefined}
            >
              <NotificationCard
                type={
                  notification.type.toLowerCase() as
                    "like" | "comment" | "follow"
                }
                isRead={notification.read}
                userId={notification.creator.id}
                name={notification.creator.name}
                avatarSrc={notification.creator.image}
                time={formatRelativeTime(notification.createdAt)}
              />
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-sm text-text-secondary">
            No notifications yet
          </div>
        )}
      </div>
    </AppCard>
  );
}
