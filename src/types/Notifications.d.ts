import type { User, ApiResponse } from "./Users";

/** Notification item shown in the notifications page. */
export interface Notification {
  id: string;
  type: "LIKE" | "COMMENT" | "FOLLOW";
  read: boolean;
  createdAt: string;
  creator: User;
  postId?: string;
}

/** API response containing the user's notifications. */
export type GetNotificationsResponse = ApiResponse<Notification[]>;

/** Request body for marking notifications as read. */
export interface MarkNotificationsAsReadRequest {
  ids: string[];
}
