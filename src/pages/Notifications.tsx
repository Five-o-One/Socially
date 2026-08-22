import { AppCard, NotificationCard, AppPageSpinner } from "@/components";
import { useNotifications, useMarkNotificationsAsRead } from "@/hooks";

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

  if (isLoading) {
    return <AppPageSpinner message="Loading notifications..." />;
  }

  if (isError) {
    return (
      <AppCard>
        <div className="p-8 text-center text-sm text-danger">
          {error instanceof Error
            ? error.message
            : "Failed to load notifications."}
        </div>
      </AppCard>
    );
  }

  return (
    <AppCard
      noPadding
      header={
        <div className="flex items-center justify-between px-4 sm:px-5">
          <h2 className="text-lg font-bold text-text">Notifications</h2>

          {unreadCount > 0 && (
            <span className="text-xs font-medium text-text-tertiary">
              {unreadCount} unread
            </span>
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
                name={notification.creator.name}
                avatarSrc={notification.creator.image}
                time={new Date(notification.createdAt).toLocaleString()}
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
