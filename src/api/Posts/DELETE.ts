import type { AxiosResponse } from "axios";
import type { ApiMessageResponse } from "../../types/api";
import __BASE__ from "../base";

export const DeletePost = async (
  postId: string,
): Promise<AxiosResponse<ApiMessageResponse>> => {
  const response = await __BASE__.delete<ApiMessageResponse>(
    `/api/posts/${postId}`,
  );

  return response;
};
