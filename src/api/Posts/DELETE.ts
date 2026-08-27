import type { AxiosResponse } from "axios";
import type { ApiMessageResponse } from "../../types/api";
import __BASE__ from "../base";

/** Deletes a post by ID. */
export const DeletePost = async (
  postId: string,
): Promise<AxiosResponse<ApiMessageResponse>> => {
  const response = await __BASE__.delete<ApiMessageResponse>(
    `/api/posts/${postId}`,
  );

  return response;
};

/** Deletes a comment from a specific post. */
export const DeleteComment = async (
  postId: string,
  commentId: string,
): Promise<AxiosResponse<ApiMessageResponse>> => {
  const response = await __BASE__.delete<ApiMessageResponse>(
    `/api/posts/${postId}/comment/${commentId}`,
  );

  return response;
};
