import type { User, ApiResponse } from "./Users";

export interface Notification {
  id: string;
  type: "LIKE" | "COMMENT" | "FOLLOW";
  read: boolean;
  createdAt: string;
  creator: User;
  postId?: string;
}

export type GetNotificationsResponse = ApiResponse<Notification[]>;

export interface MarkNotificationsAsReadRequest {
  ids: string[];
}
