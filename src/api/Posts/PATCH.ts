import type { AxiosResponse } from "axios";
import type { ApiMessageResponse } from "../../types/Users";
import __BASE__ from "../base";

export const ToggleLikePost = async (
  postId: string,
): Promise<AxiosResponse<ApiMessageResponse>> => {
  const response = await __BASE__.patch<ApiMessageResponse>(
    `/api/posts/${postId}`,
  );

  return response;
};
