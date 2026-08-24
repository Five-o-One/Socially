import type { AxiosResponse } from "axios";
import type { ToggleFollowResponse } from "../../types/Users";
import __BASE__ from "../base";

/** Follows or unfollows a target user. */
export const ToggleFollow = async (
  id: string,
): Promise<AxiosResponse<ToggleFollowResponse>> => {
  const response = await __BASE__(`/api/users/${id}`, { method: "PATCH" });
  return response;
};
