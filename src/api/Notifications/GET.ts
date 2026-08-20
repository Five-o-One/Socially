import type { AxiosResponse } from "axios";
import type { GetNotificationsResponse } from "../../types/Notifications";
import __BASE__ from "../base";

export const GetNotifications = async (): Promise<
  AxiosResponse<GetNotificationsResponse>
> => {
  const response =
    await __BASE__.get<GetNotificationsResponse>("/api/notifications");

  return response;
};
