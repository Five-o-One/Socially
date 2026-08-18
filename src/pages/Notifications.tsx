import { useState } from "react";
import { AppCard } from "@/components/AppCard";
import NotificationCard from "@/components/notifications/NotifeCard";

interface NotificationItem {
  id: string;
  type: "like" | "comment" | "follow";
  isRead: boolean;
  name: string;
  avatarSrc: string | null;
  time: string;
  postText?: string;
  commentText?: string;
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    type: "comment",
    isRead: false,
    name: "Ali Mousavi",
    avatarSrc: null,
    time: "3 minutes ago",
    postText: "test post",
    commentText: "tests",
  },
  {
    id: "n2",
    type: "like",
    isRead: false,
    name: "Ali Mousavi",
    avatarSrc: null,
    time: "3 minutes ago",
    postText: "test post",
  },
  {
    id: "n3",
    type: "comment",
    isRead: true,
    name: "Farshad Hosseini",
    avatarSrc: null,
    time: "2 hours ago",
    postText: "پروژه سوشالی در حال توسعه است",
    commentText: "خسته نباشید تیم!",
  },
  {
    id: "n4",
    type: "follow",
    isRead: true,
    name: "Mohammad Fallah",
    avatarSrc: null,
    time: "1 day ago",
  },
];

export default function Notifications() {
  const [notifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AppCard
      noPadding
      header={
        <div className="flex items-center justify-between px-4 sm:px-5">
          <h2 className="text-lg font-bold text-text">Notifications</h2>
          {unreadCount > 0 && (
            <span className="text-xs text-text-tertiary font-medium">
              {unreadCount} unread
            </span>
          )}
        </div>
      }
    >
      <div className="divide-y divide-border">
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <NotificationCard
              key={item.id}
              type={item.type}
              isRead={item.isRead}
              name={item.name}
              avatarSrc={item.avatarSrc}
              time={item.time}
              postText={item.postText}
              commentText={item.commentText}
            />
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
