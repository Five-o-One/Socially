/** @file Post partial-update operations, including like toggling. */
import type { AxiosResponse } from "axios";
import type { ApiMessageResponse } from "../../types/api";
import __BASE__ from "../base";

/** Adds or removes the current user's like from a post. */
export const ToggleLikePost = async (
  postId: string,
): Promise<AxiosResponse<ApiMessageResponse>> => {
  const response = await __BASE__.patch<ApiMessageResponse>(
    `/api/posts/${postId}`,
  );

  return response;
};
