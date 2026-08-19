import type { AxiosResponse } from "axios";
import type { MarkNotificationsAsReadRequest } from "../../types/Notifications";
import type { ApiMessageResponse } from "../../types/Users";
import __BASE__ from "../base";

export const MarkNotificationsAsRead = async (
  data: MarkNotificationsAsReadRequest,
): Promise<AxiosResponse<ApiMessageResponse>> => {
  const response = await __BASE__.patch<ApiMessageResponse>(
    "/api/notifications",
    data,
  );

  return response;
};
