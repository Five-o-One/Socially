export type NotificationType = "LIKE" | "COMMENT" | "FOLLOW";

export interface Notification {
  id: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  creator: {
    id: string;
    name: string;
    username: string;
    image: string | null;
  };
  post?: {
    id: string;
    content: string;
  } | null;
  comment?: {
    id: string;
    content: string;
  } | null;
}
