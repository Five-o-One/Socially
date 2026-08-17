export const NOTIFICATION_MESSAGES = {
  follow: (name: string) => `${name} followed you`,
  like: (name: string) => `${name} liked your post`,
  comment: (name: string) => `${name} commented on your post`,
};

export const ICON_BY_TYPE: Record<
  "follow" | "like" | "comment",
  { icon: "Person" | "Heart" | "Chat"; className: string }
> = {
  follow: { icon: "Person", className: "text-brand" },
  like: { icon: "Heart", className: "text-danger" },
  comment: { icon: "Chat", className: "text-brand" },
};
