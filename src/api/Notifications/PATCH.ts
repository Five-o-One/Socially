/** @file Notification state updates, including marking notifications as read. */
import type { AxiosResponse } from "axios";
import type { MarkNotificationsAsReadRequest } from "../../types/Notifications";
import type { ApiMessageResponse } from "../../types/api";
import __BASE__ from "../base";

/** Marks one or more notifications as read. */
export const MarkNotificationsAsRead = async (
  data: MarkNotificationsAsReadRequest,
): Promise<AxiosResponse<ApiMessageResponse>> => {
  const response = await __BASE__.patch<ApiMessageResponse>(
    "/api/notifications",
    data,
  );

  return response;
};
