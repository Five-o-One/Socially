// export default function Home() {
//   return <div>Home</div>;
// }
//it is for see what we did in notifecard

import NotifeCard from "../components/notifications/NotifeCard";

const mockNotifications = [
  {
    type: "comment" as const,
    isRead: false,
    name: "Ali Mousavi",
    avatarSrc: "",
    time: "3 minutes ago",
    postText: "test post",
    commentText: "tests",
  },
  {
    type: "like" as const,
    isRead: false,
    name: "Ali Mousavi",
    avatarSrc: "",
    time: "3 minutes ago",
    postText: "test post",
  },
  {
    type: "follow" as const,
    isRead: false,
    name: "Ali Mousavi",
    avatarSrc: "",
    time: "10 minutes ago",
  },
  {
    type: "comment" as const,
    isRead: true,
    name: "Ali Mousavi",
    avatarSrc: "",
    time: "3 minutes ago",
    postText: "test post",
    commentText: "tests",
  },
  {
    type: "like" as const,
    isRead: true,
    name: "Ali Mousavi",
    avatarSrc: "",
    time: "3 minutes ago",
    postText: "test post",
  },
  {
    type: "follow" as const,
    isRead: true,
    name: "Ali Mousavi",
    avatarSrc: "",
    time: "1 hour ago",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-8">
      <div className="w-full max-w-2xl border border-border rounded-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-text font-bold">Notifications</h2>
          <span className="text-text-tertiary text-xs">2 unread</span>
        </div>

        {mockNotifications.map((n, index) => (
          <NotifeCard key={index} {...n} />
        ))}
      </div>
    </div>
  );
}
