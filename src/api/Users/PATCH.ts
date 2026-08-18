import type { AxiosResponse } from "axios";
import type { ToggleFollowResponse } from "../../types/Users";
import __BASE__ from "../base";

export const ToggleFollow = async (
  id: string,
): Promise<AxiosResponse<ToggleFollowResponse>> => {
  const response = await __BASE__(`/api/users/${id}`, { method: "PATCH" });
  return response;
};
