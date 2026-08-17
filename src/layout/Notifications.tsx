// TODO: import NotifeCard from "../components/notifications/NotifeCard";


export default function Notifications() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-8">
      <div className="w-full max-w-2xl border border-border rounded-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-text font-bold">Notifications</h2>
          <span className="text-text-tertiary text-xs">2 unread</span>
        </div>
        {/* TODO: data here */}
      </div>
    </div>
  );
}